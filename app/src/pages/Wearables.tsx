import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Search, Trash2, Battery, BatteryLow, BatteryWarning } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { FilterButtonGroup } from '@/components/FilterButtonGroup';
import type { DeviceFilter } from '@/types';
import { cn } from '@/lib/utils';

export function Wearables() {
  const { patients, hubs, sensors, deviceFilter, setDeviceFilter, pairSensor, deleteSensor } = useApp();
  const [sensorForm, setSensorForm] = useState({ patientId: '', macAddress: '', deviceType: '', hubId: '' });
  const [sensorSubmitting, setSensorSubmitting] = useState(false);
  const [sensorSuccess, setSensorSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePairSensor = () => {
    if (!sensorForm.patientId || !sensorForm.macAddress || !sensorForm.deviceType || !sensorForm.hubId) return;
    setSensorSubmitting(true);
    setTimeout(() => {
      const patient = patients.find(p => p.id === sensorForm.patientId);
      const hub = hubs.find(h => h.id === sensorForm.hubId);
      pairSensor({
        macAddress: sensorForm.macAddress,
        deviceType: sensorForm.deviceType as any,
        patientId: sensorForm.patientId,
        patientName: patient?.name,
        hubId: sensorForm.hubId,
        hubName: hub?.nickname || hub?.location,
      });
      setSensorSubmitting(false);
      setSensorSuccess(true);
      setSensorForm({ patientId: '', macAddress: '', deviceType: '', hubId: '' });
      setTimeout(() => setSensorSuccess(false), 2000);
    }, 800);
  };

  const getBatteryIcon = (level?: number) => {
    if (!level) return null;
    if (level > 50) return <Battery size={16} className="text-success" />;
    if (level > 20) return <BatteryWarning size={16} className="text-alert-yellow" />;
    return <BatteryLow size={16} className="text-alert-red" />;
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return '';
    if (level > 50) return 'text-success';
    if (level > 20) return 'text-alert-yellow';
    return 'text-alert-red';
  };

  const inventoryItems = sensors.map(s => ({ ...s, itemType: 'sensor' as const })).filter(item => {
    if (deviceFilter === 'online') return item.status === 'online';
    if (deviceFilter === 'offline') return item.status === 'offline' || item.status === 'warning';
    return true;
  }).filter(item => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.macAddress.toLowerCase().includes(q) || (item.patientName?.toLowerCase().includes(q) ?? false);
  });

  const filterOptions: { value: DeviceFilter; label: string }[] = [
    { value: 'all', label: 'All Sensors' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline / Warning' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white border border-neutral-300 rounded-lg p-6 w-full">
          <div className="flex items-center gap-2 mb-2">
            <Bluetooth size={20} className="text-primary" />
            <h3 className="text-h3">Assign Wearable Sensor</h3>
          </div>
          <p className="text-[1.3rem] text-neutral-500 mb-4">Pair a sensor device to a patient and a health center hub.</p>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Panel: Hardware Visual */}
            <div className="md:w-1/3 flex flex-col items-center justify-center bg-[#F8FAFC] rounded-lg p-6 border border-neutral-200">
              <img src="/assets/wearable-sensor.png" alt="Wearable Sensor" className="h-40 object-contain mb-6 drop-shadow-md" />
              <div className="text-center w-full">
                <p className="font-heading text-[1.6rem] text-neutral-900 font-medium mb-1">BLE Wearable</p>
                <div className="flex items-center justify-center gap-1.5 text-success mb-4">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  <span className="font-body text-[1.2rem] font-medium uppercase tracking-wider">Ready to Pair</span>
                </div>
                <p className="text-[1.1rem] text-neutral-500 leading-tight">
                  Transmits encrypted health data locally to the gateway hub via Bluetooth Low Energy.
                </p>
              </div>
            </div>

            {/* Right Panel: Configuration */}
            <div className="md:w-2/3 space-y-6">
              {/* Section 1: Hardware Identity */}
              <div>
                <h4 className="text-[1.2rem] font-bold text-neutral-900 border-b border-neutral-200 pb-2 mb-4 uppercase tracking-wider">1. Hardware Identity</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[1.3rem] text-neutral-900 block mb-1">Device Type *</label>
                    <select
                      value={sensorForm.deviceType}
                      onChange={(e) => setSensorForm(f => ({ ...f, deviceType: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="">Select type...</option>
                      <option value="Wristband Monitor">Wristband Monitor</option>
                      <option value="Blood Pressure Cuff">Blood Pressure Cuff</option>
                      <option value="Glucose Meter">Glucose Meter</option>
                      <option value="Pulse Oximeter">Pulse Oximeter</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-[1.3rem] text-neutral-900 block mb-1">Sensor MAC Address *</label>
                    <input
                      type="text"
                      value={sensorForm.macAddress}
                      onChange={(e) => setSensorForm(f => ({ ...f, macAddress: e.target.value }))}
                      placeholder="e.g., A1:B2:C3:D4:E5:F6"
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Assignment */}
              <div>
                <h4 className="text-[1.2rem] font-bold text-neutral-900 border-b border-neutral-200 pb-2 mb-4 uppercase tracking-wider">2. Network & Patient Routing</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-[1.3rem] text-neutral-900 block mb-1">Connect to Hub *</label>
                    <select
                      value={sensorForm.hubId}
                      onChange={(e) => setSensorForm(f => ({ ...f, hubId: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="">Select health center hub...</option>
                      {hubs.filter(h => h.status === 'online').map(h => (
                        <option key={h.id} value={h.id}>{h.location} ({h.serialNumber})</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-[1.3rem] text-neutral-900 block mb-1">Assign to Patient *</label>
                    <select
                      value={sensorForm.patientId}
                      onChange={(e) => setSensorForm(f => ({ ...f, patientId: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white"
                    >
                      <option value="">Choose patient...</option>
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name} — {p.room}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[1.1rem] text-neutral-500 italic mt-4">
            The sensor will begin transmitting data within 2 minutes of pairing.
          </p>

          <button
            onClick={handlePairSensor}
            disabled={sensorSubmitting || !sensorForm.patientId || !sensorForm.macAddress || !sensorForm.deviceType || !sensorForm.hubId}
            className="w-full mt-4 py-3 bg-primary text-white rounded font-body text-[1.4rem] hover:bg-primary-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {sensorSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : sensorSuccess ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                Paired!
              </>
            ) : (
              'Activate & Pair Device'
            )}
          </button>
        </div>
      </div>

      <div className="bg-white border border-neutral-300 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-h3">Wearables Inventory</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search sensors..."
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
                <th className="text-table-header text-left px-4 py-3">MAC Address</th>
                <th className="text-table-header text-left px-4 py-3">Type</th>
                <th className="text-table-header text-left px-4 py-3">Patient</th>
                <th className="text-table-header text-left px-4 py-3">Status</th>
                <th className="text-table-header text-left px-4 py-3">Last Seen</th>
                <th className="text-table-header text-left px-4 py-3">Battery</th>
                <th className="text-table-header text-left px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-100 transition-colors">
                  <td className="px-4 py-3 font-body text-[1.3rem] font-medium text-neutral-900">{item.macAddress}</td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">{item.deviceType}</td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-900">{item.patientName}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={cn('w-2 h-2 rounded-full', item.status === 'online' ? 'bg-success' : item.status === 'warning' ? 'bg-alert-yellow' : 'bg-alert-red')} />
                      <span className={cn('text-badge', item.status === 'online' ? 'text-success' : item.status === 'warning' ? 'text-[#C99600]' : 'text-alert-red')}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">{item.lastSeen}</td>
                  <td className="px-4 py-3">
                    {item.battery !== undefined ? (
                      <div className={cn('flex items-center gap-1', getBatteryColor(item.battery))}>
                        {getBatteryIcon(item.battery)}
                        <span className="text-[1.3rem] font-medium">{item.battery}%</span>
                      </div>
                    ) : (
                      <span className="text-[1.3rem] text-neutral-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteSensor(item.id)} className="p-1.5 rounded hover:bg-alert-red-light text-neutral-400 hover:text-alert-red transition-colors"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {inventoryItems.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-neutral-500 font-body text-[1.4rem]">No sensors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
