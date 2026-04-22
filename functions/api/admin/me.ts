import { error, json, type Env } from "../../_shared/db";
import { verifySessionCookie } from "../../_shared/session";

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const cookie = request.headers.get("cookie");
  const payload = await verifySessionCookie(cookie, env.SESSION_SECRET || "");
  if (!payload) return error(401, "Not authenticated");
  return json({ ok: true, sub: payload.sub, exp: payload.exp });
};
