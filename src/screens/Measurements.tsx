import React, { useState, useEffect } from 'react';
import { ChevronLeft, Ruler, Save } from 'lucide-react';
import { Screen, UserProfile, UserMeasurements } from '../types';

export default function Measurements({ setScreen, user, onSave }: { setScreen: (s: Screen) => void, user: UserProfile, onSave: (m: UserMeasurements) => void }) {
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    inseam: ''
  });

  useEffect(() => {
    if (user.measurements) {
      setMeasurements(user.measurements);
    }
  }, [user.measurements]);

  const handleSave = () => {
    onSave(measurements);
    alert('পরিমাপ সফলভাবে সেভ করা হয়েছে!');
    setScreen('profile');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
      <main className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-slate-100 p-3 rounded-full text-slate-600">
              <Ruler className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">আপনার ফিট প্রোফাইল</h2>
              <p className="text-xs text-slate-500">সাইজ সুপারিশের জন্য ব্যবহৃত</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">উচ্চতা (ফুট)</label>
              <input 
                type="number" 
                step="0.1"
                value={measurements.height}
                onChange={(e) => setMeasurements({...measurements, height: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="5.7"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">ওজন (কেজি)</label>
              <input 
                type="number" 
                value={measurements.weight}
                onChange={(e) => setMeasurements({...measurements, weight: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="70"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">বুক (ইঞ্চি)</label>
              <input 
                type="number" 
                value={measurements.chest}
                onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="38"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">কোমর (ইঞ্চি)</label>
              <input 
                type="number" 
                value={measurements.waist}
                onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="32"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">হিপস (ইঞ্চি)</label>
              <input 
                type="number" 
                value={measurements.hips}
                onChange={(e) => setMeasurements({...measurements, hips: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">ইনসিম (ইঞ্চি)</label>
              <input 
                type="number" 
                value={measurements.inseam}
                onChange={(e) => setMeasurements({...measurements, inseam: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="30"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Save className="size-5" />
          পরিমাপ সেভ করুন
        </button>
      </main>
    </div>
  );
}
