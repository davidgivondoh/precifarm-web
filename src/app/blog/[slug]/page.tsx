import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getAllBlogPosts, getBlogPost, getBlogPostSlugs } from '@/lib/content';
import { articleJsonLd, pageMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/format';

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = await getBlogPost(slug);
    return pageMetadata({
      title: frontmatter.seo?.title ?? frontmatter.title,
      description: frontmatter.seo?.description ?? frontmatter.excerpt,
      path: `/blog/${slug}/`,
      ogImage: frontmatter.cover,
    });
  } catch {
    return pageMetadata({
      title: 'Not found',
      description: 'Blog post not found.',
      path: `/blog/${slug}/`,
      noIndex: true,
    });
  }
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display mt-12 text-2xl font-medium" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display mt-10 text-xl font-medium" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-ink-muted mt-5 text-base leading-relaxed md:text-lg" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="text-ink-muted mt-5 list-disc space-y-2 pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="text-ink-muted mt-5 list-decimal space-y-2 pl-6" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-ink font-medium" {...props} />
  ),
  hr: () => <hr className="border-line my-10" />,
  a: ({ href = '#', ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} className="text-brand hover:underline" {...rest} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.body,
    components: mdxComponents,
  });

  const ld = articleJsonLd({
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    slug: post.frontmatter.slug,
    publishedAt: post.frontmatter.publishedAt,
    author: post.frontmatter.author,
  });

  const all = await getAllBlogPosts();
  const more = all.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <article>
        <header className="bg-surface-muted">
          <div className="container-page section">
            <div className="text-ink-muted flex items-center gap-3 text-xs tracking-wider uppercase">
              <Link href="/blog/" className="hover:text-ink">
                Blog
              </Link>
              <span aria-hidden="true">·</span>
              <span>{post.frontmatter.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.frontmatter.publishedAt}>
                {formatDate(post.frontmatter.publishedAt)}
              </time>
            </div>
            <h1 className="font-display mt-4 max-w-3xl text-balance">{post.frontmatter.title}</h1>
            <p className="text-ink-muted mt-5 max-w-2xl text-lg">{post.frontmatter.excerpt}</p>

            {post.frontmatter.cover && (
              <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src={post.frontmatter.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </header>

        <div className="container-page section">
          <div className="text-ink mx-auto max-w-2xl">{content}</div>

          <footer className="border-line mx-auto mt-16 max-w-2xl border-t pt-8">
            <p className="text-ink-muted text-sm">
              Written by {post.frontmatter.author}.{' '}
              <a href="mailto:hello@precifarm.com" className="text-brand hover:underline">
                Reply by email
              </a>
              .
            </p>
          </footer>
        </div>

        {more.length > 0 && (
          <section className="bg-surface-muted">
            <div className="container-page section">
              <h2 className="font-display text-xl font-medium">More from the team</h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2">
                {more.map((p) => (
                  <li key={p.slug} className="border-line border-t pt-6">
                    <Link href={`/blog/${p.slug}/`} className="group">
                      <p className="text-ink-muted text-xs tracking-wider uppercase">
                        {p.category}
                      </p>
                      <h3 className="font-display group-hover:text-brand mt-2 text-lg font-medium transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-ink-muted mt-2 text-sm">{p.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
