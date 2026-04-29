# London School — SEO Action Plan

**Generated:** 2026-04-28
**Overall Health:** 73/100 (was 61 on 2026-04-24)
**Source audit:** `FULL-AUDIT-REPORT.md` and seven specialist reports in `/reports/`

This plan is sequenced by **business risk first, ranking impact second, polish last.** The Critical block can ship in a single afternoon and removes the trust-and-compliance liabilities. Everything else compounds gradually.

---

## CRITICAL — Ship today (compliance + trust)

These remove false claims that contradict what the school actually offers. Every day they stay live is a Helpful Content signal violation and a parent-trust risk.

### C1 — Remove "Three Foreign Languages" claims from HTML and schema *(20 min)*

| File | Line | Action |
|---|---|---|
| `index.html` | 384 | Replace `Cambridge curriculum plus Chinese, French, and German.` → `Cambridge IGCSE pathway with two US coding certifications by Kindergarten and a full robotics programme.` |
| `index.html` | 337–338 | Replace proof-bar `3 / Foreign Languages` → `2 / US Coding Certifications` |
| `index.html` | 385 | Replace pill `3 Languages` → `Coding Certifications` |
| `about.html` | 359 | Replace `Cambridge curriculum, three foreign languages, AI and robotics, 25+ sports.` → `Cambridge curriculum, AI-integrated learning, robotics from the early years, and 25+ sports and activities.` |
| `academics.html` | 58 | Rewrite Twitter description without "three foreign languages" |
| `academics.html` | 75 | Rewrite schema CollectionPage description without "three foreign languages" |
| `academics.html` | 153 | Delete the entire ListItem position 3 (Foreign Languages Course) |

### C2 — Remove "Swimming Pool" claims from HTML and schema *(5 min)*

| File | Line | Action |
|---|---|---|
| `campus.html` | 105 | Delete `LocationFeatureSpecification` `Swimming Pool: true` from `amenityFeature` array |
| `thank-you.html` | 171 | Replace `swimming pool` → `computer lab` (or another real facility) |

### C3 — Fix llms.txt: 10 false statements *(30 min)*

Apply the exact replacements documented in `reports/seo-geo-2026-04-28.md` Changes 1–5:

- Lines 16, 29–30, 85–86, 92 → leadership: drop "Founders" line; replace `Co-Founder` titles with `CEO: Naveela Choudhary` + `Director: Huma Mir` + `Director: Zoya Mir`; rewrite Q1 attribution.
- Line 36 → `Languages of instruction: English, Urdu`
- Line 71 → delete entirely
- Line 40 → drop "swimming pool" from sports list
- Line 55 → delete `- Swimming pool` line entirely
- Line 72 → `25+ sports and activities`
- Line 74 → replace "Weekly AI progress reports" with "Regular parent-teacher updates and communication via WhatsApp and in-person meetings"
- Append `LinkedIn:` line under Social Media; append `LAPS:` affiliation under Identity
- Bump `Last updated:` line 3 to `2026-04-28`

### C4 — Update admissions cycle from 2025-26 *(15 min)*

Confirm with admissions whether the priority is `2026-27` or `Now Enrolling`, then update:

- `index.html` line 272 — hero badge
- `enroll.html` lines 46, 55, 58 (3 meta description tags), 176, 312–313 (stat block)
- `academics.html` line 758
- `yearbook.html` line 173
- `news.html` line 287

---

## HIGH — Ship this week (ranking impact)

### H1 — Add "Lahore" to homepage `<title>` *(2 min)*

`index.html` `<title>` currently:
`London School — Pakistan's Most Advanced AI & Robotics School With Cambridge Pathway`

Replace with:
`London School Lahore — Cambridge AI & Robotics School | Prof. Waris Mir Campus`

Single highest-leverage on-page change for "Cambridge school Lahore" / "AI school Lahore" rankings.

### H2 — Schema fixes on `index.html` *(15 min)*

In the organisation block:
```json
"sameAs": [
  "https://www.facebook.com/londonschoolwarismir/",
  "https://www.instagram.com/londoninternational.school/",
  "https://maps.google.com/?cid=7737999795082975354",
  "https://www.linkedin.com/company/113215995"
],
"priceRange": "PKR 15,000–22,000/month"
```

Remove the `potentialAction` (`SearchAction`) block from the WebSite schema entirely — site has no search.

### H3 — Add `width` and `height` to all `<img>` tags *(2–3 hours)*

130 of 138 image tags lack intrinsic dimensions. Biggest CLS / Core Web Vitals fix on the site, especially for the Pakistani-mobile audience. Use a script to read each image's dimensions and add the attributes; verify visual layout afterwards.

### H4 — Trim 6 meta descriptions to ≤155 chars *(20 min)*

`index.html` (164), `about.html` (177), `academics.html` (170), `ai-robotics.html` (192), `enroll.html` (183 — also drop "2025–26"), and re-check `campus.html` (157, borderline). Lead each description with the primary local query intent.

### H5 — Sitemap cleanup *(10 min)*

- Update all 14 `lastmod` to `2026-04-27`.
- Drop `enroll.html` priority from 1.0 to 0.9.
- Remove all `<priority>` and `<changefreq>` tags (Google ignores).

### H6 — Fix generic alt text *(20 min)*

- Site-wide `alt="Crest"` → `alt="London School Prof. Waris Mir Campus crest"`.
- 3 pages have `alt="Robotics lab"` mistakenly on the *nav crest* (`campus.html`, `news.html`, `yearbook.html`) — fix to crest alt.
- `index.html` campus tile alts (`Corridor`, `Robotics`, `Computers`, `Play area`) — expand each with descriptive Lahore/Cambridge context (e.g. `Bright corridor inside London School's Lahore campus`).

