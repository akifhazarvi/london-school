# Pre-Launch SEO Action Plan — londoneducation.pk

**Audit date:** 2026-04-25
**SEO Health Score (estimate):** 72 / 100
**Site state:** static HTML, ~12 pages, GA4 wired, sitemap + robots clean.
**Top blockers:** 3 critical, 8 high, 16 medium, 11 low.

The site is well-built with strong schema, clean robots.txt, and good GEO/AI-search hygiene. The credibility gaps are the things that will hurt at launch — not the technical plumbing.

---

## CRITICAL — fix before launch

### 1. Testimonials contradict each other across pages
Three "parent" names (Sarah Ahmed, Fahad Khan, Ayesha Malik) appear on multiple pages with **different child grades and roles** each time:
- Fahad Khan: Grade 7 (index) vs Grade 2 (ai-robotics) vs Grade 6 (yearbook)
- Ayesha Malik: Pre-Nursery (index) vs Grade 5 (ai-robotics) vs Grade 2 (yearbook)
- Sarah Ahmed: Grade 3 (index) vs Kindergarten (ai-robotics)

Reads as fabricated social proof. **Fix:** Either standardise to one canonical grade per parent across all pages, OR replace with attributed real testimonials, OR remove entirely. Files: [index.html:420-423](../index.html#L420), [ai-robotics.html:540-548](../ai-robotics.html#L540), [yearbook.html:257](../yearbook.html#L257), [yearbook.html:367](../yearbook.html#L367).

### 2. Meta Pixel ID is blank — conversion tracking dead
[enroll.html:45](../enroll.html#L45): `var PIXEL_ID = '';` — no Lead/CompleteRegistration events firing on the primary conversion page. ROAS will be invisible. Same blank ID on [thank-you.html:30](../thank-you.html#L30). **Fix:** Paste real Meta Pixel ID into both files before going live with paid ads.

### 3. Prof. Waris Mir long-form quote is uncited
[about.html:322](../about.html#L322) has a multi-sentence blockquote ("Education is not about filling empty vessels...") attributed to Prof. Waris Mir but with no source. If composite/paraphrased, this is a Trust failure under Google QRG and a reputational risk for a deceased public figure with a well-known son (Hamid Mir). **Fix:** Either source it to a specific Daily Jang column / book, OR change attribution to "Inspired by the writings of Prof. Waris Mir."

---

## HIGH — fix within a week

### 4. Nav is invisible until scroll on academics page
[academics.html:144-153](../academics.html#L144) sets `.nav { transform: translateY(-100%); opacity: 0; }` and only reveals it on `.scrolled`. Direct visitors land on a page with no top chrome. **Fix:** Show nav by default; only use the scroll behaviour for the slim/condensed appearance.

### 5. JSON-LD: `WebSite.SearchAction` points to a non-existent endpoint
[index.html:135-142](../index.html#L135) declares a WordPress-style `?s={search_term_string}` SearchAction. There is no search on this static site. Google probes this; consistent failure can suppress Sitelinks Searchbox or trigger a manual action. **Fix:** Remove the entire `potentialAction` block.

### 6. JSON-LD: duplicate Person definitions for Huma & Zoya in index.html founder array
[index.html:95-108](../index.html#L95) re-defines `#huma-mir` and `#zoya-mir` with full properties that already live in about.html. Replace with reference-only objects: `{ "@id": "..." }`. Authoritative entity definition should live on about.html only.

### 7. JSON-LD: `NewsArticle.mainEntityOfPage` points to the listing page
[news.html:70](../news.html#L70) and [news.html:83](../news.html#L83). Both NewsArticles claim `mainEntityOfPage: news.html` — Google collapses them as the same page. **Fix:** Either remove the property entirely, or use unique `#anchor` URLs per article.

### 8. "No other school in Pakistan" — unverifiable absolute claim
[ai-robotics.html:176](../ai-robotics.html#L176): "no other school in Pakistan starts this early." You can't prove a negative across every school in Pakistan. **Fix:** Use the brochure-canonical "Pakistan's most advanced early robotics programme" — positive superlative, defensible.

### 9. Principal has no stated credentials
[about.html:252-264](../about.html#L252). For a Year-1 school in a YMYL category (kids' education), the principal's qualifications are a key Expertise signal. **Fix:** Add one line under signature — degree, years experience, prior institution.

### 10. Core Values section duplicated as Teaching Philosophy on the same page
[about.html:282-305](../about.html#L282) and [about.html:418-441](../about.html#L418) — "Curiosity First / Every Child Matters / Ready for the World" appear twice with near-identical copy. Reads as padding. **Fix:** Replace the second occurrence with substantive prose (Cambridge approach, project-based learning, Socratic method) OR remove.

### 11. Brochure-canonical differentiators missing from site
Two strong selling points from CLAUDE.md / brochure are absent from every public page:
- **Emotional Health Counsellors** (in-house wellbeing support)
- **Career Counsellor for Foreign University Admissions**

Pakistani parents specifically value both. **Fix:** Add a sentence each on [about.html](../about.html) or [academics.html](../academics.html); also surface on [enroll.html:355-365](../enroll.html#L355) program feature lists.

---

## MEDIUM — fix within a month

### 12. JSON-LD: `Course` schemas missing `startDate`
[academics.html:68](../academics.html#L68), [academics.html:97](../academics.html#L97), [academics.html:120](../academics.html#L120). Without `startDate`, none of the three courses are eligible for Google Course rich result carousel. **Fix:** Add `"startDate": "2025-08-01"` to each `CourseInstance`.

### 13. JSON-LD: `Course.provider` inline duplicates the Org entity
[ai-robotics.html:54-66](../ai-robotics.html#L54) — replace the inline EducationalOrganization with `{ "@id": "https://londoneducation.pk/#organization" }`.

### 14. JSON-LD: `Place` on campus.html has no `@id`, can't be cross-referenced
[campus.html:47](../campus.html#L47). **Fix:** Add `"@id": "https://londoneducation.pk/campus.html#campus"` so academics.html `CourseInstance.location` blocks can reference it instead of inlining duplicate addresses.

### 15. JSON-LD: news.html `CollectionPage` missing `@id` and `isPartOf`
[news.html:50-55](../news.html#L50). Add `"@id": "https://londoneducation.pk/news.html"` and `"isPartOf": { "@id": "https://londoneducation.pk/#website" }` for consistency with about/academics/yearbook.

### 16. Sitemap `lastmod` uniformly stale
All 9 entries in [sitemap.xml](../sitemap.xml) say `2026-04-24`. Last commit was `2026-04-25`. **Fix:** Bump to `2026-04-25`. Going forward, only bump pages that actually changed per deploy.

### 17. ask-prof-mir.html is thin (~420 words) and has no FAQ schema
The page is content-shaped (Q&A oriented) but doesn't claim that structure for crawlers. **Fix:**
- Add ~150 words explaining what the chatbot is, what data it retains (none), how to use it well
- Add `FAQPage` schema with 6–8 Q&A pairs (e.g. "Who was Prof. Waris Mir?", "What is the connection between Prof. Waris Mir and Hamid Mir?", "What was Prof. Waris Mir's teaching philosophy?") — this is the highest-impact GEO change available.

### 18. news.html cards use emoji as image placeholders
[news.html:199](../news.html#L199), [231](../news.html#L231), [263](../news.html#L263). CLAUDE.md says "Only use emojis if the user explicitly requests it." **Fix:** Replace each placeholder with a branded fallback (school crest on navy/sage card with overlay headline).

### 19. ai-robotics testimonial bubbles + formal testimonials use the same parent names twice
Same 3 parents quoted in inline `adv-stop__bubble` AND in formal testimonial section, with different quotes. Compounds C1. **Fix:** Use only one set on the page.

### 20. campus.html and yearbook.html share verbatim facility-card copy
Robotics Lab and Smart Classrooms cards are duplicated word-for-word between [campus.html:152](../campus.html#L152) and [yearbook.html:539](../yearbook.html#L539). **Fix:** Rewrite one in page-specific tone (campus = specs, yearbook = experiential).

### 21. "Weekly AI progress reports" claim is unexplained
Mentioned only in a testimonial ([index.html:423](../index.html#L423)) but not described anywhere. Real differentiator if it exists. **Fix:** 3–4 sentence explainer on academics.html or about.html.

### 22. FAQ schema answer says "contact admissions for the partner's name"
[ai-robotics.html:89](../ai-robotics.html#L89). FAQ schema is for AI to surface — "contact us to find out" is not a citable answer. Either name the certifying body or rephrase the answer to give substantive content without deferring.

### 23. Title-H1 intent gap on academics + ask-prof-mir
- [academics.html](../academics.html): title says "Cambridge IGCSE School in Lahore", H1 says "Where Technology Meets Imagination" — bridge the two.
- [ask-prof-mir.html](../ask-prof-mir.html): title says "Ask Prof Mir | London School", H1 says "Wisdom for Teachers & Parents" — make H1 "Ask Prof Mir — Wisdom for Teachers & Parents".

### 24. Add `<time datetime="">` to historical dates
ask-prof-mir biography (1938, 1987-07-09), about.html founder card, news.html inauguration date — wrap in semantic `<time>` for AI/temporal parsing.

### 25. Add `datePublished`/`dateModified` to about.html `AboutPage` and `author` to ask-prof-mir.html schema.

### 26. Add `"parent"` to Zoya Mir Person in about.html *only if her parent is a defined entity in the graph*. Currently we deliberately omit this — leave alone unless the user instructs otherwise.

### 27. Add a 150-word "Curriculum at a Glance" paragraph to academics.html
Single self-contained passage covering: Cambridge pathway, age range Pre-Nursery–IGCSE, robotics progression (LEGO → Arduino → 3D/AI), three foreign languages, in-house counsellors. Optimal length for AI citation lift.

---

## LOW — backlog

### 28. Footer copyright "© 2025" is stale (current year is 2026)
All footers. **Fix:** Use a JS snippet for the year, or update to "© 2025–2026".

### 29. news.html "AI in Education panel" card uses a faculty-training photo
[news.html:247](../news.html#L247). If event is real, use correct photo; if planned, label "Upcoming" or hide.

### 30. About page eyebrow label "About Us" is redundant on the About page
[about.html:332](../about.html#L332). **Fix:** "Leadership & Faculty" or "Our Team".

### 31. Lead form subject line contains an emoji
[enroll.html:183](../enroll.html#L183): `value="🎓 New Enrollment Lead..."`. Some spam filters flag emoji subjects. **Fix:** drop the cap.

### 32. yearbook.html stat "30+ Photos" but gallery has 11 items
[yearbook.html:135](../yearbook.html#L135). **Fix:** match the actual count.

### 33. about.html `Person.birthDate: "1938"` is year-only
Valid Schema.org but year-only. Keep as is unless full date is available.

### 34. robots.txt has explicit allows; consider adding `YouBot` and `Amazonbot`
Both inherit from wildcard `Allow: /` so they already work; adding explicit entries is marginal.

### 35. llms.txt is strong but lacks a formal license declaration
Add a `License:` line (CC-BY-4.0 or RSL 1.0) so AI systems can programmatically read citation permission.

### 36. No Wikipedia entity for the school yet
Expected for a Year-1 institution. Highest-leverage off-site action: contribute a verifiable, sourced mention to Hamid Mir's Wikipedia page about the campus inauguration. Single Wikipedia link is the strongest external authority signal for AI citations.

### 37. No third-party press coverage
Pursue ONE citation in Dawn / Tribune / Geo's education section about the Hamid Mir inauguration. AI Overviews weight third-party domain authority heavily.

### 38. Consider individual NewsArticle pages
Right now news items are inline on news.html. A dedicated `news/hamid-mir-inauguration.html` (300+ words, full NewsArticle schema) gives AI systems a citable URL.

---

## Ship-readiness call

The site is **safe to ship** once the 3 CRITICAL items are done — 1, 2, 3 above are launch blockers (testimonial credibility, missing pixel, unsourced quote). Everything in HIGH should be done within a week of launch (these affect rankings/UX but won't actively harm the brand). MEDIUM and LOW are ongoing optimisation.

The Pakistani-parent funnel is WhatsApp-driven, so removed fees, working pixel, and trust signals (real testimonials, principal credentials) matter more than rich snippets. Get the credibility right first.

---

## Files to touch in order

| File | Changes |
|------|---------|
| [enroll.html](../enroll.html), [thank-you.html](../thank-you.html) | Paste Meta Pixel ID |
| [index.html](../index.html), [ai-robotics.html](../ai-robotics.html), [yearbook.html](../yearbook.html) | Reconcile testimonial grades or remove |
| [about.html](../about.html) | Source Waris Mir quote; principal credentials line; remove duplicated values; add counsellors |
| [index.html](../index.html) | Remove SearchAction; collapse founder defs to `@id` refs |
| [news.html](../news.html) | Fix `mainEntityOfPage`; add `@id`+`isPartOf`; replace emoji card images |
| [academics.html](../academics.html) | Show nav by default; add `startDate` to all 3 Courses; add Curriculum at a Glance paragraph |
| [ai-robotics.html](../ai-robotics.html) | Soften "no other school"; replace inline `provider` with `@id`; rewrite "contact us" FAQ answer |
| [ask-prof-mir.html](../ask-prof-mir.html) | Add FAQPage schema; expand body to ~600+ words |
| [campus.html](../campus.html) | Add `@id` to `Place`; rewrite shared facility cards |
| [sitemap.xml](../sitemap.xml) | Bump `lastmod` to 2026-04-25 |
