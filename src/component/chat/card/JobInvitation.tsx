import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import Swal from 'sweetalert2';

interface JobData {
    JobID: number;
    JobseekerID: number;
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

interface CVData {
    CvID: number;
    JobseekerID: number;
    IMG_CV: string;
    JobseekerName: string;
    Jobseeker_Profile_IMG: string;
    CategoryName: string;
    OccupationName: string;
    Title: string;
    UploadDate: string;
    VillageName: string;
    DistrictName: string;
    ProvinceName: string;
}

interface ToggleJobInvitation {
    isOpen: boolean;
    isClose: () => void;
}

interface DataList {
    employerID: number | undefined;
    dataList: CVData;
}

function JobInvitation({ isOpen, isClose, employerID, dataList }: DataList & ToggleJobInvitation) {
    const [selectedJob, setSelectedJob] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSendLoading, setIsSendLoading] = useState(false);
    const [listJob, setListJob] = useState<JobData[]>([]);

    const isCloseToggle = () => {
        setSelectedJob(null);
        isClose();
    };


    useEffect(() => {
        const fetchData = async (Id: number) => {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:3001/showJob', { employerID: Id });
                if (response.data) {
                    const data = response.data.data;
                    setListJob(data);
                } else {
                    console.error('No job details found for this employer.');
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (employerID) {
            fetchData(employerID);
        }
    }, [employerID]);


    // send Job: Sending Job Request
    const sendJob = async () => {
        if (!selectedJob) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a Job.',
            });
            return;
        }
        console.log(selectedJob);
        setIsSendLoading(true);
        try {
            console.log("employer", dataList.CvID);
            // console.log("jobseeker", senderId);
            // console.log("cv", selectedCV);
            await axios.post('http://localhost:3001/sendJob', { jobseekerID: dataList.JobseekerID, employerID: employerID, cvID: dataList.CvID, jobID: selectedJob });
            // If the request is successful, display a success message with SweetAlert

            Swal.fire({
                icon: 'success',
                title: 'Sending Job Invitation',
                text: 'Job Invitation sent successfully!',
            });
            isCloseToggle();

        } catch (error) {
            console.error('Error sending Job Invitation:', error);
        } finally {
            setIsSendLoading(false);
        }
    };


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={isCloseToggle}>
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
                            <Dialog.Panel className="w-full max-w-xl card w-200 bg-base-100 shadow-xl transition-all">
                                <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={isCloseToggle}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl flex-col">
                                    <h2 className="text-white">Send Job Request</h2>
                                    {isLoading ? (
                                        <div></div>
                                    ) : (
                                        <p className="text-sm">Sending request to {dataList?.JobseekerName}</p>
                                    )}
                                </Dialog.Title>

                                {isLoading ? (
                                    <div className="flex justify-center items-center mt-8 mb-8">
                                        <HashLoader color="#36d7b7" loading={isLoading} size={50} />
                                    </div>
                                ) : (
                                    <div className="flex flex-col w-full justify-center items-center mt-5 font-sans font-semibold p-2">
                                        <div className="mb-2">
                                            <div className="flex flex-row items-center space-x-4">
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full">
                                                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Employer" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                                    </svg>
                                                </div>
                                                <div className="avatar">
                                                    <div className="w-16 rounded-full">
                                                        <img src={dataList.Jobseeker_Profile_IMG != '' ? dataList.Jobseeker_Profile_IMG : '/Icon/user.png'} alt="Jobseeker" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full max-w-full m-4">
                                            <p className="badge badge-primary">Employer: {dataList?.JobseekerName}</p>
                                            <div className="flex flex-col w-full justify-center">
                                                <p>Job requirement: {dataList.OccupationName}</p>
                                                <p>Work category: {dataList.CategoryName}</p>
                                            </div>
                                        </div>

                                        <div className="w-full bg-base-300 rounded-xl">
                                            <p className="py-4 w-full bg-black bg-opacity-45 rounded-t-xl">Select your Job Invite</p>
                                            <div className="w-full justify-start px-5 flex flex-col overflow-auto pt-1" style={{ maxHeight: "160px" }}>
                                                {listJob.slice(0, 10).map((job: JobData) => (
                                                    <div key={job.JobID}>
                                                        <div className="form-control">
                                                            <label className="label cursor-pointer">
                                                                <div className="w-full h-min flex flex-row items-center space-x-4">
                                                                    <input type="radio" name="radio-10" className="radio" onChange={() => setSelectedJob(job.JobID)} />
                                                                    <div className="w-28 h-min">
                                                                        <img src={job.Post_IMG} alt="Job" />
                                                                    </div>
                                                                    <div className="max-w-full w-full flex justify-start items-center space-x-4">
                                                                        <span className="label-text text-lg w-max">{job.Title}</span>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {isLoading ? (
                                            <div></div>
                                        ) : (
                                            <div>
                                                {isSendLoading ? (
                                                    <div className="grid justify-items-center space-y-4 my-4">
                                                        <div className="card-actions justify-center mt-2 w-full">
                                                            <button className="btn btn-error rounded-2xl btn-wide hover:text-white text-base" disabled>
                                                                Sending
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="grid justify-items-center space-y-4 my-4">
                                                        <div className="card-actions justify-center mt-2 w-full">
                                                            <button className="btn btn-error rounded-2xl btn-wide hover:text-white text-base"
                                                                onClick={() => sendJob()}>
                                                                Send
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
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default JobInvitation;
