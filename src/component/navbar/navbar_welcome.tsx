import React from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import Login from '../popup/Authentication';
import LanguagesOption from '../popup/Popup_languages';
import { useTranslation } from 'react-i18next';
import Auth_feat from '../authentication_feature/Authentication_feature';
import ProfileEmployer from '../profile_feature/Profile_Employer';
import Profile_Jobseeker from '../profile_feature/Profile_Jobseeker';
import Profile_feature from '../profile_feature/Profile_feature';
import Auth from '../authentication_feature/Auth';

function NavbarWelcome() {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  // navbarwelcome
  return (
    <div className='container-nav'>
      <ul className='container-left-nav'>
        <li className='Logo-navbar'>
          <img className='logo-welcome-page' src="Logo/job-logo.png" onClick={() => navigate('/')} alt="Logo" />
        </li>
      </ul>
      <ul className='container-right-nav'>
        
        <li className='menu-navbar' onClick={() => navigate('/About')}>{t("welcomepage.about")}</li>
        <li className='menu-navbar' onClick={() => navigate('/About_test')}>{("new_about")}</li>
        <li className='menu-navbar' onClick={() => navigate('/Contact')}>{t("welcomepage.contact")}</li>
        <Login />
        <Auth_feat />
        <LanguagesOption />
        <Profile_feature/>
     
        {/* <li className='menu-navbar' onClick={() => navigate('/Profile_Employer')}>{"Profile"}</li> */}
        {/* <li className='menu-navbar' onClick={() => navigate('/Change_language')}> <img className='icon-chang-lang' src="Logo/language.png" alt="" /> </li> */}
      </ul>
    </div>
  )
}

export default NavbarWelcome;
