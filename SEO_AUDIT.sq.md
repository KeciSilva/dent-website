# Audit SEO: Auro Dent

> [REALE] Ky është një website fiktiv i Auro Dent, i krijuar për një detyrë universitare në Digital Marketing / SEO. Është publikuar në `https://auro-dent.netlify.app`; nuk ekziston klinikë reale apo biznes prodhimi pas këtyre të dhënave.

## 1. Natyra Dhe Historia E Projektit

[REALE] Kodi aktiv përdor Next.js `16.4.0`, React `19.3.0`, App Router, route locale në `app/[locale]` dhe dictionary në `messages/sq.json` dhe `messages/en.json`. Nuk përdoret paketë i18n. Git provon një fazë të mëparshme Vite: commit-i `648361d` përmban build Vite dhe `src/App.jsx`; commit-i `ed01e91` shton strukturën aktuale bilingual App Router. Burimi legacy Vite mbetet në repository, por nuk importohet nga route-t aktive në `app/`.

[REALE] Branch-i `main` është në commit `c53eb39`. Tag-u `v1-baseline` është në `4c6cbd7`, ndërsa `v2-optimized` është në `f4ada0c`. Ndryshimet pas tag-ut të dytë janë pjesë e `c53eb39`.

[KËRKON VERIFIKIM] Netlify, Lighthouse, Search Console, renditjet, trafiku, backlink-et dhe metrikat e konkurrentëve nuk maten nga ky repository.

## 2. Përmbledhje E Website-it

| Elementi | Gjendja aktuale |
| --- | --- |
| Brand | Auro Dent |
| Gjuhët | Shqip (`/sq`) dhe anglisht (`/en`); shqipja është default |
| URL publike | 21 për çdo gjuhë, 42 gjithsej në sitemap |
| Shërbimet | 7 faqe: stomatologji e përgjithshme, zbardhim, implante, ortodonci/aparate/aligner, pediatri, urgjencë dhe faseta |
| Blogu | 4 artikuj, secili i lokalizuar |
| Audienca | [SIMULUAR] Pacientë lokalë dhe ndërkombëtarë për rastin e kursit |
| Të dhënat | [SIMULUAR] Email i rezervuar, telefon demo, adresë fiktive, mjekë dhe dëshmi demo |

## 3. Route-t E Verifikuara

[REALE] Të gjitha page-t e lokalizuara janë: home, about, services, 7 faqe shërbimesh, team, gallery, blog, 4 artikuj blogu, international patients, FAQ, contact dhe privacy në `/sq` dhe `/en`.

[REALE] Ka 7, jo 8, faqe shërbimesh. Më parë `/international-patients` vetëm ridrejtonte te kontakti; tani është faqe e lokalizuar dhe është futur në sitemap. Route-t e vjetra pa locale ridrejtohen te versioni shqip.

## 4. Tabela E Verifikimit Të Pretendimeve

| Pretendimi | Skedari | Verifikuar? | Shënim |
| --- | --- | --- | --- |
| Canonical, OG dhe imazhi social përdorin Netlify | `app/layout.tsx`, `lib/metadata.ts`, `lib/site-config.ts` | PO | Renderimi lokal përdori host-in e Netlify dhe kërkimi i repository-t nuk gjeti domain-in e vjetër. |
| Sitemap dhe robots përdorin site URL | `app/sitemap.ts`, `app/robots.ts` | PO | U verifikuan 42 URL dhe referenca e sitemap-it. |
| Hreflang `sq`, `en`, `x-default` | `lib/metadata.ts`, `components/i18n/seo.tsx` | PO | Gjenden në metadata dhe në sitemap. |
| JSON-LD | `components/i18n/seo.tsx` | PO | Dentist, Organization, WebSite, Breadcrumb, FAQ, Service dhe BlogPosting sipas faqes. |
| Tetë shërbime ekzistonin | `data/demo-content.ts` | JO | Kodi ka 7 shërbime. |
| 404 real | `app/not-found.tsx`, `app/[locale]/not-found.tsx`, `proxy.ts` | PO | Path-et e panjohura u testuan me status 404. |
| Historiku ishte vetëm Next.js | Git `648361d`, `ed01e91` | JO | Git provon fazë Vite dhe më pas migrim në Next.js App Router. |

## 5. Struktura E Headings

[REALE] Home: H1 hero, H2 shërbimet/about/team/FAQ/testimonials/si të na gjeni, H3 kartat e ekipit. About: H1, H2 seksionet kryesore dhe H3 vlerat. Services: H1, H2 trajtimet, H3 kartat. Service: H1 dhe H2 për kë është/procesi/çfarë të prisni/FAQ/shërbime të lidhura. Team, gallery, blog, artikujt, international patients, FAQ, contact dhe privacy kanë nga një H1 dhe hierarki H2 të përshtatur. Faqja 404 ka vetëm H1.

## 6. Imazhet

