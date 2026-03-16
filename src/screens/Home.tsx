import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Camera, Menu, ShoppingBag, Zap, Heart, Accessibility, Home, Compass, ReceiptText, User, Star, Flame, Tag, ChevronRight, UserCheck, Briefcase, Smile, Moon, Sun, Wind, PenTool, Baby, Gamepad2, Activity, Watch, ShoppingBag as ShoppingBagIcon, Gem, Glasses, Scissors, Layers, Columns, ChevronLeft, Shirt, Crown, Sparkles, Flower2, Waves, UserCircle, MessageCircle } from 'lucide-react';
import { Screen, Product, Catalog, UserProfile } from '../types';
import ProductCard from '../components/ProductCard';
import { calculateRecommendedSize } from '../utils/sizeCalculator';

// Helper to get icon component by name
const getIconByName = (name: string, className?: string) => {
  const defaultClass = className || "size-8 text-primary";
  if (name.startsWith('data:image') || name.startsWith('http')) {
    return <img src={name} alt="icon" className={defaultClass.replace('text-primary', '') + " object-contain"} />;
  }
  switch(name) {
    case 'User': return <User className={defaultClass} />;
    case 'UserCheck': return <UserCheck className={defaultClass} />;
    case 'UserCircle': return <UserCircle className={defaultClass} />;
    case 'Briefcase': return <Briefcase className={defaultClass} />;
    case 'Smile': return <Smile className={defaultClass} />;
    case 'Moon': return <Moon className={defaultClass} />;
    case 'Sun': return <Sun className={defaultClass} />;
    case 'Wind': return <Wind className={defaultClass} />;
    case 'PenTool': return <PenTool className={defaultClass} />;
    case 'Baby': return <Baby className={defaultClass} />;
    case 'Heart': return <Heart className={defaultClass} />;
    case 'Gamepad2': return <Gamepad2 className={defaultClass} />;
    case 'Activity': return <Activity className={defaultClass} />;
    case 'Watch': return <Watch className={defaultClass} />;
    case 'ShoppingBag': return <ShoppingBagIcon className={defaultClass} />;
    case 'Gem': return <Gem className={defaultClass} />;
    case 'Glasses': return <Glasses className={defaultClass} />;
    case 'Scissors': return <Scissors className={defaultClass} />;
    case 'Layers': return <Layers className={defaultClass} />;
    case 'Columns': return <Columns className={defaultClass} />;
    case 'Shirt': return <Shirt className={defaultClass} />;
    case 'Crown': return <Crown className={defaultClass} />;
    case 'Sparkles': return <Sparkles className={defaultClass} />;
    case 'Flower2': return <Flower2 className={defaultClass} />;
    case 'Waves': return <Waves className={defaultClass} />;
    default: return <Tag className={defaultClass} />;
  }
};

