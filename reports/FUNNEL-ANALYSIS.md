# E2E Funnel Analysis — londoneducation.pk
**Generated:** 2026-04-27
**Window:** GA4 = 2026-04-25 to 2026-04-26 (~2 days, 1 full day); GSC = 2026-03-31 to 2026-04-25 (28 days)
**Raw data:** `reports/ga-gsc-raw-data.md`

> ⚠️ **Read this first.** GA4 property `534545642` was created on **2026-04-25 19:03 UTC** — only 2 days ago. Most "trend" claims are unsafe. This analysis focuses on **structural problems visible even with 2 days of data**, plus the funnel framework to evaluate again at the 14-day mark.

---

## TL;DR — Top 5 Findings (Ranked by Impact)

| # | Finding | Impact | Effort | Action |
|---|---|---|---|---|
| 1 | **Direct traffic is 69% of sessions but mostly UNATTRIBUTED Meta ad clicks.** 18 of 28 landing-page rows are `?fbclid=...` — Meta paid traffic landing as "Direct" because UTMs aren't set on Meta ads. | 🔥🔥🔥 | Low | Add UTMs to all Meta campaigns immediately |
| 2 | **enroll.html has 12% engagement rate vs. 67% for homepage** — and converts 2× per 25 sessions. People are landing on enroll, NOT engaging, NOT converting. | 🔥🔥🔥 | Med | Already addressed today (form-first, fee grid, CTA copy) — re-measure in 7d |
| 3 | **Only 1 `generate_lead` event in 1 day across 173 sessions** — that's 0.58% lead rate. Industry benchmark for school landing pages is 5-15%. | 🔥🔥🔥 | High | Likely a measurement issue OR genuinely poor form CR — investigate both |
| 4 | **GSC: 65 impressions / 5 clicks in 28 days** — site is invisible in search. All 11 ranked queries are pure brand ("London School Lahore", "Hamid Mir school"). Zero non-brand SEO traffic. | 🔥🔥 | High | Need 3-month organic content plan; site won't drive cold traffic for ~6 mo |
| 5 | **`gtm_latency=1` on 14 sessions** — your GTM/gtag setup is firing a fallback URL parameter. Indicates GA tag is loading slowly enough to trip GTM's "latency" detection. | 🔥 | Low | Confirms my earlier theory: lazy-load tag is hurting attribution |

---

## The Funnel — As It Exists Today (2 days of data)

```
GSC IMPRESSIONS (28d) ─────────────────────────────  65
       │
       ▼ 7.7% CTR (good — high because brand-only)
GSC CLICKS (28d) ────────────────────────────────────  5
       │
       ▼ (organic is tiny piece — most sessions are direct/Meta)
GA4 SESSIONS (2d) ─────────────────────────────────── 166
       ├─ Direct (mostly Meta ads w/o UTMs):       119  (72%)
       ├─ Organic Search:                            14  (8%)
       ├─ Organic Social (FB/IG referral):          11  (7%)
       ├─ Paid Search (Google Ads):                  9  (5%)
       ├─ Paid Social (IG paid):                     5  (3%)
       └─ Referral / Unassigned:                     8  (5%)
       │
       ▼ 52% engagement rate (mediocre)
ENGAGED SESSIONS ─────────────────────────────────── 79
       │
       ▼ Landing breakdown:
   HOMEPAGE (/)           → 96 sessions, 67% engagement, 4 conversions
   ENROLL (/enroll.html)  → 25 sessions, 12% engagement, 2 conversions  ⚠️
       │
       ▼ Form interaction:
FORM_START events ─────────────────────────────────── 5  (3% of 173 sessions)
       │
       ▼ Form submission:
GENERATE_LEAD events ────────────────────────────────── 1  (0.6%) ⚠️
       │
       ▼ Confirmed:
CONVERSIONS (GA4 key events) ────────────────────────── 6  (3.5%)
       │  (note: this includes WhatsApp clicks counted as conversions
       │   via gtag_report_conversion — NOT just form submits)
       │
WHATSAPP_CLICK events ─────────────────────────────── 21
PHONE_CLICK events ─────────────────────────────────── 1
```

