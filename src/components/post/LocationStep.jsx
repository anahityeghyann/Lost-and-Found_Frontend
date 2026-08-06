const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition';

export default function LocationStep({ form, onChange }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800">Where & when?</h2>
      <p className="mt-1 text-sm text-slate-500">Help people narrow down the search area.</p>

      <div className="mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              City <span className="text-lost">*</span>
            </label>
            <input type="text" name="city" required value={form.city} onChange={onChange} placeholder="Yerevan" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              District / Area <span className="text-lost">*</span>
            </label>
            <input type="text" name="area" required value={form.area} onChange={onChange} placeholder="Kentron, Republic Square" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Specific location</label>
          <input
            type="text"
            name="locationDetail"
            value={form.locationDetail}
            onChange={onChange}
            placeholder="e.g. Near the fountain, Bus stop #12, Metro Barekamutyun"
            className={inputClass}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Date <span className="text-lost">*</span>
            </label>
            <input type="date" name="date" required value={form.date} onChange={onChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Approximate time</label>
            <input type="time" name="time" value={form.time} onChange={onChange} className={inputClass} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 h-48 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-100 to-brand-200 opacity-60" />
          <div className="relative text-center">
            <svg className="w-10 h-10 mx-auto text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="mt-2 text-sm font-medium text-brand-700">Pin location on map</p>
            <p className="text-xs text-brand-500">Optional — click to drop a pin</p>
          </div>
        </div>
      </div>
    </section>
  );
}
