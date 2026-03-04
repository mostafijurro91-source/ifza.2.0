import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Shirt, Footprints, Gamepad2, Baby, Camera, Heart, Home, ShoppingBag, Sparkles, User, Bookmark, Watch } from 'lucide-react';
import { Screen, Product, Catalog } from '../types';

export default function CategorySection({ setScreen, category, catalogs }: { setScreen: (s: Screen, p?: Product, c?: Catalog) => void, category: string, catalogs: Catalog[] }) {
  const [activeTab, setActiveTab] = useState('New Arrivals');
  const getCategoryIcon = () => {
    switch (category) {
      case 'women': return <User className="size-6" />;
      case 'men': return <User className="size-6" />;
      case 'shoes': return <Footprints className="size-6" />;
      case 'accs': return <Watch className="size-6" />;
      default: return <Shirt className="size-6" />;
    }
  };

  const getCategoryTitle = () => {
    switch (category) {
      case 'women': return "Women's Collection";
      case 'men': return "Men's Collection";
      case 'shoes': return "Footwear";
      case 'accs': return "Accessories";
      case 'discover': return "Discover New Styles";
      default: return "Collection";
    }
  };

  const getCategoryCards = () => {
    const filtered = catalogs.filter(c => c.parentCategory === category);
    if (filtered.length > 0) {
      return filtered.map(c => ({
        id: c.id,
        name: c.name,
        items: 'View Items',
        image: c.image,
        catalog: c
      }));
    }

    // Fallback if no dynamic catalogs
    switch (category) {
      case 'women': return [
        { id: 'w1', name: 'Sarees', items: '342 Items', image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400' },
        { id: 'w2', name: 'Salwar Kameez', items: '215 Items', image: 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400' }
      ];
      case 'men': return [
        { id: 'm1', name: 'Panjabis', items: '184 Items', image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400' },
        { id: 'm2', name: 'Shirts', items: '420 Items', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400' }
      ];
      case 'shoes': return [
        { id: 's1', name: 'Traditional Nagra', items: '86 Items', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400' },
        { id: 's2', name: 'Sandals', items: '154 Items', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400' }
      ];
      case 'accs': return [
        { id: 'a1', name: 'Jewelry', items: '520 Items', image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400' },
        { id: 'a2', name: 'Bags', items: '210 Items', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400' }
      ];
      default: return [
        { id: 'd1', name: 'New Arrivals', items: '124 Items', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400' },
        { id: 'd2', name: 'Best Sellers', items: '86 Items', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400' }
      ];
    }
  };

  const getTrendingItems = () => {
    let items: Product[] = [];
    switch (category) {
      case 'women': items = [
        { id: 'w1', name: 'Dhakai Jamdani Saree', price: 4500, image: 'https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400', category: 'women', isVirtualReady: true },
        { id: 'w2', name: 'Embroidered Kurti', price: 1250, image: 'https://images.unsplash.com/photo-1583391733958-d15f07011438?auto=format&fit=crop&q=80&w=400', category: 'women', isVirtualReady: true }
      ]; break;
      case 'men': items = [
        { id: 'm1', name: 'Premium Silk Panjabi', price: 2500, image: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17?auto=format&fit=crop&q=80&w=400', category: 'men', isVirtualReady: true },
        { id: 'm2', name: 'Cotton Casual Shirt', price: 850, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=400', category: 'men', isVirtualReady: true }
      ]; break;
      case 'shoes': items = [
        { id: 's1', name: 'Leather Sandal', price: 1200, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400', category: 'shoes', isVirtualReady: true },
        { id: 's2', name: 'Traditional Nagra', price: 950, image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', category: 'shoes', isVirtualReady: true }
      ]; break;
      case 'accs': items = [
        { id: 'a1', name: 'Gold Plated Necklace', price: 3500, image: 'https://images.unsplash.com/photo-1599643478524-fb66f70d00f0?auto=format&fit=crop&q=80&w=400', category: 'accs', isVirtualReady: true },
        { id: 'a2', name: 'Leather Handbag', price: 2200, image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400', category: 'accs', isVirtualReady: true }
      ]; break;
      default: items = [
        { id: 'd1', name: 'Classic Tee', price: 450, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=400', category: 'discover', isVirtualReady: true },
        { id: 'd2', name: 'Denim Jacket', price: 1850, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=400', category: 'discover', isVirtualReady: true }
      ]; break;
    }

    if (activeTab === 'Sale') {
      return items.map(item => ({ ...item, originalPrice: item.price * 1.5, price: item.price }));
    } else if (activeTab === 'Best Sellers') {
      return [...items].reverse();
    } else if (activeTab === 'Trending') {
      return items.map(item => ({ ...item, name: `Trending ${item.name}` }));
    }
    return items;
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between max-w-7xl mx-auto w-full">
          <button onClick={() => setScreen('home')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-800 transition-colors cursor-pointer">
            <ChevronLeft className="size-6" />
          </button>
          <h1 className="text-lg md:text-2xl font-black italic tracking-tighter flex-1 text-center uppercase">{getCategoryTitle()}</h1>
          <div className="flex size-10 items-center justify-center rounded-full hover:bg-slate-800 transition-colors cursor-pointer">
            <Search className="size-6" />
          </div>
        </div>
        <nav className="flex px-4 gap-6 overflow-x-auto no-scrollbar max-w-7xl mx-auto w-full justify-start md:justify-center border-t border-white/5 md:border-none">
          <TabItem label="New Arrivals" active={activeTab === 'New Arrivals'} onClick={() => setActiveTab('New Arrivals')} />
          <TabItem label="Best Sellers" active={activeTab === 'Best Sellers'} onClick={() => setActiveTab('Best Sellers')} />
          <TabItem label="Trending" active={activeTab === 'Trending'} onClick={() => setActiveTab('Trending')} />
          <TabItem label="Sale" isSale active={activeTab === 'Sale'} onClick={() => setActiveTab('Sale')} />
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 max-w-7xl mx-auto w-full">
        <section className="p-4">
          <div className="relative w-full h-48 md:h-80 rounded-3xl overflow-hidden bg-slate-800 mb-6 flex items-center justify-between px-6 md:px-16">
            <div className="relative z-10 max-w-md">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] md:text-sm font-bold uppercase tracking-widest mb-3 text-white">New Season</span>
              <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none mb-3 text-white">SUMMER<br />VIBES</h2>
              <button
                onClick={() => setScreen('discover')}
                className="mt-4 px-8 py-3 bg-white text-slate-900 text-xs md:text-sm font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform active:scale-95 shadow-xl"
              >
                Shop Now
              </button>
            </div>
            <div
              className="absolute right-0 bottom-0 w-full md:w-2/3 h-full bg-cover bg-center opacity-40 md:opacity-100"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-transparent to-transparent hidden md:block"></div>
            </div>
          </div>
        </section>

        <section className="px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">Shop by Category</h2>
            <a className="text-sm font-semibold text-primary hover:underline" href="#">View All</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
            {getCategoryCards().map((card) => (
              <div key={card.id} onClick={() => card.catalog ? setScreen('catalog-products', undefined, card.catalog) : null}>
                <CategoryCard
                  image={card.image}
                  name={card.name}
                  items={card.items}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="bg-primary/5 rounded-3xl p-6 md:p-10 border border-primary/10">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-primary size-6" />
              <h3 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">{activeTab} in {getCategoryTitle()}</h3>
            </div>
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-4 no-scrollbar">
              {getTrendingItems().map((item) => (
                <TrendingItem
                  key={item.id}
                  product={item}
                  onClick={(p) => setScreen('product', p)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl z-[60] md:hidden">
        <div className="flex gap-2 px-4 pb-8 pt-4">
          <NavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
          <NavItem icon={<ShoppingBag className="size-5 fill-primary" />} label="Shop" active />
          <NavItem icon={<Camera className="size-5" />} label="Try-On" onClick={() => setScreen('try-on')} />
          <NavItem icon={<Heart className="size-5" />} label="Wishlist" />
          <NavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
        </div>
      </footer>
    </div>
  );
}

function TabItem({ label, active, isSale, onClick }: { label: string, active?: boolean, isSale?: boolean, onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 cursor-pointer ${active ? 'border-primary text-primary' : 'border-transparent text-slate-400'} ${isSale ? 'text-red-500' : ''}`}
    >
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </div>
  );
}

function CategoryCard({ image, name, items }: { image: string, name: string, items: string }) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 cursor-pointer">
      <div className="aspect-[4/5] bg-slate-800 flex items-center justify-center relative">
        <img src={image} alt={name} className="object-cover w-full h-full" referrerPolicy="no-referrer" />
        <button className="absolute top-2 right-2 size-8 bg-slate-800/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
          <Heart className="size-4 text-slate-400" />
        </button>
      </div>
      <div className="p-3">
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs text-slate-400">{items}</p>
      </div>
    </div>
  );
}

function TrendingItem({ product, onClick }: { product: Product, onClick?: (p: Product) => void }) {
  return (
    <div className="flex-none w-40 bg-slate-800 rounded-lg p-2 cursor-pointer" onClick={() => onClick?.(product)}>
      <div className="w-full aspect-square rounded-md bg-slate-700 mb-2 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <p className="text-xs font-bold truncate">{product.name}</p>
      <p className="text-sm font-bold text-primary">
        ৳{product.price.toFixed(2)}
        {product.originalPrice && <span className="text-[10px] text-slate-500 line-through ml-1">৳{product.originalPrice.toFixed(2)}</span>}
      </p>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-400'}`} onClick={onClick}>
      {icon}
      <p className="text-[10px] font-medium">{label}</p>
    </div>
  );
}
