
import React from 'react';
import { ShieldCheck, Scale, Cookie, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const navigate = useNavigate();
  
  const content = {
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      updated: 'March 15, 2024',
      description: 'How we collect, protect, and process your logistics data.',
      sections: [
        { title: '1. Information Collection', text: 'We collect data necessary for logistics orchestration, including location tracking, contact details, and transaction history.' },
        { title: '2. GPS Telemetry', text: 'Real-time location data is collected for active shipment tracking and fleet optimization. Data is purged after delivery completion unless archived for audit.' },
        { title: '3. Data Security', text: 'All data is encrypted in transit using TLS 1.3 and at rest via AES-256 standards. Access is restricted to authorized administrative personnel.' }
      ]
    },
    terms: {
      title: 'Terms of Service',
      icon: Scale,
      updated: 'February 01, 2024',
      description: 'The legal framework for using the SwiftDrop platform.',
      sections: [
        { title: '1. Platform Access', text: 'Users must provide accurate identity verification. Misuse of the dispatch engine will lead to immediate account termination.' },
        { title: '2. Liability & Insurance', text: 'Every shipment is insured up to $500. SwiftDrop acts as an orchestrator and is not liable for indirect losses beyond cargo value.' },
        { title: '3. Payment Terms', text: 'Fares are calculated dynamically based on distance and weight. Settlements are final once the courier accepts the relay.' }
      ]
    },
    cookies: {
      title: 'Cookie Policy',
      icon: Cookie,
      updated: 'January 10, 2024',
      description: 'Understanding our use of digital identifiers and tracking.',
      sections: [
        { title: '1. Necessary Cookies', text: 'Essential for maintaining secure authentication sessions and session persistence during high-volume dispatch operations.' },
        { title: '2. Analytics Cookies', text: 'We use performance cookies to monitor platform latency and improve the geospatial routing engine.' },
        { title: '3. Preference Management', text: 'You can calibrate your cookie settings directly within the System Settings panel of your dashboard.' }
      ]
    }
  };

  const active = content[type];

  return (
    <div className="bg-white min-h-screen">
       <section className="pt-32 pb-20 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
             <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-400 hover:text-white p-0">
                <ArrowLeft size={18} className="mr-2" /> Back
             </Button>
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl">
                   <active.icon size={32} />
                </div>
                <div>
                   <h1 className="text-4xl font-black tracking-tight">{active.title}</h1>
                   <p className="text-slate-400 text-sm font-medium mt-1 uppercase tracking-widest">Last Modified: {active.updated}</p>
                </div>
             </div>
             <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{active.description}</p>
          </div>
       </section>

       <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 space-y-16">
             <div className="prose prose-slate prose-lg max-w-none">
                {active.sections.map((section, i) => (
                  <div key={i} className="space-y-6">
                     <h3 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                        <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">0{i+1}</span>
                        {section.title}
                     </h3>
                     <p className="text-slate-600 leading-relaxed font-medium pb-8 border-b border-slate-50 last:border-none">
                        {section.text}
                     </p>
                  </div>
                ))}
             </div>

             <div className="p-12 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-8">
                <div className="flex items-center gap-4 text-slate-900">
                   <ShieldCheck size={24} className="text-blue-600" />
                   <h4 className="text-xl font-black">Transparency Commitment</h4>
                </div>
                <p className="text-slate-500 leading-relaxed">
                   SwiftDrop is committed to providing a secure and transparent logistics environment. For more detailed legal documentation or data requests, please contact our Legal Operations team at <span className="text-blue-600 font-bold">legal@swiftdrop.io</span>.
                </p>
                <div className="flex gap-4">
                   <Button variant="outline" className="rounded-2xl h-14 border-slate-200 font-bold text-xs">Download full PDF</Button>
                   <Button variant="ghost" className="rounded-2xl h-14 font-black uppercase tracking-widest text-[10px] text-blue-600">Archive Log</Button>
                </div>
             </div>
          </div>
       </section>
    </div>
  );
};

export default LegalPage;
