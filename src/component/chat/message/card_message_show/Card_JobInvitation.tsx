import React, { useState } from 'react'
import View_JobInvitation from './view/View_JobInvitation';
import axios from 'axios';
import Swal from 'sweetalert2';



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


interface DataProps {
    data: CardProps
    type: string
    info: InfoProps
}

function Card_JobInvitation({ data, type, info }: DataProps) {
    const [isOpenView, setIsOpenView] = useState(false);
    const toggleView = () => {
        setIsOpenView(true);
    }

    const closeToggleView = () => {
        setIsOpenView(false);
    }

    const handleAcceptJobInvitation = async () => {
        try {
            await axios.post('http://localhost:3001/acceptInvitation', { invitationID: data.CardID, Email: info.Email, MyEmail: info.Email });
            Swal.fire({
                icon: 'success',
                title: 'Job Invitation',
                text: 'Accepted Job Invitation!',
            });
            // isCloseToggle();
        } catch (error) {
            console.error('Error accept job Invitation:', error);
        }
        // finally {
        //     // setIsSendLoading(false);
        // }
    };

    return (

        <div className='card max-w-96  w-full bg-primary text-info-content glass font-notoLao'>

            <figure><img src="/Logo/Career logo.jpg" alt="cv or resume" className='' /></figure>
            {type == "employer" ? (
                < div className="card-body">
                    <h2 className="card-title justify-center">ຄຳເຊີນເຂົ້າເຮັດວຽກ</h2>
                    {data.Status == "Pending" ? (
                        <div>
                            <p className='self-center text-center'>ກຳລັງລໍຖ້າການຕອບຮັບ</p>
                            <p> ອາຊີບ : {data.OccupationName}</p>
                            <p className='line-clamp-1'>ໝວດໝູ່ອາຊີບ : {data.CategoryName} </p>
                              
                        </div>
                    ) : (
                        <p className='self-center'>ຄຳເຊີນຂອງທ່ານຖືກຕອບຮັບແລ້ວ</p>
                    )}
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline ' onClick={() => toggleView()}>ເບິ່ງລາຍລະອຽດ</button>
                                <button className='btn '>{data.Status}...</button>
                            </div>
                        ) : (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>ເບິ່ງລາຍລະອຽດ</button>
                                <button className='btn hover:btn-success btn-success'>ຍອມຮັບຄຳຂໍແລ້ວ</button>
                            </div>
                        )}
                    </div>

                </div>
            ) : (
                // TODO : Complete  for jobseeker   
                < div className="card-body">
                    <h2 className="card-title justify-center">ຄຳເຊີນເຂົ້າເຮັດວຽກ</h2>
                    {data.Status == "Pending" ? (
                        <div>
                            <p className='self-center'>ທາ່ນຕ້ອງການຕອບຮັບຄຳເຊີນວຽກນີ້ບໍ່ ? </p>
                            <p> ອາຊີບ : {data.OccupationName}</p>
                            <p className='line-clamp-1'>ໝວດຫມູ່ອາຊີບ : {data.CategoryName}     </p>
                 
                        </div>

                    ) : (
                        <p className='self-center'>ທ່ານໄດ້ຕອບຮັບຄຳເຊີນນີ້ແລ້ວ</p>
                    )}
                    <div >
                        {data.Status == "Pending" ? (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>ເບິ່ງລາຍລະອຽດ</button>
                                <button className='btn hover:btn-outline' onClick={() => handleAcceptJobInvitation()}>Accept</button>
                            </div>
                        ) : (
                            <div className='flex space-x-4 justify-center'>
                                <button className='btn hover:btn-outline  ' onClick={() => toggleView()}>ເບິ່ງລາຍລະອຽດ</button>
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
                    <View_JobInvitation isOpen={isOpenView} isClose={closeToggleView} data={data} type={type} handleAccept={handleAcceptJobInvitation} info={info} />
                )
            }
        </div >

    )
}

export default Card_JobInvitation