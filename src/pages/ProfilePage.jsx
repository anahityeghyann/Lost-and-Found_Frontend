import React, { useState } from 'react';
import ProfileNavbar from '../components/layout/ProfileNavbar';
import {
  MapPin,
  User,
  List,
  Bookmark,
  Bell,
  Settings,
  Search,
  ChevronDown,
  Pencil,
  Edit3,
  Trash2
} from 'lucide-react';

export default function ProfilePage() {
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  const [formData, setFormData] = useState({
    fullName: user?.full_name || user?.first_name || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    avatar_url: user?.avatar_url || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const activities = [
    {
      id: 1,
      title: 'Brown leather messenger bag',
      date: 'Aug 28, 2026',
      location: 'Vernissage Market, Yerevan',
      status: 'Active — Lost',
      statusType: 'warning',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200',
    },
    {
      id: 2,
      title: 'Black iPhone 15 Pro — cracked corner',
      date: 'Aug 19, 2026',
      location: 'Cascade Complex, Yerevan',
      status: 'Resolved — Reunited',
      statusType: 'success',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200',
    },
    {
      id: 3,
      title: 'Over-ear Sony headphones, white',
      date: 'Aug 12, 2026',
      location: 'Republic Square Metro',
      status: 'Found',
      statusType: 'info',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
    },
    {
      id: 4,
      title: 'Passport in burgundy cover',
      date: 'Jul 30, 2026',
      location: 'Zvartnots Airport, Gate B',
      status: 'Resolved — Reunited',
      statusType: 'success',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200',
    },
  ];

  const getStatusBadge = (status, type) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 text-amber-600';
      case 'success':
        return 'bg-emerald-50 text-emerald-600';
      case 'info':
        return 'bg-sky-50 text-sky-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navbar */}
      <ProfileNavbar/>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">

            {/* User Info Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col items-center pb-6">
              {/* Cover Banner */}
              <div className="w-full h-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />

              {/* Avatar + Edit Badge */}
              <div className="relative -mt-10 mb-3">
                <img
                  src={user?.avatar_url}
                  alt="Ani Martirosyan"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-sm"
                />
                <button className="absolute bottom-0 right-0 p-1.5 bg-[#5034EE] text-white rounded-xl shadow-md hover:bg-[#4128C4] transition-colors border-2 border-white">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{user?.full_name}</h2>

              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Yerevan, Armenia</span>
              </div>

              {/* Member since badge */}
              <div className="mt-3 mb-6 bg-[#EEECFE] text-[#5034EE] text-xs font-semibold px-3 py-1 rounded-full">
                Member since Jan 2024
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 w-full px-6 text-center">
                <div>
                  <div className="text-base font-bold text-slate-900">14</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">Reported</div>
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">9</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">Reunited</div>
                </div>
                <div>
                  <div className="text-base font-bold text-[#5034EE]">98%</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">Karma</div>
                </div>
              </div>
            </div>

            {/* Menu Nav */}
            <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#5034EE] text-white font-medium text-sm transition-all shadow-sm">
                <User className="w-4 h-4" />
                <span>Personal Info</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all">
                <List className="w-4 h-4 text-slate-400" />
                <span>My Listings</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all">
                <Bookmark className="w-4 h-4 text-slate-400" />
                <span>Saved Items</span>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-slate-400" />
                  <span>Notifications</span>
                </div>
                <span className="bg-[#EEECFE] text-[#5034EE] text-xs font-bold px-2 py-0.5 rounded-full">
                  5
                </span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 font-medium text-sm transition-all">
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Account Settings</span>
              </button>
            </div>

          </aside>

          {/* RIGHT MAIN CONTENT (8 cols) */}
          <section className="lg:col-span-8 flex flex-col gap-6">

            {/* Page Title & Last Updated */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Profile Settings
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Manage your personal information and public profile
              </p>
            </div>

            {/* Personal Information Form Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6 relative">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Personal Information
                </h3>
                <span className="text-xs text-slate-400 font-medium">Last updated Aug 2026</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white border-2 border-[#5034EE] rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none transition-all shadow-sm"
                  />
                </div>


                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-[#5034EE] focus:bg-white transition-all"
                  />
                </div>

                
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData?.phone_number}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-[#5034EE] focus:bg-white transition-all"
                  />
                </div>

                {/* Primary Location */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    PRIMARY LOCATION
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-[#5034EE] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <button className="bg-[#5034EE] hover:bg-[#4128C4] text-white font-semibold text-sm px-6 py-3 rounded-2xl transition-colors shadow-sm">
                  Save Changes
                </button>
                <button className="text-slate-500 hover:text-slate-800 font-semibold text-sm px-4 py-3 bg-transparent transition-colors">
                  Discard
                </button>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Activity
                </h3>
                <a href="#all-activity" className="text-[#5034EE] hover:underline font-medium text-xs">
                  View all —
                </a>
              </div>

              {/* Activity List */}
              <div className="flex flex-col gap-3">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={act.image}
                        alt={act.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm truncate">
                          {act.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {act.date} • {act.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(act.status, act.statusType)}`}>
                        {act.status}
                      </span>
                      <div className="hidden group-hover:flex items-center gap-1 text-slate-400">
                        <button className="p-1 hover:text-slate-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button className="p-1 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}