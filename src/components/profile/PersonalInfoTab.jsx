import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit3, Trash2 } from 'lucide-react';
import { fetchUserItems, updateUserProfile, getImageUrl, updateItemStatus, deleteUserItems } from '../../services/authApi';
import EditItemModal from '../layout/EditItemModal'


export default function PersonalInfoTab({ user, token }) {
  const { t } = useTranslation('common');

  const [formData, setFormData] = useState({
    fullName: user?.full_name || user?.first_name || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    location: user?.location || '',
  });

  const [userItems, setUserItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState(null);


  useEffect(() => {
    const loadItems = async () => {
      if (!token) return;
      try {
        const data = await fetchUserItems(token);
        setUserItems(data);
      } catch (err) {
        console.error('Error fetching user items:', err);
      }
    };
    loadItems();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    try {
      const response = await updateUserProfile(token, formData);
      localStorage.setItem('user', JSON.stringify(response.user));
      alert(t('profile.updated_success') || 'Profile updated successfully');
      window.location.reload();
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setFormData({
      fullName: user?.full_name || user?.first_name || '',
      email: user?.email || '',
      phone: user?.phone_number || '',
      location: user?.location || '',
    });
  };

  // Կարգավիճակը փոխելու ֆունկցիա
  const handleStatusToggle = async (itemToUpdate) => {
    if (!token) return;

    const currentStatus = (itemToUpdate.status || '').toUpperCase();
    const newStatus = currentStatus === 'RESOLVED' ? 'ACTIVE' : 'RESOLVED';
    const itemIdentifier = itemToUpdate.hash_code || itemToUpdate.id;

    try {
      await updateItemStatus(itemIdentifier, newStatus, token);

      setUserItems((prevItems) =>
        prevItems.map((item) =>
          (item.hash_code || item.id) === itemIdentifier
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err.message);
    }
  };

  const getStatusBadge = (status, itemType) => {
    if ((status || '').toUpperCase() === 'RESOLVED') {
      return 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100';
    }
    return itemType === 'lost'
      ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
      : 'bg-sky-50 text-sky-600 hover:bg-sky-100';
  };

  const handleDeleteItem = async (itemToDelete) => {
    if (!token) return;

    const isConfirmed = window.confirm("Are you sure you want to delete this statement.");
    if (!isConfirmed) return;

    try {
      await deleteUserItems(itemToDelete.hash_code, token);
      setUserItems((prevItems) => prevItems.filter(item => item.hash_code !== itemToDelete.hash_code));

      alert("Հայտարարությունը հաջողությամբ ջնջվեց:");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleItemUpdated = (updatedItem) => {
    setUserItems((prevItems) =>
      prevItems.map((item) =>
        (item.hash_code) === (updatedItem.hash_code)
          ? { ...updatedItem }
          : { ...item }
      )
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t('profile.profile_settings')}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {t('profile.profile_subtitle')}
        </p>
      </div>

      {/* Personal Info Form */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6 relative">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {t('profile.personal_info')}
          </h3>
          <span className="text-xs text-slate-400 font-medium">{t('profile.last_updated')}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('profile.full_name')}
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
              {t('profile.email_address')}
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
              {t('profile.phone_number')}
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#F8FAFC] border border-slate-200/80 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:border-2 focus:border-brand-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t('profile.primary_location')}
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

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm px-6 py-3 rounded-2xl transition-colors shadow-sm disabled:opacity-50"
          >
            {saving ? t('profile.saving') : t('profile.save_changes')}
          </button>
          <button
            onClick={handleDiscard}
            className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-2xl font-semibold text-sm px-4 py-3 bg-transparent transition-colors"
          >
            {t('profile.discard')}
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {t('profile.recent_activity')}
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {userItems.length === 0 ? (
            <p className="text-xs text-slate-400">Վերջին ակտիվություն դեռ չկա։</p>
          ) : (
            userItems.slice(0, 3).map((item) => (
              <div
                key={item.hash_code || item.id}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={getImageUrl(item.main_image_url || (item.images && item.images[0]?.image))}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-900 text-sm truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {[item.city, item.locationDetail || item.location_detail].filter(Boolean).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Ինտերակտիվ կոճակ static badge-ի փոխարեն */}
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(item)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full cursor-pointer transition-all ${getStatusBadge(
                      item.status,
                      item.itemType || item.item_type
                    )}`}
                  >
                    {item.status}
                  </button>

                  <div className="hidden group-hover:flex items-center gap-1 text-slate-400">
                    <button onClick={() => setEditingItem(item)} className="p-1 hover:text-slate-600"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteItem(item)} className="p-1 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {editingItem && (
        <EditItemModal
          item={editingItem}
          token={token}
          onClose={() => setEditingItem(null)}
          onUpdate={handleItemUpdated}
        />
      )}
    </div>
  );
}