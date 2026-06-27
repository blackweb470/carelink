import type { BiometricReading } from '@/types';

function generateDateRange(days: number): string[] {
  const dates: string[] = [];
  const now = new Date('2026-05-26T00:00:00');
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

const dates30D = generateDateRange(30);
const dates7D = generateDateRange(7);

// Margaret Whitfield - Critical BP trending up, low SpO2
export const margaretReadings: BiometricReading[] = dates30D.map((date, i) => {
  const progress = i / 29;
  const systolic = Math.round(135 + progress * 50 + Math.sin(i * 0.5) * 8);
  const diastolic = Math.round(82 + progress * 28 + Math.sin(i * 0.5) * 5);
  const heartRate = Math.round(68 + Math.sin(i * 0.3) * 6 + (i > 25 ? 8 : 0));
  const oxygenSaturation = Math.round(97 - (i > 26 ? (i - 26) * 3 : 0) + Math.sin(i * 0.4) * 1);
  const bloodGlucose = Math.round(65 + Math.sin(i * 0.2) * 8 + (i > 20 ? 15 : 0)) / 10;
  return {
    timestamp: `${date}T08:00:00`,
    date,
    systolic: Math.min(systolic, 195),
    diastolic: Math.min(diastolic, 118),
    heartRate: Math.min(heartRate, 105),
    oxygenSaturation: Math.max(Math.min(oxygenSaturation, 99), 82),
    bloodGlucose: Math.min(bloodGlucose, 12.0),
  };
});

// Henry Cavendish - Low SpO2, elevated HR
export const henryReadings: BiometricReading[] = dates7D.map((date, i) => ({
  timestamp: `${date}T08:00:00`,
  date,
  systolic: Math.round(128 + Math.sin(i * 0.8) * 10),
  diastolic: Math.round(78 + Math.sin(i * 0.8) * 6),
  heartRate: Math.round(72 + (i > 3 ? (i - 3) * 6 : 0) + Math.sin(i * 0.5) * 4),
  oxygenSaturation: Math.round(96 - (i > 4 ? (i - 4) * 4 : 0)),
  bloodGlucose: Math.round(58 + Math.sin(i * 0.3) * 6) / 10,
}));

// Arthur Pendlebury - Stable
export const arthurReadings: BiometricReading[] = dates7D.map((date, i) => ({
  timestamp: `${date}T08:00:00`,
  date,
  systolic: Math.round(125 + Math.sin(i * 0.6) * 8),
  diastolic: Math.round(76 + Math.sin(i * 0.6) * 5),
  heartRate: Math.round(68 + Math.sin(i * 0.4) * 4),
  oxygenSaturation: Math.round(97 + Math.sin(i * 0.3) * 1),
  bloodGlucose: Math.round(55 + Math.sin(i * 0.2) * 5) / 10,
}));

// Doris Lancaster - Glucose trending up
export const dorisReadings: BiometricReading[] = dates7D.map((date, i) => ({
  timestamp: `${date}T08:00:00`,
  date,
  systolic: Math.round(138 + Math.sin(i * 0.5) * 6),
  diastolic: Math.round(84 + Math.sin(i * 0.5) * 4),
  heartRate: Math.round(74 + Math.sin(i * 0.4) * 4),
  oxygenSaturation: Math.round(95 + Math.sin(i * 0.3) * 2),
  bloodGlucose: Math.round(72 + i * 3 + Math.sin(i * 0.5) * 5) / 10,
}));

export function getPatientReadings(patientId: string): BiometricReading[] {
  switch (patientId) {
    case 'P001': return margaretReadings;
    case 'P004': return henryReadings;
    case 'P003': return arthurReadings;
    case 'P002': return dorisReadings;
    default: return arthurReadings;
  }
}

export function getReadingsByTimeRange(readings: BiometricReading[], range: '24H' | '7D' | '30D' | '90D'): BiometricReading[] {
  const now = new Date('2026-05-26');
  const daysMap = { '24H': 1, '7D': 7, '30D': 30, '90D': 90 };
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - daysMap[range]);
  return readings.filter(r => new Date(r.date) >= cutoff);
}
