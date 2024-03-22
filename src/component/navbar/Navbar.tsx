import React from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import ProfileOption from '../popup/Popup_profile';
import AuthFeat from '../authentication/Authentication';

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className='container-nav'>
            <ul className='container-left-nav'>
                <li className='Logo-navbar'>
                    <img className='logo-welcome-page' src="Logo/job-logo.png" onClick={() => navigate('/')} alt="Logo" />
                </li>
            </ul>
            <ul className='container-right-nav'>
                <li className='menu-navbar' onClick={() => navigate('/Home')}>Home</li>
                <li className='menu-navbar' onClick={() => navigate('/Findjob')}>Find job</li>
                <li className='menu-navbar' onClick={() => navigate('/Findemployee')}>Find employee</li>
                <ProfileOption />
                <AuthFeat/>
            </ul>
        </div>
    )
}

export default Navbar;
