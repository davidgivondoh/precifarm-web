import { getProduct } from '@/lib/content';
import { ProductHero } from './ProductHero';
import { WhoItIsFor } from './WhoItIsFor';
import { BuiltForWorkloads } from './BuiltForWorkloads';
import { WhatYouGet } from './WhatYouGet';
import { WhatYouCanDo } from './WhatYouCanDo';
import { HonestSizing } from './HonestSizing';
import { CustomerJourney } from './CustomerJourney';
import { PricingTable } from './PricingTable';
import { FinancingPartners } from './FinancingPartners';
import { ProductFaq } from './ProductFaq';
import { ClosingCta } from '@/components/home/ClosingCta';
import { breadcrumbJsonLd, extractPrice, faqJsonLd, productJsonLd } from '@/lib/seo';

export async function ProductPage({
  slug,
}: {
  slug: 'starter' | 'family' | 'business';
}): Promise<React.ReactElement> {
  const product = await getProduct(slug);
  const priceValue = extractPrice(product.pricing);
  const productLd = productJsonLd({
    name: product.name,
    description: product.seo.description,
    slug: product.slug,
    image: product.illustration,
    price: priceValue ? { value: priceValue, currency: 'KES' } : undefined,
  });
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products/' },
    { name: product.name, path: `/products/${product.slug}/` },
  ]);
  const faqLd = faqJsonLd(product.faq);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [productLd, breadcrumbLd, faqLd],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <ProductHero product={product} />
      <WhoItIsFor product={product} />
      {product.slug === 'business' && <BuiltForWorkloads />}
      <WhatYouGet product={product} />
      <WhatYouCanDo product={product} />
      <HonestSizing product={product} />
      <CustomerJourney product={product} />
      <PricingTable product={product} />
      {product.slug !== 'starter' && <FinancingPartners slug={product.slug} />}
      <ProductFaq product={product} />
      <ClosingCta
        data={{
          headline: `Ready to put ${product.name} to work?`,
          primaryCta: { label: 'Talk to us', href: '/contact' },
          secondaryCta: { label: 'Compare products', href: '/products' },
        }}
      />
    </>
  );
}