[REALE] Imazhet aktive përdorin `next/image`, alt tekst nga dictionaries dhe vetëm hero përdor `priority`. Imazhi OG është `public/og/og-cover-1200x630.jpg`. Derivative-t legacy në `public/images/optimized/` kanë emra të vjetër dhe nuk referohen nga route-t aktive; kërkojnë verifikim përpara heqjes.

## 7. Auditimi On-Page

| Faqja | Gjendja aktuale | Rekomandimi | Prioriteti |
| --- | --- | --- | --- |
| Home | H1 dhe metadata për klinikë dentare në Tiranë | Matni gjatësinë në versionin live | I LARTË |
| Services | H1, H2 dhe karta me lidhje | Ruani një qëllim të qartë informues | MESATAR |
| 7 shërbimet | Intro, për kë është, proces, çfarë të prisni, FAQ, lidhje dhe CTA | Rishikim klinik para përdorimit real | I LARTË |
| Blogu | 4 artikuj me autor demo, datë, lidhje shërbimi dhe BlogPosting | Vendosni proces editorial për këshilla reale | MESATAR |
| Kontakti | NAP, tel/mailto, orar, hartë lazy dhe formular | Zëvendësoni vetëm të dhënat e verifikuara | I LARTË |
| Pacientët ndërkombëtarë | Faqe e lokalizuar me proces dhe FAQ | Verifikoni çdo informacion udhëtimi | MESATAR |

## 8. Auditimi Teknik

| Elementi | Statusi | Evidenca | Prioriteti |
| --- | --- | --- | --- |
| `metadataBase` | [REALE] PASS | `app/layout.tsx` përdor `siteConfig.url` | KRITIK |
| Canonical | [REALE] PASS | `localizedMetadata()` krijon URL self-referencing | KRITIK |
| OG/Twitter | [REALE] PASS | Përdoret host-i i Netlify dhe imazh lokal | I LARTË |
| Hreflang | [REALE] PASS | `sq`, `en`, `x-default` për URL-të | I LARTË |
| Sitemap | [REALE] PASS | Të dyja gjuhët, alternates dhe lastModified | I LARTË |
| Robots | [REALE] PASS | Lidhet me sitemap dhe respekton toggle-in | I LARTË |
| JSON-LD | [REALE] PASS | Dentist, Organization, WebSite, Breadcrumb, FAQ, Service, BlogPosting | I LARTË |
| Reviews | [REALE] PASS | Nuk ka Review ose aggregateRating | I LARTË |
| 404 | [REALE] PASS | Ka faqe custom me home, services dhe contact | MESATAR |
| Imazhet | [REALE] PJESSËRISHT | `next/image` dhe priority vetëm te hero; derivative të papërdorura kanë emra të vjetër | MESATAR |
| Accessibility | [REALE] PJESSËRISHT | Labels, landmarks, focus dhe skip link janë në kod | MESATAR |
| Indexing toggle | [REALE] PASS | `false` jep noindex dhe Disallow | I LARTË |

## 9. SEO Lokal Dhe Off-Page

| Faktor | Gjendja | Rekomandimi |
| --- | --- | --- |
| NAP | [SIMULUAR] Qendërzohet në `lib/site-config.ts` | Zëvendësojeni me adresë reale |
| Google Business Profile | [KËRKON VERIFIKIM] Nuk ekziston profil real | [SIMULUAR] Krijojeni vetëm për biznes real |
| Reviews | [KËRKON VERIFIKIM] Dëshmi demo, pa schema review | Përdorni vetëm review me pëlqim real |
| Citations | [KËRKON VERIFIKIM] Nuk janë matur | Kontrolloni Google Maps dhe directory shqiptare |
| Backlinks | [KËRKON VERIFIKIM] Nuk ka të dhëna | Përdorni Ahrefs Free Backlink Checker dhe Search Console |
| Konkurrentë | [KËRKON VERIFIKIM] Nuk është bërë analizë | Përdorni kërkime Google dhe burime të dokumentuara |

## 10. Strategjia E Fjalëve Kyçe

Fjalët janë një primary keyword për faqe dhe përdoren natyrshëm.

| Fjalë kyçe SQ | Qëllimi | Faqja | Prioriteti |
| --- | --- | --- | --- |
| klinikë dentare Tiranë | Lokal komercial | `/sq` | I LARTË |
| kontroll dentar Tiranë | Shërbim lokal | `/sq/services/general-dentistry` | I LARTË |
| zbardhim i dhëmbëve Tiranë | Shërbim lokal | `/sq/services/teeth-whitening` | I LARTË |
| implante dentare Tiranë | Shërbim lokal | `/sq/services/dental-implants` | I LARTË |
| aparate dhe aligner transparente Tiranë | Shërbim lokal | `/sq/services/orthodontics-braces-aligners` | I LARTË |
| dentist për fëmijë Tiranë | Shërbim lokal | `/sq/services/pediatric-dentistry` | I LARTË |
| dentist urgjent Tiranë | Urgjencë lokale | `/sq/services/emergency-dental-care` | I LARTË |
| faseta dentare Tiranë | Estetikë lokale | `/sq/services/cosmetic-dentistry-veneers` | I LARTË |

