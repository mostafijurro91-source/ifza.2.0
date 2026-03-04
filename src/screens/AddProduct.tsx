import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Image as ImageIcon, X, Plus, Edit2, LayoutDashboard, Package, ReceiptText, BarChart3, Settings, Megaphone, CheckCircle2 } from 'lucide-react';
import { Screen, Catalog, Product } from '../types';

export default function AddProduct({ setScreen, catalogs, addProduct }: { setScreen: (s: Screen) => void, catalogs: Catalog[], addProduct: (p: Product) => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'women',
    catalogId: '',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400'
  });

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.image) return;
    
    setIsSaving(true);
    setTimeout(() => {
      addProduct({
        id: `p${Date.now()}`,
        name: formData.name!,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        image: formData.image!,
        category: formData.category!,
        catalogId: formData.catalogId,
        isVirtualReady: true
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setScreen('admin-inventory');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-background-dark text-white overflow-hidden">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-primary/10">
        <button onClick={() => setScreen('admin')} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
          <ChevronLeft className="size-6" />
        </button>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Add New Product</h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="text-primary font-bold hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8 pb-32">
        <section>
          <h3 className="text-lg font-bold mb-4">Product Images</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar">
            <div className="relative flex-none w-32 aspect-[3/4] rounded-xl overflow-hidden border border-primary/20">
              <img 
                src={formData.image} 
                alt="Product" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button className="absolute top-2 right-2 size-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <X className="size-4 text-white" />
              </button>
            </div>
            <div className="flex-none w-32 aspect-[3/4] rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 flex items-center justify-center text-primary/40 cursor-pointer hover:border-primary transition-colors">
              <ImageIcon className="size-8" />
            </div>
            <div className="flex-none w-32 aspect-[3/4] rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 flex items-center justify-center text-primary/40 cursor-pointer hover:border-primary transition-colors">
              <ImageIcon className="size-8" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold">Basic Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
              <input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-primary/5 border border-primary/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-primary transition-colors" 
                placeholder="e.g. Summer Silk Dress"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price (৳)</label>
                <input 
                  type="number"
                  value={formData.price || ''}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="w-full bg-primary/5 border border-primary/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-primary transition-colors" 
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Price (৳)</label>
                <input 
                  type="number"
                  value={formData.originalPrice || ''}
                  onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                  className="w-full bg-primary/5 border border-primary/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-primary transition-colors" 
                  placeholder="Optional"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {['women', 'men', 'baby', 'shoes', 'accs'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFormData({...formData, category: cat, catalogId: ''})}
                    className={`flex-none px-4 py-2 font-bold rounded-xl capitalize ${formData.category === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-primary/5 border border-primary/10 text-slate-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {catalogs.filter(c => c.parentCategory === formData.category).length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Catalog</label>
                <select 
                  value={formData.catalogId || ''}
                  onChange={e => setFormData({...formData, catalogId: e.target.value})}
                  className="w-full bg-background-dark border border-primary/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-primary transition-colors text-white"
                >
                  <option value="">Select Catalog</option>
                  {catalogs.filter(c => c.parentCategory === formData.category).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Image URL</label>
              <input 
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full bg-primary/5 border border-primary/10 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-primary transition-colors" 
                placeholder="https://..."
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Variants & Stock</h3>
            <button className="text-primary text-sm font-bold flex items-center gap-1">
              <Plus className="size-4" /> Add Variant
            </button>
          </div>
          <div className="space-y-3">
            <VariantCard label="Size: M | Color: Midnight Black" stock="45" sku="DR-BLK-M-01" />
            <VariantCard label="Size: L | Color: Midnight Black" stock="12" sku="DR-BLK-L-01" />
          </div>
        </section>

        <section className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
          <textarea 
            className="w-full bg-primary/5 border border-primary/10 rounded-xl py-4 px-4 text-sm h-32 focus:outline-none focus:border-primary transition-colors resize-none" 
            placeholder="Describe the material, fit, and style..."
          ></textarea>
        </section>
      </main>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 z-[60] bg-green-500 text-white p-4 rounded-2xl flex items-center gap-3 shadow-2xl"
          >
            <CheckCircle2 className="size-6" />
            <p className="font-bold">Product Added Successfully!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0f] border-t border-white/5 pb-8 pt-3 px-6 flex justify-between items-center z-50">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5 text-blue-500" />} label="Inventory" active onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-5" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-5" />} label="Marketing" onClick={() => setScreen('admin-marketing')} />
      </nav>
    </div>
  );
}

function VariantCard({ label, stock, sku }: { label: string, stock: string, sku: string }) {
  return (
    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-sm">{label}</p>
        <Edit2 className="size-4 text-slate-500 cursor-pointer" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stock Quantity</p>
          <div className="bg-primary/5 border border-primary/10 rounded-lg py-2 px-3 text-sm font-bold">{stock}</div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SKU</p>
          <div className="bg-primary/5 border border-primary/10 rounded-lg py-2 px-3 text-sm font-bold">{sku}</div>
        </div>
      </div>
    </div>
  );
}

function AdminNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-500'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
