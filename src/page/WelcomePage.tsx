import React, { useEffect } from 'react'
import '../css/animation_WelcomePage.css'
import { Link, useNavigate } from 'react-router-dom';
// import NavbarWelcome from '../component/navbar/Navbar_welcome'
import Footer from '../component/footer/Footer'
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'
import { sendVisitData } from '../utils/api';



function Welcome_Page() {
    useEffect(() => {
        sendVisitData(window.location.pathname);
    }, []);

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
                        <p className='text-7xl  font-semibold'>ຍິນດີຕ້ອນຮັບ</p>
                        {/* <p className='text-7xl focus-in-contract-bck font-semibold'>ຍິນດີຕອນຮັບ</p> */}

                        <button className="bounce-top btn hover:bg-orange-500 bg-purple-900 text-white rounded-xl text-lg w-60 align-middle mt-10" onClick={() => navigate('/Home')}>ເຂົ້າສູ່ເວັບໄຊ້</button>
                    </div>

                    <div className='grid grid-cols-5 justify-center items-center justify-items-center mt-28 gap-0 shadow-xl pb-40 font-notoLao'>
                        <div></div>
                        <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl  bg-purple-900  hover:bg-opacity-65 transition duration-700 justify-self-end'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                            </svg>

                            <p className='text-white text-lg'>ຫາວຽກ</p></div>

                        <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl  bg-purple-900  hover:bg-opacity-65 transition duration-700 justify-self-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>

                            <p className='text-white text-lg'>ຫາພະນັກງານ</p></div>

                        <div className='slide-in-elliptic-top-fwd w-40 h-30 p-5 rounded-2xl  bg-purple-900  hover:bg-opacity-65 transition duration-700 justify-self-start'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>

                            <p className='text-white text-lg'>ກ່ຽວກັບເວບໄຊ້</p></div>
                        <div></div>
                    </div>
                </center>
                <Footer />
            </div>
        </html>

    )
}

export default Welcome_Page