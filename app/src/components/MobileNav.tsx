import { LayoutDashboard, Activity, Cpu, ShieldAlert } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { PageRoute } from '@/types';
import { cn } from '@/lib/utils';

const tabs: { id: PageRoute; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Activity },
  { id: 'hubs', label: 'Hubs', icon: Cpu },
  { id: 'wearables', label: 'Sensors', icon: Activity },
  { id: 'alert-history', label: 'History', icon: ShieldAlert },
];

export function MobileNav() {
  const { currentPage, setCurrentPage } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-mobile-nav bg-white border-t border-neutral-300 z-header flex items-center justify-around md:hidden">
      {tabs.map((tab) => {
        const isActive = currentPage === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setCurrentPage(tab.id)}
            className={cn(
              'flex flex-col items-center gap-0.5 py-1 px-4 transition-colors',
              isActive ? 'text-primary' : 'text-neutral-600'
            )}
          >
            <Icon size={20} strokeWidth={1.5} />
            <span className="text-[1rem]">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
