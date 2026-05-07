# Precifarm content spec

> **PLACEHOLDER.** This file is required by `<project_context>` of the build prompt.
> Replace with the actual `precifarm_website_spec_v2.md` before Phase 2 acceptance.
>
> The Phase 1 scaffold ships with structurally-valid placeholder content in
> `/content/{products,blog,site}` so the loader and Zod schemas compile and validate.
> Real copy goes here, then is propagated into the markdown files.

## Products

Three packages: Starter (KSh 95,000), Family (KSh 290,000), Business (KSh 520,000).
See `/src/lib/content-schemas.ts` for the exact required frontmatter shape.

## Pages

- `/` (home, eight blocks)
- `/products/starter`, `/products/family`, `/products/business`
- `/platform`
- `/about`, `/careers`, `/contact`, `/privacy`
- `/blog`, `/blog/[slug]`

## Brand voice

See `<brand_voice>` section of the build prompt — short sentences, sentence case,
no em dashes, no marketing adjectives, customer-first verbs.
