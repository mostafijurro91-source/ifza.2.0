import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Trash2, Minus, Plus, ArrowRight, ShoppingBag, Camera, User, ShoppingCart, MapPin, Phone, CreditCard, MessageCircle, X } from 'lucide-react';
import { Screen, CartItem as CartItemType, UserProfile } from '../types';

export default function Cart({ setScreen, cart, onRemove, onUpdateQuantity, onCheckout, user }: { 
  setScreen: (s: Screen) => void, 
  cart: CartItemType[], 
  onRemove: (id: string, size?: string, color?: string) => void,
  onUpdateQuantity: (id: string, delta: number, size?: string, color?: string) => void,
  onCheckout: (details: { name: string, phone: string, address: string, paymentMethod: string }) => void,
  user?: UserProfile
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    paymentMethod: 'Cash on Delivery'
  });
  const [error, setError] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.address) {
      setError("Please fill in all details");
      return;
    }
    setError(null);
    onCheckout(checkoutForm);
  };

  if (showCheckout) {
    return (
      <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
        <main className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
          <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Shipping Details</h2>
              
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-100 animate-shake">
                  <X className="size-4" />
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm text-slate-500">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={checkoutForm.name}
                    onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-500">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                  <input 
                    type="tel" 
                    required
                    value={checkoutForm.phone}
                    onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-500">Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 size-5 text-slate-400" />
                  <textarea 
                    required
                    value={checkoutForm.address}
                    onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors min-h-[100px]"
                    placeholder="Enter your full delivery address"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 border border-primary bg-blue-50 rounded-xl cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="Cash on Delivery" 
                    checked={checkoutForm.paymentMethod === 'Cash on Delivery'}
                    onChange={e => setCheckoutForm({...checkoutForm, paymentMethod: e.target.value})}
                    className="accent-primary size-4"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between text-lg font-bold mb-6">
                <span>Total to Pay</span>
                <span className="text-primary">৳{subtotal.toFixed(2)}</span>
              </div>
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
              >
                <span>Place Order</span>
                <ArrowRight className="size-5" />
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
      <main className="flex-1 px-4 py-6 space-y-4 overflow-y-auto no-scrollbar max-w-7xl mx-auto w-full md:grid md:grid-cols-2 md:gap-8 md:px-8 md:space-y-0">
        <div className="md:col-span-1 space-y-4">
          <div className="flex items-baseline justify-between mb-2">
            <h2 className="text-2xl font-bold">{cart.length} {cart.length === 1 ? 'Item' : 'Items'}</h2>
            <span className="text-sm text-primary font-medium">Free shipping applied</span>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <ShoppingBag className="size-16 mb-4 opacity-20" />
              <p>Your bag is empty</p>
              <button onClick={() => setScreen('home')} className="mt-4 text-primary font-bold">Start Shopping</button>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
                onRemove={() => onRemove(item.id, item.selectedSize, item.selectedColor)}
                onUpdateQuantity={(delta) => onUpdateQuantity(item.id, delta, item.selectedSize, item.selectedColor)}
              />
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="md:col-span-1 md:bg-white md:p-6 md:rounded-2xl md:border md:border-slate-200 md:shadow-sm md:h-fit md:sticky md:top-24">
            <h3 className="text-xl font-bold mb-6 hidden md:block">Order Summary</h3>
            <div className="pt-6 pb-2 md:pt-0">
              <div className="flex items-center justify-between text-slate-500 text-sm mb-2">
                <span>Subtotal</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500 text-sm mb-2">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold border-t border-slate-200 pt-4 mt-2">
                <span>Total</span>
                <span className="text-primary">৳{subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setShowCheckout(true)}
              disabled={cart.length === 0}
              className="w-full bg-primary disabled:opacity-50 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 mt-6 hidden md:flex shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="size-5" />
            </button>
          </div>
        )}
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 p-4 pb-8 space-y-6 md:hidden">
        <button 
          onClick={() => setShowCheckout(true)}
          disabled={cart.length === 0}
          className="w-full bg-primary disabled:opacity-50 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="size-5" />
        </button>
        <nav className="flex justify-between items-center px-4">
          <CartNavItem icon={<ShoppingBag className="size-5" />} label="Shop" onClick={() => setScreen('home')} />
          <CartNavItem icon={<Camera className="size-5" />} label="Try-On" onClick={() => setScreen('try-on')} />
          <CartNavItem icon={<ShoppingCart className="size-5 fill-primary" />} label="Cart" active />
          <CartNavItem icon={<User className="size-5" />} label="Profile" onClick={() => setScreen('profile')} />
        </nav>
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
    <div className={`bg-white border border-slate-200 rounded-xl p-4 flex gap-4 items-center shadow-sm ${item.originalPrice ? 'border-primary/30 bg-blue-50' : ''}`}>
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
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <p>Color: <span className="inline-block w-3 h-3 rounded-full border border-slate-300 align-middle ml-1" style={{ backgroundColor: item.customDesign.color }}></span></p>
                {item.customDesign.frontText && <p className="truncate max-w-[150px]">Front: "{item.customDesign.frontText}"</p>}
                {item.customDesign.backText && <p className="truncate max-w-[150px]">Back: "{item.customDesign.backText}"</p>}
                {(item.customDesign.frontImage || item.customDesign.backImage) && <p>Includes Custom Image</p>}
              </div>
            ) : (
              <p className="text-xs text-slate-500 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
            )}
          </div>
          <button onClick={onRemove} className="text-slate-400 hover:text-red-500 shrink-0 ml-2">
            <Trash2 className="size-4" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-primary">
            ৳{item.price.toFixed(2)} 
            {item.originalPrice && <span className="text-[10px] text-slate-400 line-through ml-1">৳{item.originalPrice.toFixed(2)}</span>}
          </p>
          <div className="flex items-center bg-blue-50 rounded-full px-2 py-1 gap-3">
            <button 
              onClick={() => onUpdateQuantity(-1)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-primary hover:bg-blue-200 transition-colors"
            >
              <Minus className="size-3" />
            </button>
            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(1)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-primary hover:bg-blue-200 transition-colors"
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
    <div className={`flex flex-col items-center gap-1 cursor-pointer ${active ? 'text-primary' : 'text-slate-500'}`} onClick={onClick}>
      {icon}
      <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
    </div>
  );
}
