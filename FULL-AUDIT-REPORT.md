# London School — Full SEO Audit Report

**Date:** 2026-04-28
**Domain:** https://londoneducation.pk
**Hosting:** Vercel (custom domain)
**Business type:** Local Service / Brick-and-mortar — Private Cambridge primary school, single Lahore campus, Year 1 of operation (~130 students)
**Audit scope:** 17 HTML pages (12 indexable site pages + 5 blog posts), robots.txt, sitemap.xml, llms.txt, vercel.json, JSON-LD schema, /img/

---

## Executive Summary

### Overall SEO Health Score: **73 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 84 | 18.5 |
| Content Quality | 23% | 68 | 15.6 |
| On-Page SEO | 20% | 78 | 15.6 |
| Schema / Structured Data | 10% | 70 | 7.0 |
| Performance (CWV) | 10% | 70 | 7.0 |
| AI Search Readiness | 10% | 56 | 5.6 |
| Images | 5% | 65 | 3.3 |
| **Total** | | | **72.6** |

**Verdict:** Strong technical foundation, healthy long-form blog content, exemplary security headers and AI crawler accessibility. The score is dragged down by **stale brochure-vs-reality claims** (foreign languages, swimming pool) that remain in user-facing copy and crawlable JSON-LD schema, plus a stale admissions cycle (2025-26 still advertised on 2026-04-28). These are content/compliance issues, not architectural problems — and they are fixable in a single afternoon.

### Top 5 Critical Issues

1. **Forbidden brochure claims still live in HTML and schema** — "Three Foreign Languages" and "Swimming Pool" appear in 8+ places across `index.html`, `about.html`, `academics.html`, `campus.html`, and `thank-you.html`, including in JSON-LD that Google will index. Trust risk + Helpful Content signal violation.
2. **llms.txt contains 10 false statements** that AI assistants will repeat verbatim — wrong leadership titles ("Co-Founder" should be "Director"), swimming pool listed as a campus facility, three foreign languages listed in Languages and Differentiators, "Weekly AI progress reports" claim the school does not produce.
3. **Admissions cycle stale across 8 visible instances** — homepage hero badge, `enroll.html` headline + meta, `academics.html`, `yearbook.html`, `news.html` all advertise "2025-26" on 2026-04-28. Reads as expired to parents and as low-freshness to crawlers.
4. **`index.html` `<title>` tag is missing "Lahore"** — every other page has the city in its title; the homepage does not. Highest-leverage on-page change for "Cambridge school Lahore" / "AI school Lahore" rankings.
5. **130 of 138 `<img>` tags missing `width`/`height` attributes** — biggest CLS / Core Web Vitals risk. Critical for the Pakistani-mobile-from-Meta-ads audience.

### Top 5 Quick Wins (≤30 min each)

1. **Add LinkedIn to `sameAs`** in `index.html` JSON-LD — `https://www.linkedin.com/company/113215995`. 5 minutes, improves Bing Copilot entity resolution.
2. **Remove `SearchAction` from the `WebSite` schema block** on `index.html` — site has no search; this can surface a broken sitelinks search box.
3. **Add `priceRange: "PKR 15,000–22,000/month"`** to the LocalBusiness schema on `index.html`.
4. **Fix sitemap `lastmod` to 2026-04-27** on all 14 entries; remove deprecated `<priority>` and `<changefreq>` tags.
5. **Trim 6 meta descriptions to ≤155 chars** so they stop truncating in SERPs.

---

## 1. Technical SEO — 84/100

Detailed report: `reports/seo-technical-2026-04-28.md`

**Strengths**
- robots.txt is exemplary: explicit Allow for every major AI crawler (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, anthropic-ai); Disallow on dev-only paths.
- Canonical tags on every indexable page — all absolute, all match the URL served.
- `noindex, follow` correctly applied to `404.html`, `thank-you.html`, `faculty.html`.
- vercel.json security headers are excellent: HSTS preload-eligible, X-Frame-Options DENY, strict CSP allowing only known domains, COOP `same-origin`, Permissions-Policy locking down camera/mic/geo.
- Static HTML — no JS rendering required for indexability.
- All H1s present and singular per page.

