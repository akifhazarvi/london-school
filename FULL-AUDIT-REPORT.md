# Full SEO Audit — London School System

**Site:** https://akifhazarvi.github.io/london-school/
**Business:** London School System / Prof. Waris Mir Campus — Cambridge school in Lahore, Pakistan
**Business Type:** Local Service — brick-and-mortar private K-12 school
**Industry:** Education (Cambridge IGCSE + AI/robotics + sports)
**Audit Date:** 2026-04-18
**Pages Crawled:** 10 HTML files (9 public + 404)

---

## Executive Summary

### Overall SEO Health Score: **55 / 100**

| Category | Weight | Score | Weighted |
|----------|-------:|------:|---------:|
| Technical SEO | 22% | 68 | 14.96 |
| Content Quality / E-E-A-T | 23% | 52 | 11.96 |
| On-Page SEO | 20% | 65 | 13.00 |
| Schema / Structured Data | 10% | 30 | 3.00 |
| Performance (CWV — lab) | 10% | 45 | 4.50 |
| AI Search Readiness (GEO) | 10% | 54 | 5.40 |
| Images | 5% | 50 | 2.50 |
| **TOTAL** | **100%** | — | **55.3** |

Supplementary — not in weighted total: **Local SEO: 41/100** (critical for this business type).

### Top 5 Critical Issues

