import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Plus, Pencil, Trash2, X, Save, Star, Eye, EyeOff, Search, Upload, Loader2 } from 'lucide-react';

const EMPTY = {
  category_id:'', name:'', nights:'', start_city:'', end_city:'',
  route_covering:'', price:'', price_label:'Starting From',
  highlights:'', description:'', image_url:'', badge:'',
  duration_label:'', is_featured:false, is_active:true, display_order:0
};

const AdminPackages = () => {
  const [packages, setPackages]   = useState([]);
  const [cats, setCats]           = useState([]);
  const [filterCat, setFilterCat] = useState('');
  const [filterType, setFilterType] = useState('');
  const [search, setSearch]       = useState('');
  const [form, setForm]           = useState(EMPTY);
  const [editing, setEditing]     = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg]             = useState('');

  const load = async () => {
    const [{ data: pkgs }, { data: categories }] = await Promise.all([
      supabase.from('tour_packages').select('*, tour_categories(name, type, slug)').order('created_at', { ascending: false }),
      supabase.from('tour_categories').select('*').order('type').order('display_order'),
    ]);
    setPackages(pkgs || []);
    setCats(categories || []);
  };

  useEffect(() => { load(); }, []);

  const displayed = packages.filter(p => {
    const matchCat  = !filterCat  || p.category_id === filterCat;
    const matchType = !filterType || p.tour_categories?.type === filterType;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  const openNew = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };

  const openEdit = (pkg) => {
    setForm({
      ...EMPTY,
      ...pkg,
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join(', ') : (pkg.highlights || ''),
    });
    setEditing(pkg.id);
    setShowForm(true);
  };

  // --- Image Upload Logic ---
  const handleFileUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `packages/${fileName}`;

      // Upload to 'images' bucket (Make sure this bucket exists in Supabase Storage and is PUBLIC)
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      setForm({ ...form, image_url: data.publicUrl });
      setMsg('Image uploaded successfully!');
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      nights: form.nights ? +form.nights : null,
      price:  form.price  ? +form.price  : null,
      display_order: +form.display_order || 0,
      highlights: form.highlights ? form.highlights.split(',').map(h => h.trim()).filter(Boolean) : [],
    };
    delete payload.tour_categories;

    let err;
    if (editing) {
      ({ error: err } = await supabase.from('tour_packages').update(payload).eq('id', editing));
    } else {
      ({ error: err } = await supabase.from('tour_packages').insert(payload));
    }

    if (err) { setMsg('Error: ' + err.message); }
    else {
      setMsg(editing ? 'Package updated!' : 'Package added!');
      setShowForm(false); setEditing(null); load();
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this package?')) return;
    await supabase.from('tour_packages').delete().eq('id', id);
    load();
  };

  const toggleFeatured = async (pkg) => {
    await supabase.from('tour_packages').update({ is_featured: !pkg.is_featured }).eq('id', pkg.id);
    load();
  };

  const toggleActive = async (pkg) => {
    await supabase.from('tour_packages').update({ is_active: !pkg.is_active }).eq('id', pkg.id);
    load();
  };

  const indiaCats = cats.filter(c => c.type === 'india');
  const intlCats  = cats.filter(c => c.type === 'international');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-black uppercase tracking-tight">Packages</h1>
          <p className="text-slate-400 text-sm mt-1">{packages.length} total packages</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors">
          <Plus size={16}/> Add Package
        </button>
      </div>

      {msg && <div className="mb-4 bg-emerald-900/40 border border-emerald-700 text-emerald-300 text-sm px-4 py-3 rounded-lg">{msg}</div>}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search packages..." className="bg-slate-800 border border-slate-700 text-white text-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 w-56"/>
        </div>
        <select value={filterType} onChange={e => { setFilterType(e.target.value); setFilterCat(''); }}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm px-3 py-2 rounded-lg focus:outline-none">
          <option value="">All Types</option>
          <option value="india">India Tours</option>
          <option value="international">International</option>
        </select>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-slate-300 text-sm px-3 py-2 rounded-lg focus:outline-none">
          <option value="">All Categories</option>
          {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3">Package</th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3 hidden md:table-cell">Category</th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Nights</th>
                <th className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Price</th>
                <th className="text-center text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3">Featured</th>
                <th className="text-center text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {displayed.map(pkg => (
                <tr key={pkg.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium text-sm leading-tight">{pkg.name}</p>
                    {pkg.badge && <span className="text-[10px] text-blue-400 font-bold">{pkg.badge}</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div>
                      <p className="text-slate-300 text-xs">{pkg.tour_categories?.name}</p>
                      <p className="text-slate-600 text-[10px] uppercase">{pkg.tour_categories?.type}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-300 text-sm">{pkg.nights ? `${pkg.nights}N` : '—'}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-slate-300 text-sm">{pkg.price ? `₹${Number(pkg.price).toLocaleString()}` : '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFeatured(pkg)} title="Toggle homepage featured">
                      <Star size={16} className={pkg.is_featured ? 'text-amber-400 fill-amber-400':'text-slate-600 hover:text-amber-400'} />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleActive(pkg)} title="Toggle visibility">
                      {pkg.is_active
                        ? <Eye size={16} className="text-emerald-400 hover:text-slate-400"/>
                        : <EyeOff size={16} className="text-slate-600 hover:text-emerald-400"/>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(pkg)}
                        className="text-slate-400 hover:text-blue-400 transition-colors"><Pencil size={15}/></button>
                      <button onClick={() => handleDelete(pkg.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr><td colSpan={7} className="text-center text-slate-500 py-12 text-sm">No packages found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Form Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={e => e.target===e.currentTarget && setShowForm(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 sticky top-0 bg-slate-900">
              <h2 className="text-white font-bold">{editing ? 'Edit Package' : 'Add Package'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-slate-400 hover:text-white"/></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Category */}
              <div>
                <label className="label">Category *</label>
                <select required value={form.category_id} onChange={e => setForm({...form, category_id:e.target.value})} className="field">
                  <option value="">Select a category</option>
                  <optgroup label="🇮🇳 India Tours">
                    {indiaCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </optgroup>
                  <optgroup label="✈️ International">
                    {intlCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </optgroup>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="label">Package Name *</label>
                <input required value={form.name} onChange={e => setForm({...form, name:e.target.value})}
                  className="field" placeholder="e.g. Heaven on Earth Kashmir"/>
              </div>

              {/* Nights / Start / End */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="label">Nights</label>
                  <input type="number" min="1" value={form.nights} onChange={e => setForm({...form, nights:e.target.value})}
                    className="field" placeholder="5"/>
                </div>
                <div>
                  <label className="label">Start City</label>
                  <input value={form.start_city} onChange={e => setForm({...form, start_city:e.target.value})}
                    className="field" placeholder="Srinagar"/>
                </div>
                <div>
                  <label className="label">End City</label>
                  <input value={form.end_city} onChange={e => setForm({...form, end_city:e.target.value})}
                    className="field" placeholder="Srinagar"/>
                </div>
              </div>

              {/* Route */}
              <div>
                <label className="label">Route / Covering</label>
                <input value={form.route_covering} onChange={e => setForm({...form, route_covering:e.target.value})}
                  className="field" placeholder="e.g. 1 Srinagar - 2 Pahalgam - 1 Gulmarg"/>
              </div>

              {/* Price + Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm({...form, price:e.target.value})}
                    className="field" placeholder="18500"/>
                </div>
                <div>
                  <label className="label">Badge Label</label>
                  <input value={form.badge} onChange={e => setForm({...form, badge:e.target.value})}
                    className="field" placeholder="Popular / Quick / Spiritual"/>
                </div>
              </div>

              {/* Highlights */}
              <div>
                <label className="label">Highlights <span className="text-slate-500 normal-case font-normal">(comma separated)</span></label>
                <input value={form.highlights} onChange={e => setForm({...form, highlights:e.target.value})}
                  className="field" placeholder="Houseboat Stay, Shikara Ride, Gulmarg Gondola"/>
              </div>

              {/* Description */}
              <div>
                <label className="label">Description</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description:e.target.value})}
                  className="field resize-none" placeholder="Short package description..."/>
              </div>

              {/* Image URL & Upload */}
              <div>
                <label className="label">Package Image</label>
                <div className="flex flex-col gap-3">
                  {/* File Upload Option */}
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 border-dashed hover:border-blue-500 text-slate-400 py-3 rounded-lg cursor-pointer transition-colors">
                      {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                      <span className="text-sm font-medium">{uploading ? 'Uploading...' : 'Choose File / Upload Image'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
                    </label>
                  </div>
                  
                  
                  {/* Image Preview */}
                  {form.image_url && (
                    <div className="mt-1 relative w-24 h-16 rounded-lg overflow-hidden border border-slate-700">
                      <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setForm({...form, image_url:''})} className="absolute top-0 right-0 bg-red-600 text-white p-0.5"><X size={10}/></button>
                    </div>
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({...form, is_featured:e.target.checked})}
                    className="w-4 h-4 accent-amber-500"/>
                  <span className="text-slate-300 text-sm">⭐ Show on Homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.is_active} onChange={e => setForm({...form, is_active:e.target.checked})}
                    className="w-4 h-4 accent-blue-500"/>
                  <span className="text-slate-300 text-sm">Active / Visible</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving || uploading}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white py-2.5 rounded-lg font-bold text-sm transition-colors">
                  <Save size={16}/> {saving ? 'Saving...' : (editing ? 'Update Package' : 'Add Package')}
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
        select.field option { background:#1e293b; }
      `}</style>
    </div>
  );
};

export default AdminPackages;