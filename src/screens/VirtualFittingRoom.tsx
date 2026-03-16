import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Share2, Rotate3d, Camera, Check, PlusCircle, Accessibility, Footprints, Glasses, Watch, Home, Search, ShoppingCart, User, Wand2, Sparkles, Shirt, Baby, Ghost, X, ShoppingBag, Save, MessageCircle } from 'lucide-react';
import { Screen, Product } from '../types';
import { GoogleGenAI } from "@google/genai";
import { supabase } from '../lib/supabase';

export default function VirtualFittingRoom({ setScreen, items, onRemoveItem, onAddToCart, uploadedImage, setUploadedImage }: { setScreen: (s: Screen) => void, items: Product[], onRemoveItem: (id: string) => void, onAddToCart: (p: Product, s: string, c: string) => void, uploadedImage: string | null, setUploadedImage: (img: string | null) => void }) {
  const [activeTab, setActiveTab] = useState('Outfits');
  const [isRendering, setIsRendering] = useState(false);
  const [renderingStep, setRenderingStep] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  const saveToHistory = async (genImage: string) => {
    if (!userId || !uploadedImage) return;

    try {
      const { error } = await supabase.from('virtual_try_ons').insert({
        user_id: userId,
        input_image: uploadedImage, // Note: Storing base64 in DB is not ideal for production, use Storage Buckets instead
        generated_image: genImage,
        items: items.map(i => i.id)
      });

      if (error) {
        console.error('Error saving to history:', error);
      }
    } catch (err) {
      console.error('Failed to save history:', err);
    }
  };

  const handleRender = async () => {
    if (!(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
      return;
    }
    if (!uploadedImage) {
      alert("Please upload a photo first.");
      setActiveTab('Avatar');
      return;
    }

    // Credit Check Logic
    try {
      const { data: creditData, error: creditError } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (creditError || !creditData || creditData.credits <= 0) {
        alert("আপনার ক্রেডিট শেষ! আরও ট্রাই-অন করতে ক্রেডিট কিনুন।");
        return;
      }

      // Deduct credit
      await supabase
        .from('user_credits')
        .update({ credits: creditData.credits - 1 })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
        
    } catch (error) {
      console.error("Credit check failed", error);
      alert("ক্রেডিট চেক করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
      return;
    }
    if (items.length === 0) {
      alert("Please add items to the fitting room first.");
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      alert("Gemini API Key is missing. Please check your configuration.");
      return;
    }

    setIsRendering(true);
    setRenderingStep('Preparing your photo...');
    
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Convert uploaded user image to base64 (remove header)
      const userBase64 = uploadedImage.split(',')[1];
      const userMimeType = uploadedImage.split(';')[0].split(':')[1];

      // Prepare parts for the model
      const parts: any[] = [
        {
          inlineData: {
            data: userBase64,
            mimeType: userMimeType
          }
        }
      ];

      setRenderingStep('Fetching outfit details...');

      // Fetch and convert product images to base64
      const productImagesParts = [];
      for (const item of items) {
        try {
          // Try to get a higher resolution image if it's from Unsplash
          let imageUrl = item.image;
          if (imageUrl.includes('images.unsplash.com')) {
            imageUrl = imageUrl.replace('w=400', 'w=1024').replace('w=800', 'w=1024');
          }

          const response = await fetch(imageUrl);
          const blob = await response.blob();
          
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve) => {
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          productImagesParts.push({
            inlineData: {
              data: base64.split(',')[1],
              mimeType: blob.type
            }
          });
        } catch (e) {
          console.warn(`Could not fetch image for ${item.name}`, e);
        }
      }

      // Add product images to parts
      parts.push(...productImagesParts);

      const itemMapping = items.map((item, index) => {
        return `- Image ${index + 2}: ${item.name} (${item.category})`;
      }).join("\n");

      const prompt = `
        You are an expert AI for Virtual Try-On (VTON).
        
        INPUTS:
        - Image 1: Target Person (User).
        - Subsequent Images: Source Clothing (Garments).

        GOAL:
        Synthesize a photorealistic image of the Target Person wearing the Source Clothing.

        STRICT REQUIREMENTS:
        1. **CLOTHING FIDELITY:** The clothing in the output MUST be visually identical to the Source Clothing images. Preserve the exact texture, pattern, logo, color, collar style, sleeve length, and fit. Do NOT generate generic variations.
        2. **PERSON PRESERVATION:** The user's face, hair, body shape, pose, and skin tone must remain unchanged.
        3. **SEAMLESS INTEGRATION:** The clothing must warp and fold naturally around the user's body. Lighting and shadows on the clothing must match the user's environment.
        4. **REPLACE ONLY:** Only replace the garments that correspond to the Source Clothing. Keep other parts of the user's outfit if no replacement is provided (e.g., if only a shirt is provided, keep the user's original pants).
        
        OUTFIT MAPPING:
        ${itemMapping}
      `;

      parts.push({ text: prompt });

      setRenderingStep('Generating your new look...');

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: parts
        }
      });

      // Extract image from response
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const finalImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            setGeneratedImage(finalImage);
            foundImage = true;
            
            // Save to Supabase
            await saveToHistory(finalImage);
            break;
          }
        }
      }
      
      if (!foundImage) {
        console.warn("No image found in response, checking text...");
        alert("AI could not generate the image. Please try again.");
      }

    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsRendering(false);
      setRenderingStep('');
    }
  };

  const resizeImage = (file: File, maxWidth: number = 1024, maxHeight: number = 1024): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL(file.type));
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setUploadedImage(resizedImage);
        setGeneratedImage(null); // Reset generated image on new upload
      } catch (error) {
        console.error("Error resizing image:", error);
        alert("Failed to process image. Please try another one.");
      }
    }
  };

  const handleOrder = (item: Product) => {
    onAddToCart(item, 'M', 'Default'); // Defaulting size/color for now
    onRemoveItem(item.id);
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-slate-50 overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar max-w-7xl mx-auto w-full md:grid md:grid-cols-2 md:gap-8 md:px-8 md:pt-6">
        {/* Left Column: Preview */}
        <div className="p-4 md:p-0 md:sticky md:top-6 md:h-fit">
          <div 
            className="relative w-full aspect-[3/4] rounded-2xl bg-primary/5 overflow-hidden flex items-center justify-center group active-glow transition-all border-2 border-primary/20 shadow-2xl shadow-primary/10 md:max-h-[80vh] md:object-contain"
          >
            {/* Preview Area */}
            <motion.div 
              key={generatedImage || uploadedImage}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url("${generatedImage || uploadedImage || 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800'}")`,
              }}
            />

            {/* AI Rendering Overlay */}
            <AnimatePresence>
              {isRendering && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4"
                >
                  <div className="relative mb-4">
                    <div className="size-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-8 text-primary animate-pulse" />
                  </div>
                  <p className="text-primary font-bold tracking-widest uppercase text-xs mb-1">AI Fitting in progress...</p>
                  <p className="text-slate-900 text-sm font-medium animate-pulse">{renderingStep}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!uploadedImage && !generatedImage && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm">
                 <p className="text-slate-900 font-bold mb-2">No Image Uploaded</p>
                 <button onClick={() => setActiveTab('Avatar')} className="text-primary text-sm underline">Upload Photo</button>
               </div>
            )}
            
            {uploadedImage && !generatedImage && (
               <button 
                 onClick={() => setUploadedImage(null)}
                 className="absolute top-2 right-2 bg-white/50 text-slate-900 p-1 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                 title="Remove Photo"
               >
                 <X className="size-4" />
               </button>
            )}
          </div>
          
          <div className="mt-4 bg-primary/5 border border-primary/10 rounded-xl p-3 md:hidden">
            <div className="flex items-start gap-2">
              <Sparkles className="size-4 text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="text-primary font-bold">Note:</span> The AI generates a <span className="text-slate-900 font-semibold">preview</span> based on your photo and the selected items.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="md:col-span-1 md:flex md:flex-col md:h-full">
          <div className="bg-slate-50 px-4 border-b border-slate-200 sticky top-0 z-10 md:static md:bg-transparent md:border-none md:p-0 md:mb-6">
            <div className="flex gap-8 md:gap-4 md:bg-slate-100 md:p-1 md:rounded-xl md:inline-flex">
              <Tab label="Avatar" active={activeTab === 'Avatar'} onClick={() => setActiveTab('Avatar')} />
              <Tab label="Outfits" active={activeTab === 'Outfits'} onClick={() => setActiveTab('Outfits')} />
            </div>
          </div>

          {/* Categories / Slots */}
          <div className="flex-1">
            {activeTab === 'Avatar' ? (
              <section className="px-4 py-6 md:px-0 md:py-0">
                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 md:p-10">
                  <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                    <Camera className="size-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-slate-900 text-lg font-bold mb-1">Upload Your Photo</h3>
                    <p className="text-xs text-slate-500 mb-4">For best results, upload a full-body photo with good lighting.</p>
                  </div>
                  
                  <label className="w-full relative cursor-pointer group max-w-xs">
                    <div className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl text-center shadow-md shadow-primary/20 group-hover:bg-primary/90 transition-colors">
                      Select Photo
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </section>
            ) : (
              <section className="px-4 py-2 md:px-0 md:py-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Selected Items</h3>
                  <span className="text-xs text-slate-500">{items.length} items</span>
                </div>

                {/* Outfit Slots Indicator */}
                <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
                  <SlotIndicator label="Top" active={items.some(i => ['shirt', 't-shirt', 'top', 'panjabi', 'fotua', 'jacket'].some(c => i.category.toLowerCase().includes(c) || i.name.toLowerCase().includes(c)))} />
                  <SlotIndicator label="Bottom" active={items.some(i => ['pant', 'jeans', 'pajama', 'trousers', 'skirt', 'palazzo'].some(c => i.category.toLowerCase().includes(c) || i.name.toLowerCase().includes(c)))} />
                  <SlotIndicator label="Shoes" active={items.some(i => ['shoe', 'sneaker', 'sandal', 'boot'].some(c => i.category.toLowerCase().includes(c) || i.name.toLowerCase().includes(c)))} />
                  <SlotIndicator label="Accs" active={items.some(i => ['glass', 'watch', 'bag', 'hat', 'cap', 'hijab'].some(c => i.category.toLowerCase().includes(c) || i.name.toLowerCase().includes(c)))} />
                </div>
                
                <div className="space-y-4 max-h-[50vh] overflow-y-auto no-scrollbar md:pr-2">
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 bg-slate-100 rounded-xl border border-slate-200">
                      <p>No items in fitting room.</p>
                      <button onClick={() => setScreen('home')} className="text-primary text-sm mt-2 font-bold hover:underline">Browse Products</button>
                    </div>
                  ) : (
                    items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-primary/30 transition-colors">
                        <img src={item.image} alt={item.name} className="size-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-slate-900 font-bold text-sm truncate">{item.name}</h4>
                          <p className="text-primary text-xs font-bold">৳{item.price}</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleOrder(item)}
                            className="size-8 bg-primary rounded-full flex items-center justify-center text-white shadow-md shadow-primary/20 hover:scale-105 transition-transform"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="size-4" />
                          </button>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="size-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Remove"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Desktop Generate Button */}
          <div className="hidden md:block mt-auto pt-6">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2">
                <Sparkles className="size-4 text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="text-primary font-bold">Note:</span> The AI generates a <span className="text-slate-900 font-semibold">preview</span> based on your photo and the selected items.
                </p>
              </div>
            </div>
            <button 
              onClick={handleRender}
              disabled={isRendering || items.length === 0 || !uploadedImage}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl shadow-2xl flex items-center justify-center gap-3 active-glow transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Wand2 className={`size-5 ${isRendering ? 'animate-spin' : ''}`} />
              <span className="uppercase tracking-widest text-sm">Generate Look</span>
            </button>
          </div>
        </div>
      </main>

      {/* Mobile Generate Button */}
      <div className="fixed bottom-6 left-0 right-0 z-20 flex justify-end px-4 max-w-md mx-auto pointer-events-none md:hidden">
        <button 
          onClick={handleRender}
          disabled={isRendering || items.length === 0 || !uploadedImage}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full shadow-2xl flex items-center gap-3 active-glow transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
        >
          <Wand2 className={`size-5 ${isRendering ? 'animate-spin' : ''}`} />
          <span className="uppercase tracking-widest text-xs">Generate Look</span>
        </button>
      </div>
    </div>
  );
}

function SlotIndicator({ label, active }: { label: string, active: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${active ? 'bg-primary text-white border-primary' : 'bg-transparent text-slate-500 border-slate-300'}`}>
      {label} {active && <Check className="inline size-3 ml-1" />}
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-2 transition-all ${active ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
    >
      <p className="text-sm font-bold tracking-tight uppercase tracking-widest text-[10px]">{label}</p>
    </button>
  );
}