const DEFAULT_BANNERS = [
  { 
    id: '1', 
    title: 'NEON FLASH SALE', 
    subtitle: 'UP TO 70% OFF + FREE SHIPPING', 
    badge: 'Exclusive Early Access',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1ymBmJPwlXn1-hfq72g1T9LPNRQMbop8KzdL2pr5sx3kAidjzS__2fSj4witKY7YCYOK-54uGhSTwWHZL1phDnAkiO64qx2npA1KXdyLLQ54bPX2tl_WEyzTuoXHLh8FkH4jRcjQY54fEjAOahlBOLIQoScnRLwA56JBj-HhYzZyOvMvX5xrUNeuZC-nGsZwTSDvo8SIXCsdVfnw5fqa5BqSzHl9TgRc2mPIFMInTV80fupN0nW_VlzLv80Sp3W6qp-3f2_1Bbywd' 
  }
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function HomeDashboard({ setScreen, cartCount, searchQuery, setSearchQuery, products = [], setSearchImage, catalogs = [], savedLooks = [], toggleSavedLook, user }: { setScreen: (s: Screen, p?: Product, c?: Catalog) => void, cartCount: number, searchQuery: string, setSearchQuery: (q: string) => void, products?: Product[], setSearchImage?: (img: string | null) => void, catalogs?: Catalog[], savedLooks?: string[], toggleSavedLook?: (id: string) => void, user?: UserProfile }) {
  const recommendedSize = calculateRecommendedSize(user?.measurements);
  
  const bestSellers = useMemo(() => products.filter(p => p.rating === 5), [products]);
  const trending = useMemo(() => products.filter(p => p.rating === 3 || p.rating === 4), [products]);
  const sale = useMemo(() => products.filter(p => p.rating && p.rating <= 2), [products]);
  const sortedProducts = useMemo(() => [...products].sort((a, b) => a.name.localeCompare(b.name)), [products]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [banners, setBanners] = useState<any[]>(DEFAULT_BANNERS);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('cokmoke_banners');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setBanners(parsed);
        }
      } catch (e) {
        console.error("Failed to parse banners");
      }
    }
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && setSearchImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSearchImage(reader.result as string);
        setSearchQuery('');
        setScreen('discover');
      };
      reader.readAsDataURL(file);
    }
  };

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-slate-50">
      <main className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
        <div className="px-4 pt-4 md:px-8">
          <div className="flex w-full items-stretch rounded-xl h-10 bg-white border border-slate-200 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center pl-4 cursor-pointer" onClick={() => setScreen('discover')}>
              <Search className="text-slate-400 size-4" />
            </div>
            <input 
              className="flex w-full border-none bg-transparent focus:outline-none text-slate-900 placeholder:text-slate-400 px-3 text-sm font-normal" 
              placeholder="Search for styles or virtual try-on..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (setSearchImage) setSearchImage(null);
              }}
              onKeyDown={(e) => { if(e.key === 'Enter') setScreen('discover'); }}
            />
            <div className="flex items-center justify-center pr-4">
              <Camera className="text-accent-blue size-4 cursor-pointer" onClick={() => fileInputRef.current?.click()} />
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        <div className="px-4 md:px-8">
          {banners.length > 0 && (
            <div className="relative overflow-hidden rounded-xl bg-slate-100 group h-[280px] md:h-[400px]">
              <AnimatePresence initial={false}>
                <motion.div 
                  key={currentBannerIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      nextBanner();
                    } else if (swipe > swipeConfidenceThreshold) {
                      prevBanner();
                    }
                  }}
                  className="absolute inset-0 p-6 md:p-10 lg:p-16 flex flex-col justify-center cursor-grab active:cursor-grabbing"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%), url("${banners[currentBannerIndex]?.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="flex flex-col gap-2 relative z-10 max-w-xl">
                    {banners[currentBannerIndex]?.badge && (
                      <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {banners[currentBannerIndex].badge}
                      </span>
                    )}
                    <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-900">
                      {banners[currentBannerIndex]?.title}
                    </h3>
                    <p className="text-sm md:text-lg font-medium text-slate-600">
                      {banners[currentBannerIndex]?.subtitle}
                    </p>
                    <div className="mt-4 flex gap-3">
                      <button onClick={() => setScreen('discover')} className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition-colors cursor-pointer">Shop Now</button>
                      <button onClick={() => setScreen('discover')} className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer">View All</button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {banners.length > 1 && (
                <>
                  <button 
                    onClick={prevBanner}
                    className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button 
                    onClick={nextBanner}
                    className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-900 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {banners.map((_, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentBannerIndex(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === currentBannerIndex ? 'w-4 bg-primary' : 'w-1.5 bg-slate-300'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Catalogs Section */}
        <section className="md:px-4">
          <div className="flex items-center justify-between px-4 mb-3 md:px-4">
            <h3 className="text-slate-900 text-base font-bold md:text-lg">Shop by Catalog</h3>
            <button onClick={() => setScreen('discover')} className="text-xs font-semibold text-primary cursor-pointer flex items-center gap-1">
              View All <ChevronRight className="size-3" />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-y-4 gap-x-2 px-4 pb-2 md:gap-4 md:px-4">
            {catalogs.slice(0, 10).map((catalog) => (
              <div 
                key={catalog.id} 
                className="flex flex-col items-center gap-1.5 group cursor-pointer w-full"
                onClick={() => setScreen('catalog-products', undefined, catalog)}
              >
                <div className="flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-2xl border border-slate-200 hover:border-primary transition-colors bg-white shadow-sm">
                   {catalog.icon ? getIconByName(catalog.icon, "size-5 md:size-6 text-primary") : <img src={catalog.image} alt={catalog.name} className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />}
                </div>
                <p className="text-[9px] font-medium text-slate-600 md:text-xs text-center truncate w-full">{catalog.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section (Top Level) */}
        <section className="md:px-4">
          <div className="flex items-center justify-between px-4 mb-4 md:px-4">
            <h3 className="text-slate-900 text-lg font-bold md:text-xl">Categories</h3>
          </div>
          <div className="grid grid-cols-5 gap-2 px-4 pb-2 md:gap-6 md:px-4">
            {[
              { id: 'women', label: 'Women', icon: 'User' },
              { id: 'men', label: 'Men', icon: 'User' },
              { id: 'baby', label: 'Baby', icon: 'Baby' },
              { id: 'shoes', label: 'Shoes', icon: 'Footprints' },
              { id: 'accs', label: 'Accs', icon: 'Watch' }
            ].map((cat) => (
              <div 
                key={cat.id} 
                className="flex flex-col items-center gap-1.5 group cursor-pointer w-full"
                onClick={() => setScreen(cat.id as Screen)}
              >
                <div className="flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-2xl border border-slate-200 hover:border-primary transition-colors bg-white shadow-sm">
                  <span className="text-primary text-xl md:text-2xl">
                    {cat.label === 'Baby' ? '👶' : cat.label === 'Women' ? '👗' : cat.label === 'Men' ? '👔' : cat.label === 'Shoes' ? '👟' : '⌚'}
                  </span>
                </div>
                <p className="text-[9px] font-medium text-slate-600 md:text-sm">{cat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers Section */}
        {sale.length > 0 && (
          <section className="bg-white py-6 md:px-4 md:rounded-2xl md:mx-4 border-y border-slate-200 md:border-x shadow-sm">
            <div className="flex items-center justify-between px-4 mb-4">
              <div className="flex items-center gap-2">
                <Tag className="text-green-500 size-5 fill-green-500" />
                <h3 className="text-slate-900 text-lg font-bold md:text-xl">Special Offers</h3>
              </div>
              <button className="text-xs font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded uppercase tracking-wider">Limited Time</button>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {sale.map(product => (
                <ProductCard key={product.id} product={product} onClick={(p) => setScreen('product', p)} showDiscount isSaved={savedLooks.includes(product.id)} onToggleSave={() => toggleSavedLook?.(product.id)} recommendedSize={recommendedSize} />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section (A-Z) */}
        <section className="px-4 pb-8 md:px-4">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-yellow-500 size-5 fill-yellow-500" />
            <h3 className="text-slate-900 text-lg font-bold md:text-xl">All Products</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={(p) => setScreen('product', p)} isSaved={savedLooks.includes(product.id)} onToggleSave={() => toggleSavedLook?.(product.id)} recommendedSize={recommendedSize} />
            ))}
          </div>
        </section>

      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-200 bg-white/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden">
        <NavItem icon={<Home className="size-5 fill-primary" />} label="Home" active />
        <NavItem icon={<Compass className="size-5" />} label="Discover" onClick={() => setScreen('discover')} />
        <div className="relative -top-3 flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 p-1 shadow-lg shadow-slate-900/20">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-900">
              <Accessibility className="size-5 text-white" />
            </div>
          </div>
          <p className="mt-1 text-[8px] font-bold text-slate-900 uppercase tracking-wider">Try-On</p>
        </div>
        <NavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('orders')} />
        <NavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 right-0 h-full w-20 flex-col items-center justify-center gap-8 border-l border-slate-200 bg-white/95 backdrop-blur-xl z-50 py-8">
        <NavItem icon={<Home className="size-6 fill-primary" />} label="Home" active />
        <NavItem icon={<Compass className="size-6" />} label="Shop" onClick={() => setScreen('discover')} />
        <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors">
            <Accessibility className="size-6" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Try-On</p>
        </div>
        <NavItem icon={<ReceiptText className="size-6" />} label="Orders" onClick={() => setScreen('orders')} />
        <NavItem icon={<User className="size-6" />} label="Profile" onClick={() => setScreen('profile')} />
      </nav>
    </div>
  );
}



function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-slate-900' : 'text-slate-400'}`} onClick={onClick}>
      {icon}
      <p className="text-[8px] font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}
