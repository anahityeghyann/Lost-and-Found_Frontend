import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import axios from 'axios'

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru', 'hy'],
    ns: ['common', 'findit'],
    defaultNS: 'common',

    // namespace

    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
        escapeValue: false
    },
    react: {
      useSuspense: false, // ՍԱ ՇԱՏ ԿԱՐԵՎՈՐ Է, որ էջը սպիտակ չդառնա
    }
})

if (i18n.language) {
  axios.defaults.headers.common['Accept-Language'] = i18n.language
}

// Լեզուն փոխվելիս header-ը թարմացնելու համար (ճշգրտված headers.common)
i18n.on('languageChanged', (lng) => {
  axios.defaults.headers.common['Accept-Language'] = lng
})

export default i18n
