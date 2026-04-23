import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import {
  Plus, Pencil, Trash2, X, Save,
  Star, Eye, EyeOff, Search,
  PlusCircle, MinusCircle
} from 'lucide-react';

const EMPTY = {
  category_id:'', name:'', nights:'', start_city:'', end_city:'',
  route_covering:'', price:'', price_label:'Starting From',
  highlights:'', description:'', image_url:'', badge:'',
  duration_label:'', is_featured:false, is_active:true, display_order:0,
  inclusions:'', exclusions:'', gallery:'', itinerary:[],
  key_details:'', validity_text:'',
};

/* ── Itinerary builder ─────────────────────────────────────────────────── */
const ItineraryBuilder = ({ days, onChange }) => {
  const addDay = () =>
    onChange([...days, { day_number: days.length + 1, title:'', description:'' }]);

  const removeDay = idx =>
    onChange(days.filter((_,i) => i !== idx).map((d,i) => ({ ...d, day_number: i+1 })));

  const updateDay = (idx, field, value) =>
    onChange(days.map((d,i) => i === idx ? { ...d, [field]: value } : d));

  return (
    <div className="space-y-3">
      {days.map((day, idx) => (
        <div key={idx} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded flex-shrink-0">
              Day {day.day_number}
            </span>
            <input value={day.title}
              onChange={e => updateDay(idx,'title',e.target.value)}
              placeholder="Day title e.g. Arrive at Port Blair"
              className="field flex-1"/>
            <button type="button" onClick={() => removeDay(idx)}
              className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
              <MinusCircle size={18}/>
            </button>
          </div>
          <textarea rows={3} value={day.description}
            onChange={e => updateDay(idx,'description',e.target.value)}
            placeholder="Describe activities for this day..."
            className="field resize-none w-full"/>
        </div>
      ))}
      <button type="button" onClick={addDay}
        className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-500 py-3 rounded-lg text-sm transition-colors">
        <PlusCircle size={16}/> Add Day
      </button>
    </div>
  );
};