### H7 — Add postal code 54600 to footer NAP across all pages *(15 min)*

Currently schema-only. Visible HTML is what directory aggregators scrape.

### H8 — Add `BreadcrumbList` to `blog/index.html` *(5 min)*

Snippet in `reports/seo-schema-2026-04-28.md` Fix H3.

---

## MEDIUM — Ship this month (compounding gains)

### M1 — Add FAQPage schema to `index.html` *(45 min)*

5–7 Q/As on the homepage covering: fee range, age range, admissions process, Cambridge accreditation, location, sports/activities, AI Study Buddy. Boosts AI Overviews / Perplexity / ChatGPT-Search citation likelihood — homepage is the highest-authority page.

### M2 — Switch 5 blog `<img>` references from JPG to existing WebP siblings *(10 min)*

`building-day`, `event-cultural-day-full`, `campus-library-study`, `life-nursery-corridor`. Saves 40–60% bytes with no new assets. Also flip blog hero `loading="lazy"` → `fetchpriority="high"` since heroes are LCP elements.

### M3 — Create 4 dedicated 1200×630 OG images for blog posts *(1–2 hours)*

`og-blog-cambridge.jpg`, `og-blog-igcse.jpg`, `og-blog-4-year-old.jpg`, `og-blog-holidays.jpg`. Update each blog post's `og:image` and `twitter:image` meta tags. nanobanana-mcp not detected in this environment — generate manually or via another tool.

### M4 — Author attribution on blog `BlogPosting` schema *(20 min)*

Add an `author` `Person` object on each of the 5 blog posts (Principal Mehr un Nisa Masood or named Admissions Director). E-E-A-T improvement for a Year-1 school.

### M5 — Hamid Mir inauguration news article with Article schema *(2 hours)*

Strongest available external-entity citation chain. Article schema with `datePublished`, `author` (the school), and `sameAs` linking to Hamid Mir's Wikipedia entry. Place under `news.html` or as a standalone post.

### M6 — Add Google Maps iframe to `campus.html` *(5 min)*

Copy the iframe from `index.html` contact section. `campus.html` already has `hasMap` in schema — pair it with the visible map.

### M7 — Pad lead paragraphs to ~150 words *(30 min)*

`academics.html`, `ai-robotics.html`, `campus.html` lead paragraphs are 20–40 words. Expand to ~150 words with definitive "X is Y" sentences for AI passage extraction.

### M8 — Pakistan-specific citations *(1–2 hours)*

- Claim Bing Places (transfers GBP data — 30 min).
- Submit to Zameen.com schools listing.
- Submit to Ilmkidunya.com.
- Verify Cambridge International "Find a School" directory listing; if missing, contact Cambridge to enable.

### M9 — Add neighbourhood line to footer or contact section *(5 min)*

One sentence: `Serving families across Township, Johar Town, and Iqbal Town, Lahore.` Improves geo-relevance for adjacent-catchment queries without creating duplicate pages.

### M10 — `Organization.logo` schema upgrade *(15 min)*

Re-encode `/img/logo.jpg` (currently 545×616) as `logo-512.webp` or PNG at ≥600×600. Also add a 180×180 `apple-touch-icon` and a basic `site.webmanifest` with 192/512 icons.

---

## LOW — Backlog

- Add `Cross-Origin-Resource-Policy: same-origin` header in vercel.json.
- Remove the stale `Disallow: /editor.html` line from robots.txt.
- Standardise phone format between schema and footer (or accept the discrepancy — low impact).
- Add `aggregateRating` schema once 5+ Google reviews exist.
- Add a post-enrolment review-request prompt (WhatsApp message or thank-you page).
- Create a YouTube channel with at least one campus walkthrough video (highest correlation with AI citation, ~0.737).
- Image sitemap entries for `/img/og/` and high-value campus photos.

---

## Suggested Implementation Order

**Day 1 (afternoon, ~2 hours)**
- All Critical items (C1–C4) — false claims removed, llms.txt fixed, admissions year updated.
- Quick Wins H1, H2, H5 — title fix, schema sameAs/priceRange/SearchAction, sitemap cleanup.

**Day 2 (~3 hours)**
- H3 — width/height attributes on all images.
- H4, H6, H7 — meta descriptions trimmed, alt text fixed, postal code in footers.
- H8 — blog/index breadcrumb.

**Week 2**
- M1, M4, M6, M7, M9, M10 — homepage FAQ schema, blog authors, campus map, lead paragraphs, neighbourhood line, logo upgrade.
- M2 — blog WebP swap.

**Month 1**
- M3 — blog OG images.
- M5 — Hamid Mir inauguration article (timed with the actual event).
- M8 — Pakistan-specific citations.

**Re-audit:** run `/seo-audit` again on 2026-05-26 (4 weeks) with Google API credentials configured (`python /Users/akif.hazarvi/.claude/skills/seo/scripts/google_auth.py --setup`) to enrich with CrUX field data, GSC indexation, and GA4 organic trends.

---

## What this plan deliberately does NOT include

- **Multi-city or multi-location pages.** Single Lahore campus only.
- **Re-adding swimming pool, foreign-language, or "Weekly AI progress report" claims.** Already removed; do not regress.
- **Named parent testimonials.** Anonymous-only convention is intentional.
- **GitHub Pages migration.** Site is on Vercel; that move is done.
