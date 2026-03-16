import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Trash2, Shield, ArrowLeft, Loader2, Check, X } from 'lucide-react';
import { Screen } from '../types';
import { supabase } from '../lib/supabase';
import { createClient } from '@supabase/supabase-js';

// We need a separate client instance to create users without logging out the current admin
// This relies on the same URL/Key as the main client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function AdminStaff({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Staff Form
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('staff');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from('app_admins')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setStaff(data || []);
    } catch (err) {
      console.error('Error fetching staff:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddError('');
    setAddSuccess('');

    try {
      // Insert directly into app_admins table
      const { data, error: dbError } = await supabase
        .from('app_admins')
        .insert({
          email: newEmail,
          password: newPassword,
          full_name: newName,
          role: newRole
        })
        .select()
        .single();

      if (dbError) {
        if (dbError.code === '23505') { // Unique violation
          throw new Error('A staff member with this email already exists.');
        }
        throw dbError;
      }

      setAddSuccess(`Staff member ${newName} created successfully!`);
      setNewEmail('');
      setNewPassword('');
      setNewName('');
      setNewRole('staff');
      fetchStaff();
      
      setTimeout(() => {
        setShowAddModal(false);
        setAddSuccess('');
      }, 2000);

    } catch (err: any) {
      console.error('Error adding staff:', err);
      setAddError(err.message || 'Failed to add staff member');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteStaff = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this staff member? This cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('app_admins')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setStaff(prev => prev.filter(s => s.id !== id));
    } catch (err: any) {
      console.error('Error deleting staff:', err);
      alert('Failed to remove staff access: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setScreen('admin')}
              className="p-2 hover:bg-slate-200 rounded-full transition-colors shrink-0"
            >
              <ArrowLeft className="size-6" />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Staff Management</h1>
              <p className="text-sm md:text-base text-slate-500">Manage admin and staff access</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-95 w-full md:w-auto"
          >
            <UserPlus className="size-5" />
            Add New Staff
          </button>
        </div>

        {/* Staff List */}
        <div className="grid gap-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="size-8 animate-spin text-blue-600" />
            </div>
          ) : staff.length === 0 ? (
            <div className="text-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Users className="size-12 mx-auto mb-4 opacity-50" />
              <p>No staff members found.</p>
            </div>
          ) : (
            staff.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 p-4 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                    member.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {member.full_name?.[0] || member.email?.[0] || 'U'}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg text-slate-900 truncate">{member.full_name || 'Unnamed Staff'}</h3>
                    <p className="text-sm text-slate-500 truncate">{member.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-slate-100 md:border-0">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    member.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {member.role}
                  </div>
                  
                  <button 
                    onClick={() => handleDeleteStaff(member.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors md:opacity-0 md:group-hover:opacity-100"
                    title="Remove Access"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Add Staff Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
                  <Shield className="size-6 text-blue-600" />
                  Add New Staff
                </h2>
                <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-slate-700">
                  <X className="size-6" />
                </button>
              </div>

              {addSuccess ? (
                <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 mb-6">
                  <Check className="size-5" />
                  {addSuccess}
                </div>
              ) : (
                <form onSubmit={handleAddStaff} className="space-y-4">
                  {addError && (
                    <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-3 rounded-lg text-center">
                      {addError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-slate-900"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-slate-900"
                      placeholder="staff@cokmoke.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-slate-900"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500 text-slate-900"
                    >
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={adding}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {adding ? <Loader2 className="size-5 animate-spin" /> : 'Create Account'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