### Conversion ratios that matter
- **Session → form_start: 2.9%** — only 1 in 35 visitors even starts the form
- **form_start → generate_lead: 20%** — 4 of 5 starts abandon mid-form
- **Session → WhatsApp click: 12%** — 1 in 8 visitors clicks a WA button
- **Total leads (form + WA): 22 / 173 = 12.7%** — actually decent IF WhatsApp clicks convert downstream

---

## Finding #1 — Meta ads are bleeding attribution (BIGGEST FIX)

**The data:**
Out of 28 unique landing-page entries, **18 are `/?fbclid=...`** (one per ad click). Each shows up as "Direct / (none)" in GA4 because Meta strips referrers and you're not adding UTMs.

| Source | Sessions | Conversions |
|---|---|---|
| `(direct) / (none)` | 119 | 6 |
| `m.facebook.com / referral` | 6 | 0 |
| `facebook.com / referral` | 3 | 0 |
| `ig / paid` | 5 | 0 |
| `lm.facebook.com / referral` | 2 | 0 |

The 119 "direct" sessions include almost all your Meta ad clicks. Per your own data: you spend ~Rs 12K/day on Meta = ~465 leads / 10 days. Those leads are landing here as "Direct" — meaning **you cannot tell from GA4 which campaign / ad / creative is converting**.

**Fix (10 minutes in Meta Ads Manager):**
Add to every ad's URL parameters:
```
utm_source=facebook&utm_medium=paidsocial&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.name}}&fbclid={{fbclid}}
```

Meta supports dynamic URL parameter macros. Set this **once at the account level** (Ad Account → Settings → URL parameters) and it propagates.

**Expected impact:** Direct traffic drops from 72% → ~10%. Paid Social jumps from 3% → ~65%. You can then see CPL by campaign in GA4.

---

## Finding #2 — enroll.html is the conversion bottleneck

**The numbers:**
- Homepage: 96 sessions / 67% engagement / 4 conversions = **4.2% conversion rate**
- Enroll: 25 sessions / 12% engagement / 2 conversions = **8% conversion rate** but only 12% engagement

**Two stories collide here:**
1. enroll.html actually converts BETTER per session (8% vs 4.2%) — when people stay, they convert
2. But 88% of enroll visitors don't engage (engagement = >10s, scroll, or 2nd pageview). So most leave instantly.

