import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShieldAlert } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useDebounce } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

export function AlertHistory() {
  const { alerts, navigateToPatient } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'acknowledged' | 'dismissed'>('all');
  
  const debouncedSearch = useDebounce(search, 300);

  // Filter and sort alerts
  const filteredAlerts = useMemo(() => {
    let result = [...alerts];
    
    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(a => a.status === statusFilter);
    }
    
    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(a => 
        a.patientName.toLowerCase().includes(q) ||
        a.room.toLowerCase().includes(q) ||
        a.message.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q)
      );
    }
    
    // Sort by timestamp (newest first)
    // Note: In a real app we'd parse actual ISO dates. Assuming timestamp is a readable string here, 
    // but typically we'd sort by a real date field or just reverse the array if it's already chronologically appended.
    return result.reverse(); 
  }, [alerts, statusFilter, debouncedSearch]);

  const getSeverityColor = (severity: string) => {
    return severity === 'critical' ? 'text-alert-red bg-alert-red-light/50' : 'text-alert-yellow bg-alert-yellow-light/50';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'unresolved': return <span className="px-2 py-1 rounded bg-alert-red text-white text-[1.1rem] font-medium">Unresolved</span>;
      case 'acknowledged': return <span className="px-2 py-1 rounded bg-alert-yellow text-neutral-900 text-[1.1rem] font-medium">Acknowledged</span>;
      case 'dismissed': return <span className="px-2 py-1 rounded bg-neutral-200 text-neutral-600 text-[1.1rem] font-medium">Dismissed</span>;
      default: return <span className="px-2 py-1 rounded bg-neutral-200 text-neutral-600 text-[1.1rem] font-medium">{status}</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-2">
          <ShieldAlert size={28} className="text-[#491D8B]" />
          <h2 className="text-h2">Compliance & Audit Log</h2>
        </div>
        <p className="text-[1.4rem] text-neutral-500 max-w-3xl">
          A permanent, immutable record of all system-generated alerts and their resolution statuses. Alerts cannot be modified or deleted from this log for compliance and auditing purposes.
        </p>
      </div>

      <div className="bg-white border border-neutral-300 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="relative w-full sm:w-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search patient, room, or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 w-full sm:w-[300px] border border-neutral-300 rounded text-[1.3rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <Filter size={16} className="text-neutral-500 shrink-0 hidden sm:block" />
            <span className="text-[1.3rem] text-neutral-600 font-medium shrink-0 mr-1 hidden sm:block">Filter:</span>
            {[
              { id: 'all', label: 'All Alerts' },
              { id: 'unresolved', label: 'Unresolved' },
              { id: 'dismissed', label: 'Resolved/Dismissed' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[1.2rem] font-medium whitespace-nowrap transition-colors",
                  statusFilter === tab.id 
                    ? "bg-primary text-white" 
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-neutral-50 border-y border-neutral-200">
                <th className="text-table-header text-left px-4 py-3 w-[150px]">Date / Time</th>
                <th className="text-table-header text-left px-4 py-3 w-[100px]">Alert ID</th>
                <th className="text-table-header text-left px-4 py-3 w-[150px]">Patient</th>
                <th className="text-table-header text-left px-4 py-3 w-[80px]">Room</th>
                <th className="text-table-header text-left px-4 py-3 w-[100px]">Severity</th>
                <th className="text-table-header text-left px-4 py-3">Message</th>
                <th className="text-table-header text-left px-4 py-3 w-[120px]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map(alert => (
                  <tr key={alert.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600 whitespace-nowrap">{alert.timestamp}</td>
                    <td className="px-4 py-3 font-body text-[1.2rem] text-neutral-400 font-mono">{alert.id.substring(0, 8)}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => navigateToPatient(alert.patientId)}
                        className="font-body text-[1.3rem] font-bold text-primary hover:underline text-left"
                      >
                        {alert.patientName}
                      </button>
                    </td>
                    <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">{alert.room}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[1.1rem] font-medium uppercase tracking-wider inline-block", 
                        getSeverityColor(alert.severity)
                      )}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-800">{alert.message}</td>
                    <td className="px-4 py-3">
                      {getStatusBadge(alert.status)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <p className="text-[1.4rem] text-neutral-500 font-body">No alerts found matching your criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-[1.2rem] text-neutral-500 flex items-center gap-1.5">
            <ShieldAlert size={14} /> This log is permanently retained and cannot be wiped.
          </p>
          <p className="text-[1.2rem] text-neutral-500">
            Showing {filteredAlerts.length} records
          </p>
        </div>
      </div>
    </motion.div>
  );
}
