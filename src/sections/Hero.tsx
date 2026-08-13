import React from 'react';
import { Terminal, ArrowRight, Award, Users, ShieldAlert, Cpu } from 'lucide-react';
import { useAppDispatch } from '../store';
import { setActiveSection } from '../features/portfolioSlice';

export const Hero: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleNavClick = (id: string) => {
    dispatch(setActiveSection(id));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleResumeDownload = () => {
    window.open('https://drive.google.com/uc?export=download&id=1m3gjyVWM5XlKuTP3Xq9aeTw9fugXIbZQ', '_blank');
  };

  const metrics = [
    { label: 'Enterprise Experience', value: '4+ Years', icon: Award, desc: 'Foxconn Hon Hai Tech' },
    { label: 'Dormitory Users', value: '40,000+', icon: Users, desc: 'Accommodation workflow' },
    { label: 'Sec. Processing Time', value: '-40%', icon: Cpu, desc: 'Automated visitor passes' },
    { label: 'License Renewals', value: '-80% Errors', icon: ShieldAlert, desc: 'Automated system triggers' }
  ];

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyber-accent/10 rounded-full blur-[100px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-cyber-accent/15 border border-cyber-accent/30 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider text-cyber-accent animate-pulse w-fit">
            <Terminal className="w-3.5 h-3.5" />
            <span>SYSTEM INITIALIZATION COMPLETE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] tracking-tight">
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-cyber-accent via-cyan-400 to-indigo-500 bg-clip-text text-transparent neon-text-glow">
              DINESH BABU K
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl font-mono text-cyan-200/80 font-medium">
            Full Stack Developer | React.js &bull; Angular &bull; Node.js &bull; Oracle DB
          </h2>

          <p className="text-gray-400 max-w-xl text-base md:text-lg leading-relaxed">
            I specialize in building secure, highly scalable, and role-based enterprise web applications.
            At <strong>Foxconn Hon Hai</strong>, I designed and maintained system modules for security,
            compliance, dormitory, and transport workflows supporting over <strong>40,000 employees</strong>.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => handleResumeDownload()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-accent to-cyan-500 text-cyber-bg font-bold font-display shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Download Resume</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="px-6 py-3.5 rounded-xl border border-cyber-border hover:border-cyber-accent/60 bg-cyber-panel/40 backdrop-blur-md text-white font-semibold font-display hover:shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md bg-cyber-panel backdrop-blur-xl border border-cyber-border rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative group overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyber-accent/25 transition-all duration-500"></div>

            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-[10px] font-mono text-cyber-textMuted tracking-wider">db-agent ~ zsh</span>
            </div>

            <div className="font-mono text-left text-xs md:text-sm space-y-3.5 text-cyan-200/90 leading-relaxed overflow-x-auto">
              <div>
                <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = &#123;
              </div>
              <div className="pl-4">
                name: <span className="text-emerald-400">'Dinesh Babu K'</span>,
              </div>
              <div className="pl-4">
                role: <span className="text-emerald-400">'Full Stack Engineer'</span>,
              </div>
              <div className="pl-4">
                experience: <span className="text-amber-400">4</span>, <span className="text-cyber-textMuted">// years</span>
              </div>
              <div className="pl-4">
                coreStack: [<span className="text-emerald-400">'React'</span>, <span className="text-emerald-400">'Angular'</span>, <span className="text-emerald-400">'Node'</span>, <span className="text-emerald-400">'OracleDB'</span>],
              </div>
              <div className="pl-4">
                specialties: [
              </div>
              <div className="pl-8">
                <span className="text-emerald-400">'Role-Based Security'</span>,
              </div>
              <div className="pl-8">
                <span className="text-emerald-400">'Real-time Dashboard Analytics'</span>,
              </div>
              <div className="pl-8">
                <span className="text-emerald-400">'SHA-256 Two-Layer Encryption'</span>
              </div>
              <div className="pl-4">
                ],
              </div>
              <div className="pl-4">
                supportedEmployees: <span className="text-amber-400">40000</span>
              </div>
              <div>&#125;;</div>
              <div className="text-cyber-textMuted pt-2">
                &gt; developer.initializeSysLog()
              </div>
              <div className="text-emerald-400 font-bold animate-pulse text-[11px]">
                &gt;&gt; Ready to secure and automate enterprise scale operations.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 relative z-10 w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-cyber-panel/50 backdrop-blur-md border border-cyber-border rounded-2xl p-5 text-left flex items-start space-x-4 hover:border-cyber-accent/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-display font-extrabold text-white leading-none">
                    {item.value}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-cyan-200/80 mt-1 font-display">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-cyber-textMuted font-mono mt-0.5">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
