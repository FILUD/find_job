import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import BarLoader from 'react-spinners/BarLoader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cssProfile from './profile_css';
import { css } from '@emotion/react';

export default function Profile_feature() {
    const navigate = useNavigate();
    interface Jobseeker {
        JobseekerID: number;
        JobseekerName: string;
        UserID: number;
        ProfesionalTitle: string;
        Profile_IMG: {
            type: string;
            data: number[];
        };
        Description: string;
        AddressID: number;
        Tel: string;
        Email: string;
    }
    const [isLoading, setLoading] = useState(true);
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [Jobseeker, setJobseeker] = useState<Jobseeker[]>([]);
    const api = 'https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev';

    useEffect(() => {
        const fetchData = async () => {
            try {

                setTimeout(async () => {
                    const response = await axios.get('http://localhost:3001/userInfo', {
                        params: {
                            role: 'Jobseeker',
                            userID: '2'
                        }
                    });
                    setJobseeker(response.data.Jobseeker);
                    setLoading(false);
                }, 1500); // 2-second delay
            } catch (error) {
                console.error('Error fetching jobseeker:', error);
            }
        };
        fetchData();
    }, []);

    const toggleProfile = () => {
        setIsOpenProfile(true);
    }

    const closeProfile = () => {
        setIsOpenProfile(false);
    }

    // const handleTest = async (email: string) => {
    //     try {
    //         const response = await fetch(`http://localhost:3001/test`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email: role }),
    //         });
    //         if (response.ok) {
    //             // const fetchData = await response.json();
    //             console.log(`test successful!`);
    //         }
    //     }
    //     catch (error) {
    //         console.log("Error occurred:", error);
    //     }
    // }

    return (
        <>
            <div className=''>
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-12 h-12 transition hover:scale-125  top-0 right-0  "
                    onClick={() => setIsOpenProfile(true)}>
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
                            leaveTo="opacity-0">
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
                                    leaveTo="opacity-0 scale-95">
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
                                        <div className='w-full grid grid-rows-3 sm:grid-rows-4 xl:grid-rows-3'>
                                            {/* top part */}
                                            <div className='w-full grid grid-cols-4 sm:grid-cols-4 xs:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4'>
                                                <div className={cssProfile.profileImg}>
                                                    <img src='https://placehold.jp/125x125.png' className='rounded-full border-8 border-white-400 shadow-2xl ' />
                                                </div>
                                                <div className=' ml-8 pt-2.5 col-span-3 justify-items-start' >
                                                    <div className=''>

                                                        <p className={cssProfile.titleName}>
                                                            {isLoading ? <BarLoader color={"#5a5e5d"} loading={isLoading} width={600} height={6} className='mt-4' speedMultiplier={0.5} /> : Jobseeker[0]?.JobseekerName}
                                                        </p>
                                                        <p className={cssProfile.titleWork}>
                                                            {isLoading ? <BarLoader color={"#5a5e5d"} loading={isLoading} width={500} height={6} className='mt-5' speedMultiplier={0.5} /> : Jobseeker[0]?.ProfesionalTitle}
                                                        </p>
                                                        <div className='flex '>

                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="red-500"
                                                                className="w-4 h-4 self-end">
                                                                <path fillRule="evenodd" d=" m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                                                            </svg>
                                                            <p className={cssProfile.titleAddress}>{isLoading ? <BarLoader color={"#5a5e5d"} loading={isLoading} width={120} height={5} className='mt-5' speedMultiplier={1} /> : Jobseeker[0]?.AddressID}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* bottom part */}
                                            <div id='container_bottom' className=' row-span-3  rounded-b-3xl grid grid-cols-3 p-4 px-7 gap-4 md:grid-cols-1 sm:bg-gray-300 sm:grid-cols-1 sm:grid-rows-8 sm:justify-items-center xl:grid-rows-3 xl:grid-cols-3 xl:justify-items-start'>
                                                <div className='grid sm:grid-rows-1 sm:grid-cols-3 sm:gap-12 sm:pl-4 sm:h-fit sm:ml-auto sm:mt-1 sm:mx-2 xl:row-span-3 xl:grid-cols-1 xl:gap-5 xl:pl-4 xl:ml-0 xl:text-center xl:w-full'>
                                                    {/* side or top content */}
                                                    <div className='flex gap-2 sm:text-sm sm:mt-1 sm:justify-self-end 2xl:justify-self-start xl::justify-self-start lg:justify-self-start'>
                                                        <div className='mt-1'>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-4 h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-4 2xl:h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                            </svg>
                                                        </div>
                                                        <div className='grid-rows-2 '>
                                                            {isLoading ? (
                                                                <BarLoader color={"#5a5e5d"} loading={isLoading} width={140} height={5} className='mt-2' />
                                                            ) : (
                                                                Jobseeker.map((e) => (
                                                                    <p>{e.Email}</p>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-2 sm:text-sm sm:justify-self-end 2xl:justify-self-start xl::justify-self-start lg:justify-self-start'>
                                                        <div className=''>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-4 2xl:h-4">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                            </svg></div>
                                                        <div className='grid-rows-2 '>
                                                            {isLoading ? (
                                                                <BarLoader color={"#5a5e5d"} loading={isLoading} width={140} height={5} className='mt-2' />
                                                            ) : (
                                                                Jobseeker.map((e) => (
                                                                    <p>{e.Tel}</p>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                    <button className={cssProfile.buttonPostCv}>Post CV</button>
                                                </div>
                                                {/* popup description */}
                                                <div className='grid sm:row-span-3 sm:grid-rows-4 sm:w-4/5 xl:row-span-3 xl:grid-rows-5 xl:w-full '>
                                                    {/* TODO: complete the cv storage */}
                                                    <div className='bg-white sm:row-span-4 xl:row-span-5 rounded-b-xl  '>
                                                        <nav className='bg-gray-800 w-full py-1 text-center rounded-t-xl '>
                                                            <p className={cssProfile.textPopupDes}>Description</p>
                                                        </nav>
                                                        <p>{isLoading ? <BarLoader color={"#5a5e5d"} loading={isLoading} width={0} height={0} speedMultiplier={1} /> : Jobseeker[0]?.Description}</p>
                                                    </div>
                                                </div>
                                                {/* popup cv */}
                                                <div className='grid sm:row-span-3 sm:grid-rows-4 sm:w-4/5 xl:row-span-3 xl:grid-rows-5 xl:w-full '>
                                                    {/* TODO: complete the cv storage */}
                                                    <div className='bg-white sm:row-span-4 xl:row-span-5 rounded-b-xl  '>
                                                        <nav className='bg-gray-800 w-full py-1 text-center rounded-t-xl '>
                                                            <p className={cssProfile.textPopupDes}>Post CV</p>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
