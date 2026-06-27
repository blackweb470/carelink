import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { PageRoute, Patient, Alert, Hub, Sensor, ThresholdConfig, AlertFilter, DeviceFilter, UserProfile } from '@/types';
import { supabase } from '@/lib/supabase';

interface AppState {
  // Navigation
  currentPage: PageRoute;
  selectedPatientId: string | null;
  setCurrentPage: (page: PageRoute) => void;
  setSelectedPatientId: (id: string | null) => void;
  navigateToPatient: (id: string) => void;

  // User
  userProfile: UserProfile | null;
  isSetupComplete: boolean;
  setSetupComplete: () => void;
  setUserProfile: (profile: UserProfile | null) => void;

  // Patients
  patients: Patient[];

  // Alerts
  alerts: Alert[];
  alertFilter: AlertFilter;
  setAlertFilter: (filter: AlertFilter) => void;
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  unresolvedCriticalCount: number;
  unresolvedWarningCount: number;

  // Hardware
  hubs: Hub[];
  sensors: Sensor[];
  deviceFilter: DeviceFilter;
  setDeviceFilter: (filter: DeviceFilter) => void;
  registerHub: (hub: Omit<Hub, 'id' | 'status' | 'lastSeen'>) => Promise<void>;
  pairSensor: (sensor: Omit<Sensor, 'id' | 'status' | 'lastSeen'>) => Promise<void>;
  deleteSensor: (id: string) => Promise<void>;
  deleteHub: (id: string) => Promise<void>;

  // Thresholds
  thresholds: Record<string, ThresholdConfig>;
  updateThresholds: (patientId: string, config: ThresholdConfig) => Promise<void>;

