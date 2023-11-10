import React from 'react';
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import Login from '../popup/Authentication';

function NavbarWelcome() {
  const navigate = useNavigate();

  return (
    <div className='container-nav'>
        <ul className='container-left-nav'>
            <li className='Logo-navbar'>
             <img className='logo-welcome-page' src="Logo/job-logo.png" onClick={() => navigate('/')} alt="Logo" />
            </li>
        </ul>
        <ul className='container-right-nav'>
            <li className='menu-navbar' onClick={() => navigate('/About')}>About</li>
            <li className='menu-navbar' onClick={() => navigate('/Contact')}>contact</li>
            <Login/>
            <li className='menu-navbar' onClick={() => navigate('/Change_language')}> <img src="Logo/language.png" alt="" /> </li>
        </ul>
    </div>
  )
}

export default NavbarWelcome;
