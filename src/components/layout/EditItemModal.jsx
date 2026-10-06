import React, { useState } from 'react';
import { X } from 'lucide-react'; // Ներմուծում ենք Իքս իկոնան
import { updateUserItems } from '../../services/authApi';

const EditModal = ({ item, onClose, token, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    category: item?.category || '',
    itemType: item?.itemType || item?.item_type || 'lost',
    locationDetail: item?.locationDetail || item?.location_detail || '',
    city: item?.city || '',
    area: item?.area || '',
    name: item?.name || item?.contact_name || '',
    phone: item?.phone || item?.contact_phone || '',
    email: item?.email || item?.contact_email || '',
    contactMethod: item?.contactMethod || item?.contact_method || 'phone',
    reward: item?.reward || 0,
    offerReward: item?.offerReward || false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const authToken = token || localStorage.getItem('token');
      const hashCode = item?.hash_code || item?.hashCode;

      const updatedData = await updateUserItems(hashCode, formData, authToken);

      onUpdate(updatedData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md relative max-h-[90vh] overflow-y-auto shadow-xl border border-slate-100">
        
        {/* Վերևի Աջ Իքս (Close) Կոճակը */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-slate-900 mb-4 pr-6">Edit Listing</h2>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-3 rounded-xl mb-4 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Item Type (Lost / Found) */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">Type</label>
            <select
              name="itemType"
              value={formData.itemType}
              onChange={handleChange}
              className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white"
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          {/* Location Detail */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">Location Detail</label>
            <input
              type="text"
              name="locationDetail"
              value={formData.locationDetail}
              onChange={handleChange}
              className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Contact Phone */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">Contact Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Contact Name */}
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-slate-700">Contact Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Contact Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-1 text-slate-700">Contact Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;