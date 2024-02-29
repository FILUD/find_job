import React, { useEffect, useRef, useState } from 'react';
import './Authentication.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const Authentication = () => {
    const navigate = useNavigate();
    const [t, i18n] = useTranslation('global');
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    const [isOpenOTP, setIsOpenOTP] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    // toggle pop up 
    const togglePopupLogIn = () => {
        setIsOpenLogIn(!isOpenLogIn);
        setIsOpenSignUp(false); // Close the register form when opening Login form
    };
    const togglePopupSignUp = () => {
        setIsOpenSignUp(!isOpenSignUp);
        setIsOpenLogIn(false); // Close the Login form when opening register form
    };
    const togglePopupOTP = () => {
        setIsOpenOTP(!isOpenOTP);
    };

    //set value default = null 
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [otpverify, setOTPVerify] = useState('');
    //frontend handle

    const handleOutsideClick = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsOpenOTP(false);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation(); // Prevent the click from reaching the document click handler
        //togglePopupOTP();
    };


    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    // backend server handle
    const api = 'http://localhost/4000';
    // sign in
    const handleLogin = async () => {
        try {
            const reponse = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
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

    const handleSignup = async () => {
        try {
            const checkExist = await fetch(`${api}/existUser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailSignup }),
            });
            if (checkExist.ok) {
                console.log("Check Exist account: email didn't exist");
                const reponseSignup = await fetch(`${api}/sendOTP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: emailSignup }),
                });
                if (reponseSignup.ok) {
                    togglePopupOTP();
                } else {
                    console.log("Error send OTP ")
                }

            } else {
                console.log(`this email is already existed ${emailSignup}`);
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        }
    }

    const RegisterSQL = async (email: string) => {
        try {
            const response = await fetch(`${api}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: passwordSignup }),
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


    const handleVerify = async () => {
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




    // toggle pop-up login 
    return (
        <div>
          
            {/* <button className='button-sign-in'onClick={togglePopupSignUp}>Sign up</button> */}
            <button className='button-sign-in' onClick={togglePopupLogIn}>Sign in</button>
            {isOpenLogIn && (
                <div className="popup-sign-up">
                    
                    <div className="popup-content-sign-up">
                        
                        <img className='close-icon-sign-in' src='Icon/close.png' alt='Close' onClick={togglePopupLogIn}></img>
                        <p className='text-popup-sign-in'>Login</p>


                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Email</p>
                            <center>
                                <input className='input input-username-login' type="text" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
                            </center>
                        </div>

                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Password</p>
                            <center>
                                <input className='input input-password-login' type="password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
                            </center>
                        </div>

                        <p className='text-forgot-password'>Forgot Password ?</p>

                        <div className="other-login-with">
                            <p className="text-sign-in-with">
                                Sign In with :
                                <img className="icon-login-sign-in google-icon" src="Icon/google.png" alt="google" />
                                <img className="icon-login-sign-in facebook-icon" src="Icon/facebook.png" alt="facebook" />
                            </p>
                        </div>

                        <div className='footer-button-sign-login'>
                            <center>
                                <button className='button-sign-in-many sign-in' onClick={togglePopupSignUp}> Sign up</button>
                                <button className='button-sign-in-many login' onClick={handleLogin}>Login</button>
                            </center>
                        </div>
                    </div>
                </div>
            )}
            {isOpenSignUp && (
                <div className="popup-sign-up">
                    <div className="popup-content-sign-up">

                        <img className='close-icon-sign-in' src='Icon/close.png' alt='Close' onClick={togglePopupSignUp}></img>
                        <p className='text-popup-sign-in'>Register</p>


                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Email</p>
                            <center>
                                <input className='input input-username-login' type="text" value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)} />
                            </center>
                        </div>

                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Password</p>
                            <center>
                                <input className='input input-password-login' type="password" value={passwordSignup} onChange={(e) => setPasswordSignup(e.target.value)} />
                            </center>
                        </div>
                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Confirm password</p>
                            <center>
                                <input className='input input-password-login' type="text" />
                            </center>
                        </div>

                        <div className="other-login-with-sign-in">
                            <p className="text-sign-in-with">
                                Sign In with :
                                <img className="icon-login-sign-in google-icon" src="Icon/google.png" alt="google" />
                                <img className="icon-login-sign-in facebook-icon" src="Icon/facebook.png" alt="facebook" />
                            </p>
                        </div>

                        <div className='footer-button-sign-signup'>
                            <center>
                                <button className='button-sign-in-many sign-in' onClick={togglePopupLogIn}> Back</button>
                                <button className='button-sign-in-many login' onClick={handleSignup}>Sign up</button>
                            </center>
                        </div>
                    </div>
                </div>
            )}
            {isOpenOTP && (
                <div className="popup-sign-up">
                    <div className='popup-content-sign-up'>
                        {/* Your OTP verification UI */}
                        {/* Input field for OTP code */}
                        <input className="input input-otp" type="text" placeholder="Enter OTP" value={otpverify} onChange={(e) => setOTPVerify(e.target.value)} />
                        {/* Button to verify OTP */}
                        <button className="button-verify-otp" onClick={handleVerify}>
                            Verify OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default Authentication