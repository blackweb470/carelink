import type { Sensor } from '@/types';

export const mockSensors: Sensor[] = [
  { id: 'S001', macAddress: 'KAYZ-SENS-A1B2-C3D4', deviceType: 'Blood Pressure Cuff', patientId: 'P001', patientName: 'Margaret Whitfield', hubId: 'H005', hubName: 'Hub-102', status: 'online', lastSeen: '5 min ago', battery: 78 },
  { id: 'S002', macAddress: 'KAYZ-SENS-E5F6-G7H8', deviceType: 'Wristband Monitor', patientId: 'P003', patientName: 'Arthur Pendlebury', hubId: 'H001', hubName: 'Hub-Main', status: 'online', lastSeen: '3 min ago', battery: 92 },
  { id: 'S003', macAddress: 'KAYZ-SENS-I9J0-K1L2', deviceType: 'Glucose Meter', patientId: 'P002', patientName: 'Doris Lancaster', hubId: 'H002', hubName: 'Hub-WardA', status: 'online', lastSeen: '12 min ago', battery: 45 },
  { id: 'S004', macAddress: 'KAYZ-SENS-M3N4-O5P6', deviceType: 'Pulse Oximeter', patientId: 'P004', patientName: 'Henry Cavendish', hubId: 'H003', hubName: 'Hub-WardB', status: 'warning', lastSeen: '1 hour ago', battery: 12 },
  { id: 'S005', macAddress: 'KAYZ-SENS-Q7R8-S9T0', deviceType: 'Blood Pressure Cuff', patientId: 'P005', patientName: 'Eileen Marsh', hubId: 'H004', hubName: 'Hub-Dining', status: 'online', lastSeen: '8 min ago', battery: 15 },
  { id: 'S006', macAddress: 'KAYZ-SENS-U1V2-W3X4', deviceType: 'Wristband Monitor', patientId: 'P006', patientName: 'Stanley Briggs', hubId: 'H001', hubName: 'Hub-Main', status: 'online', lastSeen: '6 min ago', battery: 67 },
  { id: 'S007', macAddress: 'KAYZ-SENS-Y5Z6-A7B8', deviceType: 'Glucose Meter', patientId: 'P007', patientName: 'Florence Night', hubId: 'H006', hubName: 'Hub-Reception', status: 'online', lastSeen: '15 min ago', battery: 89 },
  { id: 'S008', macAddress: 'KAYZ-SENS-C9D0-E1F2', deviceType: 'Pulse Oximeter', patientId: 'P008', patientName: 'George Holloway', hubId: 'H008', hubName: 'Hub-Physio', status: 'online', lastSeen: '7 min ago', battery: 54 },
  { id: 'S009', macAddress: 'KAYZ-SENS-G3H4-I5J6', deviceType: 'Blood Pressure Cuff', patientId: 'P009', patientName: 'Violet Smythe', hubId: 'H009', hubName: 'Hub-Garden', status: 'online', lastSeen: '10 min ago', battery: 33 },
  { id: 'S010', macAddress: 'KAYZ-SENS-K7L8-M9N0', deviceType: 'Wristband Monitor', patientId: 'P010', patientName: 'Albert Finch', hubId: 'H010', hubName: 'Hub-Admin', status: 'online', lastSeen: '4 min ago', battery: 71 },
  { id: 'S011', macAddress: 'KAYZ-SENS-N1O2-P3Q4', deviceType: 'Glucose Meter', patientId: 'P011', patientName: 'Rose Campbell', hubId: 'H004', hubName: 'Hub-Dining', status: 'online', lastSeen: '9 min ago', battery: 88 },
  { id: 'S012', macAddress: 'KAYZ-SENS-R5S6-T7U8', deviceType: 'Pulse Oximeter', patientId: 'P012', patientName: 'Edmund Wright', hubId: 'H002', hubName: 'Hub-WardA', status: 'online', lastSeen: '11 min ago', battery: 62 },
];
