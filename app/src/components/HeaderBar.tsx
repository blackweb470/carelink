import { RefreshCw, Bell, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function HeaderBar() {
  const { currentPage, lastUpdated, refreshData, alerts, navigateToPatient, dismissAlert } = useApp();
  const [spinning, setSpinning] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unresolvedAlerts = alerts.filter(a => a.status === 'unresolved');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTitle = () => {
    switch (currentPage) {
      case 'dashboard': return 'Clinical Dashboard';
      case 'patients': return 'Patient Directory';
      case 'patient': return 'Patient Profile';
      case 'hardware': return 'Hardware Management';
      case 'hubs': return 'Gateway Hubs';
      case 'wearables': return 'Wearables';
      default: return 'KAYZ CareLink';
    }
  };

  const handleRefresh = () => {
    setSpinning(true);
    refreshData();
    setTimeout(() => setSpinning(false), 500);
  };

  const formatDate = () => {
    return lastUpdated.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <header className="sticky top-0 z-header h-header bg-white border-b border-neutral-300 flex items-center justify-between px-4 md:px-8">
      <h1 className="text-h1 truncate pr-4">{getTitle()}</h1>
      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-small hidden sm:block">{formatDate()}</span>
        <button
          onClick={handleRefresh}
          className="p-2 rounded hover:bg-neutral-100 transition-colors"
          aria-label="Refresh data"
        >
          <RefreshCw size={18} className={spinning ? 'animate-spin-once' : ''} />
        </button>
        
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn("p-2 rounded transition-colors relative", showNotifications ? "bg-neutral-100" : "hover:bg-neutral-100")} 
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unresolvedAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-alert-red animate-pulse-dot" />
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-[320px] md:w-[380px] bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                  <h3 className="font-heading text-[1.4rem] font-bold text-neutral-900">Notifications</h3>
                  {unresolvedAlerts.length > 0 && (
                    <span className="text-[1.2rem] text-neutral-500">{unresolvedAlerts.length} unread</span>
                  )}
                </div>
                
                <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                  {unresolvedAlerts.length === 0 ? (
                    <div className="p-6 text-center text-neutral-500">
                      <CheckCircle2 size={32} className="mx-auto mb-2 text-success opacity-50" />
                      <p className="font-body text-[1.3rem]">You're all caught up!</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-100">
                      {unresolvedAlerts.map(alert => (
                        <div 
                          key={alert.id}
                          onClick={() => {
                            navigateToPatient(alert.patientId);
                            setShowNotifications(false);
                          }}
                          className={cn(
                            "p-4 cursor-pointer hover:bg-neutral-50 transition-colors",
                            alert.severity === 'critical' ? 'bg-alert-red-light/50' : ''
                          )}
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <span className="font-body text-[1.3rem] font-bold text-neutral-900">{alert.patientName}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[1.1rem] text-neutral-500">{alert.timestamp}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dismissAlert(alert.id);
                                }}
                                className="p-1 hover:bg-neutral-200 rounded text-neutral-400 hover:text-success transition-colors"
                                title="Mark as resolved"
                              >
                                <CheckCircle2 size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="font-body text-[1.2rem] text-neutral-600 mb-2">{alert.message}</p>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[1.1rem] px-2 py-0.5 rounded-full font-medium",
                              alert.severity === 'critical' ? 'bg-alert-red text-white' : 'bg-alert-yellow text-neutral-900'
                            )}>
                              {alert.severity === 'critical' ? 'Critical' : 'Warning'}
                            </span>
                            <span className="text-[1.1rem] text-neutral-500">Room {alert.room}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {unresolvedAlerts.length > 0 && (
                  <div className="p-3 border-t border-neutral-200 bg-neutral-50 text-center">
                    <p className="text-[1.2rem] font-body text-neutral-500">
                      Dismiss alerts on the patient profile.
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
