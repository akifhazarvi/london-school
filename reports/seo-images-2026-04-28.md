# Image SEO Audit — 2026-04-28

**Site:** https://londoneducation.pk
**Scope:** 17 HTML pages, 168 raster assets in `/img/`, static analysis (no live rendering).

## Health Summary

| Metric | Value | Status |
|---|---|---|
| Pages with `og:image` + `twitter:image` | 14/17 | Pass (404, thank-you, faculty are intentional skips) |
| OG images at 1200x630 | 10/14 | **Fail** (4 blog posts use random content JPGs at wrong aspect ratios) |
| `og:image:width/height/alt` meta | 0/14 | **Fail** |
| Alt text present | 138/138 (100%) | Pass |
| Alt text descriptive (not generic) | ~75% | **Fail** (`alt="Crest"` on 14 pages; `alt="Corridor"`, `"Robotics"`, `"Computers"`, `"Play area"` on `index.html`; `alt="Robotics lab"` mistakenly on nav crests of 3 pages) |
| Lazy-loading on non-hero | 102 lazy / 138 imgs | Pass |
| `width`/`height` set on `<img>` | 8/138 (6%) | **Fail — biggest CLS gap** |
| WebP adoption in DOM `src` | 94/106 (89%) | Pass; 5 blog `<img>` still serve JPG despite WebP twins existing; `waris-mir.jpg` has no WebP variant |
| `<picture>` element use | 0 | Fail (low-priority — direct WebP works) |
| Schema `image` populated | 9/17 (all canonical pages + blog posts) | Pass |
| Schema `Organization.logo` size | 96x96 | **Fail** (Google needs ≥112x112; ideally 600x600) |
| Favicon + apple-touch-icon | 16/17 | Pass |
| 180x180 retina apple-touch / web manifest | None | Fail |
| Filenames (kebab-case, descriptive) | Strong | Pass (3 cosmetic `.jpeg` extensions) |

**OG asset directory `/img/og/`** contains 10 confirmed 1200x630 JPGs (file headers verified): og-about, og-academics, og-ai-steam, og-building-day, og-building-night, og-campus-corridor, og-cultural-day, og-hamid-mir, og-robotics-lab, og-yearbook. Sizes 84–260KB, all under the 300KB social-share threshold.

**Blog posts pulling raw content photos as OG** (will be cropped/letterboxed on Facebook/WhatsApp):

- `blog/choosing-cambridge-school-lahore.html` → `building-day.jpg` (1400x1046)
- `blog/lahore-school-holidays-2026.html` → `event-cultural-day-full.jpg` (1280x960)
- `blog/what-is-igcse.html` → `campus-library-study.jpg` (1216x1600 portrait — worst case)
- `blog/how-to-choose-school-for-4-year-old.html` → `life-nursery-corridor.jpg` (1320x746)

## Top 5 Fixes

1. **Add `width` and `height` to all 130 `<img>` tags missing them.** Single biggest CLS / Core Web Vitals win for the Pakistani-mobile-from-Meta-ads audience. Zero design risk.
2. **Create 4 proper 1200x630 OG images for blog posts** (`og-blog-cambridge.jpg`, `og-blog-igcse.jpg`, `og-blog-4-year-old.jpg`, `og-blog-holidays.jpg`) and update each post's meta tags. nanobanana-mcp not detected in this environment — manual generation or a different tool needed.
3. **Rewrite the 6 generic alt strings.** Replace `alt="Crest"` site-wide with `alt="London School Prof. Waris Mir Campus crest"`; fix `alt="Robotics lab"` mistakenly used on the nav crest in `campus.html`/`news.html`/`yearbook.html`; expand `index.html` campus tiles ("Corridor", "Robotics", "Computers", "Play area") with descriptive Lahore/Cambridge-context alt text.
4. **Switch 5 blog `<img>` references from `.jpg` to existing `.webp` siblings** (`building-day`, `event-cultural-day-full`, `campus-library-study`, `life-nursery-corridor`) — saves ~40–60% bytes with no new assets. Also flip blog hero images from `loading="lazy"` to `fetchpriority="high"` since they are the LCP element.
5. **Upgrade `Organization.logo` schema to ≥600x600** (re-encode `/img/logo.jpg` 545x616 as `logo-512.webp` or PNG) and add a 180x180 `apple-touch-icon` plus a basic `site.webmanifest` with 192/512 icons.
