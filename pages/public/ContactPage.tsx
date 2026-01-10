
import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { ScrollReveal, BlurText } from '../../components/common/Animations';
import { cn } from '../../lib/utils';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div className="space-y-12">
            <ScrollReveal>
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em]">Connect</h2>
                <BlurText text="Let's talk logistics." className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight" />
                <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-xl">
                  Whether you're a local business looking to ship or a driver wanting to join the team, we'd love to hear from you.
                </p>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              {[
                { title: 'Email Us', info: 'hello@swiftdrop.io', sub: 'support@swiftdrop.io', icon: Mail, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
                { title: 'Call Us', info: '+1 (888) SWIFT-LOG', sub: 'Mon - Fri, 9am - 6pm EST', icon: Phone, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
                { title: 'Visit Us', info: '2420 Market Street, Suite 400', sub: 'San Francisco, CA 94103', icon: MapPin, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 100} className="flex items-start space-x-6">
                  <div className={cn("p-4 rounded-2xl shadow-sm shrink-0", item.color)}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">{item.info}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm">{item.sub}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <ScrollReveal delay={400} className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center space-x-3 mb-10 text-blue-600 dark:text-blue-400">
               <MessageSquare size={24} />
               <h3 className="text-2xl font-black text-slate-900 dark:text-white">Send a message</h3>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                  <Input placeholder="John Doe" className="bg-white dark:bg-slate-950 dark:border-slate-800" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <Input type="email" placeholder="john@example.com" className="bg-white dark:bg-slate-950 dark:border-slate-800" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Subject</label>
                <Input placeholder="General Inquiry" className="bg-white dark:bg-slate-950 dark:border-slate-800" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Message</label>
                <textarea 
                  className="w-full p-4 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 min-h-[150px] transition-all text-slate-900 dark:text-white"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>
              <Button className="w-full py-5 text-lg shadow-xl shadow-blue-500/10 font-black rounded-full" rightIcon={<Send size={18} />}>
                Dispatch Message
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
