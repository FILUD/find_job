import React from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import Login from '../popup/Authentication';
import LanguagesOption from '../popup/Popup_languages';
import { useTranslation } from 'react-i18next';

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
            <Login/>
            <LanguagesOption/>
            {/* <li className='menu-navbar' onClick={() => navigate('/Change_language')}> <img className='icon-chang-lang' src="Logo/language.png" alt="" /> </li> */}
        </ul>
    </div>
  )
}

export default NavbarWelcome;