/* ── Main ──────────────────────────────────────────────────────────────── */
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
        .select('*, tour_categories(name, type, slug)')
        .order('created_at', { ascending: false }),
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

  const openNew = () => { setForm(EMPTY); setEditing(null); setActiveTab('basic'); setShowForm(true); };

  const openEdit = pkg => {
    setForm({
      ...EMPTY, ...pkg,
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join(', ') : (pkg.highlights||''),
      inclusions:  pkg.inclusions  || '',
      exclusions:  pkg.exclusions  || '',
      gallery:     pkg.gallery     || '',
      key_details: pkg.key_details || '',
      validity_text: pkg.validity_text || '',
      itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
    });
    setEditing(pkg.id); setActiveTab('basic'); setShowForm(true);
  };

  const handleSave = async e => {
    e.preventDefault(); setSaving(true);
    const payload = {
      category_id: form.category_id,
      name: form.name,
      nights: form.nights ? +form.nights : null,
      price:  form.price  ? +form.price  : null,
      display_order: +form.display_order || 0,
      start_city: form.start_city, end_city: form.end_city,
      route_covering: form.route_covering, price_label: form.price_label,
      description: form.description, image_url: form.image_url,
      badge: form.badge, duration_label: form.duration_label,
      is_featured: form.is_featured, is_active: form.is_active,
      highlights: form.highlights
        ? form.highlights.split(',').map(h => h.trim()).filter(Boolean) : [],
      inclusions:    form.inclusions    || null,
      exclusions:    form.exclusions    || null,
      gallery:       form.gallery       || null,
      key_details:   form.key_details   || null,
      validity_text: form.validity_text || null,
      itinerary: form.itinerary.length ? form.itinerary : null,
    };
    delete payload.tour_categories;

    let err;
    if (editing) {
      ({ error: err } = await supabase.from('tour_packages').update(payload).eq('id', editing));
    } else {
      ({ error: err } = await supabase.from('tour_packages').insert(payload));
    }
    if (err) { setMsg('Error: ' + err.message); }
    else { setMsg(editing ? 'Package updated!' : 'Package added!'); setShowForm(false); setEditing(null); load(); }
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
  const indiaCats = cats.filter(c => c.type === 'india');
  const intlCats  = cats.filter(c => c.type === 'international');

  const TABS = [
    { id:'basic',     label:'Basic Info'         },
    { id:'itinerary', label:'Itinerary'           },
    { id:'details',   label:'Inc / Exc / Gallery' },
    { id:'keyinfo',   label:'Key Details'         },
  ];

  return (
    <div>
      {/* Header */}
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search packages..."
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

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800">
                {['Package','Category','Nights','Price','Days','Featured','Status','Actions'].map(h => (
                  <th key={h} className="text-left text-slate-400 text-xs font-bold uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {displayed.map(pkg => (
                <tr key={pkg.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium text-sm leading-tight max-w-[200px] truncate">{pkg.name}</p>
                    {pkg.badge && <span className="text-[10px] text-blue-400 font-bold">{pkg.badge}</span>}
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
                <tr><td colSpan={8} className="text-center text-slate-500 py-12 text-sm">No packages found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setShowForm(false)}>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col">

            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 flex-shrink-0">
              <h2 className="text-white font-bold">{editing ? 'Edit Package' : 'Add Package'}</h2>
              <button onClick={() => setShowForm(false)}><X size={20} className="text-slate-400 hover:text-white"/></button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 flex-shrink-0 overflow-x-auto">
              {TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}>
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">

                {/* ── TAB 1: Basic ── */}
                {activeTab === 'basic' && (
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
                      <input value={form.route_covering} onChange={set('route_covering')} className="field" placeholder="1 Port Blair - 2 Havelock - 2 Port Blair"/>
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
                      <input value={form.highlights} onChange={set('highlights')} className="field" placeholder="Cellular Jail, Havelock Beach, Water Sports"/>
                    </div>
                    <div>
                      <label className="label">Description</label>
                      <textarea rows={3} value={form.description} onChange={set('description')} className="field resize-none" placeholder="Short package overview..."/>
                    </div>
                    <div>
                      <label className="label">Main Image URL</label>
                      <input value={form.image_url} onChange={set('image_url')} className="field" placeholder="https://..."/>
                      {form.image_url && (
                        <img src={form.image_url} alt="preview"
                          className="mt-2 h-24 w-full object-cover rounded-lg opacity-80"
                          onError={e => e.target.style.display='none'}/>
                      )}
                    </div>
                    <div className="flex gap-6 pt-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.is_featured}
                          onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))}
                          className="w-4 h-4 accent-amber-500"/>
                        <span className="text-slate-300 text-sm">⭐ Show on Homepage</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.is_active}
                          onChange={e => setForm(f => ({ ...f, is_active: e.target.checked }))}
                          className="w-4 h-4 accent-blue-500"/>
                        <span className="text-slate-300 text-sm">Active / Visible</span>
                      </label>
                    </div>
                  </>
                )}

                {/* ── TAB 2: Itinerary ── */}
                {activeTab === 'itinerary' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-bold text-sm">Day-by-Day Itinerary</p>
                        <p className="text-slate-400 text-xs mt-0.5">Each day shows as an expandable accordion on the detail page.</p>
                      </div>
                      <span className="bg-blue-900 text-blue-300 text-xs font-bold px-3 py-1 rounded-full">{form.itinerary.length} days</span>
                    </div>
                    <ItineraryBuilder days={form.itinerary} onChange={days => setForm(f => ({ ...f, itinerary: days }))}/>
                  </div>
                )}

                {/* ── TAB 3: Inc / Exc / Gallery ── */}
                {activeTab === 'details' && (
                  <>
                    <div>
                      <label className="label">Inclusions <span className="text-slate-500 normal-case font-normal">(one per line)</span></label>
                      <textarea rows={6} value={form.inclusions} onChange={set('inclusions')} className="field resize-none"
                        placeholder={"Accommodation as mentioned\nAll transfers by AC car\nEntry tickets to sightseeing\nPrivate ferry tickets"}/>
                    </div>
                    <div>
                      <label className="label">Exclusions <span className="text-slate-500 normal-case font-normal">(one per line)</span></label>
                      <textarea rows={5} value={form.exclusions} onChange={set('exclusions')} className="field resize-none"
                        placeholder={"Air tickets and airport taxes\nWater sports activities\nPersonal expenses"}/>
                    </div>
                    <div>
                      <label className="label">Gallery Image URLs <span className="text-slate-500 normal-case font-normal">(comma separated)</span></label>
                      <textarea rows={3} value={form.gallery} onChange={set('gallery')} className="field resize-none"
                        placeholder="https://image1.jpg, https://image2.jpg, https://image3.jpg"/>
                      {form.gallery && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {form.gallery.split(',').map((url,i) => url.trim() && (
                            <img key={i} src={url.trim()} alt={`g${i}`}
                              className="h-16 w-24 object-cover rounded-lg opacity-80"
                              onError={e => e.target.style.display='none'}/>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── TAB 4: Key Details ── */}
                {activeTab === 'keyinfo' && (
                  <>
                    {/* Validity text */}
                    <div>
                      <label className="label">
                        Package Validity Text
                        <span className="ml-2 text-amber-400 text-[10px] font-bold normal-case tracking-normal">★ Shown as highlighted banner</span>
                      </label>
                      <input
                        value={form.validity_text}
                        onChange={set('validity_text')}
                        className="field"
                        placeholder="This package is valid from 01st April 2026 to 30th September 2026."
                      />
                      {form.validity_text && (
                        <div className="mt-2 flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 px-4 py-2.5 rounded">
                          <span className="text-amber-400 text-xs">★</span>
                          <p className="text-amber-300 text-xs font-bold">{form.validity_text}</p>
                        </div>
                      )}
                      <p className="text-slate-500 text-[10px] mt-1.5">This appears as a prominent highlighted banner near the top of the package detail page.</p>
                    </div>

                    <div className="border-t border-slate-800 pt-4">
                      <label className="label">
                        Key Details
                        <span className="text-slate-500 normal-case font-normal ml-2">(one per line)</span>
                      </label>
                      <p className="text-slate-400 text-xs mb-3 leading-relaxed">
                        Add package-specific key details. Each new line becomes a separate bullet point with a checkmark.
                        <br/>
                        <span className="text-slate-500">e.g. commission, tax info, booking terms, special conditions</span>
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
                        <div className="mt-3 bg-slate-800 rounded-lg p-4">
                          <p className="text-slate-400 text-[9px] uppercase tracking-widest font-bold mb-3">Preview</p>
                          {form.key_details.split('\n').filter(Boolean).map((item, i) => (
                            <div key={i} className="flex items-start gap-2 mb-2">
                              <span className="text-emerald-400 text-xs mt-0.5 flex-shrink-0">✔</span>
                              <span className="text-slate-300 text-xs">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
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