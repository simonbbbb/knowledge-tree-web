import { error, type Env } from "./db";
import { verifySessionCookie } from "./session";

/**
 * Require an authenticated admin session. Returns `null` when ok, otherwise a
 * Response with the appropriate 401 error for the caller to return directly.
 */
export async function requireAdmin(
  request: Request,
  env: Env,
): Promise<Response | null> {
  if (!env.SESSION_SECRET) {
    return error(500, "Server not configured: SESSION_SECRET missing");
  }
  const cookie = request.headers.get("cookie");
  const payload = await verifySessionCookie(cookie, env.SESSION_SECRET);
  if (!payload) return error(401, "Not authenticated");
  return null;
}
