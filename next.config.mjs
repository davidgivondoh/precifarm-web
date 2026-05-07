/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // SVG-as-React-component handling deferred to Phase 2 when first needed.
  // Turbopack is the default in Next.js 16; we will use turbopack.rules
  // (or fall back to `next build --webpack` with @svgr/webpack) at that point.
};

export default nextConfig;
