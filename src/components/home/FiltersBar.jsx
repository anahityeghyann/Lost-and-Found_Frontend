export default function FiltersBar() {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500">
            Showing <strong className="text-slate-800">248</strong> items
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="flex gap-1.5">
            <button type="button" className="px-3 py-1 text-xs font-medium rounded-full bg-brand-100 text-brand-700">All</button>
            <button type="button" className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-lost-light hover:text-lost transition">Lost</button>
            <button type="button" className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-found-light hover:text-found transition">Found</button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-600 outline-none focus:border-brand-400 cursor-pointer">
            <option>Most Recent</option>
            <option>Nearest First</option>
            <option>Most Viewed</option>
          </select>
          <div className="hidden sm:flex border border-slate-200 rounded-lg overflow-hidden">
            <button type="button" className="p-1.5 bg-brand-50 text-brand-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button type="button" className="p-1.5 text-slate-400 hover:text-slate-600">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
