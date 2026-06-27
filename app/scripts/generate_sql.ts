import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide stub types if needed, or just map the objects
import { mockPatients } from '../src/data/mockPatients';
import { mockHubs } from '../src/data/mockHubs';
import { mockSensors } from '../src/data/mockSensors';
import { mockAlerts } from '../src/data/mockAlerts';
import { mockThresholds } from '../src/data/mockThresholds';
import { margaretReadings, henryReadings, arthurReadings, dorisReadings } from '../src/data/mockReadings';

const escapeString = (str: string | undefined | null) => {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
};

const escapeJson = (obj: any) => {
  if (!obj) return 'NULL';
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
};

const escapeNumber = (num: number | undefined | null) => {
  if (num === null || num === undefined) return 'NULL';
  return num;
};

let sql = '';

// user_profiles demo accounts
sql += `-- User Profiles
INSERT INTO user_profiles (name, role, organisation, email, practice_name, address, postcode, beds, care_setting) VALUES
('Dr. Jane Smith', 'Admin', 'GP Care Home', 'jane.smith@demo.com', 'Central Practice', '123 Health Way', 'HC1 2AB', 50, 'Nursing Home'),
('Dr. Robert Chen', 'Clinician', 'GP Care Home', 'robert.chen@demo.com', 'Northside Clinic', '456 Medical Blvd', 'NC3 4DF', 30, 'Residential Care');

`;

// patients
sql += '-- Patients\n';
mockPatients.forEach(p => {
  sql += `INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES (${escapeString(p.id)}, ${escapeString(p.name)}, ${escapeString(p.nhsNumber)}, ${escapeNumber(p.age)}, ${escapeString(p.room)}, ${escapeString(p.primaryClinician)}, ${escapeString(p.primaryDevice)}, ${escapeJson(p.lastReading)}, ${escapeString(p.status)}, ${escapeString(p.initials)});\n`;
});
sql += '\n';

// hubs
sql += '-- Hubs\n';
mockHubs.forEach(h => {
  sql += `INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES (${escapeString(h.id)}, ${escapeString(h.serialNumber)}, ${escapeString(h.location)}, ${escapeString(h.nickname)}, ${escapeString(h.status)}, ${escapeString(h.lastSeen)});\n`;
});
sql += '\n';

// sensors
sql += '-- Sensors\n';
mockSensors.forEach(s => {
  sql += `INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES (${escapeString(s.id)}, ${escapeString(s.macAddress)}, ${escapeString(s.deviceType)}, ${escapeString(s.patientId)}, ${escapeString(s.patientName)}, ${escapeString(s.hubId)}, ${escapeString(s.hubName)}, ${escapeString(s.status)}, ${escapeString(s.lastSeen)}, ${escapeNumber(s.battery)});\n`;
});
sql += '\n';

// alerts
sql += '-- Alerts\n';
mockAlerts.forEach(a => {
  sql += `INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES (${escapeString(a.id)}, ${escapeString(a.patientId)}, ${escapeString(a.patientName)}, ${escapeString(a.room)}, ${escapeString(a.severity)}, ${escapeString(a.description)}, ${escapeString(a.timestamp)}, ${escapeString(a.status)});\n`;
});
sql += '\n';

// thresholds
sql += '-- Thresholds\n';
Object.values(mockThresholds).forEach(t => {
  sql += `INSERT INTO threshold_configs (patient_id, max_systolic, max_diastolic, max_blood_glucose, min_spo2, max_heart_rate) VALUES (${escapeString(t.patientId)}, ${escapeNumber(t.maxSystolic)}, ${escapeNumber(t.maxDiastolic)}, ${escapeNumber(t.maxBloodGlucose)}, ${escapeNumber(t.minSpO2)}, ${escapeNumber(t.maxHeartRate)});\n`;
});
sql += '\n';

// biometric readings
sql += '-- Biometric Readings\n';
const allReadings = [
  ...margaretReadings.map(r => ({ ...r, patientId: 'P001' })),
  ...henryReadings.map(r => ({ ...r, patientId: 'P004' })),
  ...arthurReadings.map(r => ({ ...r, patientId: 'P003' })),
  ...dorisReadings.map(r => ({ ...r, patientId: 'P002' })),
];

allReadings.forEach(r => {
  sql += `INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES (${escapeString(r.patientId)}, ${escapeString(r.timestamp)}, ${escapeString(r.date)}, ${escapeNumber(r.systolic)}, ${escapeNumber(r.diastolic)}, ${escapeNumber(r.bloodGlucose)}, ${escapeNumber(r.heartRate)}, ${escapeNumber(r.oxygenSaturation)});\n`;
});
sql += '\n';

console.log(sql);
