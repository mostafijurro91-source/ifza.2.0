import React from 'react';
import { Menu, MessageCircle, User, ShoppingBag, ChevronLeft } from 'lucide-react';
import { Screen, Product, Catalog } from '../types';

interface HeaderProps {
  setScreen: (s: Screen, p?: Product, c?: Catalog) => void;
  cartCount: number;
  currentScreen: Screen;
}

export default function Header({ setScreen, cartCount, currentScreen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center bg-white/80 backdrop-blur-md py-2 px-4 justify-between border-b border-slate-200 w-full">
      <div className="flex flex-1 shrink-0 items-center justify-start">
        <h2 
          className="text-slate-900 text-xl font-black tracking-tighter cursor-pointer"
          onClick={() => setScreen('home')}
        >
          Cokmoke<span className="text-primary">.</span>
        </h2>
      </div>
      <div className="flex flex-1 items-center justify-end gap-3 relative">
        <User className="text-slate-900 size-5 cursor-pointer" onClick={() => setScreen('profile')} />
        <div className="relative">
          <ShoppingBag className="text-slate-900 size-5 cursor-pointer" onClick={() => setScreen('cart')} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent-blue text-[9px] font-bold text-white">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
