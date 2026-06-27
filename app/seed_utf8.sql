-- User Profiles
INSERT INTO user_profiles (name, role, organisation, email, practice_name, address, postcode, beds, care_setting) VALUES
('Dr. Jane Smith', 'Admin', 'GP Care Home', 'jane.smith@demo.com', 'Central Practice', '123 Health Way', 'HC1 2AB', 50, 'Nursing Home'),
('Dr. Robert Chen', 'Clinician', 'GP Care Home', 'robert.chen@demo.com', 'Northside Clinic', '456 Medical Blvd', 'NC3 4DF', 30, 'Residential Care');

-- Patients
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P001', 'Margaret Whitfield', '943 476 5912', 78, 'Room 4A', 'Dr. Jane Smith', 'Blood Pressure Cuff', '{"type":"Blood Pressure","value":"185/110 mmHg","timestamp":"10:23 AM","severity":"critical"}'::jsonb, 'critical', 'MW');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P002', 'Doris Lancaster', '882 341 9076', 82, 'Room 2C', 'Dr. Jane Smith', 'Glucose Meter', '{"type":"Blood Glucose","value":"9.2 mmol/L","timestamp":"Yesterday, 4:32 PM","severity":"warning"}'::jsonb, 'warning', 'DL');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P003', 'Arthur Pendlebury', '756 908 2341', 69, 'Room 5D', 'Dr. Robert Chen', 'Wristband Monitor', '{"type":"Heart Rate","value":"72 bpm","timestamp":"08:30 AM","severity":"stable"}'::jsonb, 'stable', 'AP');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P004', 'Henry Cavendish', '621 453 7890', 75, 'Room 3B', 'Dr. Robert Chen', 'Pulse Oximeter', '{"type":"SpO2","value":"88%","timestamp":"09:45 AM","severity":"critical"}'::jsonb, 'critical', 'HC');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P005', 'Eileen Marsh', '534 782 1098', 84, 'Room 1A', 'Dr. Jane Smith', 'Blood Pressure Cuff', '{"type":"Blood Pressure","value":"142/88 mmHg","timestamp":"07:15 AM","severity":"stable"}'::jsonb, 'stable', 'EM');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P006', 'Stanley Briggs', '478 231 5643', 80, 'Room 2A', 'Dr. Sarah Williams', 'Wristband Monitor', '{"type":"Heart Rate","value":"68 bpm","timestamp":"06:45 AM","severity":"stable"}'::jsonb, 'stable', 'SB');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P007', 'Florence Night', '389 654 2178', 77, 'Room 3C', 'Dr. Sarah Williams', 'Glucose Meter', '{"type":"Blood Glucose","value":"7.8 mmol/L","timestamp":"Yesterday, 6:00 PM","severity":"warning"}'::jsonb, 'warning', 'FN');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P008', 'George Holloway', '267 891 3456', 71, 'Room 4B', 'Dr. Robert Chen', 'Pulse Oximeter', '{"type":"SpO2","value":"94%","timestamp":"08:00 AM","severity":"stable"}'::jsonb, 'stable', 'GH');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P009', 'Violet Smythe', '198 456 7234', 86, 'Room 1B', 'Dr. Jane Smith', 'Blood Pressure Cuff', '{"type":"Blood Pressure","value":"156/98 mmHg","timestamp":"Yesterday, 3:20 PM","severity":"warning"}'::jsonb, 'warning', 'VS');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P010', 'Albert Finch', '456 123 7890', 73, 'Room 5A', 'Dr. Sarah Williams', 'Wristband Monitor', '{"type":"Heart Rate","value":"82 bpm","timestamp":"09:00 AM","severity":"warning"}'::jsonb, 'warning', 'AF');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P011', 'Rose Campbell', '345 678 9012', 79, 'Room 2D', 'Dr. Robert Chen', 'Glucose Meter', '{"type":"Blood Glucose","value":"6.4 mmol/L","timestamp":"07:30 AM","severity":"stable"}'::jsonb, 'stable', 'RC');
INSERT INTO patients (id, name, nhs_number, age, room, primary_clinician, primary_device, last_reading, status, initials) VALUES ('P012', 'Edmund Wright', '234 567 8901', 67, 'Room 4C', 'Dr. Jane Smith', 'Pulse Oximeter', '{"type":"SpO2","value":"96%","timestamp":"08:15 AM","severity":"stable"}'::jsonb, 'stable', 'EW');

