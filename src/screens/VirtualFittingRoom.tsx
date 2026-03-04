import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Share2, Rotate3d, Camera, Check, PlusCircle, Accessibility, Footprints, Glasses, Watch, Home, Search, ShoppingCart, User, Wand2, Sparkles, Shirt, Baby, Ghost } from 'lucide-react';
import { Screen } from '../types';

type Category = 'Tops' | 'Bottoms' | 'Shoes' | 'Glasses' | 'Toys';

interface SelectedItems {
  Tops: string | null;
  Bottoms: string | null;
  Shoes: string | null;
  Glasses: string | null;
  Toys: string | null;
}

export default function VirtualFittingRoom({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState('Outfits');
  const [selectedItems, setSelectedItems] = useState<SelectedItems>({
    Tops: 'Neon Bomber',
    Bottoms: null,
    Shoes: null,
    Glasses: null,
    Toys: null,
  });
  const [isRendering, setIsRendering] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const toggleItem = (category: Category, item: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: prev[category] === item ? null : item
    }));
    setIsRendered(false);
  };

  const handleRender = () => {
    setIsRendering(true);
    setTimeout(() => {
      setIsRendering(false);
      setIsRendered(true);
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setIsRendered(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden transition-colors duration-300">
      <header className="flex items-center bg-white/80 dark:bg-background-dark/80 p-4 pb-2 justify-between sticky top-0 z-50 backdrop-blur-md md:hidden border-b border-slate-200 dark:border-white/5">
        <button onClick={() => setScreen('product')} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center font-black italic">IFZA</h1>
        <div className="flex w-10 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center rounded-full size-10 bg-primary/10 text-primary">
            <Share2 className="size-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pt-4 md:pt-10 pb-32">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Avatar Preview Section */}
          <div className="w-full md:w-1/2 sticky md:top-24 h-fit">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <div className="flex gap-6">
                <Tab label="Avatar" active={activeTab === 'Avatar'} onClick={() => setActiveTab('Avatar')} />
                <Tab label="Wardrobe" active={activeTab === 'Outfits'} onClick={() => setActiveTab('Outfits')} />
              </div>
            </div>

            <div
              className="relative w-full aspect-[3/4] rounded-3xl bg-primary/5 overflow-hidden flex items-center justify-center group active-glow transition-all border-2 border-primary/10 shadow-2xl shadow-primary/5"
            >
              {/* Simulated Avatar Preview */}
              <motion.div
                key={JSON.stringify(selectedItems)}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(10, 10, 15, ${isRendered ? '0.4' : '0.1'}) 0%, rgba(10, 10, 15, 0.9) 100%), url("${isRendered ? 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=1200' : (uploadedImage || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200')}")`,
                  filter: isRendered ? 'contrast(1.1) brightness(1.1)' : 'none'
                }}
              />

              {/* AI Rendering Overlay */}
              <AnimatePresence>
                {isRendering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center"
                  >
                    <div className="relative">
                      <div className="size-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 text-primary animate-pulse" />
                    </div>
                    <p className="mt-6 text-primary font-black tracking-[0.2em] uppercase text-[10px]">AI Fitting in progress...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Selected Items Badges */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2 max-w-[70%]">
                {Object.entries(selectedItems).map(([cat, val]) => val && (
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={cat}
                    className="px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[9px] font-black rounded-lg uppercase tracking-widest"
                  >
                    {val}
                  </motion.span>
                ))}
              </div>

              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="size-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary transition-all shadow-xl">
                  <Rotate3d className="size-6" />
                </button>
                <button className="size-12 bg-black/40 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary transition-all shadow-xl">
                  <Camera className="size-6" />
                </button>
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">Live AI</span>
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Look #2026</span>
                  </div>
                  <h3 className="text-slate-900 dark:text-white text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">Fit Preview</h3>
                </div>
              </div>
            </div>

            {/* Desktop Action Button */}
            <div className="hidden md:block mt-8">
              <button
                onClick={handleRender}
                disabled={isRendering}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 px-8 rounded-2xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-4 active-glow transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
              >
                <Wand2 className={`size-6 ${isRendering ? 'animate-spin' : ''}`} />
                {isRendering ? 'Rendering your style...' : 'Render AI Fit'}
              </button>
            </div>
          </div>

          {/* Controls & Wardrobe Section */}
          <div className="w-full md:w-1/2 space-y-10 md:pt-12">
            <div className="hidden md:flex gap-10 border-b border-white/5 pb-4">
              <button onClick={() => setActiveTab('Avatar')} className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'Avatar' ? 'text-primary border-b-2 border-primary pb-4 -mb-4.5' : 'text-slate-500 hover:text-white'}`}>Avatar Setup</button>
              <button onClick={() => setActiveTab('Outfits')} className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'Outfits' ? 'text-primary border-b-2 border-primary pb-4 -mb-4.5' : 'text-slate-500 hover:text-white'}`}>Wardrobe</button>
              <button onClick={() => setActiveTab('Accessories')} className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${activeTab === 'Accessories' ? 'text-primary border-b-2 border-primary pb-4 -mb-4.5' : 'text-slate-500 hover:text-white'}`}>Accessories</button>
            </div>

            {activeTab === 'Avatar' ? (
              <section className="bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center gap-6 text-center">
                <div className="size-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-2 shadow-xl shadow-primary/10">
                  <Camera className="size-10" />
                </div>
                <div>
                  <h3 className="text-slate-900 dark:text-white text-2xl font-black italic uppercase tracking-tighter mb-2">Upload Your Photo</h3>
                  <p className="text-sm text-slate-400 max-w-xs mx-auto">For pixel-perfect AI results, upload a well-lit photo of the person who will wear these styles.</p>
                </div>

                <label className="w-full max-w-xs relative cursor-pointer group">
                  <div className="w-full py-4 bg-primary text-white text-sm font-black rounded-2xl text-center shadow-2xl shadow-primary/20 group-hover:bg-primary/90 transition-all uppercase tracking-widest">
                    Choose Image
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </section>
            ) : (
              <section className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-black italic uppercase tracking-tighter">Wardrobe (জামা ও খেলনা)</h3>
                  <button
                    onClick={() => setSelectedItems({ Tops: null, Bottoms: null, Shoes: null, Glasses: null, Toys: null })}
                    className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-primary transition-colors border-b border-white/10"
                  >
                    Clear Slate
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <Slot
                    icon={<Shirt className="size-8" />}
                    label="Tops"
                    selected={selectedItems.Tops === 'Neon Bomber' ? 'Neon Bomber' : null}
                    onClick={() => toggleItem('Tops', 'Neon Bomber')}
                    image="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=400"
                  />
                  <Slot
                    icon={<Shirt className="size-8" />}
                    label="Tops"
                    selected={selectedItems.Tops === 'Summer Tee' ? 'Summer Tee' : null}
                    onClick={() => toggleItem('Tops', 'Summer Tee')}
                    image="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400"
                  />
                  <Slot
                    icon={<Accessibility className="size-8" />}
                    label="Bottoms"
                    selected={selectedItems.Bottoms === 'Cargo Pants' ? 'Cargo Pants' : null}
                    onClick={() => toggleItem('Bottoms', 'Cargo Pants')}
                    image="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400"
                  />
                  <Slot
                    icon={<Footprints className="size-8" />}
                    label="Shoes"
                    selected={selectedItems.Shoes === 'Cyber Kicks' ? 'Cyber Kicks' : null}
                    onClick={() => toggleItem('Shoes', 'Cyber Kicks')}
                    image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400"
                  />
                  <Slot
                    icon={<Glasses className="size-8" />}
                    label="Glasses"
                    selected={selectedItems.Glasses === 'Smart Visor' ? 'Smart Visor' : null}
                    onClick={() => toggleItem('Glasses', 'Smart Visor')}
                    image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400"
                  />
                  <Slot
                    icon={<Ghost className="size-8" />}
                    label="Toys"
                    selected={selectedItems.Toys === 'Teddy Bot' ? 'Teddy Bot' : null}
                    onClick={() => toggleItem('Toys', 'Teddy Bot')}
                    image="https://images.unsplash.com/photo-1559444461-3c83027ef995?auto=format&fit=crop&q=80&w=400"
                  />
                </div>
              </section>
            )}

            <section className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:border-primary/20 transition-all">
              <div className="flex items-center gap-5">
                <div className="size-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <Baby className="size-8" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Switch Model</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active: Baby #01</p>
                </div>
              </div>
              <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">Select</button>
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Fit Button */}
      <div className="fixed bottom-24 right-4 z-50 md:hidden">
        <button
          onClick={handleRender}
          disabled={isRendering}
          className="bg-primary hover:bg-primary/90 text-white font-black py-4 px-6 rounded-full shadow-2xl flex items-center gap-3 active-glow transition-all active:scale-95 disabled:opacity-50"
        >
          <Wand2 className={`size-5 ${isRendering ? 'animate-spin' : ''}`} />
          <span className="uppercase tracking-widest text-[10px]">Render AI</span>
        </button>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 md:hidden">
        <div className="flex gap-2 px-4 pb-8 pt-2">
          <FitNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
          <FitNavItem icon={<Search className="size-5" />} label="Search" />
          <div className="flex flex-1 flex-col items-center justify-end gap-1 text-primary">
            <div className="flex h-10 w-10 mb-1 rounded-full bg-primary items-center justify-center text-white shadow-lg shadow-primary/30">
              <Sparkles className="size-6" />
            </div>
            <p className="text-[10px] font-bold leading-normal uppercase">Try-On</p>
          </div>
          <FitNavItem icon={<ShoppingCart className="size-5" />} label="Cart" onClick={() => setScreen('cart')} />
          <FitNavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
        </div>
      </nav>

      <div className="fixed bottom-24 right-4 z-20">
        <button
          onClick={handleRender}
          disabled={isRendering}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 active-glow transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Wand2 className={`size-5 ${isRendering ? 'animate-spin' : ''}`} />
          <span className="uppercase tracking-widest text-xs">Render AI Fit</span>
        </button>
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 transition-all ${active ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
    >
      <p className="text-sm font-bold tracking-tight uppercase tracking-widest text-[10px]">{label}</p>
    </button>
  );
}

