/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://precifarm.com',
  generateRobotsTxt: true,
  outDir: 'out',
  exclude: ['/style-guide', '/style-guide/*'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};

export default config;
