import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import HashLoader from 'react-spinners/HashLoader';

export default function AuthFeat() {
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    const [isOpenOTP, setIsOpenOTP] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [requireSignUpPass, setRequireSignUpPass] = useState('');
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const navigate = useNavigate();

    // show hide password
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [inputTypeCP, setInputTypeCP] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setInputType(showPassword ? 'password' : 'text');
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
        setInputTypeCP(showConfirmPassword ? 'password' : 'text');
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);

    const closeLogin = () => {
        // if (isOpenLogIn && isOpenOTP) {
        //     setIsOpenLogIn(true);
        // } else {
        //     setIsOpenLogIn(false);
        //     setIsOpenOTP(false);
        // }
        setIsOpenLogIn(false);
    };
    const goToSignUp = () => {
        setIsOpenLogIn(false);
        setIsOpenSignUp(true);
    }
    const closeSignup = () => {
        if (isOpenSignUp && isOpenOTP) {
            setIsOpenSignUp(true);
        } else {
            setIsOpenSignUp(false);
            setIsOpenOTP(false);
        }
    }

    return (
        <>
            <div className='flex-none'>
                <button
                    type="button"
                    onClick={() => setIsOpenLogIn(true)}
                    className="btn btn-outline btn-accent  "
                >
                    Sign In
                </button>
            </div>

            {isOpenLogIn && (
                <Transition appear show={isOpenLogIn} as={Fragment} >
                    <Dialog as="div" className="relative z-10" onClose={(closeLogin)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/75" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className=' w-full max-w-md card w-200 bg-base-100 shadow-xl transition-all '>
                                        <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={closeLogin}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl">
                                            <h2 className='text-white'>Sign in</h2>
                                        </Dialog.Title>
                                        {isLoading ? (
                                            <div className="flex justify-center items-center mt-8 mb-8">
                                                <HashLoader color="#36d7b7" loading={isLoading} size={50} />
                                            </div>
                                        ) : (
                                            <div className="card-body">
                                                <label className="input input-bordered rounded-2xl flex items-center gap-2 mx-5 input-accent">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                                    <input type="text" className="grow " placeholder="Email" />
                                                </label>
                                                <label className="input input-bordered rounded-2xl flex items-center gap-2 mx-5 input-accent">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                                    </svg>
                                                    <input type={inputType} className="grow " placeholder="Password" />
                                                    <kbd className="kbd kbd-sm cursor-pointer" onClick={togglePasswordVisibility}>
                                                        {showPassword ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        }
                                                    </kbd>
                                                </label>

                                                {/* Login button */}
                                                {!isLoading && (
                                                    <div className="mt-2 grid justify-items-center space-y-4">
                                                        <div className="card-actions justify-center mt-2 w-full ">
                                                            <button className="btn btn-primary rounded-2xl btn-wide btn-success hover:text-white text-base ">Sign In</button>
                                                        </div>
                                                        <div className='w-80 border-t-2 border-stone-400'></div>
                                                        <div className='card-actions justify-center mt-2 w-full '>
                                                            <button className="btn btn-primary rounded-2xl btn-wide btn-error hover:text-white  text-base "
                                                                onClick={goToSignUp}>Register</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>)}

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}

            {isOpenSignUp && (
                <Transition appear show={isOpenSignUp} as={Fragment} >
                    <Dialog as="div" className="relative z-10" onClose={(closeSignup)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/75" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className=' w-full max-w-xl card w-200 bg-base-100 shadow-xl transition-all '>
                                        <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={closeSignup}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl">
                                            <h2 className='text-white'>Register</h2>
                                        </Dialog.Title>
                                        {isLoading ? (
                                            <div className="flex justify-center items-center mt-8 mb-8">
                                                <HashLoader color="#36d7b7" loading={isLoading} size={50} />
                                            </div>
                                        ) : (
                                            <div className="card-body">

                                                <div className="px-1 font-sans font-semibold grid grid-cols-2 space-x-2 mb-5 mx-5 ">
                                                    <label className="input input-bordered rounded-2xl flex items-center gap-2 input-accent ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                        <input type="text" className="grow" placeholder="Firstname" />
                                                    </label>

                                                    <label className="input input-bordered rounded-2xl flex items-center gap-2  input-accent">
                                                        <input type="text" className="grow" placeholder="Lastname" />
                                                    </label>
                                                </div>
                                                {/* <label className="input input-bordered rounded-2xl flex items-center gap-2 mx-5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                    <input type="text" className="grow" placeholder="Username" />
                                                </label> */}


                                                <label className="input input-bordered  rounded-2xl flex items-center gap-2 mx-5 mr-5  input-accent">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                                    <input type="text" className="grow" placeholder="Email" />
                                                </label>


                                                <label className="input input-bordered rounded-2xl flex items-center gap-2 mx-5  input-accent ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                                    </svg>
                                                    <input type={inputType} className="grow" placeholder="Password" />
                                                    <kbd className="kbd kbd-sm cursor-pointer" onClick={togglePasswordVisibility}>
                                                        {showPassword ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        }
                                                    </kbd>
                                                </label>
                                                <label className="input input-bordered rounded-2xl flex items-center gap-2 mx-5 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                                    </svg>
                                                    <input type={inputTypeCP} className="grow" placeholder="Confirm-password" />
                                                    <kbd className="kbd kbd-sm cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                                        {showConfirmPassword ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        }
                                                    </kbd>
                                                </label>


                                                {!isLoading && (
                                                    <div className="mt-2 grid justify-items-center space-y-4">
                                                        <div className='w-80 border-t-2 border-stone-400'></div>
                                                        <div className='card-actions justify-center mt-2 w-full '>
                                                            <button className="btn btn-primary rounded-2xl btn-wide btn-error hover:text-white  text-base ">Register</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>)}

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </>
    );
}