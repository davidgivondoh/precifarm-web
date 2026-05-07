type PlausibleProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: PlausibleProps }) => void;
  }
}

export function trackEvent(name: string, props?: PlausibleProps): void {
  if (typeof window === 'undefined') return;
  window.plausible?.(name, props ? { props } : undefined);
}
