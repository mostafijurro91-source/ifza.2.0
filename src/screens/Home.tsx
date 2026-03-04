import React from 'react';
import { motion } from 'motion/react';
import { Search, Camera, Menu, ShoppingBag, Zap, Heart, Accessibility, Home, Compass, ReceiptText, User, ChevronLeft } from 'lucide-react';
import { Screen, Product } from '../types';

export default function HomeDashboard({ setScreen, cartCount }: { setScreen: (s: Screen, p?: Product) => void, cartCount: number }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10 md:hidden">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <Menu className="text-primary size-6 cursor-pointer" />
        </div>
        <h1 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center font-black italic">IFZA</h1>
        <div className="flex size-12 items-center justify-end gap-3 relative">
          <div className="relative">
            <ShoppingBag className="text-primary size-6 cursor-pointer" onClick={() => setScreen('cart')} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-blue text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-6 md:gap-10 pb-8">
        <div className="px-4 pt-4 md:pt-10 max-w-4xl mx-auto w-full">
          <div className="flex w-full items-stretch rounded-2xl h-14 bg-surface-dark/50 border border-primary/20 shadow-lg shadow-black/20 focus-within:border-primary transition-all">
            <div className="flex items-center justify-center pl-5">
              <Search className="text-primary/60 size-5" />
            </div>
            <input
              className="flex w-full border-none bg-transparent focus:outline-none text-white placeholder:text-slate-500 px-4 text-base font-normal"
              placeholder="Search for styles or virtual try-on..."
            />
            <div className="flex items-center justify-center pr-5 border-l border-white/5 ml-2 hover:bg-white/5 transition-colors rounded-r-2xl cursor-pointer">
              <Camera className="text-accent-blue size-5" />
            </div>
          </div>
        </div>

        <div className="px-4">
          <div
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-orange-600 shadow-2xl shadow-primary/20 max-w-7xl mx-auto w-full min-h-[350px] md:min-h-[500px]"
          >
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 z-0 transition-transform duration-1000 hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(242, 127, 13, 1) 0%, rgba(242, 127, 13, 0.8) 40%, rgba(242, 127, 13, 0) 100%), url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1600")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div className="relative z-10 flex flex-col md:flex-row h-full items-center px-8 md:px-16 py-12 md:py-0">
              <div className="flex flex-col gap-4 md:gap-6 max-w-xl md:w-1/2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-block w-fit rounded-full bg-white/25 px-5 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur-md"
                >
                  Season Arrival 2026
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-8xl font-black italic tracking-tighter text-white leading-[0.85] uppercase"
                >
                  Neon <br /> Flash <br /> Sale
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm md:text-xl font-bold text-white/90 max-w-md"
                >
                  UP TO 70% OFF + FREE SHIPPING ON OUR EXCLUSIVE PREMIUM COLLECTIONS.
                </motion.p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={() => setScreen('discover')}
                    className="rounded-2xl bg-white px-10 py-4 text-xs md:text-sm font-black uppercase tracking-widest text-primary shadow-2xl hover:bg-slate-100 transition-all active:scale-95 group flex items-center gap-2"
                  >
                    Shop Now
                    <Zap className="size-4 fill-primary group-hover:animate-pulse" />
                  </button>
                  <button
                    onClick={() => setScreen('discover')}
                    className="rounded-2xl bg-background-dark/40 px-8 py-4 text-xs md:text-sm font-black uppercase tracking-widest text-white backdrop-blur-md border border-white/20 hover:bg-white/10 transition-all active:scale-95"
                  >
                    View All
                  </button>
                </div>
              </div>

              {/* Desktop Decorative Element */}
              <div className="hidden md:flex flex-1 justify-end items-center relative h-full">
                <div className="relative">
                  <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full animate-pulse"></div>
                  <div className="relative glass h-80 w-80 rounded-[3rem] border-white/10 flex items-center justify-center rotate-12 transition-transform hover:rotate-6">
                    <Accessibility className="size-40 text-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto w-full pt-6">
          <div className="flex items-center justify-between px-4 mb-6 md:mb-10">
            <h3 className="text-white text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">Browse Categories</h3>
            <button
              onClick={() => setScreen('discover')}
              className="text-xs md:text-sm font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors border-b-2 border-primary/20 pb-1"
            >
              See Everything
            </button>
          </div>
          <div className="flex gap-4 md:gap-8 overflow-x-auto md:overflow-visible px-4 pb-4 no-scrollbar md:grid md:grid-cols-5">
            {[
              { id: 'women', label: 'Women', icon: '👗', color: 'from-pink-500/20' },
              { id: 'men', label: 'Men', icon: '👔', color: 'from-blue-500/20' },
              { id: 'baby', label: 'Baby', icon: '👶', color: 'from-yellow-500/20' },
              { id: 'shoes', label: 'Shoes', icon: '👟', color: 'from-green-500/20' },
              { id: 'accs', label: 'Accessories', icon: '⌚', color: 'from-purple-500/20' }
            ].map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col items-center gap-4 group shrink-0 cursor-pointer w-32 md:w-full"
                onClick={() => setScreen(cat.id as Screen)}
              >
                <div className={`glass flex aspect-square w-full items-center justify-center rounded-[2.5rem] border-primary/10 bg-gradient-to-br ${cat.color} to-transparent group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500 shadow-xl`}>
                  <span className="text-4xl md:text-6xl group-hover:scale-125 transition-transform duration-500 drop-shadow-2xl">
                    {cat.icon}
                  </span>
                </div>
                <p className="text-xs md:text-sm font-black text-slate-400 group-hover:text-white transition-colors uppercase tracking-[0.2em]">{cat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface-dark/20 py-10 md:py-16">
          <div className="max-w-7xl mx-auto w-full px-4">
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-accent-blue/10 rounded-xl flex items-center justify-center">
                  <Zap className="text-accent-blue size-6 fill-accent-blue" />
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-black italic uppercase tracking-tighter">Trending Now</h3>
              </div>
              <div className="hidden md:flex gap-2">
                <button className="size-10 border border-white/5 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-white"><ChevronLeft className="size-5" /></button>
                <button className="size-10 border border-white/5 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors text-white rotate-180"><ChevronLeft className="size-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              <TrendingItem
                product={{
                  id: 'trending-1',
                  name: 'Premium Jamdani Saree',
                  price: 4500,
                  originalPrice: 5500,
                  image: "https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400",
                  category: 'Women',
                  isVirtualReady: true
                }}
                onClick={(p) => setScreen('product', p)}
              />
              <TrendingItem
                product={{
                  id: 'trending-2',
                  name: 'Designer Panjabi',
                  price: 2450,
                  image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400",
                  category: 'Men',
                  isVirtualReady: true
                }}
                onClick={(p) => setScreen('product', p)}
              />
              <div className="hidden md:block">
                <TrendingItem
                  product={{
                    id: 'trending-3',
                    name: 'Leather Oxford Shoes',
                    price: 3200,
                    image: "https://images.unsplash.com/photo-1614252235316-02015ea26d18?auto=format&fit=crop&q=80&w=400",
                    category: 'Shoes',
                    isVirtualReady: true
                  }}
                  onClick={(p) => setScreen('product', p)}
                />
              </div>
              <div className="hidden lg:block">
                <TrendingItem
                  product={{
                    id: 'trending-4',
                    name: 'Elite Gold Watch',
                    price: 12500,
                    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=400",
                    category: 'Accessories',
                    isVirtualReady: false
                  }}
                  onClick={(p) => setScreen('product', p)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-primary/10 bg-background-dark/95 px-4 pb-8 pt-4 backdrop-blur-xl md:hidden">
        <NavItem icon={<Home className="size-5 fill-primary" />} label="Home" active />
        <NavItem icon={<Compass className="size-5" />} label="Discover" onClick={() => setScreen('discover')} />
        <div className="relative -top-6 flex flex-col items-center gap-1 cursor-pointer" onClick={() => setScreen('try-on')}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-accent-blue p-1 shadow-xl shadow-primary/30">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background-dark">
              <Accessibility className="size-8 text-white" />
            </div>
          </div>
          <p className="mt-1 text-[10px] font-bold text-primary uppercase tracking-wider">Try-On</p>
        </div>
        <NavItem icon={<ReceiptText className="size-5" />} label="Orders" onClick={() => setScreen('orders')} />
        <NavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
      </nav>
    </div>
  );
}

function TrendingItem({ product, onClick }: { product: Product, onClick?: (p: Product) => void }) {
  return (
    <div className="flex flex-col gap-2 cursor-pointer" onClick={() => onClick?.(product)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-surface-dark">
        <img className="h-full w-full object-cover" src={product.image} alt={product.name} referrerPolicy="no-referrer" />
        <button className="absolute top-2 right-2 glass flex h-8 w-8 items-center justify-center rounded-full text-white">
          <Heart className="size-4" />
        </button>
        {product.isVirtualReady && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-accent-blue/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            <Accessibility className="size-3" />
            AR TRY-ON
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-white truncate">{product.name}</p>
        <p className="text-xs text-primary font-bold">৳{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-400'}`} onClick={onClick}>
      {icon}
      <p className="text-[10px] font-bold uppercase tracking-wider">{label}</p>
    </div>
  );
}
