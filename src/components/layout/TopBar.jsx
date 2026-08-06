import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="bg-brand-800 text-white text-sm hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
        <div className="flex items-center gap-5">
          <a href="#" className="opacity-80 hover:opacity-100 transition">Help Center</a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">Contact Us</a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">Safety Tips</a>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            English
          </button>
          <span className="opacity-30">|</span>
          <Link to="/signin" className="opacity-80 hover:opacity-100 transition">Sign In</Link>
          <Link to="/register" className="opacity-80 hover:opacity-100 transition">Register</Link>
        </div>
      </div>
    </div>
  );
}
