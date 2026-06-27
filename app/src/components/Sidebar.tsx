import { LayoutDashboard, Activity, Cpu, LogOut, ShieldAlert } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useIsTablet, useIsMobile } from '@/hooks/useMediaQuery';
import type { PageRoute } from '@/types';
import { cn } from '@/lib/utils';

const navItems: { id: PageRoute; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients Directory', icon: Activity },
  { id: 'hubs', label: 'Gateway Hubs', icon: Cpu },
  { id: 'wearables', label: 'Wearables', icon: Activity },
  { id: 'alert-history', label: 'Alert History', icon: ShieldAlert },
];

export function Sidebar() {
  const { currentPage, setCurrentPage, sidebarCollapsed, toggleSidebar, userProfile, setUserProfile } = useApp();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  const collapsed = isTablet || sidebarCollapsed;
  const width = collapsed ? 'w-sidebar-collapsed' : 'w-sidebar';

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full bg-neutral-100 border-r border-neutral-300 z-sidebar flex flex-col transition-all duration-300 ease-in-out',
        width
      )}
      onMouseEnter={() => isTablet && toggleSidebar()}
      onMouseLeave={() => isTablet && toggleSidebar()}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-neutral-300">
        {collapsed ? (
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-white font-heading text-[1.2rem]">K</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <span className="text-white font-heading text-[1.2rem]">K</span>
            </div>
            <span className="font-heading text-[1.6rem] text-neutral-900">CareLink</span>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-3 rounded transition-colors duration-200',
                isActive
                  ? 'bg-white text-primary border-l-[3px] border-primary'
                  : 'text-neutral-600 hover:bg-neutral-200 border-l-[3px] border-transparent'
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} strokeWidth={1.5} />
              {!collapsed && (
                <span className="font-body text-[1.4rem] whitespace-nowrap">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-neutral-300 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-white font-body text-[1.2rem] font-medium">
                {userProfile?.name?.charAt(0) || 'D'}
              </span>
            </div>
            {!collapsed && (
              <div className="overflow-hidden max-w-[120px]">
                <p className="font-body text-[1.3rem] text-neutral-900 truncate">
                  {userProfile?.name || 'Dr. Jane Smith'}
                </p>
                <p className="font-body text-[1.1rem] text-neutral-600 truncate">
                  {userProfile?.role || 'General Practitioner'}
                </p>
              </div>
            )}
          </div>
          
          {!collapsed && (
            <button
              onClick={() => setUserProfile(null)}
              className="p-2 text-neutral-500 hover:text-alert-red hover:bg-alert-red/10 rounded transition-colors"
              title="Log Out"
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
