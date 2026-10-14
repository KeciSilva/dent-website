# SEO Audit: Auro Dent

> [REALE] This is a fictional Auro Dent website created for a university Digital Marketing / SEO course assignment. It is deployed at `https://auro-dent.netlify.app`; there is no real clinic or production business behind these details.

## 1. Project And Evidence Scope

[REALE] The active repository uses Next.js `16.4.0`, React `19.3.0`, the App Router, custom locale routing under `app/[locale]`, and JSON dictionaries in `messages/sq.json` and `messages/en.json`. No i18n package is installed. Git proves an earlier Vite phase: commit `648361d` contains a Vite build and `src/App.jsx`; commit `ed01e91` adds the current bilingual App Router structure. The legacy Vite source remains in the repository but is not imported by the active `app/` routes.

[REALE] The production branch at the time of this audit is `main`, commit `c53eb39`. `v1-baseline` points to `4c6cbd7`; `v2-optimized` points to `f4ada0c`. The follow-up fixes are after `v2-optimized` and are included in `c53eb39`.

[KËRKON VERIFIKIM] Netlify deployment state, Lighthouse scores, Search Console data, rankings, traffic, backlinks and competitor metrics are not measured in this repository.

## 2. Website Overview

| Item | Current state |
| --- | --- |
| Brand | Auro Dent |
| Languages | Albanian (`/sq`) and English (`/en`); Albanian is the default locale |
| Public localized URLs | 21 per locale, 42 total in the sitemap |
| Services | 7 service detail pages: general dentistry, whitening, implants, orthodontics/braces/aligners, pediatric dentistry, emergency care, cosmetic veneers |
| Blog | 4 posts, each localized |
| Audience | [SIMULUAR] Local and international patients for the course case study |
| Conversion UI | Appointment form UI, phone link, email link, contact CTA |
| Business data | [SIMULUAR] Reserved email, demo phone, fictional address, demo doctors and demo testimonials |

## 3. Verified Route Inventory

[REALE] Active localized page types are:

`/sq` and `/en`; `/about`; `/services`; `/services/general-dentistry`; `/services/teeth-whitening`; `/services/dental-implants`; `/services/orthodontics-braces-aligners`; `/services/pediatric-dentistry`; `/services/emergency-dental-care`; `/services/cosmetic-dentistry-veneers`; `/team`; `/gallery`; `/blog`; `/blog/how-often-visit-dentist`; `/blog/teeth-whitening-what-to-expect`; `/blog/caring-for-childrens-teeth`; `/blog/dental-implants-aftercare`; `/international-patients`; `/faq`; `/contact`; `/privacy`.

[REALE] The old `/international-patients` route was previously only a redirect to contact. It is now a localized page and is included in the sitemap. Legacy routes such as `/about`, `/services`, `/dentist`, `/before-after`, `/blog`, `/faq` and `/contact` redirect to the Albanian localized equivalents. There are 7 service pages, not 8.

## 4. Claim Verification Table

| Claim checked | Where | Verified? | Notes |
| --- | --- | --- | --- |
| Canonical, `og:url` and `og:image` use the deployed host | `app/layout.tsx`, `lib/metadata.ts`, `lib/site-config.ts` | YES | Local render resolved them to `https://auro-dent.netlify.app`; project search found zero occurrences of the former external domain. |
| Sitemap and robots use the configured host | `app/sitemap.ts`, `app/robots.ts` | YES | Local render returned a Netlify sitemap reference and 42 localized URLs. |
| `sq`, `en`, `x-default` hreflang exists | `lib/metadata.ts`, `components/i18n/seo.tsx` | YES | Present in generated metadata and sitemap alternates. |
| JSON-LD types are implemented | `components/i18n/seo.tsx` | YES | Dentist, Organization, WebSite, BreadcrumbList, FAQPage, Service and BlogPosting are conditional by page. |
| Eight services and an international page existed | `data/demo-content.ts`, route tree | NO | Source had 7 services and the international route was only a redirect before this audit. |
| Custom 404 returns a real 404 | `app/[locale]/not-found.tsx`, `app/not-found.tsx`, `proxy.ts` | YES | Local requests to `/sq/no-such-page` and `/no-such-page` returned 404 after the proxy fix. |
| All rendered images have descriptive alt text | Active localized pages and `public/images` | PARTIAL | Active images have alt text; unused legacy optimized derivatives retain generic filenames and are documented as unused. |
| Every page has one H1 and logical outline | Active `app/[locale]` pages | PARTIAL | Verified outlines are documented below; the service overview required and now has an H2 before H3 service cards. |
| Project was historically a Vite SPA | Git commits `648361d`, `ed01e91` | YES | `648361d` contains Vite; `ed01e91` adds the Next.js locale App Router. |

