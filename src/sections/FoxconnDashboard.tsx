import React, { useState } from 'react';
import { 
  Terminal, ShieldCheck, Database, Key, RefreshCw, 
  UserPlus, Check, X, FileText, Activity, AlertTriangle, Plus 
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  setActiveModule, checkInResident, checkOutResident,
  approveVisitor, rejectVisitor, registerVisitor,
  updateCryptoInput, updateDecryptionKeyInput, decryptPayload,
  syncLicenseStatus, reportPoshResolution
} from '../features/simulationSlice';


export const FoxconnDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Redux Selectors
  const activeModule = useAppSelector((state) => state.simulation.activeModule);
  const dorms = useAppSelector((state) => state.simulation.dormitories);
  const security = useAppSelector((state) => state.simulation.security);
  const crypto = useAppSelector((state) => state.simulation.crypto);
  const compliance = useAppSelector((state) => state.simulation.compliance);
  const logs = useAppSelector((state) => state.simulation.logs);

  // Local Form States
  const [newResident, setNewResident] = useState({ id: 'FOX-', name: '', department: 'Production Line A', roomNumber: 'A-101' });
  const [newVisitor, setNewVisitor] = useState({ name: '', company: '', purpose: 'Materials Delivery', vehicleNumber: '' });
  const [showResidentForm, setShowResidentForm] = useState(false);
  const [showVisitorForm, setShowVisitorForm] = useState(false);

  const handleResidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResident.name.trim() || newResident.id.length < 5) return;
    dispatch(checkInResident({
      roomNumber: newResident.roomNumber,
      resident: {
        id: newResident.id,
        name: newResident.name,
        department: newResident.department,
        checkInDate: new Date().toISOString().split('T')[0]
      }
    }));
    setNewResident({ id: 'FOX-', name: '', department: 'Production Line A', roomNumber: 'A-101' });
    setShowResidentForm(false);
  };

  const handleVisitorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitor.name.trim() || !newVisitor.company.trim()) return;
    dispatch(registerVisitor({
      ...newVisitor,
      entryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    setNewVisitor({ name: '', company: '', purpose: 'Materials Delivery', vehicleNumber: '' });
    setShowVisitorForm(false);
  };

  return (
    <section id="simulator" className="py-20 relative overflow-hidden bg-cyber-bg cyber-grid">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Enterprise <span className="bg-gradient-to-r from-cyber-accent via-cyan-400 to-indigo-500 bg-clip-text text-transparent">Simulator</span>
          </h2>
          <p className="text-cyber-textMuted font-mono text-sm uppercase tracking-widest">
            Try out interactive simulations of systems I built for Foxconn's operations
          </p>
          <div className="h-[1px] w-24 bg-cyber-accent mt-2 mx-auto md:mx-0"></div>
        </div>

        {/* Dashboard Frame */}
        <div className="border border-cyber-border rounded-2xl overflow-hidden bg-[#060a16] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col">
          
          {/* Top Title Bar / Stats Header */}
          <div className="bg-[#0b1022] border-b border-cyber-border px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-3 h-3 rounded-full bg-cyber-accent animate-ping"></div>
              <div>
                <h3 className="font-display font-bold text-white text-base tracking-wide">
                  FOXCONN OPERATIONS CENTRE
                </h3>
                <span className="text-[10px] text-cyber-textMuted font-mono">
                  LIVE SIMULATION &bull; REDUX STORE STATE CONNECTED
                </span>
              </div>
            </div>
            
            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-200/80">
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 flex items-center space-x-2">
                <Database className="w-3.5 h-3.5 text-cyber-accent" />
                <span>Rooms: {dorms.rooms.length}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyber-success" />
                <span>Gate Pass Approved Today: {security.todayCount}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                <span>Status: SYSTEM ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Core Panel Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 bg-[#080d1b] border-r border-cyber-border p-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible">
              <button
                onClick={() => dispatch(setActiveModule('dormitory'))}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 font-display transition-all font-medium whitespace-nowrap lg:whitespace-normal
                  ${activeModule === 'dormitory' 
                    ? 'bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent' 
                    : 'text-cyber-textMuted hover:text-white hover:bg-white/5 border border-transparent'}
                `}
              >
                <Database className="w-4.5 h-4.5 flex-shrink-0" />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold">Dormitory Manager</div>
                  <div className="text-[10px] text-cyber-textMuted mt-0.5">Manage beds & check-ins</div>
                </div>
                <span className="lg:hidden text-xs">Dormitory</span>
              </button>

              <button
                onClick={() => dispatch(setActiveModule('security'))}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 font-display transition-all font-medium whitespace-nowrap lg:whitespace-normal
                  ${activeModule === 'security' 
                    ? 'bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent' 
                    : 'text-cyber-textMuted hover:text-white hover:bg-white/5 border border-transparent'}
                `}
              >
                <ShieldCheck className="w-4.5 h-4.5 flex-shrink-0" />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold">Security Gate Pass</div>
                  <div className="text-[10px] text-cyber-textMuted mt-0.5">Approve visitor entry logs</div>
                </div>
                <span className="lg:hidden text-xs">Security</span>
              </button>

              <button
                onClick={() => dispatch(setActiveModule('crypto'))}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 font-display transition-all font-medium whitespace-nowrap lg:whitespace-normal
                  ${activeModule === 'crypto' 
                    ? 'bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent' 
                    : 'text-cyber-textMuted hover:text-white hover:bg-white/5 border border-transparent'}
                `}
              >
                <Key className="w-4.5 h-4.5 flex-shrink-0" />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold">SHA-256 Crypto</div>
                  <div className="text-[10px] text-cyber-textMuted mt-0.5">Two-layer encryption test</div>
                </div>
                <span className="lg:hidden text-xs">Encryption</span>
              </button>

              <button
                onClick={() => dispatch(setActiveModule('compliance'))}
                className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 font-display transition-all font-medium whitespace-nowrap lg:whitespace-normal
                  ${activeModule === 'compliance' 
                    ? 'bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent' 
                    : 'text-cyber-textMuted hover:text-white hover:bg-white/5 border border-transparent'}
                `}
              >
                <FileText className="w-4.5 h-4.5 flex-shrink-0" />
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold">License Compliance</div>
                  <div className="text-[10px] text-cyber-textMuted mt-0.5">Track warnings & renewals</div>
                </div>
                <span className="lg:hidden text-xs">Compliance</span>
              </button>
            </div>

            {/* Active module board */}
            <div className="lg:col-span-9 p-6 bg-[#060a16] text-left flex flex-col justify-between">
              
              {/* Dormitory module view */}
              {activeModule === 'dormitory' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-display font-bold text-white">Dormitory Housing Allocator</h4>
                      <p className="text-xs text-cyber-textMuted">Simulation of the employee housing system</p>
                    </div>
                    <button
                      onClick={() => setShowResidentForm(!showResidentForm)}
                      className="px-3.5 py-2 rounded-xl bg-cyber-accent hover:bg-cyan-500 text-cyber-bg font-bold text-xs flex items-center space-x-1.5 transition-colors font-display"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Check-In Worker</span>
                    </button>
                  </div>

                  {/* Add Resident Form */}
                  {showResidentForm && (
                    <form onSubmit={handleResidentSubmit} className="bg-white/5 border border-cyber-border rounded-xl p-4 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Worker ID</label>
                          <input 
                            type="text" 
                            value={newResident.id}
                            onChange={(e) => setNewResident({ ...newResident, id: e.target.value.toUpperCase() })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                            placeholder="FOX-1234"
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Worker Name</label>
                          <input 
                            type="text" 
                            value={newResident.name}
                            onChange={(e) => setNewResident({ ...newResident, name: e.target.value })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                            placeholder="Dinesh Kumar"
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Department</label>
                          <select 
                            value={newResident.department}
                            onChange={(e) => setNewResident({ ...newResident, department: e.target.value })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                          >
                            <option value="Production Line A">Production Line A</option>
                            <option value="Quality Assurance">Quality Assurance</option>
                            <option value="Assembly Department">Assembly Department</option>
                            <option value="Engineering Team">Engineering Team</option>
                          </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Assign Room</label>
                          <select 
                            value={newResident.roomNumber}
                            onChange={(e) => setNewResident({ ...newResident, roomNumber: e.target.value })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                          >
                            {dorms.rooms.map(room => (
                              <option key={room.roomNumber} value={room.roomNumber}>
                                {room.roomNumber} ({room.type} - {room.residents.length}/{room.capacity})
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2.5">
                        <button 
                          type="button" 
                          onClick={() => setShowResidentForm(false)}
                          className="px-3 py-1.5 text-xs text-cyber-textMuted border border-white/5 rounded-lg hover:bg-white/5"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-3.5 py-1.5 text-xs text-cyber-bg bg-cyber-accent rounded-lg font-bold hover:bg-cyan-500"
                        >
                          Register Check-In
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Room status listing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dorms.rooms.map((room) => (
                      <div key={room.roomNumber} className="border border-white/5 bg-white/5 rounded-xl p-4 flex flex-col space-y-3.5">
                        <div className="flex justify-between items-center pb-2 border-b border-white/5">
                          <div className="flex items-center space-x-2">
                            <span className="font-display font-bold text-white">{room.roomNumber}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${room.type === 'Male' ? 'bg-blue-500/10 text-blue-400' : 'bg-pink-500/10 text-pink-400'}`}>
                              {room.type}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-cyber-textMuted">
                            Occupancy: {room.residents.length} / {room.capacity}
                          </span>
                        </div>

                        {/* List of checked in people */}
                        <div className="space-y-2 flex-grow min-h-[80px]">
                          {room.residents.length === 0 ? (
                            <div className="text-xs text-cyber-textMuted italic flex items-center h-full justify-center">
                              No employees checked in. Room vacant.
                            </div>
                          ) : (
                            room.residents.map((resident) => (
                              <div key={resident.id} className="flex justify-between items-center bg-black/30 border border-white/5 p-2 rounded-lg text-xs">
                                <div>
                                  <div className="text-white font-medium">{resident.name} <span className="text-[10px] text-cyber-accent font-mono">({resident.id})</span></div>
                                  <div className="text-[10px] text-cyber-textMuted font-mono mt-0.5">{resident.department} &bull; {resident.checkInDate}</div>
                                </div>
                                <button
                                  onClick={() => dispatch(checkOutResident({ roomNumber: room.roomNumber, residentId: resident.id }))}
                                  className="text-[10px] text-red-400 hover:text-red-300 font-mono bg-red-950/20 border border-red-900/30 px-2 py-1 rounded"
                                >
                                  Checkout
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security module view */}
              {activeModule === 'security' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-display font-bold text-white">Security Gate Pass & Tracking</h4>
                      <p className="text-xs text-cyber-textMuted">Simulating visitor clearances and logs</p>
                    </div>
                    <button
                      onClick={() => setShowVisitorForm(!showVisitorForm)}
                      className="px-3.5 py-2 rounded-xl bg-cyber-accent hover:bg-cyan-500 text-cyber-bg font-bold text-xs flex items-center space-x-1.5 transition-colors font-display"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Pre-Register Visitor</span>
                    </button>
                  </div>

                  {/* Add Visitor Form */}
                  {showVisitorForm && (
                    <form onSubmit={handleVisitorSubmit} className="bg-white/5 border border-cyber-border rounded-xl p-4 space-y-4 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Visitor Name</label>
                          <input 
                            type="text" 
                            value={newVisitor.name}
                            onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Company</label>
                          <input 
                            type="text" 
                            value={newVisitor.company}
                            onChange={(e) => setNewVisitor({ ...newVisitor, company: e.target.value })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                            placeholder="FedEx Logistics"
                            required
                          />
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Purpose</label>
                          <select 
                            value={newVisitor.purpose}
                            onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                          >
                            <option value="Materials Delivery">Materials Delivery</option>
                            <option value="Database Maintenance">Database Maintenance</option>
                            <option value="Compliance Audit">Compliance Audit</option>
                            <option value="Official Meeting">Official Meeting</option>
                          </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label className="text-[10px] font-mono text-cyan-200">Vehicle Plate</label>
                          <input 
                            type="text" 
                            value={newVisitor.vehicleNumber}
                            onChange={(e) => setNewVisitor({ ...newVisitor, vehicleNumber: e.target.value })}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyber-accent"
                            placeholder="TN-21-AA-0001"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2.5">
                        <button 
                          type="button" 
                          onClick={() => setShowVisitorForm(false)}
                          className="px-3 py-1.5 text-xs text-cyber-textMuted border border-white/5 rounded-lg hover:bg-white/5"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-3.5 py-1.5 text-xs text-cyber-bg bg-cyber-accent rounded-lg font-bold hover:bg-cyan-500"
                        >
                          Submit Pass Request
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Visitor queue table */}
                  <div className="border border-white/5 bg-white/5 rounded-xl overflow-x-auto">
                    <table className="w-full text-xs font-sans text-gray-300">
                      <thead className="bg-black/50 text-[10px] font-mono text-cyber-textMuted border-b border-white/5">
                        <tr>
                          <th className="px-4 py-3 text-left">VISITOR ID</th>
                          <th className="px-4 py-3 text-left">NAME / COMPANY</th>
                          <th className="px-4 py-3 text-left">PURPOSE</th>
                          <th className="px-4 py-3 text-left">VEHICLE</th>
                          <th className="px-4 py-3 text-left">TIME</th>
                          <th className="px-4 py-3 text-left">STATUS</th>
                          <th className="px-4 py-3 text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {security.visitors.map((visitor) => (
                          <tr key={visitor.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-mono text-cyan-200">{visitor.id}</td>
                            <td className="px-4 py-3">
                              <div className="text-white font-medium">{visitor.name}</div>
                              <div className="text-[10px] text-cyber-textMuted font-mono mt-0.5">{visitor.company}</div>
                            </td>
                            <td className="px-4 py-3">{visitor.purpose}</td>
                            <td className="px-4 py-3 font-mono text-cyber-textMuted">{visitor.vehicleNumber || 'Walk-In'}</td>
                            <td className="px-4 py-3 font-mono">{visitor.entryTime}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded font-mono text-[9px]
                                ${visitor.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : ''}
                                ${visitor.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : ''}
                                ${visitor.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''}
                              `}>
                                {visitor.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {visitor.status === 'Pending' ? (
                                <div className="flex justify-end space-x-1.5">
                                  <button
                                    onClick={() => dispatch(approveVisitor(visitor.id))}
                                    className="p-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/35"
                                    title="Approve pass"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => dispatch(rejectVisitor(visitor.id))}
                                    className="p-1 rounded bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/35"
                                    title="Reject pass"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] font-mono text-cyber-textMuted">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Cryptography module view */}
              {activeModule === 'crypto' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-display font-bold text-white">SHA-256 Two-Layer Encrypter</h4>
                    <p className="text-xs text-cyber-textMuted">Secure enterprise module for encrypting sensitive document records</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Input Encrypt */}
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-mono text-cyan-200">Raw Data Payload</label>
                        <textarea
                          rows={3}
                          value={crypto.plaintext}
                          onChange={(e) => dispatch(updateCryptoInput(e.target.value))}
                          className="bg-black/40 border border-cyber-border rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-cyber-accent w-full"
                          placeholder="Type payload string to encrypt..."
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-1.5">
                        <span className="text-xs font-mono text-cyber-textMuted">Double SHA-256 Signature (Computed in store)</span>
                        <div className="bg-black/60 border border-white/5 rounded-xl p-3 text-xs font-mono text-purple-400 break-all select-all">
                          {crypto.sha256Hash}
                        </div>
                      </div>
                    </div>

                    {/* Right: Key Decrypt */}
                    <div className="bg-white/5 border border-cyber-border rounded-xl p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-cyber-accent">
                          <Key className="w-4 h-4" />
                          <span className="text-xs font-mono font-bold">Key Verification Decrypter</span>
                        </div>
                        <p className="text-[11px] text-cyber-textMuted">
                          To decrypt this simulated document stream, enter the admin decryption key.
                          <br />
                          <span className="text-[10px] text-cyan-400/80 font-mono">Test Key: FOXCONN-DEV-KEY</span>
                        </p>
                        
                        <div className="flex flex-col space-y-1 pt-2">
                          <label className="text-[10px] font-mono text-cyan-200">Security Access Key</label>
                          <input 
                            type="text"
                            value={crypto.decryptionKeyInput}
                            onChange={(e) => dispatch(updateDecryptionKeyInput(e.target.value))}
                            className="bg-black/40 border border-cyber-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-accent font-mono"
                            placeholder="Enter Key..."
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={() => dispatch(decryptPayload())}
                          className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-display transition-colors"
                        >
                          Verify Key & Decrypt
                        </button>

                        {/* Decryption status result alerts */}
                        {crypto.isDecrypted && (
                          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-[11px] font-mono leading-normal flex items-start space-x-2">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <div>
                              <strong>DECRYPTION SUCCESSFUL:</strong>
                              <div className="mt-1 text-white bg-black/30 p-1.5 rounded">{crypto.decryptedText}</div>
                            </div>
                          </div>
                        )}

                        {crypto.decryptError && (
                          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-[11px] font-mono leading-normal flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 animate-bounce" />
                            <div>
                              <strong>DECRYPTION FAILED:</strong>
                              <div className="mt-0.5">Invalid secret authorization key. Audit warning trigger generated.</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Compliance module view */}
              {activeModule === 'compliance' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-display font-bold text-white">License Compliance & Regulatory Audits</h4>
                      <p className="text-xs text-cyber-textMuted">License countdown alerts and annual compliance registers</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => dispatch(reportPoshResolution())}
                        className="px-3 py-1.5 rounded-lg border border-purple-500/30 bg-purple-900/10 hover:bg-purple-900/20 text-purple-400 font-semibold text-xs transition-colors font-display"
                      >
                        Resolve Audited POSH Case
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric box */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-cyber-textMuted uppercase">Tracked Licenses</div>
                        <div className="text-xl font-display font-bold text-white mt-1">
                          {compliance.licenses.length} Certificates
                        </div>
                      </div>
                      <FileText className="w-8 h-8 text-cyber-accent/40" />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-cyber-textMuted uppercase">Critical Alerts</div>
                        <div className="text-xl font-display font-bold text-red-400 mt-1">
                          {compliance.licenses.filter(l => l.status === 'Critical' || l.status === 'Warning').length} Outstanding
                        </div>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-red-500/40" />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-cyber-textMuted uppercase">POSH Case Resolution</div>
                        <div className="text-xl font-display font-bold text-emerald-400 mt-1">
                          {compliance.resolvedCaseCount} / {compliance.poshCaseCount} Resolved
                        </div>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-emerald-500/40" />
                    </div>
                  </div>

                  {/* License Track List */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono text-cyan-200">Licensing Registry & Alerts (Auto-alert simulation)</span>
                    <div className="grid grid-cols-1 gap-3">
                      {compliance.licenses.map((lic) => (
                        <div 
                          key={lic.id} 
                          className="bg-black/30 border border-white/5 p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-white/10 transition-colors"
                        >
                          <div className="text-left">
                            <div className="flex items-center space-x-2">
                              <span className="font-display font-bold text-white text-sm">{lic.name}</span>
                              <span className={`text-[9px] px-2 py-0.5 rounded font-mono
                                ${lic.status === 'Critical' ? 'bg-red-500/10 text-red-400' : ''}
                                ${lic.status === 'Warning' ? 'bg-amber-500/10 text-amber-400' : ''}
                                ${lic.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                              `}>
                                {lic.status}
                              </span>
                            </div>
                            <div className="text-[10px] text-cyber-textMuted font-mono mt-1">
                              ID: {lic.id} &bull; Type: {lic.type} &bull; 
                              <span className="text-red-400"> Expires in {lic.expiryDays} days</span>
                            </div>
                          </div>

                          <button
                            onClick={() => dispatch(syncLicenseStatus(lic.id))}
                            className="px-3.5 py-1.5 rounded-lg bg-cyber-accent/15 border border-cyber-accent/30 hover:bg-cyber-accent/30 text-cyber-accent font-bold text-xs transition-colors font-display flex items-center space-x-1.5 self-end md:self-auto"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Renew License</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Logs Console Panel */}
              <div className="mt-8 pt-4 border-t border-cyber-border">
                <div className="flex justify-between items-center pb-2">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-cyber-accent">
                    <Terminal className="w-3.5 h-3.5 animate-pulse" />
                    <span>CENTRAL SYSTEM EVENT LOGS</span>
                  </div>
                  <span className="text-[9px] font-mono text-cyber-textMuted">BUFFER: LIVE RE-RENDERED</span>
                </div>
                
                <div className="bg-black/70 border border-white/5 rounded-lg p-3 h-32 overflow-y-auto font-mono text-[10px] text-cyan-200/90 space-y-1.5 scrollbar-thin">
                  {logs.map((log, index) => (
                    <div 
                      key={index}
                      className={`break-words tracking-wide leading-normal
                        ${log.includes('Access DENIED') || log.includes('decryption FAILURE') ? 'text-red-400' : ''}
                        ${log.includes('Access GRANTED') || log.includes('SUCCESS') ? 'text-emerald-400' : ''}
                        ${log.includes('[System initialized]') ? 'text-cyber-accent' : ''}
                      `}
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FoxconnDashboard;
