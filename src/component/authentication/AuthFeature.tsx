import React, { Fragment, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import HashLoader from 'react-spinners/HashLoader';
import Authcss from './AuthenticationCSS';
import axios from 'axios';

export default function AuthFeat() {
    const [isOpenLogIn, setIsOpenLogIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    const [isOpenOTP, setIsOpenOTP] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [companyName, setCompanyName] = useState(firstName);
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    // const api = 'https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev';
    const api = 'http://localhost:3001';

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, []);
    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${api}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password: password }),
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
    const saveRegister = async (email: string, password: string, firstName: string, lastName: string, role: string) => {
        try {
            if (role == "Jobseeker") {
                const response = await fetch(`${api}/register`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password, name: firstName + ' ' + lastName, role: role }),
                });
                if (response.ok) {
                    console.log("Registration successful!");
                    return true;
                } else {
                    console.log("Registration failed:", response.status);
                }
            }
            if (role == "Employer") {

                const response = await fetch(`${api}/register`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email, password: password, name: firstName, role: role }),
                });
                if (response.ok) {
                    console.log("Registration successful!");
                    return true;
                } else {
                    console.log("Registration failed:", response.status);
                }
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        }
    };
    const handleSignup = async (email: string) => {
        try {
            setLoading(true); // Start loading spinner
            console.log("show email exist:", email)
            const checkExist = await fetch(`${api}/existUser`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            if (checkExist.ok) {
                console.log("Check Exist account: email didn't exist");
                const reponseSignup = await fetch(`${api}/sendOTP`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: email }),
                });
                if (reponseSignup.ok) {
                    togglePopupOTP(email);
                } else {
                    console.log("Error sending OTP");
                }
            } else {
                console.log(`this email is already existed ${email}`);
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
                    await getCrediatial(emailLogin);
                    setIsOpenOTP(false);
                    setIsOpenSignUp(false);
                    setIsOpenLogIn(false);
                    clearInputs();
                    navigate('/Home'); // Navigate to dashboard if on the login page
                }
                if (isOpenSignUp) {
                    console.log('OTP condition signup is successful')
                    await saveRegister(emailSignup, passwordSignup, firstName, lastName, role);
                    await getCrediatial(emailSignup);
                    setIsOpenOTP(false);
                    setIsOpenSignUp(false);
                    setIsOpenLogIn(false);
                    clearInputs();
                    navigate('/Home');
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
    const getCrediatial = async (email: string) => {
        try {
            const userList = await axios.post(`${api}/getCreditial`, { email });
            if (userList.status === 200) {
                console.log(userList);
                const userIDLocal = userList.data.user.UserID;
                const EmailLocal = userList.data.user.Email;
                const RoleLocal = userList.data.user.Role;

                localStorage.setItem('UserID', JSON.stringify(userIDLocal));
                localStorage.setItem('Email', JSON.stringify(EmailLocal));
                localStorage.setItem('Role', JSON.stringify(RoleLocal));

                const response = await axios.get(`${api}/getID`, {
                    params: {
                        userID: userIDLocal,
                        role: RoleLocal
                    }
                });
                console.log(response.data)
                const getID = response.data.data;
                if (getID) {
                    localStorage.setItem('ID', JSON.stringify(getID));
                } else {
                    console.log("error set ID")
                }
            } else {
                console.log("Error erorr");
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
        setPasswordSignup('');
        setConfirmPassword('');
        setPasswordLogin('');
        setFirstName('');
        setLastName('');
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

    // show hide password
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [inputTypeCP, setInputTypeCP] = useState('password');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setInputType(showPassword ? 'password' : 'text');
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
        setInputTypeCP(showConfirmPassword ? 'password' : 'text');
    };

    const handleItemClick = (clickedRole: string) => {
        setRole(prevRole => {
            if (prevRole === clickedRole) {
                return '';
            } else {
                return clickedRole;
            }
        });
    };

    return (
        <>
            <div className='flex-none'>
                <button
                    type="button"
                    className="btn btn-outline btn-accent rounded-2xl w-28"
                    onClick={() => setIsOpenLogIn(true)}>
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
                                        <button className="btn btn-square btn-sm absolute top-0 right-0 m-3 hover:scale-125" onClick={closeLogin}>
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
                                                <label className={Authcss.labelInput}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                                    <input type="text" className="grow " placeholder="Example@email.com" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
                                                </label>
                                                <label className={Authcss.labelInput}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                                    </svg>
                                                    <input type={inputType} className="grow " placeholder="Password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
                                                    <kbd className="kbd kbd-sm cursor-pointer" onClick={togglePasswordVisibility}>
                                                        {showPassword ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 hover:scale-125">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 hover:scale-125">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        }
                                                    </kbd>
                                                </label>

                                                {/* Login button */}
                                                {!isLoading && (
                                                    <div className="mt-2 grid justify-items-center space-y-4">
                                                        <div className="card-actions justify-center mt-2 w-full ">
                                                            <button
                                                                className="btn btn-primary rounded-2xl btn-wide btn-info hover:text-white text-base "
                                                                onClick={() => handleLogin(emailLogin, passwordLogin)}>Sign In</button>
                                                        </div>
                                                        <div className='w-80 border-t-2 border-stone-400'></div>
                                                        <div className='card-actions justify-center mt-2 w-full '>
                                                            <button
                                                                className="btn btn-primary rounded-2xl btn-wide btn-error hover:text-white  text-base "
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
                                    <Dialog.Panel className=' w-full max-w-lg card w-200 bg-base-100 shadow-xl transition-all '>
                                        <button className="btn btn-square btn-sm absolute top-0 left-0 m-4 hover:scale-125" onClick={(backLogin)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 " onClick={(backLogin)}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                            </svg>                                        </button>
                                        <button className="btn btn-square btn-sm absolute top-0 right-0 m-4 hover:scale-125" onClick={() => setIsOpenSignUp(false)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
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

                                                <ul className="menu menu-horizontal bg-base-300 w-fit rounded-box self-center">
                                                    <li className={role === 'Jobseeker' ? 'active' : ''}>
                                                        <button onClick={() => handleItemClick('Jobseeker')} className="toggle-button ">
                                                            <span>Jobseeker</span>
                                                            {role === 'Jobseeker' && <span className="toggle-indicator">&#x2714;</span>}
                                                        </button>
                                                    </li>
                                                    <li className={role === 'Employer' ? 'active' : ''}>
                                                        <button onClick={() => handleItemClick('Employer')} className="toggle-button">
                                                            <span>Employer</span>
                                                            {role === 'Employer' && <span className="toggle-indicator">&#x2714;</span>}
                                                        </button>
                                                    </li>
                                                </ul>

                                                <p className='self-start mx-5'>Name</p>
                                                {role !== 'Employer' ? (
                                                    <div className="px-1 font-sans font-semibold grid grid-cols-2 space-x-2 mx-5">
                                                        <label className="input input-bordered rounded-2xl flex items-center gap-2 input-info">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                            <input type="text" className="grow" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                        </label>

                                                        <label className="input input-bordered rounded-2xl flex items-center gap-2 input-info">
                                                            <input type="text" className="grow" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                        </label>
                                                    </div>
                                                ) : (
                                                    <div className="px-1 font-sans font-semibold mx-5 ">
                                                        <label className="input input-bordered rounded-2xl flex items-center gap-2 input-info">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                                            <input type="text" className="grow" placeholder="Company Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                        </label>

                                                    </div>
                                                )}

                                                <p className='self-start mx-5'>Email</p>
                                                <label className="input input-bordered  rounded-2xl flex items-center gap-2 mx-5 mr-5  input-info">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                                    <input type="text" className="grow" placeholder="Example@email.com" value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)} />
                                                </label>


                                                <p className='self-start mx-5'>Password { }</p>
                                                <label className={Authcss.labelInput}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                                    </svg>
                                                    <input
                                                        type={inputType}
                                                        className="grow"
                                                        placeholder="Password"
                                                        value={passwordSignup}
                                                        onChange={(e) => {
                                                            setPasswordSignup(e.target.value);
                                                            setPasswordsMatch(e.target.value === confirmPassword);
                                                        }}
                                                    />
                                                    <kbd className="kbd kbd-sm cursor-pointer" onClick={togglePasswordVisibility}>
                                                        {showPassword ?
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 hover:scale-125">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                            </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 hover:scale-125">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        }
                                                    </kbd>
                                                </label>
                                                <label className={Authcss.labelInput}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 ">
                                                        <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" />
                                                    </svg>
                                                    <input
                                                        type={inputTypeCP}
                                                        className="grow"
                                                        placeholder="Confirm-password"
                                                        value={confirmPassword}
                                                        onChange={(e) => {
                                                            setConfirmPassword(e.target.value);
                                                            setPasswordsMatch(passwordSignup === e.target.value);
                                                        }}
                                                    />
                                                    <kbd className="kbd kbd-sm cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                                        {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 hover:scale-125">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        </svg>
                                                            :
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 hover:scale-125">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                            </svg>
                                                        }
                                                    </kbd>
                                                </label>
                                                {/* Display password match status */}
                                                {!passwordsMatch && <p className='text-red-500'>Passwords do not match!</p>}


                                                {!isLoading && (
                                                    <div className=" grid justify-items-center space-y-4 mt-2">
                                                        {/* <div className='w-80 border-t-2 border-stone-400'></div> */}
                                                        <div className='card-actions justify-center mt-2 w-full '>
                                                            <button className="btn btn-primary rounded-2xl btn-wide btn-error hover:text-white text-base disabled:btn-outline"
                                                                onClick={() => handleSignup(emailSignup)}
                                                                disabled={!passwordsMatch || !emailSignup || !passwordSignup || !firstName}>Register</button>
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
            {isOpenOTP && (
                <Transition appear show={isOpenOTP} as={Fragment} >
                    <Dialog as="div" className="relative z-10" onClose={(closeOtp)}>
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
                                        <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={closeSignup}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl">
                                            <h2 className='text-white'>Verify OTP</h2>
                                        </Dialog.Title>
                                        {isLoading ? (
                                            <div className="flex justify-center items-center mt-8 mb-8">
                                                <HashLoader color="#36d7b7" loading={isLoading} size={50} />
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center mt-5 font-sans font-semibold mx-16 ">
                                                <input ref={otpInputRefs[0]} className="input input-bordered input-accent w-16 text-center text-xl" type="text" maxLength={1} value={otp1} onChange={(e) => handleOtpInputChange(0, e.target.value)} />
                                                <input ref={otpInputRefs[1]} className="input input-bordered input-accent w-16 text-center text-xl" type="text" maxLength={1} value={otp2} onChange={(e) => handleOtpInputChange(1, e.target.value)} />
                                                <input ref={otpInputRefs[2]} className="input input-bordered input-accent w-16 text-center text-xl" type="text" maxLength={1} value={otp3} onChange={(e) => handleOtpInputChange(2, e.target.value)} />
                                                <input ref={otpInputRefs[3]} className="input input-bordered input-accent w-16 text-center text-xl" type="text" maxLength={1} value={otp4} onChange={(e) => handleOtpInputChange(3, e.target.value)} />
                                            </div>
                                        )}

                                        {/* Verify OTP button */}
                                        {!isLoading && (
                                            <div className=" grid justify-items-center space-y-4 mb-8 mt-4">
                                                <div className='card-actions justify-center mt-2 w-full '>
                                                    <button className="btn  btn-error rounded-2xl btn-wide  hover:text-white  text-base "
                                                        onClick={() => handleVerify(otpValue)} >Send</button>
                                                </div>
                                            </div>
                                        )}



                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition >
            )}
        </>
    );
}