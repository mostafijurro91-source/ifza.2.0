import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { Screen, Catalog } from '../types';

export default function AdminCatalogs({ setScreen, catalogs, setCatalogs }: { setScreen: (s: Screen) => void, catalogs: Catalog[], setCatalogs: (c: Catalog[]) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCatalog, setNewCatalog] = useState<Partial<Catalog>>({ parentCategory: 'women' });

  const handleAdd = () => {
    if (newCatalog.name && newCatalog.image && newCatalog.parentCategory) {
      const catalog: Catalog = {
        id: `c${Date.now()}`,
        name: newCatalog.name,
        image: newCatalog.image,
        parentCategory: newCatalog.parentCategory
      };
      setCatalogs([...catalogs, catalog]);
      setIsAdding(false);
      setNewCatalog({ parentCategory: 'women' });
    }
  };

  const handleDelete = (id: string) => {
    setCatalogs(catalogs.filter(c => c.id !== id));
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0a0a0f] text-white overflow-hidden">
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={() => setScreen('admin')} className="size-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
            <ChevronLeft className="size-5" />
          </button>
          <h1 className="text-lg font-bold">Manage Catalogs</h1>
        </div>
        <button onClick={() => setIsAdding(true)} className="size-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40 active:scale-95 transition-all">
          <Plus className="size-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-5 pb-24">
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">New Catalog</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Catalog Name</label>
                <input 
                  type="text" 
                  value={newCatalog.name || ''}
                  onChange={e => setNewCatalog({...newCatalog, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Borka, Panjabi"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Parent Category</label>
                <select 
                  value={newCatalog.parentCategory || 'women'}
                  onChange={e => setNewCatalog({...newCatalog, parentCategory: e.target.value})}
                  className="w-full bg-[#1a1a24] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-white"
                >
                  <option value="women">Women</option>
                  <option value="men">Men</option>
                  <option value="baby">Baby</option>
                  <option value="shoes">Shoes</option>
                  <option value="accs">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={newCatalog.image || ''}
                  onChange={e => setNewCatalog({...newCatalog, image: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
              <button 
                onClick={handleAdd}
                className="w-full bg-blue-600 text-white font-bold rounded-xl py-3 shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Save className="size-4" />
                Save Catalog
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {catalogs.map(catalog => (
            <div key={catalog.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <img src={catalog.image} alt={catalog.name} className="size-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold">{catalog.name}</h3>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{catalog.parentCategory}</p>
              </div>
              <div className="flex gap-2">
                <button className="size-8 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400">
                  <Edit2 className="size-4" />
                </button>
                <button 
                  onClick={() => handleDelete(catalog.id)}
                  className="size-8 bg-red-500/10 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors text-red-500"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
