export default function LivePreview({ itemType, form, photos }) {
  const location = [form.area, form.city].filter(Boolean).join(', ') || 'Location';
  const showReward = itemType === 'lost' && form.offerReward && form.reward;
  const showUrgent = itemType === 'lost' && form.urgent && !showReward;

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-28">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Live Preview</p>

        <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
            {photos[0] ? (
              <img src={photos[0]} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm ${itemType === 'lost' ? 'bg-lost' : 'bg-found'}`}>
              {itemType === 'lost' ? 'Lost' : 'Found'}
            </span>
            {showReward && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-900 shadow-sm">
                Reward ${form.reward}
              </span>
            )}
            {showUrgent && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500 text-white shadow-sm">
                Urgent
              </span>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                {form.category || 'Category'}
              </span>
              <span className="text-[11px] text-slate-400">Just now</span>
            </div>
            <h3 className="font-semibold text-slate-800 leading-snug line-clamp-2">
              {form.title || 'Your item title will appear here'}
            </h3>
            <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {form.description || 'Description preview…'}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
              <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          </div>
        </article>

        <div className="mt-5 p-4 rounded-xl bg-brand-50 border border-brand-100">
          <h4 className="text-sm font-semibold text-brand-800 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips for a great listing
          </h4>
          <ul className="mt-2 space-y-1.5 text-xs text-brand-700 leading-relaxed">
            <li>• Add clear, well-lit photos from multiple angles</li>
            <li>• Include unique identifiers (scratches, stickers, serial numbers)</li>
            <li>• Never share sensitive info like full ID numbers publicly</li>
            <li>• Meet in a safe public place when returning items</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
