import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/Navbar_welcome';
import WelcomePage from './page/WelcomePage';
import AboutPage from './page/AboutPage';
import About from './page/About_Page'; // new design
import Contactpage from './page/ContactPage';
import Authentication from './component/popup/Authentication';
import HomePage from './page/HomePage';
import ErrorPage from './page/ErrorPage';
import FindEmployeePage from './page/FindEmployeePage';
import FindjobPage from './page/FindjobPage';
import CreateEmpProfile from './page/CreateEmpProfile';
import EmpProfile from './page/EmpProfile';
import ProfileEmployer from './component/profile_feature/Profile_Employer';



function App() {
  const [backend, setbackendData] = useState([{}])
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(data => { setbackendData(data) })
    document.title = 'Find Jop';
  }, []);

  return (

    <div>
      <Router>
        <div className="App">

          <Routes>
            <Route index element={<WelcomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/About_test" element={<About />} />
            <Route path="/Contact" element={<Contactpage />} />
            <Route path="/Popup_sign_in" element={<Authentication />} />
            <Route path="/FindEmployee" element={<FindEmployeePage />} />
            <Route path="/Findjob" element={<FindjobPage />} />
            <Route path="/CreateEmpProfile" element={<CreateEmpProfile />} />
            <Route path="/EmpProfile" element={<EmpProfile />} />
            <Route path="/Profile_Employer" element={<ProfileEmployer />} />
            <Route path="*" element={<ErrorPage />} />

          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;
