import React, { useState } from 'react'
import View_Card from './View_Card';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    Description: string,
    SalaryStart: string,
    SalaryMax: string,
    WorkType: string
}

interface DataProps {
    data: CardProps
    type: string
}

function Card_JobRequest({ data, type }: DataProps) {
    const [isOpenView, setIsOpenView] = useState(false);
    const toggleView = () => {
        setIsOpenView(true);
    }

    const closeToggleView = () => {
        setIsOpenView(false);
    }

    const handleAcceptJobRequest = async () => {
        try {
            await axios.post('http://localhost:3001/acceptJobRequest', { requestID: data.CardID });
            Swal.fire({
                icon: 'success',
                title: 'Job Request',
                text: 'Accepted Job Request!',
            });
            // isCloseToggle();
        } catch (error) {
            console.error('Error accept job request:', error);
        }
        // finally {
        //     // setIsSendLoading(false);
        // }
    };


    return (

        <div className='card max-w-96  w-full bg-primary text-info-content glass '>

            <figure><img src="/Logo/resume logo.jpg" alt="cv or resume" className='' /></figure>
            {type == "jobseeker" ? (
                < div className="card-body">
                    <h2 className="card-title justify-center">Job Request</h2>
                    {data.Status == "Pending" ? (
                        <p className='self-center'>Please waiting employer to accept... </p>
                    ) : (
                        <p className='self-center'>the resume or cv was accepted </p>
                    )}
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline ' onClick={() => toggleView()}>View CV</button>
                                <button className='btn '>{data.Status}...</button>
                            </div>
                        ) : (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>View CV</button>
                                <button className='btn hover:btn-success btn-success'>Accepted</button>
                            </div>
                        )}
                    </div>

                </div>
            ) : (
                // TODO : Complete  for employer
                < div className="card-body">
                    <h2 className="card-title justify-center">Job Request</h2>
                    {data.Status == "Pending" ? (
                        <p className='self-center'>Do you want to accept this job request? </p>
                    ) : (
                        <p className='self-center'>You are already accepted </p>
                    )}
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>View CV</button>
                                <button className='btn hover:btn-outline' onClick={() => handleAcceptJobRequest()}>Accept</button>
                            </div>
                        ) : (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>View CV</button>
                                <button className='btn hover:btn-success btn-success'>Accepted</button>
                            </div>
                        )}
                    </div>

                </div>
            )
            }

            {/* view card */}
            {
                isOpenView && (
                    <View_Card isOpen={isOpenView} isClose={closeToggleView} data={data} type={type} handleAccept={handleAcceptJobRequest} />
                )
            }
        </div >


    )
}

export default Card_JobRequest