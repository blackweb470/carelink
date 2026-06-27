import { type LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  value: string | number;
  valueColor?: string;
  label: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  trendColor?: string;
  borderColor?: string;
  subIndicators?: { label: string; color: string; dotColor: string }[];
}

export function MetricCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  valueColor = 'text-neutral-900',
  label,
  trend,
  trendType = 'neutral',
  trendColor = 'text-neutral-600',
  borderColor,
  subIndicators,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-white border rounded-lg p-4 flex items-center gap-4 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
        borderColor || 'border-neutral-300'
      )}
    >
      <div className={cn('w-10 h-10 rounded-full flex items-center justify-center shrink-0', iconBg)}>
        <Icon size={20} color={iconColor} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-metric', valueColor)}>{value}</p>
        <p className="text-metric-label">{label}</p>
        {trend && (
          <div className={cn('flex items-center gap-1 mt-1', trendColor)}>
            {trendType === 'up' && <TrendingUp size={12} />}
            {trendType === 'down' && <TrendingDown size={12} />}
            <span className="text-[1.1rem]">{trend}</span>
          </div>
        )}
        {subIndicators && (
          <div className="flex items-center gap-3 mt-1">
            {subIndicators.map((ind, i) => (
              <div key={i} className={cn('flex items-center gap-1', ind.color)}>
                <span className={cn('w-2 h-2 rounded-full', ind.dotColor)} />
                <span className="text-[1.1rem]">{ind.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
