import { z } from 'zod';

export const productSchema = z.object({
  name: z.string(),
  slug: z.enum(['starter', 'family', 'business']),
  tagline: z.string(),
  headline: z.string(),
  illustration: z.string(),
  accentColor: z.enum(['starter', 'family', 'business']),
  forWhom: z.array(z.string()).min(1),
  components: z
    .array(
      z.object({
        name: z.string(),
        spec: z.string(),
      }),
    )
    .min(1),
  capabilityHeaders: z.array(z.string()).min(1),
  capabilities: z
    .array(
      z.object({
        task: z.string(),
        tiers: z.array(z.string()),
      }),
    )
    .min(1),
  journey: z.object({
    acquisition: z.string(),
    daily: z.string(),
    faults: z.string(),
    yearOverYear: z.string(),
  }),
  pricing: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .min(1),
  faq: z
    .array(
      z.object({
        q: z.string(),
        a: z.string(),
      }),
    )
    .min(1),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type Product = z.infer<typeof productSchema>;

export const blogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  publishedAt: z.string(),
  category: z.string(),
  author: z.string(),
  cover: z.string().optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export type BlogPostFrontmatter = z.infer<typeof blogPostSchema>;

export const sitePageSchema = z.object({
  title: z.string(),
  description: z.string(),
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  blocks: z.record(z.string(), z.unknown()).optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export type SitePage = z.infer<typeof sitePageSchema>;

// Home page block payloads — the home page renders these in fixed order.
export const homePageSchema = z.object({
  title: z.string(),
  description: z.string(),
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    subhead: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }),
  }),
  partners: z.object({
    label: z.string(),
    items: z.array(z.object({ name: z.string() })).min(1),
  }),
  productCards: z.array(
    z.object({
      slug: z.enum(['starter', 'family', 'business']),
      name: z.string(),
      tagline: z.string(),
      blurb: z.string(),
      price: z.string(),
      monthly: z.string().optional(),
      financingNote: z.string().optional(),
    }),
  ),
  whyOnePlatform: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    items: z
      .array(
        z.object({
          icon: z.string(),
          title: z.string(),
          body: z.string(),
        }),
      )
      .min(2)
      .max(5),
  }),
  howWeWork: z.object({
    heading: z.string(),
    intro: z.string(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
          icon: z.string(),
          image: z.string(),
          imageAlt: z.string(),
        }),
      )
      .length(4),
  }),
  impact: z.object({
    heading: z.string(),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .min(1),
  }),
  useCases: z.object({
    heading: z.string(),
    intro: z.string().optional(),
    items: z
      .array(
        z.object({
          sector: z.string(),
          package: z.enum(['Starter', 'Family', 'Commercial']),
          packageHref: z.string(),
          title: z.string(),
          body: z.string(),
          image: z.string(),
          imageAlt: z.string(),
        }),
      )
      .length(3),
  }),
  closingCta: z.object({
    headline: z.string(),
    primaryCta: z.object({ label: z.string(), href: z.string() }),
    secondaryCta: z.object({ label: z.string(), href: z.string() }),
  }),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export type HomePage = z.infer<typeof homePageSchema>;
