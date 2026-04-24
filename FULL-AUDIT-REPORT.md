# London School — Full SEO Audit Report

**Date:** 2026-04-24
**Domain (canonical):** https://londoneducation.pk
**Hosting:** GitHub Pages (akifhazarvi.github.io/london-school)
**Pages audited:** 12 HTML files + robots.txt, sitemap.xml, llms.txt
**Business type:** Brick-and-mortar private school (K-12, Cambridge pathway), Lahore, Pakistan

---

## Executive Summary

### Overall SEO Health Score: **61 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 58 | 12.8 |
| Content Quality / E-E-A-T | 23% | 68 | 15.6 |
| On-Page SEO | 20% | 70 | 14.0 |
| Schema / Structured Data | 10% | 60 | 6.0 |
| Performance (CWV) | 10% | 70* | 7.0 |
| AI Search Readiness (GEO) | 10% | 61 | 6.1 |
| Images | 5% | 65 | 3.3 |
| **Total** | **100%** | | **~61** |

*Performance estimated from static-asset inspection (vanilla HTML/CSS/JS, single MP4, no frameworks); no CrUX field data available without GSC credentials.

### Business Type Detected
Brick-and-mortar private school, single location, Cambridge pathway, K-12, Lahore. Local SEO is a core ranking vector; service-area / multi-location considerations do not apply.

### Top 5 Critical Issues

1. **Every canonical, OG tag, JSON-LD `@id`, llms.txt URL, and sitemap entry referenced the wrong domain** (`akifhazarvi.github.io/london-school` instead of `londoneducation.pk`). Sitemap + robots.txt were fixed by the sitemap agent during this audit; **110 stale references remain across 12 HTML files and llms.txt**. Until resolved, all SEO signals consolidate around the GitHub Pages staging URL, not the production domain.
2. **Three inconsistent business names in use simultaneously** — "London School System" (schema, og:site_name), "London School — Prof. Waris Mir Campus" (nav logo), "London International Education System — Prof. Waris Mir Campus" (brochure canonical). AI models and Google Knowledge Panel cannot coalesce this into a single entity.
3. **Hamid Mir legacy link — the single highest-authority entity signal for this school in Pakistan — is absent from all structured data and llms.txt.** It appears only once, in an About page paragraph. This is the most under-leveraged trust asset on the site.
4. **Faculty credentials are generic placeholders.** Principal Mehr un Nisa Masood and Campus Director Ali Umair have no degree, no prior institution, no years of experience listed. Co-founders Huma and Zoya Mir use icon SVGs, not photos. For a YMYL (schools) category, this blocks E-E-A-T.
5. **Google Business Profile not linked from the site.** No GBP URL in `sameAs`, no Place ID in Maps embed (it uses text-query search), no review widget, no `aggregateRating`. The single largest local ranking factor is invisible.

### Top 5 Quick Wins

1. **Global find-and-replace** `akifhazarvi.github.io/london-school` → `londoneducation.pk` across all HTML + llms.txt (~10 minutes, fixes ~8 critical/high findings simultaneously).
2. **Add explicit `Allow:` lines in robots.txt** for GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot, Google-Extended (10 minutes, unlocks AI citation eligibility).
3. **Standardize the business name** to one canonical long form and one short form, used everywhere (2 hours).
4. **Add Hamid Mir to llms.txt + Waris Mir `Person` schema** as `relatedTo` / son relationship (30 min, major AI-citation unlock).
5. **Add `defer` to the YouTube iframe API script on yearbook.html:786** (1 line, fixes a render-blocking third-party script).

---

## 1. Technical SEO — Score 58/100

