import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import SignupPopup from './RegisterPopup';
import OtpPopup from './OtpPopup';

export default function Auth_feat() {
    // Open and Close Popup
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    const [isOpenOTP, setIsOpenOTP] = useState(false);
    // Loading spinner
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 2500);
        // return () => clearTimeout(timeoutId);
    }, []);
    

    // Navigate
    const navigate = useNavigate();
    // Languages
    const [t, i18n] = useTranslation('global');


    const togglePopupLogIn = () => {
        setIsOpenLogIn(!isOpenLogIn);
        setIsOpenSignUp(false);
        setIsOpenOTP(false);
    };

    const togglePopupSignUp = () => {
        setIsOpenSignUp(!isOpenSignUp);
        setIsOpenLogIn(false);
        setIsOpenOTP(false);
    };
    const togglePopupOTP = () => {
        setIsOpenOTP(!isOpenOTP);
        setIsOpenLogIn(false);
        setIsOpenSignUp(false); 
    };

    function closeModal() {
        setIsOpenLogIn(false);
        setIsOpenSignUp(false);
        setIsOpenOTP(false);
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={togglePopupLogIn}
                    className="rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-sans text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    Sign In
                </button>
            </div>
            

            {isOpenLogIn && (
                <LoginPopup isOpen={isOpenLogIn} onClose={closeModal} togglePopup={togglePopupSignUp} isLoading={isLoading}/>
            )}
            {isOpenSignUp && (
                <SignupPopup isOpen={isOpenSignUp} onClose={closeModal} togglePopup={togglePopupOTP} isLoading = {isLoading}/>
            )}
            {isOpenOTP && (
                <OtpPopup isOpen={isOpenOTP} onClose={closeModal} togglePopup={togglePopupLogIn} />
            )}
        </>
    );
}
