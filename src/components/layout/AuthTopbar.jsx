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
    <div className="bg-brand-800 text-white text-sm hidden sm:block px-4">
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
        </div>
      </div>
    </div>
  );
}