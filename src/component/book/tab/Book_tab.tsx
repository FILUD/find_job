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
    OccupationID: number;
    Description: string;
    SalaryStart: number;
    SalaryMax: number;
    WorkType: string;
    OccupationName: string;
    CategoryName: string;
    UserInfo: UserInfo;
    JobType: string;
}

interface UserInfo {
    ID: number,
    UserID: number,
    Name: string,
    // Title: string,
    // AddressID: number,
    Tel: string,
    Profile_IMG: string,
    // VillageName: string,
    // DistrictName: string,
    // ProvinceName: string,
    Email: string,
    // Role: string
}

interface BookProps {
    data: CardProps[];
    role: string;
}


function Book_tab({ data, role }: BookProps) {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e) => {
                        // const profile = e.UserInfo.Profile_IMG;
                        let text = "";
                        if (e.JobType === "JobInvitation") {
                            if (role == "Jobseeker") {
                                text = `${e.UserInfo.Name} sent invitation to you `
                            }
                            else {
                                text = `You sent invitation to ${e.UserInfo.Name}`
                            }
                        } else {
                            if (role == "Jobseeker") {
                                text = `You sent request to ${e.UserInfo.Name}`
                            }
                            else {
                                text = `${e.UserInfo.Name} sent request to you `
                            }
                        }

                        return (
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                {e.UserInfo.Profile_IMG ? (
                                                    <img src={e.UserInfo.Profile_IMG} alt="Profile" />
                                                ) : (
                                                    <img src="/Icon/user.png" alt="Profile" />
                                                )}
                                            </div>
                                        </div>
                                        <div className='font-notoLao'>
                                            <div className="font-bold">{e.UserInfo.Name}</div>
                                            <div className="text-sm opacity-50">{text}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className='font-notoLao'>
                                    {e.OccupationName}
                                    <br />
                                    <span className="">{e.CategoryName}</span>
                                </td>
                                <td>{e.Status}</td>
                                {/* <th>
                                    <button className="btn btn-ghost btn-md">details</button>
                                </th> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Book_tab