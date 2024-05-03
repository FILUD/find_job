import React, { useEffect, useState } from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import AuthFeat from '../authentication/AuthFeature';
import Profile_feature from '../profile/ProfileFeature';
import { ThemeToggle } from '../../theme/theme';


function NavbarWelcome() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const datalocalID = localStorage.getItem('ID');
    const datalocalRole = localStorage.getItem('Role');
    const datalocalUserID = localStorage.getItem('UserID');
    const datalocalEmail = localStorage.getItem('Email');

    if (datalocalID && datalocalRole && datalocalUserID && datalocalEmail) {
      // Parse the retrieved data into an object
      const parsedData = {
        ID: JSON.parse(datalocalID),
        Role: JSON.parse(datalocalRole),
        UserID: JSON.parse(datalocalUserID),
        Email: JSON.parse(datalocalEmail)
      };

      setUserData(parsedData);

    }
  }, []);

  return (
    <div className='mx-10 px-5 shadow-xl py-4'>
      <div className='container-nav'>
        {/* <ul className='container-left-nav'>
            <li className='Logo-navbar'>
             <img className='logo-welcome-page' src="Logo/job-logo.png" onClick={() => navigate('/')} alt="Logo" />
            </li>
        </ul>
        <ul   className='container-right-nav'>
            <li className='menu-navbar' onClick={() => navigate('/About')}>About</li>
            <li className='menu-navbar' onClick={() => navigate('/Contact')}>contact</li>
            <li className='menu-navbar' onClick={() => navigate('/Change_language')}> <img className='icon-chang-lang' src="Logo/language.png" alt="" /> </li>
            
        </ul>
        </ul> */}

        <div className="navbar bg-base-500">
          <div className="flex-1">
            <a onClick={() => navigate('/')} className="btn btn-ghost text-xl ">FiveJOB</a>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </label>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </div>

            {/* theme */}
            <div className="btn btn-ghost btn-circle avatar">
              <ThemeToggle />
            </div>


            {userData ? (
              <Profile_feature />
            ) : (
              <AuthFeat />
            )}

            {/* Change Language */}
            <div className="dropdown dropdown-end ">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mx-5 ">
                <div className="w-10 rounded-full ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-full h-full">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box w-52 ">
                <li ><a>ລາວ</a></li>
                <li className=''><a>English</a></li>
              </ul>
            </div>




          </div>
        </div>
      </div>
    </div>

  )
}

export default NavbarWelcome;



