# London School — SEO Action Plan

**Generated:** 2026-04-24
**Overall Health:** 61/100
**Source audit:** See `FULL-AUDIT-REPORT.md`

Actions are ordered by priority. Complete Critical tier first — several Critical fixes unblock or resolve multiple lower-tier items simultaneously.

---

## CRITICAL (fix immediately — blocks indexing or major ranking signals)

### 1. Global domain find-and-replace: `akifhazarvi.github.io/london-school` → `londoneducation.pk`
**Effort:** 10 minutes
**Impact:** Resolves 8+ other findings in a single pass.
**Scope:** 110 occurrences across 12 HTML files + llms.txt.

Fixes:
- Technical C1, C2, C3 (canonicals, OG tags, JSON-LD `@id`)
- Technical H1 (llms.txt)
- Technical H2 (thank-you.html canonical)
- Technical M1 (footer absolute URLs)
- Schema Critical #1
- Local Critical (NAP canonical mismatch)

Command (run from website root):
```
grep -rln "akifhazarvi.github.io/london-school" *.html llms.txt | \
  xargs sed -i '' 's|akifhazarvi.github.io/london-school|londoneducation.pk|g'
```
Verify: `grep -c "akifhazarvi.github.io" *.html llms.txt` should return 0 for all files.

After this, **remove the canonical tag entirely from thank-you.html** (noindexed; canonical is pointless).

### 2. Claim and verify Google Business Profile
**Effort:** 2–4 hours (incl. Google verification lag)
**Impact:** #1 local ranking factor. Currently unused.

Steps:
- Create/claim GBP at business.google.com using exact NAP.
- Category: "Private school" (verify available category in Pakistan).
- Upload 10+ photos (campus, classrooms, robotics lab, principal).
- Add GBP URL to `sameAs` array in index.html schema.
- Add GBP URL to the site footer as a "Google" link.
- Once verified, replace Maps iframe `q=...` text query with Place ID embed format.

### 3. Resolve the three-name brand problem
**Effort:** 2 hours
**Impact:** Unlocks entity graph consolidation for Google Knowledge Panel + AI citations.

Pick canonical names and use them exclusively:
- **Legal / schema name:** `London International Education System — Prof. Waris Mir Campus`
- **Display / short name:** `London School — Prof. Waris Mir Campus`
- **alternateName:** `London School`

Update in:
- All JSON-LD `name`, `alternateName`, `legalName` fields
- All `og:site_name` tags
- llms.txt `Official name:` line
- Footer copyright line
- Nav logo text (keep as-is if it already uses display name)

Remove "London School System" everywhere.

### 4. Fix faculty credentials on faculty.html and about.html
**Effort:** 3 hours (requires real data)
**Impact:** Critical for YMYL (schools) E-E-A-T.

For Principal Mehr un Nisa Masood and Campus Director Ali Umair, add:
- Qualifications (degree, institution)
- Years of experience
- Prior schools/positions
- A real headshot photo (replace icon SVG placeholders)

Add `image` to Principal's `Person` schema on faculty.html. Add `Person` schema for Huma Mir, Zoya Mir, Naveela Choudhary on about.html with real photos.

---

## HIGH (fix within 1 week — significantly impacts rankings)

### 5. Add explicit AI crawler rules to robots.txt
**Effort:** 10 minutes
**Impact:** Removes ambiguity for GPT/Claude/Perplexity crawlers.

Add to `robots.txt`:
```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```
Place above the existing `User-agent: *` block.

### 6. Surface the Hamid Mir legacy in structured data
**Effort:** 30 minutes
**Impact:** Highest AI-citation unlock — connects school to an existing high-authority Pakistan entity.

- In `llms.txt` Waris Mir section, add a line: `Son: Hamid Mir — senior journalist and television anchor (Geo TV)`.
- In `about.html` Person schema for Prof. Waris Mir, add:
  ```json
  "children": [{
    "@type": "Person",
    "name": "Hamid Mir",
    "jobTitle": "Journalist",
    "sameAs": "https://en.wikipedia.org/wiki/Hamid_Mir"
  }]
  ```
