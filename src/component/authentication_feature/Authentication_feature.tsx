import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import SignupPopup from './RegisterPopup';
import OtpPopup from './OtpPopup';
import HashLoader from 'react-spinners/HashLoader';

export default function Auth_feat() {
    //State value
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [otpverify, setOTPVerify] = useState('');
    //api 
    const api = 'https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev';
    // CSS style
    const cssInputOTP = 'block w-20 h-12 rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6 text-center';
    //login 
    const handleLogin = async (requireEmail: string, requirePass: string) => {
        try {
            const reponse = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: requireEmail, password: requirePass }),
            });
            if (reponse.ok) {
                console.log("login successful");

                const sendOTP = await fetch(`${api}/sendOTP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: emailLogin }),
                });

                if (sendOTP.ok) {
                    console.log(" check your email for OTP verification");
                    togglePopupOTP(requireEmail);
                } else {
                    console.log("Error sendOTP");
                }

            } else {
                console.log(" check your email or password again");
            }
        } catch (error) {
            console.log(error);
        }
    }
    // register
    const handleSignup = async (reqEmail: string) => {
        try {
            const checkExist = await fetch(`${api}/existUser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: reqEmail }),
            });
            if (checkExist.ok) {
                console.log("Check Exist account: email didn't exist");
                const reponseSignup = await fetch(`${api}/sendOTP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: reqEmail }),
                });
                if (reponseSignup.ok) {
                    togglePopupOTP(reqEmail);
                } else {
                    console.log("Error send OTP ")
                }

            } else {
                console.log(`this email is already existed ${reqEmail}`);
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        }
    }
    const RegisterSQL = async (reqEmail: string) => {
        try {
            const response = await fetch(`${api}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: reqEmail, password: passwordSignup }),
            });

            if (response.ok) {
                togglePopupLogIn();
                console.log("Registration successful!");
                return true;
            } else {
                console.log("Registration failed:", response.status);
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        }
    };
    //otp
    const handleVerify = async (requireOtp: string): Promise<void> => {
        try {
            const verifyResponse = await fetch(`${api}/verifyOTP`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: isOpenLogIn ? emailLogin : emailSignup, enteredOTP: requireOtp }),
            });
            if (verifyResponse.ok) {
                setValueState();
                togglePopupLogIn();
                console.log('Verification successful!');
                const regis = isOpenSignUp ? true : false;
                if (regis == true) {
                    await RegisterSQL(emailSignup);
                    setValueState();
                }
                // No need to return anything here
            } else {
                console.log('Verification failed:', verifyResponse.status);
                // Handle the failure case, possibly throw an error or return early
            }
        } catch (error) {
            console.log('Error occurred while verifying OTP:', error);
            // Handle the error, possibly throw an error or return early
        }
    };

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
    }, []);

    // Navigate
    const navigate = useNavigate();
    // Languages
    const [t, i18n] = useTranslation('global');
    //Open and Close
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
    const togglePopupOTP = (email: string) => {
        setIsOpenOTP(!isOpenOTP);
        setIsOpenLogIn(false);
        setIsOpenSignUp(false);
        setEmailSignup(email);
    };
    function closeModal() {
        setIsOpenLogIn(false);
        setIsOpenSignUp(false);
        setIsOpenOTP(false);
        setValueState(); //reset value
    }
    //delete value
    function setValueState() {
        setOTPVerify('');
        setOtp1('');
        setOtp2('');
        setOtp3('');
        setOtp4('');
        setEmailSignup('');
        setPasswordSignup('');
        setPasswordLogin('');
    }

    // Splitting the single OTP string into individual digits
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');

    // Concatenate otp1, otp2, otp3, and otp4 into a single string
    const otpValue = otp1 + otp2 + otp3 + otp4;

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
                <LoginPopup isOpen={isOpenLogIn}
                 onClose={closeModal} 
                 togglePopup={togglePopupSignUp}
                 isLoading={isLoading} 
                 email={emailLogin} 
                 password={passwordLogin} 
                 handle={handleLogin} 
                 setEmail={setEmailLogin} 
                 setPassword={setPasswordLogin} />
            )}
            {isOpenSignUp && (
                <SignupPopup 
                isOpen={isOpenSignUp} 
                onClose={closeModal} 
                togglePopup={togglePopupLogIn} 
                isLoading={isLoading} 
                email={emailSignup} 
                password={passwordSignup} 
                handle={handleSignup} 
                setEmail={setEmailSignup} 
                setPassword={setPasswordSignup} />
            )}
            {isOpenOTP && (
                <Transition appear show={isOpenOTP} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="red-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10 transition hover:scale-125 absolute top-0 right-0 hover:fill-red-700 " onClick={closeModal}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl font-bold leading-6 text-gray-900 text-center font-sans"
                                        >
                                            Enter OTP
                                        </Dialog.Title>
                                        <div className="flex justify-center mt-2 px-3 font-sans font-semibold grid grid-cols-4 text-center">

                                            <input
                                                placeholder=""
                                                value={otp1}
                                                onChange={(e) => setOtp1(e.target.value)}
                                                type="text"
                                                maxLength={1}
                                                autoComplete="off"
                                                required
                                                className={cssInputOTP}
                                            />
                                            <input
                                                placeholder=""
                                                value={otp2}
                                                onChange={(e) => setOtp2(e.target.value)}
                                                type="text"
                                                maxLength={1}
                                                autoComplete="off"
                                                required
                                                className={cssInputOTP}
                                            />
                                            <input
                                                placeholder=""
                                                value={otp3}
                                                onChange={(e) => setOtp3(e.target.value)}
                                                type="text"
                                                maxLength={1}
                                                autoComplete="off"
                                                required
                                                className={cssInputOTP}
                                            />
                                            <input
                                                placeholder=""
                                                value={otp4}
                                                onChange={(e) => setOtp4(e.target.value)}
                                                type="text"
                                                maxLength={1}
                                                autoComplete="off"
                                                required
                                                className={cssInputOTP}
                                            />
                                        </div>


                                        <div className="mt-4 grid justify-items-center space-y-4 ">
                                            {/* Button */}
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleVerify(otpValue)}
                                                    className="rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-sans text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                                                >
                                                    {isLoading ? (
                                                        <HashLoader color="#ffffff" loading={isLoading} size={30} />
                                                    ) : (
                                                        'Send'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )}
            {/* {isOpenOTP && (
                <OtpPopup isOpen={isOpenOTP} onClose={closeModal} togglePopup={togglePopupLogIn} handle={handleVerify} otp={otpverify} setotp={setOTPVerify} />
            )} */}
        </>
    );
}
