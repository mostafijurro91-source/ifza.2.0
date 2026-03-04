import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Shirt, Footprints, Gamepad2, Baby, Camera, Heart, Home, ShoppingBag, Sparkles, User, Bookmark } from 'lucide-react';
import { Screen, Product } from '../types';

export default function BabySection({ setScreen }: { setScreen: (s: Screen, p?: Product) => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-dark text-white">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-white/5 md:hidden">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => setScreen('home')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-800 transition-colors cursor-pointer text-primary">
            <ChevronLeft className="size-6" />
          </button>
          <h1 className="text-lg font-black italic tracking-tighter uppercase flex-1 text-center">Baby Boutique</h1>
          <div className="flex size-10 items-center justify-end">
            <Search className="size-6 text-primary" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 pt-6 md:pt-12 pb-32">
        {/* Baby Hero Section for Desktop/Mobile */}
        <section className="mb-10 md:mb-16">
          <div className="relative w-full min-h-[250px] md:min-h-[400px] rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-primary to-orange-400 flex items-center shadow-2xl shadow-primary/10">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 p-8 md:p-16 md:w-1/2">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white mb-4"
              >
                AI Virtual Try-On
              </motion.span>
              <h2 className="text-4xl md:text-7xl font-black italic text-white mb-4 leading-none uppercase tracking-tighter">Your Baby <br /> In 3D</h2>
              <p className="text-sm md:text-lg font-bold text-white/90 mb-8 max-w-sm">Try on clothes, cute glasses, and interactive toys virtually for your little one.</p>
              <button
                onClick={() => setScreen('try-on')}
                className="bg-white text-primary px-10 py-4 rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest flex items-center gap-3 active:scale-95 transition-all shadow-xl hover:bg-slate-50"
              >
                Enter Virtual Room <Camera className="size-5" />
              </button>
            </div>
            <div
              className="hidden md:block absolute right-0 top-0 w-1/2 h-full bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent"></div>
            </div>
          </div>
        </section>

        <section className="mb-12 md:mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase leading-none">Shop by Category</h2>
              <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-widest mt-2">Essential collections for infants & toddlers</p>
            </div>
            <button
              onClick={() => setScreen('discover')}
              className="text-xs md:text-sm font-black uppercase tracking-widest text-primary border-b-2 border-primary/20 pb-1"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
            <CategoryCard
              image="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400"
              name="Baby Panjabi"
              items="124 Items"
              onClick={() => setScreen('discover')}
            />
            <CategoryCard
              image="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400"
              name="Baby Frock"
              items="86 Items"
              onClick={() => setScreen('discover')}
            />
            <CategoryCard
              image="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400"
              name="Soft Toys"
              items="340 Items"
              onClick={() => setScreen('discover')}
            />
            <CategoryCard
              image="https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&q=80&w=400"
              name="Baby Accessories"
              items="156 Items"
              onClick={() => setScreen('discover')}
            />
          </div>
        </section>

        <section className="bg-primary/5 rounded-[3rem] p-8 md:p-16 border border-primary/10 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
            <div className="flex items-center gap-4">
              <div className="size-14 bg-primary/20 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="text-primary size-8" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black italic tracking-tighter uppercase">Trending Picks</h3>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
            <TrendingBabyItem
              product={{
                id: 'baby-1',
                name: 'Neon Cotton Panjabi',
                price: 850,
                image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400",
                category: 'Baby',
                isVirtualReady: true
              }}
              onClick={(p) => setScreen('product', p)}
            />
            <TrendingBabyItem
              product={{
                id: 'baby-2',
                name: 'Princess Floral Frock',
                price: 1250,
                image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400",
                category: 'Baby',
                isVirtualReady: true
              }}
              onClick={(p) => setScreen('product', p)}
            />
            <div className="hidden md:block">
              <TrendingBabyItem
                product={{
                  id: 'baby-3',
                  name: 'Snuggle Teddy Bot',
                  price: 650,
                  image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400",
                  category: 'Baby',
                  isVirtualReady: false
                }}
                onClick={(p) => setScreen('product', p)}
              />
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 md:hidden">
        <div className="flex gap-2 px-4 pb-8 pt-4">
          <BabyNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
          <BabyNavItem icon={<ShoppingBag className="size-5 fill-primary" />} label="Shop" active />
          <BabyNavItem icon={<Camera className="size-5" />} label="Try-On" onClick={() => setScreen('try-on')} />
          <BabyNavItem icon={<Heart className="size-5" />} label="Wishlist" />
          <BabyNavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
        </div>
      </nav>
    </div>
  );
}

function CategoryCard({ image, name, items, onClick }: { image: string, name: string, items: string, onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-white/5 cursor-pointer shadow-xl transition-all hover:border-primary/30"
    >
      <div className="aspect-[4/5] bg-slate-800 flex items-center justify-center relative overflow-hidden">
        <img src={image} alt={name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <button className="absolute top-4 right-4 size-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
          <Heart className="size-5 text-white/50 hover:text-red-500 transition-colors" />
        </button>
      </div>
      <div className="p-5">
        <p className="text-base md:text-xl font-black italic uppercase tracking-tighter text-white">{name}</p>
        <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{items}</p>
      </div>
    </div>
  );
}

function TrendingBabyItem({ product, onClick }: { product: Product, onClick?: (p: Product) => void }) {
  return (
    <div className="group flex flex-col gap-4 cursor-pointer" onClick={() => onClick?.(product)}>
      <div className="relative aspect-square rounded-[2rem] bg-slate-800 overflow-hidden border border-white/5 shadow-2xl">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {product.isVirtualReady && (
          <div className="absolute bottom-3 left-3 bg-accent-blue text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
            <Sparkles className="size-2" />
            AR Ready
          </div>
        )}
      </div>
      <div className="px-1">
        <p className="text-sm font-black italic uppercase tracking-tighter text-white truncate">{product.name}</p>
        <p className="text-sm font-black text-primary mt-1">৳{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

function BabyNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${active ? 'text-primary font-black' : 'text-slate-500 hover:text-white'}`} onClick={onClick}>
      {icon}
      <p className="text-[10px] font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
}
