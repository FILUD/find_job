import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Swal from 'sweetalert2';
import { useTheme } from '../../../../../theme/theme';

interface Toggle {
    isOpen: boolean;
    isClose: () => void;
    data: CardProps;
    type: string;
    info: InfoProps
    handleAccept: () => void;
}

interface InfoProps {
    ID: number;
    UserID: number;
    Name: string;
    Title: string;
    AddressID: number;
    Tel: string;
    Profile_IMG: string;
    VillageName: string;
    DistrictName: string;
    ProvinceName: string,
    Email: string,
    Role: string
}

interface CardProps {
    CardID: number;
    JobseekerID: number;
    EmployerID: number;
    JobID: number;
    ID: number;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
    IMG_Card: string;
    Title: string;
    OccupationID: number;
    Description: string,
    SalaryStart: number,
    SalaryMax: number,
    WorkType: string,
    OccupationName: string,
    CategoryName: string,
}

function View_JobRequest({ isOpen, isClose, data, type, info, handleAccept }: Toggle) {
    const { theme } = useTheme();
    const [fullscreenOpen, setFullscreenOpen] = useState(false);

    const handleFullScreen = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const originalUrl = event.currentTarget.getAttribute('data-original-url');
        const img = document.createElement('img');
        img.src = originalUrl || '';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        const fullscreenDiv = document.createElement('div');
        fullscreenDiv.id = 'fullscreenImageContainer'; // Set an ID for easy reference
        fullscreenDiv.style.position = 'fixed';
        fullscreenDiv.style.top = '0';
        fullscreenDiv.style.left = '0';
        fullscreenDiv.style.width = '100%';
        fullscreenDiv.style.height = '100%';
        fullscreenDiv.style.backgroundColor = 'black';
        fullscreenDiv.style.display = 'flex';
        fullscreenDiv.style.alignItems = 'center';
        fullscreenDiv.style.justifyContent = 'center';
        fullscreenDiv.style.zIndex = '9999';
        fullscreenDiv.appendChild(img);
        document.body.appendChild(fullscreenDiv);
        setFullscreenOpen(true);

        const closeFullscreen = () => {
            document.body.removeChild(fullscreenDiv);
            document.removeEventListener('keydown', handleKeyDown);
            setFullscreenOpen(false);
        };

        fullscreenDiv.addEventListener('click', closeFullscreen);

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeFullscreen();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={isClose}>
                {/* Dialog background */}
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

                <div className="fixed inset-0 overflow-y-auto font-notoLao">
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
                            <Dialog.Panel className="w-fit max-w-fit card w-200 bg-base-100 shadow-xl transition-all" data-theme={theme}>
                                {/* Close button */}
                                <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={isClose} >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                {/* Dialog title */}
                                <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl flex-col">
                                    <h2 className="font-bold">View</h2>
                                </Dialog.Title>
                                <div>
                                    <div className="card card-side bg-base-300 shadow-xl m-4 w-fit">
                                        <div className="lg:w-56 flex items-center bg-base-300 rounded-xl">
                                            <a
                                                href={data.IMG_Card}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex justify-center"
                                                onClick={handleFullScreen}
                                                data-original-url={data.IMG_Card}
                                            >
                                                <figure>
                                                    <img id="fullScreenImage" src={data.IMG_Card} alt="Album" className="rounded-xl image-full" />
                                                </figure>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h2 className="card-title self-center">Details</h2>
                                            <div className="text-sm text-start ">
                                                <table className="table-auto w-full">
                                                    <tbody>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">ຊື່ຜູ້ຊອກວຽກ</td>
                                                            <td className="border px-4 py-2">{info.Name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">ອາຊີບ</td>
                                                            <td className="border px-4 py-2">{data.OccupationName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">ໝວດໝູ່ອາຊີບ</td>
                                                            <td className="border px-4 py-2">{data.CategoryName}</td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td className="border px-4 py-2 font-bold">Tel</td>
                                                            <td className="border px-4 py-2">{info.Tel}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2 font-bold">Email</td>
                                                            <td className="border px-4 py-2">{info.Email}</td>
                                                        </tr> */}

                                                    </tbody>
                                                </table>
                                                <div className="stats stats-vertical shadow mt-4 bg-primary ">
                                                    <div className="stat">
                                                        <div className="stat-title font-semibold text-base-100 flex items-center space-x-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                                                            </svg>
                                                            <p > {info.Email}</p>

                                                        </div>
                                                    </div>

                                                    <div className="stat">
                                                        <div className="stat-title font-semibold text-base-100 flex items-center space-x-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                            </svg>

                                                            <p > {info.Tel}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {type === "jobseeker" ? (
                                        <div className="flex flex-row m-4">
                                            <div className="flex justify-start flex-1">
                                                <a href="#"
                                                    className='justify-self-start btn w-44 mx-6 btn-outline'
                                                    onClick={handleFullScreen}
                                                    data-original-url={data.IMG_Card}
                                                >
                                                    ເຕັມໜ້າຈໍ
                                                </a>
                                            </div>
                                            <div className="flex justify-end flex-1 space-x-4">
                                                <button className="btn btn-outline" onClick={isClose}>ປິດ</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {data.Status === "Pending" ? (
                                                <div className="flex flex-row m-4">
                                                    <div className="flex justify-start flex-1">
                                                        <a href="#"
                                                            className='justify-self-start btn w-44 mx-6 btn-outline'
                                                            onClick={handleFullScreen}
                                                            data-original-url={data.IMG_Card}
                                                        >
                                                            ເຕັມໜ້າຈໍ
                                                        </a>
                                                    </div>
                                                    <div className="flex justify-end flex-1 space-x-4">
                                                        <button className="btn btn-primary" onClick={handleAccept}>ຍອມຮັບ</button>
                                                        <button className="btn btn-outline" onClick={isClose}>ປິດ</button>
                                                    </div>
                                                </div>

                                            ) : (
                                                <div className="flex flex-row m-4">
                                                    <a
                                                        href="#"
                                                        className='justify-self-start btn w-44 mx-6 btn-outline'
                                                        onClick={handleFullScreen}
                                                        data-original-url={data.IMG_Card}
                                                    >
                                                        ເຕັມໜ້າຈໍ
                                                    </a>
                                                    <div className="flex justify-end flex-1 space-x-4">
                                                        <button className="btn btn-success disabled:btn-success">ຍອມຮັບຄຳຂໍແລ້ວ</button>
                                                        <button className="btn btn-outline" onClick={isClose}>ປິດ</button>
                                                    </div>
                                                </div>

                                            )}
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default View_JobRequest;
