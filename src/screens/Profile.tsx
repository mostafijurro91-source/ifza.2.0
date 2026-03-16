import React from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Edit2, PlusCircle, ShoppingBag, Heart, Ruler, CreditCard, ChevronRight, Home, Search, Sparkles, Bookmark, User, LogOut, ShieldCheck, MessageCircle, Wallet } from 'lucide-react';
import { Screen, UserProfile } from '../types';

export default function Profile({ setScreen, user, onLogout }: { setScreen: (s: Screen) => void, user: UserProfile, onLogout: () => void }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    name: user.name,
    phone: user.phone || '',
    address: user.address || ''
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my style on Cokmoke!',
          text: `I'm using Cokmoke to find my perfect fit. Join me!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      alert('Link copied to clipboard!');
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user context/backend
    setIsEditing(false);
    // You could add a success state here if needed
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
      <main className="flex-1 overflow-y-auto pb-24 no-scrollbar max-w-7xl mx-auto w-full md:grid md:grid-cols-2 md:gap-8 md:px-8 md:pt-8">
        <div className="md:col-span-1">
          <section className="p-6 flex flex-col items-center">
            <div className="relative">
              <div className="size-28 rounded-full border-4 border-white shadow-md p-1 bg-white">
                <div
                  className="size-full rounded-full bg-cover bg-center bg-slate-100"
                  style={user.isLoggedIn ? { backgroundImage: `url('${user.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}')` } : {}}
                >
                  {!user.isLoggedIn && <User className="size-full p-6 text-slate-400" />}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-slate-900 text-white size-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <Edit2 className="size-4" />
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight">{user.isLoggedIn ? user.name : 'Guest User'}</h2>
            <p className="text-slate-500 text-sm font-medium">{user.isLoggedIn ? 'Virtual Stylist & Fashion Enthusiast' : 'Sign in to sync your style'}</p>
            <div className="mt-6 flex w-full max-w-sm gap-3">
              {user.isLoggedIn ? (
                <>
                  <button onClick={() => setIsEditing(true)} className="flex-1 bg-slate-900 text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm hover:bg-slate-800 transition-colors">Edit Profile</button>
                  <button onClick={handleShare} className="flex-1 bg-white text-slate-900 font-semibold py-2.5 rounded-lg text-sm border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">Share Profile</button>
                </>
              ) : (
                <button
                  onClick={() => setScreen('login')}
                  className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl text-sm shadow-sm"
                >
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </section>

          <section className="px-4 py-2">
            <div className="grid grid-cols-3 gap-3">
              <StatCard value={user.isLoggedIn ? "0" : "0"} label="Orders" />
              <StatCard value={user.isLoggedIn ? "0" : "0"} label="Saved Looks" />
              <StatCard value={user.isLoggedIn ? "12" : "0"} label="Credits" />
            </div>
          </section>

          <section className="mt-8 px-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Baby Profile Manager</h3>
              <button onClick={() => setScreen('baby')} className="text-slate-600 text-sm font-semibold flex items-center gap-1 hover:text-slate-900">
                <PlusCircle className="size-4" /> Add Child
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              <BabyProfile
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuB_yDYkU8islqR3tT9_2XaJUWCdwUEaau_7tBmHek1YGaWtYQeg_zJzhwGkjP9B2ivfRymRQaVFxIz_h5ysD5FkfkWVucP0SVg9bRViTZJSw1_xOkk2sOMjtsl_uqMea1KYTr9J4tL1fxwRT13IlsYr-xTsQH2tmIpr-5CbPOzwWDBa_AIIwSt8Vv25rDOR3vk5BNQClnIsrDQmHB57VngFiw2g8z96B3ch1E4lsviqAodhyiF_zrT4Q1Cf94CFu9NOKi-qngaovYV5"
                name="Leo (2y)"
                active
              />
              <BabyProfile
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBnq0O_-5tefAVUohhhAOlP5yt3vWaY-4dUX-I_HT7ChG6oKb-RRFc6KGiUIq2ox0JwF2H5GbPPDZNa4GBCZ8cIpRNAA9y0ND_V7RiFv9StH8kFbAOy-mt4YHOeea85vZgOEnIDudjUSEN4yRzSJ8e2CQeNDz-otIGh5oe1aYLACLJcRUGNfESaEBYVHIXk7v5Z99JnlPkVCyeealkGaWg5KxsLRSaq76SGJdzweapm6F4X5ARmV6f_NpjxnOFLzm3TLSfjYu_8DlGm"
                name="Mia (6m)"
              />
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="size-16 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-white">
                  <PlusCircle className="size-6 text-slate-400" />
                </div>
                <span className="text-xs font-medium text-slate-500">New Profile</span>
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-1">
          <section className="mt-4 px-4 md:mt-0">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 overflow-hidden shadow-sm">
              <QuickLink icon={<ShoppingBag className="size-5" />} label="My Orders" onClick={() => setScreen('orders')} />
              <QuickLink icon={<Heart className="size-5" />} label="Saved Looks & Wishlist" onClick={() => setScreen('saved-looks')} />
              <QuickLink icon={<Ruler className="size-5" />} label="Measurements & Sizes" onClick={() => setScreen('measurements')} />
              <QuickLink icon={<CreditCard className="size-5" />} label="Payment Methods" onClick={() => setScreen('payment-methods')} />
              <QuickLink icon={<Wallet className="size-5 text-green-500" />} label="Financial Dashboard" onClick={() => setScreen('financial')} />
              <QuickLink icon={<ShieldCheck className="size-5 text-blue-500" />} label="Staff Portal (Admin Only)" onClick={() => setScreen('admin-login')} />
            </div>
          </section>

          <section className="mt-8 px-4 pb-12">
            {user.isLoggedIn ? (
              <button
                onClick={onLogout}
                className="w-full bg-white text-red-500 font-bold py-4 rounded-xl border border-slate-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                <LogOut className="size-5" />
                Log Out
              </button>
            ) : (
              <button
                onClick={() => setScreen('login')}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-sm active:scale-95 transition-all hover:bg-slate-800"
              >
                Sign In to Your Account
              </button>
            )}
            <p className="mt-4 text-center text-[10px] text-slate-600 font-medium tracking-widest uppercase">Cokmoke. v2.4.7 Build 2024</p>
          </section>
        </div>
      </main>

      {isEditing && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4"
          >
            <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mt-1 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Phone</label>
                <input
                  value={editForm.phone}
                  onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mt-1 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                <input
                  value={editForm.address}
                  onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 mt-1 text-slate-900 focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors">Cancel</button>
              <button onClick={handleSaveProfile} className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">Save Changes</button>
            </div>
          </motion.div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-8 pt-3 px-6 flex justify-between items-center z-50 md:hidden">
        <ProfileNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
        <ProfileNavItem icon={<Search className="size-5" />} label="Shop" />
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="bg-slate-900 p-2 rounded-full -mt-8 shadow-lg shadow-slate-900/20 ring-4 ring-white">
            <Sparkles className="size-8 text-white" />
          </div>
          <span className="text-[10px] font-semibold text-slate-900 uppercase tracking-tighter mt-1">Try-On</span>
        </div>
        <ProfileNavItem icon={<Bookmark className="size-5" />} label="Saved" />
        <ProfileNavItem icon={<User className="size-5" />} label="Profile" active />
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 right-0 h-full w-20 flex-col items-center justify-center gap-8 border-l border-slate-200 bg-white/95 backdrop-blur-xl z-50 py-8">
        <ProfileNavItem icon={<Home className="size-6" />} label="Home" onClick={() => setScreen('home')} />
        <ProfileNavItem icon={<Search className="size-6" />} label="Shop" />
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
            <Sparkles className="size-6" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Try-On</p>
        </div>
        <ProfileNavItem icon={<Bookmark className="size-6" />} label="Saved" />
        <ProfileNavItem icon={<User className="size-6" />} label="Profile" active />
      </nav>
    </div>
  );
}

function StatCard({ value, label }: { value: string, label: string }) {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-3 flex flex-col items-center justify-center">
      <span className="text-xl font-bold text-slate-900">{value}</span>
      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 text-center">{label}</span>
    </div>
  );
}

function BabyProfile({ image, name, active }: { image: string, name: string, active?: boolean }) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 group">
      <div className={`size-16 rounded-full border-2 p-0.5 ${active ? 'border-slate-900 ring-2 ring-slate-200' : 'border-slate-200'}`}>
        <div
          className={`size-full rounded-full bg-cover bg-center ${!active ? 'opacity-60 grayscale' : ''}`}
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
      </div>
      <span className={`text-xs font-semibold ${active ? 'text-slate-900' : 'text-slate-500'}`}>{name}</span>
    </div>
  );
}

function QuickLink({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="bg-slate-100 p-2 rounded-lg text-slate-600">
          {icon}
        </div>
        <span className="font-medium text-slate-900">{label}</span>
      </div>
      <ChevronRight className="size-5 text-slate-400" />
    </div>
  );
}

function ProfileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-slate-900' : 'text-slate-400'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-semibold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
