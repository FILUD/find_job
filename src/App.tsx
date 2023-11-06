import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/navbar_welcome';

import Welcome_Page from './page/Welcome_Page';
import About_Page from './page/About_Page';
import Contact_page from './page/Contact_page';
import Sign_in from './component/popup/Sign_in';

function App() {
  return (
    <div>
      <Router>
      <Navbar />
      <div className="App">
        
        <Routes>

          <Route index element={<Welcome_Page />} />
          <Route  path="/About" element={<About_Page />} />
          <Route  path="/Contact" element={<Contact_page />} />
          <Route  path="/Popup_sign_in" element={<Sign_in />} />


        </Routes>

      </div>
    </Router>
    </div>
  );
}

export default App;
