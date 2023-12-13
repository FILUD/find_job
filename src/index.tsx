import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//import languages json and pakage
import global_en from './languages/en/global_en.json';
import global_la from './languages/la/global_la.json';
import global_th from './languages/th/global_th.json';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

//changing languages and set main languages
i18next.init({
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  lng: "en",
  resources: {
    en: {global: global_en},
    th: {global: global_th },
    la: {global: global_la},
  }
});

root.render(

  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
