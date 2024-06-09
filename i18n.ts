import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: "es",
    compatibilityJSON: "v3",
    resources: {
      en: require("./src/locales/en.json"),
      es: require("./src/locales/es.json"),
    },
    fallbackLng: "es",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
