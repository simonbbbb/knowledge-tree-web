"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Rocket, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { CtaForm, type CtaKind } from "@/components/contact/CtaForm";

const TABS: { kind: CtaKind; label: string; icon: typeof Calendar }[] = [
  { kind: "demo", label: "Book a demo", icon: Calendar },
  { kind: "trial", label: "Free trial", icon: Rocket },
  { kind: "sales", label: "Talk to sales", icon: Briefcase },
];

function parseKind(value: string | null): CtaKind {
  if (value === "trial" || value === "sales" || value === "demo") return value;
  return "demo";
}

export function ContactTabs() {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState<CtaKind>(() =>
    parseKind(search.get("kind")),
  );

  // Keep state in sync when user uses browser back/forward.
  useEffect(() => {
    const k = parseKind(search.get("kind"));
    setActive(k);
  }, [search]);

  function select(kind: CtaKind) {
    setActive(kind);
    const params = new URLSearchParams(search.toString());
    params.set("kind", kind);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-bg-card/60 backdrop-blur-sm p-5 sm:p-8 shadow-xl shadow-black/20">
      <div className="flex flex-wrap gap-2 mb-6 p-1 rounded-lg bg-bg-dark/60 border border-border-subtle">
        {TABS.map((t) => {
          const Icon = t.icon;
          const selected = active === t.kind;
          return (
            <button
              key={t.kind}
              type="button"
              onClick={() => select(t.kind)}
              className={cn(
                "flex-1 min-w-[110px] inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
                selected
                  ? "bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-lg shadow-primary-600/25"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card-hover/60",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
      <CtaForm key={active} kind={active} />
    </div>
  );
}