-- Hubs
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H001', 'KAYZ-HUB-A1B2-C3D4', 'Main Office', 'Hub-Main', 'online', '2 min ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H002', 'KAYZ-HUB-E5F6-G7H8', 'Ward A', 'Hub-WardA', 'online', '5 min ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H003', 'KAYZ-HUB-I9J0-K1L2', 'Ward B', 'Hub-WardB', 'offline', '3 hours ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H004', 'KAYZ-HUB-M3N4-O5P6', 'Dining Hall', 'Hub-Dining', 'online', '1 min ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H005', 'KAYZ-HUB-Q7R8-S9T0', 'Room 102', 'Hub-102', 'online', '8 min ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H006', 'KAYZ-HUB-U1V2-W3X4', 'Reception', 'Hub-Reception', 'online', '3 min ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H007', 'KAYZ-HUB-Y5Z6-A7B8', 'Ward C', 'Hub-WardC', 'offline', '5 hours ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H008', 'KAYZ-HUB-C9D0-E1F2', 'Physio Room', 'Hub-Physio', 'online', '12 min ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H009', 'KAYZ-HUB-G3H4-I5J6', 'Garden Wing', 'Hub-Garden', 'online', '6 min ago');
INSERT INTO hubs (id, serial_number, location, nickname, status, last_seen) VALUES ('H010', 'KAYZ-HUB-K7L8-M9N0', 'Admin Office', 'Hub-Admin', 'online', '4 min ago');

-- Sensors
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S001', 'KAYZ-SENS-A1B2-C3D4', 'Blood Pressure Cuff', 'P001', 'Margaret Whitfield', 'H005', 'Hub-102', 'online', '5 min ago', 78);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S002', 'KAYZ-SENS-E5F6-G7H8', 'Wristband Monitor', 'P003', 'Arthur Pendlebury', 'H001', 'Hub-Main', 'online', '3 min ago', 92);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S003', 'KAYZ-SENS-I9J0-K1L2', 'Glucose Meter', 'P002', 'Doris Lancaster', 'H002', 'Hub-WardA', 'online', '12 min ago', 45);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S004', 'KAYZ-SENS-M3N4-O5P6', 'Pulse Oximeter', 'P004', 'Henry Cavendish', 'H003', 'Hub-WardB', 'warning', '1 hour ago', 12);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S005', 'KAYZ-SENS-Q7R8-S9T0', 'Blood Pressure Cuff', 'P005', 'Eileen Marsh', 'H004', 'Hub-Dining', 'online', '8 min ago', 15);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S006', 'KAYZ-SENS-U1V2-W3X4', 'Wristband Monitor', 'P006', 'Stanley Briggs', 'H001', 'Hub-Main', 'online', '6 min ago', 67);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S007', 'KAYZ-SENS-Y5Z6-A7B8', 'Glucose Meter', 'P007', 'Florence Night', 'H006', 'Hub-Reception', 'online', '15 min ago', 89);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S008', 'KAYZ-SENS-C9D0-E1F2', 'Pulse Oximeter', 'P008', 'George Holloway', 'H008', 'Hub-Physio', 'online', '7 min ago', 54);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S009', 'KAYZ-SENS-G3H4-I5J6', 'Blood Pressure Cuff', 'P009', 'Violet Smythe', 'H009', 'Hub-Garden', 'online', '10 min ago', 33);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S010', 'KAYZ-SENS-K7L8-M9N0', 'Wristband Monitor', 'P010', 'Albert Finch', 'H010', 'Hub-Admin', 'online', '4 min ago', 71);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S011', 'KAYZ-SENS-N1O2-P3Q4', 'Glucose Meter', 'P011', 'Rose Campbell', 'H004', 'Hub-Dining', 'online', '9 min ago', 88);
INSERT INTO sensors (id, mac_address, device_type, patient_id, patient_name, hub_id, hub_name, status, last_seen, battery) VALUES ('S012', 'KAYZ-SENS-R5S6-T7U8', 'Pulse Oximeter', 'P012', 'Edmund Wright', 'H002', 'Hub-WardA', 'online', '11 min ago', 62);

