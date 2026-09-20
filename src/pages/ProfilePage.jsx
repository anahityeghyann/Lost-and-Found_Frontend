import React, { useEffect, useState } from 'react';
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
import { fetchUserItems, updateUserProfile } from '../services/authApi';

export default function ProfilePage() {
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem('token')
  const [formData, setFormData] = useState({
    fullName: user?.full_name || user?.first_name || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    avatar_url: user?.avatar_url || '',
    // location: user?.location || '',
  });
  const [userItems, setUserItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || '')


  useEffect(() => {
    const loadItems = async () => {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const data = await fetchUserItems(token)
        setUserItems(data)
      } catch (err) {
        console.error('Error fetching user items:', err);

      } finally {
        setLoading(false)
      }
    }
    loadItems()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }


  const handleSave = async () => {
    if (!token) return
    setSaving(true)
    try {
      const response = await updateUserProfile(token, {
        ...formData,
        avatarFile
      })
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.message)

    } finally {
      setSaving(false)
    }
  }

  // const handleDiscard = () => {

  // }

  const getStatusBadge = (status, itemType) => {
    if (status === 'RESOLVED') {
      return 'bg-emerald-50 text-emerald-600'
    }
    return itemType === 'lost' ? 'bg-amber-50 text-amber-600' : 'bg-sky-50 text-sky-600'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navbar */}
      <ProfileNavbar />

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
                  src={avatarPreview}
                  alt="Ani Martirosyan"
                  className="w-20 h-20 rounded-full object-cover"
                />

                <label className="absolute bottom-0 right-0 p-1.5 bg-brand-700 text-white rounded-xl shadow-md hover:bg-brand-800 transition-colors border-2 border-white">
                  <Pencil className="w-3.5 h-3.5" />
                  <input className='hidden' accept='image/*' onChange={handleImageChange} type="file" />
                </label>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{user?.full_name}</h2>

              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Yerevan, Armenia</span>
              </div>

              {/* Member since badge */}
              <div className="mt-3 mb-6 bg-brand-100/80 text-brand-600 text-xs font-semibold px-3 py-1 rounded-full">
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
                  <div className="text-base font-bold text-brand-600">98%</div>
                  <div className="text-[11px] font-medium text-slate-400 mt-0.5">Karma</div>
                </div>
              </div>
            </div>

            {/* Menu Nav */}
            <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-brand-600 text-white font-medium text-sm transition-all shadow-sm">
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
                <span className="bg-brand-100/80 text-brand-600 text-xs font-bold px-2 py-0.5 rounded-full">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
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
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-brand-600 focus:bg-white transition-all"
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
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-brand-600 focus:bg-white transition-all"
                  />
                </div>


                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData?.phone}
                    onChange={handleChange}
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-brand-600 focus:bg-white transition-all"
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
                    className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-brand-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-6 py-3 rounded-2xl transition-colors shadow-sm disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
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
                <a href="#all-activity" className="text-brand-600 hover:underline font-medium text-xs">
                  View all —
                </a>
              </div>

              {/* Activity List */}
              <div className="flex flex-col gap-3">
                {userItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={item.main_image_url}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm truncate">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {item.date} • {[item.city, item.locationDetail || item.location_detail].filter(Boolean).join(', ')}

                          {/* {`${item.city || ''}${item.locationDetail ? `, ${item.locationDetail}` : ''}`} */}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(item.status, item.statusType)}`}>
                        {item.status}
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