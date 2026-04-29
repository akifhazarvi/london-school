# Content Quality Audit — 2026-04-28

**Site:** https://londoneducation.pk
**Scope:** 17 HTML pages including 5 blog posts.

## Score: 68 / 100

The blog content is genuinely good — long-form, structured, locally relevant. Site-wide copy is on-brand. The score is dragged down by **stale brochure-vs-reality claims that are still live in user-facing copy and crawlable schema.**

---

## Word Counts (proxy for thin-content risk)

All pages clear the 300-word thin-content threshold. Lowest are `blog/index.html` (722) and `ask-prof-mir.html` (861) — both are summary/landing pages where this is appropriate. No thin content to remove or expand.

| Page | Words | Verdict |
|---|---|---|
| index.html | 1,348 | Good |
| about.html | 2,182 | Good |
| academics.html | 2,804 | Strong |
| ai-robotics.html | 2,330 | Strong |
| campus.html | 1,127 | OK |
| enroll.html | 1,319 | Good |
| ask-prof-mir.html | 861 | OK (landing) |
| news.html | 1,244 | OK |
| yearbook.html | 1,832 | Good |
| blog/index.html | 722 | OK (index) |
| blog/choosing-cambridge-school-lahore.html | 2,421 | Strong |
| blog/how-to-choose-school-for-4-year-old.html | 2,396 | Strong |
| blog/lahore-school-holidays-2026.html | 2,538 | Strong |
| blog/what-is-igcse.html | 2,232 | Strong |

---

## CRITICAL — Brochure-vs-Reality Claims Still Live

CLAUDE.md prohibits these claims; they remain in user-facing HTML and JSON-LD schema. Each is a trust risk and a Helpful Content signal violation.

| File | Line | Claim | Fix |
|---|---|---|---|
| `index.html` | 384 | `Cambridge curriculum plus Chinese, French, and German. We prepare kids for the world.` | Replace with "Cambridge IGCSE pathway, two US coding certifications by Kindergarten, and a full robotics programme. We prepare children for the world." |
| `index.html` | 337–338 | Proof bar: `3 / Foreign Languages` | Replace with `2 / US Coding Certifications` (verifiable brochure claim) or `Cambridge / Pathway Registered` |
| `index.html` | 385 | `prog__pill` label `3 Languages` | Replace with `Coding Certifications` or `Robotics Lab` |
| `about.html` | 359 | `Cambridge curriculum, three foreign languages, AI and robotics, 25+ sports.` | Replace with "Cambridge curriculum, AI-integrated learning, robotics from the early years, and 25+ sports and activities." |
| `academics.html` | 58 | Twitter description references "three foreign languages" | Rewrite to drop the claim |
| `academics.html` | 75 | Schema description references "three foreign languages" | Rewrite (see schema report C2) |
| `academics.html` | 153 | Schema Course `"Chinese, French, and German taught alongside English and Urdu."` | Delete entire ListItem (see schema report C2) |
| `campus.html` | 105 | Schema `LocationFeatureSpecification` Swimming Pool `value: true` | Remove the entry (see schema report C1) |
| `thank-you.html` | 171 | Visible: `You'll see the classrooms, robotics lab, swimming pool, and play area.` | Replace with "You'll see the classrooms, robotics lab, computer lab, and play area." |

**Note on blog content:** `blog/choosing-cambridge-school-lahore.html` and `blog/lahore-school-holidays-2026.html` mention "swimming pool" and "foreign languages" — these are intentional cautions warning parents about *other* schools' brochure overpromises. They are factually correct and should remain. Do not treat as the same issue.

---

## Admissions Cycle — Stale Across Site

Today is 2026-04-28. The 2025-26 academic year is in its final term. Multiple pages still advertise "Admissions Open 2025-26":

| File | Line | Text |
|---|---|---|
| `index.html` | 272 | Hero badge: `Admissions Open 2025-26` |
| `enroll.html` | 176 | `Admissions Open 2025–26` |
| `enroll.html` | 312–313 | Stat `2025–26` / `Admissions Open · Cambridge Pathway` |
| `enroll.html` | 46, 55, 58 | Three meta description tags reference `2025–26` |
| `academics.html` | 758 | Badge `AI-First Curriculum · 2025-26` |
| `yearbook.html` | 173 | `Virtual Tour · 2025-26` |
| `news.html` | 287 | `Admissions 2025–26 Now Open` |

**Recommended copy:** if 2026-27 enrolments are now the priority, change all instances to `2026-27`. If both cycles are open (Year 1 backfill plus next year), use `Now Enrolling` or `Accepting Applications · 2026-27`. Confirm with admissions before rolling out.

---

## E-E-A-T Assessment for a Year-1 School

A 2025-founded school cannot claim long Experience. The site handles this well in places and weakly in others:

