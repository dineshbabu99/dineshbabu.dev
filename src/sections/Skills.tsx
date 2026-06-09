import React from 'react';
import { Layout, Server, Database, Shield, Wrench, ShieldAlert } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Front-End Development',
      icon: Layout,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      tagColor: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
      glowColor: 'from-cyan-500',
      description: 'Building dynamic, component-driven, responsive user interfaces.',
      skills: ['React.js', 'Redux Toolkit', 'TypeScript', 'Angular', 'Vue.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'Ant Design & NG-Zorro', 'HTML5', 'CSS3']
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30',
      tagColor: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
      glowColor: 'from-indigo-500',
      description: 'Developing high-throughput API endpoints and business logic layers.',
      skills: ['Node.js', 'Express.js', 'RESTful Web APIs', 'JSON Web Tokens', 'API Error Handling', 'Middleware Patterns']
    },
    {
      title: 'Databases & Design',
      icon: Database,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      tagColor: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
      glowColor: 'from-emerald-500',
      description: 'Designing structured tables, indexing, and writing complex queries.',
      skills: ['Oracle Database', 'SQL Query Optimization', 'Database Schemas', 'PL/SQL Triggers', 'MongoDB']
    },
    {
      title: 'Security & Encryption',
      icon: Shield,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      tagColor: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
      glowColor: 'from-purple-500',
      description: 'Securing sensitive documents and applying authorization boundaries.',
      skills: ['RBAC Authorization', 'Session Security', 'Data Encryption', 'SQL Injection Prevention', 'XSS Protection']
    },
    {
      title: 'Developer Tools & DevOps',
      icon: Wrench,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      tagColor: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
      glowColor: 'from-amber-500',
      description: 'Continuous development environments, deployments, and testing.',
      skills: ['Git & Version Control', 'SVN', 'IIS Server Deployments', 'Postman API Testing', 'Windows Server']
    }
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Technical <span className="bg-gradient-to-r from-cyber-accent to-purple-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-cyber-textMuted font-mono text-sm uppercase tracking-widest">
            Technologies and tools I work with
          </p>
          <div className="h-[1px] w-24 bg-cyber-accent mt-2 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <GlassCard 
                key={idx}
                className="text-left border border-white/5 relative overflow-hidden group"
                hoverEffect={true}
              >
                {/* Corner accent glow */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${category.glowColor} to-transparent opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none`}></div>

                {/* Header */}
                <div className="flex items-start space-x-4 mb-5">
                  <div className={`p-3 rounded-2xl border ${category.color} transition-all duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-cyber-accent transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-cyber-textMuted mt-1 font-sans leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills as pill tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className={`text-[11px] font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 hover:scale-105 cursor-default ${category.tagColor}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
        
        <div className="mt-8">
          <GlassCard 
            className="text-left border border-cyber-accent/25 relative overflow-hidden bg-gradient-to-br from-cyber-panel to-[#0f172a]/80 shadow-[0_0_20px_rgba(34,211,238,0.05)] flex flex-col justify-between"
            hoverEffect={false}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyber-accent/5 rounded-full blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center space-x-2 text-cyber-accent font-mono text-sm tracking-wider uppercase mb-3">
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span>Featured Expertise</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Building Enterprise Systems at Scale
              </h3>
              <p className="text-gray-400 mt-4 leading-relaxed max-w-4xl text-sm md:text-base">
               Built enterprise applications supporting 40,000+ employees across accommodation, security, compliance, and operational workflows at Foxconn Hon Hai Technology. Designed secure role-based systems using React, Node.js, and Oracle Database, helping automate critical business processes, reduce manual effort, and improve operational efficiency across multiple departments.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/5">
              <span className="bg-cyber-accent/10 border border-cyber-accent/30 text-cyber-accent font-mono text-xs px-3.5 py-1.5 rounded-xl">
                React Architecture
              </span>
              <span className="bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs px-3.5 py-1.5 rounded-xl">
                REST API Development
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs px-3.5 py-1.5 rounded-xl">
                Oracle Database Design
              </span>
              <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-xs px-3.5 py-1.5 rounded-xl">
                Enterprise Security
              </span>
            </div>
          </GlassCard>
        </div>

      </div>
    </section>
  );
};

export default Skills;
