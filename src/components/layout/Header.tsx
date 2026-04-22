"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, TreePine } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { GradientButton } from "@/components/shared/GlassComponents";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Admin panel has its own chrome; hide the marketing header there.
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-xl border-b border-border-subtle"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-purple">
              <TreePine className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-text-primary tracking-tight">
              Knowledge Tree
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/pricing"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-2"
            >
              Pricing
            </Link>
            <Link
              href="https://b8bcb629.knowledge-tree-web-app.pages.dev/dashboard"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors px-3 py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              See the Dashboard
            </Link>
            <GradientButton href="/contact?kind=demo">
              Book a Demo
            </GradientButton>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-dark/95 backdrop-blur-xl border-b border-border-subtle">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border-subtle mt-2 flex flex-col gap-2">
              <Link
                href="https://b8bcb629.knowledge-tree-web-app.pages.dev/dashboard"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors px-4 py-3"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                See the Dashboard
              </Link>
              <GradientButton href="/contact?kind=demo" className="w-full">
                Book a Demo
              </GradientButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
