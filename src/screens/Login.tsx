import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, Github, Chrome, Loader2, ChevronLeft } from 'lucide-react';
import { Screen } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function Login({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!isSupabaseConfigured) {
        // Mock login for preview environment
        const mockUser = { id: 'mock-user-1', email: email.trim(), name: 'Guest User' };
        localStorage.setItem('user_session', JSON.stringify(mockUser));
        setScreen('home');
        return;
      }

      let { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      // Auto-signup for prototype convenience if user doesn't exist
      if (signInError && signInError.message.includes('Invalid login credentials')) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        
        if (signUpError) {
          throw signInError; // Throw original error if signup also fails
        }
        
        if (signUpData.user) {
          data = signUpData;
          signInError = null;
          
          if (!signUpData.session) {
            setError('Account created! Please check your email to verify, then log in.');
            setLoading(false);
            return;
          }
        }
      } else if (signInError) {
        throw signInError;
      }

      if (data.user) {
        // Auth state listener in App.tsx will handle the redirect
        setScreen('home');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.message.includes('Invalid login credentials')) {
        setError('Incorrect email or password. Please try again.');
      } else {
        setError(err.message || 'Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900 p-6 justify-center">
      <button 
        onClick={() => setScreen('home')}
        className="absolute top-12 left-6 z-20 text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
      >
        <ChevronLeft className="size-6" />
        <span className="text-sm font-bold">Back to Store</span>
      </button>

      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 space-y-8 max-w-sm mx-auto w-full"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-slate-900">Welcome Back<span className="text-blue-600">.</span></h1>
          <p className="text-slate-500">Sign in to access virtual try-on and your personalized style.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center font-bold">
              {error}
            </div>
          )}

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
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot Password?</button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : <>Sign In <ArrowRight className="size-5" /></>}
          </button>
        </form>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-4 text-xs text-slate-400 font-bold uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-700">
            <Chrome className="size-5" />
            <span className="text-sm font-bold">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-700">
            <Github className="size-5" />
            <span className="text-sm font-bold">GitHub</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-500">
          Don't have an account? <button onClick={() => setScreen('signup')} className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Sign Up</button>
        </p>

        <div className="pt-8 text-center">
          <button 
            onClick={() => setScreen('admin-login')}
            className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
          >
            Staff / Admin Portal
          </button>
        </div>
      </motion.div>
    </div>
  );
}
