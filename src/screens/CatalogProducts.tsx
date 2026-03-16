import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Filter, MessageCircle } from 'lucide-react';
import { Screen, Product, Catalog, UserProfile } from '../types';
import ProductCard from '../components/ProductCard';
import { calculateRecommendedSize } from '../utils/sizeCalculator';

export default function CatalogProducts({ setScreen, goBack, catalog, products, user }: { setScreen: (s: Screen, p?: Product) => void, goBack: () => void, catalog: Catalog | null, products: Product[], user?: UserProfile }) {
  if (!catalog) return null;

  const recommendedSize = calculateRecommendedSize(user?.measurements);
  const catalogProducts = products.filter(p => p.catalogId === catalog.id);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden mx-auto bg-slate-50 border-x border-slate-200 shadow-2xl text-slate-900">
      <header className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 p-4 flex items-center gap-4">
        <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-bold">{catalog.name}</h1>
      </header>
      <main className="flex-1 p-4 pb-24">
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500 text-sm">{catalogProducts.length} items found</p>
          <button className="flex items-center gap-2 text-sm font-medium bg-white border border-slate-200 shadow-sm px-3 py-1.5 rounded-full">
            <Filter className="size-4" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {catalogProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={(p) => setScreen('product', p)}
              recommendedSize={recommendedSize}
            />
          ))}
          {catalogProducts.length === 0 && (
            <div className="col-span-2 text-center py-12 text-slate-400">
              No products found in this catalog.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
