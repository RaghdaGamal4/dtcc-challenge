import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import TRANSLATIONS_AR from "./translation-ar.json";
import TRANSLATIONS_EN from "./translation-en.json";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ar: {
                translation: TRANSLATIONS_AR
            },
            en: {
                translation: TRANSLATIONS_EN
            }
        }
    });

if (localStorage.getItem("i18nextLng") === "ar") {
    localStorage.setItem("i18nextLng", "ar");
    i18n.changeLanguage("ar");
} else {
    i18n.changeLanguage("en");
}

export default i18n;
