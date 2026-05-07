import { describe, expect, it } from 'vitest';
import { organisationJsonLd, pageMetadata, siteUrl } from '@/lib/seo';

describe('seo helpers', () => {
  it('builds page metadata with absolute canonical URL', () => {
    const meta = pageMetadata({
      title: 'Test',
      description: 'Test desc',
      path: '/about',
    });
    expect(meta.alternates?.canonical).toBe(`${siteUrl}/about`);
    expect(meta.openGraph?.title).toBe('Test');
  });

  it('emits an Organization JSON-LD structure', () => {
    const ld = organisationJsonLd();
    expect(ld['@type']).toBe('Organization');
    expect(ld['name']).toBe('Precifarm');
  });
});
