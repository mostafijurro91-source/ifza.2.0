import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, TrendingUp, ShoppingBag, Clock, DollarSign, LayoutDashboard, Package, ReceiptText, BarChart3, Settings, Bell, ChevronUp, ChevronDown, LogOut, ShieldCheck, Megaphone, FolderOpen, Database, Users, MessageSquare } from 'lucide-react';
import { Screen } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminDashboard({ setScreen, onLogout }: { setScreen: (s: Screen) => void, onLogout: () => void }) {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error' | 'mock'>('checking');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkDb = async () => {
      if (!isSupabaseConfigured) {
        setDbStatus('mock');
        return;
      }
      const { error } = await supabase.from('catalogs').select('count', { count: 'exact', head: true });
      if (error) {
        setDbStatus('error');
      } else {
        setDbStatus('connected');
      }
    };
    checkDb();
  }, []);

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-slate-50 text-slate-900 overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20">
            <ShieldCheck className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black leading-none tracking-tighter text-slate-900">Cokmoke<span className="text-blue-600">.</span>admin</h1>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-tighter">Authorized Staff</p>
              <span className="text-slate-400">•</span>
              <div className="flex items-center gap-1">
                <Database className={`size-3 ${dbStatus === 'connected' ? 'text-emerald-500' : dbStatus === 'mock' ? 'text-blue-500' : dbStatus === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
                <span className={`text-[10px] font-bold uppercase ${dbStatus === 'connected' ? 'text-emerald-500' : dbStatus === 'mock' ? 'text-blue-500' : dbStatus === 'error' ? 'text-red-500' : 'text-amber-500'}`}>
                  {dbStatus === 'connected' ? 'DB Connected' : dbStatus === 'mock' ? 'Mock Mode' : dbStatus === 'error' ? 'DB Error' : 'Checking DB...'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm">
            <Bell className="size-5 text-slate-600" />
          </button>
          <button 
            onClick={onLogout}
            className="size-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-red-50 transition-colors text-red-500 shadow-sm"
          >
            <LogOut className="size-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-8 pb-24 max-w-7xl mx-auto w-full">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input 
              className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-blue-500 transition-colors shadow-sm placeholder:text-slate-400" 
              placeholder="Search orders, products..."
            />
          </div>
          <button 
            onClick={() => setScreen('add-product')}
            className="size-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="size-6" />
          </button>
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Performance Snapshot</p>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Live Updates</span>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard 
              label="Total Revenue" 
              value="৳45,230" 
              trend="+ 12.5%" 
              trendUp 
              icon={<DollarSign className="size-4 text-blue-500" />} 
            />
            <StatCard 
              label="Active Orders" 
              value="1,240" 
              trend="+ 8.2%" 
              trendUp 
              icon={<ShoppingBag className="size-4 text-blue-500" />} 
            />
            <StatCard 
              label="Pending Tasks" 
              value="45" 
              trend="- 5.1%" 
              trendUp={false} 
              icon={<Clock className="size-4 text-orange-500" />} 
            />
            <StatCard 
              label="Avg. Order" 
              value="৳128.40" 
              trend="+ 10.4%" 
              trendUp 
              icon={<TrendingUp className="size-4 text-blue-500" />} 
            />
          </div>
        </section>

        <div className="md:grid md:grid-cols-2 md:gap-8">
          <section className="bg-white border border-slate-200 rounded-2xl p-5 mb-8 md:mb-0 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-900">Sales Analytics</h3>
              <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-200">
                <button className="px-3 py-1 text-[10px] font-bold rounded-md bg-white shadow-sm text-slate-900">Weekly</button>
                <button className="px-3 py-1 text-[10px] font-bold rounded-md text-slate-500">Monthly</button>
              </div>
            </div>
            <div className="h-40 flex items-end justify-between gap-2.5">
              {[40, 60, 50, 80, 100, 70, 60].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`w-full rounded-t-md transition-all duration-300 ${i === 4 ? 'bg-blue-600 shadow-md shadow-blue-600/20' : 'bg-blue-100'}`} 
                  ></motion.div>
                  <span className="text-[8px] text-slate-500 font-bold uppercase">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              <button onClick={() => setScreen('admin-orders')} className="text-[10px] font-bold text-blue-600 uppercase tracking-widest cursor-pointer hover:text-blue-700">View All</button>
            </div>
            <div className="space-y-3">
              <RecentOrder 
                id="#ORD-2849" 
                customer="Alex Johnson" 
                time="2 mins ago" 
                price="৳129.00" 
                status="PAID" 
                statusColor="text-green-400" 
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuB_yDYkU8islqR3tT9_2XaJUWCdwUEaau_7tBmHek1YGaWtYQeg_zJzhwGkjP9B2ivfRymRQaVFxIz_h5ysD5FkfkWVucP0SVg9bRViTZJSw1_xOkk2sOMjtsl_uqMea1KYTr9J4tL1fxwRT13IlsYr-xTsQH2tmIpr-5CbPOzwWDBa_AIIwSt8Vv25rDOR3vk5BNQClnIsrDQmHB57VngFiw2g8z96B3ch1E4lsviqAodhyiF_zrT4Q1Cf94CFu9NOKi-qngaovYV5"
              />
              <RecentOrder 
                id="#ORD-2848" 
                customer="Sarah Williams" 
                time="15 mins ago" 
                price="৳85.50" 
                status="PENDING" 
                statusColor="text-orange-400" 
                image="https://lh3.googleusercontent.com/aida-public/AB6AXuBAE9o5SqpRRXgdza-IVbBbb-EVDJCdy69VyaEhz6DEQoEC_6sQCwpfMRvlelOqGX9bwPDNM01RvQ0V6KSBFmtG8k6i8osLcvWCZGArvxEGpU-32YEaeAKCeQ4-P3JoHZYfH7Fl13GZ381YazzSp5hLjy_Zd3oOVSdo9rbxhLlNITsVJT9LJ91pLin5jPROSiZU_lSAs-845TxE_Ly1Eppa6RQA-eEICWwRPhxUor2lh8CovMAXYyKz62YtKi0lm3X_lYxFL8sE_-hg"
              />
            </div>
          </section>
        </div>

        <section>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Management Tools</p>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-6">
            <ActionCard icon={<Package className="size-6" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
            <ActionCard icon={<FolderOpen className="size-6" />} label="Catalogs" onClick={() => setScreen('admin-catalogs')} />
            <ActionCard icon={<ReceiptText className="size-6" />} label="Shipments" onClick={() => setScreen('admin-orders')} />
            <ActionCard icon={<Users className="size-6" />} label="Staff" onClick={() => setScreen('admin-staff')} />
            <ActionCard icon={<Megaphone className="size-6" />} label="Marketing" onClick={() => setScreen('admin-marketing')} />
            <ActionCard icon={<BarChart3 className="size-6" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
            <ActionCard 
              icon={<Settings className="size-6" />} 
              label="Settings" 
              onClick={() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(null), 3000);
              }}
            />
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-8 pt-3 px-6 flex justify-between items-center z-50 md:hidden">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" active onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<MessageSquare className="size-5" />} label="Messages" onClick={() => setScreen('admin-messages')} />
        <AdminNavItem icon={<BarChart3 className="size-5" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 right-0 h-full w-20 flex-col items-center justify-center gap-8 border-l border-slate-200 bg-white/95 backdrop-blur-xl z-50 py-8">
        <AdminNavItem icon={<LayoutDashboard className="size-6" />} label="Overview" active onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-6" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-6" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<MessageSquare className="size-6" />} label="Messages" onClick={() => setScreen('admin-messages')} />
        <AdminNavItem icon={<BarChart3 className="size-6" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
      </nav>

      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 z-[100] md:left-auto md:right-8 md:bottom-8 md:w-72"
          >
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl border border-slate-800">
              <Settings className="size-5 text-blue-400" />
              <p className="font-bold text-sm tracking-tight">Settings coming soon!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, trend, trendUp, icon }: { label: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-3">
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        {icon}
      </div>
      <div>
        <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
        <div className={`flex items-center gap-1 text-[10px] font-bold mt-1 ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
          {trendUp ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
          {trend}
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex-none w-28 aspect-square bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
    >
      <div className="size-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-center px-2 text-slate-700">{label}</span>
    </div>
  );
}

function RecentOrder({ id, customer, time, price, status, statusColor, image }: { id: string, customer: string, time: string, price: string, status: string, statusColor: string, image: string }) {
  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex items-center gap-4">
      <div className="size-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
        <img src={image} alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-bold text-slate-900">{id}</p>
          <p className="font-bold text-slate-900">{price}</p>
        </div>
        <div className="flex justify-between items-end mt-1">
          <p className="text-xs text-slate-500">{customer} • {time}</p>
          <span className={`text-[10px] font-black tracking-widest ${statusColor}`}>{status}</span>
        </div>
      </div>
    </div>
  );
}

function AdminNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
