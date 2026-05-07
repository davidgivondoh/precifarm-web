import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

const productLinks = [
  { href: '/products', label: 'All packages' },
  { href: '/products/starter', label: 'Starter' },
  { href: '/products/family', label: 'Family' },
  { href: '/products/business', label: 'Commercial' },
];

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const supportLinks = [
  { href: '/contact', label: 'Get a quote' },
  { href: '/how-we-size', label: 'How we size systems' },
  { href: '/financing', label: 'Financing options' },
  { href: '/blog', label: 'System guides' },
  { href: '/privacy', label: 'Privacy' },
];

const phoneDisplay = '+254 794 702 768';
const phoneHref = 'tel:+254794702768';
const whatsappHref = 'https://wa.me/254794702768';
const emailDisplay = 'sales@precifarm.com';

export function SiteFooter(): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div
        aria-hidden="true"
        className="from-brand via-brand-soft to-brand h-1 w-full bg-linear-to-r"
      />

      <div className="container-page section grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="font-display text-2xl font-medium tracking-tight text-white"
          >
            Precifarm
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            Distributed solar energy for Kenya. We design, deploy, and operate every system —
            from a single backup package to a full off-grid home.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
              <a
                href={`mailto:${emailDisplay}`}
                className="text-white/80 transition-colors hover:text-white"
              >
                {emailDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
              <a
                href={phoneHref}
                className="text-white/80 transition-colors hover:text-white"
              >
                {phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]"
              />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] transition-colors hover:text-[#1ebe5d]"
              >
                Chat on WhatsApp{' '}
                <span className="text-[#25D366]/80">({phoneDisplay})</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
              <span className="text-white/80">Anywhere in Kenya</span>
            </li>
          </ul>
        </div>

        <FooterColumn title="Products" links={productLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Support" links={supportLinks} />
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <span className="text-white/55">
            © {year} Precifarm. Built and operated in Kenya.
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/55">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="bg-brand-soft inline-block h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]"
              />
              All systems operational
            </span>
            <span aria-hidden="true" className="hidden md:inline">
              ·
            </span>
            <span>Pay with M-Pesa, card, or bank transfer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}): React.ReactElement {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-white/50">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
