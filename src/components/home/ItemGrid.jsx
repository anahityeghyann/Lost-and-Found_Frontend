import { LISTINGS } from '../../data/listings';
import ItemCard from './ItemCard';

export default function ItemGrid() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {LISTINGS.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <button type="button" className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-brand-400 hover:text-brand-600 transition">
          Load More Items
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </main>
  );
}
