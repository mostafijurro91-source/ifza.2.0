import React from 'react';
import { ChevronLeft, CreditCard, Plus, Trash2 } from 'lucide-react';
import { Screen } from '../types';

export default function PaymentMethods({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
      <main className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-3 rounded-lg">
                <CreditCard className="size-6 text-slate-700" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">Visa ending in 4242</p>
                <p className="text-xs text-slate-500">Expires 12/24</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 className="size-5" />
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-slate-100 p-3 rounded-lg">
                <CreditCard className="size-6 text-slate-700" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">Mastercard ending in 8888</p>
                <p className="text-xs text-slate-500">Expires 09/25</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-red-500 transition-colors">
              <Trash2 className="size-5" />
            </button>
          </div>

          <button className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-center gap-2 text-primary font-bold hover:bg-slate-100 transition-colors">
            <Plus className="size-5" />
            Add New Card
          </button>
        </div>
      </main>
    </div>
  );
}
