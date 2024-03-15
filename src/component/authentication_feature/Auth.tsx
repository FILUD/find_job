import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate } from 'react-router-dom';

import Login from './Login';
import Signup from './Register';
import Otp from './OtpVerify';

export default function AuthFeat() {
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    const [isOpenOTP, setIsOpenOTP] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <div className='flex-none'>
                <button
                    type="button"
                    onClick={() => setIsOpenLogIn(true)}
                    className=" rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-sans text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >Sign In
                </button>
            </div>

            <Login isOpenLogIn={isOpenLogIn} setIsOpenLogIn={setIsOpenLogIn} setIsOpenSignUp={setIsOpenSignUp} setIsOpenOTP={setIsOpenOTP} setLoading={setLoading} />

            <Signup isOpenSignUp={isOpenSignUp} setIsOpenSignUp={setIsOpenSignUp} setIsOpenOTP={setIsOpenOTP} setLoading={setLoading} />

            <Otp isOpenOTP={isOpenOTP} setIsOpenOTP={setIsOpenOTP} setIsOpenLogIn={setIsOpenLogIn} setLoading={setLoading} />
        </>
    );
}
