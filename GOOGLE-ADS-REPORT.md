# Google Ads Audit & Launch Plan — London International Education System

**Account:** 643-450-3242 (`6434503242`)
**Auth user:** a.hazarvi1020@gmail.com
**Audited:** 2026-04-26
**Path chosen:** B — keep existing account, optimize Campaign #1 for Lahore

---

## Account state at time of audit

| Setting | Value | Status |
|---|---|---|
| Currency | USD | ⚠️ Locked. Convert to PKR mentally (1 USD ≈ 280 PKR). Reports forever in $ |
| Time zone | America/Phoenix | ⚠️ Locked. ~12hr off Lahore. Dayparting and report timestamps will be skewed |
| Auto-tagging | ON | ✅ |
| Manager account | No | OK |
| Test account | No | OK — this is real spend |

## Campaign #1 — pre-audit state

| Item | Value |
|---|---|
| Status | ENABLED |
| Type | Search-only (Display OFF, Partners ON) |
| Bidding | Maximize Conversions (no tCPA) |
| Budget | $5/day (~PKR 1,400/day, ~PKR 42K/month) |
| Geo | 10km radius around campus, PRESENCE_OR_INTEREST |
| Ad group | "Ad group 1" — 28 keywords mixed Broad/Phrase/Exact |
| Ads | 1 RSA, 15 headlines, 4 descriptions, lands on `/enroll.html` |
| Negative keywords | **NONE** |
| Conversion action | "Enrollment Form Submission" — primary, lead form, data-driven, 90-day window — wired to gtag `AW-18119617331/Cg6ZCOqvwqIcELPWjcBD` ✅ |
| Last 30 days | **0 imps / 0 clicks / $0 spend / 0 conversions** — campaign has never served |

## Conversion tracking — verified

The site's gtag conversion (`AW-18119617331/Cg6ZCOqvwqIcELPWjcBD`) matches the API's enrollment conversion action. ✅
- Category: `SUBMIT_LEAD_FORM` ✅
- Counting: ONE_PER_CLICK ✅
- Attribution: data-driven ✅
- Click-through window: 90 days ✅
- Primary for goal: yes ✅

---

## ✅ All launch-readiness changes applied (verified live via GAQL — 2026-04-26)

| # | Change | State | Verified |
|---|---|---|---|
| 1 | Geo targeting → **PRESENCE only** (positive + negative) | live | API |
| 2 | Daily budget → **$10/day** (was $5) | live | API |
| 3 | Bidding strategy → **Manual CPC**, Enhanced CPC OFF | live | API |
| 4 | Ad-group default max CPC → **$0.18** (~PKR 50) | live | API |
| 5 | 4 bad keywords → PAUSED (DHA, kindergarten-Broad, Montessori, school-with-AI) | live | API |
| 6 | "Master Negatives — School" shared list (69 negatives) → attached to Campaign #1 | live | API |

## Original UI checklist (now complete — kept for reference)

Composio's Google Ads MCP doesn't expose mutate APIs for: ad-group keyword criterion (pause), shared sets (negative lists), campaign budget, or ad-group CPC bid. The bidding-strategy update accepted but didn't take effect (struct-field validation gap). Do these in the UI:

### 1. Switch bidding to **Manual CPC** (5 min)

Path: **Campaign #1 → Settings → Bidding → Change bid strategy**

- Choose **"Manual CPC"** (not Enhanced CPC — leave the "Help increase conversions" box **unchecked**)
- Why: Maximize Conversions needs ~30 conversions in trailing 30 days to learn. With zero history, it'll spend ineffectively. Manual CPC for 2–4 weeks → gather click + conversion baseline → then promote to Maximize Conversions or tCPA.

### 2. Increase daily budget to **$10/day** (1 min)

Path: **Campaign #1 → Settings → Budget**

- Change from $5 → **$10/day** (~PKR 2,800/day, ~PKR 84K/month)
- Why: Pakistani CPCs for these keywords are ~PKR 30–80. $10/day ≈ ~25–60 clicks/day, enough to feed bidding learning + show meaningful daily data.
- Note: this is half your Meta spend (PKR 12K/day). Reasonable as a Google "test" budget alongside your primary Meta channel.

### 3. Set ad-group default Max CPC to **$0.18** (≈ PKR 50) (1 min)

Path: **Campaign #1 → Ad group 1 → Default max. CPC**

- Set to **$0.18**
- Why: caps any single click at PKR 50; with $10/day, max ~55 clicks/day if every click hit cap.

### 4. Pause 4 bad keywords (2 min)

Path: **Campaign #1 → Ad group 1 → Keywords → Status: ENABLED**

Pause these (set status = PAUSED):

| Keyword | Match type | Reason |
|---|---|---|
| `kindergarten dha lahore` | Broad | DHA is ~15km from campus, wrong neighborhood |
| `kindergarten in lahore` | Broad | Too broad, will eat budget on tire-kickers |
| `montessori school lahore` | Phrase | School is Cambridge, not Montessori — claim mismatch + wrong intent |
| `school with ai lahore` | Phrase | Zero search volume per Pakistan market |

### 5. Add account-level negative keyword list (15 min) — **highest priority**

Path: **Tools → Shared library → Negative keyword lists → "+" → Create new list**

- Name: **"Master Negatives — School"**
- Apply to: Campaign #1 (and all future campaigns)

Paste this list as-is. Format: `[exact match]` and `"phrase match"`. Do **NOT** add as Broad.

