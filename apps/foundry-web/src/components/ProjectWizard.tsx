'use client';

import React, { useState } from 'react';

const steps = [
  { id: 1, title: 'Concept', description: 'Describe your vision' },
  { id: 2, title: 'Blueprint', description: 'AI Architectural Design' },
  { id: 3, title: 'Engineering', description: 'Code Generation' },
  { id: 4, title: 'Deployment', description: 'Cloud Provisioning' },
];

export function ProjectWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [pitch, setPitch] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [spec, setSpec] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-5));
  };

  const generateBlueprint = async () => {
    setIsGenerating(true);
    addLog('Initializing A1 Brain...');

    // Simulate API call to NestJS backend
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'New Luxury Startup',
          slug: 'luxury-startup-' + Math.random().toString(36).substring(7),
          pitch
        }),
      });
      const data = await response.json();

      setTimeout(() => addLog('Analyzing market entities...'), 800);
      setTimeout(() => addLog('Designing DB Schema (Prisma)...'), 1500);
      setTimeout(() => {
        setSpec(data);
        setCurrentStep(2);
        setIsGenerating(false);
      }, 2500);
    } catch (err) {
      console.error('Failed to generate blueprint', err);
      // Fallback
      setTimeout(() => {
        setSpec({ name: 'Fallback App', entities: [{name: 'User'}] });
        setCurrentStep(2);
        setIsGenerating(false);
      }, 2000);
    }
  };

  const startEngineering = () => {
    setCurrentStep(3);
    addLog('Emitting Monorepo structure...');
    setTimeout(() => addLog('Generating NestJS Controllers...'), 1000);
    setTimeout(() => addLog('Generating Next.js App Router UI...'), 2000);
    setTimeout(() => addLog('Configuring AWS CDK stacks...'), 3000);
    setTimeout(() => setCurrentStep(4), 4500);
  };

  return (
    <div className="group relative">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/5 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Wizard Header */}
        <div className="flex border-b border-white/5">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`flex-1 px-4 py-6 text-center border-r border-white/5 last:border-r-0 transition-colors ${currentStep >= s.id ? 'bg-white/[0.02]' : ''}`}
            >
              <div className={`text-[10px] uppercase tracking-[0.2em] mb-1 font-bold ${currentStep >= s.id ? 'text-white' : 'text-white/20'}`}>
                Step 0{s.id}
              </div>
              <div className={`text-xs font-medium ${currentStep >= s.id ? 'text-white/80' : 'text-white/10'}`}>
                {s.title}
              </div>
            </div>
          ))}
        </div>

        {/* Wizard Body */}
        <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white">Let&apos;s build your empire.</h2>
                <p className="text-white/40 text-lg">Describe your vision in plain English. I&apos;ll handle the architecture.</p>
              </div>

              <div className="relative">
                <textarea
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  placeholder="e.g. A high-end real estate platform with AI-driven valuation and virtual tours..."
                  className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-white text-lg placeholder:text-white/10 focus:outline-none focus:border-white/20 transition-all resize-none"
                />
                <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-white/20 font-bold">
                  AI Ready
                </div>
              </div>

              <button
                disabled={!pitch || isGenerating}
                onClick={generateBlueprint}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ARCHITECTING...
                  </>
                ) : (
                  'INITIATE GENERATION'
                )}
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight text-white">Blueprint Generated.</h2>
                  <p className="text-white/40 text-lg">I&apos;ve designed a scalable A1-grade architecture.</p>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black tracking-widest rounded-full border border-green-500/20">
                  OPTIMIZED
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-black tracking-widest text-white/40 uppercase">Entities</h3>
                  <div className="flex flex-wrap gap-2">
                    {spec?.entities?.map((e: any) => (
                      <span key={e.name} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium">{e.name}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
                  <h3 className="text-xs font-black tracking-widest text-white/40 uppercase">Tech Stack</h3>
                  <div className="text-xs font-medium space-y-2">
                    <div className="flex justify-between"><span>Frontend</span><span className="text-white/40">Next.js 14</span></div>
                    <div className="flex justify-between"><span>Backend</span><span className="text-white/40">NestJS + Prisma</span></div>
                    <div className="flex justify-between"><span>Infra</span><span className="text-white/40">AWS Fargate</span></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 py-4 border border-white/10 rounded-2xl text-white/60 font-bold hover:bg-white/5 transition-all"
                >
                  REVISE
                </button>
                <button
                  onClick={startEngineering}
                  className="flex-1 py-4 bg-white text-black rounded-2xl font-black hover:bg-white/90 transition-all shadow-xl"
                >
                  ENGINEER & DEPLOY
                </button>
              </div>
            </div>
          )}

          {(currentStep === 3 || currentStep === 4) && (
            <div className="space-y-12 py-8 animate-in fade-in duration-1000">
               <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 border-2 border-white/5 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {currentStep === 3 ? 'Engineering in progress...' : 'Finalizing Deployment...'}
                  </h2>
               </div>

               <div className="bg-black border border-white/5 rounded-2xl p-6 font-mono text-[11px] space-y-2 h-40 overflow-hidden relative">
                  {logs.map((log, i) => (
                    <div key={i} className="text-white/40 animate-in slide-in-from-left-2 fade-in">
                      <span className="text-white/20 mr-2">➜</span> {log}
                    </div>
                  ))}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
               </div>

               {currentStep === 4 && (
                 <div className="text-center pt-4 animate-bounce">
                    <span className="text-white/60 text-sm font-medium italic">Almost there. Establishing secure handshake with AWS...</span>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
