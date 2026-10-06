import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function PostNavbar() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation('common');

  const isAuthenticated = Boolean(
    localStorage.getItem('token') || localStorage.getItem('user')
  )
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate("/signin")
  }

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <div className="bg-brand-800 text-white text-sm hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-2 text-brand-200 font-medium">
            <span> {t('topbar.welcome_msg', 'FindIt — Your Trusted Lost & Found Community')}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="bg-brand-800 text-white border border-brand-700 rounded px-1.5 py-0.5 focus:outline-none cursor-pointer"
              >
                <option value="en" className='bg-gray-800 text-white'>English</option>
                <option value="ru" className="bg-gray-800 text-white">Russian</option>
                <option value="hy" className="bg-gray-800 text-white">Հայերեն</option>
              </select>
            </div>

            <span className="opacity-30">|</span>
            {isAuthenticated ? (
              <>
                <button onClick={handleLogout} type='button' className='flex items-center gap-1.5 opacity-80 hover:opacity-100 transition'>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>{t('topbar.logout')}</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="opacity-80 hover:opacity-100 transition">{t('topbar.signin')}</Link>
                <Link to="/register" className="opacity-80 hover:opacity-100 transition">{t('topbar.register')}</Link>
              </>
            )}

          </div>
        </div>
      </div>
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-between py-3 gap-4">
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



          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-brand-700 transition shrink-0">
            Back
          </Link>
        </div>
      </header>
    </>
  );
}
