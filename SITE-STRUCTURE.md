# Site Structure & Information Architecture

**Domain:** https://londoneducation.pk
**Type:** Single-campus school. Local-service vertical with editorial layer.

## URL Hierarchy

```
/
├── /about/                       — Our Story, Prof. Waris Mir legacy, principal, leadership
│   ├── /about/founders/         — Huma & Zoya Mir, Hamid Mir family link (editorial)
│   └── /about/principal/        — Mehr un Nisa Masood profile
├── /academics/                   — Cambridge pathway overview
│   ├── /academics/early-years/  — Pre-Nursery–KG
│   ├── /academics/primary/      — Grades 1–5
│   ├── /academics/middle/       — Grades 6–8
│   └── /academics/igcse/        — O-Level / IGCSE
├── /programs/
│   ├── /programs/ai-robotics/   — "Pakistan's Most Advanced Early Robotics Program" (canonical)
│   ├── /programs/coding/        — US Coding Certifications (KG onwards)
│   ├── /programs/languages/     — Chinese, French, German
│   ├── /programs/sports/        — Swimming, 25+ activities
│   └── /programs/wellbeing/     — Emotional health counsellors, career counsellor
├── /campus/                      — Photos, facilities, virtual tour
├── /faculty/                     — Teachers, qualifications
├── /admissions/
│   ├── /admissions/fees/        — Fee structure (canonical, brochure-synced)
│   ├── /admissions/process/     — How to apply, documents needed
│   └── /admissions/visit/       — Book a Visit (primary CTA target)
├── /ask-prof-mir/                — AI Study Buddy chatbot
├── /news/                        — Events, achievements, announcements
├── /blog/                        — Editorial content (parent guides, education in Lahore)
├── /neighborhoods/               — Local landing pages (CAPPED — see below)
│   ├── /neighborhoods/ideal-park-township/
│   ├── /neighborhoods/model-town/
│   ├── /neighborhoods/garden-town/
│   └── (max 5 total)
├── /contact/                     — Map, hours, phone, WhatsApp
├── /enroll/                      — Lead form
├── /thank-you/                   — Conversion confirmation (noindex)
├── /yearbook/                    — Student work showcase
├── robots.txt
├── sitemap.xml
└── llms.txt
```

## Current vs. Target

**Existing pages (9):** index, about, academics, ai-robotics, ask-prof-mir, campus, enroll, news, yearbook.
**Add by month 6:**
- `/admissions/fees/` (split from index Fees section into its own indexable page)
- `/admissions/process/`
- `/admissions/visit/`
- `/programs/coding/`
- `/programs/languages/`
- `/programs/sports/`
- `/faculty/` (already a file — fill it)
- `/about/founders/` and `/about/principal/`
- `/blog/` (5–8 launch posts)
- `/neighborhoods/ideal-park-township/`
- `/neighborhoods/model-town/`
- `/neighborhoods/garden-town/`

**Total target: ~40 indexable pages by month 6, ~60 by month 12.**

## Internal Linking Rules

1. **Hub-and-spoke:** Each `/programs/*` and `/academics/*` page links up to its parent and laterally to 2–3 sibling pages. Every page links once into `/admissions/visit/`.
2. **Footer hub block:** Programs / Academics / Admissions / About — repeated site-wide.
3. **Blog → money pages:** Every blog post links to at least one `/programs/*` or `/academics/*` page in the body, plus one CTA to `/admissions/visit/`.
4. **Neighborhood pages → contact + visit + campus.** Never link neighborhood pages to each other excessively (avoid doorway-page signal).
5. **Anchor text:** Use descriptive phrases ("our Cambridge primary programme", "robotics for kindergarteners") — not "click here".

## Schema Plan (per page type)

| Page | Primary schema | Secondary |
|---|---|---|
| Home | `EducationalOrganization` (with `address`, `geo`, `telephone`, `openingHours`, `sameAs`) | `WebSite` + `SearchAction` |
| About / Our Story | `EducationalOrganization` | `Person` (founders, principal) |
| Academics / pathway pages | `EducationalOccupationalProgram` | `Course` per major subject (optional) |
| Programs / AI-Robotics | `EducationalOccupationalProgram` | `Course` |
| Faculty | `Person` (per teacher) inside `ItemList` | — |
| Admissions / Fees | `EducationalOrganization` with `offers` (PriceSpecification) | `FAQPage` |
| Admissions / Visit | `Event` for Open House dates | `Reservation` (if booking) |
| Contact | `EducationalOrganization` + `ContactPage` | `Place` |
| Blog post | `Article` with `author` (Person), `datePublished` | `BreadcrumbList` |
| Neighborhood page | `EducationalOrganization` with `areaServed` (specific neighborhood) | `BreadcrumbList` |

**Sitewide:** `BreadcrumbList` on all non-home pages. `Organization` in site-wide JSON-LD with `sameAs` linking to Facebook, Instagram, YouTube.

## Quality Gates (enforced)

- ⚠️ Neighborhood pages: warn at 5, **hard stop at 8**.
- Each neighborhood page must include: walking/driving distance from a recognizable landmark, a specific neighborhood reference (school, market, road), at least 2 unique campus photos, 500+ words, ≥60% unique content vs other neighborhood pages.
- Fees page must match the WhatsApp brochure to the rupee. If brochure changes, fees page changes the same day.
- No "school in Karachi" / "school in Islamabad" pages. Single-campus only.

## Sitemap & Robots

- Regenerate `sitemap.xml` whenever a new indexable page ships. Include `lastmod`. Exclude `/thank-you/`, `/editor.html`, `/enroll/` confirmation states.
- `robots.txt`: allow all major crawlers + AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — the site benefits from being cited in AI answers about Lahore Cambridge schools.
- `llms.txt`: keep it updated with canonical brand facts (already in place — sync to brochure).
