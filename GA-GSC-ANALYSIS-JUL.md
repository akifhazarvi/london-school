# London School — GSC + GA4 Refresh (Jul 2026)

**Window:** 28 days, 2026-06-07 → 2026-07-04 · Compared to the May 14 baseline ([GA-GSC-ANALYSIS.md](GA-GSC-ANALYSIS.md)).
**Property:** GA4 `properties/534545642` · GSC `sc-domain:londoneducation.pk`
**Pulled via Composio** (GSC `SEARCH_ANALYTICS_QUERY` + GA4 `BATCH_RUN_REPORTS`).

---

## 1. Headline: organic clicks doubled — but it was almost all summer camp, which is now over

| Metric | May 14 (28d) | Jul 4 (28d) | Note |
|---|---:|---:|---|
| GSC clicks | 226 | **150** | Query-level total |
| GSC impressions | 4,294 | **3,472** | |
| GSC CTR | 5.3% | 4.3% | Dragged down by high-impression summer terms |
| GSC avg position | 4.4 | ~6 | More non-brand terms now surface (lower avg) |

**The catch (this is the whole story):**

| Cluster | Clicks | Impressions | Share of clicks |
|---|---:|---:|---:|
| **Summer camp (seasonal)** | **100** | 2,346 | **67%** |
| Everything evergreen | 50 | 1,126 | 33% |

Two-thirds of the last month's organic clicks came from **summer-camp queries** — a season that **ends now (July)**. `/blog/summer-camp-lahore-2026` alone pulled **236 clicks / 6,388 impressions**, ranking it the #1 page site-wide by a wide margin. That traffic is about to evaporate.

**Read it this way:** strip summer camp out, and evergreen organic is running at ~**50 clicks / 28d** — and almost all of that is *brand* ("london school", "london international school", "london school lahore"). Non-brand evergreen discovery is still near zero, exactly the same gap the May report flagged. The summer post proved the site *can* rank a well-targeted local query on page 1 (it hit pos ~5-6 on competitive "summer camp lahore" terms). We now need to point that same capability at year-round admissions demand.

---

## 2. What ranked (top pages, 28d)

| Page | Clicks | Impr | CTR | Pos | Verdict |
|---|---:|---:|---:|---:|---|
| /blog/summer-camp-lahore-2026 | 236 | 6,388 | 3.7% | 6.6 | **Seasonal — expiring now** |
| / (home) | 115 | 2,358 | 4.9% | 5.3 | Brand workhorse, healthy |
| /blog/lahore-school-holidays-2026 | 15 | 1,334 | 1.1% | 5.7 | High impressions, weak CTR |
| /enroll | 14 | 969 | 1.4% | 6.5 | |
| /legacy/prof-waris-mir | 12 | 1,383 | 0.9% | 5.0 | **"waris mir" 353 imp / 1 click — still the biggest miss** |
| /ai-robotics | 9 | 417 | 2.2% | 6.6 | Now getting impressions (was zero in May) |
| /blog/cambridge-schools-in-lahore | 7 | 351 | 2.0% | 9.7 | Page 1 edge |
| /blog/what-is-federal-board-fbise | 1 | 1,110 | 0.1% | 7.2 | 1,110 impressions, 1 click — title not earning it |
| /blog/cambridge-vs-matric-vs-federal-board-lahore | 2 | 338 | 0.6% | 7.7 | Same problem as May |

---

## 3. Evergreen opportunities (the ones that survive summer)

**"almost page 1" high-impression CTR misses — fix the SERP snippet, not the ranking:**
- **`waris mir`** — 353 impressions, 1 click, **pos 2.6**. Single biggest wasted query, same as May. We rank #2-3 but nobody clicks — the snippet reads as a school, they want the biography. Fix `/legacy/prof-waris-mir` title + meta to answer the biographical query first.
- **`what-is-federal-board-fbise`** — 1,110 impressions, 0.1% CTR, pos 7.2. Massive impression volume, title isn't earning clicks.
- **`lahore-school-holidays-2026`** — 1,334 impressions, 1.1% CTR. Evergreen-ish (people search school holidays year-round). Snippet + freshness update.
- **`cambridge schools in lahore`** — pos 9.2, only 12 impressions but this is *exactly* the buyer-intent, year-round query we want. Needs to move from page-1-edge to top 5.

**Brand is locked** — "london school lahore" pos 1.0 / 22% CTR, "london international school lahore" pos 1.0. Nothing to do; the rebrand to "London International School" is indexing fine.

**Hamid Mir legacy** — "hamid mir school" pos 1.8, "hamid mir family background" pos 1.0. Tiny volume but we own it. The `"teacher" "journalist" "director"` and `"hilal-e-imtiaz" "father" "university"` queries (people describing Waris Mir without his name) show at pos 5-11 — a biographical-content opportunity.

---

## 4. GA4 (28d)

| Channel | Sessions | Eng% | Dur |
|---|---:|---:|---:|
| Organic Search | 457 | 58% | 164s |
| Direct | 276 | 33% | 102s |
| Organic Social | 149 | 58% | 60s |
| Referral | 32 | 59% | 133s |
| **AI Assistant** | **6** | 100% | **427s** |

- **Organic Search is now the #1 channel** (457 sessions, up from 254 in May) — but that's the summer surge; expect it to fall back.
- **"AI Assistant" is now a named GA4 channel** (ChatGPT/Perplexity/etc.) — 6 sessions, 100% engagement, **7-minute** average. Tiny but the highest-quality traffic on the site. GEO is working.
- **Paid Search has dropped out of the top channels** — worth confirming Google Ads status separately (the account may be paused).

**Lead funnel:** 751 users → 22 form_start → **10 generate_lead**. WhatsApp/phone/email clicks ~400 each (185 users) — the tap-to-WhatsApp behaviour is still the real conversion, consistent with May.

---

## 5. Priorities (post-summer)

1. **Replace the expiring summer traffic with year-round admissions content.** The summer post proved we can rank local Lahore queries. Point that at **"cambridge school lahore" / "best school in township lahore" / "school admission lahore 2026-27"** — evergreen buyer intent.
2. **Fix the `waris mir` snippet** (353 imp, pos 2.6, 1 click) — unchanged from May, still the biggest single CTR miss.
3. **Rewrite weak-CTR SERP snippets** on high-impression pages: `what-is-federal-board-fbise` (1,110 imp), `lahore-school-holidays-2026` (1,334 imp), `cambridge-vs-matric-vs-federal-board-lahore` (338 imp).
4. **Don't delete the summer-camp post** — it'll rank again next season. Update it to point to year-round admissions in the off-season so its authority isn't wasted.
5. **Lean into GEO** — AI Assistant traffic is the best-engaged channel. Passage-level citability on flagship pages (AI & Robotics, Cambridge Pathway).

*Generated 2026-07-05 via Composio.*
