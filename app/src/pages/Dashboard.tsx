import { motion } from 'framer-motion';
import { Users, AlertCircle, AlertTriangle, Wifi } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MetricCard } from '@/components/MetricCard';
import { AlertFeed } from '@/components/AlertFeed';
import { PatientTable } from '@/components/PatientTable';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

export function Dashboard() {
  const { patients, unresolvedCriticalCount, unresolvedWarningCount, hubs } = useApp();

  const onlineHubs = hubs.filter((h) => h.status === 'online').length;
  const totalHubs = hubs.length;
  const offlineHubs = totalHubs - onlineHubs;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Metrics Ribbon */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          icon={Users}
          iconBg="bg-[#EBF2FF]"
          iconColor="#0E61FE"
          value={patients.length}
          label="Active Patients"
          trend="+12 this week"
          trendType="up"
          trendColor="text-success"
        />
        <MetricCard
          icon={AlertCircle}
          iconBg="bg-alert-red-light"
          iconColor="#FA4D56"
          value={unresolvedCriticalCount}
          valueColor="text-alert-red"
          label="Critical Alerts"
          trend="2 new today"
          trendType="up"
          trendColor="text-alert-red"
          borderColor="border-alert-red/30"
        />
        <MetricCard
          icon={AlertTriangle}
          iconBg="bg-alert-yellow-light"
          iconColor="#F1C21B"
          value={unresolvedWarningCount}
          valueColor="text-[#C99600]"
          label="Warning Alerts"
          trend="5 new today"
          trendType="up"
          trendColor="text-alert-yellow"
        />
        <MetricCard
          icon={Wifi}
          iconBg="bg-success-light"
          iconColor="#24A148"
          value={onlineHubs}
          valueColor="text-success"
          label={`of ${totalHubs} Hubs Online`}
          subIndicators={[
            { label: `${onlineHubs} Online`, color: 'text-success', dotColor: 'bg-success' },
            { label: `${offlineHubs} Offline`, color: 'text-alert-red', dotColor: 'bg-alert-red' },
          ]}
        />
      </motion.div>

      {/* Content Row 1: Alert Feed + Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <AlertFeed />
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white border border-neutral-300 rounded-lg p-6">
            <h3 className="text-h3 mb-4">Today's Overview</h3>
            <div className="space-y-4">
              {[
                { label: 'New Readings', value: '1,247', color: 'text-neutral-900' },
                { label: 'Avg. Response Time', value: '4.2 min', color: 'text-success' },
                { label: 'Alerts Resolved', value: '8/17', color: 'text-neutral-900' },
                { label: 'Devices Online', value: '42/45', color: 'text-success' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                  <span className="text-[1.3rem] text-neutral-600">{stat.label}</span>
                  <span className={`font-body text-[1.4rem] font-medium ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <button className="flex items-center gap-1 text-primary text-[1.2rem] font-body hover:underline">
                View Full Report
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Patient Directory Table */}
      <motion.div variants={itemVariants}>
        <PatientTable />
      </motion.div>
    </motion.div>
  );
}
