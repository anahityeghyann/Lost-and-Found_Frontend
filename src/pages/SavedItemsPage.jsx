import React, { useEffect, useState } from 'react'
import { fetchSavedItems } from '../services/itemsApi'

const SavedItemsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const getSavedItems = async () => {
      try {
        setLoading(true)
        const data = await fetchSavedItems()
        setSavedItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getSavedItems()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Loading...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Saved Items ({savedItems.length})
      </h1>

      {savedItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">You have no saved items yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((item) => {
            // Ճիշտ ենք վերցնում նկարի URL-ը Serializer-ի դաշտերից
            const imageUrl = item.main_image_url || 
                             (item.images && item.images.length > 0 ? (item.images[0].image_url || item.images[0].image) : null);

            const itemType = item.itemType || item.item_type;

            return (
              <div 
                key={item.id || item.hash_code} 
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Image Section */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  
                  {/* Status Badge (Lost / Found) */}
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    itemType === 'lost' ? 'bg-lost' : 'bg-found'
                  }`}>
                    {itemType === 'lost' ? 'Lost' : 'Found'}
                  </span>
                </div>

                {/* Text Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-400 pt-3 border-t border-gray-100">
                    <span>{item.category || 'Category'}</span>
                    <span>{item.city || item.locationDetail || ''}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SavedItemsPage