'use client';

import React, { useState } from 'react';

export function ProjectWizard() {
  const [step, setStep] = useState(1);
  const [pitch, setPitch] = useState('');
  const [spec, setSpec] = useState<any>(null);

  const generateSpec = async () => {
    setStep(2);
    try {
      const response = await fetch('/api/projects/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pitch }),
      });
      const data = await response.json();
      setSpec(data);
      setStep(3);
    } catch (error) {
      console.error('Failed to generate spec', error);
      // Fallback for demo
      setSpec({
        name: 'My Awesome Startup',
        slug: 'my-awesome-startup',
        description: 'A revolutionary platform for something great.',
        entities: [
          { name: 'User', fields: [{ name: 'email', type: 'String', required: true }] },
          { name: 'Task', fields: [{ name: 'title', type: 'String', required: true }] }
        ]
      });
      setStep(3);
    }
  };

  const deploy = async () => {
    setStep(4);
    // Simulate deployment
    setTimeout(() => setStep(5), 3000);
  };

  return (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
      <div className="p-8 sm:p-12">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">What are we building today?</h2>
            <p className="text-gray-500 text-lg">Describe your startup pitch and we will handle the rest.</p>
            <textarea
              className="w-full h-48 p-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-black focus:ring-0 transition-colors resize-none"
              placeholder="e.g. A marketplace for vintage collectibles with a built-in auction system..."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
            />
            <button
              onClick={generateSpec}
              className="w-full bg-black text-white text-xl font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Generate Blueprint
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
            <h2 className="text-2xl font-bold">Designing your architecture...</h2>
            <p className="text-gray-500 text-center max-w-md">Our AI is mapping entities, security rules, and infrastructure requirements based on your pitch.</p>
          </div>
        )}

        {step === 3 && spec && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Review Blueprint</h2>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 font-mono text-sm overflow-auto max-h-96">
              <pre>{JSON.stringify(spec, null, 2)}</pre>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all"
              >
                Refine Pitch
              </button>
              <button
                onClick={deploy}
                className="flex-1 bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all shadow-lg"
              >
                Build & Deploy
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div className="bg-black h-full animate-pulse w-3/4"></div>
            </div>
            <h2 className="text-2xl font-bold text-center">Provisioning Infrastructure & Generating Code...</h2>
            <div className="text-gray-500 text-sm grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="flex items-center gap-2">✅ VPC Created</div>
              <div className="flex items-center gap-2">⏳ ECS Tasks Initializing</div>
              <div className="flex items-center gap-2">✅ Prisma Schema Migrated</div>
              <div className="flex items-center gap-2">⏳ Next.js Build Running</div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center py-12 space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold">Ship It! 🚀</h2>
            <p className="text-gray-600 text-lg">Your application is live and the code has been exported to GitHub.</p>
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <a href="#" className="bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-all">
                Open App Dashboard
              </a>
              <button onClick={() => setStep(1)} className="text-gray-500 font-medium hover:underline">
                Create Another Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