### Critical
- **C1. Wrong canonical domain on every indexable page.** All `<link rel="canonical">` tags point to `https://akifhazarvi.github.io/london-school/...`. If both hosts are live, Google may index the GitHub Pages copy and ignore production.
- **C2. Open Graph `og:url` and `og:image` use GitHub Pages host.** Every page. WhatsApp / Facebook previews display the staging URL — a direct trust-signal failure on the primary acquisition channel.
- **C3. JSON-LD `@id`, `item`, `url`, `logo`, `sameAs` all carry the GitHub host.** Google sees two separate entities when both domains are live.
- **C4. robots.txt `Sitemap:` directive fixed during audit.** Now correctly references `https://londoneducation.pk/sitemap.xml`. Verified.

### High
- **H1. llms.txt uses GitHub Pages URL** (9 occurrences).
- **H2. `thank-you.html` has both `noindex` and a canonical tag.** The canonical is pointless on a noindexed page and propagates the wrong domain.
- **H3. YouTube iframe API loaded synchronously** on yearbook.html:786 (render-blocking; hurts LCP on the Virtual Tour page).
- **H4. `404.html` missing `<meta name="description">` and `theme-color`** — inconsistent with every other page.

### Medium
- **M1. Footer absolute URLs** on index.html (~lines 460-490) use `akifhazarvi.github.io` host; nav correctly uses relative paths.
- **M2. No hreflang declared** — for a Pakistan-targeting site with bilingual (EN + UR) brochure, add `<link rel="alternate" hreflang="en" href="...">` self-referencing tags.
- **M3. Google Maps embed uses legacy `maps.google.com/maps?q=...` text search** rather than a Place ID. Will not tie the site to a verified GBP listing.
- **M4. No IndexNow key** for Bing/Yandex index freshness.

### Low
- No PWA manifest; missing `apple-touch-icon` on 404.html; editor.html correctly blocked (robots + noindex).

---

## 2. Content Quality & E-E-A-T — Score 68/100

### E-E-A-T Breakdown

| Factor | Score |
|---|---|
| Experience | 14/20 — real campus photos, but testimonials unsigned, no last-name verification |
| Expertise | 18/25 — curriculum content technically grounded; principal/director have no stated credentials |
| Authoritativeness | 15/25 — Hamid Mir inauguration is the strongest external signal; zero press links, no LAPS registration number, no Cambridge centre number |
| Trustworthiness | 21/30 — NAP complete and consistent; `YOUR_META_PIXEL_ID` placeholder visible in enroll.html source |

### High-Severity Findings
- **"Two US Coding Certifications" claim lacks a named issuer** across all pages. "Recognised US coding authorities" is circular and won't survive Google's QRG credentialing checks for educational institutions.
- **Faculty credentials missing.** Principal's card is two generic sentences; co-founders use icon SVGs not photos. YMYL pages require real People signals.
- **LAPS affiliation appears nowhere in HTML** — only in CLAUDE.md. The brochure's second-strongest credential after Cambridge.

### Medium-Severity Findings
- **Testimonials duplicated** across index.html and ai-robotics.html with same four names, different quotes. No photos, no dates, no attribution.
- **Waris Mir quotes on about.html and ask-prof-mir.html are unattributed.** Putting quotes in a named historical figure's mouth is a specific QRG concern on YMYL pages.
- **news.html uses emoji placeholders** (🎓, 🎮, 🏃) for several event cards. Signals fabricated content. The Hamid Mir inauguration card (with real photo) is the only exception.
- **Early Bird scarcity counter is static placeholder** — the comment says "Update weekly" but the number "47" never renders.

### Low-Severity Findings
- `faculty.html` is orphaned from main nav — only linked from one phrase on about.html that points *away* from it.
- `ai-robotics.html` is the best-structured page for AI citation (FAQPage schema with self-contained answers).

---

## 3. On-Page SEO — Score 70/100

### What's Working
- Title tags present on every page with brand suffix.
- Meta descriptions present on 11/12 pages (404.html missing).
- H1-H2-H3 hierarchy generally clean.
- Internal nav consistent across pages.
- `alt` attributes present on most images.

