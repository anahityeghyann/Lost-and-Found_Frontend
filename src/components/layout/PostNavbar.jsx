import { Link } from 'react-router-dom';

export default function PostNavbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3 gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-md shadow-brand-600/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-extrabold text-brand-700 tracking-tight">FindIt</span>
            <span className="block text-[10px] font-medium text-slate-400 -mt-0.5 tracking-widest uppercase">Lost & Found</span>
          </div>
        </Link>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="hover:text-brand-600 transition">Home</Link>
          <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium text-slate-800">Post Item</span>
        </div>

        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition shrink-0">
          Cancel
        </Link>
      </div>
    </header>
  );
}
