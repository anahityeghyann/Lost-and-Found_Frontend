import { useSearchParams } from "react-router-dom";

export default function FiltersBar({ count, items }) {

  const [searchParams, setSearchParmams] = useSearchParams()
  const activeItemType = searchParams.get("item_type") || ""
  const totalShown = count ?? items?.length ?? 0
  const handleTypeFilter = (type) => {
    const newParams = new URLSearchParams(searchParams)
    if (type) {
      newParams.set('item_type', type)

    } else {
      newParams.delete('item_type')
    }
    setSearchParmams(newParams)
  }


  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-slate-500">
            Showing <strong className="text-slate-800">{totalShown}</strong> {totalShown <= 1 ? "item" : "items"}
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => handleTypeFilter('')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition ${activeItemType === ''
                  ? 'bg-blue-100 text-[#0066CC] font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleTypeFilter('lost')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition ${activeItemType === 'lost'
                  ? 'bg-red-100 text-red-700 font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600'
                }`}
            >
              Lost
            </button>
            <button
              type="button"
              onClick={() => handleTypeFilter('found')}
              className={`px-3 py-1 text-xs font-medium rounded-full transition ${activeItemType === 'found'
                  ? 'bg-emerald-100 text-emerald-700 font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
            >
              Found
            </button>
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
