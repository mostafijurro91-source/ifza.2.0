import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, ChevronLeft } from 'lucide-react';
import { Screen } from '../types';

export default function Signup({ setScreen, onSignup }: { setScreen: (s: Screen) => void, onSignup: (email: string) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white p-6 justify-center">
      <button 
        onClick={() => setScreen('login')}
        className="absolute top-12 left-6 text-slate-400 hover:text-white transition-colors"
      >
        <ChevronLeft className="size-8" />
      </button>

      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/20 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 space-y-8 max-w-sm mx-auto w-full"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">Join ifza<span className="text-primary">.</span></h1>
          <p className="text-slate-400">Create an account to start your virtual fashion journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                placeholder="Elena Rossi"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed">
            By signing up, you agree to our <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>.
          </p>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 neon-glow transition-all active:scale-95"
          >
            Create Account
            <ArrowRight className="size-5" />
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          Already have an account? <button onClick={() => setScreen('login')} className="text-primary font-bold">Sign In</button>
        </p>
      </motion.div>
    </div>
  );
}
