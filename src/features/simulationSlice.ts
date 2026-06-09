import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Dormitory Interfaces
export interface Resident {
  id: string;
  name: string;
  department: string;
  checkInDate: string;
}

export interface DormRoom {
  roomNumber: string;
  type: 'Male' | 'Female';
  capacity: number;
  residents: Resident[];
}

// Security Gate Pass Interfaces
export interface Visitor {
  id: string;
  name: string;
  company: string;
  purpose: string;
  vehicleNumber: string;
  entryTime: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

// License tracking
export interface License {
  id: string;
  name: string;
  type: 'Compliance' | 'Safety' | 'Operations';
  expiryDays: number;
  status: 'Active' | 'Warning' | 'Critical';
}

// Cryptography Interfaces
interface CryptoState {
  plaintext: string;
  sha256Hash: string;
  secretKey: string;
  decryptionKeyInput: string;
  decryptedText: string;
  isDecrypted: boolean;
  decryptError: boolean;
}

interface SimulationState {
  activeModule: 'dormitory' | 'security' | 'crypto' | 'compliance';
  dormitories: {
    rooms: DormRoom[];
    totalCapacity: number;
    totalOccupied: number;
  };
  security: {
    visitors: Visitor[];
    todayCount: number;
  };
  crypto: CryptoState;
  compliance: {
    licenses: License[];
    poshCaseCount: number;
    resolvedCaseCount: number;
  };
  logs: string[];
}

const initialRooms: DormRoom[] = [
  { roomNumber: 'A-101', type: 'Male', capacity: 4, residents: [
    { id: 'FOX-8802', name: 'Rohan Sharma', department: 'Production Line A', checkInDate: '2026-02-15' },
    { id: 'FOX-9120', name: 'Amit Verma', department: 'Quality Assurance', checkInDate: '2026-03-01' }
  ] },
  { roomNumber: 'A-102', type: 'Male', capacity: 4, residents: [
    { id: 'FOX-8409', name: 'Vikram Singh', department: 'Assembly Department', checkInDate: '2026-01-20' }
  ] },
  { roomNumber: 'B-201', type: 'Female', capacity: 4, residents: [
    { id: 'FOX-9304', name: 'Priya Patel', department: 'Engineering Team', checkInDate: '2026-04-10' },
    { id: 'FOX-8544', name: 'Neha Reddy', department: 'HR Operations', checkInDate: '2026-01-12' },
    { id: 'FOX-8799', name: 'Sunita Rao', department: 'Sourcing Dept', checkInDate: '2026-02-28' }
  ] },
  { roomNumber: 'B-202', type: 'Female', capacity: 4, residents: [] }
];

const initialVisitors: Visitor[] = [
  { id: 'VIS-449', name: 'John Doe', company: 'Logistics Corp', purpose: 'Materials Delivery', vehicleNumber: 'TN-21-AX-9912', entryTime: '20:15', status: 'Approved' },
  { id: 'VIS-450', name: 'Rajesh Kumar', company: 'Oracle India', purpose: 'Database Maintenance', vehicleNumber: 'TN-07-BY-3421', entryTime: '20:30', status: 'Pending' },
  { id: 'VIS-451', name: 'Sarah Connor', company: 'Cyberdyne Systems', purpose: 'Hardware Audit', vehicleNumber: 'TN-19-CD-1011', entryTime: '21:05', status: 'Pending' }
];

const initialLicenses: License[] = [
  { id: 'LIC-01', name: 'Fire Safety Clearance Certificate', type: 'Safety', expiryDays: 14, status: 'Warning' },
  { id: 'LIC-02', name: 'Factory Pollution Control License', type: 'Compliance', expiryDays: 5, status: 'Critical' },
  { id: 'LIC-03', name: 'Dormitory Occupancy Permit', type: 'Operations', expiryDays: 120, status: 'Active' },
  { id: 'LIC-04', name: 'POSH Compliance Annual Filing', type: 'Compliance', expiryDays: 45, status: 'Active' }
];

const initialState: SimulationState = {
  activeModule: 'dormitory',
  dormitories: {
    rooms: initialRooms,
    totalCapacity: 16,
    totalOccupied: 6,
  },
  security: {
    visitors: initialVisitors,
    todayCount: 142,
  },
  crypto: {
    plaintext: 'FOXCONN-SECURE-PAYLOAD-2026',
    // Simple pre-calculated double SHA-256 simulation hash
    sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    secretKey: 'FOXCONN-DEV-KEY',
    decryptionKeyInput: '',
    decryptedText: '',
    isDecrypted: false,
    decryptError: false,
  },
  compliance: {
    licenses: initialLicenses,
    poshCaseCount: 4,
    resolvedCaseCount: 4,
  },
  logs: ['[System initialized] Enterprise dashboard simulation started.'],
};

// Helper function to simulate SHA-256 for demo
const mockSha256 = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'sha256-' + Math.abs(hash).toString(16).padStart(8, '0') + Math.abs(hash * 31).toString(16).padStart(8, '0');
};

