# Implementation Roadmap

Four phases over 12 months, starting May 2026.

---

## Phase 1 — Foundation (Weeks 1–4 · May 2026)

**Goal:** Crawlable, indexable, schema'd, GBP live, analytics in place.

### Technical
- [ ] Verify `londoneducation.pk` in Google Search Console + Bing Webmaster
- [ ] Submit `sitemap.xml` to GSC and Bing
- [ ] Confirm GA4 tag (`G-S3PMR30G31`) firing on every page; add WhatsApp-click + form-submit events
- [ ] Add UTM tagging to all Meta ad URLs so organic vs paid is separable in GA4
- [ ] Run Lighthouse mobile audit; fix any LCP > 2.5s, CLS > 0.1, INP > 200ms
- [ ] Add `EducationalOrganization` JSON-LD (with full address, geo, openingHours, sameAs) to every page
- [ ] Add `BreadcrumbList` schema to all non-home pages
- [ ] Validate `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended
- [ ] Confirm `llms.txt` matches brochure facts

### Content
- [ ] Ship `/admissions/fees/`, `/admissions/process/`, `/admissions/visit/`
- [ ] Ship `/about/founders/`, `/about/principal/`
- [ ] Publish 4 launch blog posts (see `CONTENT-CALENDAR.md` weeks 1–4)
- [ ] Ensure every page has unique `<title>` and meta description

### Local
- [ ] Create / claim Google Business Profile — full categories, hours, photos (15+), services
- [ ] Create Bing Places, Apple Maps, Facebook Place listings — same NAP
- [ ] Seed first 10 reviews from current parents (organic ask, no incentive)

**Exit criteria:** All 9 existing pages pass Lighthouse 90+ mobile, GBP live with 10+ photos and 5+ reviews, schema validates in Schema.org validator + Google Rich Results test.

---

## Phase 2 — Expansion (Weeks 5–12 · June–July 2026)

**Goal:** Build out programmes, faculty, first neighborhood pages, weekly publishing.

### Technical
- [ ] Add `EducationalOccupationalProgram` schema to all `/programs/*` and `/academics/*` pages
- [ ] Add `Person` schema to `/faculty/` profiles
- [ ] Add `FAQPage` schema to admissions pages
- [ ] Set up internal-link audit (manual or via Screaming Frog free tier)
- [ ] Set up rank tracking on 30 priority keywords (Ahrefs free / SE Ranking / Semrush trial)

### Content
- [ ] Ship `/programs/coding/`, `/programs/languages/`, `/programs/sports/`
- [ ] Fill `/faculty/` with 8–12 teacher bios (photo, degree, years teaching, subjects)
- [ ] Ship 2 neighborhood pages: Ideal Park Township, Model Town
- [ ] 8 blog posts (CONTENT-CALENDAR weeks 5–12)
- [ ] Publish first 2 student-work / event posts under `/news/`

### Local
- [ ] Reach 25 GBP reviews (4.8★+ average)
- [ ] Weekly GBP posts (events, photos, announcements)
- [ ] Add WhatsApp as messaging channel on GBP
- [ ] Submit to 5+ Pakistani local directories with consistent NAP

**Exit criteria:** 25+ indexable pages, 10+ keywords ranking top-20, GBP gaining 5+ profile views/day, organic sessions >200/mo.

---

## Phase 3 — Scale (Weeks 13–24 · August 2026–January 2027)

**Goal:** Editorial authority, neighborhood coverage, GEO/AI-search visibility.

### Technical
- [ ] Implement IndexNow protocol (Bing + Yandex instant indexing)
- [ ] Audit Core Web Vitals field data via CrUX — target green across all metrics
- [ ] Add `Article` schema with `author` Person to all blog posts
- [ ] Implement OG image generation per page type (social previews)
- [ ] Add hreflang `en-PK` (single-language for now, but explicit)
- [ ] Set up monthly GSC export → drive content decisions

### Content
- [ ] Ship `/programs/wellbeing/`
- [ ] Ship 1 more neighborhood page (Garden Town) — total 3, well below cap
- [ ] 16 weekly blog posts (CONTENT-CALENDAR weeks 17–32)
- [ ] 2 long-form pillar pieces (3,000+ words) — likely "Cambridge in Pakistan" + "Early Robotics Education"
- [ ] First case study / project showcase

### Authority
- [ ] Pitch 3 Pakistani education writers / journalism contacts (Hamid Mir's circle) for editorial features
- [ ] Get listed on 2 Cambridge / LAPS partner registries
- [ ] Reach 60 GBP reviews
- [ ] Apply for relevant local awards / "best of Lahore" lists (#1 AI-visibility factor per Whitespark 2026)

### GEO
- [ ] Add quotable, passage-level facts to programme pages (numbers, certifications, named programmes)
- [ ] Audit AI Overviews and ChatGPT/Perplexity citations for "Cambridge schools Lahore", "robotics school Lahore"
- [ ] Update `llms.txt` quarterly

**Exit criteria:** 40+ indexable pages, 40+ keywords top-20, organic sessions >800/mo, at least 1 AI-search citation captured.

---

## Phase 4 — Authority (Months 7–12 · February–April 2027)

**Goal:** Position as the credible Cambridge + STEM school for parents in West Lahore.

### Content
- [ ] Year-One Report (anchor content — long-form, original photography, data, parent quotes)
- [ ] Founder & principal thought-leadership pieces (4–6 pieces over 6 months)
- [ ] Alumni-style spotlights as students progress
- [ ] Press kit page with brand assets, fact sheet, founder bios

### Authority & Links
- [ ] Secure 2–3 editorial features in Pakistani education / lifestyle press
- [ ] Sponsor 1 small Lahore education event for one quality contextual link
- [ ] Reach 120 GBP reviews
- [ ] Build internal "Resources for Parents" hub linking out to authoritative .gov / .edu / Cambridge sources (and getting cited back over time)

### Optimization
- [ ] Refresh top-10 organic landing pages (titles, internal links, schema, freshness)
- [ ] Sunset / merge any underperforming pages
- [ ] Re-audit Core Web Vitals; aim for top-quartile mobile performance

**Exit criteria:** 60+ indexable pages, 120+ keywords top-20, organic sessions >3,000/mo, 60+ admissions inquiries from organic per month.

---

## Resourcing

| Role | Hours / week | Notes |
|---|---|---|
| Content writer (English, Lahore-fluent) | 8–10 | Owns weekly post + structural pages |
| Principal / founder review | 1–2 | E-E-A-T sign-off, factual review |
| Photographer / phone-shooter on staff | 2 | Campus, classroom, event photos — every week |
| Developer (you / Claude) | 2–4 | Schema, page builds, performance |
| GBP / reviews coordinator | 1 | Weekly post + review chasing |

## Dependencies

- Brochure-canon discipline: marketing must notify the site owner the same day the brochure changes.
- Photo pipeline: a steady supply of original campus photos is essential — most quality losses on competitor sites are stock-image-driven.
- Review velocity: needs an admissions-team habit of asking happy parents for a Google review at every "you're enrolled" moment.

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Writer can't hit weekly cadence | Bank 4 evergreen posts in Phase 1 as buffer |
| Reviews stay low | Add a polite review request to every WhatsApp "welcome" message |
| Pages thin out / get cannibalized | Quarterly content-audit; merge or delete |
| Single-campus IA tempts over-expansion to fake locations | The cap in `SITE-STRUCTURE.md` is a hard rule, not a guideline |