**Gaps**
- 6 meta descriptions exceed 160 chars and truncate in SERP (`about.html` 177, `academics.html` 170, `ai-robotics.html` 192, `enroll.html` 183, `index.html` 164, `about.html` 177).
- Sitemap `lastmod` 2 days stale on every entry; deprecated `<priority>` / `<changefreq>` tags retained.
- robots.txt Disallows `/editor.html` which no longer exists (cosmetic).
- No `Cross-Origin-Resource-Policy` header (hardening nicety).

---

## 2. Content Quality — 68/100

Detailed report: `reports/seo-content-2026-04-28.md`

**Strengths**
- All pages clear the 300-word thin-content threshold; 4 of 5 blog posts are 2,200–2,500 words and locally targeted.
- British English standardisation from 2026-04-27 has held — `programme`, `enrolment`, `centre` consistent.
- "Class" (not "Grade") used in user-facing copy with Class+Age pairing.
- Em dashes successfully removed from prose.
- Anonymous-only testimonials — no invented named-parent quotes.

**Critical gaps (compliance + Helpful Content signal risk)**

| File | Line | Stale claim |
|---|---|---|
| `index.html` | 384 | "Cambridge curriculum plus Chinese, French, and German" |
| `index.html` | 337–338 | Proof bar `3 / Foreign Languages` |
| `index.html` | 385 | `prog__pill` `3 Languages` |
| `about.html` | 359 | "three foreign languages" in summary |
| `academics.html` | 58 / 75 / 153 | Twitter/schema descriptions and Course list |
| `campus.html` | 105 | Schema `LocationFeatureSpecification` Swimming Pool |
| `thank-you.html` | 171 | Visible "swimming pool" in tour copy |

The two `swimming pool` / `foreign languages` mentions in `blog/choosing-cambridge-school-lahore.html` and `blog/lahore-school-holidays-2026.html` are intentional cautions about *other* schools and should remain.

**Other gaps**
- Admissions cycle "2025-26" still advertised in 8 visible places. Update to `2026-27` or `Now Enrolling` (confirm with admissions).
- No author attribution on any blog `BlogPosting` schema (E-E-A-T weakness).
- No FAQPage schema on the homepage (highest-authority page for AI extraction).
- Section intro paragraphs are 20–40 words on most pages; AI passage extraction prefers 134–167 words.

---

## 3. On-Page SEO — 78/100

**Strengths**
- All canonical URLs consistent and absolute.
- Internal linking is clean — every sitemap entry is linked from at least one HTML file. No orphans.
- Title tags on 14/15 indexable pages include relevant keywords + brand.
- Blog index has BlogPosting schema and breadcrumbs on every post.

**Gaps**
- **`index.html` `<title>` is missing "Lahore"** — currently `London School — Pakistan's Most Advanced AI & Robotics School With Cambridge Pathway`. Recommended: `London School Lahore — Cambridge AI & Robotics School | Prof. Waris Mir Campus`.
- 6 meta descriptions exceed display threshold (see Technical).
- Admissions year stale in 3 meta tags on `enroll.html`.

---

## 4. Schema / Structured Data — 70/100

Detailed report: `reports/seo-schema-2026-04-28.md`

**Strengths**
- 13/15 indexable pages have JSON-LD; all valid JSON.
- Correct array-type on the homepage organisation block (`["School", "EducationalOrganization", "LocalBusiness"]`).
- BreadcrumbList present on 11/14 non-home pages.
- FAQPage schema on `enroll.html`, `ai-robotics.html`, and 4 blog posts (good for AI/LLM citation even though Google deprecated commercial FAQ rich results).
- Hamid Mir Wikipedia link present in `about.html` schema — strongest available third-party entity anchor.

**Critical fixes**
- `campus.html` line 105 — false `Swimming Pool: true` in `amenityFeature`. **Remove.**
- `academics.html` lines 75, 153 — CollectionPage description and Course ListItem 3 both assert "three foreign languages / Chinese, French, German". **Rewrite description and delete the ListItem.**
- `index.html` `sameAs` is missing `https://www.linkedin.com/company/113215995`. **Add.**
- `index.html` `WebSite` schema has a `SearchAction` pointing to a non-existent search. **Remove `potentialAction`.**
- `priceRange` missing from organisation block. **Add `"PKR 15,000–22,000/month"`.**
- `blog/index.html` missing `BreadcrumbList`.
- `about.html` and `ask-prof-mir.html` have no LocalBusiness schema (only `WebPage` / `AboutPage`). Optional add for NAP consistency.

