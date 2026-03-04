import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ShoppingBag, Type, Image as ImageIcon, RotateCcw, Trash2 } from 'lucide-react';
import { Screen, Product, CustomDesign, CartItem } from '../types';

interface CustomTShirtProps {
  setScreen: (s: Screen, p?: Product) => void;
  addToCart: (item: CartItem) => void;
}

export default function CustomTShirt({ setScreen, addToCart }: CustomTShirtProps) {
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [color, setColor] = useState('#ffffff');
  
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') {
          setFrontImage(reader.result as string);
        } else {
          setBackImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const customDesign: CustomDesign = {
      frontText: frontText || undefined,
      backText: backText || undefined,
      frontImage: frontImage || undefined,
      backImage: backImage || undefined,
      color
    };

    const product: Product = {
      id: `custom_tshirt_${Date.now()}`,
      name: 'Custom Designed T-Shirt',
      price: 500, // Base price for custom t-shirt
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400',
      category: 'men'
    };

    addToCart({
      ...product,
      quantity: 1,
      selectedSize: 'M',
      selectedColor: color,
      customDesign
    });

    setScreen('cart');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 max-w-[430px] mx-auto shadow-2xl relative">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center p-4 justify-between">
          <button onClick={() => setScreen('home')} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <ChevronLeft className="size-6 text-slate-800" />
          </button>
          <h1 className="text-lg font-bold text-slate-800">Design Your T-Shirt</h1>
          <div className="size-10"></div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* T-Shirt Preview Area */}
        <div className="relative w-full aspect-square bg-slate-100 flex items-center justify-center p-8 overflow-hidden">
          {/* Base T-Shirt Image (Using a mask or blend mode for color) */}
          <div 
            className="relative w-full h-full max-w-[300px] mx-auto transition-transform duration-500"
            style={{ 
              backgroundColor: color,
              maskImage: `url('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800')`,
              WebkitMaskImage: `url('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800')`,
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
            }}
          >
            {/* The actual image for texture */}
            <img 
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" 
              alt="T-Shirt Base" 
              className="w-full h-full object-contain mix-blend-multiply opacity-50"
              referrerPolicy="no-referrer"
            />

            {/* Print Area Overlay */}
            <div className="absolute top-[20%] left-[25%] w-[50%] h-[60%] border-2 border-dashed border-slate-300/50 flex flex-col items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {side === 'front' ? (
                  <motion.div 
                    key="front"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center p-2 relative"
                  >
                    {frontImage && (
                      <div className="relative w-full h-1/2 flex items-center justify-center mb-2">
                        <img src={frontImage} alt="Front Design" className="max-w-full max-h-full object-contain" />
                        <button 
                          onClick={() => setFrontImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    )}
                    {frontText && (
                      <div className="text-center font-bold text-xl break-words w-full" style={{ color: color === '#ffffff' ? '#000' : '#fff' }}>
                        {frontText}
                      </div>
                    )}
                    {!frontImage && !frontText && (
                      <span className="text-slate-400/50 text-sm font-medium">Front Print Area</span>
                    )}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="back"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex flex-col items-center justify-center p-2 relative"
                  >
                    {backImage && (
                      <div className="relative w-full h-1/2 flex items-center justify-center mb-2">
                        <img src={backImage} alt="Back Design" className="max-w-full max-h-full object-contain" />
                        <button 
                          onClick={() => setBackImage(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    )}
                    {backText && (
                      <div className="text-center font-bold text-xl break-words w-full" style={{ color: color === '#ffffff' ? '#000' : '#fff' }}>
                        {backText}
                      </div>
                    )}
                    {!backImage && !backText && (
                      <span className="text-slate-400/50 text-sm font-medium">Back Print Area</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-white rounded-t-3xl -mt-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          
          {/* Side Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setSide('front')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${side === 'front' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Front Side
            </button>
            <button 
              onClick={() => setSide('back')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${side === 'back' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Back Side
            </button>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-800 mb-3">T-Shirt Color</h3>
            <div className="flex gap-3">
              {['#ffffff', '#000000', '#ef4444', '#3b82f6', '#10b981'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`size-10 rounded-full border-2 transition-all ${color === c ? 'border-primary scale-110' : 'border-slate-200'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Design Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800">Add Design ({side === 'front' ? 'Front' : 'Back'})</h3>
            
            {/* Text Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type className="size-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Enter text..."
                value={side === 'front' ? frontText : backText}
                onChange={(e) => side === 'front' ? setFrontText(e.target.value) : setBackText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium text-slate-800"
              />
            </div>

            {/* Image Upload */}
            <div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-colors"
              >
                <ImageIcon className="size-5" />
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 bg-white border-t border-slate-100 z-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Price</p>
            <p className="text-2xl font-black text-slate-900">৳500</p>
          </div>
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="size-5" />
          Save & Order Now
        </button>
      </div>
    </div>
  );
}
