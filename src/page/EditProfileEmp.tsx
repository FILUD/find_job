import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SetNavbar from '../component/navbar/SetNavbar';



function EditProfileEmp() {

    const [EmpData, setEmpData] = useState<any[]>([]);

    useEffect(() => {
        const employerID = localStorage.getItem('ID');
        axios.post('http://localhost:3001/viewemployer_byid', { employerID })
            .then(response => {
                setEmpData(response.data.data); // Set jobseeker data in state
            })
            .catch(error => {
                console.error('Error fetching jobseeker data:', error);
            });
    }, []);

    return (
        <>
            <SetNavbar />
            <center>
                <div className=''>
                    <h1 className='text-gray-50 text-2xl'>Employer Data:</h1>
                    {EmpData.map(emp => (
                        <div className='container grid grid-cols-3 justify-center center bg-slate-700 center' key={emp.UserID}>


                            <div>
                                <div>
<img src="" alt="" />
                                </div>
                                <div>

                                </div>

                            </div>

                            <div>


                            </div>

                            <div>
                                <p>Company Name: {emp.CompanyName}</p>
                                <p>ProfessionalTitle: {emp.UsProfessionalTitleerID}</p>
                                <p>AddressID: {emp.AddressID}</p>
                                <p>Tel: {emp.Tel}</p>
                                <p>Email: {emp.Email}</p>
                                <p>Profile_IMG: {emp.Profile_IMG}</p>
                                <p>VillageName: {emp.VillageName}</p>
                                <p>DistrictName: {emp.DistrictName}</p>
                                <p>ProvinceName: {emp.ProvinceName}</p>

                            </div>




                        </div>
                    ))}
                </div>
            </center>
        </>
    )
}

export default EditProfileEmp