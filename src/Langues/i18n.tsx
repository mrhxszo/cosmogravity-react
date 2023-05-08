import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
import translationEN from "./en.json";
import translationFR from "./fr.json";

const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
};

i18next.use(initReactI18next).init({
    resources,
    lng: "fr", // default language
});

export default i18next;