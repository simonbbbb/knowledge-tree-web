#!/usr/bin/env bash
set -uo pipefail

# ─────────────────────────────────────────────────────────────
# SEO Audit for Knowledge Tree Website
# ─────────────────────────────────────────────────────────────

BASE_DIR="${1:-src/app}"
PASS=0; FAIL=0; WARN=0

report() {
  case "$1" in
    PASS) echo "  [PASS] $2"; PASS=$((PASS+1));;
    FAIL) echo "  [FAIL] $2"; FAIL=$((FAIL+1));;
    WARN) echo "  [WARN] $2"; WARN=$((WARN+1));;
  esac
}

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║        Knowledge Tree SEO Audit Report              ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── Page checks ──
echo "─── Page Analysis ───"
find "$BASE_DIR" \( -name 'page.tsx' -o -name 'layout.tsx' \) | sort > /tmp/seo_files.txt

while IFS= read -r file; do
  echo "  $file"

  # Meta description
  if grep -q 'description:' "$file" 2>/dev/null; then
    report PASS "$file has description"
  else
    report FAIL "$file missing description"
  fi

  # Canonical
  if grep -q 'canonical' "$file" 2>/dev/null; then
    report PASS "$file has canonical"
  else
    report WARN "$file no explicit canonical"
  fi

  # OpenGraph
  if grep -q 'openGraph' "$file" 2>/dev/null; then
    report PASS "$file has OpenGraph"
  else
    report WARN "$file no OpenGraph"
  fi

  # Twitter
  if grep -q 'twitter:' "$file" 2>/dev/null; then
    report PASS "$file has Twitter card"
  else
    report WARN "$file no Twitter card"
  fi

  # Image alt text
  grep -n '<img' "$file" 2>/dev/null | while IFS= read -r ln; do
    if [ -n "$ln" ] && ! echo "$ln" | grep -q 'alt='; then
      echo "  [FAIL] $file:$(echo "$ln" | cut -d: -f1) image missing alt text"
    fi
  done

  echo ""
done < /tmp/seo_files.txt

# ── Blog frontmatter ──
echo "─── Blog Frontmatter ───"
for f in src/content/blog/*.md; do
  name=$(basename "$f")
  if grep -q 'description:' "$f" 2>/dev/null; then
    report PASS "$name has description"
  else
    report FAIL "$name missing description"
  fi
  if grep -q 'tags:' "$f" 2>/dev/null; then
    report PASS "$name has tags"
  else
    report WARN "$name missing tags"
  fi
done
echo ""

# ── SEO infrastructure ──
echo "─── SEO Infrastructure ───"
if [ -f "public/sitemap.xml" ]; then
  report PASS "sitemap.xml exists"
else
  report FAIL "sitemap.xml missing"
fi
if [ -f "public/robots.txt" ]; then
  report PASS "robots.txt exists"
  if grep -q 'Sitemap:' public/robots.txt; then
    report PASS "robots.txt references sitemap"
  fi
else
  report FAIL "robots.txt missing"
fi
echo ""

# ── Structured data ──
echo "─── Structured Data ───"
jf=$(find "$BASE_DIR" -name '*.tsx' -exec grep -l 'application/ld+json' {} + 2>/dev/null | wc -l | tr -d ' ')
if [ "$jf" -ge 1 ]; then
  report PASS "JSON-LD in $jf files"
else
  report WARN "No JSON-LD found"
fi
if grep -q 'BlogPosting' src/app/blog/\[slug\]/page.tsx 2>/dev/null; then
  report PASS "BlogPosting schema present"
else
  report FAIL "BlogPosting schema missing"
fi
echo ""

# ── Summary ──
echo "─── Summary ───"
echo "  PASS: $PASS  FAIL: $FAIL  WARN: $WARN"
echo ""

if [ "$FAIL" -gt 0 ]; then
  echo "Some checks failed."
  exit 1
else
  echo "All checks passing!"
  exit 0
fi
