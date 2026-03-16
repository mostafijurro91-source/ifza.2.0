import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Plus, Megaphone, Tag, Image as ImageIcon, Trash2, Edit3, Sparkles, Clock, CheckCircle2, AlertCircle, X, LayoutDashboard, Package, ReceiptText, BarChart3, Upload } from 'lucide-react';
import { Screen } from '../types';

const DEFAULT_BANNERS = [
  { 
    id: '1', 
    title: 'NEON FLASH SALE', 
    subtitle: 'UP TO 70% OFF + FREE SHIPPING', 
    badge: 'Exclusive Early Access',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ymBmJPwlXn1-hfq72g1T9LPNRQMbop8KzdL2pr5sx3kAidjzS__2fSj4witKY7YCYOK-54uGhSTwWHZL1phDnAkiO64qx2npA1KXdyLLQ54bPX2tl_WEyzTuoXHLh8FkH4jRcjQY54fEjAOahlBOLIQoScnRLwA56JBj-HhYzZyOvMvX5xrUNeuZC-nGsZwTSDvo8SIXCsdVfnw5fqa5BqSzHl9TgRc2mPIFMInTV80fupN0nW_VlzLv80Sp3W6qp-3f2_1Bbywd' 
  }
];

export default function AdminMarketing({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [banners, setBanners] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({ title: '', subtitle: '', badge: '', image: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bannerToDelete, setBannerToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cokmoke_banners');
    if (saved) {
      try {
        setBanners(JSON.parse(saved));
      } catch (e) {
        setBanners(DEFAULT_BANNERS);
      }
    } else {
      setBanners(DEFAULT_BANNERS);
      localStorage.setItem('cokmoke_banners', JSON.stringify(DEFAULT_BANNERS));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 800;
          
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
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // Compress to 60% quality JPEG
          setNewBanner({ ...newBanner, image: dataUrl });
          setError(null);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanner.image) {
      setError("Please upload an image for the slider");
      return;
    }
    const banner = {
      id: Math.random().toString(36).substr(2, 9),
      ...newBanner
    };
    const updated = [banner, ...banners];
    
    try {
      localStorage.setItem('cokmoke_banners', JSON.stringify(updated));
      setBanners(updated);
      setIsModalOpen(false);
      setNewBanner({ title: '', subtitle: '', badge: '', image: '' });
      setError(null);
    } catch (err) {
      setError("Image is too large. Please try a smaller image.");
      console.error("Storage error:", err);
    }
  };

  const confirmDelete = (id: string) => {
    setBannerToDelete(id);
  };

  const executeDelete = () => {
    if (!bannerToDelete) return;
    const updated = banners.filter(b => b.id !== bannerToDelete);
    setBanners(updated);
    localStorage.setItem('cokmoke_banners', JSON.stringify(updated));
    setBannerToDelete(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <header className="p-4 flex items-center gap-4 border-b border-slate-200 sticky top-0 bg-slate-50/80 backdrop-blur-md z-10">
        <button onClick={() => setScreen('admin')} className="size-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-lg font-bold">Marketing & Sliders</h1>
      </header>

      <main className="flex-1 p-4 space-y-6 max-w-7xl mx-auto w-full pb-24">
        <div className="flex gap-3 max-w-md mx-auto md:mx-0">
          <button 
            onClick={() => {
              setError(null);
              setIsModalOpen(true);
            }}
            className="flex-1 bg-blue-50 border border-blue-200 p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-all hover:bg-blue-100 shadow-sm"
          >
            <ImageIcon className="size-6 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-900">New Slider</span>
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Active Homepage Sliders</p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {banners.map(banner => (
              <motion.div 
                layout
                key={banner.id} 
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-slate-300 transition-colors shadow-sm"
              >
                <div className="relative h-48 w-full">
                  <img src={banner.image} alt={banner.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    {banner.badge && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded uppercase mb-1 inline-block backdrop-blur-sm">
                        {banner.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-bold truncate text-white">{banner.title}</h3>
                    <p className="text-xs text-slate-300 truncate">{banner.subtitle}</p>
                  </div>
                </div>
                
                <div className="p-4 flex items-center justify-between border-t border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Sparkles className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Homepage Slider</p>
                      <p className="text-[10px] text-slate-500">Visible to all users</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => confirmDelete(banner.id)}
                      className="p-2 bg-white border border-slate-200 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {banners.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 border-dashed">
                <ImageIcon className="size-12 mx-auto mb-4 opacity-20" />
                <p>No sliders active. Add one to show offers on the homepage.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {bannerToDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden"
            >
              <div className="p-6 text-center">
                <div className="size-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="size-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Slider?</h2>
                <p className="text-sm text-slate-500 mb-6">This action cannot be undone. The slider will be removed from the homepage immediately.</p>
                
                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setBannerToDelete(null)}
                    className="flex-1 py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    onClick={executeDelete}
                    className="flex-1 py-3 px-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-600/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <form onSubmit={handleAddBanner} className="p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-bold text-slate-900">Add Slider Image</h2>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-900 transition-colors"><X className="size-6" /></button>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="size-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slider Image</label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-blue-400 transition-colors overflow-hidden"
                    >
                      {newBanner.image ? (
                        <img src={newBanner.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <Upload className="size-6 text-slate-400 mb-2" />
                          <span className="text-xs font-bold text-slate-500">Click to upload image</span>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Title</label>
                    <input 
                      required
                      value={newBanner.title}
                      onChange={e => setNewBanner({...newBanner, title: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900"
                      placeholder="e.g. NEON FLASH SALE"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subtitle / Offer Text</label>
                    <input 
                      required
                      value={newBanner.subtitle}
                      onChange={e => setNewBanner({...newBanner, subtitle: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900"
                      placeholder="e.g. UP TO 70% OFF"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Badge Text (Optional)</label>
                    <input 
                      value={newBanner.badge}
                      onChange={e => setNewBanner({...newBanner, badge: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900"
                      placeholder="e.g. Exclusive Early Access"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-md shadow-blue-600/20 active:scale-95 transition-all hover:bg-blue-700">
                  Add to Slider
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-8 pt-3 px-6 flex justify-between items-center z-50 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <AdminNavItem icon={<LayoutDashboard className="size-5" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-5" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-5" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-5 text-blue-600" />} label="Marketing" active onClick={() => setScreen('admin-marketing')} />
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 right-0 h-full w-20 flex-col items-center justify-center gap-8 border-l border-slate-200 bg-white/95 backdrop-blur-xl z-50 py-8 shadow-[-4px_0_20px_rgba(0,0,0,0.05)]">
        <AdminNavItem icon={<LayoutDashboard className="size-6" />} label="Overview" onClick={() => setScreen('admin')} />
        <AdminNavItem icon={<Package className="size-6" />} label="Inventory" onClick={() => setScreen('admin-inventory')} />
        <AdminNavItem icon={<ReceiptText className="size-6" />} label="Orders" onClick={() => setScreen('admin-orders')} />
        <AdminNavItem icon={<BarChart3 className="size-6" />} label="Analytics" onClick={() => setScreen('admin-analytics')} />
        <AdminNavItem icon={<Megaphone className="size-6 text-blue-600" />} label="Marketing" active onClick={() => setScreen('admin-marketing')} />
      </nav>
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
