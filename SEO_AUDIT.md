# SEO Audit: Aura Dental Studio

## Executive Summary

Aura Dental Studio is being rebuilt as a modern dental clinic website for Tirana, Albania. The previous repository was a Vite React single-page concept site branded as VALOIS ORAL WELLNESS, with placeholder Geneva business details and only one indexable URL.

The implementation now uses a Next.js App Router architecture with dedicated pages for core treatments, local SEO foundations, international patient information, blog content, contact conversion and technical SEO files.

## Website Overview

- Brand: Aura Dental Studio
- Industry: Dental clinic / dentistry
- Location target: Tirana, Albania
- Audiences: local patients in Albania and international patients considering treatment in Albania
- Primary conversions: appointment request, phone/WhatsApp contact, consultation enquiry

## SEO Objectives

- Build indexable service landing pages for high-intent treatment searches.
- Improve local relevance for dentist and dental clinic searches in Tirana.
- Create a trustworthy structure for healthcare decision-making.
- Avoid fabricated reviews, credentials, awards, results or medical guarantees.

## On-Page SEO Audit

| Problem | Why It Matters | Recommendation | Implementation | Result |
| --- | --- | --- | --- | --- |
| Single-page website | Treatment queries need dedicated, crawlable URLs. | Create service pages. | Added `/services` and eight `/services/[slug]` pages. | Stronger keyword-to-page targeting. |
| Placeholder brand | Brand mismatch harms trust and relevance. | Replace Valois with Aura Dental Studio. | New site data and metadata use Aura Dental Studio. | Brand aligned with assignment. |
| No local landing structure | Local patients search by city and service. | Use natural Tirana/Albania references. | Titles and content reference Tirana where appropriate. | Improved local search relevance. |
| Unsupported claims | Healthcare claims can mislead patients. | Remove or mark unverifiable claims. | Reviews, stats, doctor credentials and before/after cases are placeholders or removed. | Better trust and compliance. |
| Thin treatment content | Service pages need useful information. | Add unique sections per service. | Each service includes intro, candidacy, benefits, process, aftercare and FAQ. | Higher content quality. |

## Technical SEO Audit

- Metadata: implemented with Next.js metadata and per-page `generateMetadata` for service/blog pages.
- URLs: clean URLs such as `/services/dental-implants`.
- Sitemap: implemented through `app/sitemap.ts`.
- Robots: implemented through `app/robots.ts`.
- Canonicals: generated via metadata alternates.
- Structured data: Organization, WebSite and Dentist graph added with factual or clearly placeholder data only.
- Images: Next/Image is used on new pages with descriptive alt text.
- Mobile UX: responsive grids, mobile navigation and touch-friendly CTAs.
- 404 handling: custom `app/not-found.tsx`.
- Internal linking: homepage, services, blog posts and related treatments connect naturally.

## Local SEO Audit

- Target local terms include dentist Tirana, dental clinic Tirana, dental implants Tirana, veneers Tirana, teeth whitening Tirana and Invisalign Tirana.
- NAP consistency is prepared through central `site.contact` configuration.
- Current contact values are placeholders and must be replaced before launch.
- Google Business Profile recommendations:
  - Add exact name, address and phone.
  - Add service categories and treatment descriptions.
  - Upload real clinic photos.
  - Request genuine patient reviews ethically.
  - Keep opening hours consistent with the website.
- Local citations strategy:
  - Albanian business directories.
  - Healthcare directories where appropriate.
  - Local tourism and expat resources if editorially relevant.

## Off-Page SEO Strategy

Backlinks cannot be implemented in code. Recommended strategy:

- Build consistent citations in reputable Albanian directories.
- Seek healthcare directory listings with accurate NAP.
- Partner with local hotels or travel coordinators only where clinically and ethically appropriate.
- Create useful dental tourism resources without aggressive price claims.
- Analyze competitors for citation sources, editorial mentions and local backlinks.

## Content SEO

- Primary service pages: implants, veneers, crowns, Invisalign, whitening, fillings, oral surgery and general dentistry.
- Blog topics support service pages and topical authority.
- Internal links connect articles to relevant treatments.
- Service pages link to related treatments to support patient journeys.

## Before vs After Table

| Issue | Before | Change Implemented | After | SEO Impact | Priority |
| --- | --- | --- | --- | --- | --- |
| Framework mismatch | Vite SPA, not Next.js | Migrated active source to Next.js App Router | Real route-based architecture | HIGH | HIGH |
| One indexable URL | Sitemap contained only homepage | Added sitemap route for pages, services and blog posts | Multiple indexable URLs | HIGH | HIGH |
| Wrong brand | VALOIS ORAL WELLNESS | Aura Dental Studio content and metadata | Brand matches assignment | HIGH | HIGH |
| Wrong location | Geneva/Dubai/New York placeholders | Tirana/Albania positioning | Local SEO relevance improved | HIGH | HIGH |
| No treatment landing pages | Services were cards on homepage | Added dedicated service pages | High-intent pages available | HIGH | HIGH |
| Unsupported reviews/stats | Fake-looking ratings and numbers | Removed from new architecture | More trustworthy healthcare UX | HIGH | HIGH |
| No international page | Missing | Added `/international-patients` | Supports dental tourism intent | MEDIUM | HIGH |
| No blog architecture | Missing | Added `/blog` and `/blog/[slug]` | Supports content SEO | MEDIUM | MEDIUM |
| No contact/local page | Footer-only contact | Added `/contact` with NAP placeholders and form | Better conversion/local SEO | HIGH | HIGH |
| No audit documentation | Missing | Added `SEO_AUDIT.md` and evidence docs | Assignment-ready documentation | MEDIUM | MEDIUM |

## Remaining Required Business Inputs

- Real domain
- Full address in Tirana
- Phone
- WhatsApp
- Email
- Opening hours
- Google Maps URL
- Instagram/social profiles
- Dentist name and verified qualifications
- Real testimonials, if permitted
- Real before/after cases, with consent