-- Alerts
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A001', 'P001', 'Margaret Whitfield', 'Room 4A', 'critical', 'Blood pressure critically high ΓÇö 185/110 mmHg. Systolic trending upward over 5 days.', '10:23 AM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A002', 'P004', 'Henry Cavendish', 'Room 3B', 'critical', 'SpO2 dropped to 88%. Oxygen saturation below threshold for 15 minutes.', '09:45 AM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A003', 'P001', 'Margaret Whitfield', 'Room 4A', 'critical', 'Second critical reading confirmed ΓÇö BP 182/108 mmHg. Escalation recommended.', '10:30 AM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A004', 'P002', 'Doris Lancaster', 'Room 2C', 'warning', 'Blood glucose trending upward post-meals over 7 days. Current: 9.2 mmol/L.', 'Yesterday, 4:32 PM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A005', 'P004', 'Henry Cavendish', 'Room 3B', 'warning', 'Heart rate variability decreased. Resting HR elevated to 95 bpm over past 3 days.', 'Yesterday, 2:15 PM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A006', 'P007', 'Florence Night', 'Room 3C', 'warning', 'Blood glucose elevated at 7.8 mmol/L. Above target range for pre-diabetic management.', 'Yesterday, 6:00 PM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A007', 'P009', 'Violet Smythe', 'Room 1B', 'warning', 'Blood pressure reading 156/98 mmHg. Elevated above patient-specific threshold.', 'Yesterday, 3:20 PM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A008', 'P010', 'Albert Finch', 'Room 5A', 'warning', 'Heart rate elevated at 82 bpm. Trending above baseline over 48 hours.', '09:00 AM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A009', 'P006', 'Stanley Briggs', 'Room 2A', 'warning', 'Missed morning glucose reading. Device may need attention.', 'Yesterday, 8:00 AM', 'unresolved');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A010', 'P003', 'Arthur Pendlebury', 'Room 5D', 'warning', 'Blood pressure cuff disconnected overnight. Reconnection confirmed at 07:00.', 'Yesterday, 11:00 PM', 'dismissed');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A011', 'P008', 'George Holloway', 'Room 4B', 'warning', 'Slightly low SpO2 reading at 92% during sleep. Recovered to 96% by morning.', '2 days ago', 'acknowledged');
INSERT INTO alerts (id, patient_id, patient_name, room, severity, description, timestamp, status) VALUES ('A012', 'P005', 'Eileen Marsh', 'Room 1A', 'warning', 'Blood pressure cuff battery at 15%. Replacement advised.', '2 days ago', 'acknowledged');

-- Thresholds
INSERT INTO threshold_configs (patient_id, max_systolic, max_diastolic, max_blood_glucose, min_spo2, max_heart_rate) VALUES ('P001', 160, 100, 8.5, 92, 100);
INSERT INTO threshold_configs (patient_id, max_systolic, max_diastolic, max_blood_glucose, min_spo2, max_heart_rate) VALUES ('P002', 155, 95, 8, 93, 95);
INSERT INTO threshold_configs (patient_id, max_systolic, max_diastolic, max_blood_glucose, min_spo2, max_heart_rate) VALUES ('P003', 150, 90, 7.5, 94, 90);
INSERT INTO threshold_configs (patient_id, max_systolic, max_diastolic, max_blood_glucose, min_spo2, max_heart_rate) VALUES ('P004', 155, 95, 8, 93, 95);

