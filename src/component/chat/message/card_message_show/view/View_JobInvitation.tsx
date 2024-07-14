import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader';
import Swal from 'sweetalert2';
import { useTheme } from '../../../../../theme/theme';


interface Toggle {
    isOpen: boolean;
    isClose: () => void;
    data: CardProps;
    type: string;
    handleAccept: () => void;
    info: InfoProps
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


function View_JobInvitation({ isOpen, isClose, data, type, handleAccept, info }: Toggle) {
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
        <html className='font-notoLao'>
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
                                <Dialog.Panel className='w-fit max-w-fit card w-200 bg-base-100 shadow-xl transition-all' data-theme={theme}>
                                    {/* Close button */}
                                    <button className="btn btn-square btn-sm absolute top-0 right-0 m-3 " onClick={isClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    {/* Dialog title */}
                                    <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl flex-col">
                                        <h2 className='font-bold'>ເບິ່ງລາຍລະອຽດ </h2>
                                    </Dialog.Title>
                                    <div className=''>
                                        <div className='card card-side bg-base-300 shadow-xl m-4  w-fit' >
                                            <div className='lg:w-56 flex items-center bg-base-300 rounded-xl '>
                                                <a
                                                    href={data.IMG_Card}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex justify-center"
                                                    onClick={handleFullScreen}
                                                    data-original-url={data.IMG_Card}
                                                >
                                                    <figure>
                                                        <img id="fullScreenImage" src={data.IMG_Card} alt="Album" className="rounded-xl image-full " />
                                                    </figure>
                                                </a>
                                            </div>
                                            <div className="card-body">
                                                <h2 className="card-title self-center">ລາຍລະອຽດວຽກ</h2>
                                                <div className='text-sm text-start'>
                                                    <p>ຊື່ບໍລິສັດ : {info.Name} </p>
                                                    <div className='flex flex-row'>
                                                        <p >ອາຊີບ : {data.OccupationName}</p>
                                                        <div className="badge badge-primary">{data.WorkType}</div>
                                                    </div>
                                                    <p>ໝວດໝູ່ອາຊີບ : {data.CategoryName}</p>
                                                </div>
                                                <div className="stats bg-primary text-primary-content">
                                                    <div className="stat">
                                                        <div className="stat-title text-black">ເງິນເດືອນເລີ່ມຕົ້ນ</div>
                                                        <div className="stat-value">{data.SalaryStart}</div>
                                                    </div>

                                                    <div className="stat">
                                                        <div className="stat-title text-black">ເງິນເດືອນສູງສຸດ</div>
                                                        <div className="stat-value">{data.SalaryMax}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {type == "employer" ? (
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
                                                {data.Status == "Pending" ? (
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
                                                            <button className="btn btn-primary" onClick={handleAccept}>ຍອມຮັບຄຳເຊີນ</button>
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
                                                            <button className="btn btn-success disabled:btn-success">ຍອມຮັບແລ້ວ</button>
                                                            <button className="btn btn-outline" onClick={isClose}>ປິດ</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div >
                    </div >
                </Dialog >
            </Transition >
        </html >



    )
}


export default View_JobInvitation