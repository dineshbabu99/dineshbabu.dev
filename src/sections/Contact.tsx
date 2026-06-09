import React from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  updateContactForm, submitContactFormStart, 
  submitContactFormSuccess, submitContactFormError, resetContactFormStatus 
} from '../features/portfolioSlice';
import GlassCard from '../components/GlassCard';

export const Contact: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, status, errorMsg } = useAppSelector((state) => state.portfolio.contactForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      dispatch(submitContactFormError('Please fill out all required fields.'));
      return;
    }

    dispatch(submitContactFormStart());

    // Simulate API request
    setTimeout(() => {
      dispatch(submitContactFormSuccess());
      // Log submission details to system console for verification
      console.log('Contact form submitted successfully:', data);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(updateContactForm({ [name]: value }));
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-cyber-bg">
      {/* Background Glows */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
            Get in <span className="bg-gradient-to-r from-cyber-accent to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-cyber-textMuted font-mono text-sm uppercase tracking-widest">
            Let's build secure enterprise solutions together
          </p>
          <div className="h-[1px] w-24 bg-cyber-accent mt-2 mx-auto md:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Panels (Left side) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-display font-bold text-white text-left">
              Contact Channels
            </h3>
            <p className="text-gray-400 text-left text-sm md:text-base leading-relaxed">
              If you are looking for a developer who understands roles permissions, data security, 
              dashboard automation, and full-stack integration, feel free to drop a message or reach 
              out directly.
            </p>

            <div className="space-y-4 pt-4">
              {/* Phone card */}
              <a 
                href="tel:+919940217745"
                className="flex items-center space-x-4 bg-white/5 border border-white/5 p-4 rounded-xl hover:border-cyber-accent/30 hover:bg-cyber-accent/5 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent group-hover:bg-cyber-accent/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono text-cyber-textMuted uppercase">Phone</div>
                  <div className="text-sm font-semibold text-white mt-0.5">+91 99402 17745</div>
                </div>
              </a>

              {/* Email card */}
              <a 
                href="mailto:Dineshkaru28@gmail.com"
                className="flex items-center space-x-4 bg-white/5 border border-white/5 p-4 rounded-xl hover:border-cyber-accent/30 hover:bg-cyber-accent/5 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent group-hover:bg-cyber-accent/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono text-cyber-textMuted uppercase">Email</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Dineshkaru28@gmail.com</div>
                </div>
              </a>

              {/* Location card */}
              <div className="flex items-center space-x-4 bg-white/5 border border-white/5 p-4 rounded-xl hover:border-white/10 transition-all duration-300">
                <div className="p-3 rounded-xl bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-mono text-cyber-textMuted uppercase">Location</div>
                  <div className="text-sm font-semibold text-white mt-0.5">Chennai, India</div>
                </div>
              </div>
            </div>

            {/* Social profiles links */}
            <div className="flex space-x-4 pt-6">
              <a 
                href="https://linkedin.com/in/dineshbabu-dev"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:border-cyber-accent/30 hover:text-cyber-accent text-white flex items-center space-x-2 text-xs font-semibold font-display transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://github.com/dineshbabu99"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 hover:border-cyber-accent/30 hover:text-cyber-accent text-white flex items-center space-x-2 text-xs font-semibold font-display transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>

          {/* Form (Right side) */}
          <div className="lg:col-span-7">
            <GlassCard className="border border-white/5 relative overflow-hidden" hoverEffect={false}>
              
              {status === 'success' ? (
                <div className="py-12 px-6 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white">Message Securely Sent!</h4>
                  <p className="text-gray-400 max-w-sm mx-auto text-sm">
                    Thank you. Your inquiry has been processed and logged successfully in the simulated server log buffer.
                  </p>
                  <button 
                    onClick={() => dispatch(resetContactFormStatus())}
                    className="px-4 py-2 mt-4 text-xs font-bold text-cyber-bg bg-cyber-accent hover:bg-cyan-500 font-display rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Direct Secure Message
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-mono text-cyan-200">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        className="bg-black/40 border border-cyber-border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyber-accent"
                        placeholder="John Doe"
                        required
                        disabled={status === 'submitting'}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-mono text-cyan-200">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={data.email}
                        onChange={handleInputChange}
                        className="bg-black/40 border border-cyber-border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyber-accent"
                        placeholder="john@example.com"
                        required
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono text-cyan-200">Subject</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={data.subject}
                      onChange={handleInputChange}
                      className="bg-black/40 border border-cyber-border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyber-accent"
                      placeholder="Project Inquiry / Job Opportunity"
                      disabled={status === 'submitting'}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-mono text-cyan-200">Message Document</label>
                    <textarea 
                      name="message"
                      rows={5}
                      value={data.message}
                      onChange={handleInputChange}
                      className="bg-black/40 border border-cyber-border rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyber-accent"
                      placeholder="Write details of your proposal here..."
                      required
                      disabled={status === 'submitting'}
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-red-400 font-mono text-xs p-3 bg-red-950/20 border border-red-900/30 rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-accent to-cyan-500 text-cyber-bg font-bold font-display text-xs shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>{status === 'submitting' ? 'Transmitting Data...' : 'Transmit Secure Message'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
