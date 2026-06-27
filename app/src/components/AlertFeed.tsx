import { AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AlertCard } from './AlertCard';
import { FilterButtonGroup } from './FilterButtonGroup';
import type { AlertFilter } from '@/types';

export function AlertFeed() {
  const { alerts, alertFilter, setAlertFilter } = useApp();

  const filteredAlerts = alerts
    .filter((alert) => {
      if (alertFilter === 'all') return alert.status === 'unresolved';
      if (alertFilter === 'resolved') return alert.status !== 'unresolved';
      return alert.severity === alertFilter && alert.status === 'unresolved';
    })
    .sort((a, b) => {
      const scoreMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const aScore = scoreMap[a.triageScore as keyof typeof scoreMap] || 0;
      const bScore = scoreMap[b.triageScore as keyof typeof scoreMap] || 0;
      return bScore - aScore;
    });

  const filterOptions: { value: AlertFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'resolved', label: 'Resolved' },
  ];

  return (
    <div className="bg-white border border-neutral-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3">Alert Feed</h3>
        <Filter size={18} className="text-neutral-600" />
      </div>
      <FilterButtonGroup options={filterOptions} active={alertFilter} onChange={setAlertFilter} size="sm" />
      <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin pr-1">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-success-light flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-[1.3rem] text-neutral-600">No alerts at this time.</p>
              <p className="text-[1.2rem] text-neutral-500">All patients are stable.</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} />)
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
