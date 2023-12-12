import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//languages 
import global_en from '.languages/english/global_en.json';
import global_la from '.languages/lao/global_la.json';
import global_th from '.languages/thai/global_th.json';
import i18next from 'i18next';
i18next.init({})
// i18next.init({
//   interpolation: { escapeValue: false },
//   lng: "en",
//   resource: {
//     en: { global_en },
//     th: { global_th },
//     la: { global_la },
    
//   }
// })

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
