import React from 'react';
import { useTranslation } from 'react-i18next';

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100 transition';

export default function LocationStep({ form, onChange }) {
  const { t } = useTranslation('common');

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      <h2 className="text-xl font-bold text-slate-800">{t('post_item.steps.location.title')}</h2>
      <p className="mt-1 text-sm text-slate-500">{t('post_item.steps.location.subtitle')}</p>

      <div className="mt-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {t('post_item.steps.location.city')} <span className="text-lost">*</span>
            </label>
            <input
              type="text"
              name="city"
              required
              value={form.city}
              onChange={onChange}
              placeholder={t('post_item.steps.location.city_placeholder')}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {t('post_item.steps.location.district')} <span className="text-lost">*</span>
            </label>
            <input
              type="text"
              name="area"
              required
              value={form.area}
              onChange={onChange}
              placeholder={t('post_item.steps.location.district_placeholder')}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {t('post_item.steps.location.specific_location')}
          </label>
          <input
            type="text"
            name="locationDetail"
            value={form.locationDetail}
            onChange={onChange}
            placeholder={t('post_item.steps.location.specific_placeholder')}
            className={inputClass}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {t('post_item.steps.location.date')} <span className="text-lost">*</span>
            </label>
            <input type="date" name="date" required value={form.date} onChange={onChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {t('post_item.steps.location.approx_time')}
            </label>
            <input type="time" name="time" value={form.time} onChange={onChange} className={inputClass} />
          </div>
        </div>

      
      </div>
    </section>
  );
}