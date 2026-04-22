import { error, json, type Env, type SubmissionKind } from "../_shared/db";

interface Body {
  kind?: string;
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  team_size?: string;
  use_case?: string;
  message?: string;
  source_page?: string;
  /** Honeypot field. Any non-empty value means this is a bot. */
  website?: string;
}

const VALID_KINDS: SubmissionKind[] = ["demo", "trial", "sales"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_STR = 2000;

function clean(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_STR);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return error(400, "Invalid JSON body");
  }

  // Honeypot: bots tend to fill every field
  if (body.website && body.website.trim()) {
    // Silently accept to not tip off bots, but don't persist.
    return json({ ok: true });
  }

  const kind = clean(body.kind) as SubmissionKind | null;
  if (!kind || !VALID_KINDS.includes(kind)) {
    return error(400, "Invalid or missing kind", { expected: VALID_KINDS });
  }

  const email = clean(body.email);
  if (!email || !EMAIL_RE.test(email)) {
    return error(400, "Invalid email address");
  }

  const name = clean(body.name);
  const company = clean(body.company);
  const role = clean(body.role);
  const teamSize = clean(body.team_size);
  const useCase = clean(body.use_case);
  const message = clean(body.message);
  const sourcePage = clean(body.source_page);
  const userAgent = request.headers.get("user-agent") || null;
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    null;

  try {
    await env.DB.prepare(
      `INSERT INTO submissions
        (kind, name, email, company, role, team_size, use_case, message, source_page, user_agent, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        kind,
        name,
        email,
        company,
        role,
        teamSize,
        useCase,
        message,
        sourcePage,
        userAgent,
        ip,
      )
      .run();
  } catch (e) {
    return error(500, "Failed to record submission", { cause: String(e) });
  }

  return json({ ok: true });
};

// Block other methods explicitly so they 405 instead of serving the static 404.
export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method === "POST") {
    // Handled by onRequestPost above; control flow should never reach here.
    return error(500, "Router misconfigured");
  }
  return error(405, "Method not allowed", { allow: "POST" });
};
