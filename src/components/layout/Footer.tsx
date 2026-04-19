import Link from "next/link";
import { TreePine } from "lucide-react";
import { GITHUB_REPO, SITE_NAME } from "@/lib/constants";
import { GitHubIcon } from "@/components/shared/Icons";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "GitHub", href: GITHUB_REPO },
    { label: "API Reference", href: "/docs" },
  ],
  Company: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

export function Footer() {
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
              Open-source infrastructure discovery and auto-documentation.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-text-primary mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Apache 2.0 License.
          </p>
          <p className="text-sm text-text-muted">
            Built with Go, React, PostgreSQL, and Apache AGE.
          </p>
        </div>
      </div>
    </footer>
  );
}
