'use client';

import { Printer } from 'lucide-react';

export function PrintButton(): React.ReactElement {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="bg-brand hover:bg-brand-strong inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
    >
      <Printer aria-hidden="true" className="h-4 w-4" />
      Print or save as PDF
    </button>
  );
}
