# TODO

Carry-over items and deviations to triage. Anything blocking phase acceptance is flagged.

## Deviations from the build prompt

- **Next.js 16, not 15.** npm latest is `16.2.4` at the time of Phase 0; the prompt was written assuming 15. App Router, `output: 'export'`, Metadata API and `next/image` API are unchanged. Approved by user before Phase 1.
- **Node 20 LTS in `.nvmrc` and `engines: ">=20"` in `package.json`.** Local dev uses Node 22.12 (also LTS). `engine-strict=false` so transitive dep `eslint-visitor-keys@5` (which wants `^22.13`) does not block install. CI pins to Node 20.18.1.
- **`next/font/google` instead of `next/font/local`.** Both self-host font files at build time (no Google Fonts CDN at runtime), satisfying the privacy intent. Convert to `next/font/local` with vendored Inter and Manrope WOFF2 before launch — both OFL-licensed.
- **Cloudflare Turnstile is the one sanctioned third-party script** beyond Plausible. Limited to `/contact`. Re-evaluate if anti-spam approach changes.
- **OG generator: satori + `@resvg/resvg-js`** instead of `@vercel/og`. Build-time only, no Vercel platform dependency.
- **No `tailwind.config.ts`.** Tailwind 4 uses CSS-first config; tokens live in `app/globals.css` under `@theme`.
- **Third tier display name is "Commercial", slug remains `business`.** Product was renamed during the PDF-driven content overhaul; the URL slug is preserved so external links don't break.
- **Commercial sells bespoke, not flat.** `pricing[0]` for Commercial is `Pricing: Bespoke quote — contact us`. ProductHero detects non-numeric prices and switches its eyebrow from "From" to "Pricing" automatically.
- **Spec sheets are print-optimised HTML, not pre-generated PDFs.** Users hit the "Print or save as PDF" button and use the browser's "Save as PDF" destination. `globals.css` `@media print` rules strip nav and footer for clean output. If real `.pdf` binaries are needed at build time, add a script using `pdfkit` or headless Puppeteer.
- **No M-KOPA or Sun King in financing partners.** Removed at the user's request — they're consumer pay-as-you-go competitors, not Precifarm partners.

## Pinned versions (Phase 0)

Locked in `package.json`:

- `next@16.2.4`, `react@19.2.5`, `react-dom@19.2.5`
- `tailwindcss@4.2.4`, `@tailwindcss/postcss@4.2.4`
- `typescript@5.7.2`, `eslint@9.17.0`, `eslint-config-next@16.2.4`
- `vitest@2.1.8`, `@playwright/test@1.49.1`, `@axe-core/playwright@4.10.1`
- `@lhci/cli@0.14.0`
- `zod@3.24.1`, `gray-matter@4.0.3`, `clsx@2.1.1`, `lucide-react@0.469.0`
- `next-mdx-remote@5.0.0` (MDX rendering for blog only)
- `satori@0.26.0`, `@resvg/resvg-js@2.6.2`
- `@formspree/react@3.0.0`

Newer minors exist for some packages but are deferred to Phase 4 polish to avoid mid-build churn.

## Placeholder assets to replace before launch

- [ ] `public/favicon.svg` — placeholder "P" mark, replace with brand mark
- [ ] `public/og-default.png` — currently only `.svg` exists; PNG render needed (Phase 4 OG generator will produce it)
- [ ] `public/illustrations/precifarm_spark.svg` — abstract placeholder
- [ ] `public/illustrations/precifarm_current.svg` — abstract placeholder
- [ ] `public/illustrations/precifarm_grid.svg` — abstract placeholder
- [ ] **Real Precifarm crew photo** for the about page "Field engineers, not subcontractors" section — current image is stock
- [ ] **Real product installation photos** for `/products/{starter,family,business}` heroes — Family has been replaced with a real-looking Kenyan home photo, Starter and Business still use the original placeholders
- [ ] Use-case photos for the home page `useCases` block — currently Unsplash, swap for real Precifarm installs when available

## Content

- [x] **Product specs and pricing aligned to Master Brief v0.9** (May 2026) — Starter 1 × 550W / 1.5 kWh / 1.5 kW hybrid @ KSh 95,000 (or KSh 5,472/mo over 24 months on Lipa Pole Pole, KSh 12,500 deposit); Family 2 × 450W (900 W expandable) / 5 kWh / 5 kW hybrid @ KSh 290,000; Commercial scalable from 5 × 550W (2.75 kWp) / 15 kWh / 10 kVA from KSh 520,000 up to 24 × 550W (13.2 kWp) / 12 kW Deye for full borehole irrigation, ~KSh 1.5m.
- [x] Sizing methodology surfaced as `/how-we-size` and inside each product page (`HonestSizing` component).
- [x] Financing partner list from the PDF surfaced as `/financing` and inside Family/Commercial pages (`FinancingPartners` component).
- [x] Commercial repositioned around irrigation as the lead use case (3 km from source, 5–45 acres) plus cold storage, milling, clinics, lodges, telecom shelters, SMEs.
- [x] `Business` → `Commercial` display rename throughout.
- [x] Footer phone, WhatsApp, and `sales@precifarm.com` aligned with the PDF's contact details.
- [ ] Real customer testimonials (per-product or in `useCases`) once the user signs off names.
- [ ] Real installation photo gallery — see "Placeholder assets" above.

