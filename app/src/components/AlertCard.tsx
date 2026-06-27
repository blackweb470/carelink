import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Alert } from '@/types';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  alert: Alert;
}

export function AlertCard({ alert }: AlertCardProps) {
  const { acknowledgeAlert, dismissAlert, navigateToPatient } = useApp();
  const isCritical = alert.severity === 'critical';

  const handleAcknowledge = () => acknowledgeAlert(alert.id);
  const handleDismiss = () => dismissAlert(alert.id);
  const handleViewPatient = () => navigateToPatient(alert.patientId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'bg-white rounded-lg p-4 border transition-colors duration-200',
        isCritical
          ? 'border-alert-red border-l-[3px] border-l-alert-red hover:bg-alert-red-light'
          : 'border-alert-yellow border-l-[3px] border-l-alert-yellow hover:bg-alert-yellow-light'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-body text-[1.4rem] font-medium text-neutral-900">{alert.patientName}</span>
          <span
            className={cn(
              'text-badge px-3 py-0.5 rounded-pill text-white',
              isCritical ? 'bg-alert-red' : 'bg-alert-yellow text-neutral-900'
            )}
          >
            {isCritical ? (
              <span className="flex items-center gap-1">
                <AlertCircle size={12} /> Critical
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <AlertTriangle size={12} /> Warning
              </span>
            )}
          </span>
        </div>
        <span className="text-[1.1rem] text-neutral-400 shrink-0">{alert.timestamp}</span>
      </div>

      {/* Room */}
      <p className="text-[1.2rem] text-neutral-500 mt-0.5">{alert.room}</p>

      {/* Description */}
      <p className="text-[1.3rem] text-neutral-600 mt-2 line-clamp-2">{alert.description}</p>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={handleAcknowledge}
          className="px-3 py-1.5 bg-primary text-white text-[1.2rem] rounded hover:bg-primary-hover transition-colors"
        >
          Acknowledge
        </button>
        <button
          onClick={handleViewPatient}
          className="px-3 py-1.5 border border-primary text-primary text-[1.2rem] rounded hover:bg-primary hover:text-white transition-colors"
        >
          View Patient
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 text-neutral-600 text-[1.2rem] rounded hover:bg-neutral-100 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}