**Likely causes (today's fixes addressed each):**
- Form was hidden below the fold on mobile → ✅ fixed (form-first)
- Nav covered top of form → ✅ fixed (padding bump)
- "Book a Visit" CTAs jumped to WhatsApp away from page → ✅ fixed (anchor to #leadForm)
- Fee grid cramped to 2 cols on mobile → ✅ fixed
- CTA copy generic → ✅ fixed (Reserve Spot / Get My Fee Plan)

**Test plan:** Re-pull this same query on 2026-05-04 (7 days from the deploy). If enroll engagement rate doesn't move from 12% → 30%+, the issue is page content/offer, not UX.

---

## Finding #3 — `generate_lead` is suspiciously low

**The math:**
1 `generate_lead` event over 173 sessions = 0.58%. But you also see:
- 5 `form_start` events
- 6 GA4 conversions (which includes WA clicks)

Two possible explanations:
- **(a) Real:** only 1 person actually completed the enroll form yesterday. Plausible for 1 day with mostly homepage traffic.
- **(b) Measurement bug:** the form's `gtag('event', 'generate_lead', ...)` only fires if the form passes `checkValidity()`. If users hit submit on an invalid form, no event fires. If the form silently errors before the gtag call, no event fires.

**Verify by:** check Google Sheet (the form's `data-endpoint` posts to Apps Script which writes to a Sheet). If the Sheet has 5+ rows from yesterday but GA shows 1 generate_lead, it's a measurement bug — likely the lazy-load gtag race condition.

**Action:** add me access to the Google Sheet OR run the form submission in incognito with DevTools open to confirm gtag fires.

---

## Finding #4 — Zero non-brand SEO traffic

**All 11 ranked queries are brand:**
- "london school lahore" (1 click)
- "hamid mir school"
- "london international school" + variants
- "london school" + location modifiers

**There's nothing for:**
- "Cambridge school in Lahore" (high intent, parent shopping)
- "best primary school Lahore"
- "robotics school for kids Lahore"
- "IGCSE school Lahore" (school doesn't actually offer this yet — leave alone)
- "school admission 2026 Lahore"

Your blog has 4 posts. Per [content calendar](/Users/akif.hazarvi/londoneducation_scrape/website/CONTENT-CALENDAR.md) you should be at ~12 by now. **SEO will be flat for ~6 months no matter what.** Don't optimize for organic right now — focus on the paid funnel.

---

## Finding #5 — gtag latency is real

`?gtm_latency=1` appears on 14 sessions. This is GTM's built-in flag for "tag fired late." Combined with the user's observation that GA numbers look inflated, AND the lazy-load setup in [index.html:36-43](../index.html#L36-L43) (loads gtag on first scroll/click/touchstart), I think **the lazy-load is causing a small subset of visitors to NOT get measured at all** (they bounce before scroll/click) and **another subset to get measured twice** (page_view fires on dataLayer replay after script load).

**The 1,233 events / 132 users = 9.3 events/user is high** but not crazy (page_view + first_visit + session_start + scroll + user_engagement is already 5 events on a single visit).

**Recommendation:** wait 7 more days and compare GA4 sessions vs Vercel sessions. If they're within 15% of each other, it's fine. If GA shows >25% more, kill the lazy-load and load gtag normally.

---

## What to Do This Week (Ranked by ROI)

### 🔥 This week (high impact, low effort)
1. **Add UTM macros to Meta Ads** (10 min) — fixes 70% of attribution
2. **Verify form completions in Google Sheet vs `generate_lead` count** (15 min) — confirms tracking integrity
3. **Add `pageview` event to Vercel Analytics for `?fbclid=*` filter** (already auto-tracked, just need a filter view in dashboard)

### 📊 Next week (measure post-fix impact)
4. **Re-run this funnel analysis 2026-05-04** — compare enroll engagement before/after today's UX fixes
5. **Compare GA4 vs Vercel session counts** — answers the "GA inflated?" question definitively
6. **Set up GA4 Funnel Exploration:** Home → enroll.html → form_start → generate_lead

### 🚀 Month 1 (structural)
7. **Content velocity:** publish 2 new blog posts targeting non-brand intent ("Cambridge school in Lahore", "Best Robotics school for kids Pakistan")
8. **GBP optimization** — if 14 organic sessions came in 1 day, fix the GBP listing for local pack capture
9. **Set up GA4 Audiences:** "Visited enroll, didn't convert" → retarget on Meta

### 🧪 Month 2+ (test)
10. A/B test enroll headline (currently "Cambridge Education. Robotics & AI. Built for your child.")
11. A/B test fee transparency: show prices vs. "Get Personalised Plan" gate

---

## Funnel Framework (use this as the dashboard)

When this report is re-run with 14+ days of data, evaluate against these targets:

| Step | Metric | Current | 30-day target | 90-day target |
|---|---|---|---|---|
| Acquisition | Sessions/day | ~85 | 200+ | 400+ |
| Attribution | Direct % | 72% | <20% | <15% |
| Engagement | Session engagement rate | 52% | 60% | 65% |
| Landing | Enroll engagement rate | 12% | 30% | 45% |
| Intent | form_start rate | 2.9% | 8% | 12% |
| Conversion | generate_lead rate | 0.6% | 4% | 6% |
| Total leads | Form + WA / sessions | 12.7% | 15% | 18% |
| Cost | CPL (with UTM attribution) | unknown | <Rs 200 | <Rs 150 |
| SEO | GSC clicks/month | 5 | 50 | 200 |
| SEO | Non-brand impressions % | 0% | 30% | 50% |

---

## Open questions for the owner

1. **Google Sheet access** — is yesterday's form-submission count 1 (matches GA) or higher (proves measurement bug)?
2. **Meta Ads URL parameters** — can you set them, or do I need to write the exact string to paste?
3. **GBP listing** — is it claimed and verified for `londoneducation.pk`? 14 organic sessions in 1 day suggests a Maps query is firing.
4. **Why was the GA4 property only created 2 days ago?** Was there a previous property with historical data we're missing?
