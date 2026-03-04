import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, BarChart3, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Calendar, ArrowUpRight, ArrowDownRight, LayoutDashboard, Package, ReceiptText, Megaphone } from 'lucide-react';
import { Screen } from '../types';

export default function AdminAnalytics({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Monthly' | 'Yearly'>('Monthly');

  return (
    <div className="min-h-screen bg-background-light dark:bg-[#0a0a0f] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <header className="p-4 flex items-center gap-4 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md z-10">
        <button onClick={() => setScreen('admin')} className="size-10 flex items-center justify-center bg-white/5 rounded-xl">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold">Sales Analytics</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-2xl">
          {['Daily', 'Monthly', 'Yearly'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t as any)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${timeframe === t ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            label="Total Revenue"
            value={timeframe === 'Daily' ? '৳1,240' : timeframe === 'Monthly' ? '৳45,230' : '৳542,800'}
            trend="+12.5%"
            up
            icon={<DollarSign className="size-4" />}
          />
          <MetricCard
            label="Total Orders"
            value={timeframe === 'Daily' ? '12' : timeframe === 'Monthly' ? '1,240' : '14,500'}
            trend="+8.2%"
            up
            icon={<ShoppingBag className="size-4" />}
          />
          <MetricCard
            label="New Customers"
            value={timeframe === 'Daily' ? '5' : timeframe === 'Monthly' ? '156' : '1,840'}
            trend="-2.1%"
            up={false}
            icon={<Users className="size-4" />}
          />
          <MetricCard
            label="Avg. Order Value"
            value="৳128.40"
            trend="+4.4%"
            up
            icon={<TrendingUp className="size-4" />}
          />
        </div>

        <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-sm font-bold">Revenue Growth</h3>
              <p className="text-[10px] text-slate-500 mt-1">Comparison with previous {timeframe.toLowerCase()}</p>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <ArrowUpRight className="size-4" />
              <span className="text-xs font-bold">+18.4%</span>
            </div>
          </div>

          <div className="h-48 flex items-end justify-between gap-3">
            {[40, 60, 45, 80, 100, 70, 90, 55, 75, 85, 65, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className={`w-full rounded-t-lg transition-all duration-300 ${i === 4 ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-blue-600/20'}`}
                ></motion.div>
                <span className="text-[6px] text-slate-600 font-bold uppercase">
                  {timeframe === 'Daily' ? `${i * 2}h` : timeframe === 'Monthly' ? `W${(i % 4) + 1}` : ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="text-sm font-bold mb-6">Top Performing Categories</h3>
          <div className="space-y-4">
            <CategoryProgress label="Baby Clothing" percentage={65} color="bg-blue-500" />
            <CategoryProgress label="Toys & Games" percentage={45} color="bg-purple-500" />
            <CategoryProgress label="Baby Care" percentage={30} color="bg-emerald-500" />
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#0a0a0f]/95 border-t border-slate-200 dark:border-white/5 pb-8 pt-3 px-6 flex justify-between items-center z-50 transition-colors duration-300">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-5 text-blue-500" />} label="Analytics" active onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-5" />} label="Marketing" onClick={() => setScreen('admin-marketing')} />
      </nav>
    </div>
  );
}

function AdminNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-blue-500' : 'text-slate-500'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}

function MetricCard({ label, value, trend, up, icon }: { label: string, value: string, trend: string, up: boolean, icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 space-y-3 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="size-8 bg-white/5 rounded-lg flex items-center justify-center text-slate-400">
          {icon}
        </div>
        <div className={`flex items-center gap-0.5 text-[10px] font-bold ${up ? 'text-green-400' : 'text-red-400'}`}>
          {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</p>
        <h4 className="text-xl font-bold mt-1">{value}</h4>
      </div>
    </div>
  );
}

function CategoryProgress({ label, percentage, color }: { label: string, percentage: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-900 dark:text-white">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}
