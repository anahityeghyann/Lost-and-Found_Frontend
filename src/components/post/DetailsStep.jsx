import { useRef, useState, useEffect } from 'react';
import { fetchCategories } from '../../services/categoriesApi';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition';

export default function DetailsStep({ form, itemType, onChange, photos, onPhotosChange, onRemovePhoto }) {
  const fileInputRef = useRef(null);
  const isLost = itemType === 'lost';
  const [categories, setCategories] = useState([])

  useEffect(() => {
      async function getCategories() {
        try{
          const data = await fetchCategories()
          setCategories(data)
        } catch(error){
          console.error('Error in Navbar while getting categories:', error);         
        }
      }
      getCategories()
  }, []) 

  const handleFiles = (files) => {
    const remaining = 5 - photos.length;
    Array.from(files)
      .slice(0, remaining)
      .forEach((file) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (ev) => onPhotosChange((prev) => [...prev, ev.target.result]);
        reader.readAsDataURL(file);
      });
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800">Item details</h2>
      <p className="mt-1 text-sm text-slate-500">Describe the item clearly so others can recognize it.</p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Title <span className="text-lost">*</span>
          </label>
          <input
            type="text"
            name="title"
            required
            maxLength={120}
            value={form.title}
            onChange={onChange}
            placeholder="e.g. Lost iPhone 15 Pro — Space Black with blue case"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-slate-400">{form.title.length}/120 characters</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Category <span className="text-lost">*</span>
          </label>
          <select name="category" required value={form.category} onChange={onChange} className={`${inputClass} bg-white cursor-pointer`}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Description <span className="text-lost">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={5}
            maxLength={1000}
            value={form.description}
            onChange={onChange}
            placeholder="Include distinctive features: color, brand, marks, contents, where you last saw it…"
            className={`${inputClass} resize-none`}
          />
          <p className="mt-1 text-xs text-slate-400">{form.description.length}/1000 characters</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Photos</label>
          <div
            className="relative border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-brand-400 hover:bg-brand-50/50 transition cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <svg className="w-10 h-10 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Drag & drop photos here, or <span className="text-brand-600">browse</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">Up to 5 images · JPG, PNG · Max 5 MB each</p>
          </div>
          {photos.length > 0 && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
              {photos.map((src, i) => (
                <div key={src} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => onRemovePhoto(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {isLost && (
          <>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="offerReward"
                  checked={form.offerReward}
                  onChange={onChange}
                  className="w-4 h-4 rounded border-amber-300 text-amber-500 focus:ring-amber-400"
                />
                <span className="text-sm font-semibold text-amber-800">Offer a reward for finding this item</span>
              </label>
              {form.offerReward && (
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-amber-700 font-medium">$</span>
                  <input
                    type="number"
                    name="reward"
                    min={1}
                    value={form.reward}
                    onChange={onChange}
                    placeholder="50"
                    className="w-32 px-3 py-2 rounded-lg border border-amber-200 text-sm outline-none focus:border-amber-400 bg-white"
                  />
                </div>
              )}
            </div>

            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition">
              <input
                type="checkbox"
                name="urgent"
                checked={form.urgent}
                onChange={onChange}
                className="w-4 h-4 rounded border-slate-300 text-lost focus:ring-lost"
              />
              <div>
                <span className="text-sm font-semibold text-slate-700">Mark as urgent</span>
                <p className="text-xs text-slate-400 mt-0.5">For time-sensitive items like pets, medication, or passports</p>
              </div>
            </label>
          </>
        )}
      </div>
    </section>
  );
}
