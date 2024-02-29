import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import SignupPopup from './RegisterPopup';
import OtpPopup from './OtpPopup';

export default function Auth_feat() {
    //State value
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [otpverify, setOTPVerify] = useState('');
    //api 
    const api = 'http://localhost/4000';


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
                    togglePopupOTP();
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
                    togglePopupOTP();
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
                console.log("Registration successful!");
                return true;
            } else {
                console.log("Registration failed:", response.status);
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        }
    };


    const handleVerify = async (reqOtp: string) => {
        try {

            const verifyResponse = await fetch(`${api}/verifyOTP`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: isOpenLogIn ? emailLogin : emailSignup, enteredOTP: otpverify }),
            });
            if (verifyResponse.ok) {
                console.log('Verification successful!');
                const regis = isOpenSignUp ? true : false;
                if (regis == true) {
                    await RegisterSQL(emailSignup);
                }
                // return isOpenLogIn? await RegisterSQL(emailSignup): null;
            } else {
                console.log('Verification failed:', verifyResponse.status);
                return false;
            }

        } catch (error) {
            console.log('Error occurred while verifying OTP:', error);
            return false;
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
                <LoginPopup isOpen={isOpenLogIn} onClose={closeModal} togglePopup={togglePopupSignUp} isLoading={isLoading} email={emailLogin} password={passwordLogin} handle={handleLogin} setEmail={setEmailLogin} setPassword={setPasswordLogin} />
            )}
            {isOpenSignUp && (
                <SignupPopup isOpen={isOpenSignUp} onClose={closeModal} togglePopup={togglePopupOTP} isLoading={isLoading} email={emailSignup} password={passwordSignup} handle={handleSignup} setEmail={setEmailSignup} setPassword={setPasswordSignup} />
            )}
            {isOpenOTP && (
                <OtpPopup isOpen={isOpenOTP} onClose={closeModal} otpVerify={otpverify} togglePopup={togglePopupLogIn}/>
            )}
        </>
    );
}
