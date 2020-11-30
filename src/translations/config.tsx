import i18n from "i18next";
import enLocale from "./en";
import esLocale from "./chiness";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      ...enLocale
    }
  },
  es: {
    translation: {
      ...esLocale
    }
  }
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  resources,
  interpolation: {
    escapeValue: false,
    formatSeparator: "."
  },
  react: {
    wait: true
  }
});

export default i18n;