1. **`#contact` section missing on index.html.** Every page's nav links to `#contact` but the section does not exist on the homepage — CTAs flow straight into the footer. This breaks the primary conversion path and removes the opportunity for a Google Maps embed (a major local ranking signal).
2. **Empty `sameAs: []` in the homepage JSON-LD** at [index.html:55](index.html#L55). Facebook and Instagram URLs exist site-wide but are not linked in structured data — a 2-minute fix that connects the school entity to its verified web identity.
3. **"15+ Years Serving Lahore Families" on [enroll.html](enroll.html) contradicts `foundingDate: "1987"`** in the homepage schema. 2026 − 1987 = 39 years. Parents who do the math will distrust the figure; AI systems cite the contradiction.
4. **Only 1 of 9 public pages has JSON-LD structured data.** 8 pages (about, academics, faculty, campus, enroll, news, yearbook, ask-prof-mir) have no BreadcrumbList, no page-specific schema. Schema agent provided ready-to-paste snippets.
5. **Faculty placeholders on [faculty.html](faculty.html).** The "Head of Academics" card is literally named "Senior Faculty," the six teacher gallery thumbnails are all labelled "Teacher / Faculty." This is the single biggest E-E-A-T failure on the site for a school.

### Top 5 Quick Wins (under 30 minutes each)

1. Populate `sameAs` with the real Facebook and Instagram URLs (already live in footers).
2. Change "15+ Years" to "Since 1987 · 39 Years Serving Lahore Families" on [enroll.html](enroll.html).
3. Copy the four Twitter Card meta tags from [index.html:18-21](index.html#L18-L21) into the `<head>` of the other 8 public pages.
4. Create `/llms.txt` at repo root with the structured school-facts document the GEO agent drafted.
5. Add `Disallow: /london-School/` to robots.txt — that directory holds raw WhatsApp source media that should not be crawled.

---

## 1. Technical SEO — 68/100

### Crawlability — PASS

- `robots.txt` correctly disallows `editor.html`, `server.py`, `content.json`; sitemap declared.
- `sitemap.xml` lists all 9 public pages. Updated during this audit to include `<lastmod>` dates (sitemap agent rewrote the file — verify before deploy).
- `404.html` correctly excluded from sitemap; GitHub Pages recognises it by convention.
- **Gap:** `/london-School/` directory at repo root contains raw WhatsApp JPEGs + MP4s. Should be disallowed in robots.txt or deleted from the deploy.

### Indexability — PASS (one slug mismatch)

- All 9 public pages have correct absolute-URL canonicals.
- No `noindex` on public pages (correct). No duplicate URL variants.
- **Slug mismatch:** [yearbook.html](yearbook.html) has `<title>Virtual Tour — London School System</title>` and is labelled "Virtual Tour" in every nav link — but the URL slug is `yearbook`. Keyword-URL disconnect leaks ranking potential for "virtual tour school Lahore."

### On-Page Meta

| Check | Status | Notes |
|-------|:------:|-------|
| Unique titles | ✓ | All 9 pages unique, 28–58 chars |
| Unique descriptions | ✓ | All unique; [yearbook.html](yearbook.html) description is 204 chars (truncates in SERPs) |
| Open Graph | ✓ | Complete on all 9 public pages |
| **Twitter Cards** | ✗ | **Only [index.html](index.html) has them.** Missing from the other 8 public pages |
| `<html lang>`, charset, viewport | ✓ | Present on all pages |
| Canonical tags | ✓ | Correct absolute URLs |
| Favicon + apple-touch-icon | ✓ | Present (missing only from 404.html) |
| theme-color | ✓ | `#C1353D` on all public pages |

### Internal Linking & Dead Anchors — FAIL

14 `href="#"` dead anchors across 10 files:

- **YouTube footer icon** on all 9 public pages + editor.html (10 total). No YouTube channel exists yet.
- **[news.html:122](news.html#L122)** — "Read Full Story" on the Hamid Mir inauguration card. This is the site's strongest authority signal; dead link destroys the value.
- **[news.html:186](news.html#L186)** — "Learn More" on a second news card.
- **[editor.html:324](editor.html#L324)** — "Parent Portal / AI Progress Reports / Events / Privacy Policy" (editor is in robots Disallow so not crawled, but UX).

### Mobile — PASS

All pages carry `<meta name="viewport">`, `<html lang="en">`, `<meta charset="UTF-8">`. CSS uses `clamp()` fluid type + named breakpoints (900/768/600/480px). No `user-scalable=no`.

### Security — PASS (platform-constrained)

GitHub Pages enforces HTTPS. Custom security headers (CSP, X-Frame-Options, Referrer-Policy) cannot be set on GH Pages without a `_headers` file (Netlify-only feature). No mixed content detected.

---

## 2. Content Quality / E-E-A-T — 52/100

### E-E-A-T Breakdown

| Factor | Score | Key Gap |
|--------|------:|---------|
| Experience | 9/20 | Campus photos exist, but no student outcomes, alumni stories, or competition results. Testimonials are anonymous initials. |
| Expertise | 10/25 | No teacher credentials. "Cambridge Certified" claimed but unverified. No subject syllabi, no exam pass rates. |
| Authoritativeness | 9/25 | Hamid Mir inauguration event is the only third-party signal on the whole site — and its link is dead. No Cambridge Centre Number cited. |
| Trustworthiness | 14/30 | NAP consistent. Schema present. But "98% Parent Satisfaction" has no source; "15+ Years" contradicts `foundingDate: 1987`. |

**Composite E-E-A-T: 42/100.**

### Thin Content Risk

| Page | Estimated Words | Risk |
|------|----------------:|:-----|
| [campus.html](campus.html) | ~150 | High |
| [yearbook.html](yearbook.html) | ~200 | High |
| [ask-prof-mir.html](ask-prof-mir.html) | ~300 | Medium (mostly JS-rendered chat; static prose thin) |
| [faculty.html](faculty.html) | ~400 | Medium |
| [enroll.html](enroll.html) | ~550 | Borderline (conversion page) |

### Duplicate / Boilerplate Issues

- The three value cards "Curiosity First / Every Child Matters / Ready for the World" appear near-verbatim on [index.html](index.html), [about.html](about.html), and [faculty.html](faculty.html).
- "We Never Stop Learning Either" CPD section appears on both [academics.html](academics.html) and [faculty.html](faculty.html).
- Footer copy varies ("Pakistan's premier..." on [index.html:300](index.html#L300) vs "A warm, nurturing school..." on the other 8) — inconsistent brand voice.

### Leadership conflict

[about.html:163-165](about.html#L163-L165) attributes the principal's message to **Mehr un Nisa Masood**; [faculty.html:131](faculty.html#L131) shows **Ali Umair** as Campus Director. Neither page reconciles or acknowledges the other. Fix before a parent spots it.

### AI Citation Readiness — 38/100

Fees, address, phone are clearly stated (good). Missing: no `FAQPage`, no `Course`, no `Person` for named faculty, no `NewsArticle`. "98% satisfaction" unciteable without methodology. News items lack author bylines.

---

## 3. On-Page SEO — 65/100

### Heading Structure

All 10 files have exactly one `<h1>` — good. But:

- **[faculty.html:68](faculty.html#L68)** has `<h1>About Us</h1>` — this is the **faculty** page. Duplicates the H1 on [about.html:139](about.html#L139). Should be `<h1>Our Faculty</h1>` or similar.
- **[enroll.html:69](enroll.html#L69)** H1 "Start Your Child's Journey" — no geo or keyword signal for a fees/admissions page.
- **[index.html:120](index.html#L120)** H1 "Pakistan's Top AI & Robotics School" — strong brand, weak geo (no "Lahore").

### Title / Description — Local Keyword Gap

Only the homepage title includes any geo signal (and only "Pakistan," not "Lahore"). Meta descriptions only reference Lahore on `index.html`. Entire categories of high-intent local queries go un-targeted:

- "Cambridge school Lahore"
- "IGCSE school Lahore"
- "school near Township Lahore"
- "AI robotics school Pakistan"
- "school admissions Lahore 2025"

### Internal Linking Issues

- `#contact` linked from nav on every page — but no `#contact` anchor/section exists on index.html. Nav dead-end.
- YouTube footer links dead on 10 files.
- News card "Read More" links dead on 2 cards.

---

## 4. Schema / Structured Data — 30/100

### Coverage

| Page | Schema Types |
|------|--------------|
| index.html | EducationalOrganization (1 block) |
| about.html, academics.html, faculty.html, campus.html, enroll.html, news.html, yearbook.html, ask-prof-mir.html | **None** |

### Validation — index.html EducationalOrganization

| Check | Status |
|-------|:------:|
| `@context`, `@type` valid | ✓ |
| `name`, `address.PostalAddress`, `telephone`, `email` | ✓ |
| `foundingDate`, `founder` | ✓ |
| **`sameAs`** | ✗ Empty array — dead signal |
| **`geo` coordinates** | ✗ Missing — needed for map-pack |
| **`addressRegion`, `postalCode`** | ✗ Missing ("Punjab" / "54600") |
| **`openingHoursSpecification`** | ✗ Only the legacy string form present |
| **`priceRange`, `areaServed`** | ✗ Missing |
| **`accreditedBy`** (Cambridge) | ✗ Missing |
| Dual `@type: ["EducationalOrganization", "LocalBusiness"]` | ✗ Missing |

### Priority Schema Additions

See [ACTION-PLAN.md](ACTION-PLAN.md) for ready-to-paste snippets. Order:
1. Enrich homepage EducationalOrganization (fill sameAs, add geo, dual @type, accreditedBy, priceRange).
2. Add fee `Offer` blocks + BreadcrumbList on [enroll.html](enroll.html).
3. Add `Person` schema for Prof. Waris Mir + Ali Umair + BreadcrumbList on [faculty.html](faculty.html).
4. `NewsArticle` per card + `ItemList` on [news.html](news.html).
5. BreadcrumbList on all remaining pages.

---

## 5. Performance — 45/100 (lab estimate; field data not available)

### Render-Blocking & Asset Loading

- **Google Fonts via `@import` inside [css/design-system.css:5](css/design-system.css#L5).** Creates a CSS waterfall — fonts only start downloading after the stylesheet is parsed. Move to `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>` of every HTML file.
- **No `<link rel="preload">` for LCP images** anywhere.
- **[about.html:168](about.html#L168) hero image `staff-2.jpg` uses `loading="lazy"`.** Lazy-loading the LCP candidate delays its fetch — change to `loading="eager" fetchpriority="high"`.
- **[academics.html:538-545](academics.html#L538-L545)** — hero `<video>` elements have no `poster` attribute. Video isn't a valid LCP candidate; without a poster, no image LCP exists above the fold.

### CLS Risk

**No `<img>` tag on any page has `width`/`height` attributes.** The browser cannot reserve layout space before images load. Systemic CLS risk across the site.

### Asset Weight

- **Videos:** `robotics.mp4` 5.5 MB + `robotics2.mp4` 11 MB + `robotics3.mp4` 4.8 MB = **21 MB** of hero video on academics.html. Use a single short loop with lighter encoding, or defer behind a click-to-play poster.
- **Largest single image:** `img/school/faculty-staff-team.jpg` = **1.75 MB**. Compress to under 300 KB.
- **Second largest:** `img/yearbook/campus-office.jpg` = 1.0 MB.
- **CSS:** 84 KB unminified across 5 files. JS: 72 KB unminified. Reasonable for a static site; minification optional.

---

## 6. Images — 50/100

### Alt Text Coverage — PASS

71 raster images site-wide. All meaningful images have descriptive alt text. The 3 empty `alt=""` cases are intentional:
- [yearbook.html:69](yearbook.html#L69) — decorative fallback (`aria-hidden="true"`)
- [yearbook.html:750](yearbook.html#L750), [campus.html:379](campus.html#L379) — lightbox placeholder swapped via JS

### Format Opportunity

- **0 WebP, 0 AVIF** — every image is JPEG or PNG. WebP at 80 quality typically saves 25–35% over JPEG at the same perceived quality.
- **No `<picture>` / `srcset`** anywhere. Mobile users on 375px screens download the same 1600px hero JPEGs desktop users see.

### Oversized Files (>300 KB)

| File | Size | Page |
|------|-----:|------|
| `school/faculty-staff-team.jpg` | 1.75 MB | faculty.html |
| `yearbook/campus-office.jpg` | 1.0 MB | yearbook.html |
| `yearbook/life-aerial-study.jpg` | 412 KB | yearbook.html |
| `yearbook/campus-building-day.jpg` | 408 KB | yearbook.html |
| `yearbook/campus-hallway-2.jpg` | 360 KB | yearbook.html |
| + 6 more in the 300–360 KB range | | |

### Other

- Good: every non-hero image uses `loading="lazy"`.
- Bad: no `width`/`height` on any `<img>` → CLS risk.

---

## 7. AI Search Readiness (GEO) — 54/100

### AI Crawler Access — PASS

`robots.txt` uses `User-agent: * / Allow: /` — GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot all have access.

### llms.txt — MISSING (critical)

No `/llms.txt` at repo root. GEO agent drafted a complete file (see [ACTION-PLAN.md](ACTION-PLAN.md)) covering identity, leadership, programme, fees, admissions, campus, founder bio, social — ready to paste.

### Per-Platform Estimates

| Platform | Score | Biggest Gap |
|----------|------:|-------------|
| Google AI Overviews | 48 | No FAQPage; empty `sameAs`; no GBP |
| ChatGPT / SearchGPT | 52 | No llms.txt; JS-only stats; thin prose |
| Perplexity | 60 | Fees in styled `<div>` not table/schema |
| Bing Copilot | 45 | No FAQPage; no Wikipedia entity; YouTube dead |

### JS-Only Content (invisible to crawlers)

- [index.html](index.html) and [enroll.html](enroll.html) proof-bar stat counters use `data-count` driven by `main.js` — crawlers see "0+" instead of "100+".
- The entire [ask-prof-mir.html](ask-prof-mir.html) chat UI — zero chat content in HTML source.

### Missing Static FAQ Content

No page carries static parent FAQs (fees, admissions, uniform, hours, curriculum). FAQPage schema + static HTML Q&As on [enroll.html](enroll.html) would feed AI Overviews and Bing Copilot People Also Ask.

---

## 8. Local SEO (supplementary) — 41/100

### NAP Consistency

Street address is identical across all 9 pages and matches the homepage schema — good.

**Discrepancies:**
- Schema telephone lists 2 numbers; footer shows 3 (missing `+92-42-35216425` in schema).
- `addressRegion` (Punjab) and `postalCode` (54600 for Township Lahore) missing in schema.
- `sameAs: []` empty — Facebook and Instagram exist but are not in structured data.

### Google Business Profile Readiness

- **No Google Maps iframe on any page.** The `#contact` section referenced in nav does not exist on index.html.
- GBP claim status unknown from site-level inspection.
- 10+ ready photos in `img/` (building, hallway, labs, play area) — upload-ready.

### Local Keyword Signals

Only the homepage title + meta description mention geographic context — and "Pakistan" not "Lahore." All inner-page titles are generic. Inject "Lahore" into every inner-page title and description.

### Stat Consistency

Hero trust bar on [index.html](index.html) says "100+ families" — CLAUDE.md spec says "500+ families" — meta description implies mass scale. Pick one number and standardise site-wide.

---

## Severity Index

| Severity | Count | Examples |
|----------|------:|----------|
| **Critical** | 5 | Missing `#contact` section, empty `sameAs`, "15+ Years" contradiction, 8 pages without JSON-LD, faculty placeholders |
| **High** | 12 | Twitter Cards on 8 pages, dead news anchors, no preload for LCP, about.html lazy hero, `@import` Google Fonts, no GBP/Maps embed, duplicate value cards, leadership conflict, no `width`/`height` on images, 21 MB hero video, 1.75 MB faculty photo, `/london-School/` dir exposed |
| **Medium** | 14 | Video poster missing, YouTube dead links, no llms.txt, no FAQPage schema, Lahore absent from inner-page titles, `yearbook.html` slug mismatch, 204-char meta description, no WebP, no addressRegion/postalCode, `openingHours` legacy format, no Person schema, no NewsArticle schema, stat inconsistency (100 vs 500), faculty H1 "About Us" |
| **Low** | 8 | 404.html missing `noindex` + apple-touch-icon, no IndexNow, no PWA manifest, no image sitemap, deprecated `priority`/`changefreq` in sitemap (already fixed), Urdu language consideration, custom domain migration, review schema |

---

## Files Written

- `sitemap.xml` — rewritten by sitemap agent with `<lastmod>2026-04-13</lastmod>` on all 9 URLs; `<priority>` and `<changefreq>` removed (Google ignores them). **Review the diff before deploying.**
- `FULL-AUDIT-REPORT.md` — this file
- `ACTION-PLAN.md` — prioritised fixes with paste-ready snippets

## What Was Not Measured

- Real-field Core Web Vitals from CrUX (Google API credentials not configured)
- Live SERP positions (DataForSEO not used in this run)
- Backlink profile
- Actual GBP listing state / review count / velocity
- Existing citation profile on Pakistan education directories
