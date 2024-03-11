import React from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import ProfileOption from '../popup/Popup_profile';
import { useTranslation } from 'react-i18next';

function Navbar() {

    const [t, i18n] = useTranslation("global");
    const navigate = useNavigate();

    return (

        <div className='container-nav'>
            <ul className='container-left-nav'>
                <li className='Logo-navbar'>
                    <img className='logo-welcome-page' src="Logo/job-logo.png" onClick={() => navigate('/')} alt="Logo" />
                </li>
            </ul>
            <ul className='container-right-nav'>
                {/* seaerch button  */}
                <li className='menu-navbar' onClick={() => navigate('/Home')}>{t("navbar.home")}</li>
                <li className='menu-navbar' onClick={() => navigate('/Findjob')}>{t("navbar.findjob")}</li>
                <li className='menu-navbar' onClick={() => navigate('/Findemployee')}>{t("navbar.findemployee")}</li>
                <ProfileOption />
                {/* <li className='menu-navbar' onClick={() => navigate('/Change_language')}> <img src="Logo/language.png" alt="" /> </li> */}
            </ul>
        </div>
    )
}

export default Navbar;
