import { error, type Env, type Submission } from "../../_shared/db";
import { requireAdmin } from "../../_shared/auth";

const COLUMNS: (keyof Submission)[] = [
  "id",
  "kind",
  "status",
  "name",
  "email",
  "company",
  "role",
  "team_size",
  "use_case",
  "message",
  "source_page",
  "notes",
  "user_agent",
  "ip",
  "created_at",
  "updated_at",
];

function csvEscape(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const unauth = await requireAdmin(request, env);
  if (unauth) return unauth;

  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  const where = kind ? "WHERE kind = ?" : "";
  const stmt = env.DB.prepare(
    `SELECT * FROM submissions ${where} ORDER BY created_at DESC`,
  );
  const bound = kind ? stmt.bind(kind) : stmt;
  const { results } = await bound.all<Submission>();

  const header = COLUMNS.join(",");
  const lines = [header];
  for (const row of results ?? []) {
    lines.push(COLUMNS.map((c) => csvEscape(row[c])).join(","));
  }

  const stamp = new Date().toISOString().slice(0, 10);
  const suffix = kind ? `-${kind}` : "";
  const filename = `submissions${suffix}-${stamp}.csv`;

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`,
      "cache-control": "no-store",
    },
  });
};

export const onRequest: PagesFunction<Env> = async () =>
  error(405, "Method not allowed", { allow: "GET" });
