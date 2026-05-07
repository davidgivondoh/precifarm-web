import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import {
  type BlogPostFrontmatter,
  blogPostSchema,
  type HomePage,
  homePageSchema,
  type Product,
  productSchema,
  type SitePage,
  sitePageSchema,
} from './content-schemas';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

type ParsedFile<T> = {
  frontmatter: T;
  body: string;
  filePath: string;
};

async function listFiles(dir: string): Promise<string[]> {
  const abs = path.join(CONTENT_ROOT, dir);
  try {
    const entries = await fs.readdir(abs, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && (e.name.endsWith('.md') || e.name.endsWith('.mdx')))
      .map((e) => path.join(abs, e.name));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

async function parseFile<S extends z.ZodTypeAny>(
  filePath: string,
  schema: S,
): Promise<ParsedFile<z.output<S>>> {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const where = path.relative(process.cwd(), filePath);
    const detail = parsed.error.issues
      .map((i) => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Content validation failed in ${where}:\n${detail}`);
  }
  return { frontmatter: parsed.data, body: content, filePath };
}

export async function getProduct(slug: 'starter' | 'family' | 'business'): Promise<Product> {
  const filePath = path.join(CONTENT_ROOT, 'products', `${slug}.md`);
  const { frontmatter } = await parseFile(filePath, productSchema);
  return frontmatter;
}

export async function getAllProducts(): Promise<Product[]> {
  const files = await listFiles('products');
  const products = await Promise.all(files.map((f) => parseFile(f, productSchema)));
  return products.map((p) => p.frontmatter);
}

export async function getSitePage(name: string): Promise<{ frontmatter: SitePage; body: string }> {
  const filePath = path.join(CONTENT_ROOT, 'site', `${name}.md`);
  const { frontmatter, body } = await parseFile(filePath, sitePageSchema);
  return { frontmatter, body };
}

export async function getHomePage(): Promise<HomePage> {
  const filePath = path.join(CONTENT_ROOT, 'site', 'home.md');
  const { frontmatter } = await parseFile(filePath, homePageSchema);
  return frontmatter;
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const files = await listFiles('blog');
  return files.map((f) => path.basename(f).replace(/\.mdx?$/, ''));
}

export async function getBlogPost(
  slug: string,
): Promise<{ frontmatter: BlogPostFrontmatter; body: string }> {
  const candidates = [
    path.join(CONTENT_ROOT, 'blog', `${slug}.mdx`),
    path.join(CONTENT_ROOT, 'blog', `${slug}.md`),
  ];
  for (const filePath of candidates) {
    try {
      const { frontmatter, body } = await parseFile(filePath, blogPostSchema);
      return { frontmatter, body };
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') continue;
      throw err;
    }
  }
  throw new Error(`Blog post not found: ${slug}`);
}

export async function getAllBlogPosts(): Promise<BlogPostFrontmatter[]> {
  const files = await listFiles('blog');
  const posts = await Promise.all(files.map((f) => parseFile(f, blogPostSchema)));
  return posts.map((p) => p.frontmatter).sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}
