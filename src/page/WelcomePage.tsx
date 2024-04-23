import React from 'react'
import '../css/animation_WelcomePage.css'
import { Link, useNavigate } from 'react-router-dom';
// import NavbarWelcome from '../component/navbar/Navbar_welcome'
import Footer from '../component/footer/Footer'
import SetNavbar from '../component/navbar/SetNavbar';


function Welcome_Page() {
    const navigate = useNavigate();

    return (
        <div>

            {/* <NavbarWelcome /> */}
            <SetNavbar />
            <center>

                <div className='align-middle pt-40'>
                    <p className='text-7xl focus-in-contract-bck'>Welcome</p>
                    <button className="bounce-top btn glass text-lg w-60 align-middle mt-10" onClick={() => navigate('/Home')}>Let's start</button>
                </div>

                <div className='grid grid-cols-5 justify-center items-center justify-items-center mt-28 gap-0'>
                    <div></div>
                    <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl bg-sky-600 bg-opacity-40 hover:bg-opacity-100 transition duration-700 justify-self-end'>
                        <img className='w-20' src="Icon/briefcase.png" alt="" />
                        <p className='text-white'>Find job</p></div>

                    <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl bg-sky-600 bg-opacity-40 hover:bg-opacity-100 transition duration-700 justify-self-center'>
                        <img className='w-20' src="Icon/users-alt.png" alt="" />
                        <p className='text-white'>Find Employee</p></div>

                    <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl bg-sky-600 bg-opacity-40 hover:bg-opacity-100 transition duration-700 justify-self-start'>
                        <img className='w-20' src="Icon/megaphone.png" alt="" />
                        <p className='text-white'>New job</p></div>
                    <div></div>
                </div>
            </center>
            <Footer />
        </div>
    )
}

export default Welcome_Page