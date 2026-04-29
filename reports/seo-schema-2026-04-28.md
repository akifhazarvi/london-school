# Schema.org Audit — londoneducation.pk — 2026-04-28

## Per-Page Schema Status

| Page | Types Present | JSON Valid | Breadcrumb | Issues |
|---|---|---|---|---|
| `index.html` | School + EducationalOrganization + LocalBusiness, WebSite | PASS | n/a (home) | Missing: LinkedIn in sameAs, priceRange. SearchAction points to non-existent search. |
| `about.html` | AboutPage, BreadcrumbList, Person ×4 | PASS | PASS | Clean. |
| `academics.html` | CollectionPage, BreadcrumbList, ItemList (Course ×3) | PASS | PASS | CRITICAL: CollectionPage description and Course item 3 both assert "three foreign languages / Chinese, French, German" — not real. |
| `ai-robotics.html` | BreadcrumbList, Course, FAQPage | PASS | PASS | Course provider uses inline EducationalOrganization instead of `@id` ref; addressRegion missing. FAQPage on commercial site (info priority). |
| `ask-prof-mir.html` | BreadcrumbList, SoftwareApplication | PASS | PASS | Clean. |
| `campus.html` | BreadcrumbList, Place, WebPage | PASS | PASS | CRITICAL: amenityFeature includes `"Swimming Pool": true` — not real. |
| `enroll.html` | BreadcrumbList, FAQPage | PASS | PASS | FAQPage on commercial site (info priority — fine for AI/LLM citations). No WebPage wrapper. |
| `news.html` | BreadcrumbList, CollectionPage, ItemList (NewsArticle ×2) | PASS | PASS | Clean. |
| `yearbook.html` | BreadcrumbList, CollectionPage + ImageGallery | PASS | PASS | Clean. |
| `blog/index.html` | Blog | PASS | MISSING | No BreadcrumbList on blog index. |
| `blog/choosing-cambridge-school-lahore.html` | BreadcrumbList, BlogPosting, FAQPage | PASS | PASS | FAQPage commercial (info priority). |
| `blog/how-to-choose-school-for-4-year-old.html` | BreadcrumbList, BlogPosting, FAQPage | PASS | PASS | FAQPage commercial (info priority). |
| `blog/lahore-school-holidays-2026.html` | BreadcrumbList, BlogPosting, FAQPage | PASS | PASS | FAQPage commercial (info priority). |
| `blog/what-is-igcse.html` | BreadcrumbList, BlogPosting, FAQPage | PASS | PASS | FAQPage commercial (info priority). |
| `thank-you.html` | NONE | — | MISSING | No schema. Low priority. |
| `404.html` | NONE | — | n/a | No schema needed. |

## NAP Consistency Check

| Field | index.html | campus.html | ai-robotics.html | academics.html | Canonical |
|---|---|---|---|---|---|
| Name | London International Education System — Prof. Waris Mir Campus | London School — Prof. Waris Mir Campus | London School — Prof. Waris Mir Campus | London School — Prof. Waris Mir Campus | **London International Education System — Prof. Waris Mir Campus** |
| Street | Plot #8, Sector B-2, Block 1, Ali Road, Opposite Ideal Park Township | Same | Same | Same | PASS |
| Locality | Lahore | Lahore | Lahore | Lahore | PASS |
| PostalCode | 54600 | 54600 | 54600 | 54600 | PASS |
| Phone primary | +92-301-0499777 | (in org ref) | (in org ref) | (in org ref) | PASS |
| addressRegion | Punjab | Punjab | **MISSING** | n/a | Flag |

Name inconsistency: index.html correctly uses the full legal name. campus.html and ai-robotics.html provider use the shorter "London School — Prof. Waris Mir Campus" in inline objects — these should reference `@id` instead.

---

## Findings Summary

### CRITICAL (fix before next crawl)

**C1 — False "Swimming Pool" amenityFeature in campus.html**
`campus.html` Place schema declares `"Swimming Pool": true` under amenityFeature. Swimming pool is not a real facility (confirmed 2026-04-25). Remove that entry.

