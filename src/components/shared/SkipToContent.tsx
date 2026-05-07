export function SkipToContent(): React.ReactElement {
  return (
    <a
      href="#main-content"
      className="focus:bg-brand sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
  );
}
