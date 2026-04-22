/**
 * Shared types used by Cloudflare Pages Functions.
 *
 * Environment bindings declared in wrangler.toml are injected into every
 * Function context via `env`.
 */

export interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  SESSION_SECRET: string;
}

export type SubmissionKind = "demo" | "trial" | "sales";
export type SubmissionStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "closed"
  | "spam";

export interface Submission {
  id: number;
  kind: SubmissionKind;
  name: string | null;
  email: string;
  company: string | null;
  role: string | null;
  team_size: string | null;
  use_case: string | null;
  message: string | null;
  source_page: string | null;
  user_agent: string | null;
  ip: string | null;
  status: SubmissionStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

export function error(
  status: number,
  message: string,
  details?: unknown,
): Response {
  return json({ error: message, details }, { status });
}
