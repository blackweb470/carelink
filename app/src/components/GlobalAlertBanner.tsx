import { AnimatePresence, motion } from 'framer-motion';
import { AlertOctagon, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function GlobalAlertBanner() {
  const { alerts, navigateToPatient, dismissAlert } = useApp();

  // Find the most recent critical alert that is unresolved
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && a.status === 'unresolved');
  const activeAlert = criticalAlerts[0]; // Just show the top one, or aggregate

  if (!activeAlert) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[9999] p-4 pointer-events-none flex justify-center"
      >
        <div className="pointer-events-auto bg-alert-red text-white shadow-xl rounded-lg max-w-4xl w-full p-4 border border-alert-red overflow-hidden relative">
          {/* Pulsing background effect */}
          <div className="absolute inset-0 bg-white opacity-10 animate-pulse" />
          
          <div className="relative z-10 flex items-center gap-2 mb-3">
             <AlertOctagon size={24} className="text-white" />
             <span className="font-heading text-[1.4rem] font-bold uppercase tracking-wider">
               {criticalAlerts.length} Critical Alert{criticalAlerts.length !== 1 && 's'}
             </span>
          </div>

          <div className="relative z-10 space-y-2">
            {criticalAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between bg-black/10 rounded p-3">
                <p className="font-body text-[1.3rem] opacity-100">
                  <span className="font-bold">{alert.patientName}</span> ({alert.room}): {alert.description}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="text-white border border-white/30 hover:bg-white/20 px-3 py-1.5 rounded font-body text-[1.2rem] font-medium transition-colors"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => navigateToPatient(alert.patientId)}
                    className="bg-white text-alert-red px-3 py-1.5 rounded font-body text-[1.2rem] font-bold hover:bg-neutral-100 transition-colors flex items-center gap-2"
                  >
                    View <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
