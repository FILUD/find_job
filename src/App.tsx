import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/navbar_welcome';

import WelcomePage from './page/WelcomePage';
import AboutPage from './page/AboutPage';
import Contactpage from './page/ContactPage';
import Authentication from './component/popup/Authentication';


function App() {
  return (
    <div>
      <Router>
      <div className="App">
        
        <Routes>

          <Route index element={<WelcomePage />} />
          <Route  path="/About" element={<AboutPage />} />
          <Route  path="/Contact" element={<Contactpage />} />
          <Route  path="/Popup_sign_in" element={<Authentication />} />


        </Routes>

      </div>
    </Router>
    </div>
  );
}

export default App;
