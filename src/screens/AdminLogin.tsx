import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, User, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { Screen } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import bcrypt from 'bcryptjs';

export default function AdminLogin({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Allow "admin" as a shortcut for "admin@cokmoke.com"
      const loginEmail = email.trim() === 'admin' ? 'admin@cokmoke.com' : email.trim();

      if (!isSupabaseConfigured) {
        // Mock login for preview environment
        if (loginEmail === 'admin@cokmoke.com' && password === 'admin123') {
          const mockAdmin = { id: 'mock-1', email: loginEmail, role: 'admin', name: 'Mock Admin' };
          localStorage.setItem('admin_session', JSON.stringify(mockAdmin));
          setScreen('admin');
          return;
        } else {
          throw new Error('Incorrect email or password. Use admin / admin123 for preview.');
        }
      }

      // Query the custom app_admins table
      const { data: adminUser, error: fetchError } = await supabase
        .from('app_admins')
        .select('*')
        .eq('email', loginEmail)
        .single();

      if (fetchError || !adminUser) {
        throw new Error('Incorrect email or password. Please try again.');
      }

      // Verify hashed password
      const isPasswordValid = await bcrypt.compare(password, adminUser.password);
      if (!isPasswordValid) {
        throw new Error('Incorrect email or password. Please try again.');
      }

      if (adminUser.role === 'admin' || adminUser.role === 'staff' || adminUser.role === 'manager') {
        // Save session in localStorage (exclude password hash)
        const { password: _, ...sessionUser } = adminUser;
        localStorage.setItem('admin_session', JSON.stringify(sessionUser));
        setScreen('admin');
      } else {
        throw new Error('Unauthorized access. Staff only.');
      }
    } catch (err: any) {
      console.error('Admin login error:', err);
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900 p-6 justify-center">
      <div className="absolute top-12 left-6 z-20 flex flex-col gap-4">
        <button 
          onClick={() => setScreen('home')}
          className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="size-6" />
          <span className="text-sm font-bold">Back to Store</span>
        </button>
      </div>

      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 space-y-8 max-w-sm mx-auto w-full"
      >
        <div className="text-center space-y-3">
          <div className="size-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto border border-blue-200">
            <ShieldCheck className="size-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-slate-900">Staff Portal</h1>
          <p className="text-slate-500 text-sm">Enter your administrative credentials to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email or ID</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm text-slate-900 shadow-sm placeholder:text-slate-400"
                placeholder="admin@cokmoke.com or admin"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm text-slate-900 shadow-sm placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : <>Authenticate <ArrowRight className="size-5" /></>}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Authorized Personnel Only</p>
        </div>
      </motion.div>
    </div>
  );
}
