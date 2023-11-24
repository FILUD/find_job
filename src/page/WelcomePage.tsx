import React from 'react'
import '../css/Welcome.css'
import { Link, useNavigate } from 'react-router-dom';

import NavbarWelcome from '../component/navbar/Navbar_welcome'
import Footer from '../component/footer/Footer'


function Welcome_Page() {
    const navigate = useNavigate();

    return (
        <div>
            
            <NavbarWelcome />
            <center>

                <div className='box-center-welcome'>
                    <p className='text-welcome'>Welcome</p>
                    <button className='button-let-start' onClick={() => navigate('/Home')}>Let's start</button>
                </div>

                <div className='footer-container-welcome'>
                    <div className='footer-box box-find-job-welcome'>
                        <img className='icon-footer-welcome' src="Icon/briefcase.png" alt="" />
                        <p className='text-inside-box-welcome'>Find job</p></div>

                    <div className='footer-box box-find-employee-welcome'>
                    <img className='icon-footer-welcome' src="Icon/users-alt.png" alt="" />
                        <p className='text-inside-box-welcome'>Find Employee</p></div>
                    
                    <div className='footer-box box-new-job-welcome'>
                    <img className='icon-footer-welcome' src="Icon/megaphone.png" alt="" />
                        <p className='text-inside-box-welcome'>New job</p></div>
                    
                </div>
            </center>
            <Footer/>
        </div>
    )
}

export default Welcome_Page