## 5. Heading Outlines

[REALE] The active page outlines are:

| Page type | Outline |
| --- | --- |
| Home | H1 hero; H2 services, about, team, FAQ, testimonials, find us; H3 team cards |
| About | H1; H2 story, technology, team approach, values; H3 value cards |
| Services | H1; H2 main treatments; H3 service cards |
| Service detail | H1; H2 who it is for, process, what to expect, FAQ, related services |
| Team | H1; H2 doctor names |
| Gallery | H1; H2 clinic environment |
| Blog | H1; H2 article titles |
| Blog post | H1; H2 related services |
| International patients | H1; H2 treatments, process, travel, follow-up, FAQ |
| FAQ | H1; H2 patient questions |
| Contact | H1; H2 clinic details, find the clinic |
| Privacy | H1; H2 policy sections |
| 404 / error | H1; no unnecessary heading level |

## 6. Rendered Image Inventory

[REALE] Active image references and alt sources:

| File | Rendered use | Alt source |
| --- | --- | --- |
| `public/images/modern-dental-treatment-room.jpg` | Home hero | Localized `home.heroAlt`; only `priority` image |
| `public/images/dentist-patient-consultation.jpg` | Home and About | Localized consultation alt |
| `public/images/dentist-patient-consultation.jpg` | General dentistry card and demo team profile | Localized service name / doctor name |
| `public/images/teeth-whitening-after.png` | Whitening card and gallery | Localized service/gallery alt |
| `public/images/digital-dental-scan.jpg` | Implant card | Localized service name |
| `public/images/modern-dental-treatment-room.jpg` | Orthodontics card | Localized service name |
| `public/images/pediatric-dentistry.png` | Pediatric card and gallery | Localized service/gallery alt |
| `public/images/urgent-dental-care.png` | Emergency card | Localized service name |
| `public/images/smile-consultation.jpg` | Cosmetic card and demo team profile | Localized service name / doctor name |
| `public/images/implant-planning.png` | Demo team profile | Doctor name |
| `public/images/orthodontic-aligners.png` | Demo team profile | Doctor name |
| `public/og/og-cover-1200x630.jpg` | Social preview | Localized OG alt in metadata |

[KËRKON VERIFIKIM] `public/images/optimized/*` contains legacy generated derivatives with generic source names. They are not referenced by active `app/[locale]` pages; do not claim them as rendered assets without checking a production crawl.

## 7. On-Page Audit

| Page | SEO issue | Current state (v1) | Recommendation | Priority |
| --- | --- | --- | --- | --- |
| Home | Primary local intent | Localized H1 and metadata for dental clinic in Tirana | Validate title/description length after deployment | HIGH |
| Services | Content hierarchy | H1, H2 and linked service cards | Keep one clear intent for the overview | MEDIUM |
| Seven service pages | Thin-content risk | Unique intro, candidacy, process, expectation, FAQ, related links and CTA | Review clinical copy with a qualified professional before real use | HIGH |
| Blog and four posts | Article discoverability | Localized titles, author line, date, service link and BlogPosting JSON-LD | Add editorial review process before publishing real advice | MEDIUM |
| Contact | Local conversion | Crawlable NAP, tel/mailto, hours, lazy map and form disclosure | Replace every demo value only when verified | HIGH |
| International patients | Missing page in earlier state | Localized page with cautious travel, consultation and follow-up content | Validate travel information externally before production | MEDIUM |

