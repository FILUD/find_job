import { Dialog, Transition } from '@headlessui/react';
import { select } from '@material-tailwind/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader';
import Swal from 'sweetalert2';


interface JobData {
    JobID: number;
    EmployerID: number;
    Post_IMG: string;
    Title: string;
    CompanyName: string;
    Employer_Profile_IMG: string;
    Description: string;
    SalaryStart: number;
    SalaryMax: number;
    CategoryName: string;
    OccupationName: string;
    PostDate: string;
    VillageName: string;
    DistrictName: string;
    ProvinceName: string;
    WorkType: string;
}

interface ToggleJobRequest {
    isOpen: boolean;
    isClose: () => void;
}

interface DataList {
    senderId: number | undefined;
    dataList: JobData;
}


function JobRequest({ isOpen, isClose, dataList, senderId }: ToggleJobRequest & DataList) {
    const [listCv, setListCv] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSendLoading, setIsSendLoading] = useState(false);
    const [selectedCV, setSelectedCV] = useState<number | null>(null);

    // show cv of jobseeker
    useEffect(() => {
        const fetchData = async (Id: number) => {
            setIsLoading(true)
            try {
                const response = await axios.post('http://localhost:3001/showCV', { jobseekerID: Id });
                if (response.data) {
                    const data = response.data.data;
                    setIsLoading(false);
                    setListCv(data);
                } else {
                    console.error('No CV details found for this jobseeker.');
                }
            } catch (error) {
                console.error('Error fetching CV detail:', error);
            }
        };
        if (senderId) {
            fetchData(senderId);
        }
    }, [senderId]);

    // // show cv of jobseeker
    // useEffect(() => {
    //     const fetchData = async (Id: number) => {
    //         setIsLoading(true)
    //         try {
    //             const response = await axios.post('http://localhost:3001/jobseeker', { jobseekerID: Id });
    //             if (response.data) {
    //                 const data = response.data.data;
    //                 setIsLoading(false);
    //                 setListCv(data);
    //             } else {
    //                 console.error('No CV details found for this jobseeker.');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching CV detail:', error);
    //         }
    //     };
    //     if (senderId) {
    //         fetchData(senderId);
    //     }
    // }, [senderId]);

    // send CV: Sending Job Request
    const sendCV = async () => {
        if (!selectedCV) {
            Swal.fire({
                icon: 'error',
                title: 'ຜິດພາດ',
                text: 'ກະລຸນາເລືອກ CV ຂອງທ່ານ.',
            });
            return;
        }
        console.log(selectedCV);
        setIsSendLoading(true);
        try {
            console.log("employer", dataList.JobID);
            // console.log("jobseeker", senderId);
            // console.log("cv", selectedCV);
            await axios.post('http://localhost:3001/sendCV', { jobseekerID: senderId, employerID: dataList.EmployerID, cvID: selectedCV, jobID: dataList.JobID });
            // If the request is successful, display a success message with SweetAlert

            Swal.fire({
                icon: 'success',
                title: 'ສຳເລັດ',
                text: 'ສົ່ງຄຳຂໍສະໝັກວຽກສຳເລັດ !',
            });
            isCloseToggle();

        } catch (error) {
            console.error('Error sending CV:', error);
        } finally {
            setIsSendLoading(false);
        }
    };

    const isCloseToggle = () => {
        setSelectedCV(null);
        isClose();
    };


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={isCloseToggle}>
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
                            <Dialog.Panel className='w-full max-w-xl card w-200 bg-base-100 shadow-xl transition-all'>
                                {/* Close button */}
                                <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={isCloseToggle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                {/* Dialog title */}
                                <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl flex-col">
                                    <h2 className='text-white'>ສົ່ງຄຳຂໍສະໝັກວຽກ</h2>
                                    {isLoading ? (
                                        <div></div>
                                    ) : (
                                        <p className='text-sm'>ກຳລັງສົ່ງຄຳຂໍສະໝັກວຽກຫາ : {dataList?.CompanyName} </p>
                                    )}
                                </Dialog.Title>

                                {/* Loading spinner */}
                                {isLoading ? (
                                    <div className="flex justify-center items-center mt-8 mb-8">
                                        <HashLoader color="#36d7b7" loading={isLoading} size={50} />
                                    </div>
                                ) : (
                                    <div className="flex flex-col w-full justify-center items-center mt-5 font-sans font-semibold p-2">
                                        {/* Sender and receiver avatars */}
                                        <div className='mb-2'>
                                            <div className='flex flex-row items-center space-x-4 '>
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full ">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                                    </svg>
                                                </div>
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full">
                                                        <img src={dataList.Employer_Profile_IMG != '' ? dataList.Employer_Profile_IMG : '/Icon/user.png'} alt="Jobseeker" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Job details */}
                                        <div className='w-full max-w-full m-4 '>
                                            <p className="badge badge-primary">ສົ່ງຫາ : {dataList?.CompanyName}</p>
                                            <div className="flex flex-col w-full justify-center">
                                                <p>ວຽກທີ່ກຳລັງຈະສະໝັກ : {dataList.OccupationName}</p>
                                                <p>ໝວດຫມູ່ອາຊີບ : {dataList.CategoryName}</p>
                                            </div>
                                        </div>

                                        {/* Select CV section */}
                                        <div className='w-full bg-base-300 rounded-xl'>
                                            <p className='py-4 w-full bg-black bg-opacity-45 rounded-t-xl'> ເລືອກ CV ຂອງທ່ານ</p>
                                            <div className="w-full justify-start px-5 flex flex-col overflow-auto pt-1 " style={{ maxHeight: "160px" }}>
                                                {listCv.slice(0, 10).map((cv: any) => (
                                                    <div key={cv.CvID}>
                                                        <div className=''>
                                                            <div className="form-control">
                                                                <label className="label cursor-pointer">
                                                                    <div className="w-full h-min flex flex-row items-center space-x-4">
                                                                        <input type="radio" name="radio-10" className="radio" onChange={() => setSelectedCV(cv.CvID)} />
                                                                        <div className="w-28 h-min">
                                                                            <img src={cv.IMG_CV} alt="" />
                                                                        </div>
                                                                        <div className="max-w-full w-full flex justify-start items-center space-x-4">
                                                                            <span className="label-text text-lg w-max">{cv.Title}</span>
                                                                        </div>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Send button */}
                                        {isLoading ? (
                                            <div></div>
                                        ) : (
                                            <div>
                                                {isSendLoading ? (
                                                    <div className=" grid justify-items-center space-y-4 my-4">
                                                        <div className='card-actions justify-center mt-2 w-full '>
                                                            <button className="btn  btn-error rounded-2xl btn-wide  hover:text-white  text-base " disabled>
                                                                ກຳລັງສົ່ງ
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className=" grid justify-items-center space-y-4 my-4">
                                                        <div className='card-actions justify-center mt-2 w-full '>
                                                            <button className="btn  btn-error rounded-2xl btn-wide  hover:text-white  text-base " onClick={sendCV}>
                                                                ສົ່ງຄຳຂໍ
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    </div>
                                )}

                            </Dialog.Panel>
                        </Transition.Child>
                    </div >
                </div >
            </Dialog >
        </Transition >
    )
}

export default JobRequest;
