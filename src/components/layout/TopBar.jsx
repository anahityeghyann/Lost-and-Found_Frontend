import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('common');

  const isAuthenticated = Boolean(
    localStorage.getItem('token') || localStorage.getItem('user')
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate("/signin");
  };

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="bg-brand-800 text-white text-sm hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-9">
        <div className="flex items-center gap-5">
          <a href="#" className="opacity-80 hover:opacity-100 transition">{t('topbar.help_center')}</a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">{t('topbar.contact_us')}</a>
          <a href="#" className="opacity-80 hover:opacity-100 transition">{t('topbar.safety_tips')}</a>
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
              <Link to="/profile" className='flex items-center gap-1.5 opacity-80 hover:opacity-100 transition'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{t('topbar.account')}</span>
              </Link>
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
  );
}