## 8. Technical SEO Audit

| Element | Status | Problem / evidence | Recommendation | Priority |
| --- | --- | --- | --- | --- |
| `metadataBase` | [REALE] PASS | `app/layout.tsx` uses `new URL(siteConfig.url)` | Set the Netlify variable explicitly in production | CRITICAL |
| Canonical | [REALE] PASS | `localizedMetadata()` creates a locale self-reference | Verify rendered head after every domain change | CRITICAL |
| Open Graph / Twitter | [REALE] PASS | Uses the same site URL and local `/og/og-cover-1200x630.jpg` | Run a social debugger after deployment | HIGH |
| Hreflang | [REALE] PASS | `sq`, `en` and `x-default` are generated for localized pages | Confirm rendered tags with a crawler | HIGH |
| Sitemap | [REALE] PASS | `app/sitemap.ts` outputs both locales, alternates and `lastModified` | Submit the live URL to Search Console | HIGH |
| Robots | [REALE] PASS | `app/robots.ts` references `/sitemap.xml`; env false disallows `/` | Keep indexing true only for the intended public demo | HIGH |
| JSON-LD | [REALE] PASS | Organization, WebSite, Dentist, BreadcrumbList, FAQPage, Service and BlogPosting are implemented where applicable | Validate with Schema Markup Validator and Rich Results Test | HIGH |
| Reviews / ratings | [REALE] PASS | No `Review` or `aggregateRating` schema exists | Add none without genuine qualifying data | HIGH |
| 404 | [REALE] PASS | Locale and root not-found pages render links and Next.js handles 404 status | Test unknown paths with `curl -I` after deployment | MEDIUM |
| Images | [REALE] PARTIAL | Active images use `next/image`; hero alone uses `priority`; unused optimized derivatives retain generic names | Remove unused derivatives only with approval, or document them as unused | MEDIUM |
| Fonts | [REALE] PASS | Local CSS/font strategy avoids external Google Fonts build dependency | Measure font loading in PageSpeed | LOW |
| Accessibility | [REALE] PARTIAL | Landmarks, labels, focus styles and skip link exist | Run axe or Lighthouse accessibility audit | MEDIUM |
| Indexing toggle | [REALE] PASS | `NEXT_PUBLIC_ALLOW_INDEXING=false` emits noindex and disallows crawling | Set environment per deployment context | HIGH |

## 9. Structured Data Map

[REALE]

| Page type | JSON-LD |
| --- | --- |
| Every localized page | Organization, WebSite and Dentist graph from `components/i18n/seo.tsx` |
| Every inner localized page | BreadcrumbList |
| Home, FAQ, service pages, international patients | FAQPage only where questions are visibly rendered |
| Service detail pages | Service |
| Blog posts | BlogPosting with demo doctor author, date and image |
| Testimonials | No Review and no aggregateRating |

## 10. Local SEO

| Factor | Current state | Recommendation | Priority |
| --- | --- | --- | --- |
| NAP | [SIMULUAR] Centralized in `lib/site-config.ts`; address is fictional | Replace only with verified legal business data | HIGH |
| Contact page | [REALE] Crawlable address, phone, email, hours and map iframe | Verify map pin and business details | HIGH |
| Local keywords | [SIMULUAR] One primary keyword is mapped per service and locale | Review against real Albanian search data | MEDIUM |
| Google Business Profile | [KËRKON VERIFIKIM] No real profile exists for this fictional business | [SIMULUAR] Create and verify a profile only for a real clinic | HIGH |
| Reviews | [KËRKON VERIFIKIM] Demo testimonials are not review schema | Use genuine consent-based reviews only | HIGH |
| Citations | [KËRKON VERIFIKIM] Not measured | Check Albanian directories and NAP consistency | MEDIUM |

## 11. Off-Page Audit And Plan

