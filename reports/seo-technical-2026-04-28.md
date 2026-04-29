# Technical SEO Audit — 2026-04-28

**Site:** https://londoneducation.pk (static HTML on Vercel)
**Pages reviewed:** 17 HTML files (15 indexable, 3 noindex utility)

## Score: 84 / 100

Strong foundation. The known weaknesses are content-staleness (admissions year) and a handful of small hygiene fixes, not architecture.

---

## Robots, Sitemap, Canonicals

- **robots.txt** — exemplary. Explicit Allow for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot, anthropic-ai. Standard `User-agent: *` Allow with correct Disallow on `/editor.html`, `/server.py`, `/content.json`, `/faculty.html`. Sitemap correctly referenced. **Pass.**
- **Canonicals** — present on every indexable page, all absolute https URLs, all match the actual URL served. `faculty.html` canonicalises to `about.html#faculty` which is consistent with the JS redirect. **Pass.**
- **Meta robots** — `noindex, follow` correctly set on `404.html`, `faculty.html`, `thank-you.html`. No accidental noindex on indexable pages. **Pass.**
- **`editor.html`** — does not exist on disk. The robots.txt Disallow is harmless but stale; can be removed.

## Vercel.json — Security Headers

Strong configuration:
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — full HSTS preload eligibility
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
- `Cross-Origin-Opener-Policy: same-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Strict CSP that allows Google Analytics, Google Ads, Maps, Fonts, and YouTube embeds — frame-ancestors 'none', form-action limited to self + Google Apps Script

Cache headers for static assets are aggressive (1 year immutable for media, 1 week must-revalidate for CSS/JS) — appropriate for a hash-versioned static site, fine for this site since copy changes do not cache-bust filenames. **Pass.**

**Gap:** No `Cross-Origin-Resource-Policy`, no `Content-Security-Policy-Report-Only` for monitoring. Both are nice-to-haves, not required.

## URL Structure

- All canonical URLs end in `.html` (no clean-URL rewrites in vercel.json). Internal href references are consistent.
- Homepage uses trailing slash (`/`) — consistent with sitemap and canonical.
- No mixed `.html`-vs-extensionless conflicts. **Pass.**

## H1 Hierarchy

Every indexable page has exactly one `<h1>`. Content is multi-line (e.g. `AI &amp; Robotics at London&nbsp;School.` on `ai-robotics.html`) but renders as a single H1. **Pass.**

## Meta Description Lengths

| Page | Length | Status |
|---|---|---|
| index.html | 164 | OK (slightly over 160 ideal) |
| about.html | 177 | Truncates in SERP |
| academics.html | 170 | Truncates in SERP |
| ai-robotics.html | 192 | Truncates in SERP |
| campus.html | 157 | Pass |
| enroll.html | 183 | Truncates in SERP |

Most descriptions exceed the 155–160 char display threshold and will truncate in Google SERP. Trim to <160 chars; lead with the primary local query intent.

## Bundle Size and CWV Signals (static analysis only)

- **Total CSS:** ~108 KB across 5 files — `pages.css` (52KB) and `sections.css` (44KB) are the largest. No render-blocking concern given they are local and cached. Acceptable.
- **Total JS:** ~144 KB across 7 files — `main.js` (60KB) + `widget.js` (56KB) dominate. All vanilla JS, no framework overhead. `analytics.js` is correctly designed to lazy-load gtag on first interaction or after 1.5s.
- **HTML page weights:** 20–56 KB. Reasonable.
- **Image optimisation:** see `seo-images-2026-04-28.md`. Biggest CWV gap is `width`/`height` missing on 130/138 `<img>` tags (CLS risk). Not strictly a "technical" finding but it is the highest-impact CWV item per file analysis.
- **No SSR concerns** — static HTML serves directly, no JS rendering needed for indexable content.

## Mobile Optimisation

- Viewport meta `<meta name="viewport" content="width=device-width, initial-scale=1">` present on all pages.
- Mobile-first CSS with breakpoints at 900/768/600/480 per CLAUDE.md conventions.
- Floating WhatsApp button correctly z-indexed.

## JavaScript Rendering

Site is fully static; all critical content (text, images, links) is server-rendered HTML. No JS required for indexability. The `editor.js` and `content-loader.js` scripts target only the editor (`editor.html` does not exist on disk) — no runtime dependency on server-side `content.json` for the published pages. **Pass.**

---

## Top 5 Technical Issues

| # | Issue | Severity | Fix |
|---|---|---|---|
| 1 | 6 pages with meta description >160 chars (truncate in SERP) | Medium | Trim each to ≤155 chars, lead with local query intent (Cambridge / Lahore / age range) |
| 2 | Sitemap `lastmod` 2 days stale on all 14 entries | Low | Update all to `2026-04-27` |
| 3 | Sitemap retains deprecated `<priority>` and `<changefreq>` tags | Low | Remove (Google ignores) |
| 4 | `robots.txt` Disallows `/editor.html` which no longer exists | Low | Remove the line for cleanliness |
| 5 | No `Cross-Origin-Resource-Policy` header in vercel.json | Low | Add `Cross-Origin-Resource-Policy: same-origin` for hardening |

Critical content issues (admissions year, brochure-vs-reality claims) are tracked in the content and local reports.
