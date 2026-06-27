import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Search, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FilterButtonGroup } from '@/components/FilterButtonGroup';
import type { DeviceFilter } from '@/types';
import { cn } from '@/lib/utils';

export function Hubs() {
  const { hubs, deviceFilter, setDeviceFilter, registerHub, deleteHub } = useApp();
  const [hubForm, setHubForm] = useState({ serial: '', location: '', nickname: '' });
  const [hubSubmitting, setHubSubmitting] = useState(false);
  const [hubSuccess, setHubSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegisterHub = () => {
    if (!hubForm.serial || !hubForm.location) return;
    setHubSubmitting(true);
    setTimeout(() => {
      registerHub({
        serialNumber: hubForm.serial,
        location: hubForm.location,
        nickname: hubForm.nickname || undefined,
      });
      setHubSubmitting(false);
      setHubSuccess(true);
      setHubForm({ serial: '', location: '', nickname: '' });
      setTimeout(() => setHubSuccess(false), 2000);
    }, 800);
  };

  const inventoryItems = hubs.map(h => ({ ...h, itemType: 'hub' as const })).filter(item => {
    if (deviceFilter === 'online') return item.status === 'online';
    if (deviceFilter === 'offline') return item.status === 'offline';
    return true;
  }).filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.serialNumber.toLowerCase().includes(q) || item.location.toLowerCase().includes(q);
  });

  const filterOptions: { value: DeviceFilter; label: string }[] = [
    { value: 'all', label: 'All Hubs' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Register Gateway Form */}
        <div className="bg-white border border-neutral-300 rounded-lg p-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Wifi size={20} className="text-success" />
            <h3 className="text-h3">Register New Cellular Gateway</h3>
          </div>
          <p className="text-[1.3rem] text-neutral-500 mb-4">Add a new KAYZ CareLink hub to your network.</p>

          <div className="flex justify-center mb-4">
            <img src="/assets/gateway-hub.png" alt="Gateway Hub" className="h-40 object-contain" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Hub Serial Number / IMEI *</label>
              <input
                type="text"
                value={hubForm.serial}
                onChange={(e) => setHubForm(f => ({ ...f, serial: e.target.value }))}
                placeholder="e.g., KAYZ-HUB-A1B2-C3D4"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-[1.1rem] text-neutral-400 mt-1">Found on the label on the bottom of your hub device.</p>
            </div>
            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Health Center Name (Location) *</label>
              <input
                type="text"
                value={hubForm.location}
                onChange={(e) => setHubForm(f => ({ ...f, location: e.target.value }))}
                placeholder="e.g., Northside Clinic"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Hub Nickname (Optional)</label>
              <input
                type="text"
                value={hubForm.nickname}
                onChange={(e) => setHubForm(f => ({ ...f, nickname: e.target.value }))}
                placeholder="e.g., Hub-Main-Ward"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="mt-5 p-3 bg-[#EBF2FF] border-l-[3px] border-primary rounded-r">
            <p className="text-[1.2rem] text-primary">
              The hub will connect automatically via 4G/5G cellular. No Wi-Fi configuration needed.
            </p>
          </div>

          <button
            onClick={handleRegisterHub}
            disabled={hubSubmitting || !hubForm.serial || !hubForm.location}
            className="w-full mt-5 py-3 bg-primary text-white rounded font-body text-[1.4rem] hover:bg-primary-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {hubSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : hubSuccess ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                Registered!
              </>
            ) : (
              'Register Gateway'
            )}
          </button>
        </div>
      </div>

      {/* Hub Inventory Table */}
      <div className="bg-white border border-neutral-300 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-h3">Hub Inventory</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search hubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-neutral-300 rounded text-[1.3rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-56"
              />
            </div>
          </div>
        </div>
        <FilterButtonGroup options={filterOptions} active={deviceFilter} onChange={setDeviceFilter} size="sm" />

        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100">
                <th className="text-table-header text-left px-4 py-3">Device ID</th>
                <th className="text-table-header text-left px-4 py-3">Type</th>
                <th className="text-table-header text-left px-4 py-3">Health Center</th>
                <th className="text-table-header text-left px-4 py-3">Status</th>
                <th className="text-table-header text-left px-4 py-3">Last Seen</th>
                <th className="text-table-header text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-100 transition-colors">
                  <td className="px-4 py-3 font-body text-[1.3rem] font-medium text-neutral-900">{item.serialNumber}</td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">Gateway Hub</td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-900">{item.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={cn('w-2 h-2 rounded-full', item.status === 'online' ? 'bg-success' : 'bg-alert-red')} />
                      <span className={cn('text-badge', item.status === 'online' ? 'text-success' : 'text-alert-red')}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">{item.lastSeen}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteHub(item.id)} className="p-1.5 rounded hover:bg-alert-red-light text-neutral-400 hover:text-alert-red transition-colors"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {inventoryItems.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-neutral-500 font-body text-[1.4rem]">No hubs found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
