import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { PartnerStrip } from '@/components/home/PartnerStrip';
import { ProductCards } from '@/components/home/ProductCards';
import { WhyOnePlatform } from '@/components/home/WhyOnePlatform';
import { HowWeWork } from '@/components/home/HowWeWork';
import { ThreePillars } from '@/components/home/ThreePillars';
import { UseCases } from '@/components/home/UseCases';
import { ClosingCta } from '@/components/home/ClosingCta';
import { getHomePage } from '@/lib/content';
import { organisationJsonLd, pageMetadata, webSiteJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage();
  return pageMetadata({
    title: home.seo.title,
    description: home.seo.description,
    path: '/',
  });
}

export default async function HomePage(): Promise<React.ReactElement> {
  const home = await getHomePage();
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [organisationJsonLd(), webSiteJsonLd()],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <Hero data={home.hero} />
      <PartnerStrip data={home.partners} />
      <ProductCards cards={home.productCards} />
      <WhyOnePlatform data={home.whyOnePlatform} />
      <HowWeWork data={home.howWeWork} />
      <ThreePillars data={home.impact} />
      <UseCases data={home.useCases} />
      <ClosingCta data={home.closingCta} />
    </>
  );
}
