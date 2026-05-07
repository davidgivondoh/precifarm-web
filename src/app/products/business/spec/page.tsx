import type { Metadata } from 'next';
import { SpecSheet } from '@/components/product/SpecSheet';
import { getProduct } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProduct('business');
  return pageMetadata({
    title: `Spec sheet — ${product.name}`,
    description: `Bill of materials, sizing rationale, and pricing for ${product.name}. Print or save as PDF.`,
    path: '/products/business/spec/',
  });
}

export default function BusinessSpecPage(): Promise<React.ReactElement> {
  return SpecSheet({ slug: 'business' });
}
