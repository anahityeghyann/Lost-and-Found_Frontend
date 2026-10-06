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
      </div>
    </div>
  );
}
