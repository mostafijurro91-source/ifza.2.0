import React from 'react';
import { Heart, Accessibility, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: (p: Product) => void;
  showDiscount?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
  recommendedSize?: string | null;
}

export default function ProductCard({ 
  product, 
  onClick, 
  showDiscount, 
  isSaved, 
  onToggleSave,
  recommendedSize 
}: ProductCardProps) {
  return (
    <div className="flex-none w-40 md:w-full flex flex-col gap-2 cursor-pointer group" onClick={() => onClick?.(product)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 border border-slate-200 group-hover:border-slate-300 transition-colors">
        <img className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" src={product.image} alt={product.name} referrerPolicy="no-referrer" />
        
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleSave?.(); }}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-red-500 transition-colors shadow-sm"
        >
          <Heart className={`size-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {recommendedSize && (
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white shadow-lg ring-2 ring-white">
            আপনার সাইজ: {recommendedSize}
          </div>
        )}

        {product.isVirtualReady && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-slate-900/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            <Accessibility className="size-3" />
            AR TRY-ON
          </div>
        )}

        {showDiscount && product.originalPrice && !recommendedSize && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            SALE
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-900 truncate group-hover:text-primary transition-colors">{product.name}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-xs text-slate-900 font-bold md:text-sm">৳{product.price.toFixed(2)}</p>
            {showDiscount && product.originalPrice && (
              <p className="text-[10px] text-slate-500 line-through">৳{product.originalPrice.toFixed(2)}</p>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            <Star className="size-3 text-yellow-500 fill-yellow-500" />
            <span className="text-[10px] font-bold text-slate-400 md:text-xs">{product.rating || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
