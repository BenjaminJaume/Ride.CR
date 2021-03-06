import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "en",
    fallbackLng: "en", // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    // react-i18next options
    react: {
      wait: true,
    },
  });

export default i18n;
