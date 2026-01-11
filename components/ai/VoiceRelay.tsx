
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Phone, X, Activity, Volume2 } from 'lucide-react';
import { aiLogisticsService } from '../../services/ai.service';
import { cn } from '../../lib/utils';

const VoiceRelay: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<any>(null);
  
  // Audio state
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext) => {
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
    return buffer;
  };

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const inputCtx = new AudioContext({ sampleRate: 16000 });
      outputNodeRef.current = audioContextRef.current.createGain();
      outputNodeRef.current.connect(audioContextRef.current.destination);

      const sessionPromise = aiLogisticsService.connectLiveRelay({
        onopen: () => {
          setIsConnecting(false);
          setIsActive(true);
          
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            const b64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
            sessionPromise.then(s => s.sendRealtimeInput({ 
              media: { data: b64, mimeType: 'audio/pcm;rate=16000' } 
            }));
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (msg: any) => {
          const b64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (b64Audio && audioContextRef.current) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
            const buffer = await decodeAudioData(decode(b64Audio), audioContextRef.current);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(outputNodeRef.current!);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
          }
          if (msg.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
        },
        onclose: () => stopSession(),
        onerror: (e: any) => {
          console.error(e);
          setError("Live Relay Interrupted");
          stopSession();
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      setError("Microphone Access Denied");
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    sessionRef.current = null;
    setIsActive(false);
    setIsConnecting(false);
  };

  return (
    <div className="fixed bottom-24 right-8 z-[110]">
      {isActive && (
        <div className="absolute bottom-20 right-0 w-64 bg-slate-900 rounded-[2rem] p-6 text-white shadow-3xl animate-in slide-in-from-bottom-5 border border-white/10">
           <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1 items-end h-4">
                 {[0,1,2,3,4].map(i => (
                   <div key={i} className="w-1 bg-blue-500 animate-pulse" style={{ height: `${Math.random()*100}%`, animationDelay: `${i*0.1}s` }} />
                 ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Co-Pilot Active</span>
           </div>
           <p className="text-xs text-slate-400 leading-relaxed italic">"You are approaching traffic on Market St. I suggest a right turn on 4th..."</p>
           <button onClick={stopSession} className="mt-4 w-full py-2 bg-white/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-[10px] font-black uppercase">Terminate Link</button>
        </div>
      )}

      <button
        onClick={isActive ? stopSession : startSession}
        disabled={isConnecting}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl group",
          isActive ? "bg-rose-600 scale-110" : "bg-slate-900 hover:bg-blue-600"
        )}
      >
        {isConnecting ? <Activity className="text-white animate-pulse" /> : 
         isActive ? <MicOff className="text-white" /> : <Mic className="text-white" />}
        
        <span className="absolute right-full mr-4 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isActive ? "Mute Voice Relay" : "Hands-Free Co-Pilot"}
        </span>
      </button>
      
      {error && <p className="absolute top-full mt-2 right-0 text-[8px] font-black text-rose-500 uppercase whitespace-nowrap">{error}</p>}
    </div>
  );
};

export default VoiceRelay;
