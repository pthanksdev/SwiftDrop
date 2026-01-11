
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Minus, Maximize2, User, Bot, ExternalLink, Globe } from 'lucide-react';
import { aiLogisticsService } from '../../services/ai.service';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<any>(null);
  const [history, setHistory] = useState<{ role: 'user' | 'model'; text: string; grounding?: any[] }[]>([
    { role: 'model', text: 'Hello! I am your SwiftDrop AI Assistant. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chat) {
      setChat(aiLogisticsService.createSupportChat());
    }
  }, [isOpen, chat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !chat || loading) return;

    const userMessage = message;
    setMessage('');
    setHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await chat.sendMessage({ message: userMessage });
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setHistory(prev => [...prev, { role: 'model', text: response.text || '', grounding }]);
    } catch (err) {
      setHistory(prev => [...prev, { role: 'model', text: 'Connection to AI Relay lost. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-[100] group"
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div className={cn(
      "fixed bottom-8 right-8 w-[380px] bg-white rounded-[2.5rem] shadow-3xl border border-slate-200 flex flex-col overflow-hidden z-[100] transition-all duration-500",
      isMinimized ? "h-20" : "h-[550px]"
    )}>
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Sparkles size={20} /></div>
           <h4 className="font-black text-sm">SwiftDrop AI</h4>
        </div>
        <div className="flex gap-1">
           <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg"><Minus size={16} /></button>
           <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg"><X size={16} /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {history.map((msg, i) => (
              <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                <div className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm", msg.role === 'user' ? "bg-slate-900 text-white" : "bg-blue-600 text-white")}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={cn("p-4 rounded-2xl text-sm max-w-[85%] leading-relaxed shadow-sm", msg.role === 'user' ? "bg-slate-900 text-white rounded-tr-none" : "bg-white text-slate-700 border border-slate-100 rounded-tl-none")}>
                    {msg.text}
                  </div>
                </div>
                {msg.grounding && msg.grounding.length > 0 && (
                  <div className="ml-11 flex flex-wrap gap-2">
                    {msg.grounding.map((chunk, j) => chunk.web && (
                      <a key={j} href={chunk.web.uri} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-blue-600 hover:border-blue-300 transition-colors">
                        <Globe size={10} /> {chunk.web.title || "Source"} <ExternalLink size={8} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-6 bg-white border-t border-slate-100 shrink-0">
            <div className="relative">
              <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask about shipments..." className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-blue-500/10" />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><Send size={16} /></button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default SupportChat;
