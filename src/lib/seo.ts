import type { Metadata } from 'next';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://precifarm.com';
export const siteName = 'Precifarm';
export const siteLegalName = 'Precifarm AI Ltd';
export const sitePhone = '+254794702768';
export const siteEmail = 'sales@precifarm.com';
export const siteCities: ReadonlyArray<string> = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Eldoret',
  'Kitui',
  'Nakuru',
];

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function pageMetadata(input: PageMetaInput): Metadata {
  const url = new URL(input.path, siteUrl).toString();
  const ogImage = input.ogImage ?? '/og-default.png';

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName,
      title: input.title,
      description: input.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [ogImage],
    },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
  };
}

/**
 * Combined Organization + LocalBusiness JSON-LD.
 * Emitted on the home page (src/app/page.tsx).
 */
export function organisationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    legalName: siteLegalName,
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    image: `${siteUrl}/og-default.png`,
    description:
      'Distributed solar energy for Kenya — designed, deployed, and operated. Three honestly-engineered packages on one Neura platform.',
    telephone: sitePhone,
    email: siteEmail,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressRegion: 'Nairobi County',
      addressCountry: 'KE',
    },
    areaServed: siteCities.map((city) => ({ '@type': 'City', name: city })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: sitePhone,
        email: siteEmail,
        contactType: 'sales',
        areaServed: 'KE',
        availableLanguage: ['English', 'Swahili'],
      },
    ],
    sameAs: [],
  };
}

/**
 * WebSite JSON-LD — emitted on the home page.
 * Helps Google understand the site name and locale.
 */
export function webSiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteName,
    inLanguage: 'en-KE',
    publisher: { '@id': `${siteUrl}/#organization` },
  };
}

/**
 * BreadcrumbList JSON-LD — emit on every nested page.
 */
export function breadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

/**
 * FAQPage JSON-LD — wraps an array of {q, a} pairs.
 * Unlocks rich-result FAQ snippets in Google.
 */
export function faqJsonLd(
  faqs: ReadonlyArray<{ q: string; a: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/**
 * Product JSON-LD with optional Offer.
 * For Commercial (bespoke pricing), pass no `price` and the offers field is omitted.
 */
export function productJsonLd(input: {
  name: string;
  description: string;
  slug: string;
  image: string;
  price?: { value: number; currency: 'KES' };
  category?: string;
}): Record<string, unknown> {
  const url = new URL(`/products/${input.slug}/`, siteUrl).toString();
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: new URL(input.image, siteUrl).toString(),
    url,
    sku: `precifarm-${input.slug}`,
    category: input.category ?? 'Solar energy systems',
    brand: { '@type': 'Brand', name: siteName },
    manufacturer: { '@id': `${siteUrl}/#organization` },
  };
  if (input.price) {
    ld.offers = {
      '@type': 'Offer',
      price: input.price.value,
      priceCurrency: input.price.currency,
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@id': `${siteUrl}/#organization` },
      areaServed: 'KE',
    };
  } else {
    ld.offers = {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url,
      seller: { '@id': `${siteUrl}/#organization` },
      areaServed: 'KE',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'KES',
        valueAddedTaxIncluded: true,
        description: 'Bespoke quote — confirmed in writing after a site survey.',
      },
    };
  }
  return ld;
}

/**
 * ItemList of products — emit on /products listing page.
 */
export function productListJsonLd(
  products: ReadonlyArray<{ name: string; slug: string; description: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: new URL(`/products/${p.slug}/`, siteUrl).toString(),
      name: p.name,
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: new URL(`/blog/${input.slug}/`, siteUrl).toString(),
    datePublished: input.publishedAt,
    author: { '@type': 'Organization', name: input.author },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/favicon.svg` },
    },
  };
}

/**
 * Helper to extract the first numeric KES price from a product's pricing array.
 * Returns null if the leading entry is a non-numeric value (e.g. "Bespoke quote — contact us").
 */
export function extractPrice(
  pricing: ReadonlyArray<{ label: string; value: string }>,
): number | null {
  for (const row of pricing) {
    if (!/cash|from|price/i.test(row.label) && !/^pricing$/i.test(row.label)) continue;
    const match = row.value.match(/(\d{1,3}(?:[,.]\d{3})*)/);
    if (!match) continue;
    const num = Number(match[1]?.replace(/[,.]/g, ''));
    if (Number.isFinite(num) && num > 0) return num;
  }
  return null;
}
