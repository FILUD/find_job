import React from 'react'


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
}

function Card_JobInvitation() {
    return (
        <div>Card_JobInvitation</div>
    )
}

export default Card_JobInvitation