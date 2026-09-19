import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            {t('hero.title_line1')}
            <br className="hidden sm:block" /> {t('hero.title_line2')}
          </h1>
          <p className="mt-3 text-brand-100 text-base md:text-lg leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/post?type=lost" className="inline-flex items-center gap-2 bg-white text-brand-700 px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition">
              <span className="w-2 h-2 rounded-full bg-lost" />
              {t('hero.btn_lost')}
            </Link>
            <Link to="/post?type=found" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition">
              <span className="w-2 h-2 rounded-full bg-found" />
              {t('hero.btn_found')}
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-6 md:gap-10">
          <div>
            <p className="text-2xl md:text-3xl font-extrabold">12,480</p>
            <p className="text-brand-200 text-sm">{t('hero.stat_active')}</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold">8,920</p>
            <p className="text-brand-200 text-sm">{t('hero.stat_reunited')}</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-extrabold">94%</p>
            <p className="text-brand-200 text-sm">{t('hero.stat_success')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}