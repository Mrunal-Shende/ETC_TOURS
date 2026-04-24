

import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import {
  Plus, Pencil, Trash2, X, Save,
  Star, Eye, EyeOff, Search,
  PlusCircle, MinusCircle,
  Upload, Link as LinkIcon, Copy, Check,
  Image as ImageIcon, Loader2
} from 'lucide-react';


/* ══════════════════════════════════════════════════════════════
   IMAGE UPLOADER
   — Upload to Supabase Storage OR paste a URL
   — Requires bucket "package-images" to be PUBLIC in Supabase
══════════════════════════════════════════════════════════════ */
const ImageUploader = ({ label, currentUrl, onUpload }) => {
  const [mode, setMode]       = useState('url');   // 'url' | 'file'
  const [urlInput, setUrlInput] = useState(currentUrl || '');
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [drag, setDrag]       = useState(false);
  const [error, setError]     = useState('');
  const fileRef = useRef(null);

  /* sync if parent changes */
  useEffect(() => { setUrlInput(currentUrl || ''); }, [currentUrl]);

  const handleUrlConfirm = () => {
    if (urlInput.trim()) { onUpload(urlInput.trim()); setError(''); }
  };

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB.'); return; }
    setError('');
    setUploading(true);
    try {
      const ext  = file.name.split('.').pop();
      const path = `packages/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('package-images')
        .upload(path, file, { cacheControl: '3600', upsert: false });

      if (upErr) { setError('Upload failed: ' + upErr.message); setUploading(false); return; }

      const { data } = supabase.storage.from('package-images').getPublicUrl(path);
      onUpload(data.publicUrl);
      setUrlInput(data.publicUrl);
    } catch (e) {
      setError('Upload error: ' + e.message);
    }
    setUploading(false);
  };

  const handleDrop = e => {
    e.preventDefault(); setDrag(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const copyUrl = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const removeImage = () => { onUpload(''); setUrlInput(''); };

  return (
    <div>
      {label && <p className="label mb-3">{label}</p>}

      {/* Mode toggle */}
      <div className="flex gap-2 mb-3">
        {[['url', <LinkIcon size={12}/>, 'Paste URL'], ['file', <Upload size={12}/>, 'Upload File']].map(([m, icon, lbl]) => (
          <button key={m} type="button" onClick={() => setMode(m)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors ${
              mode === m ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
            }`}>
            {icon} {lbl}
          </button>
        ))}
      </div>

      {/* URL mode */}
      {mode === 'url' && (
        <div className="flex gap-2">
          <input
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onBlur={handleUrlConfirm}
            onKeyDown={e => e.key === 'Enter' && handleUrlConfirm()}
            placeholder="https://example.com/image.jpg"
            className="field flex-1"
          />
          <button type="button" onClick={handleUrlConfirm}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap">
            Set
          </button>
        </div>
      )}

      {/* File upload mode */}
      {mode === 'file' && (
        <div
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileRef.current?.click()}
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
            drag ? 'border-blue-400 bg-blue-900/20' : 'border-slate-600 hover:border-slate-400'
          }`}
        >
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={e => handleFile(e.target.files[0])}/>
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={24} className="text-blue-400 animate-spin"/>
              <p className="text-slate-400 text-xs">Uploading to Supabase...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} className="text-slate-500"/>
              <p className="text-slate-400 text-xs">Drag & drop an image here, or click to browse</p>
              <p className="text-slate-600 text-[10px]">PNG, JPG, WEBP — max 5 MB</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

      {/* Preview */}
      {currentUrl && (
        <div className="mt-3 relative group">
          <img src={currentUrl} alt="Preview"
            className="w-full h-36 object-cover rounded-lg border border-slate-700"
            onError={e => { e.target.style.display='none'; }}/>
          <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button type="button" onClick={copyUrl}
              className="w-7 h-7 rounded bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
              title="Copy URL">
              {copied ? <Check size={13}/> : <Copy size={13}/>}
            </button>
            <button type="button" onClick={removeImage}
              className="w-7 h-7 rounded bg-red-600/80 hover:bg-red-600 flex items-center justify-center text-white transition-colors"
              title="Remove">
              <X size={13}/>
            </button>
          </div>
          {copied && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] px-3 py-1 rounded-full">
              URL copied!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   ACCOMMODATION EDITOR
   — Visual row builder for city/nights/category/meal plan
   — Saves as JSON array to accommodation column
══════════════════════════════════════════════════════════════ */
// const MEAL_OPTIONS = ['CP', 'MAP', 'AP', 'EP', 'BB'];
const MEAL_OPTIONS = [
  { code: 'CP', label: 'CP (Breakfast Included)' },
  { code: 'MAP', label: 'MAP (Breakfast + Dinner)' },
  { code: 'AP', label: 'AP (All Meals Included)' },
  { code: 'EP', label: 'EP (Room Only)' },
  { code: 'BB', label: 'BB (Bed & Breakfast)' }
];
const EMPTY_ROW    = { city:'', nights:'', cat_a:'', cat_b:'', cat_c:'', meal_plan:'CP' };

const AccommodationEditor = ({ value, onChange }) => {
  const rows = Array.isArray(value) ? value : [];

  const addRow    = ()          => onChange([...rows, { ...EMPTY_ROW }]);
  const removeRow = idx         => onChange(rows.filter((_,i) => i !== idx));
  const updateRow = (idx,k,v)   => onChange(rows.map((r,i) => i===idx ? { ...r, [k]:v } : r));

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-white text-sm font-bold">Accommodation Options</p>
          <p className="text-slate-400 text-xs mt-0.5">Add one row per city/night combination</p>
        </div>
        <span className="bg-blue-900 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">{rows.length} rows</span>
      </div>

      {rows.length === 0 ? (
        <div className="border border-dashed border-slate-600 rounded-lg p-6 text-center">
          <p className="text-slate-500 text-xs">No accommodation rows yet. Click below to add.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-[1fr_60px_1fr_1fr_1fr_90px_32px] gap-2 px-2">
            {['City','Nights','Cat A','Cat B','Cat C','Meal Plan',''].map((h,i) => (
              <p key={i} className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{h}</p>
            ))}
          </div>
          {/* Rows */}
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_60px_1fr_1fr_1fr_90px_32px] gap-2 items-center bg-slate-800 border border-slate-700 rounded-lg p-2">
              <input value={row.city} onChange={e => updateRow(idx,'city',e.target.value)}
                placeholder="Port Blair" className="field-sm"/>
              <input type="number" min="1" value={row.nights} onChange={e => updateRow(idx,'nights',e.target.value)}
                placeholder="2" className="field-sm"/>
              <input value={row.cat_a} onChange={e => updateRow(idx,'cat_a',e.target.value)}
                placeholder="Hotel name" className="field-sm"/>
              <input value={row.cat_b} onChange={e => updateRow(idx,'cat_b',e.target.value)}
                placeholder="Hotel name" className="field-sm"/>
              <input value={row.cat_c} onChange={e => updateRow(idx,'cat_c',e.target.value)}
                placeholder="Hotel name" className="field-sm"/>
              {/* <select value={row.meal_plan} onChange={e => updateRow(idx,'meal_plan',e.target.value)}
                className="field-sm">
                {MEAL_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
              </select> */}
              <select
              value={row.meal_plan}
              onChange={e => updateRow(idx, 'meal_plan', e.target.value)}
              className="field-sm"
            >
              {MEAL_OPTIONS.map(m => (
                <option key={m.code} value={m.code}>
                  {m.label}
                </option>
              ))}
            </select>
              <button type="button" onClick={() => removeRow(idx)}
                className="text-slate-600 hover:text-red-400 transition-colors flex items-center justify-center">
                <Trash2 size={14}/>
              </button>
            </div>
          ))}
        </div>
      )}

      <button type="button" onClick={addRow}
        className="mt-3 w-full flex items-center justify-center gap-2 border border-dashed border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500 py-3 rounded-lg text-sm transition-colors">
        <PlusCircle size={16}/> Add Row
      </button>

      {/* JSON preview for debugging */}
      {rows.length > 0 && (
        <details className="mt-3">
          <summary className="text-[10px] text-slate-600 cursor-pointer hover:text-slate-400 uppercase tracking-wider font-bold">
            View JSON (debug)
          </summary>
          <pre className="mt-2 bg-slate-800 text-slate-400 text-[10px] p-3 rounded-lg overflow-x-auto">
            {JSON.stringify(rows, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   ITINERARY BUILDER
══════════════════════════════════════════════════════════════ */
const ItineraryBuilder = ({ days, onChange }) => {
  const addDay    = ()            => onChange([...days, { day_number: days.length+1, title:'', description:'' }]);
  const removeDay = idx           => onChange(days.filter((_,i) => i!==idx).map((d,i) => ({ ...d, day_number:i+1 })));
  const updateDay = (idx, k, v)   => onChange(days.map((d,i) => i===idx ? { ...d, [k]:v } : d));

  return (
    <div className="space-y-3">
      {days.map((day, idx) => (
        <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded flex-shrink-0">
              Day {day.day_number}
            </span>
            <input value={day.title} onChange={e => updateDay(idx,'title',e.target.value)}
              placeholder="Day title e.g. Arrive at Port Blair" className="field flex-1"/>
            <button type="button" onClick={() => removeDay(idx)}
              className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
              <MinusCircle size={18}/>
            </button>
          </div>
          <textarea rows={3} value={day.description} onChange={e => updateDay(idx,'description',e.target.value)}
            placeholder="Describe activities for this day..." className="field resize-none w-full"/>
        </div>
      ))}
      <button type="button" onClick={addDay}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500 py-3 rounded-lg text-sm transition-colors">
        <PlusCircle size={16}/> Add Day
      </button>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   EMPTY FORM STATE
══════════════════════════════════════════════════════════════ */
const EMPTY = {
  category_id:'', name:'', nights:'', start_city:'', end_city:'',
  route_covering:'', price:'', price_label:'Starting From',
  highlights:'', description:'', image_url:'', badge:'',
  duration_label:'', is_featured:false, is_active:true, display_order:0,
  inclusions:'', exclusions:'', gallery:'', itinerary:[],
  key_details:'', validity_text:'', accommodation:[],
};

/* ══════════════════════════════════════════════════════════════
   MAIN ADMIN PACKAGES COMPONENT
══════════════════════════════════════════════════════════════ */
const AdminPackages = () => {
  const [packages, setPackages]     = useState([]);
  const [cats, setCats]             = useState([]);
  const [filterCat, setFilterCat]   = useState('');
  const [filterType, setFilterType] = useState('');
  const [search, setSearch]         = useState('');
  const [form, setForm]             = useState(EMPTY);
  const [editing, setEditing]       = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [saving, setSaving]         = useState(false);
  const [msg, setMsg]               = useState('');
  const [activeTab, setActiveTab]   = useState('basic');

  const load = async () => {
    const [{ data: pkgs }, { data: categories }] = await Promise.all([
      supabase.from('tour_packages')
        .select('*, tour_categories(name,type,slug)')
        .order('created_at', { ascending:false }),
      supabase.from('tour_categories')
        .select('*').order('type').order('display_order'),
    ]);
    setPackages(pkgs || []);
    setCats(categories || []);
  };

  useEffect(() => { load(); }, []);

  const displayed = packages.filter(p => {
    const matchCat    = !filterCat  || p.category_id === filterCat;
    const matchType   = !filterType || p.tour_categories?.type === filterType;
    const matchSearch = !search     || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchType && matchSearch;
  });

  const openNew = () => {
    setForm(EMPTY); setEditing(null); setActiveTab('basic'); setShowForm(true);
  };

  const openEdit = pkg => {
    setForm({
      ...EMPTY, ...pkg,
      highlights:    Array.isArray(pkg.highlights) ? pkg.highlights.join(', ') : (pkg.highlights||''),
      inclusions:    pkg.inclusions    || '',
      exclusions:    pkg.exclusions    || '',
      gallery:       pkg.gallery       || '',
      key_details:   pkg.key_details   || '',
      validity_text: pkg.validity_text || '',
      itinerary:     Array.isArray(pkg.itinerary)     ? pkg.itinerary     : [],
      accommodation: Array.isArray(pkg.accommodation) ? pkg.accommodation : [],
    });
    setEditing(pkg.id); setActiveTab('basic'); setShowForm(true);
  };

  const handleSave = async e => {
    e.preventDefault(); setSaving(true);
    const payload = {
      category_id:    form.category_id,
      name:           form.name,
      nights:         form.nights ? +form.nights : null,
      price:          form.price  ? +form.price  : null,
      display_order:  +form.display_order || 0,
      start_city:     form.start_city,
      end_city:       form.end_city,
      route_covering: form.route_covering,
      price_label:    form.price_label,
      description:    form.description,
      // image_url:      form.image_url,
      badge:          form.badge,
      duration_label: form.duration_label,
      is_featured:    form.is_featured,
      is_active:      form.is_active,
      highlights: form.highlights
        ? form.highlights.split(',').map(h=>h.trim()).filter(Boolean) : [],
      inclusions:    form.inclusions    || null,
      exclusions:    form.exclusions    || null,
      gallery:       form.gallery       || null,
      key_details:   form.key_details   || null,
      validity_text: form.validity_text || null,
      itinerary:     form.itinerary.length     ? form.itinerary     : null,
      accommodation: form.accommodation.length ? form.accommodation : null,
    };
    delete payload.tour_categories;

    let err;
    if (editing) {
      ({ error:err } = await supabase.from('tour_packages').update(payload).eq('id', editing));
    } else {
      ({ error:err } = await supabase.from('tour_packages').insert(payload));
    }
    if (err) { setMsg('Error: '+err.message); }
    else {
      setMsg(editing ? 'Package updated!' : 'Package added!');
      setShowForm(false); setEditing(null); load();
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async id => {
    if (!confirm('Delete this package?')) return;
    await supabase.from('tour_packages').delete().eq('id', id);
    load();
  };

  const toggleFeatured = async pkg => {
    await supabase.from('tour_packages').update({ is_featured: !pkg.is_featured }).eq('id', pkg.id);
    load();
  };

  const toggleActive = async pkg => {
    await supabase.from('tour_packages').update({ is_active: !pkg.is_active }).eq('id', pkg.id);
    load();
  };

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const indiaCats = cats.filter(c => c.type==='india');
  const intlCats  = cats.filter(c => c.type==='international');

  const TABS = [
    { id:'basic',         label:'Basic Info'         },
    { id:'media',         label:'Images'             },
    { id:'itinerary',     label:'Itinerary'          },
    { id:'accommodation', label:'Accommodation'      },
    { id:'details',       label:'Inc / Exc'          },
    { id:'keyinfo',       label:'Key Details'        },
  ];

  return (
    <div>
      {/* ── Page Header ── */}
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

      {msg && (
        <div className="mb-4 bg-emerald-900/40 border border-emerald-700 text-emerald-300 text-sm px-4 py-3 rounded-lg">{msg}</div>
      )}

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search packages..."
            className="bg-slate-800 border border-slate-700 text-white text-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 w-56"/>
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

      {/* ── Table ── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Package','Category','Nights','Price','Days','Acc','Featured','Status','Actions'].map(h => (
                  <th key={h} className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {displayed.map(pkg => (
                <tr key={pkg.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    {/* thumbnail */}
                    <div className="flex items-center gap-3">
                      {pkg.image_url ? (
                        <img src={pkg.image_url} alt="" className="w-10 h-8 object-cover rounded flex-shrink-0 opacity-80"/>
                      ) : (
                        <div className="w-10 h-8 bg-slate-700 rounded flex items-center justify-center flex-shrink-0">
                          <ImageIcon size={12} className="text-slate-500"/>
                        </div>
                      )}
                      <div>
                        <p className="text-white font-medium text-sm leading-tight max-w-[160px] truncate">{pkg.name}</p>
                        {pkg.badge && <span className="text-[10px] text-blue-400 font-bold">{pkg.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-slate-300 text-xs">{pkg.tour_categories?.name}</p>
                    <p className="text-slate-600 text-[10px] uppercase">{pkg.tour_categories?.type}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-sm">{pkg.nights ? `${pkg.nights}N` : '—'}</td>
                  <td className="px-4 py-3 text-slate-300 text-sm whitespace-nowrap">
                    {pkg.price ? `₹${Number(pkg.price).toLocaleString()}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0
                      ? <span className="text-emerald-400 font-bold">{pkg.itinerary.length}D</span>
                      : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {Array.isArray(pkg.accommodation) && pkg.accommodation.length > 0
                      ? <span className="text-violet-400 font-bold">{pkg.accommodation.length}R</span>
                      : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFeatured(pkg)} title="Toggle homepage featured">
                      <Star size={16} className={pkg.is_featured ? 'text-amber-400 fill-amber-400' : 'text-slate-600 hover:text-amber-400'}/>
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleActive(pkg)}>
                      {pkg.is_active
                        ? <Eye size={16} className="text-emerald-400 hover:text-slate-400"/>
                        : <EyeOff size={16} className="text-slate-600 hover:text-emerald-400"/>}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(pkg)} className="text-slate-400 hover:text-blue-400 transition-colors"><Pencil size={15}/></button>
                      <button onClick={() => handleDelete(pkg.id)} className="text-slate-400 hover:text-red-400 transition-colors"><Trash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr><td colSpan={9} className="text-center text-slate-500 py-12 text-sm">No packages found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FORM MODAL
      ══════════════════════════════════════════════════════════════ */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={e => e.target===e.currentTarget && setShowForm(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 flex-shrink-0">
              <div>
                <h2 className="text-white font-bold">{editing ? 'Edit Package' : 'Add Package'}</h2>
                {form.name && <p className="text-slate-400 text-xs mt-0.5 truncate max-w-xs">{form.name}</p>}
              </div>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-slate-400 hover:text-white"/>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 flex-shrink-0 overflow-x-auto">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeTab===tab.id
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-5">

                {/* ══ TAB 1: BASIC INFO ══ */}
                {activeTab==='basic' && (
                  <>
                    <div>
                      <label className="label">Category *</label>
                      <select required value={form.category_id} onChange={set('category_id')} className="field">
                        <option value="">Select a category</option>
                        <optgroup label="🇮🇳 India Tours">
                          {indiaCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </optgroup>
                        <optgroup label="✈️ International">
                          {intlCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <label className="label">Package Name *</label>
                      <input required value={form.name} onChange={set('name')} className="field" placeholder="e.g. Andaman Unlimited"/>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="label">Nights</label>
                        <input type="number" min="1" value={form.nights} onChange={set('nights')} className="field" placeholder="5"/>
                      </div>
                      <div>
                        <label className="label">Start City</label>
                        <input value={form.start_city} onChange={set('start_city')} className="field" placeholder="Port Blair"/>
                      </div>
                      <div>
                        <label className="label">End City</label>
                        <input value={form.end_city} onChange={set('end_city')} className="field" placeholder="Port Blair"/>
                      </div>
                    </div>
                    <div>
                      <label className="label">Route / Covering</label>
                      <input value={form.route_covering} onChange={set('route_covering')} className="field"
                        placeholder="1 Port Blair - 2 Havelock - 2 Port Blair"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="label">Price (₹)</label>
                        <input type="number" value={form.price} onChange={set('price')} className="field" placeholder="18500"/>
                      </div>
                      <div>
                        <label className="label">Badge Label</label>
                        <input value={form.badge} onChange={set('badge')} className="field" placeholder="Popular / Spiritual"/>
                      </div>
                    </div>
                    <div>
                      <label className="label">Highlights <span className="text-slate-500 normal-case font-normal">(comma separated)</span></label>
                      <input value={form.highlights} onChange={set('highlights')} className="field"
                        placeholder="Cellular Jail, Havelock Beach, Water Sports"/>
                    </div>
                    <div>
                      <label className="label">Description</label>
                      <textarea rows={4} value={form.description} onChange={set('description')}
                        className="field resize-none" placeholder="Short package overview shown on the category page..."/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                        <input type="checkbox" checked={form.is_featured}
                          onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
                          className="w-4 h-4 accent-amber-500"/>
                        <div>
                          <p className="text-slate-200 text-sm font-bold">⭐ Featured</p>
                          <p className="text-slate-500 text-[10px]">Show on homepage</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                        <input type="checkbox" checked={form.is_active}
                          onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                          className="w-4 h-4 accent-blue-500"/>
                        <div>
                          <p className="text-slate-200 text-sm font-bold">👁 Active</p>
                          <p className="text-slate-500 text-[10px]">Visible on website</p>
                        </div>
                      </label>
                    </div>
                  </>
                )}

                {/* ══ TAB 2: IMAGES ══ */}
                {activeTab==='media' && (
                  <>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-2">
                      <p className="text-slate-400 text-xs leading-relaxed">
                        <span className="text-blue-400 font-bold">Tip:</span> Upload images directly to Supabase Storage (requires a public bucket named <span className="font-mono bg-slate-700 px-1 rounded">package-images</span>), or paste any external image URL.
                      </p>
                    </div>

                    {/* Hero image */}
                    {/* <ImageUploader
                      label="Hero / Cover Image"
                      currentUrl={form.image_url}
                      onUpload={url => setForm(f => ({ ...f, image_url: url }))}
                    /> */}

                    <ImageUploader
                      label="Upload Gallery Image"
                      currentUrl=""
                      onUpload={(url) => {
                        setForm(f => ({
                          ...f,
                          gallery: f.gallery
                            ? f.gallery + ', ' + url
                            : url
                        }))
                      }}
                    />

                    <div className="border-t border-slate-800 pt-5">
                      <label className="label">Gallery Images <span className="text-slate-500 normal-case font-normal">(comma separated URLs)</span></label>
                      <p className="text-slate-500 text-xs mb-2">Paste multiple image URLs separated by commas. They show as a photo grid on the detail page.</p>
                      <textarea rows={3} value={form.gallery} onChange={set('gallery')} className="field resize-none"
                        placeholder="https://image1.jpg, https://image2.jpg, https://image3.jpg"/>
                      {/* Gallery previews */}
                      {form.gallery && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {form.gallery.split(',').map((url,i) => url.trim() && (
                            <div key={i} className="relative group">
                              <img src={url.trim()} alt={`Gallery ${i+1}`}
                                className="h-16 w-24 object-cover rounded-lg border border-slate-700 opacity-80 hover:opacity-100 transition-opacity"
                                onError={e => e.target.parentElement.style.display='none'}/>
                              <span className="absolute top-0.5 left-0.5 bg-black/60 text-white text-[8px] px-1 rounded">{i+1}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ══ TAB 3: ITINERARY ══ */}
                {activeTab==='itinerary' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-bold text-sm">Day-by-Day Itinerary</p>
                        <p className="text-slate-400 text-xs mt-0.5">Each day shows as an expandable accordion on the detail page.</p>
                      </div>
                      <span className="bg-blue-900 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                        {form.itinerary.length} days
                      </span>
                    </div>
                    <ItineraryBuilder
                      days={form.itinerary}
                      onChange={days => setForm(f => ({ ...f, itinerary: days }))}
                    />
                  </div>
                )}

                {/* ══ TAB 4: ACCOMMODATION ══ */}
                {activeTab==='accommodation' && (
                  <>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-1">
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Add accommodation options per city. <strong className="text-slate-300">Category A</strong> = Standard, <strong className="text-slate-300">Category B</strong> = Deluxe, <strong className="text-slate-300">Category C</strong> = Premium. Leave blank if not applicable.
                      </p>
                      <p className="text-slate-500 text-xs mt-1.5">
                        <strong className="text-slate-400">Meal Plans:</strong> Bed & Breakfast · MAP = Breakfast + Dinner · AP = All Meals · EP = Room Only · BB = Bed & Breakfast
                      </p>
                    </div>
                    <AccommodationEditor
                      value={form.accommodation}
                      onChange={rows => setForm(f => ({ ...f, accommodation: rows }))}
                    />
                  </>
                )}

                {/* ══ TAB 5: INC / EXC ══ */}
                {activeTab==='details' && (
                  <>
                    <div>
                      <label className="label">Inclusions <span className="text-slate-500 normal-case font-normal">(one per line)</span></label>
                      <textarea rows={7} value={form.inclusions} onChange={set('inclusions')}
                        className="field resize-none"
                        placeholder={"Accommodation as mentioned\nAll transfers by AC car\nEntry tickets to sightseeing\nPrivate ferry tickets\nMeet & greet at airport"}/>
                    </div>
                    <div>
                      <label className="label">Exclusions <span className="text-slate-500 normal-case font-normal">(one per line)</span></label>
                      <textarea rows={6} value={form.exclusions} onChange={set('exclusions')}
                        className="field resize-none"
                        placeholder={"Air tickets and airport taxes\nWater sports activities\nPersonal expenses\nTipping and porterage"}/>
                    </div>
                  </>
                )}

                {/* ══ TAB 6: KEY DETAILS ══ */}
                {activeTab==='keyinfo' && (
                  <>
                    {/* Validity banner */}
                    <div>
                      <label className="label">
                        Package Validity Text
                        <span className="ml-2 text-amber-400 text-[10px] font-bold normal-case tracking-normal">★ Shown as amber highlight banner</span>
                      </label>
                      <input
                        value={form.validity_text}
                        onChange={set('validity_text')}
                        className="field"
                        placeholder="This package is valid from 01st April 2026 to 30th September 2026."
                      />
                      {form.validity_text && (
                        <div className="mt-2 flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-4 py-2.5 rounded-lg">
                          <span className="text-amber-400 text-xs flex-shrink-0">★</span>
                          <p className="text-amber-300 text-xs font-bold">{form.validity_text}</p>
                        </div>
                      )}
                      <p className="text-slate-500 text-[10px] mt-1.5">Appears as a full-width amber banner near the top of the package detail page.</p>
                    </div>

                    <div className="border-t border-slate-800 pt-5">
                      <label className="label">
                        Key Details
                        <span className="text-slate-500 normal-case font-normal ml-2">(one per line)</span>
                      </label>
                      <p className="text-slate-400 text-xs mb-3 leading-relaxed">
                        Add package-specific terms. Each line = one checkmark bullet on the detail page.
                      </p>
                      <textarea
                        rows={8}
                        value={form.key_details}
                        onChange={set('key_details')}
                        className="field resize-none"
                        placeholder={"Rates are 10% commissionable\nAll government taxes are included\nNo GST input\nRates subject to availability at the time of booking\nMinimum 2 pax required\nChild below 5 years complimentary"}
                      />
                      {/* Live preview */}
                      {form.key_details && (
                        <div className="mt-3 bg-slate-800 border border-slate-700 rounded-lg p-4">
                          <p className="text-slate-500 text-[9px] uppercase tracking-widest font-bold mb-3">Live Preview</p>
                          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                            {form.key_details.split('\n').filter(Boolean).map((item,i) => (
                              <div key={i} className="flex items-start gap-2">
                                <span className="text-emerald-400 text-xs mt-0.5 flex-shrink-0">✔</span>
                                <span className="text-slate-300 text-xs">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Form footer */}
              <div className="flex gap-3 px-6 py-4 border-t border-slate-800 flex-shrink-0">
                <button type="submit" disabled={saving}
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
        .label     { display:block; color:#94a3b8; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; margin-bottom:6px; }
        .field     { width:100%; background:#1e293b; border:1px solid #334155; color:#f1f5f9; padding:10px 12px; border-radius:8px; font-size:14px; outline:none; transition:border-color .2s; }
        .field:focus { border-color:#3b82f6; }
        .field::placeholder { color:#475569; }
        select.field option { background:#1e293b; }
        .field-sm  { width:100%; background:#1e293b; border:1px solid #334155; color:#f1f5f9; padding:6px 8px; border-radius:6px; font-size:12px; outline:none; transition:border-color .2s; }
        .field-sm:focus { border-color:#3b82f6; }
        .field-sm::placeholder { color:#475569; }
        select.field-sm option { background:#1e293b; }
      `}</style>
    </div>
  );
};

export default AdminPackages;