- Keep the body-copy mention on about.html.

### 7. Fix news.html NewsArticle schema
**Effort:** 20 minutes
**Impact:** Unlocks NewsArticle rich results; currently zero will fire.

Add required `author` to all 4 NewsArticle items:
```json
"author": { "@id": "https://londoneducation.pk/#organization" }
```
Add `image` to items 3 and 4 (currently missing — will also need real images, not emoji placeholders per Content finding #6).

### 8. Add `hasCourseInstance` to academics.html Course items
**Effort:** 15 minutes
**Impact:** Unlocks Course rich results.

Template provided in schema audit findings — in-person mode, Lahore location.

### 9. Switch schema `@type` to include `School`
**Effort:** 5 minutes
**Impact:** More specific type for educational rich results.

In index.html JSON-LD: `"@type": ["School", "EducationalOrganization", "LocalBusiness"]`.

### 10. Add name the US Coding Certifications issuer
**Effort:** 30 min (requires brochure verification)
**Impact:** Survives Google QRG credentialing checks.

The claim "Two US Coding Certifications at Kindergarten" appears on 4+ pages without naming the issuing body. Replace "recognised US coding authorities" (ai-robotics.html line 79) with the actual organization name. If the certification is Code.org, iD Tech, Common Sense Education, or similar — name it explicitly on each page + in FAQPage answers + in llms.txt.

### 11. Defer YouTube iframe API on yearbook.html
**Effort:** 1 minute
**Impact:** Fixes render-blocking on a video-heavy page.

`yearbook.html:786`: change `<script src="https://www.youtube.com/iframe_api"></script>` to `<script defer src="https://www.youtube.com/iframe_api"></script>`.

### 12. Add meta description + theme-color to 404.html
**Effort:** 2 minutes
**Impact:** Consistency; minor.

Add `<meta name="description" content="Page not found — return to the London School homepage.">` and `<meta name="theme-color" content="#C1353D">` in 404.html `<head>`.

---

## MEDIUM (fix within 1 month — optimization opportunities)

### 13. Create standalone /contact.html page
**Effort:** 2 hours
**Impact:** Captures "London School Lahore contact" queries; currently only an anchor.

Include: NAP, hours, map embed, neighborhood paragraph ("Located opposite Ideal Park in Township, Lahore, easily accessible from Johar Town, Model Town, and Gulberg"), WhatsApp CTA, `LocalBusiness` schema.

### 14. Verify and increase geo-coordinate precision
**Effort:** 15 minutes
**Impact:** Accurate local pack pin.

Current coordinates (`31.4697, 74.2728`) may land in Johar Town, not Township. Verify against Google Maps satellite view of actual address. Update to 5 decimal places minimum in index.html schema.

### 15. Add FAQPage schema to ask-prof-mir.html
**Effort:** 45 minutes
**Impact:** AI citation readiness on the brand-differentiator page.

Questions: "Who was Prof. Waris Mir?", "What is Ask Prof Mir?", "Is London School Cambridge affiliated?", "Who founded London School?", "Where is London School located?". Each answer 60–130 words, self-contained.

### 16. Standardize phone format
**Effort:** 30 minutes
**Impact:** NAP consistency for citation matching.

Schema / structured data: `+92-301-0499777`. Visible plain text buttons: `0301-0499777` acceptable. WhatsApp link: `923010499777` (format required). Never mix within a single source type.

### 17. Replace testimonials with real, attributed reviews
**Effort:** 2 weeks (requires real parent consent)
**Impact:** Removes duplicate content + fabricated-content signal.

Options: solicit Google reviews from existing 130 families via WhatsApp; embed 2–3 real reviews with photo + grade + date attribution; add `aggregateRating` once 5+ genuine reviews exist.

### 18. Fix or remove the Early Bird scarcity counter
**Effort:** 15 minutes
**Impact:** Trust.

Either wire the "47" counter to a real number updated weekly (as the HTML comment specifies), or remove the "limited spots" urgency language until a live counter exists.

### 19. Replace emoji placeholders on news.html with real event photos
**Effort:** Variable (requires photos)
**Impact:** Trust / authenticity signal for Year-1 school.

Only the Hamid Mir inauguration card has a real image. Sports Day, Robotics Lab Expansion, AI Panel cards use coloured divs + emoji. Either replace with real photos or remove the card entirely.

### 20. Add LAPS affiliation mention to HTML
**Effort:** 30 minutes
**Impact:** Second-strongest credential after Cambridge; currently absent.

Add LAPS (London Academic Partnership System) affiliation text to about.html, academics.html, and footer. If LAPS has a registration number or directory listing URL, link it in `accreditedBy` schema alongside Cambridge.

### 21. Replace Google Maps legacy embed with Embed API
**Effort:** 20 minutes (after GBP verification)
**Impact:** Deprecation-proof; ties to verified Place ID.

Get Maps Embed API key, use `https://www.google.com/maps/embed/v1/place?key=...&q=place_id:ChIJ...` format.

### 22. Add hreflang self-reference
**Effort:** 10 minutes
**Impact:** Clarifies site language for Pakistan-targeting Urdu queries.

On every page: `<link rel="alternate" hreflang="en" href="https://londoneducation.pk/[page].html">` and `<link rel="alternate" hreflang="x-default" href="...">`.

### 23. Link faculty.html from main nav
**Effort:** 5 minutes
**Impact:** Orphan page fix; feeds E-E-A-T.

Add "Faculty" link to primary nav on all pages, or place it prominently in the about.html body + footer.

### 24. Submit to Pakistan-specific directories
**Effort:** 2 hours
**Impact:** Local citation tier-1.

Submit to: Mera School (meraschool.com), ilmkidunya, Facebook Business Page (ensure it's a Business Page not personal). Add each URL to `sameAs` in schema.

---

## LOW (backlog — nice to have)

### 25. Add local-keyword integration to index.html hero
Consider "Cambridge School in Lahore" variant above the fold.

### 26. Add neighborhood name to Contact section H2
"Visit Our Campus in Lahore" → "Visit Our Campus in Township, Lahore".

### 27. Add IndexNow key file
For Bing/Yandex index-freshness acceleration.

### 28. Add PWA manifest
For "Add to Home Screen" engagement on mobile WhatsApp traffic.

### 29. Remove `YOUR_META_PIXEL_ID` placeholder from enroll.html
Currently visible in page source (line 37). Either wire in a real Pixel ID or remove the block entirely.

### 30. Add `SearchAction` to index.html WebSite schema
Minor enhancement for Sitelinks Search Box eligibility.

### 31. Wrap `openingHoursSpecification` in an array
Per schema validator preference.

### 32. Add `apple-touch-icon` to 404.html
Consistency; minor.

### 33. Attribute or remove Waris Mir quotes
Quotes on about.html and ask-prof-mir.html put words in a deceased historical figure's mouth without citation. Add source (e.g., "paraphrased from his 1981 Jang column") or remove.

---

## Estimated Impact

If Critical tier + HIGH tier items 5–12 are completed:
- Overall score rises from 61 → ~80
- Local SEO rises from 54 → ~75 (GBP claim + Place ID + schema)
- GEO rises from 61 → ~78 (name consistency + Hamid Mir + robots rules)
- Technical rises from 58 → ~85 (domain fix resolves most criticals)

The single highest-ROI sequence is: **#1 (domain F&R) → #5 (robots.txt) → #6 (Hamid Mir schema) → #3 (name consolidation)** — roughly 3 hours of work for a projected 10-point score lift.
