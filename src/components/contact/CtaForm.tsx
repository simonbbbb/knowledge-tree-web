"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { GradientButton } from "@/components/shared/GlassComponents";

export type CtaKind = "demo" | "trial" | "sales";

interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  full?: boolean;
}

const COMMON: FieldConfig[] = [
  { name: "name", label: "Full name", required: true, placeholder: "Alex Morgan" },
  { name: "email", label: "Work email", type: "email", required: true, placeholder: "you@company.com" },
  { name: "company", label: "Company", required: true, placeholder: "Acme Corp" },
  { name: "role", label: "Role", placeholder: "Platform engineer" },
];

const TEAM_SIZE_OPTIONS = [
  { value: "1-10", label: "1–10 engineers" },
  { value: "11-50", label: "11–50 engineers" },
  { value: "51-200", label: "51–200 engineers" },
  { value: "201-1000", label: "201–1,000 engineers" },
  { value: "1000+", label: "1,000+ engineers" },
];

const FORMS: Record<CtaKind, { title: string; subtitle: string; submit: string; fields: FieldConfig[] }> = {
  demo: {
    title: "Book a demo",
    subtitle: "Walk through Knowledge Tree with a member of our team. 30 minutes, tailored to your stack.",
    submit: "Request demo",
    fields: [
      ...COMMON,
      {
        name: "team_size",
        label: "Engineering team size",
        type: "select",
        options: TEAM_SIZE_OPTIONS,
      },
      {
        name: "use_case",
        label: "What do you want to see?",
        type: "textarea",
        full: true,
        placeholder: "Multi-cloud inventory, runbook generation, blast-radius queries…",
      },
    ],
  },
  trial: {
    title: "Start a free trial",
    subtitle: "Spin up Knowledge Tree against your own infrastructure. 14 days, no credit card.",
    submit: "Start free trial",
    fields: [
      ...COMMON,
      {
        name: "team_size",
        label: "Engineering team size",
        type: "select",
        options: TEAM_SIZE_OPTIONS,
      },
      {
        name: "use_case",
        label: "Primary cloud providers",
        type: "textarea",
        full: true,
        placeholder: "AWS (multi-account), GKE, some Azure…",
      },
    ],
  },
  sales: {
    title: "Talk to sales",
    subtitle: "For Enterprise plans, procurement, security review, and custom deployments.",
    submit: "Send inquiry",
    fields: [
      ...COMMON,
      {
        name: "team_size",
        label: "Engineering team size",
        type: "select",
        options: TEAM_SIZE_OPTIONS,
      },
      {
        name: "message",
        label: "How can we help?",
        type: "textarea",
        required: true,
        full: true,
        placeholder: "Tell us about your deployment, timelines, and procurement requirements…",
      },
    ],
  },
};

type Status = "idle" | "submitting" | "success" | "error";

export function CtaForm({ kind }: { kind: CtaKind }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const config = FORMS[kind];

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Record<string, string> = { kind };
    data.forEach((v, k) => {
      if (typeof v === "string" && v.trim()) payload[k] = v.trim();
    });
    payload.source_page =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "";

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-12 px-6 rounded-xl border border-border-subtle bg-bg-card/40">
        <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Got it.</h3>
        <p className="text-text-secondary max-w-md">
          {kind === "demo" &&
            "We will reach out within one business day to schedule your demo."}
          {kind === "trial" &&
            "Check your inbox shortly for trial setup instructions."}
          {kind === "sales" &&
            "A member of our sales team will respond within one business day."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary mb-1">
          {config.title}
        </h2>
        <p className="text-sm text-text-secondary">{config.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {config.fields.map((f) => (
          <Field key={f.name} f={f} />
        ))}
      </div>

      {/* Honeypot — hidden from humans, attractive to bots */}
      <div aria-hidden className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-300">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <GradientButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            config.submit
          )}
        </GradientButton>
        <p className="text-xs text-text-muted">
          We&apos;ll only use your information to reply. No newsletter.
        </p>
      </div>
    </form>
  );
}

function Field({ f }: { f: FieldConfig }) {
  const base =
    "w-full px-3.5 py-2.5 rounded-lg bg-bg-card border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 transition-colors";
  return (
    <label className={`flex flex-col gap-1.5 ${f.full ? "sm:col-span-2" : ""}`}>
      <span className="text-sm font-medium text-text-primary">
        {f.label}
        {f.required && <span className="text-red-400 ml-0.5">*</span>}
      </span>
      {f.type === "textarea" ? (
        <textarea
          name={f.name}
          required={f.required}
          placeholder={f.placeholder}
          rows={4}
          className={base}
        />
      ) : f.type === "select" ? (
        <select
          name={f.name}
          required={f.required}
          className={base}
          defaultValue=""
        >
          <option value="" disabled>
            Select one…
          </option>
          {f.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={f.name}
          type={f.type ?? "text"}
          required={f.required}
          placeholder={f.placeholder}
          className={base}
        />
      )}
    </label>
  );
}
