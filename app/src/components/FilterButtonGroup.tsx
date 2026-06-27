import { cn } from '@/lib/utils';

interface FilterButtonGroupProps<T extends string> {
  options: { value: T; label: string }[];
  active: T;
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
}

export function FilterButtonGroup<T extends string>({
  options,
  active,
  onChange,
  size = 'md',
}: FilterButtonGroupProps<T>) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded transition-colors duration-200 font-body',
            size === 'sm' ? 'px-3 py-1 text-[1.1rem]' : 'px-4 py-1.5 text-[1.2rem]',
            active === opt.value
              ? 'bg-primary text-white border border-primary'
              : 'bg-white text-neutral-600 border border-neutral-300 hover:bg-neutral-100'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