## Configuration to fill in

- [ ] Three Formspree endpoint IDs (customer, partner, press)
- [ ] Cloudflare Turnstile site key
- [ ] Plausible domain confirmed: `precifarm.com`
- [ ] Standardise contact email across the site — currently `sales@precifarm.com` (footer, contact, products), `hello@precifarm.com` (about, blog, careers), `careers@precifarm.com` (careers form), `privacy@precifarm.com` (privacy). Decide which inboxes actually exist.

## Deployment operations (Hostinger)

- [ ] **Disable hPanel Git auto-deploy** on precifarm.com. It clones the repo SOURCE into `/domains/precifarm.com/public_html/` and overwrites the static build, which is what caused the 403 on 2026-05-15. hPanel → Files → Git → precifarm.com → remove or disable. Until disabled, it'll fight every `pnpm ship`.
- [ ] **Resolve GitHub Actions billing lock** at <https://github.com/settings/billing/summary>. Public-repo Actions is free but GitHub requires a payment method on file. Once cleared, `deploy.yml` works end-to-end on push to main as a parallel CD path to `pnpm ship`.
- [ ] **Rotate the FTP password** in hPanel (Files → FTP Accounts → Change FTP password). The current password was shared in chat on 2026-05-15. After rotating: update `.env.ftp.local` locally and run `gh secret set HOSTINGER_FTP_PASSWORD --repo davidgivondoh/precifarm-web` to refresh the GitHub secret.
- [ ] **Clean repo source files from `/domains/precifarm.com/public_html/`**. The directory now contains both our static export AND leftover source files (package.json, README.md, .git, src/, etc.) from the hPanel Git auto-deploy. Once #1 above is disabled, manually delete `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `eslint.config.mjs`, `next.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `next-sitemap.config.mjs`, `postcss.config.mjs`, `lighthouserc.cjs`, `.editorconfig`, `.gitignore`, `.npmrc`, `.nvmrc`, `.prettierignore`, `.prettierrc.cjs`, `README.md`, `TODO.md`, `.env.example`, `docs/`, `scripts/`, `src/`, `.git/`, `.github/`, `public/` from the webroot — they're publicly downloadable otherwise.

## Bundle / performance

- React 19 runtime is the floor for the home-page bundle (~80 KB gzip including hydration).
- Lighthouse Performance budget set to 90 (not 95) per the prompt's Next.js note.
- `unused-javascript` Lighthouse audit set to `warn` not `error` — Next.js framework chunks include some unused code that's hard to eliminate without ejecting.

## Bridge to old precifarm.com (mostly addressed)

The site is a **pivot** of an existing precifarm.com property. Canonical content now flows from the Master Brief v0.9 (May 2026) + the Neura Pod Master Document + the Technical White Paper.

- [x] Founders / leadership named on /about (David Givondo Lead Engineer EBK B25264, Wycliffe Wabaye CTO, Amon Kipchirchir Head of Operations).
- [x] Founding date corrected to August 2025 throughout.
- [x] Three-pillar positioning (Neura Pod / Lipa Pole Pole / BESS consultancy & EPC) surfaced on home and about.
- [x] "PreciSense" brand retired; site uses "data layer" terminology per Master Brief v0.9 changelog.
- [x] Pricing aligned to Master Brief (95k / 290k / 520k) — see Content section above.
- [ ] Real customer testimonials, named installations, partner logos — pending sign-off from the customers/partners themselves.
- [ ] Pre-pivot redirects: any old precifarm.com routes that should 301 → new product slugs.

## Open questions

- Should `/style-guide` ship as a build artefact gated by basic auth on Cloudflare, or stay pure dev-only? Currently the latter.
- RSS feed scope: full body or excerpt only? Default to excerpt + link.
- Blog category filter UI: query-param links (current plan, no JS) or progressive client filtering?
- **Pre-generated PDF spec sheets.** Current implementation is print-to-PDF in the browser. If sales/marketing want literal `.pdf` files to email, add `pdfkit`-based generation in a `scripts/` task and emit to `public/specs/`.
- **Lender-ready document export per Commercial deal.** PDF mentions "BOM and EPRA compliance documents banks require" — should a per-customer document pack be generated from the site, or is it always hand-prepared by the engineering team?
