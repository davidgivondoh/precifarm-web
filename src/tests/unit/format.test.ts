import { describe, expect, it } from 'vitest';
import { formatDate, formatKsh, formatNumber } from '@/lib/format';

describe('format helpers', () => {
  it('formats Kenyan shillings as currency', () => {
    expect(formatKsh(145000)).toContain('145,000');
  });

  it('formats numbers with locale separators', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });

  it('formats ISO dates as a short readable string', () => {
    const out = formatDate('2026-04-15');
    expect(out).toMatch(/Apr/);
    expect(out).toContain('2026');
  });
});
