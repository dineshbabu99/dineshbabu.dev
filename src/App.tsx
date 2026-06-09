import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import FoxconnDashboard from './sections/FoxconnDashboard';
import Contact from './sections/Contact';
import { useAppDispatch } from './store';
import { setActiveSection } from './features/portfolioSlice';
import GithubProjects from './sections/GithubProjects';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sections = ['home', 'experience', 'skills', 'simulator', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            dispatch(setActiveSection(section));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);

  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-100 font-sans pb-16">
      {/* Top Header Navbar */}
      <Navbar />
      
      {/* Content Sections */}
      <main className="w-full">
        <Hero />
        <Experience />
        <Skills />
        <FoxconnDashboard />
        <GithubProjects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-6 border-t border-white/5 text-center text-xs text-cyber-textMuted font-mono">
        <div>
          &copy; {new Date().getFullYear()} DINESH BABU K. All rights secured.
        </div>
        <div className="mt-1">
          Designed with React, TypeScript, Redux Toolkit, and Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}

export default App;
