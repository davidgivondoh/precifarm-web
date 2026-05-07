export function DataTable({
  headers,
  rows,
  caption,
}: {
  headers: ReadonlyArray<string>;
  rows: ReadonlyArray<ReadonlyArray<string>>;
  caption?: string;
}): React.ReactElement {
  return (
    <div className="border-line overflow-hidden rounded-lg border">
      <table className="w-full text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-surface-muted">
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className="text-ink px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-line divide-y">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={j === 0 ? 'text-ink px-4 py-3' : 'text-ink-muted px-4 py-3'}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
