export function StatBlock({ value, label }: { value: string; label: string }): React.ReactElement {
  return (
    <div className="border-line border-t pt-6">
      <div className="font-display text-4xl font-medium md:text-5xl">{value}</div>
      <div className="text-ink-muted mt-2 text-sm">{label}</div>
    </div>
  );
}
