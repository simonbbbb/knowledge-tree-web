import { error, json, type Env, type Submission } from "../../_shared/db";
import { requireAdmin } from "../../_shared/auth";

const VALID_KINDS = ["demo", "trial", "sales"] as const;
const VALID_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "closed",
  "spam",
] as const;

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const unauth = await requireAdmin(request, env);
  if (unauth) return unauth;

  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  const status = url.searchParams.get("status");
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "200", 10) || 200,
    1000,
  );

  const conditions: string[] = [];
  const params: (string | number)[] = [];
  if (kind && (VALID_KINDS as readonly string[]).includes(kind)) {
    conditions.push("kind = ?");
    params.push(kind);
  }
  if (status && (VALID_STATUSES as readonly string[]).includes(status)) {
    conditions.push("status = ?");
    params.push(status);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const stmt = env.DB.prepare(
    `SELECT * FROM submissions ${where} ORDER BY created_at DESC LIMIT ?`,
  ).bind(...params, limit);

  const { results } = await stmt.all<Submission>();

  const [{ total }, { new_count }, { demo_count }, { trial_count }, { sales_count }] =
    await Promise.all([
      env.DB.prepare("SELECT COUNT(*) AS total FROM submissions")
        .first<{ total: number }>()
        .then((r) => r ?? { total: 0 }),
      env.DB.prepare("SELECT COUNT(*) AS new_count FROM submissions WHERE status = 'new'")
        .first<{ new_count: number }>()
        .then((r) => r ?? { new_count: 0 }),
      env.DB.prepare("SELECT COUNT(*) AS demo_count FROM submissions WHERE kind = 'demo'")
        .first<{ demo_count: number }>()
        .then((r) => r ?? { demo_count: 0 }),
      env.DB.prepare("SELECT COUNT(*) AS trial_count FROM submissions WHERE kind = 'trial'")
        .first<{ trial_count: number }>()
        .then((r) => r ?? { trial_count: 0 }),
      env.DB.prepare("SELECT COUNT(*) AS sales_count FROM submissions WHERE kind = 'sales'")
        .first<{ sales_count: number }>()
        .then((r) => r ?? { sales_count: 0 }),
    ]);

  return json({
    submissions: results,
    stats: {
      total,
      new: new_count,
      by_kind: {
        demo: demo_count,
        trial: trial_count,
        sales: sales_count,
      },
    },
  });
};

interface PatchBody {
  id?: number;
  status?: string;
  notes?: string;
}

export const onRequestPatch: PagesFunction<Env> = async ({ request, env }) => {
  const unauth = await requireAdmin(request, env);
  if (unauth) return unauth;

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return error(400, "Invalid JSON body");
  }

  const id = typeof body.id === "number" ? body.id : NaN;
  if (!Number.isFinite(id) || id <= 0) return error(400, "Invalid id");

  const updates: string[] = [];
  const params: (string | number)[] = [];
  if (typeof body.status === "string") {
    if (!(VALID_STATUSES as readonly string[]).includes(body.status)) {
      return error(400, "Invalid status", { expected: VALID_STATUSES });
    }
    updates.push("status = ?");
    params.push(body.status);
  }
  if (typeof body.notes === "string") {
    updates.push("notes = ?");
    params.push(body.notes.slice(0, 10000));
  }
  if (!updates.length) return error(400, "Nothing to update");

  updates.push("updated_at = datetime('now')");
  params.push(id);

  await env.DB.prepare(
    `UPDATE submissions SET ${updates.join(", ")} WHERE id = ?`,
  )
    .bind(...params)
    .run();

  return json({ ok: true });
};

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  return error(405, "Method not allowed", { allow: "GET, PATCH" });
};
