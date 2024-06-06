import React from 'react'
import '../css/animation_WelcomePage.css'
import { Link, useNavigate } from 'react-router-dom';
// import NavbarWelcome from '../component/navbar/Navbar_welcome'
import Footer from '../component/footer/Footer'
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'


function Welcome_Page() {
    const navigate = useNavigate();
    const { theme } = useTheme();


    return (
        <html data-theme={theme}>
            <div className='font-notoLao'>
                {/* <NavbarWelcome /> */}
                <div className='navbar-slid-in'>
                <SetNavbar />
                </div>
                <center>
                    <div className='align-middle pt-40'>
                        <p className='text-7xl focus-in-contract-bck font-semibold'>ຍິນດີຕອນຮັບ</p>
                        <button className="bounce-top btn btn-outline btn-primary rounded-xl text-lg w-60 align-middle mt-10" onClick={() => navigate('/Home')}>ເຂົ້າສູ່ເວັບໄຊ້</button>
                    </div>

                                            <div className='grid grid-cols-5 justify-center items-center justify-items-center mt-28 gap-0 shadow-xl pb-40 font-notoLao'>
                                                <div></div>
                                                <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl  bg-info  hover:bg-opacity-65 transition duration-700 justify-self-end'>
                                                    <img className='w-20' src="Icon/briefcase.png" alt="" />
                                                    <p className='text-white text-lg'>ຫາວຽກ</p></div>

                                                <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl  bg-info  hover:bg-opacity-65 transition duration-700 justify-self-center'>
                                                    <img className='w-20' src="Icon/users-alt.png" alt="" />
                                                    <p className='text-white text-lg'>ຫາພະນັກງານ</p></div>

                                                <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl  bg-info  hover:bg-opacity-65 transition duration-700 justify-self-start'>
                                                    <img className='w-20' src="Icon/megaphone.png" alt="" />
                                                    <p className='text-white text-lg'>New job</p></div>
                                                <div></div>
                                            </div>
                </center>
                <Footer />
            </div>
        </html>

    )
}

export default Welcome_Page