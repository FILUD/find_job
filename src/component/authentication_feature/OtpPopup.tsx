import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    togglePopup: () => void;
}
interface OtpProps {
    otp: string;
    setotp: (value: React.SetStateAction<string>) => void;
    handle: (requireOtp: string) => Promise<void>; // Update return type
}

export default function OtpPopup({ isOpen, onClose, togglePopup, handle, otp, setotp }: Props & OtpProps) {
    // CSS style
    const cssInputOTP = 'block w-20 h-12 rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6 text-center';

    // Loading state
    const [isLoading, setLoading] = useState(false);

    // Handle sending OTP
    const handleSendOTP = () => {
        setLoading(true);
        setTimeout(() => {
            // Your logic for sending OTP
            setLoading(false); // Example: set loading to false after some time
        }, 3000);
    };

    // Splitting the single OTP string into individual digits
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');

    // Concatenate otp1, otp2, otp3, and otp4 into a single string
    const otpValue = otp1 + otp2 + otp3 + otp4;


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                                <svg xmlns="http://www.w3.org/2000/svg" fill="red-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10 transition hover:scale-125 absolute top-0 right-0 hover:fill-red-700 " onClick={onClose}>
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
                                        value={otp}
                                        onChange={(e) => setotp(e.target.value)}
                                        type="text"
                                        maxLength={4}
                                        autoComplete="off"
                                        required
                                        className={cssInputOTP}
                                    />
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
                                            onClick={() => handle(otp)}
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
    );
}
