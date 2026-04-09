import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Pencil, Trash2, X, Save, Globe, MapPin, Upload, Loader2 } from 'lucide-react';

const EMPTY = { type: 'india', name: '', slug: '', tagline: '', description: '', image_url: '', display_order: 0, is_active: true };

const toSlug = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const AdminCategories = () => {
  const [cats, setCats]         = useState([]);
  const [tab, setTab]           = useState('india');
  const [form, setForm]         = useState(EMPTY);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving]     = useState(false);
  const [uploading, setUploading] = useState(false); // Added for upload state
  const [msg, setMsg]           = useState('');

  const load = async () => {
    const { data } = await supabase.from('tour_categories').select('*').order('display_order');
    setCats(data || []);
  };
  useEffect(() => { load(); }, []);

  const filtered = cats.filter(c => c.type === tab);

  const openNew = () => {
    setForm({ ...EMPTY, type: tab });
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setForm(cat);
    setEditing(cat.id);
    setShowForm(true);
  };

  // --- NEW: Handle Image Upload to Supabase Storage ---
  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);

      // 1. Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `category-images/${fileName}`;

      // 2. Upload file to Supabase Storage Bucket named 'images'
      // NOTE: Make sure you have created a PUBLIC bucket named 'images' in Supabase
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. Get the Public URL
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      setForm(prev => ({ ...prev, image_url: data.publicUrl }));
      setMsg('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading:', error.message);
      setMsg('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form };
    if (!payload.slug) payload.slug = toSlug(payload.name);

    let err;
    if (editing) {
      ({ error: err } = await supabase.from('tour_categories').update(payload).eq('id', editing));
    } else {
      ({ error: err } = await supabase.from('tour_categories').insert(payload));
    }

    if (err) {
      setMsg('Error: ' + err.message);
    } else {
      setMsg(editing ? 'Category updated!' : 'Category added!');
      setShowForm(false);
      setEditing(null);
      load();
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category? All its packages will also be deleted.')) return;
    await supabase.from('tour_categories').delete().eq('id', id);
    load();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-black uppercase tracking-tight">Categories</h1>
          <p className="text-slate-400 text-sm mt-1">Manage India & International tour sub-sections</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors">
          <Plus size={16}/> Add Category

          
          
        </button>
      </div>

      {msg && <div className="mb-4 bg-emerald-900/40 border border-emerald-700 text-emerald-300 text-sm px-4 py-3 rounded-lg">{msg}</div>}

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {['india','international'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${tab===t ? 'bg-blue-600 text-white':'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {t === 'india' ? '🇮🇳 India Tours' : '✈️ International'}
          </button>
        ))}
      </div>

      {/* Category grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cat => (
          <div key={cat.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group">
            {cat.image_url ? (
              <div className="h-32 overflow-hidden">
                <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>
              </div>
            ) : (
              <div className="h-32 bg-slate-800 flex items-center justify-center">
                <MapPin size={32} className="text-slate-600"/>
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-white font-bold text-sm leading-tight">{cat.name}</h3>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cat.is_active ? 'bg-emerald-900 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
                  {cat.is_active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-3">{cat.tagline || cat.slug}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(cat)}
                  className="flex-1 flex items-center justify-center gap-1 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white text-xs py-2 rounded-lg transition-colors font-medium">
                  <Pencil size={13}/> Edit
                </button>
                <button onClick={() => handleDelete(cat.id)}
                  className="flex items-center justify-center gap-1 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white text-xs px-3 py-2 rounded-lg transition-colors">
                  <Trash2 size={13}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setShowForm(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <h2 className="text-white font-bold">{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-slate-400 hover:text-white"/></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Image Upload Field */}
              <div>
                <label className="label">Category Image</label>
                <div className="mt-1 flex flex-col items-center gap-4 p-4 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50">
                  {form.image_url ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => setForm({...form, image_url: ''})}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                      >
                        <X size={16}/>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-40 cursor-pointer hover:bg-slate-800 transition-colors">
                      {uploading ? (
                        <Loader2 size={32} className="text-blue-500 animate-spin" />
                      ) : (
                        <>
                          <Upload size={32} className="text-slate-500 mb-2" />
                          <span className="text-slate-400 text-sm font-medium">Click to upload image</span>
                        </>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="label">Type</label>
                <div className="flex gap-3 mt-1">
                  {['india','international'].map(t => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value={t} checked={form.type===t} onChange={() => setForm({...form, type:t})} className="accent-blue-500"/>
                      <span className="text-slate-300 text-sm capitalize">{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Name *</label>
                  <input required value={form.name}
                    onChange={e => setForm({...form, name: e.target.value, slug: toSlug(e.target.value)})}
                    className="field" placeholder="e.g. Kashmir"/>
                </div>
                <div>
                  <label className="label">Slug *</label>
                  <input required value={form.slug}
                    onChange={e => setForm({...form, slug: e.target.value})}
                    className="field" placeholder="e.g. kashmir"/>
                </div>
              </div>

              <div>
                <label className="label">Tagline</label>
                <input value={form.tagline||''} onChange={e => setForm({...form, tagline:e.target.value})}
                  className="field" placeholder="e.g. The Earth Heaven"/>
              </div>

              <div>
                <label className="label">Description</label>
                <textarea rows={3} value={form.description||''} onChange={e => setForm({...form, description:e.target.value})}
                  className="field resize-none" placeholder="Short description..."/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => setForm({...form, display_order:+e.target.value})}
                    className="field" min="0"/>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active:e.target.checked})}
                      className="w-4 h-4 accent-blue-500"/>
                    <span className="text-slate-300 text-sm">Active / Visible</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving || uploading}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white py-2.5 rounded-lg font-bold text-sm transition-colors">
                  <Save size={16}/> {saving ? 'Saving...' : (editing ? 'Update' : 'Add Category')}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium text-sm transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .label { display:block; color:#94a3b8; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; margin-bottom:6px; }
        .field { width:100%; background:#1e293b; border:1px solid #334155; color:#f1f5f9; padding:10px 12px; border-radius:8px; font-size:14px; outline:none; transition:border-color .2s; }
        .field:focus { border-color:#3b82f6; }
        .field::placeholder { color:#475569; }
      `}</style>
    </div>
  );
};

export default AdminCategories;