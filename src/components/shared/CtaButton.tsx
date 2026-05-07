import Link from 'next/link';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'ghost';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-md hover:bg-brand-strong hover:shadow-lg hover:-translate-y-0.5',
  secondary: 'border border-line bg-surface/80 text-ink backdrop-blur-md hover:bg-surface-muted hover:shadow-md hover:-translate-y-0.5',
  ghost: 'text-brand hover:bg-brand/5 hover:text-brand-strong',
};

export function CtaButton({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}): React.ReactElement {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex min-h-[44px] items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
