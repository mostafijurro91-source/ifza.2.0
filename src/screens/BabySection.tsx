import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Shirt, Footprints, Gamepad2, Baby, Camera, Heart, Home, ShoppingBag, Sparkles, User, Bookmark, Star, MessageCircle } from 'lucide-react';
import { Screen, Product, Catalog } from '../types';

export default function BabySection({ setScreen, products = [], catalogs = [] }: { setScreen: (s: Screen, p?: Product, c?: Catalog) => void, products?: Product[], catalogs?: Catalog[] }) {
  const [activeTab, setActiveTab] = useState('Newborn');

  // Filter products for baby category
  const babyProducts = products.filter(p => p.category === 'baby' || p.category === 'Baby');
  const babyCatalogs = catalogs.filter(c => c.parentCategory === 'baby');

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden mx-auto bg-slate-50 border-x border-slate-200 shadow-2xl text-slate-900">
      <nav className="flex px-4 gap-6 overflow-x-auto no-scrollbar border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <TabItem label="Newborn" active={activeTab === 'Newborn'} onClick={() => setActiveTab('Newborn')} />
        <TabItem label="Infant" active={activeTab === 'Infant'} onClick={() => setActiveTab('Infant')} />
        <TabItem label="Toddler" active={activeTab === 'Toddler'} onClick={() => setActiveTab('Toddler')} />
        <TabItem label="Sale" active={activeTab === 'Sale'} isSale onClick={() => setActiveTab('Sale')} />
      </nav>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        <section className="flex w-full overflow-x-auto no-scrollbar px-4 py-6 gap-5">
          <CategoryBubble icon={<Shirt className="text-blue-500" />} label="Clothing" bgColor="bg-blue-900/30" borderColor="border-blue-800" onClick={() => setScreen('discover')} />
          <CategoryBubble icon={<Footprints className="text-rose-500" />} label="Footwear" bgColor="bg-rose-900/30" borderColor="border-rose-800" onClick={() => setScreen('discover')} />
          <CategoryBubble icon={<Gamepad2 className="text-orange-500" />} label="Toys" bgColor="bg-orange-900/30" borderColor="border-orange-800" onClick={() => setScreen('discover')} />
          <CategoryBubble icon={<Baby className="text-emerald-500" />} label="Gear" bgColor="bg-emerald-900/30" borderColor="border-emerald-800" onClick={() => setScreen('discover')} />
          <CategoryBubble icon={<Baby className="text-purple-500" />} label="Care" bgColor="bg-purple-900/30" borderColor="border-purple-800" onClick={() => setScreen('discover')} />
        </section>

        <section className="px-4 mb-6">
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-primary/10 border border-primary/20 flex items-center">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-r from-primary to-orange-300"></div>
            <div className="relative z-10 p-6 w-2/3">
              <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-widest text-primary mb-2">AI Powered</span>
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">Virtual Baby Fit</h2>
              <p className="text-sm text-slate-100 mb-4">Try outfits, glasses & toys on your baby virtually.</p>
              <button 
                onClick={() => setScreen('try-on')}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20"
              >
                Try It Now <Camera className="size-4" />
              </button>
            </div>
            <div 
              className="absolute right-0 bottom-0 w-1/3 h-full bg-cover bg-center" 
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlkTO80W23a9q9sce6A-cuGQCPreO63roLw4cUbaQygW8IMLd-h1lv3ckUSpl_RQ1Atfi5Ritu2T-81tHWsEBnOh41mkzmbYieuAV7wRiF2qSob2OBGCr83JOTLoRLZJ0WbAxqu-0MXWgTaYX2mPPxAFuKefp1HpDrUkOZw2UL324qv1b6sTd6w7MCEBx-OMOT5wimq-LqvWeEk7bnXAv72WloDk8auh3Y4tWMUPT6jukdp-jLZEHcJ61oMKKhzZG63d_oGOIt2q7G')` }}
            ></div>
          </div>
        </section>

        <section className="px-4 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold tracking-tight">Shop by Category</h2>
            <button onClick={() => setScreen('discover')} className="text-sm font-semibold text-primary cursor-pointer">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {babyCatalogs.length > 0 ? (
              babyCatalogs.map(catalog => (
                <CategoryCard 
                  key={catalog.id}
                  image={catalog.image}
                  name={catalog.name}
                  items={`${Math.floor(Math.random() * 50) + 10} Items`}
                  onClick={() => setScreen('catalog-products', undefined, catalog)}
                />
              ))
            ) : (
              <div className="col-span-2 text-center text-slate-500 py-4">No categories found</div>
            )}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="bg-primary/10 rounded-2xl p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-primary size-5" />
              <h3 className="text-lg font-bold">Trending in Baby</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {babyProducts.length > 0 ? (
                babyProducts.map(product => (
                  <TrendingBabyItem 
                    key={product.id}
                    product={product}
                    onClick={(p) => setScreen('product', p)}
                  />
                ))
              ) : (
                 <div className="text-slate-500 py-4">No trending items</div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full border-t border-slate-200 bg-slate-50/90 backdrop-blur-xl z-[60]">
        <div className="flex gap-2 px-4 pb-6 pt-3">
          <BabyNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
          <BabyNavItem icon={<ShoppingBag className="size-5 fill-primary" />} label="Shop" active />
          <BabyNavItem icon={<Camera className="size-5" />} label="Try-On" onClick={() => setScreen('try-on')} />
          <BabyNavItem icon={<Heart className="size-5" />} label="Wishlist" />
          <BabyNavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
        </div>
      </footer>
    </div>
  );
}

function TabItem({ label, active, isSale, onClick }: { label: string, active?: boolean, isSale?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 transition-colors ${active ? 'border-primary text-primary' : 'border-transparent text-slate-500'} ${isSale ? 'text-primary/80' : ''}`}
    >
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </button>
  );
}

function CategoryBubble({ icon, label, bgColor, borderColor, onClick }: { icon: React.ReactNode, label: string, bgColor: string, borderColor: string, onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer" onClick={onClick}>
      <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center border-2 ${borderColor} hover:scale-105 transition-transform`}>
        {icon}
      </div>
      <p className="text-[13px] font-medium text-slate-600">{label}</p>
    </div>
  );
}

function CategoryCard({ image, name, items, onClick }: { image: string, name: string, items: string, onClick?: () => void }) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer" onClick={onClick}>
      <div className="aspect-[4/5] bg-slate-100 flex items-center justify-center relative">
        <img src={image} alt={name} className="object-cover w-full h-full" referrerPolicy="no-referrer" />
        <button className="absolute top-2 right-2 size-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
          <Heart className="size-4 text-slate-500" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs text-slate-500">{items}</p>
      </div>
    </div>
  );
}

function TrendingBabyItem({ product, onClick }: { product: Product, onClick?: (p: Product) => void }) {
  return (
    <div className="flex-none w-40 bg-white border border-slate-200 rounded-lg p-2 cursor-pointer" onClick={() => onClick?.(product)}>
      <div className="w-full aspect-square rounded-md bg-slate-100 mb-2 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <p className="text-xs font-bold truncate">{product.name}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-primary">৳{product.price.toFixed(2)}</p>
        <div className="flex items-center gap-0.5">
          <Star className="size-3 text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-bold text-slate-500">{product.rating || 0}</span>
        </div>
      </div>
    </div>
  );
}

function BabyNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-500'}`} onClick={onClick}>
      {icon}
      <p className="text-[10px] font-medium">{label}</p>
    </div>
  );
}
