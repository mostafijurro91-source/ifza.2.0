import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Plus, TrendingUp, ShoppingBag, Clock, DollarSign, 
  LayoutDashboard, Package, ReceiptText, BarChart3, Settings, 
  Bell, LogOut, ShieldCheck, Megaphone, FolderOpen, Database, 
  Users, MessageSquare, ChevronRight, ChevronDown, ArrowUpRight, ArrowDownRight,
  Menu, X, Calendar, User, CreditCard
} from 'lucide-react';
import { Screen } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminDashboard({ setScreen, onLogout }: { setScreen: (s: Screen) => void, onLogout: () => void }) {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error' | 'mock'>('checking');
  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const checkDb = async () => {
      if (!isSupabaseConfigured) {
        setDbStatus('mock');
        return;
      }
      const { error } = await supabase.from('catalogs').select('count', { count: 'exact', head: true });
      setDbStatus(error ? 'error' : 'connected');
    };
    checkDb();
  }, []);

  const menuItems = [
    { id: 'admin', label: 'ওভারভিউ', icon: <LayoutDashboard size={20} />, screen: 'admin' },
    { id: 'admin-inventory', label: 'ইনভেন্টরি', icon: <Package size={20} />, screen: 'admin-inventory' },
    { id: 'admin-orders', label: 'অর্ডারসমূহ', icon: <ReceiptText size={20} />, screen: 'admin-orders' },
    { id: 'admin-catalogs', label: 'ক্যাটালগ', icon: <FolderOpen size={20} />, screen: 'admin-catalogs' },
    { id: 'admin-staff', label: 'স্টাফ ম্যানেজমেন্ট', icon: <Users size={20} />, screen: 'admin-staff' },
    { id: 'admin-marketing', label: 'মার্কেটিন', icon: <Megaphone size={20} />, screen: 'admin-marketing' },
    { id: 'admin-analytics', label: 'অ্যানালিটিক্স', icon: <BarChart3 size={20} />, screen: 'admin-analytics' },
    { id: 'admin-messages', label: 'মেসেজ', icon: <MessageSquare size={20} />, screen: 'admin-messages' },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 z-50`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50 mb-4">
          <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
            <ShieldCheck className="size-6 text-white" />
          </div>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col min-w-0"
            >
              <h1 className="text-xl font-black text-white leading-none tracking-tight truncate">Cokmoke</h1>
              <p className="text-[10px] text-blue-400 font-bold uppercase mt-1">ভেরিফাইড অ্যাডমিন</p>
            </motion.div>
          )}
        </div>

        <div className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.screen as Screen)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all group ${
                item.screen === 'admin' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`${item.screen === 'admin' ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                {item.icon}
              </span>
              {isSidebarOpen && <span className="text-sm truncate">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800/50">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all group"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-medium">লগ আউট</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 hidden md:block"
            >
              <Menu size={20} />
            </button>
            <div className="relative hidden lg:block w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all outline-none" 
                placeholder="অর্ডার, পণ্য বা গ্রাহক খুঁজুন..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                <div className={`size-1.5 rounded-full ${dbStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                {dbStatus === 'connected' ? 'সার্ভার সচল' : 'চেকিং...'}
              </span>
            </div>
            
            <button className="relative p-2.5 hover:bg-slate-50 rounded-xl text-slate-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            <div className="h-8 w-px bg-slate-200 mx-1" />
            
            <div className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors group">
              <div className="size-9 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold shadow-sm">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-slate-900 leading-none">অ্যাডমিন ইউজার</p>
                <p className="text-[10px] text-slate-500 mt-1">সুপার অ্যাডমিন</p>
              </div>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#F8FAFC]">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">ড্যাশবোর্ড ওভারভিউ</h2>
              <p className="text-sm text-slate-500 mt-1">স্বাগতম! আজকের ব্যবসার আপডেটগুলো নিচে দেখে নিন।</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
                <Calendar size={16} /> আজ: ১৭ মার্চ
              </button>
              <button 
                onClick={() => setScreen('add-product')}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95"
              >
                <Plus size={18} /> নতুন পণ্য যোগ
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="মোট বিক্রয়" 
              value="৳৪৫,২৩০" 
              change="+১২.৫%" 
              isUp={true}
              icon={<DollarSign className="size-6 text-blue-600" />}
              color="blue"
            />
            <StatCard 
              label="মোট অর্ডার" 
              value="১,২৪০" 
              change="+৮.২%" 
              isUp={true}
              icon={<ShoppingBag className="size-6 text-emerald-600" />}
              color="emerald"
            />
            <StatCard 
              label="পেন্ডিং শিপমেন্ট" 
              value="৪৫" 
              change="-৫.১%" 
              isUp={false}
              icon={<Clock className="size-6 text-orange-600" />}
              color="orange"
            />
            <StatCard 
              label="অ্যাক্টিভ গ্রাহক" 
              value="১১,৪০০" 
              change="+১০.৪%" 
              isUp={true}
              icon={<User className="size-6 text-purple-600" />}
              color="purple"
            />
          </div>

          {/* Charts & Secondary Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Sales Chart */}
            <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">বিক্রয় পরিসংখ্যান</h3>
                  <p className="text-sm text-slate-500 mt-1">সাপ্তাহিক আপডেট</p>
                </div>
                <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white shadow-sm text-slate-900 transition-all">সাপ্তাহিক</button>
                  <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-400 hover:text-slate-600 transition-all">মাসিক</button>
                </div>
              </div>
              
              <div className="flex-1 min-h-[250px] flex items-end justify-between gap-4 pt-10">
                {[40, 65, 50, 85, 95, 70, 60].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-3 group relative h-full justify-end">
                    <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="px-2 py-1 bg-slate-900 text-white text-[10px] font-bold rounded shadow-xl">৳{(h * 100).toLocaleString()}</span>
                    </div>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className={`w-full max-w-[40px] rounded-2xl transition-all duration-500 relative overflow-hidden group-hover:scale-x-110 ${
                        i === 4 ? 'bg-gradient-to-t from-blue-700 to-blue-400 shadow-xl shadow-blue-500/30' : 'bg-slate-100 group-hover:bg-blue-100'
                      }`}
                    >
                      {i === 4 && <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:50px_50px] animate-[shimmer_2s_infinite_linear]" />}
                    </motion.div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      {['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions & Tasks */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-5 leading-tight">দ্রুত অ্যাকশন</h3>
                <div className="grid grid-cols-2 gap-3">
                  <QuickActionBtn 
                    icon={<Package className="size-5" />} 
                    label="স্টক চেক" 
                    onClick={() => setScreen('admin-inventory')}
                    color="blue"
                  />
                  <QuickActionBtn 
                    icon={<ReceiptText className="size-5" />} 
                    label="অর্ডার দেখুন" 
                    onClick={() => setScreen('admin-orders')}
                    color="emerald"
                  />
                  <QuickActionBtn 
                    icon={<CreditCard className="size-5" />} 
                    label="লেনদেন" 
                    onClick={() => {}}
                    color="purple"
                  />
                  <QuickActionBtn 
                    icon={<Settings className="size-5" />} 
                    label="সেটিংস" 
                    onClick={() => {
                        setShowNotification(true);
                        setTimeout(() => setShowNotification(false), 3000);
                    }}
                    color="slate"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
                  <Database size={120} />
                </div>
                <h3 className="text-lg font-bold mb-2">ডাটাবেজ স্ট্যাটাস</h3>
                <p className="text-blue-100 text-xs mb-6 max-w-[180px] leading-relaxed">অটোম্যাটিক ব্যাকআপ এনাবল করা আছে। গত ১২ ঘণ্টায় কোনো সমস্যা পাওয়া যায়নি।</p>
                <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold transition-all border border-white/10">
                  অ্যানালাইটিক্স রিপোর্ট দেখুন
                </button>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">সাম্প্রতিক অর্ডার</h3>
                <p className="text-sm text-slate-500 mt-1">সর্বশেষ ১০টি লেনদেন</p>
              </div>
              <button 
                onClick={() => setScreen('admin-orders')}
                className="px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
              >
                সব দেখুন <ChevronRight size={14} className="inline ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-500 uppercase">অর্ডার আইডি</th>
                    <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-500 uppercase">গ্রাহক</th>
                    <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-500 uppercase">মূল্য</th>
                    <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-500 uppercase">অবস্থা</th>
                    <th className="px-6 py-4 text-[10px] font-black tracking-widest text-slate-500 uppercase text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: '#ORD-2849', name: 'মোঃ রহিম আলী', price: '৳১২৯.০০', status: 'PAID', time: '২ মিনিট আগে' },
                    { id: '#ORD-2848', name: 'সারা আহমেদ', price: '৳৮৫.৫০', status: 'PENDING', time: '১৫ মিনিট আগে' },
                    { id: '#ORD-2847', name: 'করিম হোসেন', price: '৳৩২০.০০', status: 'DELIVERED', time: '১ ঘণ্টা আগে' },
                    { id: '#ORD-2846', name: 'নুসরাত জাহান', price: '৳১২০.০০', status: 'PAID', time: '৩ ঘণ্টা আগে' },
                  ].map((order, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900">{order.id}</span>
                        <p className="text-[10px] text-slate-400 mt-1">{order.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                            {order.name[0]}
                          </div>
                          <span className="text-sm font-medium text-slate-700">{order.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-black text-slate-900 tracking-tight">{order.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest shadow-sm ${
                          order.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 
                          order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Sidebar Toggle - Mobile Only */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 size-14 bg-blue-600 text-white rounded-full shadow-2xl flex md:hidden items-center justify-center z-50 animate-bounce active:scale-90 transition-all"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="w-72 h-full bg-slate-900 p-6 flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="size-8 text-blue-600" />
                    <h1 className="text-xl font-black text-white leading-none">Cokmoke</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setScreen(item.screen as Screen);
                            setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all ${
                        item.screen === 'admin' 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {item.icon}
                        <span className="text-sm">{item.label}</span>
                    </button>
                ))}
              </div>

              <button 
                onClick={onLogout}
                className="mt-6 flex items-center gap-4 px-4 py-4 rounded-xl text-slate-400 font-bold border border-slate-800"
              >
                <LogOut size={20} />
                <span className="text-sm">লগ আউট</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-max max-w-[90vw]"
          >
            <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
              <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <Settings className="size-5" />
              </div>
              <div>
                <p className="font-bold text-sm">সেটিংস অপশন শীঘ্রই আসছে!</p>
                <p className="text-[10px] text-slate-400 mt-0.5">আমরা ফিচারটি নিয়ে কাজ করছি।</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ label, value, change, isUp, icon, color }: { label: string, value: string, change: string, isUp: boolean, icon: React.ReactNode, color: string }) {
  const colorMap: any = {
    blue: 'from-blue-500/10 to-blue-500/0 text-blue-600 ring-blue-500/20',
    emerald: 'from-emerald-500/10 to-emerald-500/0 text-emerald-600 ring-emerald-500/20',
    orange: 'from-orange-500/10 to-orange-500/0 text-orange-600 ring-orange-500/20',
    purple: 'from-purple-500/10 to-purple-500/0 text-purple-600 ring-purple-500/20',
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors group-hover:shadow-sm`}>
          {icon}
        </div>
        <div className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-black tracking-tight ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <h4 className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight group-hover:translate-x-1 transition-transform">{value}</h4>
      </div>
    </div>
  );
}

function QuickActionBtn({ icon, label, onClick, color }: { icon: React.ReactNode, label: string, onClick?: () => void, color: string }) {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white',
    slate: 'bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white',
  };

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-3 p-4 rounded-2xl transition-all border border-slate-100 hover:shadow-lg active:scale-95 ${colorMap[color] || colorMap.blue}`}
    >
      <div className="shrink-0">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-tight">{label}</span>
    </button>
  );
}
