# precifarm-web

Marketing website for [Precifarm](https://precifarm.com) — distributed solar energy in Kenya.

Three honestly-engineered packages, one Neura platform: Starter (single-room essentials), Family (off-grid 2- to 3-bedroom homes), and Commercial (bespoke borehole irrigation, cold storage, clinics, and SME loads).

## Stack

- Next.js 16 (App Router) + React 19, static export (`output: 'export'`)
- TypeScript strict + `noUncheckedIndexedAccess` + `noImplicitOverride`
- Tailwind CSS 4 (CSS-first config in `app/globals.css`, no `tailwind.config.ts`)
- Custom MD/MDX content loader: `gray-matter` + Zod (no Contentlayer)
- Lucide icons (`lucide-react`)
- Hosted on Cloudflare Pages, DNS on Cloudflare
- Plausible analytics, Formspree forms, Cloudflare Turnstile
- pnpm, Node 20 LTS

## Setup

```bash
pnpm install
cp .env.example .env.local   # fill in values
pnpm dev                     # http://localhost:3000
```

## Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `pnpm dev`          | Dev server with HMR            |
| `pnpm build`        | Static export to `./out`       |
| `pnpm export:serve` | Serve `./out` locally on :4173 |
| `pnpm typecheck`    | `tsc --noEmit`                 |
| `pnpm lint`         | ESLint + Prettier check        |
| `pnpm lint:fix`     | Auto-fix                       |
| `pnpm test`         | Vitest unit tests              |
| `pnpm test:e2e`     | Playwright e2e + axe           |
| `pnpm lhci`         | Lighthouse CI against `./out`  |

## Repository layout

```
content/
  products/{starter,family,business}.md   # product specs, pricing, FAQ
  site/{home,about,careers}.md            # page-level content
  blog/<slug>.mdx                         # blog posts
docs/                                     # content spec
public/
  images/products/                        # product hero images (PNG)
  images/home/                            # home hero image
  illustrations/, favicon.svg, og-default # brand assets
src/app/
  page.tsx                                # /
  about/, careers/, contact/, blog/       # core pages
  how-we-size/                            # methodology page
  financing/                              # financing partners + worked examples
  products/
    page.tsx                              # /products listing + comparison
    {starter,family,business}/page.tsx    # product detail
    {starter,family,business}/spec/       # printable spec sheets
src/components/
  home/                                   # Hero, ProductCards, UseCases, etc.
  product/                                # ProductHero, WhatYouGet, PricingTable, etc.
  contact/, footer/, nav/, shared/
src/lib/                                  # content loader, Zod schemas, SEO helpers
src/tests/                                # unit (vitest) and e2e (playwright)
.github/                                  # CI workflows
```

## Routes

| Route                            | Description                                                    |
| -------------------------------- | -------------------------------------------------------------- |
| `/`                              | Home — hero, product cards, why-one-platform, journey, portfolio |
| `/products`                      | Listing + side-by-side comparison table                        |
| `/products/starter`              | Starter detail — `KSh 137,000` cash or 24-month plan           |
| `/products/family`               | Family detail — `KSh 373,000` cash, customer-arranged financing |
| `/products/business`             | Commercial detail — bespoke quote, irrigation + SME loads      |
| `/products/{slug}/spec`          | Printable spec sheet (browser → Save as PDF)                   |
| `/how-we-size`                   | Sizing methodology, the math, component cost basis             |
| `/financing`                     | Six bank partners, three worked examples, next-steps           |
| `/about`                         | About, principles, cities, sectors                             |
| `/careers`                       | Roles by department, benefits, hiring process                  |
| `/contact`                       | Form + email + WhatsApp + phone                                |
| `/blog`, `/blog/[slug]`          | Blog index + post detail                                       |
| `/privacy`                       | Privacy policy                                                 |

The third tier's display name is **Precifarm Commercial** but the slug is preserved as `business` so external links don't break.

## Content model

All page content lives in markdown frontmatter and is validated by Zod schemas in `src/lib/content-schemas.ts`. Content fails the build if it doesn't match the schema.

### Products (`content/products/{slug}.md`)

```yaml
name: Precifarm Family
slug: family
tagline: Zero electricity bills. Total freedom.
headline: A 4-panel, 5 kWh Neura Pod system that takes a 2- to 3-bedroom home off the grid.
illustration: /illustrations/precifarm_family.png
accentColor: family
forWhom: [...]
components: [{ name, spec }, ...]
capabilities: [{ task, tiers }, ...]
journey: { acquisition, daily, faults, yearOverYear }
pricing: [{ label, value }, ...]   # first row is treated as the headline price
faq: [{ q, a }, ...]
seo: { title, description }
```

The pricing array is rendered as-is. For Commercial, the first row is `Pricing: Bespoke quote — contact us`; the hero detects non-numeric values and switches its eyebrow from "From" to "Pricing" automatically.

### Home (`content/site/home.md`)

`productCards` items support `price`, `monthly`, and `financingNote` to keep the blurb short and the price block visually distinct.

### Pages (`content/site/{about,careers}.md`)

Body is parsed by a small inline markdown helper (`parseSimpleMarkdown` in the page) supporting paragraphs, `## h2` headings, `![alt](url)` images, and `[label](url)` inline links. Heavier MDX is reserved for the blog.

## Adding a blog post

1. Create `content/blog/<slug>.mdx`
2. Add frontmatter matching `blogPostSchema` in `src/lib/content-schemas.ts`
3. Commit. The route `/blog/<slug>` is generated by `generateStaticParams` at build time.

## Adding or editing a product

1. Edit `content/products/{slug}.md` — schema is validated at build time
2. Update the per-slug `accent` map in `src/app/products/page.tsx` if changing capacity / tier label / image
3. Update `sizingByTier` in `src/components/home/ProductCards.tsx` if capacity changed
4. Spec sheet (`/products/{slug}/spec`) auto-cascades from the .md

## Spec sheets (printable PDFs)

Each product detail page has a **Spec sheet (PDF)** link in its pricing card. The link points to `/products/{slug}/spec/` — a print-optimised standalone page with a brand-clean header, BOM, sizing rationale, pricing, and compliance/warranty footer.

`globals.css` includes a `@media print` block that hides the global nav, footer, and skip-to-content link, so the printed page (and any browser-saved PDF) looks like a real spec document. The "Print or save as PDF" button is a tiny `'use client'` component (`PrintButton`) wrapping `window.print()`.

The site is a fully static export — no server route generates real PDF binaries. If pre-generated `.pdf` files are needed at deploy time, add a build-time script using `pdfkit` or headless Puppeteer that crawls `/products/*/spec/`.

## Financing model

Precifarm sells Family and Commercial **cash-only**. Bank financing for those tiers is customer-arranged with one of six partners (KCB Clean Energy, KCB SME, Stanbic Solar PV, Co-op CO-OP-A-MAJI, Equity Equiloan, SACCOs). The `/financing` page lists partners grouped by buyer type, with a worked example per tier.

Starter is the only package with a Precifarm-offered payment plan: 20% deposit + KSh 5,472/month over 24 months at 18% reducing balance, collected via M-Pesa.

## Environment variables

All public — exposed to the browser.

| Variable                         | Required | Used by                              |
| -------------------------------- | -------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`           | yes      | canonical URLs, sitemap, OG metadata |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`   | yes      | analytics script (only loads if set) |
| `NEXT_PUBLIC_FORMSPREE_CUSTOMER` | yes      | contact form (customer)              |
| `NEXT_PUBLIC_FORMSPREE_PARTNER`  | yes      | contact form (partner)               |
| `NEXT_PUBLIC_FORMSPREE_PRESS`    | yes      | contact form (press)                 |
| `NEXT_PUBLIC_FORMSPREE_CAREERS`  | yes      | careers application form (resume + cover letter) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | optional | spam protection on contact form      |

No server-only secrets — the site has no server runtime.

## Style guide

`/style-guide` (dev only — returns 404 in production) shows tokens and shared components.

## Validation hooks (manual)

- OpenGraph: paste a built URL into <https://cards-dev.twitter.com/validator>
- Schema.org: paste into <https://validator.schema.org>
- RSS: <https://validator.w3.org/feed/>

## Deploy (Cloudflare Pages)

1. Connect the GitHub repo
2. Build command: `pnpm build`
3. Build output directory: `out`
4. Node version: 20
5. Add the env vars from the table above

## Phase status

- **Phase 0 — Plan and validate.** Done.
- **Phase 1 — Foundation.** Done.
- **Phase 2 — Home page.** Done — Hero, ProductCards (with price block), WhyOnePlatform, HowWeWork (4 steps with images and icons), ImpactStats, UseCases (portfolio framing), PartnerStrip, ClosingCta, SiteFooter (dark theme with WhatsApp).
- **Phase 3 — Product and supporting pages.** Done — three product detail pages with shared component pipeline (ProductHero, WhoItIsFor, BuiltForWorkloads (Commercial-only), WhatYouGet, WhatYouCanDo, HonestSizing, CustomerJourney, PricingTable, FinancingPartners, ProductFaq), plus listing page with comparison table, plus `/how-we-size`, `/financing`, and printable spec sheets per product.
- **Phase 4 — Blog, polish, launch.** In progress.

See `TODO.md` for outstanding items.
