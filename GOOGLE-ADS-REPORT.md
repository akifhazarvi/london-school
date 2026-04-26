# Google Ads Setup Review — London International Education System

**Account:** `6434503242` · **Currency:** USD · **Time zone:** America/Phoenix
**Audit date:** 2026-04-26 · **Account age:** ~1 day · **Data window:** Last 7 days (5 impressions total)

> **Mode: SETUP REVIEW, not performance audit.** Account is <24h old with effectively zero traffic, so performance thresholds (CTR, CVR, QS distribution, wasted-spend %) cannot be evaluated. This review focuses on **structural correctness** — the things that will silently burn budget the moment volume picks up.

---

## Health Score (Setup-Only)

```
Setup Health: 64/100 (Grade: C — fix TZ/currency + negatives before scaling)

Conversion Tracking: 60/100  ██████░░░░  (25%)
Wasted-Spend Guards: 65/100  ██████░░░░  (20%)
Account Structure:   55/100  █████░░░░░  (15%)
Keywords:            55/100  █████░░░░░  (15%)
Ads:                 80/100  ████████░░  (15%)
Settings:            55/100  █████░░░░░  (10%)  ← MANUAL CPC + WRONG TZ
```

---

## 🚨 Blockers — Fix Before Spending Another Rupee

### 1. PROXIMITY RADIUS IS TIGHT + OFF-CENTER — MEDIUM
- **Finding:** Targeting is **PROXIMITY 10km** centered at lat `31.4556`, lng `74.3022` (≈ Johar Town / Wapda Town). Presence-only ✅.
- **Impact:** Two issues:
  1. **Center is ~8km southwest of the actual campus** (Ali Road / Ideal Park ≈ 31.522, 74.357). The current circle barely covers Ideal Park at its NE edge.
  2. **10km radius clips premium feeder areas** — DHA Phase 5+, Bahria Town, parts of Cantt, Askari, Raiwind Road. Cambridge-school parents often drive from these.
- **Fix:** Re-center on the campus and widen to **15–20 km**. Or add a second proximity circle for DHA/Bahria if you want to cap the cost there separately.

### 2. TIME ZONE IS `America/Phoenix` — CRITICAL
- **Finding:** Account TZ = America/Phoenix (UTC-7, no DST). School operates in Asia/Karachi (UTC+5).
- **Impact:** "Daily budget reset," ad scheduling, and report dates are all ~12 hours off. If you set "Mon–Sat 8am–4pm" thinking PKT, ads actually run 8pm–4am Pakistan time.
- **Fix:** Time zone is **set once at account creation and CANNOT be changed** without a new account. **Decision needed:** rebuild the account with Asia/Karachi TZ, or accept the offset and configure ad schedules in Phoenix-equivalent hours (Lahore 8am = Phoenix 8pm previous day). Recommendation: rebuild — you're 1 day in, sunk cost is zero.

### 3. CURRENCY IS USD, NOT PKR — HIGH
- **Finding:** Account currency = USD. Tied to TZ at account creation.
- **Impact:** Ad copy mentions "PKR 18,000/mo" but your bids, budget, and reporting are USD-denominated. \$10/day budget ≈ Rs 2,800/day — way under your Meta benchmark of Rs 12K/day. Mental math overhead and harder to compare with the Meta funnel (Rs 180 CPL at Rs 12K/day = ~67 leads/day).
- **Fix:** Same answer as #2 — rebuild the account in PKR + Asia/Karachi if you're going to scale. Otherwise track conversion values in USD and accept the conversion friction.

### 4. CAMPAIGN-LEVEL NEGATIVES ARE BROAD MATCH — HIGH
- **Finding:** All 31 campaign-level negatives use **BROAD** match (e.g., `[BROAD] free`, `[BROAD] college`, `[BROAD] result`).
- **Impact:** Per the audit rules in the skill — broad-match negatives over-block. `[BROAD] college` blocks "Cambridge college pathway." `[BROAD] result` blocks "best results." `[BROAD] free` blocks "free WhatsApp consultation" — kills your funnel CTA.
- **Fix:** Convert all 31 to **EXACT** or **PHRASE** match. Your 69-keyword shared negative list (`Master Negatives — School`) already does this correctly (54 EXACT, 15 PHRASE) — match that pattern.

