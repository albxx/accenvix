import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import enTranslation from '@/locales/en/translation.json';
import msTranslation from '@/locales/ms/translation.json';

// Define the resources
const resources = {
  en: {
    translation: enTranslation
  },
  ms: {
    translation: msTranslation
  }
};

// Initialize i18n
i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'ms', // Default to Malay
    debug: false,
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator'],
      // Keys or cookies to lookup language from
      lookupLocalStorage: 'i18nextLng',
      // Cache user language on
      caches: ['localStorage']
    }
  });

export default i18n;