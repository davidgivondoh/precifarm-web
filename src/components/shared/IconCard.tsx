import {
  Bell,
  Cpu,
  Database,
  LineChart,
  RefreshCw,
  Search,
  Shield,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  'line-chart': LineChart,
  wallet: Wallet,
  cpu: Cpu,
  users: Users,
  search: Search,
  database: Database,
  bell: Bell,
  wrench: Wrench,
  refresh: RefreshCw,
};

export function IconCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}): React.ReactElement {
  const Icon = iconMap[icon] ?? Shield;
  return (
    <div className="flex flex-col">
      <div className="bg-surface-panel text-brand inline-flex h-10 w-10 items-center justify-center rounded-md">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="font-display mt-4 text-lg font-medium">{title}</h3>
      <p className="text-ink-muted mt-2 text-sm">{body}</p>
    </div>
  );
}
