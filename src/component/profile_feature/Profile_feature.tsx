import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate } from 'react-router-dom';
import cssProfile from './profile_css';
import { title } from 'process';
import { css } from '@emotion/react';

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
                                    <Dialog.Panel className="relative w-full max-w-screen-lg  transform  rounded-3xl bg-white  text-left align-middle shadow-xl transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            fill="red-500"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="white"
                                            className="w-11 h-11 transition hover:scale-125 absolute top-0 right-0 hover:fill-red-700 "
                                            onClick={closeProfile}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>

                                        {/* Container that include Top and content bottom */}
                                        <div className='w-full grid grid-rows-3 sm:grid-rows-4'>
                                            {/* top part */}
                                            <div className='w-full grid grid-cols-4'>
                                                <div className={cssProfile.profileImg}>
                                                    <img src='https://placehold.jp/125x125.png' className='rounded-full border-8 border-white-400 shadow-2xl ' />
                                                </div>
                                                <div className=' ml-8 pt-2.5 col-span-3 justify-items-start' >
                                                    <div className=''>
                                                        <p className={cssProfile.titleName}>George Bounthavong</p>
                                                        <p className={cssProfile.titleWork}> Developer and computer engineering</p>
                                                        <div className='flex '>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="red-500"
                                                                className="w-4 h-4 self-center">
                                                                <path fill-rule="evenodd" d=" m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                                            </svg>
                                                            <p className={cssProfile.titleAddress}>Ban Donenoun Xaythany, Vientiane, Laos</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* bottom part */}
                                            <div className=' row-span-3  rounded-b-3xl grid grid-cols-3 p-4 px-7 gap-4 bg-purple-500 md:grid-cols-1 2xl:bg-gray-300 xl:bg-blue-500 lg:bg-green-500 md:bg-red-500 sm:bg-gray-300 sm:grid-cols-1 sm:grid-rows-8 sm:justify-items-center xl:grid-rows-3 xl:grid-cols-3 xl:justify-items-start'>
                                                <div className='grid sm:grid-rows-1 sm:grid-cols-3 sm:gap-12 sm:pl-4 sm:h-fit sm:ml-auto sm:mt-1 sm:mx-2 xl:row-span-3 xl:grid-cols-1 xl:gap-5 xl:pl-4 xl:ml-0'>
                                                    {/* side or top content */}
                                                    <div className='flex gap-2 sm:text-sm sm:mx-auto '>
                                                        <div className='sm:self-center'>logo</div>
                                                        <div className='grid-rows-2'>
                                                            <p>Georgebounthavong@icloud.com</p>
                                                            <p>Georgebounthavong@icloud.com</p>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2 sm:text-sm sm:justify-self-end 2xl:justify-self-start'>
                                                        <div className='sm:self-center'>logo</div>
                                                        <div className='grid-rows-2 '>
                                                            <p>020 56591696</p>
                                                            <p>020 54146080</p>
                                                        </div>
                                                    </div>
                                                    <button className={cssProfile.buttonPostCv}>Post CV</button>
                                                </div>
                                                {/* popup description */}
                                                <div className='grid sm:row-span-3 sm:grid-rows-4 sm:w-4/5 xl:row-span-3 xl:grid-rows-6 xl:w-full'>
                                                    <div className='bg-black rounded-t-xl text-center mt-2 pt-1 xl:grid-rows-1 flex xl:items-stretch grid xl:justify-items-stretch'>
                                                        <p className={cssProfile.textPopupDes}>Description</p>
                                                    </div>
                                                    <div className='bg-white sm:row-span-3 xl:row-span-5 rounded-b-xl '></div>
                                                </div>
                                                {/* popup cv */}
                                                <div className='grid sm:row-span-3 sm:grid-rows-4 sm:w-4/5 xl:row-span-3 xl:grid-rows-6 xl:w-full'>
                                                    <div className='bg-black rounded-t-xl text-center mt-2 pt-1 xl:grid-rows-1 flex xl:items-stretch grid xl:justify-items-stretch'>
                                                        <p className={cssProfile.textPopupDes}>Post CV</p>
                                                    </div>
                                                    <div className='bg-white sm:row-span-3 xl:row-span-5 rounded-b-xl '></div>
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
{/* <div id='sidebar' className=' grid grid-rows-3'>
                                                    <div id='whatsapp' className='w-1/3 mt-5 grid grid-cols-2 flex justify-content-center '>
                                                        <div className=''>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-6 2xl:h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                            </svg>
                                                        </div>
                                                        <div className={cssProfile.telephone}>
                                                            <p>+8562056591696</p>
                                                            <p>+8562056591696</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id='description'></div>
                                                <div id='cv'></div> */}