| Factor | Current state | Issue / opportunity | Recommendation |
| --- | --- | --- | --- |
| Backlinks | Needs external verification | No repository evidence | Check Ahrefs Free Backlink Checker and Search Console |
| Referring domains | Needs external verification | No measured data | Export Search Console links and compare over time |
| Directories | Needs external verification | No listing can be claimed | Check Google Maps and relevant Albanian directories |
| Reviews | Needs external verification | No real business profile | Use genuine patient-consent workflow only |
| PR / partnerships | [SIMULUAR] Strategy only | No outreach has occurred | Consider relevant local healthcare or tourism publications |
| Competitor links | Needs external verification | No competitor research performed | Use search operators and Ahrefs for a documented sample |

## 12. Keyword Strategy

### Albanian

| Keyword | Search intent | Target page | Priority |
| --- | --- | --- | --- |
| klinikë dentare Tiranë | Local commercial | `/sq` | HIGH |
| kontroll dentar Tiranë | Local service | `/sq/services/general-dentistry` | HIGH |
| zbardhim i dhëmbëve Tiranë | Local service | `/sq/services/teeth-whitening` | HIGH |
| implante dentare Tiranë | Local service | `/sq/services/dental-implants` | HIGH |
| aparate dhe aligner transparente Tiranë | Local service | `/sq/services/orthodontics-braces-aligners` | HIGH |
| dentist për fëmijë Tiranë | Local service | `/sq/services/pediatric-dentistry` | HIGH |
| dentist urgjent Tiranë | Urgent local service | `/sq/services/emergency-dental-care` | HIGH |
| faseta dentare Tiranë | Local cosmetic service | `/sq/services/cosmetic-dentistry-veneers` | HIGH |
| sa shpesh duhet të shkoni te dentisti | Informational | `/sq/blog/how-often-visit-dentist` | MEDIUM |

### English

| Keyword | Search intent | Target page | Priority |
| --- | --- | --- | --- |
| dental clinic Tirana | Local commercial | `/en` | HIGH |
| dental check-up Tirana | Local service | `/en/services/general-dentistry` | HIGH |
| teeth whitening Tirana | Local service | `/en/services/teeth-whitening` | HIGH |
| dental implants Tirana | Local service | `/en/services/dental-implants` | HIGH |
| braces and aligners Tirana | Local service | `/en/services/orthodontics-braces-aligners` | HIGH |
| pediatric dentist Tirana | Local service | `/en/services/pediatric-dentistry` | HIGH |
| emergency dentist Tirana | Urgent local service | `/en/services/emergency-dental-care` | HIGH |
| dental veneers Tirana | Local cosmetic service | `/en/services/cosmetic-dentistry-veneers` | HIGH |
| dental treatment in Tirana for international patients | Travel/commercial | `/en/international-patients` | MEDIUM |

## 13. Competitor Analysis Template

[KËRKON VERIFIKIM] No competitor data is filled in. Use 3–5 real Tirana clinics and record evidence only after checking each source.

| Competitor | Website structure | Service pages | Title/description | Local SEO | Google reviews | Backlinks | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY |
| TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY |
| TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY | TODO_VERIFY |

## 14. Before Versus After

| Issue | Before | After | Expected SEO impact |
| --- | --- | --- | --- |
| Wrong or unverified domain references | Metadata risked pointing away from the deployed host | `siteUrl`, `metadataBase`, canonical, social URLs, sitemap and robots use the configured Netlify URL | Clearer URL ownership and fewer canonical/social conflicts |
| Incomplete service detail | Service cards did not provide enough decision-support content | Seven unique localized service pages include process, expectations, FAQs, related links and CTA | Better alignment between treatment intent and landing-page content |
| Blog social type | Blog post metadata used the generic website type | Blog post metadata uses `og:type=article`; BlogPosting includes author, date and image | More accurate article representation for sharing and parsers |
| Missing international page | `/international-patients` redirected to contact | Localized page added and included in internal navigation and sitemap | A dedicated page can serve international-patient intent |
| Ambiguous hours layout | Hours appeared in a single line in key contact areas | Structured hours are rendered as separate localized lines from `siteConfig.hours` | Clearer local business information for users and crawlers |
| Inaccurate audit claims | Old audit overstated the current route inventory and treated an earlier architecture as the active one | Documentation now separates the proven Vite history from the active Next.js App Router and records seven services plus the localized international page | More reliable audit case study |

