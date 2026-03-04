import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Plus, Megaphone, Tag, Image as ImageIcon, Trash2, Edit3, Sparkles, Clock, CheckCircle2, AlertCircle, X, LayoutDashboard, Package, ReceiptText, BarChart3 } from 'lucide-react';
import { Screen } from '../types';

const INITIAL_OFFERS = [
  { id: '1', title: 'Eid Mega Sale', discount: '30%', status: 'ACTIVE', type: 'PROMO', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=200' },
  { id: '2', title: 'Pohela Boishakh Offer', discount: '15%', status: 'ACTIVE', type: 'OFFER', image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=200' },
  { id: '3', title: 'Winter Clearance', discount: '50%', status: 'EXPIRED', type: 'AD', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200' },
];

export default function AdminMarketing({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [offers, setOffers] = useState(INITIAL_OFFERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({ title: '', discount: '', type: 'PROMO' });

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    const offer = {
      id: Math.random().toString(36).substr(2, 9),
      ...newOffer,
      status: 'ACTIVE',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=200'
    };
    setOffers([offer, ...offers]);
    setIsModalOpen(false);
    setNewOffer({ title: '', discount: '', type: 'PROMO' });
  };

  const deleteOffer = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-[#0a0a0f] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <header className="p-4 flex items-center gap-4 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md z-10">
        <button onClick={() => setScreen('admin')} className="size-10 flex items-center justify-center bg-white/5 rounded-xl">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold">Marketing & Offers</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-all"
          >
            <Tag className="size-6 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">New Offer</span>
          </button>
          <button className="flex-1 bg-purple-600/10 border border-purple-500/20 p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-all">
            <Megaphone className="size-6 text-purple-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">New Ad</span>
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Active Promotions</p>
          <div className="grid gap-4">
            {offers.map(offer => (
              <motion.div
                layout
                key={offer.id}
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm"
              >
                <div className="relative h-32 w-full">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0f] to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest ${offer.status === 'ACTIVE' ? 'text-green-400 bg-green-400/10' : 'text-slate-500 bg-white/5'
                      }`}>
                      {offer.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded uppercase mb-1 inline-block">
                      {offer.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{offer.title}</h3>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500">
                      <Sparkles className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{offer.discount} Discount</p>
                      <p className="text-[10px] text-slate-500">Applied at checkout</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Edit3 className="size-4" /></button>
                    <button
                      onClick={() => deleteOffer(offer.id)}
                      className="p-2 bg-white/5 rounded-lg text-red-500/50 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden"
            >
              <form onSubmit={handleAddOffer} className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Create New Offer</h2>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500"><X className="size-6" /></button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Offer Title</label>
                    <input
                      required
                      value={newOffer.title}
                      onChange={e => setNewOffer({ ...newOffer, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500"
                      placeholder="e.g. Eid Special Discount"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Discount (%)</label>
                    <input
                      required
                      value={newOffer.discount}
                      onChange={e => setNewOffer({ ...newOffer, discount: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500"
                      placeholder="e.g. 20%"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</label>
                    <select
                      value={newOffer.type}
                      onChange={e => setNewOffer({ ...newOffer, type: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="PROMO">Promotion</option>
                      <option value="OFFER">Special Offer</option>
                      <option value="AD">Advertisement</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                  Launch Promotion
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#0a0a0f]/95 border-t border-slate-200 dark:border-white/5 pb-8 pt-3 px-6 flex justify-between items-center z-50 transition-colors duration-300">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-5" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-5 text-blue-500" />} label="Marketing" active onClick={() => setScreen('admin-marketing')} />
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
