import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SuccessModal({ open, onPostAnother }) {
  const { t } = useTranslation('common');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-found-light rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-found" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-800">
          {t('post_item.success_modal.title')}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          {t('post_item.success_modal.subtitle')}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 transition"
          >
            {t('post_item.success_modal.view_all')}
          </Link>
          <button
            type="button"
            onClick={onPostAnother}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition"
          >
            {t('post_item.success_modal.post_another')}
          </button>
        </div>
      </div>
    </div>
  );
}