import { Link } from 'react-router-dom';

export default function SuccessModal({ open, onPostAnother }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-found-light rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-found" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-5 text-xl font-bold text-slate-800">Listing published!</h3>
        <p className="mt-2 text-sm text-slate-500">Your item is now live. We&apos;ll notify you when someone responds.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 transition">
            View all listings
          </Link>
          <button type="button" onClick={onPostAnother} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition">
            Post another
          </button>
        </div>
      </div>
    </div>
  );
}
