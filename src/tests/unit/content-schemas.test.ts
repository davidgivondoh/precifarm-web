import { describe, expect, it } from 'vitest';
import { productSchema } from '@/lib/content-schemas';

const validProduct = {
  name: 'Precifarm Starter',
  slug: 'starter',
  tagline: 'Independence from blackouts.',
  headline: 'Solar that keeps your essentials on.',
  illustration: '/illustrations/starter.svg',
  accentColor: 'starter',
  forWhom: ['Renters'],
  components: [{ name: 'Panel', spec: '550 W' }],
  capabilityHeaders: ['Task', 'Starter'],
  capabilities: [{ task: 'Light a room', tiers: ['Yes'] }],
  journey: {
    acquisition: 'a',
    daily: 'b',
    faults: 'c',
    yearOverYear: 'd',
  },
  pricing: [{ label: 'Cash price', value: 'KSh 95,000' }],
  faq: [{ q: 'How long?', a: 'One day.' }],
  seo: { title: 'Starter', description: 'A 550 W system.' },
};

describe('productSchema', () => {
  it('accepts a structurally valid product', () => {
    expect(productSchema.parse(validProduct).name).toBe('Precifarm Starter');
  });

  it('rejects unknown slug values', () => {
    const bad = { ...validProduct, slug: 'lite' };
    expect(productSchema.safeParse(bad).success).toBe(false);
  });

  it('requires at least one FAQ', () => {
    const bad = { ...validProduct, faq: [] };
    expect(productSchema.safeParse(bad).success).toBe(false);
  });
});
