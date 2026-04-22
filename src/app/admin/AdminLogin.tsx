"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, AlertCircle, TreePine } from "lucide-react";
import { GradientButton } from "@/components/shared/GlassComponents";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [checking, setChecking] = useState(true);

  // If already logged in, skip straight to the dashboard.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.ok) router.replace("/admin/dashboard/");
        else setChecking(false);
      })
      .catch(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Login failed (${res.status})`);
      }
      router.replace("/admin/dashboard/");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Login failed.");
    }
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-dark">
        <Loader2 className="w-5 h-5 animate-spin text-text-muted" />
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-bg-dark">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-purple flex items-center justify-center mb-4">
            <TreePine className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-text-primary">Admin panel</h1>
          <p className="text-sm text-text-muted mt-1">
            Restricted area. Authorized personnel only.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-border-subtle bg-bg-card/60 backdrop-blur-sm p-6 space-y-4"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-text-primary">
              Password
            </span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-bg-dark border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="Enter admin password"
              />
            </div>
          </label>

          {status === "error" && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-300">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <GradientButton
            type="submit"
            disabled={status === "submitting" || !password}
            className="w-full"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </GradientButton>
        </form>
      </div>
    </section>
  );
}
