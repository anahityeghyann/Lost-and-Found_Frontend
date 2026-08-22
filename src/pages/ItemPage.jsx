import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemNavbar from '../components/layout/ItemNavbar';
import { fetchItemByHash } from '../services/itemsApi';
import PageStatus from '../components/ui/PageStatus';
import { AlertCircle, Heart } from 'lucide-react';

export default function ItemPage() {
  const { hash } = useParams();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [saved, setSaved] = useState(false)
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

  // Ընտրված նկարի ինդեքսը 1/4 badge-ի համար
  const currentIndex = item?.images?.findIndex((img) => img.image === selectedImage) ?? 0;
  const totalImages = item?.images?.length || 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ItemNavbar title={item?.title} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ՁԱԽ ԿՈՂՄ — Figma Gallery & Map (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 1. ՄԵԾ ՆԿԱՐԸ + BADGE (1/4) */}
            <div className="relative w-full h-[420px] bg-slate-200 rounded-3xl overflow-hidden shadow-sm border border-slate-100">
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

              {/* 1/4 Badge */}
              {totalImages > 0 && (
                <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {currentIndex + 1}/{totalImages}
                </div>
              )}
            </div>

            {/* 2. 4 ՓՈՔՐ ՆԿԱՐՆԵՐԸ (THUMBNAILS) */}
            <div className="grid grid-cols-4 gap-4">
              {item?.images?.map((imgObj) => {
                const isSelected = selectedImage === imgObj.image;
                return (
                  <button
                    key={imgObj.id}
                    onClick={() => setSelectedImage(imgObj.image)}
                    className={`relative h-24 rounded-2xl overflow-hidden transition-all duration-200 border-2 ${
                      isSelected
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

            {/* 3. ՔԱՐՏԵԶԻ ԲԼՈԿԸ (Figma Location Card) */}
            <div className="w-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[200px] text-center relative">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-slate-800 text-base">
                {item?.area || item?.city || 'Location'}
              </h4>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${item?.city || ''} ${item?.area || ''}`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 font-semibold hover:underline mt-1 flex items-center gap-1"
              >
                Open in Google Maps ↗
              </a>
            </div>

          </div>

          {/* ԱՋ ԿՈՂՄ — ԱՅՍՏԵՂ ՔՈ ԳՐԱԾ ԿՈԴՆ Է (5 cols) */}
          <div className="flex flex-col gap-5">
            <div>
              <div className='flex items-start justify-between gap-3 mb-3'>
                <h1 className='text-2xl font-bold text-[#1e293b]'>
                  {item?.title}
                </h1>
                <button className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                  saved
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-white border-[#e2e8f0] text-[#64748b] hover:border-[#0066cc] hover:text-[#0066cc]"
                }`}>
                  <Heart className={`w-4 h-4 ${saved ? "fill-red-500" : ""}`}/>
                </button>
              </div>
              <div className="flex items-center gep-2 flex-wrap">
                <span className="text-white bg-found text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">Found</span>
                <span className='bg-lost text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase flex items-center gap-1'>
                  <AlertCircle className='w-3 h-3'/>
                  Urgent
                </span>
                <span className='ml-auto text-xs text-[#64748b]'>
                  Posted on {item?.date_event}
                </span>
              </div>
            </div>
            
          </div>

        </div>
      </main>
    </div>
  );
}