import type { Hub } from '@/types';

export const mockHubs: Hub[] = [
  { id: 'H001', serialNumber: 'KAYZ-HUB-A1B2-C3D4', location: 'Main Office', nickname: 'Hub-Main', status: 'online', lastSeen: '2 min ago' },
  { id: 'H002', serialNumber: 'KAYZ-HUB-E5F6-G7H8', location: 'Ward A', nickname: 'Hub-WardA', status: 'online', lastSeen: '5 min ago' },
  { id: 'H003', serialNumber: 'KAYZ-HUB-I9J0-K1L2', location: 'Ward B', nickname: 'Hub-WardB', status: 'offline', lastSeen: '3 hours ago' },
  { id: 'H004', serialNumber: 'KAYZ-HUB-M3N4-O5P6', location: 'Dining Hall', nickname: 'Hub-Dining', status: 'online', lastSeen: '1 min ago' },
  { id: 'H005', serialNumber: 'KAYZ-HUB-Q7R8-S9T0', location: 'Room 102', nickname: 'Hub-102', status: 'online', lastSeen: '8 min ago' },
  { id: 'H006', serialNumber: 'KAYZ-HUB-U1V2-W3X4', location: 'Reception', nickname: 'Hub-Reception', status: 'online', lastSeen: '3 min ago' },
  { id: 'H007', serialNumber: 'KAYZ-HUB-Y5Z6-A7B8', location: 'Ward C', nickname: 'Hub-WardC', status: 'offline', lastSeen: '5 hours ago' },
  { id: 'H008', serialNumber: 'KAYZ-HUB-C9D0-E1F2', location: 'Physio Room', nickname: 'Hub-Physio', status: 'online', lastSeen: '12 min ago' },
  { id: 'H009', serialNumber: 'KAYZ-HUB-G3H4-I5J6', location: 'Garden Wing', nickname: 'Hub-Garden', status: 'online', lastSeen: '6 min ago' },
  { id: 'H010', serialNumber: 'KAYZ-HUB-K7L8-M9N0', location: 'Admin Office', nickname: 'Hub-Admin', status: 'online', lastSeen: '4 min ago' },
];
