import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, User, ArrowRight, ChevronLeft } from 'lucide-react';
import { Screen } from '../types';

export default function AdminLogin({ setScreen, onAdminLogin }: { setScreen: (s: Screen) => void, onAdminLogin: (user: string, pass: string) => boolean }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAdminLogin(username, password);
    if (success) {
      setScreen('admin');
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-[#0a0a0f] text-slate-900 dark:text-white p-6 justify-center transition-colors duration-300">
      <button
        onClick={() => setScreen('login')}
        className="absolute top-12 left-6 text-slate-500 hover:text-white transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="size-6 text-primary" />
        <span className="text-sm font-bold text-slate-500 hover:text-primary">User Login</span>
      </button>

      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-600/10 to-transparent"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 space-y-8 max-w-sm mx-auto w-full"
      >
        <div className="text-center space-y-3">
          <div className="size-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
            <ShieldCheck className="size-8 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter">Staff Portal</h1>
          <p className="text-slate-400 text-sm">Enter your administrative credentials to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admin User ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                placeholder="admin_user"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            Authenticate
            <ArrowRight className="size-5" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
        </div>
      </motion.div>
    </div>
  );
}