| English keyword | Intent | Page | Priority |
| --- | --- | --- | --- |
| dental clinic Tirana | Local commercial | `/en` | HIGH |
| dental check-up Tirana | Local service | `/en/services/general-dentistry` | HIGH |
| dental implants Tirana | Local service | `/en/services/dental-implants` | HIGH |
| teeth whitening Tirana | Local service | `/en/services/teeth-whitening` | HIGH |
| braces and aligners Tirana | Local service | `/en/services/orthodontics-braces-aligners` | HIGH |
| pediatric dentist Tirana | Local service | `/en/services/pediatric-dentistry` | HIGH |
| emergency dentist Tirana | Local urgent service | `/en/services/emergency-dental-care` | HIGH |
| dental veneers Tirana | Local cosmetic service | `/en/services/cosmetic-dentistry-veneers` | HIGH |

## 11. Konkurrentët Dhe Evidencat

[KËRKON VERIFIKIM] Nuk plotësohen të dhëna të sajuara për klinika reale. Për 3–5 klinika të Tiranës plotësoni: Website structure, service pages, title/description, local SEO, Google reviews, backlinks dhe notes me `TODO_VERIFY` derisa të kontrollohen. Përdorni Ahrefs Free Backlink Checker, Search Console, Google Maps dhe search operators.

## 12. Para Dhe Pas

| Problemi | Para | Pas | Ndikimi i pritshëm |
| --- | --- | --- | --- |
| Host i pasaktë | Rrezik për URL jashtë host-it | `siteUrl` qendror në metadata, social, sitemap dhe robots | Sinjale më të qarta URL-je |
| Shërbime të holla | Karta pa informacion të plotë | 7 landing pages me proces, FAQ, pritshmëri dhe CTA | Përputhje më e mirë me intentin |
| Metadata blogu | `website` për artikujt | `article` dhe BlogPosting me autor/datë/imazh | Përfaqësim më i saktë i artikujve |
| Faqe ndërkombëtare | Ridrejtim te kontakti | Faqe e lokalizuar me FAQ dhe lidhje | Faqe e dedikuar për këtë intent |
| Orari | Një rresht i vetëm | Dy rreshta nga `siteConfig.hours` | Lexueshmëri më e mirë |
| Dokumentimi | Route-t aktuale dhe arkitektura e mëparshme ishin përshkruar pa dallim | Dokumentim i bazuar në Git dhe source, me 7 shërbime dhe faqe ndërkombëtare të lokalizuar | Audit më i besueshëm |

## 13. Checklist Ekranesh

Ruani me datë, URL dhe branch: Lighthouse mobile/desktop për v1 dhe v2; PageSpeed Insights; Rich Results Test; Schema.org Validator; sitemap; robots; hreflang në source; outline të headings në DevTools; pamje mobile; Search Console; `site:` search; rezultate Google të konkurrentëve.

## 14. Prioritete Dhe Kufizime

- Immediate: [REALE] vendosni environment variables; [KËRKON VERIFIKIM] matni Lighthouse, schema dhe crawl.
- Short-term: [SIMULUAR] rishikim editorial i artikujve; [KËRKON VERIFIKIM] GBP, citations dhe review reale.
- Long-term: [SIMULUAR] foto reale, PR lokale dhe artikuj origjinalë; [KËRKON VERIFIKIM] monitorim Search Console.

[REALE] Nuk ka biznes real, GBP, histori renditjesh, trafik, backlinks apo kredenciale të verifikuara. Formulari nuk ka backend real.

[SIMULUAR] Për t’u zëvendësuar: adresa, telefoni, email-i, harta, 4 mjekët, bio-t, imazhet, testimonials, çmimet, orari, social profiles dhe OG image.

## 15. Netlify Dhe Përfundimi

[REALE] Base directory bosh; build `npm run build`; publish `.next`.

```text
NEXT_PUBLIC_SITE_URL=https://auro-dent.netlify.app
NEXT_PUBLIC_ALLOW_INDEXING=true
```

Vendosni `false` vetëm për deploy testues. Shihni `docs/seo/netlify-setup.md`.

- ✓ App Router, route locale, canonical, hreflang, sitemap dhe robots u verifikuan në source.
- ✓ Nuk ka Review ose aggregateRating JSON-LD.
- ✓ 7 shërbime dhe 4 artikuj blogu ekzistojnë në të dyja gjuhët.
- ⚠ Lighthouse, PageSpeed, Search Console, backlinks, GBP dhe konkurrentët kërkojnë verifikim jashtë kodit.
- ○ Të dhënat reale të biznesit nuk janë dhënë.
