import { ProjectWizard } from '@/components/ProjectWizard';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-black font-black text-xl">A</span>
          </div>
          <span className="text-xl font-bold tracking-tighter">A1 FOUNDRY</span>
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-white transition-colors">Templates</a>
          <a href="#" className="hover:text-white transition-colors">Showcase</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <button className="px-5 py-2 bg-white text-black rounded-full hover:bg-white/90 transition-all font-bold">
            Sign In
          </button>
        </div>
      </nav>

      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Powered by A1 Intelligence
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
          BEYOND<br />CODE.
        </h1>
        <p className="text-xl md:text-2xl text-white/40 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
          The world&apos;s first luxury meta-app factory. Describe your vision, and we&apos;ll engineer the reality—from infrastructure to interface.
        </p>

        <div className="max-w-4xl mx-auto">
          <ProjectWizard />
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/20 text-sm font-medium">
            © 2026 A1 App Foundry. All rights reserved.
          </div>
          <div className="flex gap-8 text-white/20 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
