import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect, useRef, SetStateAction, MutableRefObject } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate } from 'react-router-dom';

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

    const api = 'https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev';

    const cssInputOTP = 'block w-20 h-12 rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-xl sm:leading-6 text-center';

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true); // Start loading spinner
            const response = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log("Login successful");
                const sendOTP = await fetch(`${api}/sendOTP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                });

                if (sendOTP.ok) {
                    console.log("Check your email for OTP verification");
                    togglePopupOTP(email);
                } else {
                    console.log("Error sending OTP");
                }
            } else {
                console.log("Incorrect email or password");
            }
        } catch (error) {
            console.log("Error occurred:", error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };
    const saveRegister = async (requireSignUpEmail: string) => {
        try {
            const response = await fetch(`${api}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: requireSignUpEmail, password: requireSignUpPass }),
            });

            if (response.ok) {
                console.log("Registration successful!");
                return true;
            } else {
                console.log("Registration failed:", response.status);
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        }
    };
    const handleSignup = async (requireSignUpEmail: string) => {
        try {
            setLoading(true); // Start loading spinner
            const checkExist = await fetch(`${api}/existUser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: requireSignUpEmail }),
            });

            if (checkExist.ok) {
                console.log("Check Exist account: email didn't exist");
                const reponseSignup = await fetch(`${api}/sendOTP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: requireSignUpEmail }),
                });
                if (reponseSignup.ok) {
                    togglePopupOTP(requireSignUpEmail);
                } else {
                    console.log("Error sending OTP");
                }
            } else {
                console.log(`this email is already existed ${requireSignUpEmail}`);
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };
    const handleVerify = async (otpValue: string) => {
        try {
            const verifyResponse = await fetch(`${api}/verifyOTP`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: isOpenLogIn ? emailLogin : emailSignup, enteredOTP: otpValue }),
            });

            if (verifyResponse.ok) {
                console.log("Verification successful!");
                if (isOpenLogIn) {
                    console.log('login with vertication successful')
                    setIsOpenOTP(false);
                    setIsOpenSignUp(false);
                    setIsOpenLogIn(false);
                    clearInputs();
                    navigate('/dashboard'); // Navigate to dashboard if on the login page
                } else if (isOpenSignUp) {
                    console.log('condition signup ')
                    await saveRegister(emailSignup);
                    setIsOpenOTP(false);
                    setIsOpenSignUp(false);
                    setIsOpenLogIn(false);
                    clearInputs();
                    navigate('/About');
                    console.log('signup gonna save your data')
                    // Perform actions for signup page, such as saving registration data
                }
            } else {
                console.log("Verification failed:", verifyResponse.status);
            }
        } catch (error) {
            console.log("Error occurred:", error);
        }
    };


    const togglePopupOTP = (email: SetStateAction<string>) => {
        setEmailSignup(email);
        setIsOpenOTP(true);
    };
    const closeOtp = () => {
        setIsOpenOTP(false);
        clearInputs();
    };
    const closeLogin = () => {
        if (isOpenLogIn && isOpenOTP) {
            setIsOpenLogIn(true);
        } else {
            setIsOpenLogIn(false);
            setIsOpenOTP(false);
        }
    }
    const closeSignup = () => {
        if (isOpenSignUp && isOpenOTP) {
            setIsOpenSignUp(true);
        } else {
            setIsOpenSignUp(false);
            setIsOpenOTP(false);
        }
    }
    const backLogin = () => {
        setIsOpenLogIn(true);
        setIsOpenSignUp(false);
    }
    const goToSignUp = () => {
        setIsOpenLogIn(false);
        setIsOpenSignUp(true);
    }
    const clearInputs = () => {
        setOtp1('');
        setOtp2('');
        setOtp3('');
        setOtp4('');
        setEmailSignup('');
        setRequireSignUpPass('');
        setPasswordLogin('');
    };
    const otpInputRefs: MutableRefObject<HTMLInputElement | null>[] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ];
    useEffect(() => {
        if (isOpenOTP) {
            otpInputRefs[0]?.current?.focus();
        }
    }, [isOpenOTP]);
    const handleOtpInputChange = (index: number, value: string) => {
        const otpValues = [otp1, otp2, otp3, otp4];
        otpValues[index] = value;
        switch (index) {
            case 0:
                setOtp1(value);
                if (value.length === 1) {
                    otpInputRefs[1]?.current?.focus();
                }
                break;
            case 1:
                setOtp2(value);
                if (value.length === 1) {
                    otpInputRefs[2]?.current?.focus();
                }
                break;
            case 2:
                setOtp3(value);
                if (value.length === 1) {
                    otpInputRefs[3]?.current?.focus();
                }
                break;
            case 3:
                setOtp4(value);
                break;
            default:
                break;
        }
    };
    const otpValue = otp1 + otp2 + otp3 + otp4;


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

            {isOpenLogIn && (
                <Transition appear show={isOpenLogIn} as={Fragment}>
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="red-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10 transition hover:scale-125 absolute top-0 right-0 hover:fill-red-700 " onClick={() => setIsOpenLogIn(false)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 text-center font-sans">
                                            Sign in
                                        </Dialog.Title>

                                        {/* Login form */}
                                        {isLoading ? (
                                            <div className="flex justify-center items-center mt-8">
                                                <HashLoader color="#dc2626" loading={isLoading} size={50} />
                                            </div>
                                        ) : (
                                            <div className="mt-2 font-sans font-semibold">
                                                <input placeholder='Email or username' value={emailLogin} type="email" autoComplete="Email" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5 text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" onChange={(e) => setEmailLogin(e.target.value)} />
                                                <br />
                                                <input placeholder='Password' value={passwordLogin} type="password" autoComplete="current-password" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5 text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" onChange={(e) => setPasswordLogin(e.target.value)} />

                                            </div>
                                        )}

                                        {/* Login button */}
                                        {!isLoading && (
                                            <div className="mt-4 grid justify-items-center space-y-4">
                                                <button
                                                    type="button"
                                                    className="h-10 w-full max-w-80 inline-flex font-sans justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={() => handleLogin(emailLogin, passwordLogin)}
                                                // onClick={() => handleLogin(emailLogin)}
                                                >
                                                    Sign in
                                                </button>
                                                <div className='w-80 border-t-2 border-stone-400'></div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={(goToSignUp)}
                                                        className="rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-sans text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}

            {isOpenSignUp && (
                <Transition appear show={isOpenSignUp} as={Fragment}>
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="red-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-14 h-14 transition hover:scale-125 absolute top-0 right-0 hover:fill-red-700  " onClick={() => setIsOpenSignUp(false)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 transition hover:scale-125 absolute top-4 left-4 " onClick={(backLogin)}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>

                                        <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 text-center font-sans">
                                            Register
                                        </Dialog.Title>

                                        {/* Signup form */}
                                        {isLoading ? (
                                            <div className="flex justify-center items-center mt-8">
                                                <HashLoader color="#dc2626" loading={isLoading} size={50} />
                                            </div>
                                        ) : (
                                            <div className="mt-2 font-sans font-semibold">
                                                <div className="px-1 font-sans font-semibold grid grid-cols-2 space-x-2 mb-5">
                                                    <input placeholder='Firstname' id="name" name="name" type="text" autoComplete="given-name" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5  text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
                                                    <input placeholder='Lastname' id="lastname" name="lastname" type="text" autoComplete="family-name" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5  text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
                                                </div>
                                                <input placeholder='Email' value={emailSignup} type="email" autoComplete="email" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5  text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" onChange={(e) => setEmailSignup(e.target.value)} />
                                                <br />
                                                <input placeholder='Password' value={requireSignUpPass} type="password" autoComplete="new-password" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5  text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" onChange={(e) => setRequireSignUpPass(e.target.value)} />
                                                <br />
                                                <input placeholder='Confirm Password' type="password" autoComplete="new-password" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5  text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" />
                                            </div>
                                        )}

                                        {/* Signup button */}
                                        {!isLoading && (
                                            <div className="mt-4 grid justify-items-center space-y-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleSignup(emailSignup)}
                                                    className="rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-sans text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        )}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}

            {isOpenOTP && (
                <Transition appear show={isOpenOTP} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeOtp}>
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 text-center font-sans">
                                            OTP Verification
                                        </Dialog.Title>

                                        <div className="flex justify-between items-center mt-5 font-sans font-semibold ">
                                            <input ref={otpInputRefs[0]} className={cssInputOTP} type="text" maxLength={1} value={otp1} onChange={(e) => handleOtpInputChange(0, e.target.value)} />
                                            <input ref={otpInputRefs[1]} className={cssInputOTP} type="text" maxLength={1} value={otp2} onChange={(e) => handleOtpInputChange(1, e.target.value)} />
                                            <input ref={otpInputRefs[2]} className={cssInputOTP} type="text" maxLength={1} value={otp3} onChange={(e) => handleOtpInputChange(2, e.target.value)} />
                                            <input ref={otpInputRefs[3]} className={cssInputOTP} type="text" maxLength={1} value={otp4} onChange={(e) => handleOtpInputChange(3, e.target.value)} />
                                        </div>

                                        {/* Verify OTP button */}
                                        <div className="mt-4 grid justify-items-center space-y-4">
                                            <button
                                                type="button"
                                                onClick={() => handleVerify(otpValue)}
                                                className="rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-sans text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                            >
                                                Verify OTP
                                            </button>
                                        </div>
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
