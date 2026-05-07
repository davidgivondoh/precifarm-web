import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { formatDate } from '@/lib/format';

export const metadata: Metadata = pageMetadata({
  title: 'Blog',
  description: 'Notes from the Precifarm team. Operations, engineering, product.',
  path: '/blog/',
});

export default async function BlogIndexPage(): Promise<React.ReactElement> {
  const posts = await getAllBlogPosts();

  return (
    <>
      <section className="bg-surface-muted">
        <div className="container-page section">
          <SectionHeader
            eyebrow="Blog"
            heading="Notes from the team"
            intro="What we are learning, what we are building, what we got wrong. No ghostwriters."
          />
        </div>
      </section>

      <section className="container-page section">
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-xl"
              >
                {post.cover && (
                  <div className="bg-surface-muted relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="mt-5 flex flex-1 flex-col">
                  <div className="text-ink-muted flex items-center gap-3 text-xs tracking-wider uppercase">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </div>

                  <h2 className="font-display group-hover:text-brand mt-3 text-xl font-medium transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-ink-muted mt-3 text-sm">{post.excerpt}</p>

                  <span className="text-brand mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium">
                    Read
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
