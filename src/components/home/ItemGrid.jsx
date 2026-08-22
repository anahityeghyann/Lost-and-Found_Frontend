import ItemCard from './ItemCard';
import { fetchItems } from '../../services/itemsApi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageStatus from '../ui/PageStatus';


export default function ItemGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') || ''
  const itemType = searchParams.get('item_type') || ''
  const search = searchParams.get('search') || ''


  const loadItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchItems(category, itemType, search)
      setItems(data)
    }
    catch (err) {
      setError(err.message || "Failed to connect to backend server")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [category, itemType, search])


  if(loading || error){
    return <PageStatus loading={loading} error={error} onRetry={loadItems}
    />
  }
  

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {items.length === 0 ? (
        <div className='text-center py-16 bg-white rounded-2xl border border-slate-200'>
          <p className='text-slate-500 font-medium'>No listings found in the database.</p>
        </div>
      ) :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>}
      {
        items.length > 0 && (
          <div className="mt-8 text-center">
            <button type="button" className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-brand-400 hover:text-brand-600 transition">
              Load More Items
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )
      }
    </main>
  );
}
