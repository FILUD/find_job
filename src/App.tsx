import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/Navbar_welcome';

import WelcomePage from './page/WelcomePage';
import AboutPage from './page/AboutPage';
import Contactpage from './page/ContactPage';
import Authentication from './component/popup/Authentication';
import HomePage from './page/HomePage';
import ErrorPage from './page/ErrorPage';
import FindEmployeePage from './page/FindEmployeePage';
import FindjobPage from './page/FindjobPage';
import CreateEmpProfile from './page/CreateEmpProfile';
import EmpProfile from './page/EmpProfile';


function App() {
  
  useEffect(() => {
    document.title = 'Fine Jop';
  }, []);

  return (

    <div>
      <Router>
      <div className="App">
        
        <Routes>

          <Route index element={<WelcomePage />} />
          <Route  path="/Home" element={<HomePage />} />
          <Route  path="/About" element={<AboutPage />} />
          <Route  path="/Contact" element={<Contactpage />} />
          <Route  path="/Popup_sign_in" element={<Authentication />} />
          <Route  path="/FindEmployee" element={<FindEmployeePage />} />
          <Route  path="/Findjob" element={<FindjobPage />} />
          <Route  path="/CreateEmpProfile" element={<CreateEmpProfile />} />
          <Route  path="/EmpProfile" element={<EmpProfile />} />

          <Route path="*" element={<ErrorPage />} />
          
        </Routes>

      </div>
    </Router>
    </div>
  );
}

export default App;
