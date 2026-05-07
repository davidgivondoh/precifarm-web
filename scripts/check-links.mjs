// Internal-link checker. Run after `pnpm build`. Walks /out for HTML files,
// extracts every internal href, and verifies the target file (or directory
// index.html) exists. Exits 1 on any miss.

import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');

async function walkHtml(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('_next') || e.name.startsWith('__next')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkHtml(full)));
    else if (e.isFile() && e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function resolveHref(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true;

  let rel = clean.replace(/^\//, '');
  if (rel.endsWith('/')) rel = rel + 'index.html';

  const direct = path.join(OUT, rel);
  if (await exists(direct)) return true;

  const asDir = path.join(OUT, rel, 'index.html');
  if (await exists(asDir)) return true;

  return false;
}

async function main() {
  if (!(await exists(OUT))) {
    console.error('out/ does not exist. Run `pnpm build` first.');
    process.exit(1);
  }

  const files = await walkHtml(OUT);
  const broken = [];

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const hrefs = [...html.matchAll(/href="(\/[^"#?][^"]*)"/g)].map((m) => m[1]);
    const unique = [...new Set(hrefs)];
    for (const href of unique) {
      if (href.startsWith('//') || href.startsWith('/_next/')) continue;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      if (!(await resolveHref(href))) {
        broken.push({ file: path.relative(OUT, file), href });
      }
    }
  }

  if (broken.length) {
    console.error(`Broken internal links: ${broken.length}`);
    for (const b of broken) console.error(`  ${b.file}  ->  ${b.href}`);
    process.exit(1);
  }

  console.log(`OK. Scanned ${files.length} HTML files, no broken internal links.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
