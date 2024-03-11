import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate } from 'react-router-dom';

export default function Profile_feature() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [isOpenProfile, setIsOpenProfile] = useState(false);


    const api = 'https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev';

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    const toggleProfile = () => {
        setIsOpenProfile(true);
    }

    const closeProfile = () => {
        setIsOpenProfile(false);
    }

    return (
        <>
            <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 transition hover:scale-125 absolute top-0 right-0  "
                    onClick={() => setIsOpenProfile(true)}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </div>

            {isOpenProfile && (
                <Transition appear show={isOpenProfile} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={(closeProfile)}>
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
                            <div className="flex min-h-full items-center justify-center p-4 text-center ">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="relative w-full max-w-screen-xl transform  rounded-3xl bg-white  text-left align-middle shadow-xl transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="red-500"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="white"
                                            className="w-12 h-12 transition hover:scale-125 absolute top-0 right-0 hover:fill-red-700 "
                                            onClick={closeProfile}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                        {/* Container that include Top and content bottom */}
                                        <div className='w-full grid grid-rows-4'>
                                            {/* top part */}
                                            <div className='w-full grid grid-cols-4'>
                                                <div className=' 2xl:ml-32 lg:ml-28 md:ml-22 sm:ml-12 ml-8 top-0 left-0  scale-150   '>
                                                    <img src='https://placehold.jp/125x125.png' className='rounded-full border-8 border-white-400 shadow-2xl 2xl:w-40 2xl:h-40 xl:w-36 xl:h-36 lg:w-30 lg:h-30 lg:mt-6 md:h-26 md:w-26 md:mt-5 sm:h-26 sm:w-26 sm:mt-6 mt-8' />
                                                </div>
                                                <div className='ml-10 col-span-3 justify-items-start py-5 2xl:py-8 2xl:ml-24 xl:py-10 lg:py-8 lg:ml-15 md:ml-15 md:py-5 sm:ml-10 sm:py-5 ' >
                                                    <div className=''>
                                                        <p className='font-sans text-2xl font-bold my-2'>Job Co., Ltd.</p>
                                                        <p className='font-sans text-lg font-normal my-2'> Software Development Company </p>
                                                        <div className='flex '>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red-500" className="w-5 h-5 self-center">
                                                                <path fill-rule="evenodd" d=" m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                                            </svg>

                                                            <p className='font-sans text-sm ml-2'>Sykhai Sykhottabong, Vientiane, Laos</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* bottom part */}
                                            <div className='row-span-3 bg-gray-300 rounded-b-3xl grid grid-cols-3 p-2 px-7 gap-5'>
                                                <div id='sidebar' className='grid grid-rows-5 mt-8 mr-5 '>
                                                    <div id='whatsapp' className='w-1/3 mt-5 grid grid-cols-2 gap-4  flex justify-content-center'>
                                                        <div className='font-sans'>logo</div>
                                                        <div className='font-sans'>
                                                            <p>56591696</p>
                                                            <p>56591696</p>
                                                        </div>
                                                    </div>
                                                    {/* email */}
                                                    <div id='email' className='w-1/3 grid grid-cols-2 gap-4'>
                                                        <div className='font-sans'>logo</div>
                                                        <div className='font-sans'>
                                                            <p>georgebounthavong@icloud.com</p>
                                                            <p>georgewassup@icloud.com</p>
                                                        </div>
                                                    </div>
                                                    <div id='location' className=' row-span-3 mb-10 cursor-pointer'>
                                                        <img src='https://placehold.jp/250x100.png' className='border-8 border-white-400 shadow-2xl w-full h-full' />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="sm:text-md text-sm mb-5 flex justify-self-center w-fit rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-sans text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 "
                                                    >post work
                                                    </button>
                                                   
                                                  
                                                </div>

                                                {/* popup show job that need employees */}
                                                <div className=' col-span-2 grid grid-rows-7 my-5'>
                                                    {/* popup bottom bar */}
                                                    <div className='bg-black rounded-t-3xl flex items-stretch grid justify-items-stretch '>
                                                        <p className='text-white justify-self-center self-center font-sans text-xl font-semibold 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl'>Jobs that need employees</p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8 absolute mt-4 mr-10 right-0 cursor-pointer"
                                                            onClick={closeProfile}>
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                        </svg>


                                                    </div>
                                                    <div className='row-span-6 bg-white rounded-b-3xl'></div>
                                                </div>
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition >
            )
            }
        </>
    );
}
