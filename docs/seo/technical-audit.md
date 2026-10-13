# Technical SEO Audit

| Area | Implementation | Status |
| --- | --- | --- |
| Router | Next.js App Router with `/[locale]` routes. | ✓ |
| Default locale | `/` redirects to `/sq`. | ✓ |
| Metadata API | Localized title, description, canonical, Open Graph and Twitter metadata. | ✓ |
| hreflang | `sq`, `en`, and `x-default` alternates. | ✓ |
| Sitemap | `app/sitemap.ts` includes every indexable page in both languages. | ✓ |
| Robots | `app/robots.ts` allows crawling and references sitemap. | ✓ |
| Structured data | Dentist, Organization, WebSite, FAQPage, Service, BlogPosting and BreadcrumbList where appropriate. | ✓ |
| Images | `next/image`, priority only on hero image, lazy loading elsewhere. | ✓ |
| Accessibility | Semantic landmarks, skip link, labels, focus states and mobile menu ARIA. | ✓ |
| Performance | Server Components by default, limited client components, next/font with latin-ext. | ✓ |

