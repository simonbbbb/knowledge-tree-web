import { json, type Env } from "../../_shared/db";
import { clearSessionCookie } from "../../_shared/session";

export const onRequest: PagesFunction<Env> = async () => {
  return json({ ok: true }, { headers: { "set-cookie": clearSessionCookie() } });
};
