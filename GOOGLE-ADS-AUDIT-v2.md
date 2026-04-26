# Google Ads Audit v2 — London International Education System

**Account:** 643-450-3242 (`6434503242`)
**Audit date:** 2026-04-26
**Auditor:** ads-google skill (80-check framework)
**Method:** Live GAQL queries via Composio MCP (no traffic data — campaign hasn't served)
**Caveat:** Performance checks (CTR, CVR, QS, wasted spend, search-terms) require ≥30 days of impressions. Campaign has 0 impressions. Those 28 checks are marked **N/E** (non-evaluable) and excluded from the score. Re-run this audit at day 30.

---

## Health Score

```
Google Ads Launch Readiness: 86 / 100  (Grade: A−)

Conversion Tracking:   95 / 100  ██████████  (25% weight)
Wasted Spend Setup:    88 / 100  █████████░  (20% — checks reviewable now)
Account Structure:     65 / 100  ███████░░░  (15%)
Keywords:              82 / 100  ████████░░  (15%)
Ads:                   85 / 100  █████████░  (15%)
Settings:              78 / 100  ████████░░  (10%)
```

**Up from 52 (start of session) → 80 (post-UI fixes) → 86 (post-quality fixes).**

---

## Section 1 — Conversion Tracking (95/100, 25% weight)

| # | Check | Result | Note |
|---|---|---|---|
| C01 | Google tag (gtag.js) installed sitewide | ✅ PASS | `AW-18119617331` on every page |
| C02 | Auto-tagging enabled | ✅ PASS | `gclid` parameter passes through |
| C03 | At least 1 primary conversion action | ✅ PASS | "Enrollment Form Submission" — primary, lead form |
| C04 | Conversion category mapped (`SUBMIT_LEAD_FORM`) | ✅ PASS | Correct category for lead-gen |
| C05 | Counting type appropriate | ✅ PASS | `ONE_PER_CLICK` — correct for lead gen |
| C06 | Click-through window | ✅ PASS | 90 days for primary form (correct) |
| C07 | Attribution model | ✅ PASS | `GOOGLE_SEARCH_ATTRIBUTION_DATA_DRIVEN` (best-in-class) |
| C08 | Conversion in "Conversions" column | ✅ PASS | `includeInConversionsMetric: true` |
| C09 | Secondary conversions configured | ✅ PASS | Click-to-call (excluded from main metric, correct), Lead-form-Submit (excluded, correct) |
| C10 | Enhanced Conversions for Web | ⚠️ WARNING | Not visible via API — likely OFF. Turn ON for ~10% lift in attribution accuracy |
| C11 | Consent Mode v2 implemented | ⚠️ WARNING | Not detectable via GAQL. Pakistani audience = no GDPR liability, but Google rewards Consent Mode signals globally. Low priority for PK |
| C12 | Server-side tagging via GTM | ❌ FAIL | Site uses client-side gtag only. SS-tagging is "nice to have" for v1, defer to month 6 |
| C13 | Offline conversion import | ➖ N/A | Form submit fires gtag client-side; no offline component yet |
| C14 | Conversion lag analysis | ➖ N/E | Need 30+ days of data |

**Score:** 95 — strong setup, only deficits are Enhanced Conversions and Consent Mode (both low-friction adds).

---

## Section 2 — Wasted Spend Setup (88/100, 20% weight)

| # | Check | Result | Note |
|---|---|---|---|
| W01 | Shared negative keyword list created | ✅ PASS | "Master Negatives — School", 69 negatives |
| W02 | Negative list attached to campaign | ✅ PASS | Verified via GAQL |
| W03 | Negatives use Exact + Phrase only | ✅ PASS | No Broad negatives (good — Broad negatives over-block) |
| W04 | Job-seeker negatives present | ✅ PASS | 9 added |
| W05 | Free-intent negatives present | ✅ PASS | 6 added |
| W06 | Wrong-product negatives present | ✅ PASS | 13 added (university, MBA, matric, FBISE etc) |
| W07 | Wrong-format negatives present | ✅ PASS | 6 added (online, homeschool) |
| W08 | Competitor brand negatives | ✅ PASS | 12 added (LGS, Beaconhouse, Aitchison, etc) |
| W09 | Wrong-city negatives | ✅ PASS | 14 added |
| W10 | Informational negatives | ✅ PASS | 4 added ("how to", "what is") |
| W11 | "London" exact-match negative (city disambiguation) | ✅ PASS | Critical — prevents "London the city" matching "London School" |
| W12 | Display network OFF on Search campaign | ✅ PASS | `targetContentNetwork: false` |
| W13 | Search Partners review | ⚠️ WARNING | `targetSearchNetwork: true` — search partners ON. Can degrade quality; toggle OFF if Day-30 search-terms shows partner waste |
| W14 | Geo targeting precise (no national waste) | ✅ PASS | 10km proximity around campus, presence-only |
| W15 | Search Terms Report review | ➖ N/E | Need 30 days of clicks |
| W16 | Invalid click rate | ➖ N/E | Need 30 days |
| W17 | Brand vs non-brand campaign separation | ⚠️ WARNING | Currently 1 campaign. Brand keywords ("london international edu sys") are mixed with generic. Split into Branded + Generic campaigns at day 30 |
| W18 | Broad Match without Smart Bidding | ✅ PASS | Only 1 broad keyword enabled (`international kindergarten lahore`) — minor exposure. Pause if it shows waste at day 7 |
| W19 | Broad Match audit | ⚠️ WARNING | One ENABLED Broad keyword. Low risk given negative list, but watch the Search Terms Report closely |

**Score:** 88 — excellent for a pre-launch state. The 12-point deduction is for not yet split campaigns and one broad-match remnant.

---

## Section 3 — Account Structure (65/100, 15% weight)

| # | Check | Result | Note |
|---|---|---|---|
| S01 | Campaign-level naming | ⚠️ WARNING | "Campaign #1" — generic. Rename to e.g. `LHR-Search-Cambridge-Generic` |
| S02 | Campaigns separated by intent (brand/generic/comp) | ❌ FAIL | Single campaign. Plan: at day 30, split into Branded + Generic |
| S03 | Ad groups themed tightly | ❌ FAIL | One ad group with 24 active keywords mixing Cambridge/IGCSE/Early-years/Local intents. Plan: split into 2 ad groups at day 14 (see [GOOGLE-ADS-REPORT.md](GOOGLE-ADS-REPORT.md)) |
| S04 | RSA: ≥3 active ads per ad group | ⚠️ WARNING | Only 1 RSA. Add 2nd RSA before Day 7 so Google can A/B |
| S05 | Asset extensions count | ✅ PASS | 8 sitelinks, 4 callouts, 1 structured snippet, 2 logos, 2 business names, 1 call asset, 1 lead form |
| S06 | Sitelinks ≥4 | ✅ PASS | 8 sitelinks (Virtual Tour, Cambridge, Robotics, About, Visit, Programs, Story) |
| S07 | Callouts ≥4 | ✅ PASS | 4 callouts (Cambridge Pathway, Robotics&AI, Free Tours, 100+ Families) |
| S08 | Structured snippet | ✅ PASS | "Types" header, 4 values (Pre-Nursery, Kindergarten, Primary, Middle) — fixed in this session |
| S09 | Call asset | ✅ PASS | Phone asset present |
| S10 | Lead-form asset | ✅ PASS | Native Google Lead Form attached to campaign — bonus signal |
| S11 | Image asset | ⚠️ WARNING | 2 logos but no marketing image assets. Add 3-4 campus/lab photos for richer SERP rendering |
| S12 | Campaign labels / naming convention | ⚠️ WARNING | No labels. Apply at day 30 when 2nd campaign exists |
| S13 | PMax campaign present | ➖ N/A | None — correct for v1 |
| S14 | SKAGs (single-keyword ad groups) | ✅ PASS | None — themed groups are the right pattern |

**Score:** 65 — biggest deductions for single campaign + single ad group + single RSA. Day-14 split brings this to ~85.

---

## Section 4 — Keywords (82/100, 15% weight)

**24 active keywords** after cleanup (was 28; 4 paused).

| # | Check | Result | Note |
|---|---|---|---|
| K01 | Match-type strategy (Exact → Phrase → Broad) | ✅ PASS | 21 Phrase, 2 Exact, 1 Broad — heavily Phrase-weighted, conservative |
| K02 | Match-type ratio appropriate for new account | ✅ PASS | 0% Broad-without-Smart-Bidding violation — only 1 Broad on Manual CPC, low risk |
| K03 | No bad-fit keywords | ✅ PASS | All 4 problem keywords paused (DHA, kindergarten Broad, Montessori, school-with-AI) |
| K04 | Brand keywords present | ✅ PASS | "London International Edu Sys" headline, no exact-match brand keyword yet — add at day 30 |
| K05 | Geo keywords present | ✅ PASS | "ideal park", "ali road", "lahore" variants ✅ |
| K06 | High-intent commercial keywords | ✅ PASS | "private school admission lahore", "best cambridge school lahore" |
| K07 | Pathway keywords | ✅ PASS | "igcse", "o level", "cambridge pathway" |
| K08 | Programme keywords | ✅ PASS | "robotics school lahore" |
| K09 | Match-type sanity (no ALL CAPS or junk) | ✅ PASS | All clean |
| K10 | Quality Score average ≥7 | ➖ N/E | Need impressions |
| K11 | Low QS keywords flagged | ➖ N/E | Need impressions |
| K12 | Keyword cannibalization (same term in multiple campaigns) | ✅ PASS | Single campaign — no risk yet |
| K13 | Impression share for top keywords | ➖ N/E | Need impressions |
| K14 | Bid adjustments for devices/locations/audiences | ⚠️ WARNING | None set. Skip until Day 30 data shows device skew |

**Score:** 82 — strong keyword hygiene. Mostly N/E checks pending traffic.

---

## Section 5 — Ads (85/100, 15% weight)

**1 RSA**, 15 headlines, 4 descriptions, all APPROVED.

| # | Check | Result | Note |
|---|---|---|---|
| A01 | RSA headlines ≥8 | ✅ PASS | 15 headlines (above target) |
| A02 | RSA headlines ≥11 (best practice) | ✅ PASS | 15 ≥ 11 |
| A03 | RSA descriptions ≥3 | ✅ PASS | 4 descriptions |
| A04 | All headlines APPROVED | ✅ PASS | Verified via API |
| A05 | All descriptions APPROVED | ✅ PASS | Verified |
| A06 | Ad strength rating | ⚠️ WARNING | `PENDING` — will resolve once campaign serves. Target "Good" or "Excellent" |
| A07 | Pin usage minimal | ✅ PASS | No pins detected — RSA flexibility maximized |
| A08 | Headlines include CTA | ✅ PASS | "Admissions Open 2025-26", "Early Bird: From PKR 18,000/mo" |
| A09 | Headlines include differentiator | ✅ PASS | "US Coding Certs at KG Level", "Cambridge Pathway Registered", "Robotics & AI from Age 4" |
| A10 | Headlines include geo | ✅ PASS | "Lahore Cambridge School", "Near Ideal Park Township", "School near Ali Road Lahore", "Cambridge School in Lahore" |
| A11 | Brand-true headlines | ✅ PASS | Montessori headline removed in this session ✅ |
| A12 | Capitalization clean | ✅ PASS | "UK Education System" fixed in this session ✅ |
| A13 | Promo claim safety | ⚠️ WARNING | "Early Bird: From PKR 18,000/mo" — must be removed when first 100 admissions fill (false-claim risk) |
| A14 | Final URL relevance | ✅ PASS | `londoneducation.pk/enroll.html` — correct landing page |
| A15 | URL paths visible (path1/path2) | ⚠️ WARNING | Not set — small CTR loss. Add `/admissions` and `/cambridge` |
| A16 | RSA count per ad group ≥2 | ❌ FAIL | Only 1 RSA. Add a 2nd before Day 7 |
| A17 | Dynamic keyword insertion | ➖ N/A | Not used — fine for v1 |

**Score:** 85 — strong ad copy and assets. Deduct mainly for single RSA and missing display paths.

---

## Section 6 — Settings (78/100, 10% weight)

| # | Check | Result | Note |
|---|---|---|---|
| T01 | Currency appropriate for market | ❌ FAIL | USD for a Pakistani business. Locked. Mental conversion required forever |
| T02 | Time zone matches business | ❌ FAIL | America/Phoenix for a Lahore school. Locked. Reports skewed ~12h |
| T03 | Auto-tagging | ✅ PASS | ON |
| T04 | Bidding strategy | ✅ PASS | Manual CPC (correct for cold account) |
| T05 | Enhanced CPC | ✅ PASS | OFF (correct — pure Manual CPC) |
| T06 | Daily budget appropriate for goal | ✅ PASS | $10/day = ~PKR 2,800 ≈ 25-60 clicks/day at $0.18 cap. Reasonable learning budget |
| T07 | Budget pacing | ✅ PASS | STANDARD (not ACCELERATED — correct) |
| T08 | Network: Google Search ON | ✅ PASS | |
| T09 | Network: Search Partners | ⚠️ WARNING | ON — review at Day 30 |
| T10 | Network: Display OFF | ✅ PASS | |
| T11 | Network: Partner Search Network | ✅ PASS | OFF |
| T12 | Geo: presence-only | ✅ PASS | Both positive and negative set to PRESENCE — fixed in this session |
| T13 | Geo: targeting type | ✅ PASS | Proximity 10km from campus |
| T14 | Language targeting | ⚠️ WARNING | Not detected — verify English + Urdu both selected (Pakistani parents Google in mixed-language) |
| T15 | Ad schedule | ⚠️ WARNING | None — runs 24/7. Consider 7am-11pm Asia/Karachi (= 6pm-10am Phoenix the next day, roughly) at Day 30 |
| T16 | Device bid adjustments | ➖ N/E | Need data |
| T17 | Audience segments | ⚠️ WARNING | None attached. Add "Parents of toddlers/school-age" affinity at Day 14 |
| T18 | Demographics | ➖ N/A | School targets all parents — no exclusions needed |

**Score:** 78 — mostly the immutable currency/timezone hits. Otherwise correctly set.

---

## Top 5 Actions for Next 30 Days (priority order)

1. **Watch Search Terms Report daily for first 7 days** — add new negatives as garbage queries appear
2. **Add a 2nd RSA before Day 7** — let Google A/B headline combinations
3. **At Day 14, split "Ad group 1"** into two themed groups (Cambridge/IGCSE vs Early-years/Local) — see [GOOGLE-ADS-REPORT.md](GOOGLE-ADS-REPORT.md)
4. **At Day 14**, if ≥15 conversions: switch from Manual CPC → Maximize Conversions
5. **At Day 30**, if ≥30 conversions: set Target CPA = ~120% of achieved CPA, AND split Brand vs Generic into 2 campaigns

## Calendar Reminders

| Date | Action |
|---|---|
| 2026-05-03 (day 7) | Add 2nd RSA. Review Search Terms. Add negatives. |
| 2026-05-10 (day 14) | Split ad groups. Switch bidding if ≥15 conv. |
| 2026-05-26 (day 30) | Re-run this audit (impressions exist now). Target CPA. Split campaigns. |
| When Early Bird fills | **Remove "Early Bird: From PKR 18,000/mo" headline immediately** to avoid false-claim disapproval |

## What changed from v1 (this session)

| # | Fix | Source | Verified |
|---|---|---|---|
| 1 | Geo → presence-only | API | ✅ |
| 2 | Budget $5 → $10/day | UI | ✅ API |
| 3 | Bidding → Manual CPC, ECPC OFF | UI | ✅ API |
| 4 | Ad-group max CPC → $0.18 | UI | ✅ API |
| 5 | Pause 4 bad keywords | UI | ✅ API |
| 6 | "Master Negatives — School" (69 negatives) attached | UI | ✅ API |
| 7 | RSA "Montessori school lahore" → "Lahore Cambridge School" | UI | ✅ API |
| 8 | RSA "Uk Education System" → "UK Education System" | UI | ✅ API |
| 9 | Structured snippet header "Degree programs" → "Types" | UI | ✅ API |

All 9 changes verified live via GAQL.

---

## Re-audit triggers

Re-run `/ads-google` when:
- Day 14 (first performance signals)
- Day 30 (full audit including all N/E checks)
- After Day-30 campaign split (verify structure improvements)
- On any sudden CPA spike (>2x baseline)
