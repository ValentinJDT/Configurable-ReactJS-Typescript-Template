import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { EN, FR } from './locales';

/**
 * Initialize the i18next library
 */
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: Boolean(process.env.REACT_APP_BACKEND_DEBUG),
    resources: {
      fr: FR,
      en: EN,
    },
    fallbackLng: (code) => 'fr',
    contextSeparator: '_',
  });

export default i18next;