---

## Conversion Tracking (25%)

| Check | Status | Note |
|---|---|---|
| Auto-tagging enabled | ✅ PASS | Required for Google Ads → GA4/Analytics |
| Conversion tracking ID present | ✅ PASS | `18119617331` |
| Primary conversion defined | ✅ PASS | "Enrollment Form Submission" (WEBPAGE_CODELESS) |
| Conversion action coverage | ⚠️ WARNING | Only 1 primary action. No phone-call goal flagged primary, no WhatsApp click event. |
| Click-to-call as conversion | ⚠️ WARNING | "Click to call" exists but `includeInConversionsMetric=false`. Not counted. |
| Lead form submit | ⚠️ WARNING | "Lead form - Submit" exists but `primaryForGoal=false`, last-click attribution, 1-day click window (too short for a school decision cycle). |
| Attribution model | ✅ PASS | Primary action = Data-Driven (correct) |
| Enhanced Conversions | ❓ UNKNOWN | Cannot verify via API; check in UI: Tools → Conversions → Enhanced Conversions for Leads. **Strongly recommended** — first-party hashed email/phone lifts measurement when iOS/cookies block pixels. |
| Consent Mode v2 | ❓ UNKNOWN | EEA-required but you're targeting Lahore — low priority unless expanding. |
| Server-side / offline conv import | ❌ FAIL | None configured. **Important for your funnel:** Meta-style WhatsApp leads → human follow-up → enrollment is exactly the offline conversion case. Without it, Google can only optimize on form-fills, not actual enrollments. |

**Recommendation:** Activate Enhanced Conversions for Leads, set the "Lead form - Submit" action to a 30-day click window + Primary status, and plan for offline conversion import (admissions team marks lead → tour → enrollment in a sheet, uploaded to Google Ads via a Zap or n8n).

---

## Wasted-Spend Guards (20%)

| Check | Status | Note |
|---|---|---|
| Location targeting | ⚠️ WARNING | PROXIMITY 10km, center 8km off campus, radius tight. See blocker #1. |
| Negative keyword shared list | ✅ PASS | "Master Negatives — School" — 69 well-themed EXACT/PHRASE negatives (jobs, careers, competitors, other cities, "free", "salary", govt schools, hifz/madrasa). Solid foundation. |
| Campaign-level negatives | ⚠️ WARNING | 31 present, all BROAD — over-blocking risk. See blocker #4. |
| Negative coverage themes | ✅ PASS | Job-seeker ✓, Other-cities ✓, Free-intent ✓, Competitor schools ✓, Religious-only ✓ |
| Search Partners | ⚠️ WARNING | `targetSearchNetwork=true` (Search Partners ON). For a Year-1 brand-build campaign, **turn OFF**. Search Partners typically have 30%+ lower CVR and you can't see which partner. |
| Display Network on Search campaign | ✅ PASS | `targetContentNetwork=false` (correct). |
| Broad Match without Smart Bidding | ⚠️ WARNING | 1 enabled BROAD keyword (`international kindergarten lahore`) on Manual CPC. Per Google's own guidance, BROAD without tCPA/Max-Conversions is dangerous. Either pause or migrate bidding (see Settings). |
| Brand vs non-brand separation | ❌ FAIL | Single campaign mixing branded ("london international edu sys"-adjacent), competitor ("british school"), generic ("school near me"), and locale ("kindergarten lahore"). Brand should be its own campaign with its own budget — pure-brand searchers convert 3–5× and shouldn't compete with cold queries for budget. |

---

## Account Structure (15%)