  // UI
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  lastUpdated: Date;
  refreshData: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageRoute>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertFilter, setAlertFilter] = useState<AlertFilter>('all');
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [deviceFilter, setDeviceFilter] = useState<DeviceFilter>('all');
  const [thresholds, setThresholds] = useState<Record<string, ThresholdConfig>>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      
      const [
        { data: patientsData },
        { data: alertsData },
        { data: hubsData },
        { data: sensorsData },
        { data: thresholdsData }
      ] = await Promise.all([
        supabase.from('patients').select('*'),
        supabase.from('alerts').select('*'),
        supabase.from('hubs').select('*'),
        supabase.from('sensors').select('*'),
        supabase.from('threshold_configs').select('*')
      ]);

      if (patientsData) {
        setPatients(patientsData.map(p => ({
          id: p.id,
          name: p.name,
          nhsNumber: p.nhs_number,
          age: p.age,
          room: p.room,
          primaryClinician: p.primary_clinician,
          primaryDevice: p.primary_device,
          lastReading: p.last_reading,
          status: p.status,
          initials: p.initials,
        } as Patient)));
      }

      if (alertsData) {
        setAlerts(alertsData.map(a => ({
          id: a.id,
          patientId: a.patient_id,
          patientName: a.patient_name,
          room: a.room,
          severity: a.severity,
          description: a.description,
          timestamp: a.timestamp,
          status: a.status,
        } as Alert)));
      }

      if (hubsData) {
        setHubs(hubsData.map(h => ({
          id: h.id,
          serialNumber: h.serial_number,
          location: h.location,
          nickname: h.nickname,
          status: h.status,
          lastSeen: h.last_seen,
        } as Hub)));
      }

      if (sensorsData) {
        setSensors(sensorsData.map(s => ({
          id: s.id,
          macAddress: s.mac_address,
          deviceType: s.device_type,
          patientId: s.patient_id,
          patientName: s.patient_name,
          hubId: s.hub_id,
          hubName: s.hub_name,
          status: s.status,
          lastSeen: s.last_seen,
          battery: s.battery,
        } as Sensor)));
      }

      if (thresholdsData) {
        const tMap: Record<string, ThresholdConfig> = {};
        thresholdsData.forEach(t => {
          tMap[t.patient_id] = {
            patientId: t.patient_id,
            maxSystolic: t.max_systolic,
            maxDiastolic: t.max_diastolic,
            maxBloodGlucose: t.max_blood_glucose,
            minSpO2: t.min_spo2,
            maxHeartRate: t.max_heart_rate,
          };
        });
        setThresholds(tMap);
      }

      setIsLoading(false);
    }
    loadData();
  }, [lastUpdated]);

  const navigateToPatient = useCallback((id: string) => {
    setSelectedPatientId(id);
    setCurrentPage('patient');
  }, []);

  const setSetupComplete = useCallback(() => {
    setIsSetupComplete(true);
    setCurrentPage('dashboard');
  }, []);

  const acknowledgeAlert = useCallback(async (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'acknowledged' as const } : a));
    await supabase.from('alerts').update({ status: 'acknowledged' }).eq('id', id);
  }, []);

  const dismissAlert = useCallback(async (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'dismissed' as const } : a));
    await supabase.from('alerts').update({ status: 'dismissed' }).eq('id', id);
  }, []);

  const registerHub = useCallback(async (hub: Omit<Hub, 'id' | 'status' | 'lastSeen'>) => {
    const newId = `H${String(hubs.length + 1).padStart(3, '0')}`;
    const newHub: Hub = {
      ...hub,
      id: newId,
      status: 'online',
      lastSeen: 'Just now',
    };
    setHubs(prev => [...prev, newHub]);
    await supabase.from('hubs').insert({
      id: newId,
      serial_number: hub.serialNumber,
      location: hub.location,
      nickname: hub.nickname,
      status: 'online',
      last_seen: 'Just now',
    });
  }, [hubs.length]);

  const pairSensor = useCallback(async (sensor: Omit<Sensor, 'id' | 'status' | 'lastSeen'>) => {
    const newId = `S${String(sensors.length + 1).padStart(3, '0')}`;
    const newSensor: Sensor = {
      ...sensor,
      id: newId,
      status: 'online',
      lastSeen: 'Just now',
      battery: 100,
    };
    setSensors(prev => [...prev, newSensor]);
    await supabase.from('sensors').insert({
      id: newId,
      mac_address: sensor.macAddress,
      device_type: sensor.deviceType,
      patient_id: sensor.patientId,
      patient_name: sensor.patientName,
      hub_id: sensor.hubId,
      hub_name: sensor.hubName,
      status: 'online',
      last_seen: 'Just now',
      battery: 100,
    });
  }, [sensors.length]);

  const deleteSensor = useCallback(async (id: string) => {
    setSensors(prev => prev.filter(s => s.id !== id));
    await supabase.from('sensors').delete().eq('id', id);
  }, []);

  const deleteHub = useCallback(async (id: string) => {
    setHubs(prev => prev.filter(h => h.id !== id));
    await supabase.from('hubs').delete().eq('id', id);
  }, []);

  const updateThresholds = useCallback(async (patientId: string, config: ThresholdConfig) => {
    setThresholds(prev => ({ ...prev, [patientId]: config }));
    await supabase.from('threshold_configs').upsert({
      patient_id: patientId,
      max_systolic: config.maxSystolic,
      max_diastolic: config.maxDiastolic,
      max_blood_glucose: config.maxBloodGlucose,
      min_spo2: config.minSpO2,
      max_heart_rate: config.maxHeartRate,
    });
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  const refreshData = useCallback(() => {
    setLastUpdated(new Date());
  }, []);

  const unresolvedCriticalCount = alerts.filter(a => a.severity === 'critical' && a.status === 'unresolved').length;
  const unresolvedWarningCount = alerts.filter(a => a.severity === 'warning' && a.status === 'unresolved').length;

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedPatientId,
        setCurrentPage,
        setSelectedPatientId,
        navigateToPatient,
        userProfile,
        isSetupComplete,
        setSetupComplete,
        setUserProfile,
        patients,
        alerts,
        alertFilter,
        setAlertFilter,
        acknowledgeAlert,
        dismissAlert,
        unresolvedCriticalCount,
        unresolvedWarningCount,
        hubs,
        sensors,
        deviceFilter,
        setDeviceFilter,
        registerHub,
        pairSensor,
        deleteSensor,
        deleteHub,
        thresholds,
        updateThresholds,
        sidebarCollapsed,
        toggleSidebar,
        lastUpdated,
        refreshData,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
