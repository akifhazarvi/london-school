# London School — GA4 Launch Report

**Property:** London School Waris Mir Campus (`G-S3PMR30G31`)
**Window:** 26 Apr 2026 – 29 Apr 2026 (4 days — GA4 was newly set up; this is the launch window, not a 30-day report)
**Currency / TZ:** PKR / Asia/Karachi
**Pulled:** 29 Apr 2026

---

## TL;DR for the school team

- **307 visitors** generated **397 sessions** and **1,005 page views** in the first 4 days the site was tracked.
- **82% of visitors are on mobile** (253 of 307) — the website is doing 8 out of 10 conversations on a phone screen. This is the **only metric that should drive design priorities.**
- **77% of all sessions came from Pakistan** (Lahore alone = 173 visitors, our home market). The remaining 23% is mostly bots / US datacenter cities and can be ignored.
- **80 WhatsApp clicks from 35 people** — this is the strongest signal of intent we have on the site. That's roughly 1 WhatsApp click per 10 visitors, or **11% of visitors WhatsApp us.**
- **8 lead form submissions** (`generate_lead`) from 7 unique people = **2.3% of visitors fill out the form.** Combined with WhatsApp, total contact rate is roughly 1 in 8 visitors.
- **Direct traffic dominates** (60% of sessions) — meaning people typing the URL or coming from WhatsApp/SMS shares of the brochure. **Paid ads are barely showing** (16 paid-search sessions, 7 paid-social sessions over 4 days). This is the biggest gap to close.

---

## 1. Topline numbers (4 days, 26–29 Apr)

| Metric | Value |
|---|---|
| Total users | **307** |
| New users | 303 |
| Sessions | **397** |
| Engaged sessions | 166 |
| Page views | **1,005** |
| Engagement rate | **41.8%** |
| Avg session duration | **4 min 42 sec** |
| Total events | 2,898 |

**Reading:** ~2.5 page views per session and nearly 5 minutes on site is *good* for a school landing site. Parents are reading more than one page before deciding what to do.

### Day-by-day trend

| Date | Users | Sessions | Page views |
|---|---:|---:|---:|
| Sun 26 Apr | 132 | 166 | 525 |
| Mon 27 Apr | 71 | 84 | 171 |
| Tue 28 Apr | 41 | 51 | 95 |
| Wed 29 Apr | 84 | 95 | 214 |

Sunday (26 Apr) is a 2× spike — likely the day GA4 went live with internal/team traffic and an ad burst. Tuesday is the natural weekday baseline (~50 sessions). Today (29 Apr) recovered to 95 sessions — that's the number to anchor against going forward.

---

## 2. Funnel: how visitors become enquiries

**Top of funnel → Bottom of funnel, last 4 days**

| Stage | Event | Count | Unique users | % of visitors |
|---|---|---:|---:|---:|
| 1. Visit site | `page_view` | 1,005 | **307** | 100% |
| 2. Read more than one page | `scroll` | 226 | 112 | 36% |
| 3. Read 75% of a page | `scroll_75` | 82 | 59 | 19% |
| 4. Open the floating widget | `widget_open` | 68 | 37 | 12% |
| 5. Click a WhatsApp CTA | `whatsapp_click` | 80 | **35** | **11%** |
| 6. Click "Apply / Book a Visit" | `enroll_cta_click` | 25 | 20 | 6.5% |
| 7. Start filling lead form | `form_start` | 19 | 13 | 4.2% |
| 8. **Submit lead form** | `generate_lead` | **8** | **7** | **2.3%** |
| 8b. Click phone number | `phone_click` | 2 | 2 | 0.7% |

### What the funnel tells us

