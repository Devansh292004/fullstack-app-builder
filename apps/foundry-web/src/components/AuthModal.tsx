'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-8 text-center">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-black text-2xl">A</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                {isLogin ? 'Welcome back, Founder.' : 'Join the elite.'}
              </h2>
              <p className="text-white/40 mt-2">
                {isLogin ? 'Access your A1 App Foundry dashboard.' : 'Start engineering your digital empire today.'}
              </p>
            </div>

            <div className="space-y-4">
              <button className="w-full py-4 bg-white text-black rounded-2xl font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-3">
                <Github size={20} />
                Continue with GitHub
              </button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/20 transition-all"
                />
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/20 transition-all"
                  />
                )}
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-white/20 transition-all"
                />
              </div>

              <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </div>

            <div className="mt-8 text-center text-sm">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/40 hover:text-white transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