---

## 5. Performance (Core Web Vitals) — 70/100

Static analysis only (no live PSI / CrUX data — Google API key not configured).

**Static signals**
- Total CSS ~108 KB (5 files), total JS ~144 KB (7 files). Both reasonable for a static site.
- `analytics.js` correctly designed to lazy-load gtag on first interaction or 1.5s after `load` — protects LCP/INP.
- vercel.json cache headers are aggressive (1y immutable for media, 1w must-revalidate for CSS/JS) — appropriate.
- No render-blocking third-party scripts above the fold beyond Google Fonts.
- Mobile-first CSS with breakpoints at 900/768/600/480.

**CLS risk (single biggest CWV concern)**
- 130/138 `<img>` tags lack `width` and `height` attributes. Without intrinsic dimensions, the browser cannot reserve space, causing CLS as images load. Pakistani-mobile-from-Meta-ads audience is the single most CLS-sensitive cohort. **Adding width/height to every `<img>` is the highest-impact CWV fix on this site.**

**LCP risk**
- 5 blog hero `<img>` tags use `loading="lazy"` even though they are likely the LCP element. Switch to `fetchpriority="high"` and remove lazy on hero images.

**Recommendation**
- After fixes, validate with PSI live (https://pagespeed.web.dev/) and CrUX once enough field data is collected.

---

## 6. Images — 65/100

Detailed report: `reports/seo-images-2026-04-28.md`

**Strengths**
- 100% alt text coverage (138/138 `<img>`).
- 89% WebP adoption.
- 102/138 images correctly lazy-loaded.
- 10 dedicated 1200×630 OG images at `/img/og/`, all under 300 KB.

**Gaps**
- **`width`/`height` missing on 130 `<img>` tags** — biggest CWV/CLS gap.
- 4 blog posts use random content JPGs as their `og:image` instead of dedicated 1200×630 OG assets — Facebook/WhatsApp will crop/letterbox.
- Generic alt text on 6 instances: site-wide `alt="Crest"` should be `London School Prof. Waris Mir Campus crest`; `alt="Robotics lab"` mistakenly used on the *nav crest* in 3 pages; `index.html` campus tile alts are single-word ("Corridor", "Robotics", "Computers", "Play area").
- 5 blog `<img>` reference `.jpg` despite `.webp` siblings existing (`building-day`, `event-cultural-day-full`, `campus-library-study`, `life-nursery-corridor`).
- `Organization.logo` schema is 96×96 — Google needs ≥112×112, ideally 600×600.
- No 180×180 apple-touch-icon, no site.webmanifest with 192/512 icons.

---

## 7. AI Search Readiness (GEO) — 56/100

Detailed report: `reports/seo-geo-2026-04-28.md`

**Strengths**
- AI crawler access is exemplary in robots.txt (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot, anthropic-ai).
- llms.txt exists and follows llmstxt.org spec on format.
- FAQPage schema across 6 pages feeds Perplexity/ChatGPT-Search/Bing Copilot directly.
- Hedged enrolment number ("approximately 130") — AI models prefer hedged claims.

**Critical — llms.txt has 10 false statements** that LLMs will ingest:

| # | Line | Issue |
|---|---|---|
| 1 | 16 | `Founders: Huma Mir ... and Zoya Mir` — they are Directors |
| 2 | 29–30 | `Co-Founder:` titles — should be `Director:` (and add CEO Naveela Choudhary) |
| 3 | 36 | `Languages taught: ... Chinese, French, German` — not taught |
| 4 | 40 | `25+ sports ... including swimming pool` — no pool |
| 5 | 55 | `- Swimming pool` listed as Campus Facility — not real |
| 6 | 71 | `Three foreign languages ... with qualified instructors` — not real |
| 7 | 72 | `25+ sports including swimming pool` — no pool |
| 8 | 74 | `Weekly AI-generated progress reports for parents` — not produced |
| 9 | 85 | `Daughter: Huma Mir — co-founder` — Director |
| 10 | 86 | `Granddaughter: Zoya Mir — co-founder ... her mother Huma Mir` — Director, and incorrect family link |

Also missing from llms.txt: LinkedIn URL, LAPS affiliation note. Bump `Last updated:` to `2026-04-28`.

**Per-platform scores**
- Google AI Overviews: 52/100 — no homepage FAQPage schema; stale claims weaken Helpful Content; no external press.
- ChatGPT / Browse: 55/100 — false llms.txt claims would be repeated verbatim.
- Perplexity: 61/100 — best-positioned; benefits most from llms.txt cleanup + LinkedIn.
- Bing Copilot: 48/100 — LinkedIn missing from `sameAs`; no Wikipedia entity.

**Authority gap** — no YouTube presence (highest correlation with AI citation, ~0.737). Even one campus walkthrough video would help.

---

## 8. Local SEO — 62/100

Detailed report: `reports/seo-local-2026-04-28.md`

**Strengths**
- NAP (street address + city) is structurally consistent across all 17 footers and schema.
- LocalBusiness/EducationalOrganization/School array type on homepage with full address, geo, openingHoursSpecification, hasMap, sameAs.
- Google Maps iframe and CID embedded on `index.html` contact section.
- Cambridge Pathway accreditation prominently used as a verifiable trust signal.
- 2 blog posts explicitly target Lahore queries — good local content foundation.
- Single Lahore campus correctly handled (no improper multi-city pages).

**Gaps**
- Phone format mismatch: schema `+92-301-0499777`, footers `0301-0499777`. Directory crawlers may treat as different numbers.
- Postal code `54600` only in schema, not in any visible footer NAP.
- LinkedIn URL in footer link but not in schema `sameAs`.
- `about.html` and `ask-prof-mir.html` have no LocalBusiness schema.
- No map iframe on `campus.html` (where it would be most useful).
- No `aggregateRating` schema (Year 1 — once 5+ reviews exist).
- No on-site review-request prompt (post-enrolment / thank-you page).
- Pakistan-specific citations not yet evidenced: Bing Places, Zameen.com, Ilmkidunya.com, Cambridge Find-a-School directory.
- No neighbourhood mentions (Johar Town, Iqbal Town, Gulberg) for adjacent-catchment queries.

---

## 9. Sitemap — Pass

Detailed report: `reports/seo-sitemap-2026-04-28.md`

- 14 sitemap entries cover all 14 indexable pages. No missing, no orphaned, no duplicates, no robots.txt conflicts.
- All lastmod 2 days stale (update to `2026-04-27`).
- Deprecated `<priority>` and `<changefreq>` tags retained — Google ignores both.
- `enroll.html` and `/` both at priority 1.0 — drop `enroll.html` to 0.9 if keeping priority.

---

## Limitations of This Audit

The following could not be measured without paid or authenticated tooling and are out of scope for this run:

- **Live Core Web Vitals (CrUX field data)** — Google API key not configured. CWV score is static-analysis only.
- **Google Search Console data** — no indexation status, query impressions, CTR, or position data.
- **GA4 organic traffic** — no live trends.
- **Live SERP positions** for Lahore queries — DataForSEO MCP not available.
- **Backlink profile / Domain Rating** — DataForSEO not available.
- **Google Business Profile live data** — primary category, photo count, post history, review count and velocity.
- **Cambridge Find-a-School directory listing** — would require live fetch.

Run `python /Users/akif.hazarvi/.claude/skills/seo/scripts/google_auth.py --setup` to enable Google API enrichment on the next audit.

---

## Sub-reports (full detail)

- `reports/seo-technical-2026-04-28.md`
- `reports/seo-content-2026-04-28.md`
- `reports/seo-schema-2026-04-28.md`
- `reports/seo-sitemap-2026-04-28.md`
- `reports/seo-geo-2026-04-28.md`
- `reports/seo-local-2026-04-28.md`
- `reports/seo-images-2026-04-28.md`

Action plan with prioritisation, effort estimates, and implementation order: see `ACTION-PLAN.md`.