function Slot({ icon, label, selected, onClick, image }: { icon: React.ReactNode, label: string, selected?: string | null, onClick?: () => void, image?: string }) {
  return (
    <div className="flex-none w-32 snap-start" onClick={onClick}>
      <div className={`aspect-square rounded-2xl border-2 transition-all cursor-pointer overflow-hidden relative ${selected ? 'border-primary bg-primary/10' : 'border-dashed border-white/10 bg-white/5 hover:border-primary/40'}`}>
        {selected && image ? (
          <img src={image} alt={label} className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className={selected ? 'text-primary' : 'text-slate-600'}>{icon}</div>
            <span className={`text-[8px] font-black uppercase tracking-widest ${selected ? 'text-primary' : 'text-slate-600'}`}>{label}</span>
          </div>
        )}
        
        {selected && (
          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
            <div className="bg-primary rounded-full p-1 shadow-lg">
              <Check className="text-white size-3" />
            </div>
          </div>
        )}
        
        {!selected && (
          <div className="absolute top-2 right-2">
            <PlusCircle className="size-4 text-slate-700" />
          </div>
        )}
      </div>
      <p className={`text-[9px] font-bold text-center mt-2 uppercase tracking-tighter ${selected ? 'text-primary' : 'text-slate-500'}`}>
        {selected || `Add ${label}`}
      </p>
    </div>
  );
}

function FitNavItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-end gap-1 text-slate-500 cursor-pointer hover:text-primary transition-colors" onClick={onClick}>
      <div className="flex h-8 items-center justify-center">
        {icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-tighter">{label}</p>
    </div>
  );
}
