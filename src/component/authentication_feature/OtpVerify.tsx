import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';

export default function OTP({ isOpenOTP, setIsOpenOTP, setIsOpenLogIn, setLoading }: { isOpenOTP: boolean, setIsOpenOTP: Function, setIsOpenLogIn: Function, setLoading: Function }) {
    const [otpCode, setOtpCode] = useState('');
   
    const api = 'https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev';

    const handleOTPVerification = async (otp: string) => {
        try {
            setLoading(true); // Start loading spinner
            const response = await fetch(`${api}/verifyOTP`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp }),
            });

            if (response.ok) {
                console.log("OTP verification successful");
                setIsOpenOTP(false);
                setIsOpenLogIn(true);
            } else {
                console.log("Incorrect OTP");
            }
        } catch (error) {
            console.log("Network or other error occurred:", error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <>
            {isOpenOTP && (
                <Transition appear show={isOpenOTP} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={() => setIsOpenOTP(false)}>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="red-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-14 h-14 transition hover:scale-125 absolute top-0 right-0 hover:fill-red-700  " onClick={() => setIsOpenOTP(false)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 transition hover:scale-125 absolute top-4 left-4 " onClick={() => setIsOpenOTP(false)}>
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                        </svg>

                                        <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 text-center font-sans">
                                            OTP Verification
                                        </Dialog.Title>

                                        {/* OTP form */}
                                        <div className="mt-2 font-sans font-semibold">
                                            <input placeholder='Enter OTP' value={otpCode} type="number" autoComplete="one-time-code" required className="block h-12 w-full rounded-full border-0 p-4 py-1.5  text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" onChange={(e) => setOtpCode(e.target.value)} />
                                        </div>

                                        {/* OTP verification button */}
                                        <div className="mt-4 grid justify-items-center space-y-4">
                                            <button
                                                type="button"
                                                className="h-10 w-full max-w-80 inline-flex font-sans justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => handleOTPVerification(otpCode)}
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
