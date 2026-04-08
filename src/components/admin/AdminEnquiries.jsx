import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Search, Filter, Check, Phone, Mail, Calendar, Users, Trash2 } from 'lucide-react';

const STATUS_COLORS = {
  new:       'bg-blue-900 text-blue-300 border-blue-700',
  contacted: 'bg-amber-900 text-amber-300 border-amber-700',
  done:      'bg-emerald-900 text-emerald-300 border-emerald-700',
};

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [status, setStatus]       = useState('');
  const [search, setSearch]       = useState('');
  const [loading, setLoading]     = useState(true);
  const [selected, setSelected]   = useState(null);

  const load = async () => {
    setLoading(true);
    let q = supabase.from('enquiries').select('*, tour_packages(name, tour_categories(name))').order('created_at', { ascending: false });
    if (status) q = q.eq('status', status);
    const { data } = await q;
    setEnquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [status]);

  const updateStatus = async (id, newStatus) => {
    await supabase.from('enquiries').update({ status: newStatus }).eq('id', id);
    load();
    if (selected?.id === id) setSelected({ ...selected, status: newStatus });
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    await supabase.from('enquiries').delete().eq('id', id);
    load();
    if (selected?.id === id) setSelected(null);
  };

  const filtered = enquiries.filter(e =>
    !search ||
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.phone?.includes(search) ||
    e.email?.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    new:       enquiries.filter(e => e.status === 'new').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    done:      enquiries.filter(e => e.status === 'done').length,
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white text-2xl font-black uppercase tracking-tight">Enquiries</h1>
        <p className="text-slate-400 text-sm mt-1">Manage customer enquiries and follow-ups</p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {[['', 'All', enquiries.length], ['new','New', counts.new], ['contacted','Contacted', counts.contacted], ['done','Done', counts.done]].map(([val, label, count]) => (
          <button key={val} onClick={() => setStatus(val)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${status===val ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
            {label}
            <span className="bg-black/20 text-xs px-1.5 py-0.5 rounded-full">{count}</span>
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search name / phone..." className="bg-slate-800 border border-slate-700 text-white text-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 w-52"/>
        </div>
      </div>

      <div className="flex gap-4">
        {/* List */}
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500 text-sm animate-pulse">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">No enquiries found.</div>
          ) : (
            <div className="divide-y divide-slate-800">
              {filtered.map(enq => (
                <div key={enq.id}
                  onClick={() => setSelected(enq)}
                  className={`px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-slate-800/50 transition-colors ${selected?.id === enq.id ? 'bg-slate-800' : ''}`}>
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {enq.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{enq.name}</p>
                    <p className="text-slate-400 text-xs truncate">{enq.tour_packages?.name || 'General Enquiry'}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${STATUS_COLORS[enq.status]}`}>{enq.status}</span>
                    <span className="text-slate-600 text-xs">{new Date(enq.created_at).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 flex-shrink-0 bg-slate-900 border border-slate-800 rounded-xl p-5 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Details</h3>
              <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-white">✕</button>
            </div>

            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-lg mb-4">
              {selected.name?.charAt(0)?.toUpperCase()}
            </div>

            <p className="text-white font-bold text-base mb-1">{selected.name}</p>
            <p className="text-slate-400 text-xs mb-4">{selected.tour_packages?.name || 'General Enquiry'}</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone size={14} className="text-slate-500 flex-shrink-0"/>
                <a href={`tel:${selected.phone}`} className="hover:text-blue-400">{selected.phone}</a>
              </div>
              {selected.email && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail size={14} className="text-slate-500 flex-shrink-0"/>
                  <a href={`mailto:${selected.email}`} className="hover:text-blue-400 truncate">{selected.email}</a>
                </div>
              )}
              {selected.travel_date && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Calendar size={14} className="text-slate-500 flex-shrink-0"/>
                  {new Date(selected.travel_date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}
                </div>
              )}
              {selected.pax && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Users size={14} className="text-slate-500 flex-shrink-0"/>
                  {selected.pax} {selected.pax === 1 ? 'Person' : 'People'}
                </div>
              )}
            </div>

            {selected.message && (
              <div className="mt-4 bg-slate-800 rounded-lg p-3">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Message</p>
                <p className="text-slate-300 text-sm leading-relaxed">{selected.message}</p>
              </div>
            )}

            {/* Status update */}
            <div className="mt-5">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Update Status</p>
              <div className="flex gap-2">
                {['new','contacted','done'].map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`flex-1 text-xs font-bold py-2 rounded-lg uppercase transition-colors ${
                      selected.status === s ? STATUS_COLORS[s] + ' border' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => deleteEnquiry(selected.id)}
              className="w-full mt-3 flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-400 text-xs py-2 rounded-lg transition-colors">
              <Trash2 size={13}/> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEnquiries;