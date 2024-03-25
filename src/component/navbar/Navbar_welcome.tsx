import React from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import AuthFeat from '../authentication/AuthFeature';


function NavbarWelcome() {
  const navigate = useNavigate();

  return (
    <div className='container-nav'>
      {/* <ul className='container-left-nav'>
            <li className='Logo-navbar'>
             <img className='logo-welcome-page' src="Logo/job-logo.png" onClick={() => navigate('/')} alt="Logo" />
            </li>
        </ul>
        <ul className='container-right-nav'>
            <li className='menu-navbar' onClick={() => navigate('/About')}>About</li>
            <li className='menu-navbar' onClick={() => navigate('/Contact')}>contact</li>
            <li className='menu-navbar' onClick={() => navigate('/Change_language')}> <img className='icon-chang-lang' src="Logo/language.png" alt="" /> </li>
        </ul> */}

      <div className="navbar bg-base-500">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl ">FiveJOB</a>
        </div>
        <div className="flex-none">

          <div className="dropdown dropdown-end px-5 hover:text-orange-300 duration-1000 cursor-pointer">
            <p onClick={() => navigate('/About')}>About</p>
          </div>

          <div className="dropdown dropdown-end px-5 hover:text-orange-300 duration-1000 cursor-pointer">
            <p onClick={() => navigate('/Contact')}>Contact</p>
          </div>

          {/* Search icon */}
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle w-80">
              <label className="input input-bordered flex items-center gap-2 ">
                <input type="text" className="grow" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>


          {/* Change Language */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Lang" src="Logo/language.png" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li ><a>ລາວ</a></li>
              <li className=''><a>English</a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NavbarWelcome;



