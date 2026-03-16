import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, ChevronLeft, Phone, MapPin, Loader2 } from 'lucide-react';
import { Screen } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function Signup({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!isSupabaseConfigured) {
        // Mock signup for preview environment
        const mockUser = { id: 'mock-user-1', email: email.trim(), name: name.trim() };
        localStorage.setItem('user_session', JSON.stringify(mockUser));
        setScreen('home');
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
            address: address
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Profile creation is handled by database trigger, but we can manually update if needed
        // For now, just redirect to login or home
        alert('Signup successful! Please check your email for verification.');
        setScreen('login');
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900 p-6 justify-center">
      <button 
        onClick={() => setScreen('login')}
        className="absolute top-12 left-6 text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ChevronLeft className="size-8" />
      </button>

      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 space-y-8 max-w-sm mx-auto w-full"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Join Cokmoke<span className="text-blue-600">.</span></h1>
          <p className="text-slate-500">Create an account to start your virtual fashion journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center font-bold">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm text-slate-900 shadow-sm placeholder:text-slate-400"
                placeholder="Elena Rossi"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm text-slate-900 shadow-sm placeholder:text-slate-400"
                placeholder="+880 1..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm text-slate-900 shadow-sm placeholder:text-slate-400"
                placeholder="House, Road, Area..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm text-slate-900 shadow-sm placeholder:text-slate-400"
                placeholder="hello@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input 
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-blue-500 transition-colors text-sm text-slate-900 shadow-sm placeholder:text-slate-400"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed">
            By signing up, you agree to our <span className="text-blue-600 font-bold">Terms of Service</span> and <span className="text-blue-600 font-bold">Privacy Policy</span>.
          </p>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : <>Create Account <ArrowRight className="size-5" /></>}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Already have an account? <button onClick={() => setScreen('login')} className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Sign In</button>
        </p>
      </motion.div>
    </div>
  );
}
