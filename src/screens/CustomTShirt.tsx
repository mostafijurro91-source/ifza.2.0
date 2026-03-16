import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ShoppingBag, Type, Image as ImageIcon, RotateCcw, Trash2, Palette, Move, ZoomIn, ZoomOut, MessageCircle } from 'lucide-react';
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
  
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);

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
      color,
      textColor,
      fontSize
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
    <div className="flex min-h-screen w-full flex-col bg-slate-50 mx-auto shadow-2xl relative">
      <main className="flex-1 overflow-y-auto pb-32">
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
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md z-10"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    )}
                    {frontText && (
                      <div 
                        className="text-center font-bold break-words w-full leading-tight" 
                        style={{ color: textColor, fontSize: `${fontSize}px` }}
                      >
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
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md z-10"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    )}
                    {backText && (
                      <div 
                        className="text-center font-bold break-words w-full leading-tight" 
                        style={{ color: textColor, fontSize: `${fontSize}px` }}
                      >
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
        <div className="p-6 bg-white rounded-t-3xl -mt-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-6">
          
          {/* Side Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
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

          {/* T-Shirt Color Selection */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Palette className="size-4" /> T-Shirt Color
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {['#ffffff', '#000000', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`size-10 shrink-0 rounded-full border-2 transition-all ${color === c ? 'border-primary scale-110 shadow-md' : 'border-slate-200'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Text Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Type className="size-4" /> Add Text
            </h3>
            
            {/* Text Input */}
            <input
              type="text"
              placeholder={`Enter text for ${side}...`}
              value={side === 'front' ? frontText : backText}
              onChange={(e) => side === 'front' ? setFrontText(e.target.value) : setBackText(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-medium text-slate-800"
            />

            {/* Text Customization */}
            {(side === 'front' ? frontText : backText) && (
              <div className="grid grid-cols-2 gap-4">
                {/* Text Color */}
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Text Color</label>
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {['#000000', '#ffffff', '#ef4444', '#3b82f6', '#f59e0b'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setTextColor(c)}
                        className={`size-8 shrink-0 rounded-full border transition-all ${textColor === c ? 'border-primary scale-110 ring-2 ring-primary/20' : 'border-slate-200'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Font Size: {fontSize}px</label>
                  <input 
                    type="range" 
                    min="12" 
                    max="72" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <ImageIcon className="size-4" /> Add Image
            </h3>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:border-primary/50 hover:text-primary transition-all group"
            >
              <div className="bg-slate-100 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                <ImageIcon className="size-5" />
              </div>
              Upload Image from Gallery
            </button>
            <p className="text-xs text-slate-400 mt-2 text-center">
              Uploaded images will be saved to your admin panel for processing.
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full p-4 bg-white border-t border-slate-100 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Price</p>
            <p className="text-2xl font-black text-slate-900">৳500</p>
          </div>
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          <ShoppingBag className="size-5" />
          Save & Order Now
        </button>
      </div>
    </div>
  );
}
