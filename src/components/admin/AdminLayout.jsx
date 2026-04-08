import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import {
  LayoutDashboard, Globe, MapPin, Package,
  MessageSquare, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const NAV = [
  { to: '/admin/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/categories',   icon: Globe,           label: 'Categories' },
  { to: '/admin/packages',     icon: Package,         label: 'Packages' },
  { to: '/admin/enquiries',    icon: MessageSquare,   label: 'Enquiries' },
];

const AdminLayout = () => {
  const [sideOpen, setSideOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex font-sans">
      {/* ── Sidebar ── */}
      <aside className={`${sideOpen ? 'w-60' : 'w-16'} bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 flex-shrink-0`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800 gap-3">
          <div className="w-8 h-8 bg-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm">E</span>
          </div>
          {sideOpen && (
            <div className="overflow-hidden">
              <p className="text-white font-black text-sm tracking-tight leading-none">EXPRESS TRAVEL</p>
              <p className="text-slate-500 text-[9px] tracking-widest uppercase">Admin</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              {sideOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut size={18} className="flex-shrink-0" />
            {sideOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-6 gap-4">
          <button onClick={() => setSideOpen(!sideOpen)}
            className="text-slate-400 hover:text-white transition-colors">
            {sideOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
          <span className="text-slate-400 text-xs">ETC Tours & Travels</span>
          <ChevronRight size={14} className="text-slate-600"/>
          <span className="text-white text-xs font-medium">Admin Panel</span>

          <div className="ml-auto">
            <a href="/" target="_blank"
              className="text-slate-400 hover:text-blue-400 text-xs font-medium transition-colors">
              View Website →
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;