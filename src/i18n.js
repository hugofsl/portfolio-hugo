import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationPT from './locales/pt.json';
import translationEN from './locales/en.json';

const resources = {
  pt: { translation: translationPT },
  en: { translation: translationEN }
};

i18n
  .use(LanguageDetector) // Detecta o idioma do navegador do usuário
  .use(initReactI18next) // Conecta o i18n ao React
  .init({
    resources,
    fallbackLng: 'en', // Idioma de segurança caso o navegador esteja em um idioma não mapeado (ex: espanhol)
    interpolation: {
      escapeValue: false // O React já faz a proteção contra XSS por padrão
    }
  });

export default i18n;