### Issues
- **Hero title on index.html** (`"Where Curious Kids Become Confident Learners"`) is emotive but doesn't target a local keyword. Consider "Cambridge School in Lahore" integration for the H1 or above-fold copy.
- **404.html** has no meta description and no `theme-color`.
- **Footer absolute links** (see Technical M1) bypass internal-link equity consolidation.
- **Anchor-only contact section** — no standalone /contact.html page, which weakens "London School Lahore contact" queries.

---

## 4. Schema / Structured Data — Score 60/100

### Coverage
10 of 13 HTML files contain valid JSON-LD. Missing: 404.html, thank-you.html, editor.html — none need schema.

### Critical Issues
- **Every schema block hardcodes `https://akifhazarvi.github.io/london-school/`** as the base URL (see Technical C3).
- **Wrong legal name in index.html.** Uses `"name": "London School System"` instead of `"London International Education System — Prof. Waris Mir Campus"` (legal name) with `"alternateName": "London School"`.
- **FAQPage schema on ai-robotics.html and enroll.html** — Google restricted FAQPage rich results to government/healthcare in Aug 2023. Not harmful (still helps AI/LLM citation), but do not add more.

### High-Severity Gaps
- **news.html NewsArticle items all missing required `author` property.** Items 3 and 4 also missing `image`. No rich result will fire.
- **academics.html Course items missing `hasCourseInstance`** (required by Google for Course rich results).
- **No `School` type.** Currently uses `["EducationalOrganization", "LocalBusiness"]`; `School` is the more specific and preferred subtype.

### Medium-Severity Gaps
- Geo coordinates at 4 decimal places (`31.4697`, `74.2728`) — recommended minimum is 5. Also needs verification — these coordinates land in Johar Town, not Township; confirm pin against actual address.
- `openingHoursSpecification` is a single object; validators prefer an array.
- No `aggregateRating`, no `hasMap`, no GBP URL in `sameAs`.
- No Person schema for founders Huma Mir / Zoya Mir on about.html (they appear in `founder` array on index.html with no `@id` cross-reference).
- Principal photo missing from Person schema on faculty.html.

---

## 5. Performance (CWV) — Estimated 70/100

### Signals (static analysis)
- Pure HTML + vanilla JS, no frameworks — excellent baseline.
- `hero-intro.mp4` video loop on homepage — needs `preload="metadata"` verification and poster image (verified `hero-intro-poster.jpg` exists).
- YouTube iframe API loaded **synchronously** on yearbook.html:786 — confirmed render-blocker.
- Google Fonts (Nunito, Inter) loaded via Google Fonts CDN — usually fine with `display=swap`, verify.
- No lazy-loading audit performed on non-hero images.

### Recommendation
Run `scripts/google_auth.py --check` to connect CrUX/PageSpeed Insights for real field data. Without it, the score is a lab estimate.

---

## 6. AI Search Readiness (GEO) — Score 61/100

### Dimension Breakdown
| Dimension | Weight | Score |
|---|---|---|
| Citability | 25% | 58 |
| Structural Readability | 20% | 72 |
| Multi-Modal Content | 15% | 55 |
| Authority & Brand Signals | 20% | 62 |
| Technical Accessibility | 20% | 58 |

