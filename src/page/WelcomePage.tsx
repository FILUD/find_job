import React from 'react'
import '../css/Welcome.css'
import { Link, useNavigate } from 'react-router-dom';
import NavbarWelcome from '../component/navbar/Navbar_welcome'
import Footer from '../component/footer/Footer'
import { useTranslation } from 'react-i18next';

function Welcome_Page() {
    const navigate = useNavigate();
    const [t, i18n] = useTranslation("global");
   
    return (
        <div>
            
            <NavbarWelcome />
            <center>

                <div className='box-center-welcome'>
                    <p className='text-welcome'>{t("welcomepage.welcome")}</p>
                    <button className='button-let-start' onClick={() => navigate('/Home')}>{t("welcomepage.letsstart")}</button>
                </div>

                <div className='footer-container-welcome'>
                    <div className='footer-box box-find-job-welcome'>
                        <img className='icon-footer-welcome' src="Icon/briefcase.png" alt="" />
                        <p className='text-inside-box-welcome'>{t("welcomepage.findjob")}</p></div>

                    <div className='footer-box box-find-employee-welcome'>
                    <img className='icon-footer-welcome' src="Icon/users-alt.png" alt="" />
                        <p className='text-inside-box-welcome'>{t("welcomepage.findemployee")}</p></div>
                    
                    <div className='footer-box box-new-job-welcome'>
                    <img className='icon-footer-welcome' src="Icon/megaphone.png" alt="" />
                        <p className='text-inside-box-welcome'>{t("welcomepage.newjob")}</p></div>
                    
                </div>
            </center>
            <Footer/>
        </div>
    )
}

export default Welcome_Page