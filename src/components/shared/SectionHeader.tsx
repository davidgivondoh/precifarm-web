export function SectionHeader({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
}): React.ReactElement {
  return (
    <header className="max-w-2xl">
      {eyebrow && <p className="text-ink-muted text-sm tracking-wider uppercase">{eyebrow}</p>}
      <h2 className="font-display mt-2">{heading}</h2>
      {intro && <p className="text-ink-muted mt-3">{intro}</p>}
    </header>
  );
}
