import React, { useState } from 'react';
import './Authentication.css';
import { useTranslation } from 'react-i18next';

const Authentication = () => {
    const [t, i18n] = useTranslation('global');
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);

    const togglePopupLogIn = () => {
        setIsOpenLogIn(!isOpenLogIn);
        setIsOpenSignUp(false); // Close the Sign Up form when opening Sign In form
    };

    const togglePopupSignUp = () => {
        setIsOpenSignUp(!isOpenSignUp);
        setIsOpenLogIn(false); // Close the Sign In form when opening Sign Up form
    };

    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    // this one is log in and verify
    const handleLogin = async () => {
        try {
            const reponse = await fetch('https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailLogin ,password: passwordLogin}),
            });
            if(reponse.ok){
                console.log("login successful");
                const sendOTP = await fetch('https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev/sendOTP',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: emailLogin}),
                });
                if(sendOTP.ok){
                    console.log(" check your email for OTP verification");
                }else{
                    console.log("Error sendOTP");
                }
               
            } else {
                console.log("Error Login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // const handleLogin2 = async () => {
    //     try {
    //         const response = await fetch('https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev/sendOTP', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email: emailLogin }),
    //         });
    
    //         if (response.ok) {
    //             console.log("Login successful!");
    //         } else {
    //             console.log("Login failed:", response.status);
    //         }
    //     } catch (error) {
    //         console.log("Network or other error occurred:", error);
    //     }
    // };
    
        // const handleLogin1 = async () => {
        //     try {
        //         const response = await fetch('https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev/login', {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json",
        //             },
        //             body: JSON.stringify({ email: emailLogin, password: passwordLogin }),
        //         });
        
        //         if (response.ok) {
        //             const sendOTPResponse = await fetch('https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev/sendOTP', {
        //                 method: "POST",
        //                 credentials: "include",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                 },
        //                 body: JSON.stringify({ email: emailLogin }),
        //             });
        
        //             if (sendOTPResponse.ok) {
        //                 console.log("OTP sent successfully!"); // Handle successful OTP send
        //             } else {
        //                 console.log("Error in sending OTP:", sendOTPResponse.status); // Handle error in sending OTP
        //             }
        //         } else {
        //             console.log("Login failed:", response.status); // Handle login failure
        //         }
        //     } catch (error) {
        //         console.log("Network or other error occurred:", error); // Handle any network or other errors
        //     }
        // };
        
    const handleRegister = async () => {
        try {
            const response = await fetch('https://findjob--georgebounthavo.repl.co/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailSignup, password: passwordSignup }),
            });
    
            if (response.ok) {
                console.log("Registration successful!"); // Handle successful registration
            } else {
                console.log("Registration failed:", response.status); // Handle registration failure
            }
        } catch (error) {
            console.log("Network or other error occurred:", error); // Handle any network or other errors
        }
    };
    
    const handleVerify = async () => {
        try {
            const response = await fetch('https://findjob--georgebounthavo.repl.co/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailSignup, password: passwordSignup }),
            });
    
            if (response.ok) {
                console.log("Verification successful!"); // Handle successful verification
            } else {
                console.log("Verification failed:", response.status); // Handle verification failure
            }
        } catch (error) {
            console.log("Network or other error occurred:", error); // Handle any network or other errors
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
                                <button className='button-sign-in-many login' onClick={handleRegister}>Sign up</button>
                            </center>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Authentication