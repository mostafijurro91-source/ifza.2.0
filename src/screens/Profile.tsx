import React from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Edit2, PlusCircle, ShoppingBag, Heart, Ruler, CreditCard, ChevronRight, Home, Search, Sparkles, Bookmark, User, LogOut, ShieldCheck } from 'lucide-react';
import { Screen, UserProfile } from '../types';

export default function Profile({ setScreen, user, onLogout }: { setScreen: (s: Screen) => void, user: UserProfile, onLogout: () => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/10 md:hidden pb-safe">
        <div className="flex items-center p-4 justify-between">
          <div className="w-10">
            <Settings className="text-primary size-6 cursor-pointer" />
          </div>
          <h1 className="text-lg font-black italic tracking-tighter uppercase">Profile</h1>
          <div className="w-10 flex justify-end">
            <Bell className="text-primary size-6 cursor-pointer" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-6 md:pt-16 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Left Column: User Header & Stats */}
          <section className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative group">
              <div className="size-32 md:size-48 rounded-[3rem] border-4 border-primary p-1.5 rotate-3 transition-transform group-hover:rotate-0 group-hover:scale-105 duration-500">
                <div
                  className="size-full rounded-[2.5rem] bg-cover bg-center bg-slate-800 overflow-hidden"
                  style={user.isLoggedIn ? { backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8QgCHDHy6RFIdPqh6PK0tdYrX2oBadXlq3k1wBbWDd_bYt4-OiC95qV1kVfcgXePH7MqZZpgyJO-QR3Sr2LYxZCfYOdiQTOYXXCoHuw0EoHBBqKyy0_JztiuYVxa_p0S5MXzSBa7J0FxwWrGyKAZu8UzurbITlc1eY39f9V9vPe_EAcubz2m6DWQwougPeMqtRsMFSGqTKJsvg-4aAc6Ze0IcXuvVd69VYun_i6g1r0jNXCbigV8_ZH7O_2f3Hl7EsSNqiLSGn0-P')` } : {}}
                >
                  {!user.isLoggedIn && <User className="size-full p-8 text-slate-700" />}
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 bg-primary text-white size-10 md:size-12 rounded-2xl flex items-center justify-center border-4 border-background-light dark:border-background-dark shadow-xl hover:scale-110 transition-transform">
                <Edit2 className="size-5" />
              </button>
            </div>

            <div className="mt-8 text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">{user.isLoggedIn ? user.name : 'Guest Fashionista'}</h2>
              <p className="mt-2 text-primary text-xs md:text-sm font-black uppercase tracking-[0.3em]">
                {user.isLoggedIn ? 'AI Style Enthusiast • Silver Member' : 'Sign in to access virtual try-on'}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 w-full">
              <StatCard value={user.isLoggedIn ? "24" : "0"} label="Orders" />
              <StatCard value={user.isLoggedIn ? "82" : "0"} label="Looks" />
              <StatCard value={user.isLoggedIn ? "1.2k" : "0"} label="Points" />
            </div>

            <div className="mt-8 flex w-full gap-4">
              {user.isLoggedIn ? (
                <>
                  <button className="flex-1 bg-primary text-white font-black uppercase tracking-widest py-4 rounded-2xl text-xs shadow-2xl shadow-primary/20 hover:bg-orange-600 transition-colors">Edit Profile</button>
                  <button className="flex-1 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-black uppercase tracking-widest py-4 rounded-2xl text-xs border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">Settings</button>
                </>
              ) : (
                <button
                  onClick={() => setScreen('login')}
                  className="w-full bg-primary text-white font-black uppercase tracking-widest py-5 rounded-2xl text-sm shadow-2xl shadow-primary/20 neon-glow"
                >
                  Join the Future of Fashion
                </button>
              )}
            </div>
          </section>

          {/* Right Column: Baby Manager & Quick Links */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <section className="bg-primary/5 rounded-[3rem] p-8 border border-primary/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Child Profiles</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Manage virtual sizing for your kids</p>
                </div>
                <button onClick={() => setScreen('baby')} className="bg-primary/20 text-primary p-2 rounded-xl hover:scale-110 transition-transform">
                  <PlusCircle className="size-6" />
                </button>
              </div>

              <div className="flex flex-wrap gap-8">
                <BabyProfile
                  image="https://lh3.googleusercontent.com/aida-public/AB6AXuB_yDYkU8islqR3tT9_2XaJUWCdwUEaau_7tBmHek1YGaWtYQeg_zJzhwGkjP9B2ivfRymRQaVFxIz_h5ysD5FkfkWVucP0SVg9bRViTZJSw1_xOkk2sOMjtsl_uqMea1KYTr9J4tL1fxwRT13IlsYr-xTsQH2tmIpr-5CbPOzwWDBa_AIIwSt8Vv25rDOR3vk5BNQClnIsrDQmHB57VngFiw2g8z96B3ch1E4lsviqAodhyiF_zrT4Q1Cf94CFu9NOKi-qngaovYV5"
                  name="Leo (2y)"
                  active
                />
                <BabyProfile
                  image="https://lh3.googleusercontent.com/aida-public/AB6AXuBnq0O_-5tefAVUohhhAOlP5yt3vWaY-4dUX-I_HT7ChG6oKb-RRFc6KGiUIq2ox0JwF2H5GbPPDZNa4GBCZ8cIpRNAA9y0ND_V7RiFv9StH8kFbAOy-mt4YHOeea85vZgOEnIDudjUSEN4yRzSJ8e2CQeNDz-otIGh5oe1aYLACLJcRUGNfESaEBYVHIXk7v5Z99JnlPkVCyeealkGaWg5KxsLRSaq76SGJdzweapm6F4X5ARmV6f_NpjxnOFLzm3TLSfjYu_8DlGm"
                  name="Mia (6m)"
                />
                <button
                  onClick={() => setScreen('baby')}
                  className="size-20 rounded-[2rem] border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-1 hover:border-primary/50 transition-colors"
                >
                  <PlusCircle className="size-6 text-primary" />
                  <span className="text-[8px] font-black uppercase text-primary">Add</span>
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-6 px-2">Account Hub</h3>
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-xl">
                <QuickLink icon={<ShoppingBag className="size-5" />} label="Recent Orders" onClick={() => setScreen('orders')} />
                <QuickLink icon={<Heart className="size-5" />} label="Virtual Closet" />
                <QuickLink icon={<Ruler className="size-5" />} label="Size Preferences" />
                <QuickLink icon={<ShieldCheck className="size-5 text-accent-blue" />} label="Admin Dashboard" onClick={() => setScreen('admin-login')} />
              </div>
            </section>

            {user.isLoggedIn && (
              <button
                onClick={onLogout}
                className="w-full bg-red-500/10 text-red-500 font-black uppercase tracking-widest py-5 rounded-[2rem] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <LogOut className="size-5" />
                Sign Out Securely
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Footer */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 pb-8 pt-4 px-8 flex justify-between items-center z-50 md:hidden">
        <ProfileNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
        <ProfileNavItem icon={<Search className="size-5" />} label="Explore" />
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="bg-primary p-2.5 rounded-2xl -mt-10 shadow-2xl shadow-primary/50 ring-4 ring-background-light dark:ring-background-dark">
            <Sparkles className="size-7 text-white" />
          </div>
          <span className="text-[9px] font-black text-primary uppercase tracking-tighter mt-1">Try-On</span>
        </div>
        <ProfileNavItem icon={<Bookmark className="size-5" />} label="Saved" />
        <ProfileNavItem icon={<User className="size-5" />} label="Me" active />
      </nav>
    </div>
  );
}

function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-4 flex flex-col items-center justify-center hover:bg-primary/10 transition-colors cursor-default">
      <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-primary">{value}</span>
      <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-500 dark:text-slate-400 text-center mt-1">{label}</span>
    </div>
  );
}

function BabyProfile({ image, name, active }: { image: string, name: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div className={`size-20 rounded-[2rem] border-2 p-1 transition-all duration-300 ${active ? 'border-primary shadow-xl shadow-primary/20 scale-110' : 'border-slate-800 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'}`}>
        <div
          className="size-full rounded-[1.7rem] bg-cover bg-center"
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-slate-500'}`}>{name}</span>
    </div>
  );
}

function QuickLink({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div className="flex items-center justify-between p-6 hover:bg-primary/10 transition-all cursor-pointer group" onClick={onClick}>
      <div className="flex items-center gap-5">
        <div className="bg-primary/20 p-3 rounded-2xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          {icon}
        </div>
        <span className="font-black italic tracking-tighter uppercase text-lg">{label}</span>
      </div>
      <ChevronRight className="size-6 text-slate-700 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </div>
  );
}

function ProfileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer transition-colors ${active ? 'text-primary font-black scale-110' : 'text-slate-500 hover:text-white'}`} onClick={onClick}>
      {icon}
      <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
    </div>
  );
}
