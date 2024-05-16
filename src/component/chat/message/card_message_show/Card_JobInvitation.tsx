import React, { useState } from 'react'
import View_JobInvitation from './view/View_JobInvitation';
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
    OccupationID: number;
    Description: string,
    SalaryStart: number,
    SalaryMax: number,
    WorkType: string,
    OccupationName: string,
    CategoryName: string,
}

interface DataProps {
    data: CardProps
    type: string
}

function Card_JobInvitation({ data, type }: DataProps) {
    const [isOpenView, setIsOpenView] = useState(false);
    const toggleView = () => {
        setIsOpenView(true);
    }

    const closeToggleView = () => {
        setIsOpenView(false);
    }

    const handleAcceptJobInvitation = async () => {
        try {
            // await axios.post('http://localhost:3001/acceptJobRequest', { requestID: data.CardID });
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

            <figure><img src="/Logo/Career logo.jpg" alt="cv or resume" className='' /></figure>
            {type == "employer" ? (
                < div className="card-body">
                    <h2 className="card-title justify-center">Job Invitation</h2>
                    {data.Status == "Pending" ? (
                        <div>
                            <p className='self-center text-center'>Please waiting jobseeker to join </p>
                            <p> Occupation : {data.OccupationName}</p>
                            <p className='line-clamp-1'>Category: {data.CategoryName} </p>
                        </div>
                    ) : (
                        <p className='self-center'>The Invitation was accepted </p>
                    )}
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline ' onClick={() => toggleView()}>View Detail</button>
                                <button className='btn '>{data.Status}...</button>
                            </div>
                        ) : (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>View Detail</button>
                                <button className='btn hover:btn-success btn-success'>Accepted</button>
                            </div>
                        )}
                    </div>

                </div>
            ) : (
                // TODO : Complete  for jobseeker   
                < div className="card-body">
                    <h2 className="card-title justify-center">Job Invitation</h2>
                    {data.Status == "Pending" ? (
                        <div>
                            <p className='self-center'>Do you want to accept this invitation? </p>
                            <p> Occupation : {data.OccupationName}</p>
                            <p className='line-clamp-1'>Category: {data.CategoryName} </p>
                        </div>

                    ) : (
                        <p className='self-center'>You are already accepted the invitation</p>
                    )}
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>View Detail</button>
                                <button className='btn hover:btn-outline'>Accept</button>
                            </div>
                        ) : (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>View Detail</button>
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
                    <View_JobInvitation isOpen={isOpenView} isClose={closeToggleView} data={data} type={type} handleAccept={handleAcceptJobInvitation} />
                )
            }
        </div >

    )
}

export default Card_JobInvitation