import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import HashLoader from 'react-spinners/HashLoader';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    togglePopup: () => void;
    isLoading: boolean;
}
interface SignUpProps {
    email: string;
    password: string;
    setEmail: (value: React.SetStateAction<string>) => void;
    setPassword: (value: React.SetStateAction<string>) => void;
    handle: (requireEmail: string) => Promise<void>;
}

const formInputCss = "block h-12 w-full rounded-full border-0 p-4 py-1.5  text-gray-900 shadow-lg ring-2 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"

export default function SignupPopup({ isOpen, onClose, togglePopup, isLoading, email, password, setEmail, setPassword, handle }: Props & SignUpProps) {
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
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 text-center font-sans">
                                    Register
                                </Dialog.Title>

                                {/* input form here */}
                                {isLoading ? (
                                    <div className="flex justify-center items-center mt-8">
                                        <HashLoader color="#dc2626" loading={isLoading} size={50} />
                                    </div>
                                ) : (
                                    <div className="mt-2 font-sans font-semibold">
                                        <p className="text-base text-gray-500 font-sans font-semibold pt-5 pl-2"> </p>
                                        <div className="px-1 font-sans font-semibold grid grid-cols-2 space-x-2 mb-5">
                                            <input placeholder='Firstname' id="name" name="name" type="email" autoComplete="username" required className={formInputCss} />
                                            <input placeholder='Lastname' id="email" name="email" type="email" autoComplete="email" required className={formInputCss} />
                                        </div>
                                        <input placeholder='Email' value={email} type="email" autoComplete="Email" required className={formInputCss} onChange={(e) => setEmail(e.target.value)} />
                                        <br></br>
                                        <input placeholder='Password' value={password} type="password" autoComplete="current-password" required className={formInputCss} onChange={(e) => setPassword(e.target.value)} />

                                        <input placeholder='Confirm-Password'  type="password" autoComplete="current-password" required className={formInputCss} />

                                    </div>
                                )}

                                {/* button */}
                                {!isLoading && (
                                    <div className="mt-4 grid justify-items-center space-y-4">

                                        <button
                                            type="button"
                                            onClick={() => handle(email)}
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
        </Transition >
    );
}
