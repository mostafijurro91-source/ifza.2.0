import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Screen } from '../types';
import { ChevronLeft, CreditCard, Loader2 } from 'lucide-react';

export default function BuyCredits({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('user_credits')
        .select('credits')
        .eq('user_id', user.id)
        .single();
      if (data) setCredits(data.credits);
    }
    setLoading(false);
  };

  const handleBuyCredits = async (amount: number, cost: number) => {
    setPurchasing(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // In a real app, integrate Stripe here.
      // For now, we simulate a successful purchase.
      await supabase
        .from('user_credits')
        .update({ credits: credits + amount })
        .eq('user_id', user.id);
      
      setCredits(prev => prev + amount);
      alert(`সফলভাবে ${amount} ক্রেডিট কেনা হয়েছে!`);
    }
    setPurchasing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => setScreen('home')} className="p-2 rounded-full hover:bg-slate-200">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-2xl font-bold">ক্রেডিট কিনুন</h1>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="size-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500">বর্তমান ক্রেডিট</p>
            <p className="text-4xl font-bold text-slate-900">{credits}</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { amount: 10, cost: 100 },
              { amount: 25, cost: 200 },
              { amount: 50, cost: 350 },
            ].map((pkg) => (
              <button
                key={pkg.amount}
                onClick={() => handleBuyCredits(pkg.amount, pkg.cost)}
                disabled={purchasing}
                className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-500 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50 rounded-full text-indigo-600">
                    <CreditCard className="size-6" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{pkg.amount} ক্রেডিট</p>
                    <p className="text-sm text-slate-500">{pkg.cost} টাকা</p>
                  </div>
                </div>
                {purchasing ? <Loader2 className="size-5 animate-spin" /> : <span className="text-indigo-600 font-bold">কিনুন</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
