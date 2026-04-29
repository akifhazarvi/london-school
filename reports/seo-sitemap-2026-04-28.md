# Sitemap Audit — londoneducation.pk — 2026-04-28

## Summary

Current sitemap has 14 entries. Directory has 17 HTML files. After filtering out legitimately excluded pages, 3 pages are missing from the sitemap and 0 conflict with robots.txt.

---

## 1. Pages Missing from Sitemap (in directory, not in sitemap)

| File | Should be included? | Reason |
|---|---|---|
| `campus.html` | YES | Listed in sitemap — PRESENT (false alarm, see below) |
| `thank-you.html` | NO | Has `noindex, follow` — correctly absent |
| `404.html` | NO | Has `noindex, follow` — correctly absent |
| `faculty.html` | NO | Blocked in robots.txt + has `noindex` — correctly absent |

All 17 files account correctly except: no pages are actually missing once noindex/blocked pages are filtered. The sitemap covers all 14 indexable pages.

---

## 2. Robots.txt vs Sitemap Conflicts

robots.txt disallows: `/editor.html`, `/server.py`, `/content.json`, `/faculty.html`

None of these appear in the sitemap. **No conflicts.**

---

## 3. Orphaned Pages (in sitemap but not linked from any HTML file)

Checked all `href` attributes across every HTML file:

| Page | Linked from HTML? |
|---|---|
| `https://londoneducation.pk/` | YES (logo + index.html refs) |
| `/about.html` | YES |
| `/academics.html` | YES |
| `/ai-robotics.html` | YES |
| `/enroll.html` | YES |
| `/campus.html` | YES |
| `/ask-prof-mir.html` | YES |
| `/news.html` | YES |
| `/yearbook.html` | YES |
| `/blog/` | YES |
| `/blog/choosing-cambridge-school-lahore.html` | YES |
| `/blog/what-is-igcse.html` | YES |
| `/blog/how-to-choose-school-for-4-year-old.html` | YES |
| `/blog/lahore-school-holidays-2026.html` | YES |

**No orphaned pages.**

---

## 4. Duplicate URLs

None detected.

---

## 5. URL Format Issues

### Homepage trailing-slash vs index.html mismatch

- Sitemap uses: `https://londoneducation.pk/` (trailing slash, no `.html`)
- All other pages use `.html` extension (e.g. `/about.html`)
- `index.html` canonical tag correctly points to `https://londoneducation.pk/` with trailing slash
- Vercel has **no clean-URL rewrites** in `vercel.json`, so `https://londoneducation.pk/` serves `index.html` by Vercel default (index file resolution) — this is fine and consistent

### Blog index URL

- Sitemap: `https://londoneducation.pk/blog/`
- `blog/index.html` canonical: `https://londoneducation.pk/blog/`
- Consistent. No issue.

### All other pages use `.html` extension throughout

Consistent between sitemap entries and actual file names. No mismatches.

---

## 6. lastmod Date Plausibility

Today: 2026-04-28. Most recent git commits touch files on 2026-04-27.

| Entry | lastmod in sitemap | Most recent git commit | Assessment |
|---|---|---|---|
| `/` (index.html) | 2026-04-25 | 2026-04-27 | STALE by 2 days |
| `/about.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/academics.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/ai-robotics.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/enroll.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/campus.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/ask-prof-mir.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/news.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/yearbook.html` | 2026-04-24 | 2026-04-27 | STALE by 3 days |
| `/blog/` | 2026-04-25 | 2026-04-27 | STALE by 2 days |
| All 4 blog posts | 2026-04-25 | 2026-04-27 | STALE by 2 days |

All lastmod dates are stale. The 2026-04-27 site-wide copywriting pass (British English, em-dash removal, Class/Age labels) touched every HTML file and was not reflected in the sitemap. Not critical at this age gap, but should be updated to `2026-04-27`.

---

## 7. Priority Distribution

| Entry | Priority | Assessment |
|---|---|---|
| `/` | 1.0 | Correct |
| `/enroll.html` | 1.0 | **Incorrect** — two pages at 1.0 dilutes signal. Enroll is a conversion page but the homepage is the canonical "most important" page. Recommend 0.9. |
| `/about.html` | 0.9 | Acceptable |
| `/academics.html` | 0.9 | Acceptable |
| `/ai-robotics.html` | 0.9 | Acceptable |
| `/campus.html` | 0.8 | Acceptable |
| `/ask-prof-mir.html` | 0.7 | Acceptable |
| `/news.html` | 0.6 | Acceptable |
| `/yearbook.html` | 0.5 | Acceptable |
| `/blog/` | 0.7 | Acceptable |
| Blog posts | 0.8 | **Inconsistent** — blog posts ranked higher (0.8) than the blog index (0.7) is odd but not harmful |

Note: Google ignores `priority` as of current documentation. Can remove all `priority` tags to clean up the file.

---

## 8. changefreq Accuracy

| Entry | changefreq | Assessment |
|---|---|---|
| `/` | weekly | Overstated — homepage content is stable. `monthly` is more honest. |
| `/news.html` | weekly | Acceptable if news is updated weekly. Check actual update cadence. |
| `/blog/` | weekly | Acceptable if new posts are added weekly. |
| All others | monthly | Acceptable |

Note: Google ignores `changefreq` as of current documentation. Can remove all `changefreq` tags to clean up.

---

## 9. Image Sitemap / News Sitemap

No image sitemap exists. The site has `/img/` with campus and programme photos.  
`news.html` is not formatted as a Google News article feed; a News Sitemap (`<news:news>`) would require individual article pages, not a single aggregated page.

**Recommendation:** Add image sitemap entries for high-value pages (homepage, campus, ai-robotics) using `<image:image>` extensions. Low priority given the site is Year 1.

---

## 10. Deprecated Tags

Both `<priority>` and `<changefreq>` are present on every entry. Google officially ignores both. They add ~30% file bloat with zero SEO benefit. Recommend removing.

---

## Action Checklist

1. **Fix lastmod on all 14 entries** — update to `2026-04-27` (date of last site-wide commit)
2. **Fix enroll.html priority** — change from `1.0` to `0.9`
3. **Remove all `<priority>` tags** — Google ignores them
4. **Remove all `<changefreq>` tags** — Google ignores them
5. **Fix homepage changefreq** — if keeping tags, change `/` from `weekly` to `monthly`
6. **No missing pages, no robots.txt conflicts, no orphans, no duplicates**
