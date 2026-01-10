
import React from 'react';
import { Newspaper, Download, ExternalLink, Mail, Camera, FileText, Globe } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { formatDate } from '../../utils/formatters';
import { ScrollReveal, BlurText } from '../../components/common/Animations';
import { cn } from '../../lib/utils';

const PressReleases = [
  { id: 1, title: 'SwiftDrop Announces $50M Series B to Expand Global Relay Network', date: '2024-03-10', source: 'Global News Wire' },
  { id: 2, title: 'Pioneering Autonomous Dispatch: A New Era of Logistics', date: '2024-02-15', source: 'Logistics Insider' },
  { id: 3, title: 'SwiftDrop Partners with Major Retailers for 15-Minute Urban Delivery', date: '2024-01-22', source: 'The Wall Street Pulse' },
];

const PressPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <section className="pt-32 pb-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-end justify-between gap-10">
              <div className="space-y-4">
                 <ScrollReveal>
                   <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                      <Newspaper size={24} />
                      <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Newsroom</h2>
                   </div>
                   <BlurText text="Global Announcements." className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mt-4" />
                   <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl leading-relaxed text-xl">
                     Official stories and media assets from the front lines of logistics innovation.
                   </p>
                 </ScrollReveal>
              </div>
              <ScrollReveal delay={300}>
                <div className="p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                   <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center"><Mail size={24} /></div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Media Inquiries</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">press@swiftdrop.io</p>
                   </div>
                </div>
              </ScrollReveal>
           </div>
        </div>
      </section>

      <section className="py-24">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Main Press Feed */}
            <div className="lg:col-span-8 space-y-12">
               <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] ml-2">Latest Relays</h3>
               <div className="space-y-6">
                  {PressReleases.map((news, i) => (
                    <ScrollReveal key={news.id} delay={i * 100}>
                      <div className="group p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer shadow-sm hover:shadow-xl">
                         <div className="space-y-3 flex-1 text-center md:text-left">
                            <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{formatDate(news.date)} • {news.source}</p>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{news.title}</h4>
                         </div>
                         <Button variant="ghost" className="rounded-2xl h-14 w-14 p-0 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-200 shadow-sm transition-all">
                            <ExternalLink size={20} />
                         </Button>
                      </div>
                    </ScrollReveal>
                  ))}
               </div>
               <ScrollReveal delay={400}>
                 <Button variant="ghost" className="w-full py-10 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest hover:border-slate-300 dark:hover:border-slate-600 transition-all">Load Archive</Button>
               </ScrollReveal>
            </div>

            {/* Media Resources Sidebar */}
            <div className="lg:col-span-4 space-y-12">
               <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] ml-2">Brand Assets</h3>
               <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: 'Logo Package', icon: Camera, desc: 'SVG, PNG, EPS formats' },
                    { label: 'Corporate Fact Sheet', icon: FileText, desc: 'Key metrics and timeline' },
                    { label: 'Leadership Bios', icon: Globe, desc: 'Headshots and histories' }
                  ].map((asset, i) => (
                    <ScrollReveal key={i} delay={i * 150}>
                      <Card className="rounded-[2.5rem] border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8 space-y-6 group hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl transition-all cursor-pointer">
                         <div className="flex items-center justify-between">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm"><asset.icon size={20} /></div>
                            <Download size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-500 transition-colors" />
                         </div>
                         <div>
                            <h4 className="font-black text-slate-900 dark:text-white">{asset.label}</h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">{asset.desc}</p>
                         </div>
                      </Card>
                    </ScrollReveal>
                  ))}
               </div>

               <ScrollReveal delay={600}>
                 <div className="p-10 bg-slate-900 dark:bg-blue-700/20 border dark:border-blue-500/20 rounded-[3rem] text-white space-y-6 shadow-2xl">
                    <h4 className="text-xl font-black">Brand Guidelines</h4>
                    <p className="text-slate-400 dark:text-blue-100 text-sm leading-relaxed">Ensure proper usage of the SwiftDrop identity across all digital and print media.</p>
                    <Button className="w-full rounded-2xl h-14 bg-blue-600 dark:bg-blue-500 font-bold uppercase tracking-widest text-[10px]">Access Guidelines</Button>
                 </div>
               </ScrollReveal>
            </div>
         </div>
      </section>
    </div>
  );
};

export default PressPage;