-- Biometric Readings
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-04-26T08:00:00', '2026-04-26', 135, 82, 6.5, 68, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-04-27T08:00:00', '2026-04-27', 141, 85, 6.7, 70, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-04-28T08:00:00', '2026-04-28', 145, 88, 6.8, 71, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-04-29T08:00:00', '2026-04-29', 148, 90, 7, 73, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-04-30T08:00:00', '2026-04-30', 149, 90, 7.1, 74, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-01T08:00:00', '2026-05-01', 148, 90, 7.2, 74, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-02T08:00:00', '2026-05-02', 146, 88, 7.2, 74, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-03T08:00:00', '2026-05-03', 144, 87, 7.3, 73, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-04T08:00:00', '2026-05-04', 143, 86, 7.3, 72, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-05T08:00:00', '2026-05-05', 143, 86, 7.3, 71, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-06T08:00:00', '2026-05-06', 145, 87, 7.2, 69, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-07T08:00:00', '2026-05-07', 148, 89, 7.1, 67, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-08T08:00:00', '2026-05-08', 153, 92, 7, 65, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-09T08:00:00', '2026-05-09', 159, 96, 6.9, 64, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-10T08:00:00', '2026-05-10', 164, 99, 6.8, 63, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-11T08:00:00', '2026-05-11', 168, 101, 6.6, 62, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-12T08:00:00', '2026-05-12', 171, 102, 6.5, 62, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-13T08:00:00', '2026-05-13', 171, 102, 6.3, 62, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-14T08:00:00', '2026-05-14', 169, 101, 6.1, 63, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-15T08:00:00', '2026-05-15', 167, 100, 6, 65, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-16T08:00:00', '2026-05-16', 165, 99, 5.9, 66, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-17T08:00:00', '2026-05-17', 164, 98, 7.3, 68, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-18T08:00:00', '2026-05-18', 165, 98, 7.2, 70, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-19T08:00:00', '2026-05-19', 168, 100, 7.2, 71, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-20T08:00:00', '2026-05-20', 172, 102, 7.2, 73, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-21T08:00:00', '2026-05-21', 178, 106, 7.2, 74, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-22T08:00:00', '2026-05-22', 183, 109, 7.3, 82, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-23T08:00:00', '2026-05-23', 188, 112, 7.4, 82, 93);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-24T08:00:00', '2026-05-24', 191, 114, 7.5, 81, 90);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P001', '2026-05-25T08:00:00', '2026-05-25', 192, 115, 7.6, 80, 87);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P004', '2026-05-19T08:00:00', '2026-05-19', 128, 78, 5.8, 72, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P004', '2026-05-20T08:00:00', '2026-05-20', 135, 82, 6, 74, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P004', '2026-05-21T08:00:00', '2026-05-21', 138, 84, 6.1, 75, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P004', '2026-05-22T08:00:00', '2026-05-22', 135, 82, 6.3, 76, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P004', '2026-05-23T08:00:00', '2026-05-23', 127, 78, 6.4, 82, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P004', '2026-05-24T08:00:00', '2026-05-24', 120, 73, 6.4, 86, 92);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P004', '2026-05-25T08:00:00', '2026-05-25', 118, 72, 6.4, 91, 88);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P003', '2026-05-19T08:00:00', '2026-05-19', 125, 76, 5.5, 68, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P003', '2026-05-20T08:00:00', '2026-05-20', 130, 79, 5.6, 70, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P003', '2026-05-21T08:00:00', '2026-05-21', 132, 81, 5.7, 71, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P003', '2026-05-22T08:00:00', '2026-05-22', 133, 81, 5.8, 72, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P003', '2026-05-23T08:00:00', '2026-05-23', 130, 79, 5.9, 72, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P003', '2026-05-24T08:00:00', '2026-05-24', 126, 77, 5.9, 72, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P003', '2026-05-25T08:00:00', '2026-05-25', 121, 74, 6, 71, 98);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P002', '2026-05-19T08:00:00', '2026-05-19', 138, 84, 7.2, 74, 95);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P002', '2026-05-20T08:00:00', '2026-05-20', 141, 86, 7.7, 76, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P002', '2026-05-21T08:00:00', '2026-05-21', 143, 87, 8.2, 77, 96);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P002', '2026-05-22T08:00:00', '2026-05-22', 144, 88, 8.6, 78, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P002', '2026-05-23T08:00:00', '2026-05-23', 143, 88, 8.9, 78, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P002', '2026-05-24T08:00:00', '2026-05-24', 142, 86, 9, 78, 97);
INSERT INTO biometric_readings (patient_id, timestamp, date, systolic, diastolic, blood_glucose, heart_rate, oxygen_saturation) VALUES ('P002', '2026-05-25T08:00:00', '2026-05-25', 139, 85, 9.1, 77, 97);


