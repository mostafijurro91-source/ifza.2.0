import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Image as ImageIcon, X, Plus, Edit2, LayoutDashboard, Package, ReceiptText, BarChart3, Settings, Megaphone, CheckCircle2, Loader2 } from 'lucide-react';
import { Screen, Catalog, Product } from '../types';

export default function AddProduct({ setScreen, catalogs, addProduct }: { setScreen: (s: Screen) => void, catalogs: Catalog[], addProduct: (p: Product) => void }) {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'women',
    catalogId: '',
    image: '',
    stock: 0,
    variants: []
  });

  const addVariant = () => {
    const newVariants = [...(formData.variants || []), { size: '', color: '', stock: 0, sku: '' }];
    setFormData({ ...formData, variants: newVariants });
  };

  const removeVariant = (index: number) => {
    const newVariants = (formData.variants || []).filter((_, i) => i !== index);
    setFormData({ ...formData, variants: newVariants });
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const newVariants = (formData.variants || []).map((v, i) => i === index ? { ...v, [field]: value } : v);
    setFormData({ ...formData, variants: newVariants });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.image) {
      alert('দয়া করে পণ্যের নাম, মূল্য এবং ছবি প্রদান করুন।');
      return;
    }
    
    setIsSaving(true);
    try {
      await addProduct({
        id: `p${Date.now()}`,
        name: formData.name!,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        image: formData.image!,
        category: formData.category!,
        catalogId: formData.catalogId,
        isVirtualReady: true,
        stock: Number(formData.stock) || 0,
        variants: formData.variants || []
      });
      
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setScreen('admin-inventory');
      }, 2000);
    } catch (error: any) {
      console.error('Detailed save error:', error);
      setIsSaving(false);
      alert('পণ্য সেভ করতে সমস্যা হয়েছে: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-slate-50 text-slate-900 overflow-hidden">
      <header className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-200 shadow-sm">
        <button onClick={() => setScreen('admin')} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
          <ChevronLeft className="size-6" />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Add New Product</h2>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="text-blue-600 font-bold hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-8 pb-32 max-w-7xl mx-auto w-full md:grid md:grid-cols-2 md:gap-8 md:px-8">
        <div className="md:col-span-1 space-y-8">
          <section>
            <h3 className="text-lg font-bold mb-4 text-slate-900">Product Images</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {formData.image ? (
                <div className="relative flex-none w-32 aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 group shadow-sm">
                  <img 
                    src={formData.image} 
                    alt="Product" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setFormData({...formData, image: ''})}
                    className="absolute top-2 right-2 size-6 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                  >
                    <X className="size-4 text-white" />
                  </button>
                </div>
              ) : null}
              
              <label className="flex-none w-32 aspect-[3/4] rounded-xl border-2 border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:border-blue-500 hover:bg-slate-50 transition-all group relative shadow-sm">
                <div className="flex flex-col items-center gap-3 z-10">
                  <div className="bg-slate-100 p-3 rounded-full group-hover:scale-110 transition-transform">
                    <ImageIcon className="size-6 text-slate-400" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-center px-2">Click to Upload</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement('canvas');
                          let width = img.width;
                          let height = img.height;
                          
                          const MAX_WIDTH = 800;
                          const MAX_HEIGHT = 1000;
                          
                          if (width > height) {
                            if (width > MAX_WIDTH) {
                              height *= MAX_WIDTH / width;
                              width = MAX_WIDTH;
                            }
                          } else {
                            if (height > MAX_HEIGHT) {
                              width *= MAX_HEIGHT / height;
                              height = MAX_HEIGHT;
                            }
                          }
                          
                          canvas.width = width;
                          canvas.height = height;
                          const ctx = canvas.getContext('2d');
                          ctx?.drawImage(img, 0, 0, width, height);
                          
                          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                          setFormData({...formData, image: dataUrl});
                        };
                        img.src = event.target?.result as string;
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
                <input 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm text-slate-900" 
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
                    className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm text-slate-900" 
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Original Price (৳)</label>
                  <input 
                    type="number"
                    value={formData.originalPrice || ''}
                    onChange={e => setFormData({...formData, originalPrice: Number(e.target.value)})}
                    className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm text-slate-900" 
                    placeholder="Optional"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Stock</label>
                <input 
                  type="number"
                  value={formData.stock || ''}
                  onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                  className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm text-slate-900" 
                  placeholder="e.g. 100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Category</label>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {['women', 'men', 'baby', 'shoes', 'accs'].map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setFormData({...formData, category: cat, catalogId: ''})}
                      className={`flex-none px-4 py-2 font-bold rounded-xl capitalize transition-colors ${formData.category === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
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
                    className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900 shadow-sm appearance-none"
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
                  className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors shadow-sm text-slate-900" 
                  placeholder="https://..."
                />
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-1 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">ভ্যারিয়েন্ট ও স্টক</h3>
              <button 
                onClick={addVariant}
                className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:text-blue-700 transition-colors"
              >
                <Plus className="size-4" /> ভ্যারিয়েন্ট যোগ করুন
              </button>
            </div>
            <div className="space-y-3">
              {(formData.variants || []).map((variant, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 shadow-sm relative">
                  <button 
                    onClick={() => removeVariant(index)}
                    className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">সাইজ</p>
                      <input 
                        value={variant.size}
                        onChange={e => updateVariant(index, 'size', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900" 
                        placeholder="উদা: M, L, XL"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">রং</p>
                      <input 
                        value={variant.color}
                        onChange={e => updateVariant(index, 'color', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900" 
                        placeholder="উদা: কালো, নীল"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">স্টক পরিমাণ</p>
                      <input 
                        type="number"
                        value={variant.stock || ''}
                        onChange={e => updateVariant(index, 'stock', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900" 
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SKU</p>
                      <input 
                        value={variant.sku}
                        onChange={e => updateVariant(index, 'sku', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900" 
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(formData.variants || []).length === 0 && (
                <p className="text-sm text-slate-500 italic text-center py-4">এখনও কোনো ভ্যারিয়েন্ট যোগ করা হয়নি।</p>
              )}
            </div>
          </section>

          <section className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
            <textarea 
              className="w-full bg-white border border-slate-200 rounded-xl py-4 px-4 text-sm h-32 focus:outline-none focus:border-blue-500 transition-colors resize-none shadow-sm text-slate-900" 
              placeholder="Describe the material, fit, and style..."
            ></textarea>
          </section>

          <div className="pt-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-6 animate-spin" />
                  <span>সেভ হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-6" />
                  <span>পণ্য সেভ করুন</span>
                </>
              )}
            </button>
          </div>
        </div>
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
            <p className="font-bold">পণ্যটি সফলভাবে যোগ করা হয়েছে!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-8 pt-3 px-6 flex justify-between items-center z-50 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5 text-blue-600" />} label="Inventory" active onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-5" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-5" />} label="Marketing" onClick={() => setScreen('admin-marketing')} />
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 right-0 h-full w-20 flex-col items-center justify-center gap-8 border-l border-slate-200 bg-white/95 backdrop-blur-xl z-50 py-8 shadow-[-4px_0_20px_rgba(0,0,0,0.05)]">
        <AdminNavItem icon={<LayoutDashboard className="size-6" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-6 text-blue-600" />} label="Inventory" active onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-6" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-6" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-6" />} label="Marketing" onClick={() => setScreen('admin-marketing')} />
      </nav>
    </div>
  );
}

function VariantCard({ label, stock, sku }: { label: string, stock: string, sku: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <p className="font-bold text-sm text-slate-900">{label}</p>
        <Edit2 className="size-4 text-slate-500 cursor-pointer hover:text-slate-900 transition-colors" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Stock Quantity</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-900">{stock}</div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">SKU</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-900">{sku}</div>
        </div>
      </div>
    </div>
  );
}

function AdminNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900 transition-colors'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