### Critical Findings
- **robots.txt has no explicit AI crawler rules.** While `User-agent: *` allows all, absence of explicit `Allow: /` lines for GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot, and Google-Extended signals ambiguity. Add explicit rules.
- **Three-name brand problem** (see Exec Summary #2). Fixes entity graph consolidation.
- **Hamid Mir absent from llms.txt and all Schema.org markup.** Only Pakistan-level high-authority entity connected to this school. Adding `Son: Hamid Mir (senior journalist, Geo TV)` to llms.txt Waris Mir section and `relatedTo` in about.html Person schema is the single highest-impact AI-citation change.

### Structural
- `ai-robotics.html` FAQPage is the strongest citable content on the site.
- Other pages lead with marketing phrases rather than direct answer sentences in their first 40 words.
- No FAQPage schema on ask-prof-mir.html despite being the most brand-differentiating page.

### Platform Citation Likelihood (current state)
| Platform | Current Score | Primary blocker |
|---|---|---|
| Google AI Overviews | Low | Domain authority + name inconsistency |
| ChatGPT | Medium | Name confusion (ai-robotics FAQPage helps) |
| Perplexity | Medium-Low | No PerplexityBot Allow directive |
| Bing Copilot | Low | No Bing signals, weak backlinks |

---

## 7. Local SEO — Score 54/100

### Dimension Scores
| Dimension | Weight | Score |
|---|---|---|
| GBP Signals | 25% | 28 |
| Reviews & Reputation | 20% | 20 |
| Local On-Page SEO | 20% | 72 |
| NAP Consistency | 15% | 78 |
| Local Schema | 10% | 70 |
| Local Links & Authority | 10% | 100* |

*Estimated; not directly measurable from static HTML.

### Critical Findings
- **GBP not claimed or linked from site.** No GBP URL in `sameAs`, no Place ID in Maps embed, no `aggregateRating`, no review widget. The single biggest local ranking lever is unused.
- **Canonical domain mismatch** (same root-cause as Technical C1).

### High-Severity Findings
- **Maps iframe uses text-query URL** (`maps.google.com/maps?q=...`) not a verified Place ID — doesn't tie site to GBP listing.
- **Geo coordinates imprecise and may be wrong.** `31.4697, 74.2728` lands in Johar Town, not Township. Verify against satellite view of actual address.
- **Schema `@type` should be `School`**, not just `EducationalOrganization`.

### Medium-Severity Findings
- No standalone `/contact.html` — only an anchor `#contact`. Weakens "London School Lahore contact" query targeting.
- Neighborhood name ("Township", "Ali Road") not in H2s. Missing opportunity for "Cambridge school Township Lahore" queries.
- Phone format inconsistent: schema `+92-301-0499777`, contact section `+92 301 0499777`, footer `0301-0499777`, WhatsApp `923010499777`. Standardize schema to `+92-301-0499777`.
- Not listed on Pakistan-specific directories (Mera School, ilmkidunya).

### Review Health
- Homepage testimonials (4 names: Sarah Ahmed, Fahad Khan, Ayesha Malik, Usman Iqbal) duplicated on ai-robotics.html with different quotes. No photos, no dates, no platform attribution. High risk of being perceived as fabricated.

---

## 8. Sitemap — FIXED during audit

Sitemap and robots.txt were updated during this audit run:
- All 10 URLs repointed to `https://londoneducation.pk`
- `ai-robotics.html` added (was missing)
- `lastmod` set to `2026-04-24`
- `robots.txt` `Sitemap:` directive corrected

`thank-you.html`, `404.html`, `editor.html` correctly excluded.

---

## 9. Images — Score 65/100

### What's Working
- Most images have alt text.
- Video hero has poster image (`hero-intro-poster.jpg`).
- School-specific imagery present (building, classrooms, faculty CPD, Hamid Mir inauguration).

### Issues
- No comprehensive alt-text audit performed (would require per-file sweep).
- Co-founder cards use icon SVG placeholders instead of real photos.
- news.html uses emoji-as-thumbnail for 3 of 4 event cards.
- No image dimensions audit (potential LCP / CLS impact).

---

## Summary: Top Root-Cause Fix

**One find-and-replace resolves ~40% of all findings.**

Replace `akifhazarvi.github.io/london-school` → `londoneducation.pk` across:
- All 12 HTML files (110 occurrences total)
- llms.txt (9 occurrences)

This alone fixes: Technical C1, C2, C3, H1, H2, M1; Schema Critical #1 + Local Critical domain mismatch; improves Local, GEO, and Content trust signals.

See `ACTION-PLAN.md` for prioritized next steps.
