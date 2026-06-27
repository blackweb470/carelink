import type { Patient } from '@/types';
import { cn } from '@/lib/utils';

interface StatusDotProps {
  color: string;
  label?: string;
  size?: 'sm' | 'md';
}

export function StatusDot({ color, label, size = 'md' }: StatusDotProps) {
  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-2 h-2';
  return (
    <div className="flex items-center gap-2">
      <span className={cn('rounded-full', sizeClass)} style={{ backgroundColor: color }} />
      {label && <span className="text-[1.1rem]">{label}</span>}
    </div>
  );
}

export function StatusBadge({ status }: { status: Patient['status'] }) {
  const config = {
    critical: { bg: 'bg-alert-red', text: 'text-white', label: 'Critical' },
    warning: { bg: 'bg-alert-yellow', text: 'text-neutral-900', label: 'Warning' },
    stable: { bg: 'bg-success-light', text: 'text-success', label: 'Stable' },
  };
  const c = config[status];
  return (
    <span className={`text-badge px-3 py-0.5 rounded-pill ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}
