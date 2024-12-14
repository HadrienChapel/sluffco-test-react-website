import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            products: 'Products',
            about: 'About',
            contact: 'Contact',
          },
          categories: {
            beanie: 'Beanies',
            mask: 'Ski Masks',
            sweater: 'Sweaters',
            sunglasses: 'Sunglasses',
          },
        },
      },
      fr: {
        translation: {
          nav: {
            home: 'Accueil',
            products: 'Produits',
            about: 'À propos',
            contact: 'Contact',
          },
          categories: {
            beanie: 'Bonnets',
            mask: 'Masques de ski',
            sweater: 'Pulls',
            sunglasses: 'Lunettes de soleil',
          },
        },
      },
      de: {
        translation: {
          nav: {
            home: 'Startseite',
            products: 'Produkte',
            about: 'Über uns',
            contact: 'Kontakt',
          },
          categories: {
            beanie: 'Mützen',
            mask: 'Skimasken',
            sweater: 'Pullover',
            sunglasses: 'Sonnenbrillen',
          },
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;