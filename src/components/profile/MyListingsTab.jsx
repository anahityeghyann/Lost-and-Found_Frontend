import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchUserItems, getImageUrl } from '../../services/authApi';
import { Edit3, Trash2 } from 'lucide-react';


export default function MyListingsTab({ token }) {
  const { t } = useTranslation('common');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMyItems = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const data = await fetchUserItems(token);
        setItems(data);
      } catch (err) {
        console.error('Error fetching user items:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMyItems();
  }, [token]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 flex justify-center items-center">
        <div className="text-sm font-semibold text-slate-400 animate-pulse">
          Loading listings...
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t('profile.my_listings')}
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">Դուք դեռ չունեք ավելացրած հայտարարություններ։</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => {
            const rawImageUrl =
              item.main_image_url ||
              (item.images && item.images.length > 0
                ? item.images[0].image_url || item.images[0].image
                : null);

            const imageUrl = getImageUrl(rawImageUrl);
            const itemType = item.itemType || item.item_type;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
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

                    <span
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${
                        itemType === 'lost' ? 'bg-lost' : 'bg-found'
                      }`}
                    >
                      {itemType === 'lost' ? 'Lost' : 'Found'}
                    </span>
                  </div>

                  <div className="p-4">
                    <h2 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1">
                      {item.title}
                    </h2>
                    <p className="text-slate-500 text-xs mb-3 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-[11px] text-slate-400">
                    {item.date}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100">
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
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