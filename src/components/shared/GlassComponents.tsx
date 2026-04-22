import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GradientButton({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  const variants = {
    primary:
      "bg-gradient-to-r from-primary-600 to-accent-purple text-white hover:shadow-lg hover:shadow-primary-600/25 hover:scale-[1.02]",
    outline:
      "border border-border-glow text-text-primary hover:bg-white/5 hover:border-primary-500/50",
  };

  const combined = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <a
        href={href}
        className={combined}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combined}
    >
      {children}
    </button>
  );
}

export function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-purple",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function GlassCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-border-glow hover:bg-bg-card-hover/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