export const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    setActiveModule: (state, action: PayloadAction<'dormitory' | 'security' | 'crypto' | 'compliance'>) => {
      state.activeModule = action.payload;
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.unshift(`[${new Date().toLocaleTimeString()}] ${action.payload}`);
      if (state.logs.length > 20) state.logs.pop();
    },
    
    // Dormitory Actions
    checkInResident: (state, action: PayloadAction<{ roomNumber: string; resident: Resident }>) => {
      const room = state.dormitories.rooms.find(r => r.roomNumber === action.payload.roomNumber);
      if (room && room.residents.length < room.capacity) {
        room.residents.push(action.payload.resident);
        state.dormitories.totalOccupied += 1;
        state.logs.unshift(
          `[${new Date().toLocaleTimeString()}] Check-in: ${action.payload.resident.name} (${action.payload.resident.id}) assigned to Room ${action.payload.roomNumber}`
        );
      }
    },
    checkOutResident: (state, action: PayloadAction<{ roomNumber: string; residentId: string }>) => {
      const room = state.dormitories.rooms.find(r => r.roomNumber === action.payload.roomNumber);
      if (room) {
        const residentIndex = room.residents.findIndex(res => res.id === action.payload.residentId);
        if (residentIndex !== -1) {
          const resident = room.residents[residentIndex];
          room.residents.splice(residentIndex, 1);
          state.dormitories.totalOccupied -= 1;
          state.logs.unshift(
            `[${new Date().toLocaleTimeString()}] Check-out: ${resident.name} checked out from Room ${action.payload.roomNumber}`
          );
        }
      }
    },

    // Security Gate Pass Actions
    approveVisitor: (state, action: PayloadAction<string>) => {
      const visitor = state.security.visitors.find(v => v.id === action.payload);
      if (visitor) {
        visitor.status = 'Approved';
        state.security.todayCount += 1;
        state.logs.unshift(
          `[${new Date().toLocaleTimeString()}] Access GRANTED: Visitor ${visitor.name} from ${visitor.company} authorized for entry. Vehicle ${visitor.vehicleNumber} logged.`
        );
      }
    },
    rejectVisitor: (state, action: PayloadAction<string>) => {
      const visitor = state.security.visitors.find(v => v.id === action.payload);
      if (visitor) {
        visitor.status = 'Rejected';
        state.logs.unshift(
          `[${new Date().toLocaleTimeString()}] Access DENIED: Visitor ${visitor.name} from ${visitor.company} rejected.`
        );
      }
    },
    registerVisitor: (state, action: PayloadAction<Omit<Visitor, 'id' | 'status'>>) => {
      const newId = `VIS-${Math.floor(100 + Math.random() * 900)}`;
      const newVisitor: Visitor = {
        id: newId,
        ...action.payload,
        status: 'Pending'
      };
      state.security.visitors.unshift(newVisitor);
      state.logs.unshift(
        `[${new Date().toLocaleTimeString()}] Gate Pass Request: ${newVisitor.name} (${newVisitor.company}) queued for security authorization.`
      );
    },

    // Cryptography Actions
    updateCryptoInput: (state, action: PayloadAction<string>) => {
      state.crypto.plaintext = action.payload;
      state.crypto.sha256Hash = mockSha256(mockSha256(action.payload)); // Double SHA-256 simulation
      state.crypto.isDecrypted = false;
      state.crypto.decryptError = false;
      state.crypto.decryptedText = '';
    },
    updateDecryptionKeyInput: (state, action: PayloadAction<string>) => {
      state.crypto.decryptionKeyInput = action.payload;
    },
    decryptPayload: (state) => {
      if (state.crypto.decryptionKeyInput === state.crypto.secretKey) {
        state.crypto.isDecrypted = true;
        state.crypto.decryptedText = state.crypto.plaintext;
        state.crypto.decryptError = false;
        state.logs.unshift(
          `[${new Date().toLocaleTimeString()}] Decryption SUCCESS: Double SHA-256 payload decrypted using verified Key.`
        );
      } else {
        state.crypto.decryptError = true;
        state.crypto.isDecrypted = false;
        state.logs.unshift(
          `[${new Date().toLocaleTimeString()}] Decryption FAILURE: Key verification failed. Unauthorized access alert logged.`
        );
      }
    },

    // Compliance Actions
    syncLicenseStatus: (state, action: PayloadAction<string>) => {
      const license = state.compliance.licenses.find(l => l.id === action.payload);
      if (license) {
        license.expiryDays = 365; // Renewed for 1 year
        license.status = 'Active';
        state.logs.unshift(
          `[${new Date().toLocaleTimeString()}] Compliance SYNC: ${license.name} renewal processed and synchronized with Gov Portal.`
        );
      }
    },
    reportPoshResolution: (state) => {
      state.compliance.resolvedCaseCount += 1;
      state.logs.unshift(
        `[${new Date().toLocaleTimeString()}] POSH Compliance Case: Audit completed and case status changed to RESOLVED.`
      );
    }
  }
});

export const {
  setActiveModule,
  addLog,
  checkInResident,
  checkOutResident,
  approveVisitor,
  rejectVisitor,
  registerVisitor,
  updateCryptoInput,
  updateDecryptionKeyInput,
  decryptPayload,
  syncLicenseStatus,
  reportPoshResolution
} = simulationSlice.actions;

export default simulationSlice.reducer;