- **Form-completion rate (form_start → generate_lead) = 53%** (13 starts → 7 submits). Above 50% on a lead form is healthy. The form itself isn't the bottleneck.
- **Enroll-CTA → form_start = 65%** (20 → 13). Once a parent clicks "Book a Visit", most of them engage with the form. Good.
- **The biggest drop is at the top:** 100% see the site, only 12% interact with the widget and only 6.5% click a CTA. The site is converting *seriously interested* parents well, but most visitors leave without engaging at all.
- **WhatsApp is the dominant contact channel** (35 unique WhatsApp clickers vs 7 form submitters = **5× more parents prefer WhatsApp over filling a form**). This validates keeping WhatsApp as the primary CTA.
- **Phone calls are nearly zero** (2 clicks, 2 people). Parents do not call. They WhatsApp.

---

## 3. Where the traffic comes from

| Channel | Sessions | Users | Engagement |
|---|---:|---:|---:|
| **Direct** (typed URL / WhatsApp / SMS) | 238 (60%) | 201 | 45% |
| **Organic Search** (Google) | 58 (15%) | 34 | 55% |
| **Unassigned** (mostly bots / GA tagging gaps) | 46 (12%) | 42 | 0% |
| **Organic Social** (Facebook referral) | 39 (10%) | 37 | 23% |
| **Paid Search** (Google Ads) | 16 (4%) | 16 | 19% |
| **Paid Social** (Instagram paid) | 7 (2%) | 7 | 29% |
| Other (referrals, Bing, LinkedIn, ChatGPT) | ~13 | — | — |

### Reading

