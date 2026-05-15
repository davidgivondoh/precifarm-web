# precifarm-web

Marketing website for [Precifarm](https://precifarm.com) — distributed solar energy in Kenya.

Three honestly-engineered packages, one Neura Pod platform: Starter (single-room essentials), Family (off-grid 2- to 3-bedroom homes), and Commercial (scalable borehole irrigation, cold storage, clinics, and SME loads). Pricing aligned to Master Brief v0.9.

## Stack

- Next.js 16 (App Router) + React 19, static export (`output: 'export'`)
- TypeScript strict + `noUncheckedIndexedAccess` + `noImplicitOverride`
- Tailwind CSS 4 (CSS-first config in `app/globals.css`, no `tailwind.config.ts`)
- Custom MD/MDX content loader: `gray-matter` + Zod (no Contentlayer)
- Lucide icons (`lucide-react`)
- Hosted on Hostinger (static export served via shared hosting); DNS managed at registrar
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
| `pnpm ship`         | `pnpm build` then FTPS-mirror `./out` to Hostinger via `scripts/ftp-deploy.py`. Reads credentials from gitignored `.env.ftp.local`. |

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
| `/products/starter`              | Starter detail — `KSh 95,000` cash or Lipa Pole Pole (24 mo, KSh 5,472/mo) |
| `/products/family`               | Family detail — `KSh 290,000` cash, customer-arranged bank financing |
| `/products/business`             | Commercial detail — from `KSh 520,000` (entry) up to ~`KSh 1.5m` full irrigation |
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
headline: A 2-panel, 5 kWh Neura Pod system that takes a 2- to 3-bedroom home off the grid.
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

Starter is the only package with a Precifarm-offered payment plan — **Lipa Pole Pole**: KSh 12,500 deposit + KSh 5,472/month over 24 months, collected via M-Pesa standing order. Customer owns the system at end of term.

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

## Deploy (Hostinger, static)

The site builds to a static `out/` directory and is served from Hostinger shared hosting. Three deployment paths, by automation level:

### Option A — GitHub Actions → FTP/SSH (recommended)

Extend `.github/workflows/ci.yml` with a deploy job that uploads `out/` to Hostinger over FTP after the `build` job succeeds. Add these secrets in **GitHub Settings → Secrets and variables → Actions**:

| Secret | Source (hPanel → Files → FTP Accounts) |
| --- | --- |
| `HOSTINGER_FTP_HOST` | FTP hostname (e.g. `ftp.precifarm.com` or the Hostinger-issued host) |
| `HOSTINGER_FTP_USER` | FTP username for the precifarm.com domain |
| `HOSTINGER_FTP_PASSWORD` | FTP password |
| `HOSTINGER_FTP_REMOTE_DIR` | Remote directory (usually `public_html/` or `domains/precifarm.com/public_html/`) |

The deploy step uses `SamKirkland/FTP-Deploy-Action` to mirror `out/` to the remote directory. Every push to `main` that passes typecheck, lint, tests, and build will publish.

### Option B — Hostinger Git auto-deploy (limited)

hPanel → Files → Git can pull this repo on push, but Hostinger does **not** run `pnpm build` on its servers. Using this would require committing the built `out/` to the repo (currently gitignored), which is messy. Skip unless Option A is blocked.

### Option C — Manual upload (one-off / fallback)

```bash
pnpm build               # produces ./out
# Upload contents of ./out (not the folder itself) to public_html/ via:
#   - Hostinger File Manager (hPanel → Files → File Manager)
#   - FileZilla / Cyberduck over FTP
#   - rsync over SSH if your plan includes it
```

### Option D — Local FTPS deploy (`pnpm ship`)

A scripted alternative to Option A when GitHub Actions is unavailable (billing lock, runner quota, offline). Runs `pnpm build` then mirrors `./out` to Hostinger over FTPS via `scripts/ftp-deploy.py` (Python 3, stdlib only). Reads credentials from a **gitignored** `.env.ftp.local` at the repo root:

```
HOSTINGER_FTP_HOST=72.60.93.246
HOSTINGER_FTP_USER=u373428074
HOSTINGER_FTP_PASSWORD=<your-ftp-password>
```

Then:

```bash
pnpm ship                # builds + uploads (~2 min total, incremental on subsequent runs)
```

The script handles connection drops with retry-and-resume (skips files whose remote size already matches local), so re-running after a failure picks up where it left off rather than re-uploading everything. To debug the FTP layout, run `python scripts/ftp-inspect.py` — lists landing directory + parent. (Script is named `ship` rather than `deploy` because `pnpm deploy` is a reserved built-in command for workspace deployment.)

Add the env vars from the table above as build-time environment variables either in the GitHub Actions workflow (`env:` block) or in a local `.env.local` if building manually.

### Deployment runbook (lessons learned 2026-05-14/15)

Hard-won facts about this Hostinger plan. Read this before changing the deploy setup.

**The real webroot is `/domains/precifarm.com/public_html/`.** Not `/public_html/` (that contains an unrelated older farming site from a previous tenant of the primary user dir), and not `/domains/precifarm.com/` (Hostinger placed a `DO_NOT_UPLOAD_HERE` sentinel file at that level).

**Two FTP accounts exist with different chroots:**

| FTP user | Chroot / landing dir | Where uploading to `./` lands |
| --- | --- | --- |
| `u373428074` (primary) | `/home/u373428074/` (with `public_html` and `domains/` underneath) | `/home/u373428074/public_html/` — the old farming site, **not** precifarm.com |
| `u373428074.admin` (scoped) | `/home/u373428074/domains/precifarm.com/` (chrooted) | `/home/u373428074/domains/precifarm.com/public_html/` — **the real webroot** |

Either works as long as `REMOTE_TARGET_DIR` (or `server-dir` in CI) is set to land in `/home/u373428074/domains/precifarm.com/public_html/`:

- For primary `u373428074`: set `REMOTE_TARGET_DIR=/domains/precifarm.com/public_html/`
- For scoped `.admin`: set `REMOTE_TARGET_DIR=/public_html/` (that's its landing dir; equivalent path)

**The hPanel Git auto-deploy is a trap on this domain.** It clones the repo *source* into `/domains/precifarm.com/public_html/`, which is the same directory the FTP deploy targets. The two fight each other — every Git auto-deploy overwrites the static build with `package.json`, `src/`, `README.md`, `.git/`, etc., and the site returns 403 (no `index.html` at webroot). **Disable Hostinger's Git auto-deploy** before relying on `pnpm ship` or the GitHub Actions deploy. (See `TODO.md`.)

**The standard deploy command is `pnpm ship`.** It runs `pnpm build && python scripts/ftp-deploy.py`. The script reads credentials from `.env.ftp.local` (gitignored), uses FTPS over port 21 with TLS, and handles connection drops with retry-and-resume — re-running after a partial upload picks up where it left off instead of re-uploading everything.

**Troubleshooting**

| Symptom | Cause | Fix |
| --- | --- | --- |
| `pnpm ship` runs but precifarm.com still shows old content | Files landed in the wrong directory | Check `REMOTE_TARGET_DIR` in `.env.ftp.local`. Should be `/domains/precifarm.com/public_html/` |
| precifarm.com returns 403 Forbidden after a deploy | hPanel Git auto-deploy overwrote the static build with source files | Disable Hostinger Git auto-deploy (TODO #1) and re-run `pnpm ship` |
| `ftplib.error_perm: 550 SIZE not allowed in ASCII mode` | Cosmetic FTP server quirk in `ftp-inspect.py` size check | Harmless — only affects the inspect script's optional size probe |
| Upload terminates with `EOFError` mid-transfer | Hostinger FTP idle timeout | Re-run `pnpm ship` — `ftp-deploy.py` skips already-uploaded files and continues from the failure point |
| Bash on Windows mangles `REMOTE_TARGET_DIR=/...` to a Windows path like `C:/Program Files/Git/` | MSYS path conversion | Prefix the command with `MSYS_NO_PATHCONV=1` or rely on `.env.ftp.local` (preferred — bypasses shell expansion entirely) |
| GitHub Actions runs all show `startup_failure` with no logs | Account-level GitHub billing lock | <https://github.com/settings/billing/summary>. Even free public-repo Actions needs a payment method on file. |

## Phase status

- **Phase 0 — Plan and validate.** Done.
- **Phase 1 — Foundation.** Done.
- **Phase 2 — Home page.** Done — Hero, ProductCards (with price block), WhyOnePlatform, HowWeWork (4 steps with images and icons), ImpactStats, UseCases (portfolio framing), PartnerStrip, ClosingCta, SiteFooter (dark theme with WhatsApp).
- **Phase 3 — Product and supporting pages.** Done — three product detail pages with shared component pipeline (ProductHero, WhoItIsFor, BuiltForWorkloads (Commercial-only), WhatYouGet, WhatYouCanDo, HonestSizing, CustomerJourney, PricingTable, FinancingPartners, ProductFaq), plus listing page with comparison table, plus `/how-we-size`, `/financing`, and printable spec sheets per product.
- **Phase 4 — Blog, polish, launch.** In progress.

See `TODO.md` for outstanding items.