- **Strong:** the Hamid Mir / Prof. Waris Mir legacy hook is clearly the primary trust signal and is used on `about.html` (correctly framed as inspiration, not founder), in schema, and in llms.txt.
- **Strong:** Cambridge Pathway Registered is a verifiable third-party accreditation and is mentioned on most pages.
- **Strong:** the Principal's message on `about.html` adds named, accountable expertise.
- **Weak:** no "About the author" attribution on any of the 5 blog posts — every blog `BlogPosting` schema needs an `author` object linked to a real person (Principal or Admissions Director).
- **Weak:** no third-party citations (press, Hamid Mir's own writing, Cambridge directory listing). The April 2026 inauguration by Hamid Mir is an unmissable opportunity for a press/news article with Article schema linking to Hamid Mir's Wikipedia entry — first external authority anchor.

---

## British English Compliance

Spot check against the 2026-04-27 standardisation:

- `programme`, `enrolment`, `centre`, `colour`, `honour` — used consistently in spot checks.
- "Class" (not "Grade") — used in user-facing copy on `enroll.html` and `index.html`. Form input `name="grade"` retained for backend, which is fine.
- "Class + Age" pairing — present in programme cards.
- "and" not "&" in body prose — generally compliant. Brand-label exceptions ("AI & Robotics", "Cambridge Education | Robotics & AI") are kept correctly.

**Pass overall.** Spot any new "Program" / "enrollment" / "color" creep on next pass.

---

## Em Dash Usage

The 2026-04-27 commit removed em dashes from visible prose. Spot-checks did not surface stray em dashes in body copy. The brand name `London International Education System — Prof. Waris Mir Campus` correctly retains an em dash as a name element, not prose. **Pass.**

---

## Anonymous Testimonials

Spot check of `index.html` testimonials block: 4 quotes, all anonymous ("A London School parent" + class). No invented named-parent quotes. No quotes citing classes the school does not yet teach. **Pass.**

---

## Forbidden Phrasings

- "Weekly AI progress reports" / "Weekly AI-generated progress reports" — only present in **llms.txt** (line 74), not in HTML. Fix in llms.txt (see GEO report).
- "Founded by Prof. Waris Mir" — not detected in HTML. **Pass.**
- "Co-founder Huma Mir" / "Co-founder Zoya Mir" — only present in **llms.txt**, not in HTML. Fix in llms.txt.

The HTML side is clean on these phrasings; the llms.txt side has all the violations.

---

## AI Citation Readiness

Strengths:
- FAQPage schema on `enroll.html`, `ai-robotics.html`, and all 4 blog posts — feeds Perplexity, ChatGPT-Search, Bing Copilot directly.
- llms.txt exists and follows the llmstxt.org spec on format.

Weaknesses:
- `index.html` has no FAQPage schema. Homepage is the highest-authority page for AI citation extraction. Add 5–7 Q/As covering: fee range, age range, admissions process, Cambridge accreditation, location.
- llms.txt contains 10 false statements that LLMs will repeat verbatim if not fixed (see GEO report).
- Most section intro paragraphs are 20–40 words — too short for AI passage extraction. Optimal range is 134–167 words. Pad lead paragraphs on `academics.html`, `ai-robotics.html`, `campus.html` to ~150 words each with definitive "X is Y" sentences.

---

## Top 5 Content Issues (with exact replacement text)

### 1. `index.html:384` — false foreign-languages claim in programme card
**Current:**
```html
<p class="prog__desc">Cambridge curriculum plus Chinese, French, and German. We prepare kids for the world.</p>
```
**Replace with:**
```html
<p class="prog__desc">Cambridge IGCSE pathway with two US coding certifications by Kindergarten and a full robotics programme. We prepare children for the world.</p>
```

### 2. `index.html:337-338` — false "3 Foreign Languages" proof-bar stat
**Current:** `3 / Foreign Languages`
**Replace with:** `2 / US Coding Certifications` (verifiable brochure claim, distinctive in Pakistan).

### 3. `about.html:359` — false foreign-languages claim in summary copy
**Current:**
```html
<p>Cambridge curriculum, three foreign languages, AI and robotics, 25+ sports. We prepare children for a future we can't yet predict.</p>
```
**Replace with:**
```html
<p>Cambridge curriculum, AI-integrated learning, robotics from the early years, and 25+ sports and activities. We prepare children for a future we can't yet predict.</p>
```

### 4. `thank-you.html:171` — visible "swimming pool" claim
**Current:** `You'll see the classrooms, robotics lab, swimming pool, and play area.`
**Replace with:** `You'll see the classrooms, robotics lab, computer lab, and play area.`

### 5. Admissions cycle stale — site-wide
Update every "2025-26" / "2025–26" admissions reference (8 visible instances across `index`, `enroll`, `academics`, `yearbook`, `news`) to either `2026-27` or `Now Enrolling`. Confirm with admissions which is correct.

---

## Recommended Adds

- Author attribution on all 5 blog `BlogPosting` schema blocks (Principal Mehr un Nisa Masood or named Admissions Director).
- FAQPage schema on `index.html` with 5–7 Q/As.
- Lead paragraph on `academics.html`, `ai-robotics.html`, `campus.html` padded to ~150 words with definitive citable sentences.
- A press/news article on the April 2026 Hamid Mir inauguration with Article schema and a `sameAs` link to his Wikipedia entry — first externally-anchored citation chain.