## 15. Evidence Checklist

Save these screenshots or exports with date, URL and environment:

1. Lighthouse mobile and desktop for `/sq` on `v1-baseline`.
2. Lighthouse mobile and desktop for `/sq` on the final commit.
3. PageSpeed Insights mobile and desktop for the deployed URL.
4. Rendered `<head>` for `/sq`, `/en`, `/sq/services/dental-implants`, `/en/services/teeth-whitening`, `/sq/contact` and `/sq/blog`.
5. `/robots.txt` and the complete `/sitemap.xml`.
6. Hreflang source view and canonical tag for one page in each language.
7. Rich Results Test and Schema.org Validator for home, one service and one blog post.
8. DevTools heading outline and mobile responsive screenshots.
9. Contact page NAP, map, form labels and footer disclaimer.
10. Search Console coverage, `site:` search and competitor Google results only after real deployment and verification.

## 16. Priorities

### Immediate

- [REALE] Keep `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ALLOW_INDEXING` correct in Netlify.
- [KËRKON VERIFIKIM] Run Lighthouse, PageSpeed, schema validation and crawler checks.
- [KËRKON VERIFIKIM] Replace fictional business data only when a real business exists.

### Short-term

- [SIMULUAR] Add editorial review for medical content.
- [KËRKON VERIFIKIM] Verify local listing, map pin, citations and genuine reviews.
- [KËRKON VERIFIKIM] Compare competitor structures and links using recorded sources.

### Long-term

- [SIMULUAR] Publish consented original clinic photography and educational articles.
- [SIMULUAR] Build ethical local partnerships and digital PR.
- [KËRKON VERIFIKIM] Monitor Search Console queries, indexing and performance after launch.

## 17. Limitations And Demo Values

[REALE] This is not a real clinic, so there is no real Google Business Profile, patient review corpus, backlink profile, ranking history, traffic history or verified medical credential set. The appointment form has no real backend.

[SIMULUAR] Values to replace before a real launch:

- Address: `Rruga Sami Frashëri 12, Tiranë 1001`
- Phone: `+355 69 000 0000`
- Email: `info@aurodent.example`
- Map embed: central Tirana demo query in `lib/site-config.ts`
- Four demo doctor names, bios, images and `Profil demo` / `Demo profile` labels
- Three demo testimonials and their labels
- Demo service prices in `data/demo-content.ts`
- OG image `public/og/og-cover-1200x630.jpg`
- Opening hours and all social profiles if a real clinic is introduced

## 18. Netlify Setup

[REALE] In Netlify, leave Base directory empty, use `npm run build`, publish `.next`, and set:

```text
NEXT_PUBLIC_SITE_URL=https://auro-dent.netlify.app
NEXT_PUBLIC_ALLOW_INDEXING=true
```

Set `NEXT_PUBLIC_ALLOW_INDEXING=false` for a non-indexable test deploy, then clear cache and redeploy after changing environment variables. See `docs/seo/netlify-setup.md`.

## Final Checklist

- ✓ Next.js App Router and locale routes verified in source.
- ✓ Canonical, hreflang, sitemap and robots implementations present.
- ✓ No Review or aggregateRating JSON-LD.
- ✓ Demo data is centralized and marked.
- ✓ Seven service pages and four localized blog posts exist.
- ✓ Contact, 404, accessibility foundations and mobile navigation exist.
- ⚠ Lighthouse, PageSpeed, Search Console, live indexing and schema tools require external measurement.
- ⚠ Backlinks, competitors, Google Business Profile and reviews require external verification.
- ○ Real business launch data is not supplied.
