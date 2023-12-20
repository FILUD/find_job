import React, { useState } from 'react'
import './Authentication.css'
import { useTranslation } from 'react-i18next';


const Authentication = () => {

    const [t, i18n] = useTranslation("global");
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

    // set email and password
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailLogin, passwordLogin }),
            });

            // Handle response accordingly
            const data = await response.json();
            console.log(data); // Log or further handle the response
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify({ emailSignup, passwordSignup });

            });
            console.log("Sign-up submitted:", emailSignup, passwordSignup);

            // // Handle response accordingly
            // const data = await response.json();
            // console.log(data); // Log or further handle the response
        } catch (error) {
            console.error(error);
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