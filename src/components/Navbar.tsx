import React from 'react';
import { Menu, X, ShieldAlert, Cpu, Terminal, Home, Briefcase, FileCode } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setActiveSection, setSidebarOpen } from '../features/portfolioSlice';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeSection = useAppSelector((state) => state.portfolio.activeSection);
  const sidebarOpen = useAppSelector((state) => state.portfolio.sidebarOpen);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: FileCode },
    { id: 'simulator', label: 'Enterprise Simulator', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: FileCode },
    { id: 'contact', label: 'Contact', icon: ShieldAlert },
  ];

  const handleNavClick = (id: string) => {
    dispatch(setActiveSection(id));
    dispatch(setSidebarOpen(false));
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 bg-gradient-to-b from-[#050811]/90 to-transparent backdrop-blur-md border-b border-cyber-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-accent to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-transform group-hover:rotate-12">
            <Cpu className="w-5 h-5 text-cyber-bg font-bold" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-tight tracking-wider text-white group-hover:text-cyber-accent transition-colors">
              DINESH BABU
            </span>
            <span className="text-[10px] text-cyber-textMuted font-mono tracking-widest uppercase">
              Full Stack Dev
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 font-display
                  ${isActive
                    ? 'text-cyber-accent bg-cyber-accent/10 border border-cyber-accent/20 shadow-[0_0_15px_rgba(34,211,238,0.05)]'
                    : 'text-cyber-textMuted hover:text-white hover:bg-white/5 border border-transparent'}
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}
          className="md:hidden p-2 rounded-xl border border-cyber-border bg-cyber-panel/50 text-white hover:text-cyber-accent hover:border-cyber-accent/50 transition-colors"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`
          fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-cyber-bg/95 backdrop-blur-xl border-t border-cyber-border z-40 transition-transform duration-300 md:hidden
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex items-center space-x-3 p-4 rounded-2xl text-left font-display font-medium text-lg transition-all duration-200
                  ${isActive
                    ? 'text-cyber-accent bg-cyber-accent/10 border border-cyber-accent/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]'
                    : 'text-cyber-textMuted hover:text-white hover:bg-white/5 border border-transparent'}
                `}
              >
                <Icon className="w-5 h-5 text-cyber-accent" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