Affected block: `campus.html` — `amenityFeature` array, item index 2.

**C2 — False "Foreign Languages" Course and description in academics.html**
Two violations:
1. `CollectionPage` description: "Cambridge IGCSE curriculum with robotics, AI-integrated learning, and **three foreign languages**"
2. `ItemList` item 3: `Course` named "Foreign Languages" with description "Chinese, French, and German taught alongside English and Urdu."

Chinese, French, and German are not taught (confirmed 2026-04-25). Remove item 3 from the ItemList entirely and rewrite the CollectionPage description.

**C3 — LinkedIn missing from sameAs on index.html organisation block**
The `sameAs` array contains Facebook, Instagram, and the Google Maps CID, but is missing the LinkedIn company URL. This weakens entity disambiguation for Google's Knowledge Graph. LinkedIn: `https://www.linkedin.com/company/113215995`.

---

### HIGH PRIORITY

**H1 — SearchAction in WebSite block points to non-existent search**
`index.html` WebSite schema has a `SearchAction` pointing to `https://londoneducation.pk/?s={search_term_string}`. The site has no search functionality. Google may surface a sitelinks search box that returns a blank page. Remove `potentialAction` from the WebSite block entirely.

**H2 — priceRange missing from organisation block**
`LocalBusiness` benefits from `priceRange` for map pack display. Current range: Rs 15,000–22,000/month. Recommended value: `"PKR 15,000–22,000/month"`.

**H3 — blog/index.html missing BreadcrumbList**
Every other non-home page has a BreadcrumbList; the blog index does not.

---

### INFO (no action required)

**I1 — FAQPage on commercial pages**
FAQPage blocks exist on `ai-robotics.html`, `enroll.html`, `blog/choosing-cambridge-school-lahore.html`, `blog/how-to-choose-school-for-4-year-old.html`, `blog/lahore-school-holidays-2026.html`, `blog/what-is-igcse.html`. Google restricted FAQ rich results to government/healthcare in August 2023. These will not produce Google rich results on a commercial site, but they benefit AI/LLM citations (GEO value). Retain as-is.

**I2 — ai-robotics.html Course provider uses inline object instead of @id reference**
Minor: the `provider` object duplicates the organisation instead of referencing `{"@id": "https://londoneducation.pk/#organization"}`. No functional impact on rich results but reduces graph coherence.

---

## Fix Snippets

### Fix C1 — Remove Swimming Pool from campus.html amenityFeature

Remove this item from the `amenityFeature` array in campus.html:
```json
{
  "@type": "LocationFeatureSpecification",
  "name": "Swimming Pool",
  "value": true
}
```

### Fix C2 — academics.html: remove Foreign Languages Course and fix description

Replace the CollectionPage description:
```
"Cambridge IGCSE curriculum with robotics, AI-integrated learning, and three foreign languages at London School — Prof. Waris Mir Campus, Lahore."
```
With:
```
"Cambridge IGCSE curriculum with AI-integrated learning and a full robotics programme at London School — Prof. Waris Mir Campus, Lahore."
```

Remove the entire ListItem at position 3 (the "Foreign Languages" Course) from the ItemList in academics.html.

### Fix C3 — Add LinkedIn to sameAs in index.html

```json
"sameAs": [
  "https://www.facebook.com/londonschoolwarismir/",
  "https://www.instagram.com/londoninternational.school/",
  "https://maps.google.com/?cid=7737999795082975354",
  "https://www.linkedin.com/company/113215995"
]
```

### Fix H1 — Remove SearchAction from WebSite block in index.html

Remove the entire `potentialAction` property from the WebSite block. The site has no search.

### Fix H2 — Add priceRange to organisation block in index.html

```json
"priceRange": "PKR 15,000–22,000/month"
```

### Fix H3 — Add BreadcrumbList to blog/index.html

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://londoneducation.pk/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Parent Guides",
      "item": "https://londoneducation.pk/blog/"
    }
  ]
}
```
