import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import { Package, Globe, MessageSquare, Star, TrendingUp, Clock } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, to }) => (
  <Link to={to}
    className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center gap-4 hover:border-slate-600 transition-colors group">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white"/>
    </div>
    <div>
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-white text-2xl font-black">{value ?? '—'}</p>
    </div>
    <div className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors">→</div>
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [
        { count: totalPkg },
        { count: indCat },
        { count: intCat },
        { count: featured },
        { count: newEnq },
        { data: recent },
      ] = await Promise.all([
        supabase.from('tour_packages').select('*', { count: 'exact', head: true }),
        supabase.from('tour_categories').select('*', { count: 'exact', head: true }).eq('type','india'),
        supabase.from('tour_categories').select('*', { count: 'exact', head: true }).eq('type','international'),
        supabase.from('tour_packages').select('*', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status','new'),
        supabase.from('enquiries').select('*, tour_packages(name)').order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({ totalPkg, indCat, intCat, featured, newEnq });
      setRecentEnquiries(recent || []);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-blue-500 animate-pulse font-black tracking-widest text-sm uppercase">Loading...</div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-white text-2xl font-black uppercase tracking-tight">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back. Here's an overview of your tour data.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard icon={Package}     label="Total Packages"     value={stats.totalPkg}  color="bg-blue-600"   to="/admin/packages" />
        <StatCard icon={Globe}       label="India Categories"   value={stats.indCat}    color="bg-emerald-600"to="/admin/categories" />
        <StatCard icon={Globe}       label="Intl Categories"    value={stats.intCat}    color="bg-violet-600" to="/admin/categories" />
        <StatCard icon={Star}        label="Featured (Home)"    value={stats.featured}  color="bg-amber-500"  to="/admin/packages" />
        <StatCard icon={MessageSquare} label="New Enquiries"    value={stats.newEnq}    color="bg-rose-600"   to="/admin/enquiries" />
        <StatCard icon={TrendingUp}  label="Active Since"       value="2024"            color="bg-slate-600"  to="/admin/dashboard" />
      </div>

      {/* Recent Enquiries */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-white font-bold">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-blue-400 text-xs hover:text-blue-300">View all →</Link>
        </div>
        {recentEnquiries.length === 0 ? (
          <div className="p-6 text-slate-500 text-sm text-center">No enquiries yet.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {recentEnquiries.map(enq => (
              <div key={enq.id} className="px-6 py-4 flex items-center gap-4">
                <div className="w-9 h-9 bg-slate-800 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {enq.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{enq.name}</p>
                  <p className="text-slate-400 text-xs truncate">{enq.tour_packages?.name || 'General'} · {enq.phone}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    enq.status === 'new'       ? 'bg-blue-900 text-blue-300'   :
                    enq.status === 'contacted' ? 'bg-amber-900 text-amber-300' :
                    'bg-emerald-900 text-emerald-300'
                  }`}>{enq.status}</span>
                  <span className="text-slate-600 text-xs">
                    <Clock size={12} className="inline mr-1"/>
                    {new Date(enq.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;