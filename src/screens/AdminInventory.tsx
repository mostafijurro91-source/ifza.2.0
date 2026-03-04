import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Plus, Package, ArrowUpDown, Edit3, Trash2, Save, X, AlertCircle, LayoutDashboard, ReceiptText, BarChart3, Megaphone } from 'lucide-react';
import { Screen, Product } from '../types';

const INITIAL_PRODUCTS: (Product & { stock: number })[] = [
  { id: '1', name: 'Premium Jamdani Saree', price: 4500, stock: 45, image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=200', category: 'Women' },
  { id: '2', name: 'Designer Panjabi', price: 2450, stock: 12, image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=200', category: 'Men' },
  { id: '3', name: 'Traditional Nagra', price: 950, stock: 8, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=200', category: 'Shoes' },
];

export default function AdminInventory({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ price: 0, stock: 0 });

  const startEdit = (p: typeof INITIAL_PRODUCTS[0]) => {
    setEditingId(p.id);
    setEditForm({ price: p.price, stock: p.stock });
  };

  const saveEdit = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: editForm.price, stock: editForm.stock } : p));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-[#0a0a0f] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      <header className="p-4 flex items-center gap-4 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md z-10">
        <button onClick={() => setScreen('admin')} className="size-10 flex items-center justify-center bg-white/5 rounded-xl">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold">Inventory & Stock</h1>
      </header>

      <main className="flex-1 p-4 space-y-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Search inventory..."
            />
          </div>
          <button
            onClick={() => setScreen('add-product')}
            className="px-4 bg-blue-600 rounded-xl flex items-center gap-2 font-bold text-sm"
          >
            <Plus className="size-4" /> Add
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Product List</p>
            <button className="flex items-center gap-1 text-[10px] font-bold text-blue-500 uppercase">
              <ArrowUpDown className="size-3" /> Sort by Stock
            </button>
          </div>

          <div className="grid gap-3">
            {products.map(product => (
              <motion.div
                layout
                key={product.id}
                className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-sm"
              >
                <div className="size-16 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm truncate">{product.name}</h3>
                    <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded uppercase">{product.category}</span>
                  </div>

                  {editingId === product.id ? (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1">
                        <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Price ($)</p>
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={e => setEditForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-[8px] font-bold text-slate-500 uppercase mb-1">Stock</p>
                        <input
                          type="number"
                          value={editForm.stock}
                          onChange={e => setEditForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="flex gap-1 self-end">
                        <button onClick={() => saveEdit(product.id)} className="p-2 bg-blue-600 rounded-lg text-white"><Save className="size-4" /></button>
                        <button onClick={() => setEditingId(null)} className="p-2 bg-white/10 rounded-lg text-slate-400"><X className="size-4" /></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-4">
                        <div>
                          <p className="text-[8px] font-bold text-slate-500 uppercase">Price</p>
                          <p className="text-sm font-bold text-blue-500">${product.price}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-bold text-slate-500 uppercase">Stock</p>
                          <div className="flex items-center gap-1">
                            <p className={`text-sm font-bold ${product.stock < 10 ? 'text-orange-500' : 'text-slate-900 dark:text-white'}`}>{product.stock}</p>
                            {product.stock < 10 && <AlertCircle className="size-3 text-orange-500" />}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(product)} className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"><Edit3 className="size-4" /></button>
                        <button className="p-2 bg-white/5 rounded-lg text-red-500/50 hover:text-red-500 transition-colors"><Trash2 className="size-4" /></button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="p-4 bg-blue-600/10 border-t border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <Package className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold">Stock Summary</p>
            <p className="text-[10px] text-slate-400">3 items low on stock. Review suggested.</p>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#0a0a0f]/95 border-t border-slate-200 dark:border-white/5 pb-8 pt-3 px-6 flex justify-between items-center z-50 transition-colors duration-300">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5 text-blue-500" />} label="Inventory" active onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-5" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
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
