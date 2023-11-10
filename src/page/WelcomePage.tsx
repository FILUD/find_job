import React from 'react'
import '../css/Welcome.css'
// import Navbar from '../component/navbar/navbar_welcome'
import Navbar from '../component/navbar/Navbar'
function Welcome_Page() {
    return (
        <div>
            
            <Navbar />
            <center>

                <div className='box-center-welcome'>
                    <p className='text-welcome'>Welcome</p>
                    <button className='button-let-start'>Let's start</button>
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
        </div>
    )
}

export default Welcome_Page