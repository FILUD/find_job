import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import languages json and package
import global_en from './languages/en/global_en.json';
import global_la from './languages/la/global_la.json';
import global_th from './languages/th/global_th.json';
import { ThemeProvider } from "@material-tailwind/react";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Check if a language is stored in localStorage
const storedLanguage = localStorage.getItem('selectedLanguage');

// Set default language to stored value or 'en' if nothing is stored
const defaultLanguage = storedLanguage || 'en';

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: defaultLanguage,
  resources: {
    en: { global: global_en },
    th: { global: global_th },
    la: { global: global_la },
  }
});

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>
);

reportWebVitals();
