
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, Zap, ShieldCheck, Globe, DollarSign, MapPin, 
  ArrowRight, Server, Layout, Smartphone, ChevronRight
} from 'lucide-react';
import Button from '../../components/common/Button';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { BlurText, ScrollReveal, ScrollFloat } from '../../components/common/Animations';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white dark:bg-slate-950 transition-colors">
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2500" 
            alt="Logistics Background"
            className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-10 text-center lg:text-left">
              <ScrollReveal>
                <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span>The Global Standard for Last-Mile Logistics</span>
                </div>
              </ScrollReveal>
              
              <div className="space-y-4">
                <BlurText 
                  text="Orchestrate Every Relay." 
                  className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter"
                />
              </div>
              
              <ScrollReveal delay={400}>
                <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  A programmable logistics layer for modern commerce. Scale your fleet with real-time GPS synchronization and autonomous dispatch.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={600} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto px-12 py-6 text-lg rounded-[2rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/40 hover:bg-blue-500 transition-all font-black uppercase tracking-widest" 
                  onClick={() => navigate('/register')}
                >
                  Start Free Trial <ArrowRight size={20} className="ml-2" />
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:text-blue-400 text-lg group flex items-center gap-3 backdrop-blur-md bg-white/5 px-10 py-6 rounded-[2rem] border border-white/10" 
                  onClick={() => navigate('/tracking')}
                >
                  Track Shipment
                </Button>
              </ScrollReveal>

              <ScrollReveal delay={800} className="pt-12 flex flex-wrap justify-center lg:justify-start items-center gap-10 opacity-40">
                 <p className="w-full lg:w-auto text-[10px] font-black text-white uppercase tracking-[0.3em]">Infrastructure Partners</p>
                 <div className="flex items-center gap-8 grayscale brightness-200">
                    <span className="text-2xl font-black tracking-tighter">AWS</span>
                    <span className="text-2xl font-black tracking-tighter">STRIPE</span>
                    <span className="text-2xl font-black tracking-tighter">GOOGLE</span>
                 </div>
              </ScrollReveal>
            </div>

            {/* Floating Visual HUD */}
            <div className="lg:col-span-5 hidden lg:block">
               <ScrollFloat speed={0.05}>
                  <div className="bg-slate-800/40 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-10 space-y-8 shadow-3xl">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                              <Globe size={24} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Global Relay</p>
                              <h4 className="text-white font-bold">Network Status: Nominal</h4>
                           </div>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[9px]">99.98% UP</Badge>
                     </div>

                     <div className="space-y-4">
                        {[
                          { label: 'Avg Dispatch', val: '42s', progress: 85 },
                          { label: 'Active Fleets', val: '1,240', progress: 65 },
                          { label: 'API Latency', val: '12ms', progress: 95 }
                        ].map((s) => (
                           <div key={s.label} className="space-y-2">
                              <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                 <span>{s.label}</span>
                                 <span className="text-white">{s.val}</span>
                              </div>
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.progress}%` }}></div>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="p-6 bg-slate-950/50 rounded-3xl border border-white/5">
                        <div className="flex items-center gap-2 mb-4">
                           <Server size={14} className="text-indigo-400" />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Terminal</span>
                        </div>
                        <pre className="text-[10px] text-emerald-400 font-mono leading-relaxed">
                           $ swiftdrop deploy --fleet-id SF-01<br/>
                           > Syncing 84 courier units...<br/>
                           > Optimizing routes for 142 orders...<br/>
                           <span className="animate-pulse">_</span>
                        </pre>
                     </div>
                  </div>
               </ScrollFloat>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE PILLARS */}
      <section className="py-32 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <ScrollReveal>
              <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Operational Core</h2>
              <h3 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mt-4">Logistics, Re-Engineered.</h3>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                We replaced complex phone chains and spreadsheets with a single, programmable API and a world-class dashboard.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Intelligent Dispatch', 
                desc: 'Our proprietary ML algorithm routes orders based on distance, traffic, and unit capacity.', 
                icon: Zap, 
                color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
              },
              { 
                title: 'Visual Command', 
                desc: 'See your entire network move on a live satellite-mapped interface with sub-meter accuracy.', 
                icon: MapPin, 
                color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' 
              },
              { 
                title: 'Financial Vault', 
                desc: 'Automated settlement for drivers and unified invoicing for enterprises. 0% manual entry.', 
                icon: DollarSign, 
                color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
              }
            ].map((f, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group p-10 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl transition-all duration-500 h-full">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", f.color)}>
                    <f.icon size={32} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{f.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {f.desc}
                  </p>
                  <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
                     <button className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                        Learn More <ChevronRight size={14} />
                     </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PLATFORM CAPABILITIES */}
      <section className="py-32 bg-slate-900 dark:bg-slate-900/80 text-white overflow-hidden relative transition-colors">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-12">
                  <ScrollReveal>
                    <div className="space-y-4">
                       <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Ecosystem</h2>
                       <h3 className="text-5xl font-black tracking-tight leading-none">A Hub for <br/> Every Stakeholder.</h3>
                    </div>
                  </ScrollReveal>

                  <div className="space-y-8">
                     {[
                        { title: 'The Admin Portal', desc: 'Full-spectrum control over users, fleet approvals, and global pricing.', icon: ShieldCheck },
                        { title: 'The Dispatch Console', desc: 'Real-time monitoring and intervention for complex logistics chains.', icon: Layout },
                        { title: 'The Courier App', desc: 'Optimized routing and digital POD for drivers on the front line.', icon: Smartphone },
                        { title: 'The Client Tracker', desc: 'Transparency that builds trust. Live maps for every customer.', icon: Globe }
                     ].map((item, i) => (
                        <ScrollReveal key={i} delay={i * 100} className="flex gap-6 items-start">
                           <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                              <item.icon size={22} />
                           </div>
                           <div>
                              <h4 className="text-lg font-black text-white">{item.title}</h4>
                              <p className="text-slate-400 text-sm leading-relaxed mt-1 font-medium">{item.desc}</p>
                           </div>
                        </ScrollReveal>
                     ))}
                  </div>
               </div>

               <ScrollFloat speed={-0.03} className="relative">
                  <div className="aspect-square bg-blue-600 rounded-[4rem] shadow-3xl rotate-3 flex items-center justify-center relative z-10 overflow-hidden group">
                     <img 
                        src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200" 
                        alt="Analytics Dashboard Preview"
                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600/30 rounded-[3rem] -z-10 blur-2xl"></div>
               </ScrollFloat>
            </div>
         </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-32 bg-blue-600 dark:bg-blue-700 relative overflow-hidden transition-colors">
        <ScrollReveal className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-12">
          <BlurText text="Ready to optimize your fleet?" className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]" />
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            Join 500+ enterprises who moved their logistics to SwiftDrop. Deploy in minutes, not months.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 px-12 py-7 text-xl rounded-full shadow-2xl font-black uppercase tracking-widest" 
              onClick={() => navigate('/register')}
            >
              Start Free Trial
            </Button>
            <Button 
              variant="ghost" 
              className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10 px-12 py-7 text-xl rounded-full font-black uppercase tracking-widest" 
              onClick={() => navigate('/contact')}
            >
              Contact Sales
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s linear infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
