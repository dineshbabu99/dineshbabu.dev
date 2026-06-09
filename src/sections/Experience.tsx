import React from 'react';
import { Calendar, MapPin, Building2, ShieldCheck, Database, Key, Layout, RefreshCw, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export const Experience: React.FC = () => {
  const accomplishments = [
    {
      title: 'Dormitory Management System',
      description: 'Engineered a full-scale housing allocation system supporting accommodation workflows for 40,000+ employees. Integrated automated bed assignments, capacity reporting, and check-in/out workflows.',
      tags: ['React.js', 'Node.js', 'Oracle DB', 'API Design'],
      metric: '40,000+ Employees Supported',
      icon: Database,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Security Management System',
      description: 'Developed security modules for visitor pre-registration, vehicle tracking, and automated digital gate pass generation. Streamlined check-in gate logistics and audit logs.',
      tags: ['React.js', 'REST APIs', 'SQL Server', 'Audit Logging'],
      metric: '40% Reduction in Processing Time',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'License & Compliance System',
      description: 'Architected a compliance portal tracking fire, environmental, and dormitory licenses with automatic email renewal alerts and role-based clearance permissions.',
      tags: ['React.js', 'Node.js', 'Oracle DB', 'Cron Schedulers'],
      metric: '80% Reduction in Operational Errors',
      icon: RefreshCw,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Facility Operations Modules',
      description: 'Designed unified modules for transport scheduling, canteen operations, grievances reporting, and repair maintenance requests. Formulated dynamic dashboards for site administrators.',
      tags: ['React.js', 'Node.js', 'Data Charts', 'Admin Alerts'],
      metric: 'Centralized Site Monitoring',
      icon: Layout,
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'POSH Compliance Platform',
      description: 'Co-developed a secure POSH (Prevention of Sexual Harassment) compliance platform featuring rigorous Role-Based Access Controls (RBAC) to ensure confidentiality and end-to-end auditability.',
      tags: ['Angular', 'Vue.js', 'RBAC Workflows', 'Confidential Logs'],
      metric: 'Secure Case Management System',
      icon: LockIcon,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Two-Layer Cryptography Architecture',
      description: 'Strengthened system security for sensitive business documents by implementing a two-layer SHA-256 encryption process with secure key-based decoding logic.',
      tags: ['SHA-256 Encryption', 'Key Decryption', 'Node.js', 'API Security'],
      metric: 'Enterprise Cryptography Module',
      icon: Key,
      color: 'from-indigo-500 to-cyan-500'
    },
    {
      title: 'Deployments & Operational Controls',
      description: 'Managed web server setups on IIS, SVN repositories, API endpoints validations, hot patches, and live issue triage across manufacturing plant environments.',
      tags: ['IIS Server', 'SVN', 'Postman', 'Patch Releases'],
      metric: 'Zero Critical System Downtimes',
      icon: Layers,
      color: 'from-slate-500 to-gray-500'
    }
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Professional <span className="bg-gradient-to-r from-cyber-accent to-cyan-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-cyber-textMuted font-mono text-sm uppercase tracking-widest">
            4 Years of Enterprise Web Development at Foxconn Hon Hai
          </p>
          <div className="h-[1px] w-24 bg-cyber-accent mt-2 mx-auto md:mx-0"></div>
        </div>

        {/* Company Card Header */}
        <GlassCard className="mb-12 border-l-4 border-l-cyber-accent/80 relative overflow-hidden" hoverEffect={false}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-accent/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-cyber-accent/10 border border-cyber-accent/25 rounded-2xl text-cyber-accent mt-1">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                  Full Stack Developer
                </h3>
                <h4 className="text-cyan-300 font-mono text-sm tracking-wide mt-1">
                  Foxconn Hon Hai Technology
                </h4>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-cyber-textMuted">
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Calendar className="w-3.5 h-3.5 text-cyber-accent" />
                <span>Dec 2021 – Dec 2025</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <MapPin className="w-3.5 h-3.5 text-cyber-accent" />
                <span>Sriperumbudur, Tamil Nadu</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-300 text-left mt-6 leading-relaxed">
            Member of a dedicated 3-person engineering squad designing, building, and rolling out critical internal systems. 
            Responsible for end-to-end features spanning React/Angular frontend web interfaces, robust Node.js REST API microservices, 
            and optimized Oracle DB schemas.
          </p>
        </GlassCard>

        {/* Project & Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accomplishments.map((item, index) => {
            const Icon = item.icon;
            return (
              <GlassCard 
                key={index}
                className="flex flex-col h-full text-left relative overflow-hidden group border border-white/5"
              >
                {/* Accent Background Glow on Hover */}
                <div className={`absolute -bottom-12 -right-12 w-28 h-28 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none`}></div>
                
                {/* Header Icon & Title */}
                <div className="flex items-start space-x-3.5 mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-15 border border-white/10 text-white`}>
                    <Icon className="w-5 h-5 text-cyber-accent" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-bold text-white group-hover:text-cyber-accent transition-colors duration-200">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-200 bg-cyan-950/50 border border-cyan-800/30 px-2 py-0.5 rounded-md mt-1 inline-block">
                      {item.metric}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-cyber-textMuted leading-relaxed flex-grow">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/5">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[10px] font-mono text-cyber-textMuted bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// Simple lock icon substitute since Lock isn't imported from Lucide
const LockIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default Experience;
