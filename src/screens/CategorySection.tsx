import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Shirt, Footprints, Gamepad2, Baby, Camera, Heart, Home, ShoppingBag, Sparkles, User, Bookmark, Watch, MessageCircle } from 'lucide-react';
import { Screen, Product, Catalog, UserProfile } from '../types';
import ProductCard from '../components/ProductCard';
import { calculateRecommendedSize } from '../utils/sizeCalculator';

export default function CategorySection({ setScreen, category, catalogs, searchQuery, products, searchImage, user }: { setScreen: (s: Screen, p?: Product, c?: Catalog) => void, category: string, catalogs: Catalog[], searchQuery?: string, products: Product[], searchImage?: string | null, user?: UserProfile }) {
  const [activeTab, setActiveTab] = useState('New Arrivals');
  const recommendedSize = calculateRecommendedSize(user?.measurements);

  const getCategoryIcon = () => {
    switch(category) {
      case 'women': return <User className="size-6" />;
      case 'men': return <User className="size-6" />;
      case 'shoes': return <Footprints className="size-6" />;
      case 'accs': return <Watch className="size-6" />;
      default: return <Shirt className="size-6" />;
    }
  };

  const getCategoryTitle = () => {
    if (searchImage) return "Visual Search Results";
    if (searchQuery) return `Search: "${searchQuery}"`;
    switch(category) {
      case 'women': return "Women's Collection";
      case 'men': return "Men's Collection";
      case 'shoes': return "Footwear";
      case 'accs': return "Accessories";
      case 'discover': return "Discover New Styles";
      default: return "Collection";
    }
  };

  const getSearchResults = () => {
    if (searchImage) {
      // Mock visual search: return all products for now
      return products; 
    }
    if (searchQuery) {
      return products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  };

  const getCategoryCards = () => {
    let filtered = catalogs.filter(c => c.parentCategory === category);
    
    if (searchQuery && searchQuery.trim() !== '') {
      filtered = catalogs.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.parentCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (category === 'discover') {
      filtered = catalogs; // Show all in discover if no search
    }

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
    switch(category) {
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
    switch(category) {
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
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden mx-auto bg-slate-50 border-x border-slate-200 shadow-2xl text-slate-900">
      {!searchQuery && !searchImage && (
        <nav className="flex px-4 gap-6 overflow-x-auto no-scrollbar bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
          <TabItem label="New Arrivals" active={activeTab === 'New Arrivals'} onClick={() => setActiveTab('New Arrivals')} />
          <TabItem label="Best Sellers" active={activeTab === 'Best Sellers'} onClick={() => setActiveTab('Best Sellers')} />
          <TabItem label="Trending" active={activeTab === 'Trending'} onClick={() => setActiveTab('Trending')} />
          <TabItem label="Sale" isSale active={activeTab === 'Sale'} onClick={() => setActiveTab('Sale')} />
        </nav>
      )}

      <main className="flex-1 overflow-y-auto pb-24">
        {(searchQuery || searchImage) ? (
          <section className="p-4">
             {searchImage && (
               <div className="mb-6 flex flex-col items-center">
                 <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-primary mb-2">
                   <img src={searchImage} alt="Uploaded" className="w-full h-full object-cover" />
                 </div>
                 <p className="text-xs text-slate-400">Searching for similar items...</p>
               </div>
             )}
             
             <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
               {getSearchResults().map(p => (
                 <ProductGridItem key={p.id} product={p} onClick={(p) => setScreen('product', p)} recommendedSize={recommendedSize} />
               ))}
             </div>
             {getSearchResults().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">No products found.</p>
                </div>
             )}
          </section>
        ) : (
          <>
            <section className="p-4">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100 mb-6 flex items-center justify-between px-6 border border-slate-200">
                <div className="relative z-10">
                  <span className="inline-block px-2 py-1 bg-white/50 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-900 border border-slate-200">New Season</span>
                  <h2 className="text-3xl font-black italic tracking-tighter leading-none mb-1 text-slate-900">SUMMER<br/>VIBES</h2>
                  <button onClick={() => setScreen('discover')} className="mt-3 px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-full cursor-pointer">Shop Now</button>
                </div>
                <div 
                  className="absolute right-0 bottom-0 w-1/2 h-full bg-cover bg-center opacity-80" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800')` }}
                ></div>
              </div>
            </section>

            <section className="px-4 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold tracking-tight">Shop by Category</h2>
                <button onClick={() => setScreen('discover')} className="text-sm font-semibold text-primary cursor-pointer">View All</button>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
              <div className="bg-primary/10 rounded-2xl p-4 border border-primary/10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-primary size-5" />
                  <h3 className="text-lg font-bold">{activeTab} in {getCategoryTitle()}</h3>
                </div>
                <div className="flex gap-4 overflow-x-auto no-scrollbar">
                  {getTrendingItems().map((item) => (
                    <TrendingItem 
                      key={item.id}
                      product={item}
                      onClick={(p) => setScreen('product', p)}
                      recommendedSize={recommendedSize}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full border-t border-slate-200 bg-slate-50/90 backdrop-blur-xl z-[60]">
        <div className="flex gap-2 px-4 pb-6 pt-3">
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

function ProductGridItem({ product, onClick, recommendedSize }: { product: Product, onClick?: (p: Product) => void, recommendedSize?: string | null }) {
  return (
    <ProductCard product={product} onClick={onClick} recommendedSize={recommendedSize} />
  );
}

function TabItem({ label, active, isSale, onClick }: { label: string, active?: boolean, isSale?: boolean, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 cursor-pointer ${active ? 'border-primary text-primary' : 'border-transparent text-slate-500'} ${isSale ? 'text-red-500' : ''}`}
    >
      <span className="text-sm font-bold whitespace-nowrap">{label}</span>
    </div>
  );
}

function CategoryCard({ image, name, items }: { image: string, name: string, items: string }) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer">
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

function TrendingItem({ product, onClick, recommendedSize }: { product: Product, onClick?: (p: Product) => void, recommendedSize?: string | null }) {
  return (
    <div className="flex-none w-40" onClick={() => onClick?.(product)}>
      <ProductCard product={product} recommendedSize={recommendedSize} />
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-500'}`} onClick={onClick}>
      {icon}
      <p className="text-[10px] font-medium">{label}</p>
    </div>
  );
}
