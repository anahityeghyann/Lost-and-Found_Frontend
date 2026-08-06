function LocationIcon() {
  return (
    <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function ViewIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function StatusBadge({ type, pulse }) {
  const isLost = type === 'lost';
  return (
    <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm ${isLost ? 'bg-lost' : 'bg-found'}`}>
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
      {!pulse && isLost === false && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      {isLost ? 'Lost' : 'Found'}
    </span>
  );
}

function CardImage({ item }) {
  if (item.noImage) {
    return (
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center">
        <div className="text-center text-slate-400">
          <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium">No photo</span>
        </div>
        <StatusBadge type={item.type} />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <StatusBadge type={item.type} pulse={item.type === 'lost' && !item.reward} />
      {item.reward && (
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-900 shadow-sm">
          Reward ${item.reward}
        </span>
      )}
      {item.verified && (
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white shadow-sm">Verified</span>
      )}
      {item.urgent && (
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500 text-white shadow-sm animate-pulse">Urgent</span>
      )}
      <button type="button" className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white hover:text-red-500 text-slate-400 transition opacity-0 group-hover:opacity-100">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
}

function CardContent({ item }) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">{item.category}</span>
        <span className="text-[11px] text-slate-400">{item.timeAgo}</span>
        {item.justPosted && (
          <span className="text-[11px] font-semibold text-found bg-found-light px-2 py-0.5 rounded-md ml-auto">Just posted</span>
        )}
      </div>
      <h3 className={`font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-brand-600 transition ${item.layout === 'list' ? 'text-lg' : ''}`}>
        {item.title}
      </h3>
      <p className="mt-1.5 text-sm text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
      <div className={`mt-3 flex items-center ${item.layout === 'list' ? 'gap-4' : 'justify-between'}`}>
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <LocationIcon />
          <span className="truncate">{item.location}</span>
        </div>
        <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
          <ViewIcon />
          {item.views}{item.layout === 'list' ? ' views' : ''}
        </span>
        {item.layout === 'list' && (
          <button type="button" className="ml-auto text-sm font-semibold text-brand-600 hover:text-brand-700 transition">
            View Details →
          </button>
        )}
      </div>
    </div>
  );
}

export default function ItemCard({ item }) {
  if (item.layout === 'list') {
    return (
      <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer sm:col-span-2">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-48 md:w-56 shrink-0 aspect-[4/3] sm:aspect-auto sm:min-h-[140px] bg-slate-100 overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <StatusBadge type={item.type} />
          </div>
          <div className="flex flex-col justify-center flex-1">
            <CardContent item={item} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${item.highlight ? 'ring-2 ring-amber-300 ring-offset-2' : ''}`}>
      <CardImage item={item} />
      <CardContent item={item} />
    </article>
  );
}