```
Job-seeker:
[teacher jobs]
[teaching jobs]
[jobs in school]
[salary]
[employment]
"vacancy"
"recruitment"
"career opportunities"
"hiring"

Free-intent:
[free school]
[scholarship]
[financial aid]
[free admission]
"free education"
"need-based aid"

Wrong-product:
[university]
[college admission]
[mba]
[medical school]
[law school]
[masters degree]
[bachelors degree]
[matric]
[fbise]
[bise]
[federal board]
[intermediate]
[fsc]

Wrong-format:
[online school]
[homeschool]
[home schooling]
[distance learning]
[correspondence school]
"online classes"

Competitor brands (so we don't trigger on competitor brand searches):
[lgs]
[lahore grammar]
[lahore grammar school]
[beaconhouse]
[aitchison]
[aitchison college]
[the city school]
[city school]
[roots millennium]
[headstart school]
[generations school]
"educators school"

Wrong-meaning ("public" = government in PK):
"public school"
"govt school"
"government school"

Wrong city:
[karachi]
[islamabad]
[rawalpindi]
[multan]
[faisalabad]
[peshawar]
[quetta]
[gujranwala]
[sialkot]
[hyderabad pakistan]
[india]
[delhi]
[mumbai]
[uk schools]
[london uk]

Informational:
"how to"
"what is"
"definition of"
"meaning of"
```

After adding, **also add `[london]` as exact-match negative** to prevent searches for "London the city" matching "London School" via Broad keywords.

---

## Recommended structure for next 2 weeks (after launch)

Once Manual CPC is on and the campaign has served for ~7 days, split "Ad group 1" into 2 themed ad groups for better Quality Score and ad relevance:

**Ad group A — Cambridge / IGCSE intent** (move keywords):
- `[cambridge school lahore]`
- `[best cambridge school lahore]`
- `"cambridge school in lahore"`
- `"cambridge pathway school lahore"`
- `"british school lahore"`
- `"igcse school lahore"`
- `"o level school lahore"`
- `"o levels school lahore"`
- `"english medium school lahore"`
- `"private school admission lahore"`

**Ad group B — Early years / location intent** (move keywords):
- `"international school lahore"`
- `"pre nursery school lahore"`
- `"kindergarten lahore"`
- `[international kindergarten lahore]`
- `"school near ideal park"`
- `"school near ideal park township"`
- `"robotics school lahore"`

Each ad group should have its own RSA tailored to the theme (Cambridge/IGCSE for A; early-years/local for B).

---

## Monitoring plan — first 14 days

Check daily for the first 7 days, then every 2–3 days:

| Metric | Target | Action if missed |
|---|---|---|
| Search Terms Report — irrelevant queries | <10% of clicks | Add new negatives weekly |
| CTR | ≥3% by day 7 | Refresh weakest headlines |
| Avg. CPC | <$0.18 (PKR 50) | If higher, raise max-CPC carefully or pause expensive keywords |
| Daily impression share | >40% | If low, raise budget or improve Quality Score |
| Conversions | ≥1 by day 7, ≥5 by day 14 | If 0 by day 14, debug landing page or audience quality |
| Quality Score (when avail) | ≥6 | Tighten ad-group themes, improve ad-headline relevance |

**At day 14**, if you have ≥15 conversions cumulative, switch from Manual CPC → **Maximize Conversions** (no target). At day 30, if ≥30 conversions, set a **Target CPA** at ~120% of your achieved CPA.

---

## Open questions / followups

1. **Early Bird PKR 18,000/mo promo** — confirmed still active by you, ad headline preserved. **Set a calendar reminder for when the first 100 admissions fill**: at that point, the "Early Bird: From PKR 18,000/mo" headline must be removed or it becomes a false claim and Google can disapprove the ad.
2. **Account email** — `a.hazarvi1020@gmail.com` (personal Gmail). Long-term move ownership to `info@londoneducation.pk` via Google Workspace, add yourself as manager. Not blocking launch.
3. **Campaign name** — "Campaign #1" is fine for now; rename to something like `LHR-Search-CambridgeAdmissions` once you have a 2nd campaign for clarity.

---

## Health Score (with caveat)

The 80-check audit framework requires ≥30 days of search-term data. Campaign #1 has zero historical data, so most checks are non-evaluable. Provisional score on **launch readiness** rather than performance:

```
Launch Readiness Score: 52/100

Conversion Tracking:    95/100  ██████████  (gtag wired, schema correct)
Wasted Spend Setup:     30/100  ███░░░░░░░  (no negatives — fix above)
Account Structure:      55/100  █████░░░░░  (1 ad group, needs split — see plan)
Keywords:               60/100  ██████░░░░  (decent list, 4 to pause)
Ads:                    75/100  ████████░░  (1 RSA, 15 headlines, good copy)
Settings:               20/100  ██░░░░░░░░  (USD/Phoenix, $5 budget, Max Conv on cold acct)
```

**After UI fixes above:** ~78/100 launch-ready. After 14 days of optimization data: re-audit.

**Re-scored after all fixes applied (2026-04-26):**

```
Launch Readiness Score: 80/100

Conversion Tracking:    95/100  ██████████  (gtag wired, schema correct)
Wasted Spend Setup:     85/100  █████████░  (69 negatives + 4 bad kw paused)
Account Structure:      60/100  ██████░░░░  (1 ad group — split into 2 themed groups at day 14)
Keywords:               80/100  ████████░░  (cleaned set, $0.18 cap, all Phrase/Exact intent-tight)
Ads:                    75/100  ████████░░  (1 RSA, 15 headlines)
Settings:               75/100  ████████░░  (USD/Phoenix locked, $10 budget, Manual CPC, presence-only)
```

The campaign is now safe to serve. Watch the Search Terms Report daily for the first week and add new negatives as garbage queries appear.
