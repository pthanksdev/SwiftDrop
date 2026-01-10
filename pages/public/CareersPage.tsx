
import React from 'react';
import { ArrowRight, Zap, Globe, Shield, Cpu } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { BlurText, ScrollReveal, ScrollFloat } from '../../components/common/Animations';

const Jobs = [
  { id: 1, title: 'Lead Orchestration Engineer', dept: 'Engineering', location: 'San Francisco / Remote', type: 'Full-time' },
  { id: 2, title: 'Geospatial Data Scientist', dept: 'Intelligence', location: 'London', type: 'Full-time' },
  { id: 3, title: 'Field Operations Director', dept: 'Operations', location: 'New York', type: 'Full-time' },
  { id: 4, title: 'UI/UX Interaction Designer', dept: 'Product', location: 'Remote', type: 'Contract' },
];

const CareersPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero */}
      <section className="pt-40 pb-40 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-8">
           <ScrollReveal>
             <Badge className="bg-blue-600 text-white border-none mb-6 font-black tracking-widest py-1 px-4">WE ARE HIRING</Badge>
             <BlurText 
                text="Build the Relay. Move the Future." 
                className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
             />
           </ScrollReveal>
           <ScrollReveal delay={400}>
             <p className="text-xl text-slate-400 mt-8 max-w-2xl mx-auto font-medium">
               Join a team of engineers and operators building the world's most programmable logistics infrastructure.
             </p>
           </ScrollReveal>
           <ScrollReveal delay={600}>
              <Button size="lg" className="rounded-full px-12 py-8 text-xl bg-white text-slate-900 hover:bg-slate-100 font-black shadow-2xl">View Open Roles</Button>
           </ScrollReveal>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { title: 'Speed is a Feature', icon: Zap, desc: 'We optimize for velocity in everything we do.' },
                { title: 'Radical Ownership', icon: Shield, desc: 'Every relay is our responsibility.' },
                { title: 'Global Scale', icon: Globe, desc: 'We build for every corner of the planet.' },
                { title: 'Data Obsessed', icon: Cpu, desc: 'Metrics guide our every intervention.' }
              ].map((v, i) => (
                <ScrollReveal key={i} delay={i * 100} className="space-y-4 group">
                   <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <v.icon size={28} />
                   </div>
                   <h4 className="text-xl font-black text-slate-900 dark:text-white">{v.title}</h4>
                   <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{v.desc}</p>
                </ScrollReveal>
              ))}
           </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-32 bg-slate-50 dark:bg-slate-900/30 transition-colors">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
           <ScrollReveal className="flex justify-between items-end">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Open Opportunities</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{Jobs.length} Positions</p>
           </ScrollReveal>

           <div className="space-y-4">
              {Jobs.map((job, i) => (
                <ScrollReveal key={job.id} delay={i * 100}>
                  <div className="group p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] hover:shadow-2xl dark:hover:shadow-blue-900/10 hover:border-blue-200 dark:hover:border-blue-900/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer">
                     <div className="space-y-2 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                           <Badge variant="secondary" className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black text-[9px] uppercase tracking-widest border-none">{job.dept}</Badge>
                           <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-slate-100 dark:border-slate-800 dark:text-slate-500">{job.type}</Badge>
                        </div>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white">{job.title}</h4>
                        <p className="text-slate-400 dark:text-slate-500 font-bold text-sm uppercase tracking-widest">{job.location}</p>
                     </div>
                     <Button className="rounded-full w-14 h-14 p-0 bg-slate-900 dark:bg-slate-800 text-white group-hover:bg-blue-600 transition-all group-hover:scale-110 shadow-lg">
                        <ArrowRight size={24} />
                     </Button>
                  </div>
                </ScrollReveal>
              ))}
           </div>

           <ScrollReveal delay={400}>
             <div className="p-12 bg-blue-600 dark:bg-blue-700 rounded-[3rem] text-white text-center space-y-6 shadow-2xl">
                <h4 className="text-2xl font-black">Don't see your role?</h4>
                <p className="text-blue-100 max-w-lg mx-auto font-medium">We're always looking for exceptional talent in orchestration, logistics, and design. Send your manifesto to careers@swiftdrop.io</p>
                <Button variant="ghost" className="text-white border-white/20 hover:bg-white/10 px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px]">General Application</Button>
             </div>
           </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
