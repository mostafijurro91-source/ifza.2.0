import React from 'react';
import { ChevronLeft, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { Screen, Product } from '../types';

export default function SavedLooks({ setScreen, products = [], savedLooks = [], toggleSavedLook }: { setScreen: (s: Screen, p?: Product) => void, products?: Product[], savedLooks?: string[], toggleSavedLook?: (id: string) => void }) {
  const savedProducts = products.filter(p => savedLooks.includes(p.id)); 

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
      <main className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
        {savedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Heart className="size-16 mb-4 opacity-20" />
            <p>No saved items yet</p>
            <button onClick={() => setScreen('home')} className="mt-4 text-primary font-bold">Start Exploring</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {savedProducts.map((product) => (
              <div key={product.id} className="flex flex-col gap-2 cursor-pointer group" onClick={() => setScreen('product', product)}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 border border-slate-200 group-hover:border-primary/30 transition-colors">
                  <img className="h-full w-full object-cover" src={product.image} alt={product.name} referrerPolicy="no-referrer" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleSavedLook?.(product.id); }}
                    className="absolute top-2 right-2 bg-primary text-white flex h-8 w-8 items-center justify-center rounded-full shadow-lg"
                  >
                    <Heart className="size-4 fill-white" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                  <p className="text-xs text-primary font-bold">৳{product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
