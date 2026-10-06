import React, { useEffect, useState } from 'react';
import { fetchSavedItems } from '../../services/itemsApi';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../../services/authApi';

export default function SavedItemsTab() {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const getSavedItems = async () => {
      try {
        setLoading(true);
        const data = await fetchSavedItems();
        setSavedItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSavedItems();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex justify-center items-center">
        <div className="text-sm font-semibold text-slate-400 animate-pulse">
          Loading saved items...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-center text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t('profile.saved_items')}
        </h1>
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">You have no saved items yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedItems.map((item) => {
            const rawImageUrl =
              item.main_image_url ||
              (item.images && item.images.length > 0
                ? item.images[0].image_url || item.images[0].image
                : null);

            const imageUrl = getImageUrl(rawImageUrl);
            const itemType = item.itemType || item.item_type;

            return (
              <div
                key={item.id || item.hash_code}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-all flex flex-col"
              >
                {/* Image Section */}
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-medium">
                      No Image
                    </div>
                  )}

                  {/* Status Badge */}
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${
                      itemType === 'lost' ? 'bg-lost' : 'bg-found'
                    }`}
                  >
                    {itemType === 'lost' ? 'Lost' : 'Found'}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 text-xs mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-3 border-t border-slate-100 font-medium">
                    <span>{item.category || 'General'}</span>
                    <span>{item.city || item.locationDetail || ''}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}