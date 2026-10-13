# Netlify setup

## Site settings

- Branch to deploy: `main`
- Base directory: leave empty because `package.json` is at the repository root
- Build command: `npm run build`
- Publish directory: `.next`
- Functions directory: leave empty unless serverless functions are added later

## Environment variables

Set these in **Site configuration -> Environment variables** for the production context:

| Variable | Value | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://auro-dent.netlify.app` | Canonical URLs, Open Graph URLs, hreflang and sitemap URLs |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` | Allows indexing metadata and crawling in the course deployment |

The application defaults to the Netlify URL when `NEXT_PUBLIC_SITE_URL` is not set. Set it
explicitly in Netlify so preview and production configuration remain easy to audit.

To prevent indexing while testing, set `NEXT_PUBLIC_ALLOW_INDEXING=false` and trigger a new
deploy. The pages will emit `noindex,nofollow` and `robots.txt` will disallow crawling. Set it
back to `true` before the public course deployment.

After changing environment variables, use **Deploys -> Trigger deploy -> Clear cache and deploy
site** so the generated metadata is rebuilt.

## Verification

After deployment, check:

- `https://auro-dent.netlify.app/robots.txt`
- `https://auro-dent.netlify.app/sitemap.xml`
- One Albanian and one English page for self-referencing canonical and hreflang tags
- The Netlify deploy log for `npm run build` completing successfully
