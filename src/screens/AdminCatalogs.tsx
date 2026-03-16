import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Plus, Trash2, Edit2, Save, X, Upload } from 'lucide-react';
import { Screen, Catalog } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminCatalogs({ setScreen, catalogs, setCatalogs }: { setScreen: (s: Screen) => void, catalogs: Catalog[], setCatalogs: (c: Catalog[]) => void }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCatalog, setNewCatalog] = useState<Partial<Catalog>>({ parentCategory: 'women' });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ইমেজ আপলোড ফাংশন (Supabase Storage-এ)
  const uploadToStorage = async (file: File, folder: string) => {
    if (!isSupabaseConfigured) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error } = await supabase.storage.from('catalogs').upload(filePath, file);
    if (error) {
      console.error("Upload error:", error);
      return null;
    }
    const { data } = supabase.storage.from('catalogs').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const url = await uploadToStorage(file, 'covers');
      if (url) setNewCatalog({ ...newCatalog, image: url });
      setLoading(false);
    }
  };

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const url = await uploadToStorage(file, 'icons');
      if (url) setNewCatalog({ ...newCatalog, icon: url });
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    console.log("handleAdd clicked. Current newCatalog state:", newCatalog);
    if (newCatalog.name && newCatalog.image && newCatalog.parentCategory) {
      setLoading(true);
      console.log("Attempting to add catalog...");
      const newId = `c${Date.now()}`;
      const catalog: Catalog = {
        id: newId,
        name: newCatalog.name,
        image: newCatalog.image,
        parentCategory: newCatalog.parentCategory,
        icon: newCatalog.icon
      };

      try {
        console.log("Saving to Supabase...", catalog);
        if (!isSupabaseConfigured) {
          throw new Error("Supabase is not configured. Please check your environment variables.");
        }
        const { error } = await supabase.from('catalogs').insert([
          { id: catalog.id, name: catalog.name, image: catalog.image, parent_category: catalog.parentCategory, icon: catalog.icon }
        ]);
        if (error) {
          console.error("Supabase insert error:", error);
          throw error;
        }
        console.log("Successfully saved to Supabase.");
      } catch (error) {
        console.error("Error adding catalog:", error);
        alert("Failed to add catalog to database: " + (error as Error).message);
        setLoading(false);
        return;
      }

      setCatalogs([...catalogs, catalog]);
      setIsAdding(false);
      setNewCatalog({ parentCategory: 'women' });
      setLoading(false);
      console.log("Catalog added successfully.");
    } else {
      console.warn("Validation failed. Missing fields:", {
        name: !!newCatalog.name,
        image: !!newCatalog.image,
        parentCategory: !!newCatalog.parentCategory
      });
      alert("Please fill in all required fields (Name, Cover Image, Category)");
    }
  };

  const handleEdit = (catalog: Catalog) => {
    setEditingId(catalog.id);
    setNewCatalog(catalog);
    setIsAdding(true);
  };

  const handleSaveEdit = async () => {
    if (editingId && newCatalog.name && newCatalog.image && newCatalog.parentCategory) {
      setLoading(true);
      
      try {
        const { error } = await supabase.from('catalogs').update({
          name: newCatalog.name,
          image: newCatalog.image,
          parent_category: newCatalog.parentCategory,
          icon: newCatalog.icon
        }).eq('id', editingId);
        
        if (error) throw error;
      } catch (error) {
        console.error("Error updating catalog:", error);
        alert("Failed to update catalog in database.");
        setLoading(false);
        return;
      }

      setCatalogs(catalogs.map(c => c.id === editingId ? { ...c, ...newCatalog } as Catalog : c));
      setEditingId(null);
      setIsAdding(false);
      setNewCatalog({ parentCategory: 'women' });
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this catalog?")) {
      try {
        const { error } = await supabase.from('catalogs').delete().eq('id', id);
        if (error) throw error;
      } catch (error) {
        console.error("Error deleting catalog:", error);
        alert("Failed to delete catalog from database.");
        return;
      }
      setCatalogs(catalogs.filter(c => c.id !== id));
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 text-slate-900 overflow-hidden">
      <header className="sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-200 shadow-sm">
        <button onClick={() => setScreen('admin')} className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
          <ChevronLeft className="size-6" />
        </button>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Manage Catalogs</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="size-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-600/20 active:scale-95 transition-all hover:bg-blue-700">
          {isAdding ? <X className="size-5" /> : <Plus className="size-5" />}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-5 pb-24 max-w-7xl mx-auto w-full">
        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-2xl mx-auto shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-slate-900">{editingId ? 'Edit Catalog' : 'Add New Catalog'}</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Catalog Name</label>
                      <input 
                        type="text" 
                        value={newCatalog.name || ''}
                        onChange={e => setNewCatalog({...newCatalog, name: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-900 placeholder:text-slate-400"
                        placeholder="e.g. Summer Collection"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Parent Category</label>
                      <div className="relative">
                        <select 
                          value={newCatalog.parentCategory || 'women'}
                          onChange={e => setNewCatalog({...newCatalog, parentCategory: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-900 appearance-none transition-colors"
                        >
                          <option value="women">Women</option>
                          <option value="men">Men</option>
                          <option value="baby">Baby</option>
                          <option value="shoes">Shoes</option>
                          <option value="accs">Accessories</option>
                        </select>
                        <ChevronLeft className="absolute right-4 top-1/2 -translate-y-1/2 size-4 -rotate-90 text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cover Image</label>
                      <div className="flex gap-4 items-start">
                        {newCatalog.image ? (
                          <div className="size-16 rounded-xl border border-slate-200 overflow-hidden shrink-0 bg-slate-50">
                            <img src={newCatalog.image} alt="Cover preview" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="size-16 rounded-xl border border-slate-200 border-dashed shrink-0 bg-slate-50 flex items-center justify-center text-slate-400">
                            <Upload className="size-5" />
                          </div>
                        )}
                        <div className="flex-1 space-y-2">
                          <label className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer">
                            <Upload className="size-4" />
                            Upload Cover Image
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Icon Image</label>
                      <div className="flex items-center gap-4">
                        {newCatalog.icon ? (
                          <div className="size-12 rounded-lg border border-slate-200 overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center p-1">
                            <img src={newCatalog.icon} alt="Icon preview" className="max-w-full max-h-full object-contain" />
                          </div>
                        ) : (
                          <div className="size-12 rounded-lg border border-slate-200 border-dashed shrink-0 bg-slate-50 flex items-center justify-center text-slate-400">
                            <Upload className="size-5" />
                          </div>
                        )}
                        <div className="flex-1">
                          <input 
                            type="file" 
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleIconUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2"
                          >
                            <Upload className="size-4" />
                            Upload Icon Image
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6">
                      <button 
                        onClick={editingId ? handleSaveEdit : handleAdd}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-bold rounded-xl py-3 shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50"
                      >
                        <Save className="size-4" />
                        {loading ? 'Saving...' : (editingId ? 'Update Catalog' : 'Save Catalog')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {catalogs.map(catalog => (
            <motion.div 
              layout
              key={catalog.id} 
              className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 group hover:border-blue-200 hover:shadow-sm transition-all"
            >
              <div className="size-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img src={catalog.image} alt={catalog.name} className="size-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-slate-900 truncate">{catalog.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-block text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {catalog.parentCategory}
                  </span>
                  {catalog.icon && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      <img src={catalog.icon} alt="icon" className="size-3 object-contain" />
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleEdit(catalog)}
                  className="size-8 bg-slate-50 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900"
                >
                  <Edit2 className="size-4" />
                </button>
                <button 
                  onClick={() => handleDelete(catalog.id)}
                  className="size-8 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors text-red-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
