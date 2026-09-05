import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemNavbar from '../components/layout/ItemNavbar';
import { fetchItemByHash } from '../services/itemsApi';
import PageStatus from '../components/ui/PageStatus';
import { AlertCircle, Heart, MapPin } from 'lucide-react';
import UserDetails from '../components/ui/UserDetails';

export default function ItemPage() {
  const { hash } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getItemData = async () => {
    setLoading(true);
    try {
      const data = await fetchItemByHash(hash);
      setItem(data);
      if (data.images && data.images.length > 0) {
        setSelectedImage(data.images[0].image);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemData();
  }, [hash]);

  if (loading || error) {
    return <PageStatus loading={loading} error={error} onRetry={getItemData} />;
  }

  const currentIndex = item?.images?.findIndex((img) => img.image === selectedImage) ?? 0;
  const totalImages = item?.images?.length || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ItemNavbar title={item?.title} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ՁԱԽ ԿՈՂՄ — Gallery & Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            {/* ՄԵԾ ՆԿԱՐԸ + BADGE */}
            <div className="relative w-full h-[420px] bg-slate-200 rounded-3xl overflow-hidden shadow-sm">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={item?.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Նկար չկա
                </div>
              )}

              {totalImages > 0 && (
                <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {currentIndex + 1}/{totalImages}
                </div>
              )}
            </div>

            {/* THUMBNAILS (Ձախ կողմի փոքր նկարները) */}
            <div className="grid grid-cols-4 gap-4">
              {item?.images?.map((imgObj) => {
                const isSelected = selectedImage === imgObj.image;
                return (
                  <button
                    key={imgObj.id}
                    onClick={() => setSelectedImage(imgObj.image)}
                    className={`relative h-24 rounded-2xl overflow-hidden transition-all duration-200 border-2 ${isSelected
                      ? 'border-[#0066CC] ring-4 ring-[#0066CC]/15 scale-[0.98]'
                      : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={imgObj.image}
                      alt="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* ՔԱՐՏԵԶԻ ԲԼՈԿԸ */}
            <div className="rounded-xl overflow-hidden border border-slate-100 bg-white h-40 flex items-center justify-center relative shadow-sm">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=200&fit=crop&auto=format')] bg-cover bg-center opacity-30" />
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-[#0066CC] rounded-full flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-slate-800">
                  {item?.area || item?.city || 'Location'}
                </span>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${item?.city || ''} ${item?.area || ''}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#0066CC] font-semibold hover:underline underline-offset-2 flex items-center gap-1"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

          </div>

          {/* ԱՋ ԿՈՂՄ — (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* ՎԵՐՆԱԳԻՐ, HEART, BADGE-ՆԵՐ */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl font-bold text-[#1e293b]">
                  {item?.title}
                </h1>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${saved
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#0066cc] hover:text-[#0066cc]'
                    }`}
                >
                  <Heart className={`w-4 h-4 ${saved ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {item?.item_type && (
                  <span className={`text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase ${item.item_type === 'lost' ? 'bg-lost' : 'bg-found'
                    }`}>
                    {item.item_type}
                  </span>
                )}
                {item?.urgent && (
                  <span className="bg-[#FF4D4D] text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Urgent
                  </span>
                )}
                {
                  item?.reward && Number(item.reward) !== 0 ? (
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                      Reward ${item?.reward}
                    </span>
                  ) : null
                }

                <span className="ml-auto text-xs text-[#64748b]">
                  Posted on {item?.date_event}
                </span>
              </div>
            </div>
            <div className='bg-white border border-[#e2e8f0] rounded-xl overflow-hidden'>
              <div className='flex items-start gap-4 px-5 py-4 border-b border-[#e2e8f0] bg-[#eff6ff]/40'>
                <span className='text-[10px] font-bold text-[#64748b] uppercase tracking-widest w-32 shrink-0 pt-0.5'>
                  Location Details
                </span>
                <div className="flex items-center gap-1.5 text-sm font-medium text-[#1e293b]">
                  <MapPin className='w-3.5 h-3.5 text-[#0066cc] shrink-0' />
                  {item?.location_detail}, {item?.area}, {item?.city}
                </div>
              </div>
              <div className='flex items-start gap-4 px-5 py-3.5 border-b border-[#e2e8f0]'>
                <span className='text-[10px] font-bold text-[#64748b] uppercase tracking-widest w-32 shrink-0 pt-0.5'>
                  Date
                </span>
                <span className="text-sm text-[#1e293b]">{item?.date_event}</span>
              </div>
              <div className='flex items-start gap-4 px-5 py-3.5 border-b border-[#e2e8f0]'>
                <span className='text-[10px] font-bold text-[#64748b] uppercase tracking-widest w-32 shrink-0 pt-0.5'>
                  Time
                </span>
                <span className="text-sm text-[#1e293b]">{item?.time_event ? item.time_event.slice(0, 5) : ''}</span>
              </div>
              <div className="px-5 pt-4 pb-5 border-t border-[#e2e8f0]">
                <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest w-32 shrink-0 pt-0.5">
                  Description
                </span>
                <p className="text-sm text-[#1e293b] leading-relaxed">
                  {item?.description}
                </p>
              </div>
            </div>


            {/* ՄԵԿ ՄԻԱՍՆԱԿԱՆ ՍՊԻՏԱԿ CARD ALICE-Ի ՀԱՄԱՐ */}
            <UserDetails />

            {/* REPORT THIS LISTING (Card-ից դուրս) */}
            <div className="flex justify-center pt-1">
              <button className="flex items-center gap-2 text-[#94A3B8] hover:text-[#EF4444] text-sm font-medium transition-colors duration-200 group">
                <svg
                  className="w-4 h-4 stroke-[#94A3B8] group-hover:stroke-[#EF4444] transition-colors duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm0 0h18"
                  />
                </svg>
                Report this listing
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}