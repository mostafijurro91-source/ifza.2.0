import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Search, Filter } from 'lucide-react';
import { Screen, Product, Catalog } from '../types';

export default function CatalogProducts({ setScreen, catalog, products }: { setScreen: (s: Screen, p?: Product) => void, catalog: Catalog | null, products: Product[] }) {
  if (!catalog) return null;

  const catalogProducts = products.filter(p => p.catalogId === catalog.id);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-[430px] mx-auto bg-background-light dark:bg-background-dark border-x border-slate-200 dark:border-slate-800 shadow-2xl text-slate-900 dark:text-white transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => setScreen(catalog.parentCategory as Screen)} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <ChevronLeft className="size-6" />
          </button>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center">{catalog.name}</h1>
          <div className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <Search className="size-6" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-24">
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-400 text-sm">{catalogProducts.length} items found</p>
          <button className="flex items-center gap-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
            <Filter className="size-4" />
            Filter
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {catalogProducts.map(product => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setScreen('product', product)}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white truncate">{product.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-primary">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">৳{product.originalPrice}</span>
                )}
              </div>
            </div>
          ))}
          {catalogProducts.length === 0 && (
            <div className="col-span-2 text-center py-12 text-slate-500">
              No products found in this catalog.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