- **1 campaign, 1 ad group, 1 RSA, 28 keywords (17 enabled)** — single-bucket structure.
- For a school with distinct intents, this should split. Recommended structure:
  - `LIES_Brand` — `[london international education]`, `[lies lahore]`, `[mir's vision]`, `[hamid mir school]` (the legacy hook). EXACT only. Tiny budget.
  - `LIES_Cambridge_Search` — `[cambridge school lahore]`, `[igcse school lahore]`, `[o level school lahore]`. EXACT + PHRASE.
  - `LIES_LocalIntent` — `[school near ideal park]`, `[english medium school lahore]`, `[private school admission lahore]`. PHRASE.
  - `LIES_Differentiator` — `[robotics school lahore]`, `[ai school lahore]`, US-coding terms. PHRASE.
  - `LIES_Competitor_Conquest` (only if you want to bid on Beaconhouse/LGS — currently you're (correctly) negativing them. Keep it that way until you have a >Rs 50K/day budget.)

Five themed ad groups means 5 RSAs, each with copy that matches the keyword theme — far better Quality Score than one ad shown to everyone.

---

## Keywords (15%)

- **28 total · 17 enabled · 11 paused** (10 BROAD, 16 PHRASE, 2 EXACT enabled+paused mix).
- **Quality Score available for 1 keyword only:** `[cambridge school lahore]` QS=7 — Above-Avg expected CTR ✅, Above-Avg ad relevance ✅, **Below-Avg landing page experience ⚠️**.
  - Landing page = `https://londoneducation.pk/enroll.html`. The site uses lazy-loaded hero video and aggressive optimization (per recent commits) — Google's LP score is real-user CrUX-based and can lag by 28 days. Worth running PageSpeed Insights on the enroll page.
- The 7 paused BROAD generics (`international school`, `quality education`, `school near me`, `american schools`, etc.) — leave paused. They're broader than your intent.
- **Cannibalization risk:** `[cambridge school lahore]` (EXACT) and `cambridge school in lahore` (PHRASE) and `cambridge pathway school lahore` (PHRASE) all match the same intent. Google's match logic prefers the closer match, but bid against yourself = wasted auction overhead. Pick EXACT-only for the head term.

---

## Ads (15%)

**RSA Strength: EXCELLENT ✅** — best you can get.

- **15 headlines (max 15)** ✅ — well above the ≥8 audit threshold.
- **4 descriptions** — at the minimum. Google allows 4. Acceptable, but no room for performance-based winnowing. Consider this fine for now.
- **No pinned headlines/descriptions** ✅ — full RSA flexibility (correct for a new campaign).
- **No display path (Path1/Path2 unset)** ⚠️ — quick win. Add `Path1=Admissions`, `Path2=Lahore` (or `/Cambridge-School/Lahore`). Display URL becomes `londoneducation.pk/Admissions/Lahore` — improves CTR ~5–8%.
- **Final URL:** `enroll.html` ✅ — message-match aligned (admissions intent).

### ⚠️ Brochure-claim copy audit
Per CLAUDE.md, the brochure overstates the offering. Cross-checking ad copy:

| Headline / desc | Claim | Reality | Verdict |
|---|---|---|---|
| "Robotics & AI from Age 4" | Robotics from Pre-Nursery | ✅ Real | OK |
| "US Coding Certs at KG Level" | US-certified coding cert | ✅ Real (per brochure) | OK |
| "AI Study Buddy" | Prof Mir bot | ✅ Real | OK |
| "25+ sports & activities" | 25+ sports | ⚠️ Brochure incl. swimming pool which doesn't exist | Reword: drop "25+" or itemize what IS real |
| "Cambridge Pathway Registered" | Cambridge affiliation | ✅ Real (LAPS) | OK |
| "Pakistan's most advanced" (desc) | Brochure claim | ✅ Allowed per brochure language | OK |

No copy currently mentions "swimming" or "Three Foreign Languages" — ✅ aligned with the canonical correction in your memory.

---

## Settings (10%)

| Check | Status | Note |
|---|---|---|
| Bidding strategy | ⚠️ WARNING | `MANUAL_CPC` at \$0.18. Acceptable for the first 2–3 weeks (cap learning waste), but you should migrate to **Maximize Conversions** (no tCPA) once you have ≥15 conversions in 30 days, then **tCPA** once you have ≥30. Manual CPC + Broad/Phrase = the worst combination per Google's own guidance. |
| Budget | ℹ️ INFO | \$10/day (≈ Rs 2,800/day). Healthy for testing 1 ad group; well below your Meta benchmark. Don't scale until blockers 1–4 are fixed. |
| Network: Google Search | ✅ PASS | ON |
| Network: Search Partners | ⚠️ WARNING | ON — turn OFF for new accounts. |
| Network: Display | ✅ PASS | OFF (correct) |
| Languages | ✅ PASS | English (1000) + Urdu (1041) — correct for Lahore. |
| Devices | ℹ️ INFO | All 3 device types enabled (no negative bids). Default. Revisit after 30d of data. |
| Locations | ⚠️ WARNING | PROXIMITY 10km @ Johar Town. Re-center on campus + widen — see blocker #1 |
| Auto-tagging | ✅ PASS | Enabled |
| Lead Form extension | ✅ PASS | Lead form asset attached at campaign level — direct in-Google lead capture (no website click required). Good. |
| Sitelinks | ✅ PASS | 7 sitelinks attached (≥4 threshold met). One ("Academics Information") has no description — fill in. |
| Callouts | ⚠️ WARNING | Only 4 callouts (minimum). Add 4–6 more for a Year-1 trust push: "Cambridge Pathway", "AI Study Buddy", "Founded 2025", "Near Ideal Park", "Book a Campus Tour", "WhatsApp Us". |
| Structured snippet | ⚠️ WARNING | Only 1 — add a second (e.g., header "Courses" or "Programs"). |
| Call extension | ✅ PASS | 1 attached. Verify number = `0301-0499777` and that call conversions are set as Primary. |
| Image extensions | ✅ PASS | 6 image assets uploaded (logo + building-day + 4 more). |
| Business name + logo | ✅ PASS | Both attached (Year-1 brand-build essential). |

---

## Quick Wins (Do These Today, In Order)

1. **🔴 DECIDE: rebuild account in Asia/Karachi + PKR**, or commit to USD/Phoenix for the long haul. The earlier you decide, the cheaper. (Recommend rebuild.)
2. **🔴 Convert 31 campaign-level negatives from BROAD → EXACT/PHRASE.** Mirror the shared list's pattern.
3. **🟡 Re-center proximity** on campus (≈ 31.522, 74.357) and widen to 15–20km to capture DHA/Bahria feeders.
4. **🟡 Turn OFF Search Partners.**
5. **🟡 Add Path1/Path2** to the RSA: `/Admissions/Cambridge-Lahore`.
6. **🟡 Add 4–6 more callouts.** Easy CTR lift.
7. **🟡 Set "Lead form - Submit" conversion** to 30-day click window + Primary, OR mark "Click to call" as Include-in-Conversions=true (don't double-count — pick one as the lead-form proxy and one as the call proxy).
8. **🟢 Activate Enhanced Conversions for Leads** in the UI (Tools → Conversions). Hashed email + phone lift.
9. **🟢 Plan offline conversion import** so Google sees actual enrollments, not just form submits.
10. **🟢 Run PageSpeed Insights on `/enroll.html`** — your one keyword with QS data shows Below-Avg landing-page score. Recent commits aggressively optimized hero video, so this may already be improving in CrUX.

---

## What I Could NOT Evaluate (insufficient data — revisit at Day 30)

- CTR / CVR / CPC vs benchmarks (5 impressions, 0 clicks total)
- QS distribution (only 1 keyword has QS yet)
- Search Terms Report quality (3 search terms, all relevant — too small to draw negatives from)
- Impression-share trends, budget-lost vs rank-lost split (insufficient samples)
- Ad-strength evolution (RSA needs 2+ weeks to label headlines/descriptions Best/Good/Low)
- Device performance and bid adjustments
- Conversion volume vs target

**Re-run this audit in 14 days** (≥Rs 28K spend, ≥150 clicks) for a true performance audit with the full 80-check scoring.

---

## Data Pulled From Google Ads API (v23, via Composio)

- Customer settings, campaign config, ad group, RSA, 28 keywords, 3 conversion actions, 48 campaign criteria (incl. 31 negatives), 1 shared negative set (69 members), 54 assets, 16 campaign asset attachments
- 7-day metrics: 5 impressions, 0 clicks, \$0 cost, 50% impression share (50% rank-lost — manual CPC under-bidding)
- 7-day search-term report: 3 unique terms, all relevant
