import type { Metadata } from 'next';
import { ProductPage } from '@/components/product/ProductPage';
import { getProduct } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const product = await getProduct('starter');
  return pageMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: '/products/starter/',
  });
}

export default function Page(): Promise<React.ReactElement> {
  return ProductPage({ slug: 'starter' });
}
