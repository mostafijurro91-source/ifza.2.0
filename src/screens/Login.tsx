import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { Screen } from '../types';

export default function Login({ setScreen, onLogin }: { setScreen: (s: Screen) => void, onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white p-6 justify-center">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/20 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 space-y-8 max-w-sm mx-auto w-full"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">Welcome Back<span className="text-primary">.</span></h1>
          <p className="text-slate-400">Sign in to access virtual try-on and your personalized style.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-primary">Forgot Password?</button>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 neon-glow transition-all active:scale-95"
          >
            Sign In
            <ArrowRight className="size-5" />
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-500 font-bold uppercase">Or continue with</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Chrome className="size-5" />
            <span className="text-sm font-bold">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-colors">
            <Github className="size-5" />
            <span className="text-sm font-bold">GitHub</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-400">
          Don't have an account? <button onClick={() => setScreen('signup')} className="text-primary font-bold">Sign Up</button>
        </p>

        <div className="pt-8 text-center">
          <button 
            onClick={() => setScreen('admin-login')}
            className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-blue-500 transition-colors"
          >
            Staff / Admin Portal
          </button>
        </div>
      </motion.div>
    </div>
  );
}
