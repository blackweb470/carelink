import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Heart, Stethoscope, Droplets, Wind, AlertTriangle
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { useApp } from '@/context/AppContext';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import type { BiometricReading } from '@/types';
import { FilterButtonGroup } from '@/components/FilterButtonGroup';
import type { TimeRange, BiometricType } from '@/types';
import { cn } from '@/lib/utils';
import { ClinicalTrendSnapshot } from '@/components/ClinicalTrendSnapshot';

const biometricTabs: { id: BiometricType; label: string; color: string }[] = [
  { id: 'bloodPressure', label: 'Blood Pressure', color: '#0E61FE' },
  { id: 'bloodGlucose', label: 'Blood Glucose', color: '#009D9A' },
  { id: 'heartRate', label: 'Heart Rate', color: '#8A3FFC' },
  { id: 'oxygenSaturation', label: 'Oxygen Saturation', color: '#FF832B' },
];

const timeRanges: { value: TimeRange; label: string }[] = [
  { value: '24H', label: '24H' },
  { value: '7D', label: '7D' },
  { value: '30D', label: '30D' },
  { value: '90D', label: '90D' },
];

export function PatientDetail() {
  const { selectedPatientId, patients, thresholds, updateThresholds, setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState<BiometricType>('bloodPressure');
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [thresholdForm, setThresholdForm] = useState({
    maxSystolic: '',
    maxDiastolic: '',
    maxBloodGlucose: '',
    minSpO2: '',
    maxHeartRate: '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const patient = patients.find((p) => p.id === selectedPatientId) || patients[0];
  const patientThresholds = patient ? (thresholds[patient.id] || thresholds['P001']) : thresholds['P001'];
  
  const [allReadings, setAllReadings] = useState<BiometricReading[]>([]);

  useEffect(() => {
    async function loadReadings() {
      if (!patient) return;
      const { data } = await supabase
        .from('biometric_readings')
        .select('*')
        .eq('patient_id', patient.id)
        .order('timestamp', { ascending: true });

      if (data) {
        setAllReadings(data.map(r => ({
          timestamp: r.timestamp,
          date: r.date,
          systolic: r.systolic,
          diastolic: r.diastolic,
          bloodGlucose: r.blood_glucose,
          heartRate: r.heart_rate,
          oxygenSaturation: r.oxygen_saturation,
        })));
      }
    }
    loadReadings();
  }, [patient?.id]);

  const readings = useMemo(() => {
    const now = new Date('2026-05-26');
    const daysMap: Record<TimeRange, number> = { '24H': 1, '7D': 7, '30D': 30, '90D': 90 };
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - daysMap[timeRange]);
    return allReadings.filter(r => new Date(r.date) >= cutoff);
  }, [allReadings, timeRange]);

  if (!patient || !patientThresholds) {
    return <div className="p-8 text-center text-[1.4rem] text-neutral-500 font-body">Loading patient data...</div>;
  }

  // Current values from most recent reading
  const latestReading = allReadings[allReadings.length - 1];
  const currentSystolic = latestReading?.systolic || 0;
  const currentDiastolic = latestReading?.diastolic || 0;
  const currentGlucose = latestReading?.bloodGlucose || 0;
  const currentSpO2 = latestReading?.oxygenSaturation || 0;
  const currentHR = latestReading?.heartRate || 0;

  const getSeverityForValue = (value: number, type: string) => {
    switch (type) {
      case 'systolic': return value > patientThresholds.maxSystolic ? 'critical' : value > patientThresholds.maxSystolic * 0.9 ? 'warning' : 'stable';
      case 'diastolic': return value > patientThresholds.maxDiastolic ? 'critical' : value > patientThresholds.maxDiastolic * 0.9 ? 'warning' : 'stable';
      case 'glucose': return value > patientThresholds.maxBloodGlucose ? 'warning' : 'stable';
      case 'spo2': return value < patientThresholds.minSpO2 ? 'critical' : value < patientThresholds.minSpO2 + 2 ? 'warning' : 'stable';
      case 'hr': return value > patientThresholds.maxHeartRate ? 'warning' : 'stable';
      default: return 'stable';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-alert-red';
      case 'warning': return 'text-alert-yellow';
      default: return 'text-success';
    }
  };

  const handleSaveThresholds = () => {
    setSaving(true);
    setTimeout(() => {
      updateThresholds(patient.id, {
        patientId: patient.id,
        maxSystolic: Number(thresholdForm.maxSystolic) || patientThresholds.maxSystolic,
        maxDiastolic: Number(thresholdForm.maxDiastolic) || patientThresholds.maxDiastolic,
        maxBloodGlucose: Number(thresholdForm.maxBloodGlucose) || patientThresholds.maxBloodGlucose,
        minSpO2: Number(thresholdForm.minSpO2) || patientThresholds.minSpO2,
        maxHeartRate: Number(thresholdForm.maxHeartRate) || patientThresholds.maxHeartRate,
      });
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const chartData = useMemo(() => {
    return readings.map((r) => ({
      date: r.date.slice(5),
      systolic: r.systolic,
      diastolic: r.diastolic,
      bloodGlucose: r.bloodGlucose,
      heartRate: r.heartRate,
      oxygenSaturation: r.oxygenSaturation,
    }));
  }, [readings]);

  const renderChart = () => {
    const tab = biometricTabs.find((t) => t.id === activeTab)!;

    if (activeTab === 'bloodPressure') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#525252' }} />
            <YAxis domain={[60, 220]} tick={{ fontSize: 11, fill: '#525252' }} />
            <Tooltip
              contentStyle={{ background: '#fff', border: '1px solid #D4D4D4', borderRadius: '8px', fontSize: '12px' }}
            />
            <ReferenceLine y={patientThresholds.maxSystolic} stroke="#FA4D56" strokeDasharray="5 5" label={{ value: 'Max Systolic', position: 'right', fontSize: 11, fill: '#FA4D56' }} />
            <ReferenceLine y={patientThresholds.maxDiastolic} stroke="#F1C21B" strokeDasharray="5 5" label={{ value: 'Max Diastolic', position: 'right', fontSize: 11, fill: '#C99600' }} />
            <Line type="monotone" dataKey="systolic" stroke="#0E61FE" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} name="Systolic" animationDuration={800} />
            <Line type="monotone" dataKey="diastolic" stroke="#33B1FF" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} name="Diastolic" animationDuration={800} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    const dataKey = activeTab === 'bloodGlucose' ? 'bloodGlucose' : activeTab === 'heartRate' ? 'heartRate' : 'oxygenSaturation';
    const threshold = activeTab === 'bloodGlucose' ? patientThresholds.maxBloodGlucose : activeTab === 'heartRate' ? patientThresholds.maxHeartRate : patientThresholds.minSpO2;
    const domain = activeTab === 'bloodGlucose' ? [2, 20] : activeTab === 'heartRate' ? [40, 160] : [80, 100];
    const thresholdLabel = activeTab === 'bloodGlucose' ? 'Max Glucose' : activeTab === 'heartRate' ? 'Max HR' : 'Min SpO2';

    return (
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#525252' }} />
          <YAxis domain={domain} tick={{ fontSize: 11, fill: '#525252' }} />
          <Tooltip contentStyle={{ background: '#fff', border: '1px solid #D4D4D4', borderRadius: '8px', fontSize: '12px' }} />
          <ReferenceLine y={threshold} stroke="#FA4D56" strokeDasharray="5 5" label={{ value: thresholdLabel, position: 'right', fontSize: 11, fill: '#FA4D56' }} />
          <Line type="monotone" dataKey={dataKey} stroke={tab.color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} animationDuration={800} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-6">
      {/* Back Navigation */}
      <button
        onClick={() => setCurrentPage('dashboard')}
        className="flex items-center gap-1 text-primary font-body text-[1.4rem] hover:underline"
      >
        <ChevronLeft size={16} /> Back to Dashboard
      </button>

      {/* Patient Summary Card */}
      <div className="bg-white border border-neutral-300 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/5">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white font-heading text-[2.4rem] shrink-0">
                {patient.initials}
              </div>
              <div>
                <h2 className="text-h2">{patient.name}</h2>
                <p className="text-[1.3rem] text-neutral-600 mt-1">NHS: {patient.nhsNumber}</p>
                <p className="text-[1.3rem] text-neutral-600 flex items-center gap-1 mt-1">
                  <Stethoscope size={14} /> {patient.primaryClinician}
                </p>
                <p className="text-[1.3rem] text-neutral-600 mt-1">{patient.room}</p>
                <span className={cn(
                  'text-badge px-3 py-0.5 rounded-pill mt-2 inline-block',
                  patient.status === 'critical' ? 'bg-alert-red text-white' :
                  patient.status === 'warning' ? 'bg-alert-yellow text-neutral-900' :
                  'bg-success-light text-success'
                )}>
                  {patient.status === 'critical' ? 'Critical' : patient.status === 'warning' ? 'Warning' : 'Stable'}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Heart, color: '#8A3FFC', value: `${currentHR} bpm`, label: 'Heart Rate', severity: getSeverityForValue(currentHR, 'hr') },
              { icon: Stethoscope, color: '#0E61FE', value: `${currentSystolic}/${currentDiastolic}`, label: 'Blood Pressure', severity: getSeverityForValue(currentSystolic, 'systolic') },
              { icon: Droplets, color: '#009D9A', value: `${currentGlucose}`, label: 'Glucose mmol/L', severity: getSeverityForValue(currentGlucose, 'glucose') },
              { icon: Wind, color: '#FF832B', value: `${currentSpO2}%`, label: 'SpO2', severity: getSeverityForValue(currentSpO2, 'spo2') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon size={20} color={stat.color} className="mx-auto mb-2" />
                <p className={cn('text-metric text-[1.8rem]', getSeverityColor(stat.severity))}>{stat.value}</p>
                <p className="text-metric-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI Trend Snapshot & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ClinicalTrendSnapshot patient={patient} readings={allReadings} thresholds={patientThresholds} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          {/* Missed Monitoring Detection */}
          <div className="bg-white border border-neutral-300 rounded-lg p-5">
            <h4 className="font-heading text-[1.4rem] font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <AlertTriangle size={18} className="text-alert-yellow" /> Missed Monitoring
            </h4>
            {patient.missedReadings && patient.missedReadings > 0 ? (
               <div className="bg-alert-yellow/10 p-3 rounded border border-alert-yellow/20">
                 <p className="text-[1.3rem] text-alert-yellow font-medium mb-1">
                   {patient.missedReadings} scheduled reading{patient.missedReadings > 1 ? 's' : ''} missed
                 </p>
                 <p className="text-[1.2rem] text-neutral-600">Possible implications: Non-adherence or device failure.</p>
               </div>
            ) : (
               <p className="text-[1.3rem] text-neutral-600">All scheduled monitoring has been completed successfully.</p>
            )}
          </div>
          {/* Clinical Handover Summary */}
          <div className="bg-white border border-neutral-300 rounded-lg p-5 h-[calc(100%-120px)]">
            <h4 className="font-heading text-[1.4rem] font-bold text-neutral-900 mb-2 flex items-center gap-2">
              <Stethoscope size={18} className="text-primary" /> Handover Summary
            </h4>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 h-[calc(100%-30px)]">
              <p className="text-[1.3rem] text-neutral-700">
                 {patient.handoverSummary || "No significant trends to report at handover. Vitals remain stable within expected parameters."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row: Charts + Thresholds */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Charts */}
        <div className="lg:col-span-7 bg-white border border-neutral-300 rounded-lg p-6">
          {/* Tab Bar */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex border-b border-neutral-200">
              {biometricTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-4 py-3 font-body text-[1.4rem] border-b-2 transition-colors',
                    activeTab === tab.id
                      ? 'text-primary border-primary font-medium'
                      : 'text-neutral-600 border-transparent hover:text-neutral-900'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <FilterButtonGroup options={timeRanges} active={timeRange} onChange={setTimeRange} size="sm" />
          </div>

          {/* Chart */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + timeRange}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderChart()}
              <div className="flex items-center justify-end gap-4 mt-2">
                {activeTab === 'bloodPressure' ? (
                  <>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#0E61FE]" /><span className="text-[1.1rem] text-neutral-600">Systolic</span></div>
                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#33B1FF]" /><span className="text-[1.1rem] text-neutral-600">Diastolic</span></div>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: biometricTabs.find(t => t.id === activeTab)?.color }} />
                    <span className="text-[1.1rem] text-neutral-600">{biometricTabs.find(t => t.id === activeTab)?.label}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thresholds Panel */}
        <div className="lg:col-span-3 bg-white border border-neutral-300 rounded-lg p-6">
          <h3 className="text-h3">Clinical Thresholds</h3>
          <p className="text-[1.2rem] text-neutral-500 mt-1 mb-5">Set personalized safety limits for this patient.</p>

          <div className="space-y-4">
            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Max BP (Systolic)</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={String(patientThresholds.maxSystolic)}
                  onChange={(e) => setThresholdForm(p => ({ ...p, maxSystolic: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-14"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[1.2rem] text-neutral-400">mmHg</span>
              </div>
              <p className={cn('text-[1.1rem] mt-1', getSeverityColor(getSeverityForValue(currentSystolic, 'systolic')))}>
                Current: {currentSystolic} mmHg
              </p>
            </div>

            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Max BP (Diastolic)</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={String(patientThresholds.maxDiastolic)}
                  onChange={(e) => setThresholdForm(p => ({ ...p, maxDiastolic: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-14"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[1.2rem] text-neutral-400">mmHg</span>
              </div>
              <p className={cn('text-[1.1rem] mt-1', getSeverityColor(getSeverityForValue(currentDiastolic, 'diastolic')))}>
                Current: {currentDiastolic} mmHg
              </p>
            </div>

            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Max Blood Glucose</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  placeholder={String(patientThresholds.maxBloodGlucose)}
                  onChange={(e) => setThresholdForm(p => ({ ...p, maxBloodGlucose: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[1.2rem] text-neutral-400">mmol/L</span>
              </div>
              <p className={cn('text-[1.1rem] mt-1', getSeverityColor(getSeverityForValue(currentGlucose, 'glucose')))}>
                Current: {currentGlucose} mmol/L
              </p>
            </div>

            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Min SpO2</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={String(patientThresholds.minSpO2)}
                  onChange={(e) => setThresholdForm(p => ({ ...p, minSpO2: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[1.2rem] text-neutral-400">%</span>
              </div>
              <p className={cn('text-[1.1rem] mt-1', getSeverityColor(getSeverityForValue(currentSpO2, 'spo2')))}>
                Current: {currentSpO2}%
              </p>
            </div>

            <div>
              <label className="font-body text-[1.4rem] text-neutral-900 block mb-1">Max Heart Rate</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder={String(patientThresholds.maxHeartRate)}
                  onChange={(e) => setThresholdForm(p => ({ ...p, maxHeartRate: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-neutral-300 rounded text-[1.4rem] font-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[1.2rem] text-neutral-400">bpm</span>
              </div>
              <p className={cn('text-[1.1rem] mt-1', getSeverityColor(getSeverityForValue(currentHR, 'hr')))}>
                Current: {currentHR} bpm
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveThresholds}
            disabled={saving}
            className="w-full mt-6 py-3 bg-primary text-white rounded font-body text-[1.4rem] hover:bg-primary-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : saved ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" /></svg>
                Saved!
              </>
            ) : (
              'Save Thresholds'
            )}
          </button>
          <button className="w-full mt-2 py-2 text-neutral-600 font-body text-[1.2rem] hover:text-neutral-900 transition-colors">
            Reset to Default
          </button>
        </div>
      </div>

      {/* Recent Readings Table */}
      <div className="bg-white border border-neutral-300 rounded-lg p-6">
        <h3 className="text-h3 mb-4">Recent Readings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-100">
                <th className="text-table-header text-left px-4 py-3">Timestamp</th>
                <th className="text-table-header text-left px-4 py-3">Device Type</th>
                <th className="text-table-header text-left px-4 py-3">Reading Type</th>
                <th className="text-table-header text-left px-4 py-3">Value</th>
                <th className="text-table-header text-left px-4 py-3">Unit</th>
                <th className="text-table-header text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ts: '26 May, 10:23 AM', device: 'Blood Pressure Cuff', type: 'Blood Pressure', value: `${currentSystolic}/${currentDiastolic}`, unit: 'mmHg', severity: getSeverityForValue(currentSystolic, 'systolic') },
                { ts: '26 May, 09:15 AM', device: 'Wristband Monitor', type: 'Heart Rate', value: String(currentHR), unit: 'bpm', severity: getSeverityForValue(currentHR, 'hr') },
                { ts: '26 May, 08:45 AM', device: 'Pulse Oximeter', type: 'SpO2', value: String(currentSpO2), unit: '%', severity: getSeverityForValue(currentSpO2, 'spo2') },
                { ts: '25 May, 04:32 PM', device: 'Glucose Meter', type: 'Blood Glucose', value: String(currentGlucose), unit: 'mmol/L', severity: getSeverityForValue(currentGlucose, 'glucose') },
              ].map((row, i) => (
                <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-100 transition-colors">
                  <td className="px-4 py-3 font-body text-[1.3rem]">{row.ts}</td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">{row.device}</td>
                  <td className="px-4 py-3 font-body text-[1.3rem]">{row.type}</td>
                  <td className={cn('px-4 py-3 font-body text-[1.3rem] font-medium', getSeverityColor(row.severity))}>{row.value}</td>
                  <td className="px-4 py-3 font-body text-[1.3rem] text-neutral-600">{row.unit}</td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      'text-badge px-3 py-0.5 rounded-pill',
                      row.severity === 'critical' ? 'bg-alert-red text-white' :
                      row.severity === 'warning' ? 'bg-alert-yellow text-neutral-900' :
                      'bg-success-light text-success'
                    )}>
                      {row.severity === 'critical' ? 'Critical' : row.severity === 'warning' ? 'Warning' : 'Stable'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
