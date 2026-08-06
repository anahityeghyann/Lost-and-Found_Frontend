const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition';

export default function ContactStep({ form, onChange }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800">Contact information</h2>
      <p className="mt-1 text-sm text-slate-500">How should people reach you? Your info is shown only after they contact you.</p>

      <div className="mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full name <span className="text-lost">*</span>
            </label>
            <input type="text" name="name" required value={form.name} onChange={onChange} placeholder="John Doe" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone <span className="text-lost">*</span>
            </label>
            <input type="tel" name="phone" required value={form.phone} onChange={onChange} placeholder="+374 00 000 000" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@email.com" className={inputClass} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred contact method</label>
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'phone', label: 'Phone call' },
              { value: 'sms', label: 'SMS / Message' },
              { value: 'email', label: 'Email' },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 cursor-pointer hover:border-brand-300 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 transition"
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={value}
                  checked={form.contactMethod === value}
                  onChange={onChange}
                  className="text-brand-600 focus:ring-brand-500"
                />
                <span className="text-sm font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl bg-slate-50 border border-slate-200">
          <input
            type="checkbox"
            name="terms"
            required
            checked={form.terms}
            onChange={onChange}
            className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-slate-600 leading-relaxed">
            I agree to the <a href="#" className="text-brand-600 font-medium hover:underline">Terms of Service</a> and confirm this listing is accurate. I understand that false reports may be removed.
          </span>
        </label>
      </div>
    </section>
  );
}
