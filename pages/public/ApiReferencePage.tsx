
import React from 'react';
// Fixed: Added ArrowRight to imports to resolve 'Cannot find name' errors
import { Terminal, Code2, Cpu, Globe, ShieldCheck, Copy, Check, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { ScrollReveal, BlurText, ScrollFloat } from '../../components/common/Animations';
import { cn } from '../../lib/utils';

const ApiReferencePage: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('curl -X POST https://api.swiftdrop.io/v1/orders ...');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-white transition-colors duration-300">
      {/* Hero Header */}
      <section className="pt-32 pb-24 border-b border-white/5 relative overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
                 <Cpu size={12} /> REST API v1.0 (Stable)
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              <BlurText text="Programmable Logistics." className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white" />
            </div>
            <ScrollReveal delay={400}>
              <p className="text-xl text-slate-400 leading-relaxed font-medium max-w-2xl">
                Automate your supply chain with our robust, low-latency API. Dispatch, track, and settle shipments with a single line of code.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
             <ScrollReveal className="sticky top-32 space-y-10">
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Fundamentals</h4>
                  <ul className="space-y-3">
                     <li className="text-sm font-bold text-blue-500 cursor-pointer flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500"></div> Authentication
                     </li>
                     <li className="text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer pl-3">Rate Limiting</li>
                     <li className="text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer pl-3">Error States</li>
                  </ul>
               </div>
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Resources</h4>
                  <ul className="space-y-3">
                     <li className="text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer pl-3">Orders</li>
                     <li className="text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer pl-3">Tracking</li>
                     <li className="text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer pl-3">Fleet</li>
                     <li className="text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer pl-3">Webhooks</li>
                  </ul>
               </div>
             </ScrollReveal>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-20">
             <div className="space-y-8">
                <ScrollReveal>
                   <div className="space-y-4">
                      <h2 className="text-4xl font-black tracking-tight">Create a Shipment</h2>
                      <p className="text-slate-400 leading-relaxed max-w-2xl">
                        The <code className="bg-white/5 px-2 py-1 rounded text-blue-400 text-sm">POST /orders</code> endpoint initializes a new logistics relay and triggers the matching algorithm.
                      </p>
                   </div>
                </ScrollReveal>

                <ScrollReveal delay={200}>
                   <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                      <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Badge className="bg-emerald-500 text-white font-black text-[10px] rounded-md px-2 py-0.5">POST</Badge>
                            <span className="text-xs font-mono text-slate-400">/v1/orders</span>
                         </div>
                         <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
                            {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                         </button>
                      </div>
                      <div className="p-8 overflow-x-auto">
                         <pre className="text-xs md:text-sm font-mono text-indigo-300 leading-relaxed">
{`{
  "pickup": {
    "address": "123 Market St, San Francisco",
    "contact": "Warehouse Alpha"
  },
  "delivery": {
    "address": "456 Mission St, San Francisco",
    "recipient": "Jane Cooper"
  },
  "package": {
    "type": "ELECTRONICS",
    "weight": 2.5
  }
}`}
                         </pre>
                      </div>
                   </div>
                </ScrollReveal>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ScrollReveal delay={400}>
                   <Card className="bg-white/5 border-white/10 rounded-[2.5rem] p-10 space-y-6 group hover:bg-white/[0.08] transition-all">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform"><Terminal size={24} /></div>
                      <h4 className="text-xl font-black">SDK Support</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Official libraries for Node.js, Python, Go, and Ruby. Integrated with TypeScript definitions out of the box.</p>
                      {/* Fixed: Use ArrowRight icon correctly after adding it to the imports */}
                      <Button variant="ghost" className="p-0 h-auto text-blue-400 font-bold text-xs uppercase tracking-widest hover:bg-transparent flex items-center gap-2">Explore SDKs <ArrowRight size={12} /></Button>
                   </Card>
                </ScrollReveal>
                <ScrollReveal delay={500}>
                   <Card className="bg-white/5 border-white/10 rounded-[2.5rem] p-10 space-y-6 group hover:bg-white/[0.08] transition-all">
                      <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform"><Globe size={24} /></div>
                      <h4 className="text-xl font-black">Webhooks</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Real-time event streaming for status changes, driver location pulses, and delivery confirmation payloads.</p>
                      {/* Fixed: Use ArrowRight icon correctly after adding it to the imports */}
                      <Button variant="ghost" className="p-0 h-auto text-blue-400 font-bold text-xs uppercase tracking-widest hover:bg-transparent flex items-center gap-2">Setup Relays <ArrowRight size={12} /></Button>
                   </Card>
                </ScrollReveal>
             </div>
          </div>
        </div>
      </section>

      <ScrollReveal delay={600} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5">
         <div className="bg-blue-600 rounded-[3rem] p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tight relative z-10">Start building for free.</h3>
            <p className="text-blue-100 text-lg max-w-xl mx-auto relative z-10">Your first 100 API calls are on us. No credit card required to access the sandbox environment.</p>
            <div className="flex justify-center relative z-10">
               <Button className="bg-white text-blue-600 hover:bg-blue-50 font-black px-12 py-7 text-lg rounded-full shadow-2xl">Get API Key</Button>
            </div>
         </div>
      </ScrollReveal>
    </div>
  );
};

export default ApiReferencePage;
