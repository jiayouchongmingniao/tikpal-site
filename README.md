# Tikpal — Brand Website

Static marketing site for Tikpal (Voice / App / Room). Built with [Astro](https://astro.build) — zero framework runtime, all motion in pure CSS, copy separated into `src/content/*.json`.

## Requirements

- Node.js 22+ (tested with v22.22.1)
- npm

## Commands

```sh
npm install        # install dependencies
npm run dev        # dev server at http://localhost:4321
npm run build      # static build into dist/
npm run preview    # serve the built site locally
```

## Structure

```
src/
  layouts/BaseLayout.astro    # head, SEO/OG meta, header + footer slots
  styles/tokens.css           # color / type / spacing design tokens
  styles/base.css             # resets, typography, shared primitives
  styles/animations.css       # keyframes + reveal + reduced-motion fallbacks
  content/*.json              # all page copy (15 files, English only)
  components/Header.astro     # fixed translucent nav + mobile menu
  components/Footer.astro
  components/sections/01-Hero.astro … 13-BuySection.astro
  scripts/reveal.ts           # ~30-line IntersectionObserver scroll reveal
  pages/index.astro           # composes the 13 sections in order
public/
  _headers                    # long-term cache for hashed assets
  _redirects                  # placeholder redirects (/voice, /app)
  favicon.svg
```

## Deployment (Cloudflare Pages)

The site is configured for Cloudflare Pages via `wrangler.jsonc`
(`pages_build_output_dir: "dist"`).

CI (`.github/workflows/ci.yml`) runs `npm ci && npm run build` on every PR.

To deploy manually:

```sh
npm run build
npx wrangler pages deploy dist --project-name tikpal-site
```

Custom headers (`public/_headers`) and redirects (`public/_redirects`) are
picked up automatically by Cloudflare Pages from the build output.
