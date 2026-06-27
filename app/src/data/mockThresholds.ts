import type { ThresholdConfig } from '@/types';

export const defaultThresholds: ThresholdConfig = {
  patientId: 'default',
  maxSystolic: 160,
  maxDiastolic: 100,
  maxBloodGlucose: 8.5,
  minSpO2: 92,
  maxHeartRate: 100,
};

export const mockThresholds: Record<string, ThresholdConfig> = {
  P001: { patientId: 'P001', maxSystolic: 160, maxDiastolic: 100, maxBloodGlucose: 8.5, minSpO2: 92, maxHeartRate: 100 },
  P002: { patientId: 'P002', maxSystolic: 155, maxDiastolic: 95, maxBloodGlucose: 8.0, minSpO2: 93, maxHeartRate: 95 },
  P003: { patientId: 'P003', maxSystolic: 150, maxDiastolic: 90, maxBloodGlucose: 7.5, minSpO2: 94, maxHeartRate: 90 },
  P004: { patientId: 'P004', maxSystolic: 155, maxDiastolic: 95, maxBloodGlucose: 8.0, minSpO2: 93, maxHeartRate: 95 },
};
