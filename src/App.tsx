import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './page/WelcomePage';
import AboutPage from './page/AboutPage';
import Contactpage from './page/ContactPage';
import HomePage from './page/HomePage';
import ErrorPage from './page/ErrorPage';
import FindEmployeePage from './page/FindEmployeePage';
import FindjobPage from './page/FindjobPage';
import CreateEmpProfile from './page/CreateEmpProfile';
import EmployerProfile from './page/EmployerProfile';
import PostCvPage from './page/PostCvPage';
import PostJobPage from './page/PostJobPage';

import TestPage from './page/TestPage';
import ViewProfilePage from './page/ViewProfilePage';
import Admin_dashboard from './component/admin/page/Admin_Page';
import ChatMessage from './component/chat/ChatMessage';
import Chat_Page from './component/chat/Chat_Page';




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
            <Route path="/Home" element={<HomePage />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Contact" element={<Contactpage />} />
            <Route path="/FindEmployee" element={<FindEmployeePage />} />
            <Route path="/Findjob" element={<FindjobPage />} />
            <Route path="/CreateEmpProfile" element={<CreateEmpProfile />} />
            <Route path="/PostCv" element={<PostCvPage />} />
            <Route path="/PostJob" element={<PostJobPage />} />
            <Route path="/profile/:jobseekerID" element={<ViewProfilePage />} />
            <Route path="/EmpProfile/:employerID" element={<EmployerProfile />} />
            <Route path="/admin_dashboard" element={<Admin_dashboard />} />
            <Route path="/chat" element={<ChatMessage />} />
            <Route path="*" element={<ErrorPage />} />

            <Route path="/test" element={<TestPage />} />

            {/* chat */}
            <Route path="/Chat_page" element={<Chat_Page />} />
            <Route path="/Chat_page/:employerID" element={<ChatMessage />} />
            
          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;
