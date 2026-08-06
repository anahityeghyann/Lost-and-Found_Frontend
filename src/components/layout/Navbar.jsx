import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/listings';

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 py-3">
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

          <div className="flex-1 max-w-2xl mx-auto">
            <div className="flex rounded-xl overflow-hidden border-2 border-brand-500 focus-within:ring-4 focus-within:ring-brand-100 transition">
              <select className="hidden md:block bg-brand-50 text-brand-700 text-sm font-medium px-3 border-r border-brand-200 outline-none cursor-pointer">
                <option>All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="search"
                placeholder="Search lost or found items…"
                className="flex-1 px-4 py-2.5 text-sm outline-none bg-white placeholder:text-slate-400"
              />
              <button type="button" className="bg-brand-600 hover:bg-brand-700 text-white px-5 transition flex items-center gap-2 font-medium text-sm">
                <SearchIcon />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button type="button" className="hidden lg:flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Saved
            </button>
            <Link to="/post" className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-brand-600/25 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Post Item</span>
            </Link>
            <button type="button" className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-brand-600 text-white whitespace-nowrap">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            All Items
          </a>
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-lost hover:bg-lost-light whitespace-nowrap transition">
            <span className="w-2 h-2 rounded-full bg-lost" />
            Lost
          </a>
          <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-found hover:bg-found-light whitespace-nowrap transition">
            <span className="w-2 h-2 rounded-full bg-found" />
            Found
          </a>
          <span className="w-px h-5 bg-slate-200 mx-1 shrink-0" />
          {CATEGORIES.map((cat) => (
            <a key={cat} href="#" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-brand-600 whitespace-nowrap transition">
              {cat}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
