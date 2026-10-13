# Auro Dent Site Overview

## Project

Auro Dent is a bilingual English/Albanian course-assignment website for a demo dental clinic in Tirana, Albania.

## Architecture

- Framework: Next.js App Router.
- Default locale: Albanian (`/sq`).
- Secondary locale: English (`/en`).
- Root `/` redirects to `/sq`.
- Content source: `messages/sq.json`, `messages/en.json`, `lib/site-config.ts`, and `data/demo-content.ts`.
- Demo business data is marked in source comments and should be replaced before production.

## Primary Goals

- Create a professional dental clinic website experience.
- Demonstrate i18n SEO with hreflang, localized metadata and bilingual content.
- Support Local SEO intent for Tirana.
- Provide service landing pages, blog content and crawlable contact/NAP information.

