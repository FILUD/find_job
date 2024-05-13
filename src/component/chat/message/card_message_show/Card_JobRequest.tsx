import React, { useState } from 'react'
import View_Card from './View_Card';

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

    return (

        <div className='card max-w-96 max-h-44 w-full h-full bg-primary text-info-content '>
            {type == "jobseeker" ? (
                < div className="card-body">
                    <h2 className="card-title justify-center">Job Request</h2>
                    <p>Please waiting employer to accept </p>
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:bg-opacity-80 ' onClick={() => toggleView()}>View CV</button>
                                <button className='btn '>{data.Status}...</button>
                            </div>
                        ) : (
                            <button className='btn btn-disabled '>{type}</button>
                        )}
                    </div>
                </div>
            ) : (
                // TODO : Complete  for employer
                < div className="card-body">
                    <h2 className="card-title justify-center">Job Request</h2>
                    <p className='self-center'>Do you want to accept this job request? </p>
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:bg-opacity-80 ' onClick={() => toggleView()}>View CV</button>
                                <button className='btn'>Accept</button>
                            </div>
                        ) : (
                            <button className='btn btn-disabled '>{type}</button>
                        )}
                    </div>
                </div>
            )}

            {/* view card */}
            {
                isOpenView && (
                    <View_Card isOpen={isOpenView} isClose={closeToggleView} data={data} type={type} />
                )
            }
        </div >


    )
}

export default Card_JobRequest