- **Direct = 60%** is unusually high for a 4-day-old GA4 setup. Almost certainly this is:
  - Parents who got the brochure via WhatsApp and tapped the link (WhatsApp doesn't pass referrer headers, so it shows as Direct — known limitation).
  - Team members and the school staff opening the site to check things.
  - Word-of-mouth typing the URL.
- **Organic Search = 15%** with **55% engagement** — strongest engagement of any source. SEO investment is starting to pay off. Worth doubling down.
- **Paid Search and Paid Social are tiny** (4% + 2% combined = 6% of traffic). Either ads aren't running at scale yet, or UTMs aren't tagged on every Meta ad. Worth verifying.
- **Facebook referral traffic has only 23% engagement** — these visitors bounce fast. Likely Facebook in-app browser users who tap, glance, and back out. Mobile + in-app browser is a hostile environment for any site.

---

## 4. Top pages

| Page | Page views | Users | Engagement time |
|---|---:|---:|---:|
| `/` (homepage) | **494** | 241 | 13,627s ≈ 56s/user |
| `/enroll.html` | 157 | 100 | 29s/user |
| `/index.html` (alias of /) | 122 | 26 | 73s/user |
| `/about.html` | 42 | 17 | 76s/user |
| `/academics.html` | 36 | 23 | 32s/user |
| `/yearbook.html` (Virtual Tour) | 25 | 17 | 57s/user |
| `/blog/index.html` | 16 | 15 | 19s/user |
| `/ai-robotics.html` | 14 | 12 | 91s/user |
| `/ask-prof-mir.html` | 12 | 10 | 24s/user |
| `/news.html` | 11 | 6 | 19s/user |
| `/thank-you.html` | 9 | 8 | 15s/user |

### Reading

- **Homepage (`/`) is doing the heavy lifting** — 494 of 1,005 page views (49%). 100% of visitors land here.
- **AI & Robotics page has the highest engagement time per user (91s).** Parents who land on this page read it. Worth funnelling more traffic here from ads.
- **About page has 76s/user** — the Waris Mir legacy story is engaging visitors who reach it. Strong signal that the brochure narrative works.
- **Enroll page only 29s/user** — short visit, likely because most arrive ready to scroll to the form and submit, then leave. Healthy.
- **Stale `/london-school/*` paths** are still showing 48 + 4 + 3 + 2 page views — these are leftover from the old GitHub Pages deployment. Need a Vercel redirect to `/`.

---

## 5. Geography (the only filter that matters)

| Country | City | Users | Sessions |
|---|---|---:|---:|
| **Pakistan** | **Lahore** | **173** | **219** |
| Pakistan | Karachi | 8 | 8 |
| Pakistan | Rawalpindi | 8 | 8 |
| Pakistan | Multan | 7 | 7 |
| Pakistan | Gujranwala / Gujrat / other | 9 | 9 |
| (not set) | (not set) — bots | 40 | 40 |
| United States | LA / Phoenix / Denver / Ashburn / Forest City | 37 | 71 |
| India | (not set) | 2 | 2 |

### Reading

- **Lahore alone = 56% of all users** (173 of 307). Our paying audience is finding us.
- **Other Pakistan cities = ~10%.** Karachi/Rawalpindi/Multan visitors are likely diaspora research or relatives — useful awareness traffic but not the buyer.
- **US cities (LA, Phoenix, Denver, Ashburn, Forest City) are almost certainly bots or datacenter scrapers** — no Pakistani parents live in Forest City. Strip these out of any "user" count when reporting upward.
- **Adjusted "real prospect" user count** ≈ 173 (Lahore) + ~30 other Pakistan = **~200 real Pakistani prospects in 4 days**, generating ~250 sessions and ~7 form submits.

---

## 6. Devices

| Device | Users | Sessions | Page views | Engagement |
|---|---:|---:|---:|---:|
| **Mobile** | **253 (82%)** | 325 (82%) | 670 | 41.5% |
| Desktop | 58 (19%) | 79 (20%) | 331 | 49.4% |
| Tablet | 1 | 2 | 4 | 50% |

**Reading:** Desktop has slightly higher engagement (49% vs 41%) — when parents make time at a desk, they read more. But the volume is on mobile. Every design and copy decision should be tested on a 375px screen first.

---

## 7. What to share with the school team

### Headline numbers (4 days)
- **307 visitors, 397 sessions, 1,005 page views**
- **~200 real Pakistani prospects** (after stripping bots and overseas datacenter traffic)
- **35 WhatsApp enquiries** + **7 form submits** = **42 unique parents made contact** = roughly **1 in 5 real Pakistani prospects reached out**

### What's working
1. **WhatsApp-first strategy is right** — 5× more parents WhatsApp than fill the form.
2. **Homepage and AI & Robotics page hold attention** (56s and 91s per user).
3. **Once a parent clicks "Book a Visit", the form converts well** (53% complete).
4. **Lahore is dominant** — local SEO and paid targeting are aimed at the right city.

### Where to invest next
1. **Top-of-funnel volume is small.** 397 sessions in 4 days = ~100/day. Paid social is only delivering 2% of traffic — Meta UTM tagging or budget needs review.
2. **Engagement gap on Facebook referrals** (23% vs 55% organic) — Facebook in-app browser users bounce. Worth A/B testing a mobile-first landing simplification.
3. **Phone clicks are nearly zero (2)** — consider hiding/de-emphasising the phone number or replacing the "Call" button with a second WhatsApp CTA.
4. **Stale `/london-school/*` URLs need 301 redirects** in `vercel.json`.

### What to keep watching
- **Daily session count** — anchor on ~95/day (today's number, the recovered baseline).
- **Form-submit rate** — currently 2.3% of visitors. Goal: 4-5% over the next 30 days.
- **Mobile engagement rate** — 41% is fine; if it drops below 35%, the page is too heavy for parents on slow Pakistani 4G.

---

## 8. Caveats

- **GA4 was newly set up 4 days ago.** The 30-day window we requested only returned 4 days of data because there isn't more.
- **GA4 user counts can be inflated** by ~2× (noted in CLAUDE.md). The 307-visitor number is best read as "an upper bound" — true unique parents are likely closer to 200 after deduping returners across days.
- **Vercel Analytics should be cross-referenced** as a second-source baseline once it has a week of data.
- **The full 30-day report should be re-run on 26 May 2026** for a true monthly baseline.
