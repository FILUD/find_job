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


    // toggle pop-up login 
    return (
        <div>
            {/* <button className='button-sign-in'onClick={togglePopupSignUp}>Sign up</button> */}
            <button className='button-sign-in' onClick={togglePopupLogIn}>Sign in</button>
            {isOpenLogIn && (
                <div className="popup-sign-up">
                    <div className="popup-content-sign-up">

                        <img className='close-icon-sign-in' src='Icon/close.png' alt='Close' onClick={togglePopupLogIn}></img>
                        <p className='text-popup-sign-in'></p>


                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Email</p>
                            <center>
                                <input className='input input-username-login' type="text" />
                            </center>
                        </div>

                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Password</p>
                            <center>
                                <input className='input input-password-login' type="text" />
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
                                <button className='button-sign-in-many login'>Login</button>
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
                                <input className='input input-username-login' type="text" />
                            </center>
                        </div>

                        <div className='box-form-sign-in'>
                            <p className='text-top-input-sign-in'>Password</p>
                            <center>
                                <input className='input input-password-login' type="text" />
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
                                <button className='button-sign-in-many login'>Login</button>
                            </center>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Authentication