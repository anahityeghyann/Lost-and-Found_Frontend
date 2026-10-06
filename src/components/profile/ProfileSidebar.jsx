import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, User, List, Bookmark, Bell, Pencil } from 'lucide-react';
import { getImageUrl, updateUserProfile } from '../../services/authApi';

export default function ProfileSidebar({ user, token, activeTab, setActiveTab, avatarPreview, setAvatarPreview }) {
  const { t } = useTranslation('common');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !token) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    try {
      const response = await updateUserProfile(token, { avatarFile: file });
      localStorage.setItem('user', JSON.stringify(response.user));
      setAvatarPreview(getImageUrl(response.user?.avatar_url || response.user?.avatar || ''));
    } catch (err) {
      console.error('Error auto-updating avatar', err);
    }
  };

  const formatMemberSince = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    const validDate = isNaN(date.getTime()) ? new Date() : date;
  
    const monthIndex = validDate.getMonth();
    const year = validDate.getFullYear();

    const monthName = t(`months.${monthIndex}`);

    return t('profile.member_since', {
      month: monthName,
      year: year
    });
  };

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col items-center pb-6">
        <div className="w-full h-24 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900" />

        <div className="relative -mt-10 mb-3">
          {avatarPreview ? (
            <img src={avatarPreview} alt={user?.full_name} className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-700">
              {user?.full_name?.charAt(0) || 'U'}
            </div>
          )}
          <label className="absolute bottom-0 right-0 p-1.5 bg-brand-700 text-white rounded-xl shadow-md hover:bg-brand-800 transition-colors border-2 border-white cursor-pointer">
            <Pencil className="w-3.5 h-3.5" />
            <input className="hidden" accept="image/*" onChange={handleImageChange} type="file" />
          </label>
        </div>

        <h2 className="text-lg font-bold text-slate-900">{user?.full_name}</h2>
        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{user?.location || 'Yerevan, Armenia'}</span>
        </div>

        <div className="mt-3 mb-6 bg-brand-100/80 text-brand-600 text-xs font-semibold px-3 py-1 rounded-full">
          {formatMemberSince(user?.date_joined)}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 flex flex-col gap-1">
        <button
          onClick={() => setActiveTab('personal_info')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${activeTab === 'personal_info' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
        >
          <User className="w-4 h-4" />
          <span>{t('profile.personal_info')}</span>
        </button>

        <button
          onClick={() => setActiveTab('my_listings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${activeTab === 'my_listings' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
        >
          <List className="w-4 h-4" />
          <span>{t('profile.my_listings')}</span>
        </button>

        <button
          onClick={() => setActiveTab('saved_items')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${activeTab === 'saved_items' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{t('profile.saved_items')}</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-medium text-sm transition-all ${activeTab === 'notifications' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'
            }`}
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4" />
            <span>{t('profile.notifications')}</span>
          </div>
          <span className="bg-brand-100/80 text-brand-600 text-xs font-bold px-2 py-0.5 rounded-full">5</span>
        </button>
      </div>
    </aside>
  );
}