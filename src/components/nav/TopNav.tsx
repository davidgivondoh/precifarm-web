import Image from 'next/image';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';

export const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
] as const;

export function TopNav(): React.ReactElement {
  return (
    <header className="border-line bg-surface/90 sticky top-0 z-30 border-b backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between md:h-24">
        <Link href="/" aria-label="Precifarm — home" className="flex items-center">
          <Image
            src="/images/brand/precifarm-logo.png"
            alt="Precifarm"
            width={345}
            height={124}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-muted hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="bg-brand hover:bg-brand-strong rounded-md px-3 py-1.5 text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:hidden">
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
