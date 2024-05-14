import React, { useState } from 'react'


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

function Card_JobInvitation({ data, type }: DataProps) {
    const [isOpenView, setIsOpenView] = useState(false);
    const toggleView = () => {
        setIsOpenView(true);
    }

    const closeToggleView = () => {
        setIsOpenView(false);
    }
    return (
        <div className='card max-w-96  w-full bg-primary text-info-content glass '>

            <figure><img src="/Logo/Career logo.jpg" alt="cv or resume" className='' /></figure>
            {type == "employer" ? (
                < div className="card-body">
                    <h2 className="card-title justify-center">Job Invitation</h2>
                    {data.Status == "Pending" ? (
                        <p className='self-center'>Please waiting jobseeker to join... </p>
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
                        <p className='self-center'>Do you want to accept this job invitation? </p>
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
                // isOpenView && (
                //     <View_Card isOpen={isOpenView} isClose={closeToggleView} data={data} type={type} handleAccept={handleAcceptJobRequest} />
                // )
            }
        </div >

    )
}

export default Card_JobInvitation