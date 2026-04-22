"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  LogOut,
  Download,
  Filter,
  Mail,
  Calendar,
  Rocket,
  Briefcase,
  TreePine,
  CheckCircle2,
  Clock,
  X,
  Search,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---- Types (mirror functions/_shared/db.ts) ---------------------------------

type SubmissionKind = "demo" | "trial" | "sales";
type SubmissionStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "closed"
  | "spam";

interface Submission {
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

interface ListResponse {
  submissions: Submission[];
  stats: {
    total: number;
    new: number;
    by_kind: { demo: number; trial: number; sales: number };
  };
}

// ---- Constants --------------------------------------------------------------

const KIND_META: Record<
  SubmissionKind,
  { label: string; icon: typeof Calendar; color: string }
> = {
  demo: { label: "Demo", icon: Calendar, color: "text-primary-300 bg-primary-500/10 border-primary-500/30" },
  trial: { label: "Trial", icon: Rocket, color: "text-green-300 bg-green-500/10 border-green-500/30" },
  sales: { label: "Sales", icon: Briefcase, color: "text-purple-300 bg-purple-500/10 border-purple-500/30" },
};

const STATUS_META: Record<
  SubmissionStatus,
  { label: string; color: string }
> = {
  new: { label: "New", color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
  contacted: { label: "Contacted", color: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30" },
  qualified: { label: "Qualified", color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  closed: { label: "Closed", color: "bg-gray-500/15 text-gray-300 border-gray-500/30" },
  spam: { label: "Spam", color: "bg-red-500/15 text-red-300 border-red-500/30" },
};

const STATUSES: SubmissionStatus[] = ["new", "contacted", "qualified", "closed", "spam"];

// ---- Component --------------------------------------------------------------

export function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ListResponse | null>(null);
  const [kindFilter, setKindFilter] = useState<SubmissionKind | "all">("all");
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const fetchData = useCallback(async () => {
    const params = new URLSearchParams();
    if (kindFilter !== "all") params.set("kind", kindFilter);
    if (statusFilter !== "all") params.set("status", statusFilter);
    params.set("limit", "500");

    try {
      const res = await fetch(`/api/admin/submissions?${params.toString()}`, {
        credentials: "include",
      });
      if (res.status === 401) {
        router.replace("/admin/");
        return;
      }
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const body = (await res.json()) as ListResponse;
      setData(body);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [kindFilter, statusFilter, router]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData, refreshTick]);

  const filtered = useMemo(() => {
    if (!data) return [] as Submission[];
    const q = search.trim().toLowerCase();
    if (!q) return data.submissions;
    return data.submissions.filter((s) => {
      return (
        s.email.toLowerCase().includes(q) ||
        (s.name?.toLowerCase().includes(q) ?? false) ||
        (s.company?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [data, search]);

  async function logout() {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/admin/");
  }

  function exportCsv() {
    const params = new URLSearchParams();
    if (kindFilter !== "all") params.set("kind", kindFilter);
    const qs = params.toString();
    const url = qs ? `/api/admin/export?${qs}` : "/api/admin/export";
    window.location.href = url;
  }

  async function patchSubmission(
    id: number,
    patch: Partial<Pick<Submission, "status" | "notes">>,
  ) {
    const res = await fetch("/api/admin/submissions", {
      method: "PATCH",
      credentials: "include",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    if (!res.ok) {
      alert("Failed to update submission.");
      return;
    }
    // Optimistic local update
    setData((prev) =>
      prev
        ? {
            ...prev,
            submissions: prev.submissions.map((s) =>
              s.id === id ? { ...s, ...patch } : s,
            ),
          }
        : prev,
    );
    if (selected?.id === id) {
      setSelected((s) => (s ? { ...s, ...patch } : s));
    }
  }

  const stats = data?.stats;

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg-dark/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href="/admin/dashboard/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary-600 to-accent-purple flex items-center justify-center">
              <TreePine className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold">Admin</span>
          </Link>
          <span className="text-xs text-text-muted">CTA submissions</span>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setRefreshTick((t) => t + 1)}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-card-hover/40 transition-colors cursor-pointer"
              aria-label="Refresh"
              title="Refresh"
            >
              <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
            </button>
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle text-sm text-text-secondary hover:text-text-primary hover:border-border-glow transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard
            label="Total"
            value={stats?.total}
            loading={loading && !data}
          />
          <StatCard
            label="New"
            value={stats?.new}
            accent="text-blue-400"
            loading={loading && !data}
          />
          <StatCard
            label="Demo requests"
            value={stats?.by_kind.demo}
            loading={loading && !data}
          />
          <StatCard
            label="Trials + sales"
            value={
              stats ? stats.by_kind.trial + stats.by_kind.sales : undefined
            }
            loading={loading && !data}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search email, name, company…"
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-card border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <Pill
            label="All"
            active={kindFilter === "all"}
            onClick={() => setKindFilter("all")}
          />
          {(["demo", "trial", "sales"] as const).map((k) => {
            const Icon = KIND_META[k].icon;
            return (
              <Pill
                key={k}
                label={KIND_META[k].label}
                icon={Icon}
                active={kindFilter === k}
                onClick={() => setKindFilter(k)}
              />
            );
          })}

          <div className="w-px h-5 bg-border-subtle mx-1" />

          <div className="inline-flex items-center gap-2 text-xs text-text-muted">
            <Filter className="w-3.5 h-3.5" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as SubmissionStatus | "all")
              }
              className="bg-bg-card border border-border-subtle rounded-md px-2 py-1 text-text-primary text-xs focus:outline-none focus:border-primary-500"
            >
              <option value="all">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border-subtle bg-bg-card/40 overflow-hidden">
          {loading && !data ? (
            <div className="flex items-center justify-center py-20 text-text-muted">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-bg-dark/60 border-b border-border-subtle">
                  <tr className="text-left text-xs uppercase tracking-wider text-text-muted">
                    <th className="px-4 py-3">Kind</th>
                    <th className="px-4 py-3">Who</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Received</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => {
                    const K = KIND_META[s.kind];
                    const S = STATUS_META[s.status];
                    const Icon = K.icon;
                    return (
                      <tr
                        key={s.id}
                        onClick={() => setSelected(s)}
                        className="border-b border-border-subtle last:border-b-0 hover:bg-bg-card-hover/50 transition-colors cursor-pointer"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs border",
                              K.color,
                            )}
                          >
                            <Icon className="w-3 h-3" />
                            {K.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 min-w-[220px]">
                          <div className="flex flex-col">
                            <span className="text-text-primary font-medium">
                              {s.name || "—"}
                            </span>
                            <span className="text-xs text-text-muted">
                              {s.email}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-text-secondary">
                            {s.company || "—"}
                          </span>
                          {s.role && (
                            <span className="block text-xs text-text-muted">
                              {s.role}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded text-xs border",
                              S.color,
                            )}
                          >
                            {S.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-text-muted text-xs">
                          <RelativeTime iso={s.created_at} />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <span className="text-primary-400 text-xs">
                            View →
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-text-muted mt-3">
          Showing {filtered.length} submission{filtered.length === 1 ? "" : "s"}
          {kindFilter !== "all" ? ` in ${kindFilter}` : ""}
          {statusFilter !== "all" ? `, status: ${statusFilter}` : ""}
          {data && search ? ` (filtered from ${data.submissions.length})` : ""}.
        </p>
      </div>

      {selected && (
        <SubmissionDrawer
          submission={selected}
          onClose={() => setSelected(null)}
          onPatch={(patch) => patchSubmission(selected.id, patch)}
        />
      )}
    </div>
  );
}

// ---- Subcomponents ----------------------------------------------------------

function StatCard({
  label,
  value,
  accent,
  loading,
}: {
  label: string;
  value: number | undefined;
  accent?: string;
  loading?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-bg-card/40 p-4">
      <div className="text-xs uppercase tracking-wider text-text-muted mb-1">
        {label}
      </div>
      <div
        className={cn(
          "text-2xl font-semibold tabular-nums",
          accent ?? "text-text-primary",
        )}
      >
        {loading ? (
          <span className="inline-block w-12 h-7 rounded bg-bg-card-hover/50 animate-pulse" />
        ) : value === undefined ? (
          "—"
        ) : (
          value.toLocaleString()
        )}
      </div>
    </div>
  );
}

function Pill({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon?: typeof Calendar;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer",
        active
          ? "bg-primary-600/15 text-primary-300 border-primary-500/40"
          : "bg-bg-card/40 text-text-secondary border-border-subtle hover:text-text-primary hover:border-border-glow",
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-bg-card-hover flex items-center justify-center mb-3">
        <Mail className="w-5 h-5 text-text-muted" />
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-1">
        No submissions yet
      </h3>
      <p className="text-sm text-text-muted max-w-xs">
        When someone submits the demo, trial, or sales form, it will appear
        here.
      </p>
    </div>
  );
}

function RelativeTime({ iso }: { iso: string }) {
  // D1 stores datetime('now') as "YYYY-MM-DD HH:MM:SS" (UTC, no Z).
  const d = new Date(iso.includes("T") ? iso : iso.replace(" ", "T") + "Z");
  const now = Date.now();
  const diff = Math.max(0, now - d.getTime());
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return <span title={d.toLocaleString()}>just now</span>;
  if (mins < 60) return <span title={d.toLocaleString()}>{mins}m ago</span>;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return <span title={d.toLocaleString()}>{hrs}h ago</span>;
  const days = Math.floor(hrs / 24);
  if (days < 30) return <span title={d.toLocaleString()}>{days}d ago</span>;
  return <span title={d.toLocaleString()}>{d.toLocaleDateString()}</span>;
}

function SubmissionDrawer({
  submission,
  onClose,
  onPatch,
}: {
  submission: Submission;
  onClose: () => void;
  onPatch: (patch: Partial<Pick<Submission, "status" | "notes">>) => Promise<void>;
}) {
  const [notes, setNotes] = useState(submission.notes ?? "");
  const [savingNotes, setSavingNotes] = useState(false);
  const K = KIND_META[submission.kind];
  const Icon = K.icon;

  useEffect(() => {
    setNotes(submission.notes ?? "");
  }, [submission.id, submission.notes]);

  async function saveNotes() {
    setSavingNotes(true);
    try {
      await onPatch({ notes });
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="relative w-full max-w-lg h-full bg-bg-dark border-l border-border-subtle overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 h-14 border-b border-border-subtle bg-bg-dark">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs border",
                K.color,
              )}
            >
              <Icon className="w-3 h-3" />
              {K.label}
            </span>
            <span className="text-xs text-text-muted">#{submission.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-text-primary">
              {submission.name || submission.email}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-sm text-text-muted">
              <Clock className="w-3.5 h-3.5" />
              <RelativeTime iso={submission.created_at} />
            </div>
          </div>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Status
            </h3>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => onPatch({ status: s })}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs border transition-colors cursor-pointer",
                    submission.status === s
                      ? STATUS_META[s].color
                      : "bg-bg-card/40 text-text-muted border-border-subtle hover:text-text-primary",
                  )}
                >
                  {submission.status === s && (
                    <CheckCircle2 className="inline w-3 h-3 mr-1" />
                  )}
                  {STATUS_META[s].label}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Contact
            </h3>
            <dl className="space-y-2 text-sm">
              <Row label="Email">
                <a
                  href={`mailto:${submission.email}?subject=Re:%20Knowledge%20Tree%20${submission.kind}%20inquiry`}
                  className="text-primary-400 hover:text-primary-300 inline-flex items-center gap-1"
                >
                  {submission.email}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Row>
              <Row label="Company">{submission.company || "—"}</Row>
              <Row label="Role">{submission.role || "—"}</Row>
              <Row label="Team size">{submission.team_size || "—"}</Row>
            </dl>
          </section>

          {(submission.use_case || submission.message) && (
            <section className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                What they said
              </h3>
              <div className="rounded-lg border border-border-subtle bg-bg-card/40 p-3 text-sm text-text-primary whitespace-pre-wrap">
                {submission.use_case || submission.message}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Internal notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add a private note…"
              className="w-full px-3 py-2 rounded-lg bg-bg-card border border-border-subtle text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-500"
            />
            <button
              onClick={saveNotes}
              disabled={savingNotes || notes === (submission.notes ?? "")}
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                savingNotes || notes === (submission.notes ?? "")
                  ? "bg-bg-card-hover/40 text-text-muted cursor-not-allowed"
                  : "bg-primary-600/20 text-primary-300 hover:bg-primary-600/30",
              )}
            >
              {savingNotes ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…
                </>
              ) : (
                "Save notes"
              )}
            </button>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Metadata
            </h3>
            <dl className="space-y-1.5 text-xs">
              <Row label="Source page" compact>
                <code>{submission.source_page || "—"}</code>
              </Row>
              <Row label="IP" compact>
                <code>{submission.ip || "—"}</code>
              </Row>
              <Row label="User agent" compact>
                <code className="text-[11px] break-all">
                  {submission.user_agent || "—"}
                </code>
              </Row>
              <Row label="Created" compact>
                <code>{submission.created_at}</code>
              </Row>
              <Row label="Updated" compact>
                <code>{submission.updated_at}</code>
              </Row>
            </dl>
          </section>
        </div>
      </aside>
    </div>
  );
}

function Row({
  label,
  children,
  compact,
}: {
  label: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] gap-2 items-baseline">
      <dt className={cn("text-text-muted", compact && "text-[11px]")}>
        {label}
      </dt>
      <dd className="text-text-primary min-w-0 break-words">{children}</dd>
    </div>
  );
}
