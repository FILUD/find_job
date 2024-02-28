import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import SignupPopup from './RegisterPopup';


export default function Auth_feat() {
    //Open and Close Popup
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    //Loading spinner 
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(false)
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    })

    //Navigate
    const navigate = useNavigate();
    //Languages
    const [t, i18n] = useTranslation('global');


    const togglePopupLogIn = () => {
        setIsOpenLogIn(!isOpenLogIn);
        setIsOpenSignUp(false); // Close the signup form when opening login form
    };

    const togglePopupSignUp = () => {
        setIsOpenSignUp(!isOpenSignUp);
        setIsOpenLogIn(false); // Close the login form when opening signup form
    };

    function closeModal() {
        setIsOpenLogIn(false);
        setIsOpenSignUp(false);
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
                <LoginPopup isOpen={isOpenLogIn} onClose={closeModal} togglePopup={togglePopupSignUp} />
            )}
            {isOpenSignUp && (
                <SignupPopup isOpen={isOpenSignUp} onClose={closeModal} togglePopup={togglePopupLogIn} />
            )}

        </>
    );
}
