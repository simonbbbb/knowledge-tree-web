"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TreePine } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Demo", href: "/demo" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "https://docs.knowledgetree.dev" },
    { label: "API Reference", href: "https://apidocs.knowledgetree.dev" },
    { label: "Design Partners", href: "/customers" },
  ],
  Company: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="border-t border-border-subtle bg-bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-purple">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-text-primary">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              Enterprise infrastructure discovery and auto-documentation platform.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-text-primary mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  const className =
                    "text-sm text-text-secondary hover:text-text-primary transition-colors";
                  return (
                    <li key={link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={className}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Built for teams that run the world&apos;s infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
}
