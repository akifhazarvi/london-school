# Lahore & Pakistan Growth Plan — London School

**Generated:** 2026-04-25
**Domain:** https://londoneducation.pk
**Goal:** Take this site from 0 → first 1,000 organic visits/month from Lahore parents in 6 months, and become the default Cambridge-pathway school result for the Township / Ali Road / Ideal Park / Model Town corridor.
**Frame:** This is a **single-campus, Lahore-only** school. We do not chase national-level "best school in Pakistan" queries — we own a 5km radius and the Cambridge-pathway + early-robotics niche.

This plan is execution-grade — every item has an owner, a specific deliverable, and a "done when" criterion. Where it overlaps with `IMPLEMENTATION-ROADMAP.md`, this doc supersedes (it's newer and sequenced for what to do **this week**).

---

## Table of Contents
1. [Where we are right now](#1-where-we-are-right-now)
2. [The 5 levers that will move the needle](#2-the-5-levers-that-will-move-the-needle)
3. [Week-by-week execution: first 12 weeks](#3-week-by-week-execution-first-12-weeks)
4. [Google Business Profile — the #1 Lahore lever](#4-google-business-profile--the-1-lahore-lever)
5. [Local content engine for Lahore neighborhoods](#5-local-content-engine-for-lahore-neighborhoods)
6. [Pakistan-specific citation & directory plan](#6-pakistan-specific-citation--directory-plan)
7. [Review acquisition system](#7-review-acquisition-system)
8. [Editorial / link-earning plays unique to this school](#8-editorial--link-earning-plays-unique-to-this-school)
9. [AI search (GEO) for Lahore queries](#9-ai-search-geo-for-lahore-queries)
10. [Tracking & weekly cadence](#10-tracking--weekly-cadence)
11. [Hard rules — do not violate](#11-hard-rules--do-not-violate)

---

## 1. Where we are right now

**Done (don't redo):**
- Domain canonicalised to `londoneducation.pk`, sitemap clean (9 pages), robots.txt allows AI crawlers
- Schema is comprehensive: School + LocalBusiness, Person nodes for Waris Mir family with Hamid Mir Wikipedia link, Course schema, FAQPage, NewsArticle, Place with `containedInPlace: Township`
- GBP CID linked from `sameAs`, `hasMap`, the Maps iframe and "Get Directions" CTA
- llms.txt clean of fee leakage and stale lineage
- GA4 (`G-S3PMR30G31`) firing on every public page
- hreflang `en` + `x-default` on all 9 indexable pages
- Brand name consolidated; no contradictions

**Not done (the bottleneck):**
- ❌ Google Business Profile is **not yet claimed** (the listing exists but the school doesn't own it)
- ❌ Google Search Console + Bing Webmaster Tools not yet verified
- ❌ Zero ranking keywords (new domain)
- ❌ Zero reviews on GBP (or unknown count — needs claim first)
- ❌ Zero local citations on Pakistan-specific directories (Mera School, ilmkidunya, Rozee, Beep)
- ❌ No neighborhood content (Township, Ideal Park, Model Town etc.)
- ❌ No editorial backlinks; no PR motion on the Hamid Mir inauguration
- ❌ Meta Pixel ID not yet pasted (so paid-traffic attribution still off)

**The headline:** the technical SEO is largely done. **Growth from here is 80% off-site work and content production, 20% on-site optimisation.**

---

## 2. The 5 levers that will move the needle

In rough order of ROI for a Year-1 single-campus Lahore school:

| # | Lever | Why it matters more than anything else | Effort | First win in |
|---|---|---|---|---|
| 1 | **Claim & operate Google Business Profile** | The map pack drives most "school near me" traffic in Lahore; one GBP outranks 20 organic articles for local queries | 1–2 weeks setup + ongoing weekly | 2 weeks |
| 2 | **Review velocity (target 2–3 new reviews/week)** | Sterling Sky's 18-day rule: GBP rankings drop sharply if no review arrives within 3 weeks. Reviews are the single biggest local rank factor we can directly influence. | 30 min/week | 4 weeks |
| 3 | **Editorial coverage of the Hamid Mir inauguration** | One feature in Dawn / The News / Tribune = 5+ years of organic authority for a Year-1 school | 2–4 weeks of outreach | 6–10 weeks |
| 4 | **Neighborhood landing pages (max 5)** | Captures "school in Township", "Cambridge school Ideal Park" — the real battleground | 4–6 weeks of writing | 6–8 weeks |
| 5 | **Pakistan-specific directory citations** | Free, fast, and AI search assistants pull from these when answering "schools in Lahore" | 1–2 weeks | 2–4 weeks |

Everything else (more blog posts, more schema, more pages) is a multiplier, not a primary lever.

---

## 3. Week-by-week execution: first 12 weeks

### Week 1 — Verification, Pixel, Search Console
- [ ] **Verify domain in Google Search Console** (DNS TXT record on the registrar of `londoneducation.pk`). Submit `sitemap.xml`. Set country target = Pakistan in International Targeting.
- [ ] **Verify domain in Bing Webmaster Tools.** Submit sitemap. Generate IndexNow key and drop the key file at site root (1-line file, no code).
- [ ] **Paste Meta Pixel ID** into `enroll.html` and `thank-you.html` (`PIXEL_ID = '...'`). Without this, paid-traffic attribution is dead.
- [ ] **GA4 events**: add events for `whatsapp_click`, `phone_click`, `form_submit`, `gbp_click`. The site already has `data-wa-cta="..."` attributes on every WhatsApp link — wire them up.
- [ ] **Add UTM tags** to every Meta ad URL: `?utm_source=meta&utm_medium=paid&utm_campaign={ad-name}`. So organic vs paid can finally be separated in GA4.

**Done when:** GSC shows the property verified, Bing Webmaster shows verified, GA4 records a form submit and a WhatsApp click in real-time view, and the Meta Pixel Helper extension shows green on enroll.html.

### Week 2 — Google Business Profile claim & enrichment

This is the single highest-ROI work this quarter. See [section 4](#4-google-business-profile--the-1-lahore-lever).

- [ ] Claim the existing GBP listing at https://maps.google.com/?cid=7737999795082975354 (the existing entry visible on Maps was indexed by Google but is unclaimed)
- [ ] Verify by postcard / video call (postcard takes ~7 days to Lahore)
- [ ] Fill out **every** field — primary category "Private school", secondary "Educational institution", "Child care" (hours match), services list (Cambridge curriculum, Robotics & AI, Foreign Languages, Swimming pool, Career counselling)
- [ ] Upload **20+ photos**: building exterior (3 angles incl. day + dusk), reception, every classroom, robotics lab, computer lab, swimming pool, library, indoor play, outdoor play, principal headshot, founders headshot, Hamid Mir inauguration
- [ ] Add **WhatsApp messaging** as primary contact channel
- [ ] Write the 750-character **Description**: lead with "Cambridge Pathway Registered school in Township, Lahore", include "London International Education System — Prof. Waris Mir Campus", named after Prof. Waris Mir / father of journalist Hamid Mir, founded 2025
- [ ] Add 5 **Q&A** entries (admissions, fees, hours, age range, robotics)
- [ ] Set up the GBP **Posts** schedule — at least one per week (events, announcements, photos)

**Done when:** GBP profile verified ✅, completion score 100%, 20+ photos, first weekly post scheduled.

### Week 3 — First 10 reviews

- [ ] **Build the review request flow**: a one-tap GBP review link generated from the GBP listing. Add it to:
  - The "welcome" WhatsApp message every newly-enrolled family receives
  - The thank-you SMS after a campus tour
  - A printed QR card given to parents at pickup once a term
- [ ] **Personally ask 10 enrolled families** (you have ~130 families to draw from) for a Google review this week. Aim for 7–10 reviews in week 3, all 4–5 stars (don't fish for 5★ only — natural variance is more credible)
- [ ] **Reply to every review within 24h** — even short ones. Replies are a ranking signal and a trust signal to readers
- [ ] Add `aggregateRating` to `index.html` Organization schema once you have ≥5 verified reviews

**Done when:** 10 GBP reviews live, all replied to, average rating ≥4.7.

### Week 4 — Pakistani directory citations

See [section 6](#6-pakistan-specific-citation--directory-plan) for the full list.

- [ ] Submit identical NAP to: **Mera School** (meraschool.com), **ilmkidunya** schools directory, **Rozee.pk** education listings, **Beep.pk**, **Pakwheels Auto Park** (no, just kidding — skip that)
- [ ] Create the **Facebook Business Page** (separate from the personal-style Facebook URL currently in `sameAs`)
- [ ] Verify on **Apple Maps Connect** + **Bing Places** (same NAP)
- [ ] Add all five new profile URLs to `index.html` schema `sameAs` array

**Done when:** 5+ Pakistani directories live with consistent NAP, all profile URLs added to schema sameAs.

### Week 5 — Township neighborhood landing page (cornerstone)

This becomes the template. Get this one right — the others copy the structure.

- [ ] Create `/township-lahore.html` — 700–900 words minimum
- [ ] Page-level Person/Place anchors:
  - H1: "Cambridge Pathway School in Township, Lahore"
  - 3 sub-sections: *About Township as a school catchment* (1 short paragraph), *Why Township parents choose London School* (programme highlights), *Visiting from Township* (driving directions, landmark cues — "Opposite Ideal Park", "5 min from Township Market", etc.)
  - Embedded GBP map with `cid=` parameter
  - 3 photos of the actual campus (no stock)
  - WhatsApp CTA pre-filled with "Township enquiry"
- [ ] Schema: `WebPage` + `LocalBusiness` reference + `containedInPlace` Township
- [ ] Internal-link from index.html footer + about.html + contact section
- [ ] Add to sitemap.xml + GSC submit

**Done when:** Page is live, indexed within 7 days, internal links wired.

### Week 6 — Two more neighborhood pages (Ideal Park + Model Town)

Same template as Township. **Stop at 5 neighborhood pages total** (per Quality Gates in `SEO-STRATEGY.md`). The 5 should be: Township, Ideal Park, Model Town, Garden Town, Faisal Town. **Do not generate any others.**

- [ ] `/ideal-park-lahore.html`
- [ ] `/model-town-lahore.html`

**Done when:** Both pages live, sitemap updated, internally linked from footer + Township page (cluster wiring).

### Week 7 — First press outreach (the Hamid Mir lever)

This is the single highest-authority play available to a Year-1 school. The school's founder is Prof. Waris Mir's daughter; his son Hamid Mir inaugurated the campus on 2026-04-10. This is a real news story.

- [ ] **Draft a press kit page** at `/press.html` (noindex'd until ready):
  - 200-word school fact sheet (Cambridge, robotics, Lahore, founders, principal, founded 2025)
  - High-res inauguration photo (with Hamid Mir, captioned)
  - Founder bios + photos
  - Contact: a real PR-able email + phone (info@londoneducation.pk works for now)
- [ ] **Pitch list (5 outlets), in priority order:**
  1. **Dawn** — Education vertical (most authoritative, weakest reply rate)
  2. **The News International** — Hamid Mir's own paper before Geo (strong personal angle)
  3. **The Express Tribune** — education + Lahore lifestyle desk
  4. **Geo TV digital** — Hamid Mir works at Geo, internal angle is real
  5. **Daily Times** Lahore section
- [ ] **Pitch angle:** "Hamid Mir inaugurates Lahore school named after his father, Prof. Waris Mir — what the family is building decades after the journalist was awarded the Hilal-e-Imtiaz." Lead with the human story (legacy, family, education), not the school as a business.
- [ ] **Local Lahore parenting pages**: Manzil Pakistan, ParentingPK, MaaBaap.pk — pitch a guest article on "Choosing a Cambridge school in Lahore" with London School as a soft mention (not the entire pitch).

**Done when:** 1 confirmed editorial response (interview, feature, or guest post commitment) — that's success in week 7.

### Week 8 — GBP photo + post cadence operationalised

- [ ] **Photo pipeline**: assign one staff member to take 5 phone photos per week of campus life — students at work (faces blurred or with consent), classrooms in use, robotics lab projects, sports day moments. Upload 2–3/week to GBP.
- [ ] **Post cadence**: every Monday a "What's happening this week" post on GBP. Every Friday a "Highlight of the week" photo post.
- [ ] **Q&A monitoring**: check the GBP Q&A tab daily. Answer within 4 hours during office hours.

**Done when:** A 4-week rolling stream of GBP posts and 8+ new photos is established. Cadence sustainable.

### Week 9 — Two more neighborhood pages (Garden Town + Faisal Town)

- [ ] `/garden-town-lahore.html`
- [ ] `/faisal-town-lahore.html`

This caps the cluster at 5 pages. **Do not add a 6th.** If a 6th area becomes important later, retire one of the underperforming five.

### Week 10 — Programme deep-dive pages

The site currently has `ai-robotics.html` (deep) and `academics.html` (overview). Two more cornerstone programme pages will multiply intent capture:

- [ ] `/foreign-languages-lahore.html` — Chinese, French, German offering. Why this is rare in Lahore primary schools. Target: "schools teaching Chinese in Lahore", "French school Lahore primary".
- [ ] `/swimming-lessons-school-lahore.html` — the on-campus pool is a real differentiator. Target: "schools with swimming pool Lahore", "swimming-included school Lahore".

Both pages get full schema (Course, EducationalOccupationalProgram), 600+ words, real photos, parent-facing CTAs.

**Done when:** Both pages live, schema validated, internally linked.

### Week 11 — Review-to-revenue loop

- [ ] Hit **25 GBP reviews** (target from IMPLEMENTATION-ROADMAP). Use the review request flow built in Week 3.
- [ ] **Embed real Google reviews** on the homepage testimonials section. Replace the current generic testimonials with the actual Google review widget (or scrape + manually publish with attribution to "Google review, [Month] 2026").
- [ ] **Add `aggregateRating`** to index.html Organization schema. This unlocks star-rating rich snippets in Google Search.

**Done when:** Homepage shows real, attributed Google reviews + star rating; schema validates.

### Week 12 — First-quarter retrospective + plan adjustment

- [ ] **GSC pull**: top 50 queries the site ranks for. Top 20 pages by impressions. Click-through rate per page. Average position.
- [ ] **GBP pull**: profile views, direction requests, calls, photo views (per month, per category). Compare to KPI targets in SEO-STRATEGY.md.
- [ ] **GA4 pull**: organic sessions, top landing pages, form submissions from organic, WhatsApp clicks from organic.
- [ ] **Decision criteria for next quarter:**
  - If neighborhood pages aren't indexing: investigate internal linking, reduce thinness, or merge.
  - If GBP isn't gaining views: photo cadence or category mismatch.
  - If reviews stalled below 25: tighten the WhatsApp request flow.

**Done when:** A 1-page retrospective doc exists with hard numbers and 3 specific decisions for the next quarter.

---

## 4. Google Business Profile — the #1 Lahore lever

**The single most important asset for this school's local growth.** A fully-loaded GBP outranks 20 organic articles for "school near me" / "Cambridge school Township" queries. Treat it as a primary publishing surface, not a static listing.

### One-time setup (Week 2)
| Field | Value | Notes |
|---|---|---|
| Business name | London School — Prof. Waris Mir Campus | Match site display name exactly |
| Primary category | Private school | Most specific available |
| Secondary categories | Educational institution; Tutoring service; Day care center | Tutoring captures after-school tutor searches; day-care matches Pre-Nursery |
| Address | Plot #8, Sector B-2, Block 1, Ali Road, Opposite Ideal Park Township | Match schema exactly |
| Service area | Disable (it's a physical school, not SAB) | |
| Phone | +92-301-0499777 (primary) | Match schema |
| Hours | Mon–Sat 08:00–16:00; Sunday closed | Match schema |
| Holiday hours | Set Eid, Pakistan Day, Independence Day, Christmas | Updated quarterly |
| Website | https://londoneducation.pk/ | Canonical |
| Appointment URL | https://wa.me/923010499777?text=Hi%2C%20I%27d%20like%20to%20book%20a%20campus%20tour. | Routes to admissions WhatsApp |
| Description | "Cambridge Pathway Registered school in Township, Lahore. London International Education System — Prof. Waris Mir Campus, named after the late Professor Waris Mir (father of journalist Hamid Mir). Founded 2025 by his daughter Huma Mir and granddaughter Zoya Mir. We pair the Cambridge curriculum (Pre-Nursery through IGCSE / O-Level) with Pakistan's most advanced early robotics and AI programme, three foreign languages (Chinese, French, German), and 25+ sports including a swimming pool. LAPS-affiliated." | 750 char limit; this is ~720 |

### Photos (20+ minimum)
| Type | Required count |
|---|---|
| Logo | 1 (square, transparent if possible) |
| Cover photo | 1 (building exterior, day) |
| Interior | 6+ (classrooms, library, hallway, computer lab, robotics lab, assembly hall) |
| Exterior | 3 (front, side, dusk shot) |
| Team | 2+ (principal, founders) |
| At work | 5+ (children in class, robotics, sports — anonymised if needed) |
| Identity | 2+ (logo signage, school crest on building) |

**Re-upload 5+ photos every month** — Google explicitly favors profiles with fresh visual content.

### Posts (weekly, ongoing)
- **What's New** post every Monday — programme highlight, achievement, upcoming event
- **Photo** post every Friday — campus life snapshot
- **Event** post for any school event (Open House, Sports Day, Cultural Day) at least 14 days in advance
- **Offer** post for Open House visit benefits (campus visit value)

### Q&A (seed it yourself)
Pre-populate 5 questions parents will ask, then answer them yourself from a different Google account or have admissions staff post them. Examples:
- "What ages does London School accept?"
- "Is there a swimming pool?"
- "How do I apply?"
- "Where exactly is the campus?"
- "What is the Cambridge Pathway?"

### KPI targets
| Month | Reviews | Photos | Profile views | Direction requests |
|---|---|---|---|---|
| 1 | 10 | 25 | 200 | 30 |
| 3 | 25 | 50 | 800 | 100 |
| 6 | 60 | 80 | 2,500 | 250 |
| 12 | 120 | 150+ | 8,000 | 700 |

---

## 5. Local content engine for Lahore neighborhoods

**Hard cap: 5 neighborhood pages.** This is a single-campus school. Anything beyond 5 starts looking like programmatic spam to Google.

### The 5 approved neighborhoods (in order of priority)

| # | Neighborhood | Distance | Why it's a target |
|---|---|---|---|
| 1 | **Township** | <1 km | Same neighborhood as the campus. Highest-intent local query. |
| 2 | **Ideal Park** | <1 km | Mentioned by name in the school's address ("Opposite Ideal Park Township"). Direct landmark association. |
| 3 | **Model Town** | ~3 km | Affluent corridor with high concentration of target families. |
| 4 | **Garden Town** | ~3.5 km | Adjacent to Model Town — same parent profile. |
| 5 | **Faisal Town** | ~4 km | Educated middle-class catchment. |

### What every neighborhood page must include

1. **H1**: "Cambridge Pathway School in [Neighborhood], Lahore" (or "Private school in [Neighborhood] for Cambridge IGCSE")
2. **Distance & landmarks**: "London School — Prof. Waris Mir Campus is X km from [Neighborhood]'s [main landmark], a Y-minute drive via [main road]."
3. **Why parents from this neighborhood enrol**: 2–3 paragraphs of substance, not generic. Example for Model Town: "For Model Town families, the draw is usually the AI & robotics programme — a 12-minute drive on Wahdat Road for an early-coding curriculum that doesn't exist in Model Town itself."
4. **Programme summary** with internal links to academics.html and ai-robotics.html
5. **Visit/contact section** with WhatsApp pre-filled with the neighborhood name in the message
6. **Embedded map** (CID-based, same as homepage)
7. **3 real photos** of the campus
8. **Schema**: `WebPage` + `LocalBusiness` reference + `containedInPlace` set to that neighborhood (cascading: Neighborhood → Lahore → Pakistan)
9. **Internal links** from: homepage footer, contact section, the other 4 neighborhood pages (cluster wiring)

### What a neighborhood page must NOT do

- ❌ Repeat 80%+ of content from another neighborhood page
- ❌ Use stock photos of any other school
- ❌ Claim the school is "in" a neighborhood it isn't physically in
- ❌ Generate by template only — a human must write the unique paragraphs

### Anchor text discipline

Internal links to neighborhood pages should use varied anchor text. Bad: 5 footer links all reading "Lahore school". Good: "Township school", "Cambridge school in Ideal Park", "Model Town admissions", etc. Helps Google distinguish the pages.

---

## 6. Pakistan-specific citation & directory plan

Free, fast, and most AI search assistants (ChatGPT web search, Perplexity, Google AI Overviews) will pull from these when answering "schools in Lahore" queries.

### Tier 1 — must-have (Weeks 1–4)

| Directory | URL pattern | Effort | Notes |
|---|---|---|---|
| **Google Business Profile** | maps.google.com | High (the work in §4) | The #1 local lever. |
| **Bing Places for Business** | bingplaces.com | Low | 5 minutes once GBP is verified — Bing will auto-import GBP info. |
| **Apple Maps Connect** | mapsconnect.apple.com | Medium | Apple users (iPhone parents in Lahore) skew affluent — relevant audience. |
| **Facebook Business Page** | facebook.com/londonschoolwarismir | Low | A *Business* page, not the personal-style URL. Verify with Meta Business Suite. |
| **Instagram Business** | already linked | — | Switch personal Instagram to a Business profile if not done. |
| **Mera School** | meraschool.com | Medium | Pakistan's biggest school directory. Submit a free listing, upload photos, fill curriculum details. |
| **ilmkidunya** | ilmkidunya.com/schools | Medium | Education-portal authority in Pakistan. Free school listing. |

### Tier 2 — nice-to-have (Weeks 5–8)

| Directory | Notes |
|---|---|
| **Beep.pk** | Local Pakistan business directory — submit basic NAP. |
| **Yellow Pages Pakistan** | yp.com.pk — submit. |
| **Fizyko** | Education-only directory, smaller traffic but quality citation. |
| **PakistanSchools.com.pk** | Niche but indexed by Google. |
| **Edukasyon.com.pk** | Submit listing. |
| **Hamariweb / Hamariweb.com** | Largest Pakistani local-business portal. |

### Tier 3 — consider only if time permits

LinkedIn Company Page (Page is good for editorial outreach later but low direct ranking value), JustDial Pakistan, Locanto, Lahore-only Facebook Group share-throughs.

### NAP consistency rules

Every directory **must** use exactly the same:
- Name: `London School — Prof. Waris Mir Campus`
- Address: `Plot #8, Sector B-2, Block 1, Ali Road, Opposite Ideal Park Township, Lahore 54600, Punjab, Pakistan`
- Phone (primary): `+92-301-0499777`
- Website: `https://londoneducation.pk/`

Add every approved profile URL to the `sameAs` array on `index.html` Organization schema as you go.

---

## 7. Review acquisition system

Reviews are the single biggest local rank factor we can directly influence.

### The 18-day rule (Sterling Sky)
A GBP profile that goes 18+ days without a new review starts losing local pack position. **Therefore the goal is 1 review per 14 days, minimum.** A more aggressive target is 2–3 reviews per week, which gets to 25 reviews by Week 12.

### The system

**Step 1 — Generate the 1-tap review link.** From the GBP listing, copy the "share review" link. It looks like `https://g.page/r/CWp4X-HQ5WJrEAE/review`. Save this everywhere.

**Step 2 — Wire it into the parent journey.**

| Touchpoint | Channel | Message |
|---|---|---|
| Within 24 hours of campus tour | WhatsApp (admissions team) | "Thank you for visiting today! If you have a moment, would you mind sharing your impression of the school on Google? It helps other Lahore families discover us. {LINK}" |
| 1 week after enrollment confirmed | WhatsApp | "Welcome to the London School family! When you're ready, a quick Google review goes a long way: {LINK}" |
| End of every term (Dec, Apr, Aug) | Printed QR card given at pickup | "Tell other Township families about us — scan to leave a Google review." |
| After any open house | WhatsApp follow-up | Same template as touchpoint 1 |

**Step 3 — Reply to every review.** Within 24 hours during office hours. Replies are a direct ranking signal.

**Step 4 — Never offer incentives for reviews.** Discounts, freebies, etc. violate Google's terms and risk profile suspension.

**Step 5 — Track velocity.** A simple weekly count of new reviews; if any 14-day window passes without one, tighten the asking flow.

### Targets
- **Week 4**: 10 reviews, 4.7+ average
- **Week 12**: 25 reviews, 4.8+ average
- **Month 6**: 60 reviews
- **Month 12**: 120 reviews

---

## 8. Editorial / link-earning plays unique to this school

Most Year-1 schools have nothing to pitch. **You have a uniquely pitchable story:** Prof. Waris Mir's family launching a school in his name, with Hamid Mir publicly inaugurating it. This is real journalism, not a press release.

### The pitchable angles (in order of strength)

1. **The legacy story.** "Prof. Waris Mir's daughter and granddaughter open Lahore school in his honour 39 years after his death." Lead = human, not commercial. Outlets: Dawn, The News, Tribune, Friday Times.
2. **The Hamid Mir inauguration.** "Hamid Mir returns to Lahore to open a school named after his late father." Strong photo opportunity already exists (event-hamid-mir-inauguration.jpg). Outlets: Geo digital, Dawn, Daily Times.
3. **The robotics-from-age-3 angle.** "Pakistan's most advanced early robotics programme: how a Lahore school is teaching coding to 3-year-olds." Outlets: TechJuice, ProPakistani, MIT Technology Review (long shot but worth a try).
4. **The women-founder angle.** "A mother and daughter rebuild a media legacy as an education legacy in Lahore." Outlets: Aurora magazine, Hello! Pakistan, women-business publications.
5. **The Cambridge-affordable-private-school angle.** "Cambridge education in Lahore at PKR 18,000/month — what changed and who's it for." (Discuss fees only off-site / in pitch, not on the public website.) Outlets: Tribune education vertical, Dawn Education.

### Outreach mechanics

- Use the school's own email domain (`info@londoneducation.pk` or `principal@londoneducation.pk`). Generic Gmail kills credibility.
- Pitch with a 200-word email + 1 photo + a fact sheet PDF
- Follow up exactly once after 7 days. Then move on.
- **Track every pitch** in a spreadsheet (outlet, contact, date, response) — this becomes ammunition for the next school you build or for ongoing PR.

### Other link-earning plays

- **Cambridge International school directory listing** — request inclusion at https://www.cambridgeinternational.org/why-choose-us/find-a-cambridge-school/ once Cambridge Pathway registration is fully confirmed. This is a `.org` link from Cambridge itself.
- **LAPS partner registry** — same principle, request listing.
- **Local Lahore parent Facebook groups** — share genuine, helpful answers to "looking for a school" posts (no spam — actual help). Drives social referral, not direct SEO, but feeds Pakistan-specific E-E-A-T.

### What to avoid

- ❌ Paid link directories (any "buy 100 links for $99" service kills your domain)
- ❌ Bulk guest posting on low-quality blogs
- ❌ Sponsored posts that aren't disclosed
- ❌ Asking other schools for reciprocal links

---

## 9. AI search (GEO) for Lahore queries

The site has done the GEO basics (llms.txt, robots.txt AI crawler rules, FAQPage schema, Hamid Mir entity link via `mentions`). The growth play here is making sure AI assistants cite the school for **specific Lahore queries**.

### Test queries to verify monthly

Every month, run these queries on **ChatGPT** (web-search mode), **Perplexity**, and **Google AI Overviews** (when available in Pakistan):

1. "Cambridge schools in Township Lahore"
2. "Best robotics school for kids in Lahore"
3. "Schools teaching Chinese in Lahore"
4. "Cambridge IGCSE schools Model Town Lahore"
5. "Schools with swimming pool in Lahore"
6. "Who founded London School in Lahore?"
7. "What is Prof. Waris Mir's connection to London School?"

For each, record: did it cite us, did it mention us by name, did it link to us. This is the GEO scorecard.

### What unlocks more citations

1. **More structured passages.** Each major page should have a self-contained 60–130 word passage that directly answers a specific question. The FAQPage entries on `enroll.html` and `ai-robotics.html` already do this — replicate the pattern on programme pages, neighborhood pages, and the about page.
2. **Hamid Mir / Waris Mir entity strength.** Create a Wikipedia stub for Prof. Waris Mir (use his Hilal-e-Imtiaz, his Daily Jang columns, his Punjab University tenure as sources). Once Wikipedia accepts the stub, every AI assistant gains a citable anchor for the school's history. **High effort, very high payoff.**
3. **Refresh `llms.txt` quarterly.** Bump the `Last updated` date and add new programme detail, new key FAQs, new partnerships.
4. **Get a few editorial mentions** (see §8). AI assistants weight Wikipedia + named editorial sources heavily in their citation logic.

### What hurts AI citation

- Brand name inconsistency (already fixed)
- Contradictions between llms.txt and HTML (already fixed)
- Pages that lead with marketing prose instead of factual answer sentences (still partly true on the homepage hero)
- Lack of a Wikipedia anchor (we don't have one)

---

## 10. Tracking & weekly cadence

### Weekly review (30 min, every Friday)
- [ ] GSC: top queries past 7 days, top pages, average CTR. Flag anything dropping ≥3 positions week-on-week.
- [ ] GBP: new reviews count, photo views, profile views, direction requests. Reply to any unanswered review.
- [ ] GA4: organic sessions, top landing pages, WhatsApp click events from organic.
- [ ] Pipeline: how many admissions enquiries this week came via organic / Meta / WhatsApp / direct?

### Monthly review (1 hour, first Monday)
- [ ] Run the 7 GEO test queries from §9. Update scorecard.
- [ ] Submit any new pages to GSC.
- [ ] Re-audit Core Web Vitals (Lighthouse mobile + CrUX field data via PageSpeed Insights).
- [ ] Push 5+ new GBP photos.
- [ ] Plan next month's content: 4 weekly posts, 1 GBP event post, any neighborhood-page refresh.

### Quarterly review (3 hours, every 13 weeks)
- [ ] Compare actuals vs SEO-STRATEGY.md KPI table.
- [ ] Decide: do any pages need to be merged or sunset?
- [ ] Re-pull the COMPETITOR-ANALYSIS.md picks — has anyone new entered the Township / Cambridge-Lahore space?
- [ ] Refresh `llms.txt` `Last updated` and any changed facts.
- [ ] Adjust the next quarter's priorities based on what's working.

### Single dashboard (build once)

Create a Google Sheet with three tabs:
1. **Weekly KPIs** — date, organic sessions, GSC impressions, GSC clicks, GBP views, GBP calls, new reviews, organic enquiries
2. **Pages tracker** — every URL, target keyword, current rank (manual or rank-tracker), last update date
3. **Pitch tracker** — every editorial pitch with status

This sheet replaces all ad-hoc reporting.

---

## 11. Hard rules — do not violate

1. **Single campus.** No location pages for Karachi / Islamabad / Multan / fictional branches. Ever.
2. **Five neighborhood-page cap.** See §5.
3. **Brochure is canon.** If marketing changes the brochure, update llms.txt and the relevant pages within 48 hours.
4. **No fake reviews.** No incentives for reviews. No reviews from staff/family.
5. **No fabricated testimonials.** Real parent name + real grade + dated quote, or it's anonymised ("from a Primary parent, March 2026"). Already cleaned up — keep it that way.
6. **No fabricated quotes from Prof. Waris Mir.** Already reframed as "themes from his writing" — keep it that way until specific Daily Jang citations are added.
7. **No buying backlinks.** Earn or perish.
8. **No cloaking, no doorway pages, no AI-generated thin content.** Every page hits the 500-word minimum AND the unique-content threshold.
9. **NAP is sacred.** Phone format, address wording, business name — change once across all surfaces (website, schema, llms.txt, GBP, every directory) or not at all.
10. **Reviews get replies within 24 hours.** Always. Even one-star ones.

---

## What this plan does NOT cover (deliberately)

- **Paid search (Google Ads).** Out of scope — Meta is the paid channel; organic is the slow-compounding one.
- **YouTube SEO.** Worth doing eventually but not in the first 90 days.
- **Bilingual (Urdu) site.** The primary audience googles in English even when Urdu is their primary language. Revisit after 12 months if data shows demand.
- **National SEO.** The school is Lahore-only. Stay disciplined.

---

## TL;DR — if you only do 5 things this quarter

1. **Claim the GBP** (Week 2). Without this, none of the local SEO happens.
2. **Get to 25 Google reviews** (by Week 12). 2–3/week, every week.
3. **Ship 5 neighborhood pages** (by Week 9). Township → Ideal Park → Model Town → Garden Town → Faisal Town.
4. **Pitch the Hamid Mir story to 5 outlets** (Week 7). One reply gets you years of authority.
5. **Submit to 7 Pakistani directories** with consistent NAP (Weeks 1–4).

If those five things are done by July 2026, the site will be ranking top-20 for most Township + Cambridge-pathway-Lahore queries by August, and the Year-1 enrolment funnel will have its first organic-sourced cohort.
