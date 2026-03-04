import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Trash2, Minus, Plus, ArrowRight, ShoppingBag, Camera, User, ShoppingCart, MapPin, Phone, CreditCard, Home } from 'lucide-react';
import { Screen, CartItem as CartItemType } from '../types';

export default function Cart({ setScreen, cart, onRemove, onUpdateQuantity, onCheckout }: {
  setScreen: (s: Screen) => void,
  cart: CartItemType[],
  onRemove: (id: string, size?: string, color?: string) => void,
  onUpdateQuantity: (id: string, delta: number, size?: string, color?: string) => void,
  onCheckout: (details: { name: string, phone: string, address: string, paymentMethod: string }) => void
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Cash on Delivery'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      alert("Please fill in all details");
      return;
    }
    onCheckout(checkoutForm);
  };

  if (showCheckout) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white">
        <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md px-4 py-4 md:py-6 flex items-center border-b border-primary/10">
          <div className="max-w-7xl mx-auto w-full flex items-center">
            <button onClick={() => setShowCheckout(false)} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-primary mr-4">
              <ChevronLeft className="size-6" />
            </button>
            <h1 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">Secure Checkout</h1>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 md:py-16">
          <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase underline decoration-primary/50 decoration-4 underline-offset-8">Shipping Address</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
                    <input
                      type="text"
                      required
                      value={checkoutForm.name}
                      onChange={e => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all shadow-xl"
                      placeholder="e.g. Abdullah Al Mamun"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-primary" />
                    <input
                      type="tel"
                      required
                      value={checkoutForm.phone}
                      onChange={e => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all shadow-xl"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 size-5 text-primary" />
                    <textarea
                      required
                      value={checkoutForm.address}
                      onChange={e => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      className="w-full bg-slate-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-primary transition-all shadow-xl min-h-[120px] resize-none"
                      placeholder="House, Street, Area, City..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase underline decoration-primary/50 decoration-4 underline-offset-8">Order Summary</h2>
              <div className="bg-primary/5 border border-primary/10 rounded-[2rem] p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                    <span>Subtotal</span>
                    <span>৳{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                    <span>Express Shipping</span>
                    <span className="text-green-500">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between text-3xl font-black italic tracking-tighter">
                    <span className="uppercase">Total</span>
                    <span className="text-primary">৳{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Payment Method</h3>
                  <label className="flex items-center gap-4 p-5 border-2 border-primary bg-primary/10 rounded-2xl cursor-pointer transition-all hover:bg-primary/20">
                    <CreditCard className="size-6 text-primary" />
                    <div className="flex-1">
                      <p className="font-black italic uppercase tracking-tighter">Cash on Delivery</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Pay when you receive</p>
                    </div>
                    <div className="size-5 rounded-full border-4 border-primary bg-white"></div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-orange-600 text-white font-black uppercase tracking-widest py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 transition-all active:scale-95 text-sm mt-8"
                >
                  Confirm Order <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white">
      <header className="sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md px-4 py-4 md:py-6 border-b border-primary/10">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button onClick={() => setScreen('home')} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-primary">
            <ChevronLeft className="size-6" />
          </button>
          <h1 className="text-xl md:text-3xl font-black italic tracking-tighter uppercase">Shopping Bag</h1>
          <div className="relative cursor-pointer" onClick={() => setShowCheckout(true)}>
            <ShoppingCart className="size-6 text-primary" />
            <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-black size-5 rounded-full flex items-center justify-center shadow-lg ring-2 ring-background-dark">
              {cart.length}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-end justify-between border-b-4 border-primary/20 pb-4">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">Your Selection</h2>
              <span className="text-xs md:text-sm text-primary font-black uppercase tracking-widest bg-primary/10 px-4 py-1 rounded-full">
                {cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-600 bg-white/5 rounded-[3rem] border-2 border-dashed border-white/5">
                <ShoppingBag className="size-20 mb-6 opacity-20" />
                <p className="text-xl font-black italic uppercase tracking-tighter">Your bag is breathing empty</p>
                <button onClick={() => setScreen('home')} className="mt-6 text-primary font-black uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-white transition-colors">Start Your Journey</button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    item={item}
                    onRemove={() => onRemove(item.id, item.selectedSize, item.selectedColor)}
                    onUpdateQuantity={(delta) => onUpdateQuantity(item.id, delta, item.selectedSize, item.selectedColor)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Checkout Summary (Desktop Only) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-primary/5 border border-primary/10 rounded-[3rem] p-8 md:p-10 space-y-8 shadow-2xl">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase">Total Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400 font-bold uppercase text-xs tracking-widest">
                  <span>Shipping Cost</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between text-4xl font-black italic tracking-tighter">
                  <span className="uppercase">Grand Total</span>
                  <span className="text-primary">৳{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                disabled={cart.length === 0}
                className="w-full bg-primary disabled:opacity-30 hover:bg-orange-600 text-white font-black uppercase tracking-widest py-6 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 transition-all active:scale-95 text-sm"
              >
                Proceed to Checkout <ArrowRight className="size-5" />
              </button>

              <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">Secure encrypted checkout platform</p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Footer (Hidden on Desktop) */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background-dark/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-8 flex justify-between items-center z-50 md:hidden">
        <CartNavItem icon={<Home className="size-5" />} label="Home" onClick={() => setScreen('home')} />
        <CartNavItem icon={<Camera className="size-5" />} label="Try-On" onClick={() => setScreen('try-on')} />
        <CartNavItem icon={<ShoppingCart className="size-5 fill-primary" />} label="Cart" active />
        <CartNavItem icon={<User className="size-5" />} label="Me" onClick={() => setScreen('profile')} />
      </footer>
    </div>
  );
}

function CartItem({ item, onRemove, onUpdateQuantity }: {
  item: CartItemType,
  onRemove: () => void,
  onUpdateQuantity: (delta: number) => void
}) {
  return (
    <div className={`glass rounded-xl p-4 flex gap-4 items-center ${item.originalPrice ? 'border-primary/30 bg-primary/5' : ''}`}>
      <div
        className="w-24 h-24 rounded-lg bg-cover bg-center shrink-0 relative overflow-hidden"
        style={{ backgroundImage: `url('${item.image}')`, backgroundColor: item.customDesign?.color || 'transparent' }}
      >
        {item.customDesign && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <span className="text-[8px] font-bold bg-white/80 text-black px-1 rounded">CUSTOM</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between min-h-[6rem]">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-base leading-tight line-clamp-1">{item.name}</h3>
            {item.customDesign ? (
              <div className="text-xs text-slate-400 mt-1 space-y-0.5">
                <p>Color: <span className="inline-block w-3 h-3 rounded-full border border-slate-600 align-middle ml-1" style={{ backgroundColor: item.customDesign.color }}></span></p>
                {item.customDesign.frontText && <p className="truncate max-w-[150px]">Front: "{item.customDesign.frontText}"</p>}
                {item.customDesign.backText && <p className="truncate max-w-[150px]">Back: "{item.customDesign.backText}"</p>}
                {(item.customDesign.frontImage || item.customDesign.backImage) && <p>Includes Custom Image</p>}
              </div>
            ) : (
              <p className="text-xs text-slate-400 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
            )}
          </div>
          <button onClick={onRemove} className="text-slate-500 hover:text-red-500 shrink-0 ml-2">
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-primary">
            ৳{item.price.toFixed(2)}
            {item.originalPrice && <span className="text-[10px] text-slate-500 line-through ml-1">৳{item.originalPrice.toFixed(2)}</span>}
          </p>
          <div className="flex items-center bg-primary/10 rounded-full px-2 py-1 gap-3">
            <button
              onClick={() => onUpdateQuantity(-1)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/20 text-primary"
            >
              <Minus className="size-3" />
            </button>
            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(1)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/20 text-primary"
            >
              <Plus className="size-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-400'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
    </div>
  );
}
