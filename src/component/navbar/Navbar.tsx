import React from 'react';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import AuthFeat from '../authentication/AuthFeature';
import Profile_feature from '../profile/ProfileFeature';

function Navbar() {
    const navigate = useNavigate();

    return (
        <div className='ml-20 mr-20 '>
            {/* <ul className='container-left-nav'>
                <li className='Logo-navbar'>
                    <img className='logo-welcome-page' src="Logo/job-logo.png" onClick={() => navigate('/')} alt="Logo" />
                </li>
            </ul>
            <ul className='container-right-nav'>
                <li className='menu-navbar' onClick={() => navigate('/Home')}>Home</li>
                <li className='menu-navbar' onClick={() => navigate('/Findjob')}>Find job</li>
                <li className='menu-navbar' onClick={() => navigate('/Findemployee')}>Find employee</li>
                <ProfileOption />
            </ul> */}

            <div className='container-nav'>
                <div className="navbar bg-base-500">
                    <div className="flex-1">
                        <a onClick={() => navigate('/Home')} className="btn btn-ghost text-xl">FiveJOB</a>
                    </div>
                    <div className="flex-none">

                        <div className="dropdown dropdown-end px-5 hover:text-orange-300 duration-1000 cursor-pointer">
                            <p onClick={() => navigate('/Home')}>Home</p>
                        </div>

                        <div className="dropdown dropdown-end px-5 hover:text-orange-300 duration-1000 cursor-pointer">
                            <p onClick={() => navigate('/Findjob')}>Find job</p>
                        </div>

                        <div className="dropdown dropdown-end px-5 hover:text-orange-300 duration-1000 cursor-pointer">
                            <p onClick={() => navigate('/FindEmployee')}>Find Employee</p>
                        </div>

                        <div className="dropdown dropdown-end px-5 hover:text-orange-300 duration-1000 cursor-pointer">
                            <p onClick={() => navigate('/FindEmployee')}>Post JOB</p>
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

                        {/* bell icon */}
                        <div className="dropdown dropdown-end">
                            <button className="btn btn-ghost btn-circle ">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                    {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
                                </div>
                            </button>
                        </div>

                        {/* profile icon */}
                        <Profile_feature />

                        {/* Change Language */}
                        <div className="dropdown dropdown-end ml-7">
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
        </div>
    )
}

export default Navbar;
