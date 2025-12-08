import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const refreshUI = () => {
  window.dispatchEvent(new Event("languageChanged"));
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ja'], // Add your supported languages here
    fallbackLng: 'ja',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    // backend: {
    //   loadPath: `https://minerva-corp.com/locales/{{lng}}/translation.json`
    // },
    react: { useSuspense: false },
  });
i18n.on("languageChanged", () => {
  refreshUI();
});
export default i18n;
