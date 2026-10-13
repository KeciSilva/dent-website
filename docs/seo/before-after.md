# SEO Before / After

This compares the `v1-baseline` snapshot with the `v2-optimized` implementation. All impact statements are expected impact only; no ranking or traffic outcome is claimed.

| Issue | Before | After | Expected SEO impact |
| --- | --- | --- | --- |
| Canonical and social URLs | Metadata referenced an unavailable external domain. | `siteUrl` in `lib/site-config.ts` defaults to `https://auro-dent.netlify.app` and feeds metadata, JSON-LD, robots and sitemap. | Reduces canonical and social URL conflicts. |
| Fictional business data | Contact values looked like production business details. | Reserved `.example` email, clearly fictional phone/address values, academic footer disclosure and config comment. | Prevents accidental real-business attribution. |
| Albanian localization | Service durations, prices, hours and team specialties included English strings. | Structured duration/hour keys and localized team labels render from both message files. | Improves language consistency for Albanian searchers. |
| Developer-facing copy | Homepage included SEO-focused wording. | Patient-facing benefit copy replaces implementation language. | Keeps visible content aligned with patient intent. |
| Headings and targeting | Homepage and section headings were broad; service metadata repeated keyword phrases. | Homepage H1 targets dental clinic intent; service titles are localized and unique. | Clarifies page intent and hierarchy. |
| Images | Generic filenames and broad alt text reduced context. | Descriptive kebab-case names and localized alt text; hero remains the only priority image. | Improves image and accessibility context. |
| Structured data | Base schema had incomplete language/social handling and unsafe serialization. | Escaped JSON-LD includes Dentist, Organization, WebSite, BreadcrumbList, FAQPage, Service and BlogPosting where appropriate. | Gives crawlers clearer entity and page relationships. |
| Crawl controls | Robots and sitemap used the wrong host and had no indexing toggle. | Robots, sitemap, hreflang and `NEXT_PUBLIC_ALLOW_INDEXING` use the configured site URL. | Improves crawl guidance and deployment safety. |
| Trust and local signals | NAP, hours, testimonials and map context were incomplete. | Crawlable NAP, hours, lazy map, demo-labelled testimonials, privacy link and “How to find us” block. | Strengthens local context without review schema claims. |

No ranking or traffic improvement is claimed. These are expected technical and content-quality impacts only.
