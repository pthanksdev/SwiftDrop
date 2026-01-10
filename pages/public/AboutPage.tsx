
import React from 'react';
import { Target, Heart, Lightbulb } from 'lucide-react';
import { BlurText, ScrollReveal, ScrollFloat } from '../../components/common/Animations';
import { cn } from '../../lib/utils';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero */}
      <section className="pt-32 pb-40 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <ScrollReveal>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
              <Target size={32} />
            </div>
            <BlurText 
              text="Our Mission is to Move the World." 
              className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight"
            />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
              SwiftDrop was founded in 2021 with a simple belief: that last-mile logistics should be as seamless as an email. We're building the infrastructure that powers commerce in every corner of the globe.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal className="space-y-8">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">How it all started.</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Back in 2021, our founders saw a recurring problem: small to mid-sized businesses were struggling to compete with giants because they lacked a reliable, professional delivery network.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                We started with three drivers and a single dispatch laptop. Today, SwiftDrop manages a network of over 12,000 drivers, facilitating millions of deliveries per month for businesses of all sizes.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <h4 className="text-4xl font-black text-blue-600 dark:text-blue-400">50+</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Cities Active</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-blue-600 dark:text-blue-400">99%</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Satisfaction Rate</p>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollFloat speed={0.04} className="relative">
               <div className="aspect-square bg-blue-600 rounded-[3rem] overflow-hidden shadow-2xl group">
                 <img 
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=2000" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent"></div>
               </div>
            </ScrollFloat>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-slate-900 dark:bg-slate-900/50 text-white transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-4">Our Core Values</h2>
            <h3 className="text-4xl font-black">What drives us forward.</h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: 'Speed is a Feature', icon: Lightbulb, desc: 'We optimize for velocity in everything we do, from software to delivery.' },
              { title: 'Radical Transparency', icon: Target, desc: 'Visibility is our greatest asset. We believe in showing, not telling.' },
              { title: 'Customer Obsession', icon: Heart, desc: "We win when our customers win. Their growth is the metric of our success." }
            ].map((v, i) => (
              <ScrollReveal key={i} delay={i * 150} className="space-y-6 px-4 group">
                <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <v.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold">{v.title}</h4>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {v.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