function Slot({ icon, label, selected, onClick, image }: { icon: React.ReactNode, label: string, selected?: string | null, onClick?: () => void, image?: string }) {
  return (
    <div className="flex-none w-32 snap-start" onClick={onClick}>
      <div className={`aspect-square rounded-2xl border-2 transition-all cursor-pointer overflow-hidden relative ${selected ? 'border-primary bg-primary/10' : 'border-dashed border-white/10 bg-white/5 hover:border-primary/40'}`}>
        {selected && image ? (
          <img src={image} alt={label} className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className={selected ? 'text-primary' : 'text-slate-600'}>{icon}</div>
            <span className={`text-[8px] font-black uppercase tracking-widest ${selected ? 'text-primary' : 'text-slate-600'}`}>{label}</span>
          </div>
        )}

        {selected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="bg-primary rounded-full p-1 shadow-lg">
              <Check className="text-white size-3" />
            </div>
          </div>
        )}

        {!selected && (
          <div className="absolute top-2 right-2">
            <PlusCircle className="size-4 text-slate-700" />
          </div>
        )}
      </div>
      <p className={`text-[9px] font-bold text-center mt-2 uppercase tracking-tighter ${selected ? 'text-primary' : 'text-slate-500'}`}>
        {selected || `Add ${label}`}
      </p>
    </div>
  );
}

function FitNavItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 cursor-pointer hover:text-primary transition-colors" onClick={onClick}>
      <div className="flex h-8 items-center justify-center">
        {icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-tighter">{label}</p>
    </div>
  );
}
