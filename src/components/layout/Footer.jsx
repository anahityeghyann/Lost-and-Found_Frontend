import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-slate-900 text-slate-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">FindIt</span>
          </div>
          <p className="text-sm leading-relaxed">{t('footer.tagline')}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">{t('footer.browse')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">{t('footer.lost_items')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.found_items')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.categories')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.near_me')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">{t('footer.support')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">{t('footer.help_center')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.safety_guidelines')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.report_abuse')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.contact_us')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">{t('footer.legal')}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">{t('footer.terms_of_service')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.privacy_policy')}</a></li>
            <li><a href="#" className="hover:text-white transition">{t('footer.cookie_policy')}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-xs">
          &copy; {t('footer.rights_reserved')}
        </div>
      </div>
    </footer>
  );
}
