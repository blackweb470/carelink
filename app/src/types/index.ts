export interface Patient {
  id: string;
  name: string;
  nhsNumber: string;
  age: number;
  room: string;
  primaryClinician: string;
  primaryDevice: string;
  lastReading: {
    type: string;
    value: string;
    timestamp: string;
    severity: 'critical' | 'warning' | 'stable';
  };
  status: 'critical' | 'warning' | 'stable';
  initials: string;
  riskScore?: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  clinicalTrend?: string;
  missedReadings?: number;
  handoverSummary?: string;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  room: string;
  severity: 'critical' | 'warning';
  description: string;
  timestamp: string;
  status: 'unresolved' | 'acknowledged' | 'dismissed';
  triageScore?: 'High' | 'Medium' | 'Low';
}

export interface BiometricReading {
  timestamp: string;
  date: string;
  systolic?: number;
  diastolic?: number;
  bloodGlucose?: number;
  heartRate?: number;
  oxygenSaturation?: number;
}

export interface Hub {
  id: string;
  serialNumber: string;
  location: string;
  nickname?: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

export interface Sensor {
  id: string;
  macAddress: string;
  deviceType: 'Wristband Monitor' | 'Blood Pressure Cuff' | 'Glucose Meter' | 'Pulse Oximeter';
  patientId?: string;
  patientName?: string;
  hubId: string;
  hubName?: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
  battery?: number;
}

export interface ThresholdConfig {
  patientId: string;
  maxSystolic: number;
  maxDiastolic: number;
  maxBloodGlucose: number;
  minSpO2: number;
  maxHeartRate: number;
}

export interface UserProfile {
  name: string;
  role: string;
  organisation: string;
  email: string;
  practiceName: string;
  address: string;
  postcode: string;
  beds: number;
  careSetting: string;
}

export type PageRoute = 'dashboard' | 'patients' | 'patient' | 'hubs' | 'wearables' | 'alert-history';
export type TimeRange = '24H' | '7D' | '30D' | '90D';
export type BiometricType = 'bloodPressure' | 'bloodGlucose' | 'heartRate' | 'oxygenSaturation';
export type AlertFilter = 'all' | 'critical' | 'warning' | 'resolved';
export type DeviceFilter = 'all' | 'hubs' | 'sensors' | 'online' | 'offline';
