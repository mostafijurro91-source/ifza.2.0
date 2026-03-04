import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Heart, Star, Sparkles, ShoppingBag } from 'lucide-react';
import { Screen, Product } from '../types';

export default function ProductDetail({ setScreen, product, onAddToCart }: { setScreen: (s: Screen) => void, product: Product | null, onAddToCart: (p: Product, size: string, color: string) => void }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState('S');
  const [selectedColor, setSelectedColor] = React.useState('Neon');

  if (!product) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background-dark text-white">
        <p>Product not found</p>
        <button onClick={() => setScreen('home')} className="ml-4 text-primary underline">Go Home</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark overflow-x-hidden">
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-primary/10 md:hidden">
        <button
          onClick={() => setScreen('home')}
          className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
        >
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center font-black italic">IFZA</h1>
        <div className="flex items-center gap-1">
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <Share2 className="size-5 text-white" />
          </button>
        </div>
      </header>

      <main className="flex-1 pb-32 max-w-7xl mx-auto w-full px-4 pt-4 md:pt-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative group">
            <div
              className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-primary/5 rounded-3xl aspect-[3/4] shadow-2xl border border-white/5 group-hover:border-primary/20 transition-all duration-500"
              style={{ backgroundImage: `url("${product.image}")` }}
            >
              <div className="flex justify-center gap-2 p-5 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-1 rounded-full bg-primary"></div>
                <div className="w-2 h-1 rounded-full bg-slate-400/50"></div>
                <div className="w-2 h-1 rounded-full bg-slate-400/50"></div>
              </div>
            </div>

            {product.isVirtualReady && (
              <div className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl shadow-primary/20 backdrop-blur-md">
                <Sparkles className="size-4" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Virtual Ready</span>
              </div>
            )}

            <button className="hidden md:flex absolute top-6 right-6 size-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-full items-center justify-center text-white hover:bg-primary hover:border-primary transition-all shadow-xl">
              <Heart className="size-6" />
            </button>
          </div>

          {/* Info Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-6 md:mb-10">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-primary font-black text-xs md:text-sm tracking-[0.2em] uppercase">{product.category}</p>
                <div className="h-px flex-1 bg-primary/10"></div>
                <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-0.5 rounded text-yellow-500">
                  <Star className="size-3 fill-yellow-500" />
                  <span className="text-[10px] font-bold">4.8</span>
                </div>
              </div>
              <h1 className="text-white text-3xl md:text-6xl font-black italic tracking-tighter leading-none">{product.name}</h1>
              <div className="flex items-baseline gap-4 mt-6">
                <h3 className="text-primary text-3xl md:text-5xl font-black tracking-tight">৳{product.price.toFixed(2)}</h3>
                {product.originalPrice && (
                  <div className="flex flex-col">
                    <span className="text-slate-500 line-through text-sm md:text-lg">৳{product.originalPrice.toFixed(2)}</span>
                    <span className="text-emerald-500 font-bold text-[10px] md:text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit mt-1 uppercase tracking-widest">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% Save
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8 md:space-y-12">
              <div>
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-4 text-slate-500">Select Color</h4>
                <div className="flex gap-4">
                  {['Neon', 'Blue', 'Pink', 'Onyx'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`size-10 md:size-12 rounded-full shadow-lg transition-all ${color === 'Neon' ? 'bg-primary' :
                          color === 'Blue' ? 'bg-blue-500' :
                            color === 'Pink' ? 'bg-pink-500' : 'bg-slate-900'
                        } ${selectedColor === color ? 'ring-4 ring-primary/20 ring-offset-4 ring-offset-background-dark scale-110' : 'hover:scale-105 opacity-80'}`}
                    ></button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] text-slate-500">Select Size</h4>
                  <button className="text-primary text-xs font-bold underline p-1 md:hover:bg-primary/5 rounded transition-colors uppercase">Size Guide</button>
                </div>
                <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 md:grid md:grid-cols-5 md:overflow-visible">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-shrink-0 min-w-[56px] h-14 rounded-xl border-2 flex items-center justify-center font-black transition-all ${selectedSize === size
                          ? 'border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                          : 'border-white/5 text-slate-500 hover:border-white/10 hover:text-white'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-3 text-slate-500">Description</h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                  Elevate your style with our signature <span className="text-white">{product.name}</span>. Crafted from premium materials with a vibrant finish. Each piece is meticulously checked for quality. Perfect for any occasion where you want to stand out.
                </p>
              </div>

              {/* Desktop Actions */}
              <div className="hidden md:flex gap-4 pt-6">
                <button
                  onClick={() => setScreen('try-on')}
                  className="flex-1 bg-white text-slate-900 h-16 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-slate-200 active:scale-[0.98] transition-all"
                >
                  <Sparkles className="size-5" />
                  Try in Room
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`flex-[1.5] h-16 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-[0.98] ${isAdded ? 'bg-emerald-500 text-white' : 'bg-primary text-white shadow-primary/30 hover:bg-primary/90'}`}
                >
                  <ShoppingBag className="size-5" />
                  {isAdded ? 'Success!' : 'Add to Bag'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Footer Actions */}
      <div className="fixed bottom-0 w-full z-40 bg-background-dark/95 backdrop-blur-xl border-t border-primary/10 p-4 pb-8 md:hidden">
        <div className="flex gap-3">
          <button
            onClick={() => setScreen('try-on')}
            className="flex-1 bg-white text-slate-900 h-14 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
          >
            <Sparkles className="size-5" />
            Try
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex-[1.5] h-14 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] ${isAdded ? 'bg-emerald-500 text-white' : 'bg-primary text-white shadow-primary/20'}`}
          >
            <ShoppingBag className="size-5" />
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
