import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import Script from 'next/script';
import { TopNav } from '@/components/nav/TopNav';
import { SiteFooter } from '@/components/footer/SiteFooter';
import { SkipToContent } from '@/components/shared/SkipToContent';
import { siteUrl } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Precifarm — Solar built for Kenya',
    template: '%s · Precifarm',
  },
  description:
    'Honestly-engineered solar packages for Kenyan homes, businesses, and farms. Designed, installed, and serviced for years by Precifarm engineers — never subcontracted.',
  applicationName: 'Precifarm',
  authors: [{ name: 'Precifarm' }],
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: siteUrl,
    siteName: 'Precifarm',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Precifarm — Solar built for Kenya' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@precifarm',
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/brand/precifarm-logo.png', type: 'image/png', sizes: 'any' },
    ],
    apple: '/images/brand/precifarm-logo.png',
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#1f4e5f',
  width: 'device-width',
  initialScale: 1,
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html lang="en-KE" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="bg-surface text-ink antialiased" suppressHydrationWarning>
        <SkipToContent />
        <TopNav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        {plausibleDomain && (
          <Script
            src="https://plausible.io/js/script.js"
            data-domain={plausibleDomain}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  );
}
