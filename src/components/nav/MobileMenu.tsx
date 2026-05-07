'use client';

// Client because: open/close state, focus trap, body scroll lock.

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

type Link = { href: string; label: string };

export function MobileMenu({ links }: { links: ReadonlyArray<Link> }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={dialogId}
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="text-ink hover:bg-surface-muted rounded-md p-2"
      >
        <Menu aria-hidden="true" className="h-6 w-6" />
      </button>

      {open && (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="bg-surface fixed inset-0 z-50 flex flex-col"
        >
          <div className="container-page border-line flex h-20 items-center justify-between border-b">
            <Link href="/" onClick={() => setOpen(false)} aria-label="Precifarm — home" className="flex items-center">
              <Image
                src="/images/brand/precifarm-logo.png"
                alt="Precifarm"
                width={345}
                height={124}
                className="h-12 w-auto"
              />
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-ink hover:bg-surface-muted rounded-md p-2"
            >
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <nav aria-label="Mobile primary" className="container-page flex-1 py-8">
            <ul className="space-y-4 text-lg">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-ink hover:text-brand block rounded-md py-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="bg-brand hover:bg-brand-strong inline-flex rounded-md px-4 py-2 text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
