import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader';
import Swal from 'sweetalert2';
import { useTheme } from '../../../../theme/theme';

interface Toggle {
    isOpen: boolean;
    isClose: () => void;
    data: CardProps;
    type: string;
    handleAccept: () => void;
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
    OccupationID: string;
}

function View_Card({ isOpen, isClose, data, type, handleAccept }: Toggle) {
    const { theme } = useTheme();

    const handleFullScreen = () => {
        const img = document.getElementById('fullScreenImage');
        if (img) {
            if (img.requestFullscreen) {
                img.requestFullscreen();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Your browser does not support full screen mode!',
                });
            }
        }
    };


    return (
        <html>
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
                                <Dialog.Panel className='w-full max-w-md  card w-200 bg-base-100 shadow-xl transition-all' data-theme={theme}>
                                    {/* Close button */}
                                    <button className="btn btn-square btn-sm absolute top-0 right-0 m-3 " onClick={isClose}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                    {/* Dialog title */}
                                    <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl flex-col">
                                        <h2 className='font-bold'>View </h2>
                                    </Dialog.Title>
                                    <div className=''>
                                        <div className='card card-side  shadow-xl bg-primary m-4' >
                                            <div className='card-body'>
                                                <figure className=''>
                                                    <a href={data.IMG_Card} target="_blank" rel="noopener noreferrer" onClick={handleFullScreen} className='flex justify-center'>
                                                        <img id="fullScreenImage" src={data.IMG_Card} data-original-url={data.IMG_Card} alt="Movie" className='rounded-xl h-96 ' />
                                                    </a>
                                                    {/* <img id="fullScreenImage" src={data.IMG_Card} alt="Movie" className='rounded-xl' /> */}
                                                </figure>
                                                <button className='btn btn-wide self-center hover:btn-outline' onClick={handleFullScreen}>Full screen</ button>
                                            </div>
                                        </div>
                                        {type == "jobseeker" ? (
                                            <div className='flex flex-row space-x-4 m-4 justify-end'>
                                                <button className='btn btn-outline' onClick={isClose}>Close</button>
                                            </div>
                                        ) : (
                                            <div>
                                                {data.Status == "Pending" ? (
                                                    <div className='flex flex-row space-x-4 m-4 justify-end'>
                                                        <button className='btn btn-primary' onClick={handleAccept}>Accept</ button>
                                                        <button className='btn btn-outline' onClick={isClose}>Close</button>
                                                    </div>
                                                ) : (
                                                    <div className='flex flex-row space-x-4 m-4 justify-end'>
                                                        <button className='btn btn-success disabled:btn-success'>Accepted</ button>
                                                        <button className='btn btn-outline' onClick={isClose}>Close</button>
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

export default View_Card