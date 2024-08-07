import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SetNavbar from '../component/navbar/SetNavbar';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from './../theme/theme';
import Footer from '../component/footer/Footer';

interface jobDetail {
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
    WorkType: string
}


function EditProfileEmp() {
    const { theme } = useTheme();

    const navigate = useNavigate();
    const [EmpData, setEmpData] = useState<any[]>([]);
    const [jobDetail, setJobDetail] = useState<jobDetail[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isEditMode, setIsEditMode] = useState(false);

    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [village, setVillage] = useState('');
    const [proTitle, setProTitle] = useState('');
    const [addressID, setAddressID] = useState('');
    const [addressId, setAddressId] = useState(null);
    const [distirctID, setDistirctID] = useState('');
    const employerID = localStorage.getItem('ID');


    const [district, setDistrict] = useState('');
    const [districts, setDistricts] = useState<{ DistrictID: number; DistrictName: string }[]>([]);

    const [selectedprovice, setSelectedprovice] = useState<number | null>(null);
    const [province, setProvince] = useState<{ ProvinceID: number; ProvinceName: string }[]>([]);

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDeleteJOB = (jobID: number) => {
        Swal.fire({
            title: "ຢືນຢັນການລົບ ?",
            text: "ທ່ານຕ້ອງການລົບຮູບພາບບໍ່ !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ຢືນຢັນ !"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('http://localhost:3001/deletejob', { data: { JobID: jobID } })
                    .then(response => {
                        console.log('CV deleted successfully');
                        setJobDetail(prevJobDetail => prevJobDetail.filter(job => job.JobID !== jobID));
                        Swal.fire({
                            title: "ລົບສຳເລັດ !",
                            text: "ວຽກຂອງທ່ານຖືກລົບແລ້ວ.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.error('Error deleting Job:', error);
                        console.log('JobID:', jobID);
                        Swal.fire({
                            title: "ຜິດພາດ !",
                            text: "ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃຫມ່ພາຍຫຼັງ.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleEditJob = (jobID: number) => {
        if (typeof jobID === 'number') {
            navigate(`/editJob/${jobID}`);
        } else {
            console.error('Invalid jobID:', jobID);
        }
    };

    //get jobpost
    useEffect(() => {
        const employerID = localStorage.getItem('ID');
        console.log(employerID)
        const fetchJOBDetail = async () => {
            try {
                const response = await axios.post('http://localhost:3001/viewjob_byid', { employerID });
                if (response.data && response.data.length > 0) {
                    setJobDetail(response.data); // Update state with job details
                    console.log(response.data); // Log the fetched job detail
                } else {
                    console.error('No JOB details found for this jobseeker or Role is not Employer.');
                }
            } catch (error) {
                console.error('Error fetching JOB detail:', error);
            }
        };

        fetchJOBDetail();
    }, []);

    // Handle file change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        if (selectedFile) {
            Swal.fire({
                title: 'ຢືນຢັນ ?',
                text: 'ທ່ານຕ້ອງການປ່ຽນຮູບໂປຣຟາຍບໍ່ ?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'ຢືນຢັນ !',
                cancelButtonText: 'ຍົກເລີກ',
            }).then((result) => {
                if (result.isConfirmed) {
                    saveImage(selectedFile);
                } else {
                    // User chose not to save, reset file and image URL
                    setFile(null);
                    setImageUrl('');
                }
            });
        } else {
            setImageUrl('');
        }
    };

    const saveImage = async (file: File) => {
        const employerID = localStorage.getItem('ID');

        const formData = new FormData();
        formData.append('Profile_IMG', file); // Changed 'Post_IMG' to 'Profile_IMG' to match the backend

        console.log("Data to be sent to file:", file);
        console.log("Data to be sent to ID:", employerID);

        try {
            await axios.post(`http://localhost:3001/editprofileEmp/${employerID}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            Swal.fire({
                position: "top",
                icon: "success",
                title: "ແກ້ໄຂຮູບພາບສຳເລັດ",
                showConfirmButton: false,
                timer: 1500
            });
            window.location.reload();
        } catch (error) {
            Swal.fire({
                position: "top",
                icon: "error",
                title: "ບໍ່ສາມາດແກ້ໄຂໄດ້ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ.",
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error editing profile:', error);
        }
    };

    const handleToggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleCloseEditMode = () => {
        setIsEditMode(false);
    };


    //get province
    useEffect(() => {
        fetch('http://localhost:3001/getallprovince')
            .then(response => response.json())
            .then(data => {
                if (data.error === false) {
                    setProvince(data.data);
                } else {
                    console.error('Failed to fetch categories:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);


    //provice change
    const handleProvinceChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProvinceId = parseInt(event.target.value);
        setSelectedprovice(selectedProvinceId);
        console.log("Provice ID ====", selectedProvinceId)

        try {
            const response = await fetch('http://localhost:3001/getdristictbyprovice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ProvinceID: selectedProvinceId })
            });

            const respons = await response.json();
            if (respons.error === false) {
                setDistricts(respons.data);
            } else {
                console.error('Failed to fetch District:', respons.message);
            }
        } catch (error) {
            console.error('Error fetching District:', error);
        }
    };

    // Set initial form values
    useEffect(() => {
        if (EmpData && EmpData.length) {
            const empdata = EmpData[0];
            setEmail(empdata.Email);
            setProTitle(empdata.ProfessionalTitle);
            setTel(empdata.Tel)
            setVillage(empdata.VillageName)
            setCompanyName(empdata.CompanyName)
            setAddressID(empdata.AddressID)
            console.log("set Address ID : ", addressID)
            setDistirctID(empdata.DistrictID)
            if (empdata.AddressID) {
                handleProvinceChange({ target: { value: empdata.ProvinceID } } as React.ChangeEvent<HTMLSelectElement>);
                handleDistrictChange({ target: { value: empdata.DistrictID } } as React.ChangeEvent<HTMLSelectElement>);
            }
        }
    }, [EmpData]);

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrict(event.target.value);

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (addressID === null && district) {
                const data = {
                    VillageName: village,
                    DistrictID: district
                };

                const response = await fetch('http://localhost:3001/postaddress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const responseData = await response.json();
                    console.log('Data inserted successfully.');

                    setAddressId(responseData.addressId);
                    console.log("Data for uploaded address:", responseData.addressId);
                    setVillage('');
                    setDistrict('');

                    try {
                        const editData = {
                            AddressID: responseData.addressId,
                            VillageName: village,
                            DistrictID: district
                        };
                        console.log('Edit Data:', editData);

                        const editResponse = await fetch(`http://localhost:3001/editaddressemp/${employerID}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(editData)
                        });

                        if (editResponse.ok) {
                            console.log('Edit Address successfully uploaded new data.');
                        } else {
                            console.error('Failed to edit address.');
                        }

                        const response2 = await fetch(`http://localhost:3001/editprofiledata/${employerID}`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ companyName, proTitle, tel, addressID: responseData.addressId }),
                        });

                        if (response2.ok) {
                            console.log("Profile data edited successfully");
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "ແກ້ໄຂຂໍ້ມູນໂປຣຟາຍສຳເລັດ",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            window.location.reload();
                        } else {
                            console.error("Failed to edit profile data");
                        }

                    } catch (error) {
                        console.error('Error editing data:', error);
                    }
                } else {
                    console.error('Failed to insert data.');
                }
            } else if (addressID !== null) {
                const response = await fetch(`http://localhost:3001/editaddress/${addressID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ VillageName: village, DistrictID: district }),
                });

                if (response.ok) {
                    console.log("Address edited successfully");
                } else {
                    console.error("Failed to edit address");
                }

                const response2 = await fetch(`http://localhost:3001/editprofiledata/${employerID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ companyName, proTitle, tel, addressID }),
                });

                if (response2.ok) {
                    console.log("Profile data edited successfully");
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "ແກ້ໄຂຂໍ້ມູນໂປຣຟາຍສຳເລັດ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();
                } else {
                    console.error("Failed to edit profile data");
                }
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <html className='font-notoLao' data-theme={theme}>
            <div className=' h-screen max-h-screen bg-base-100'>
                <SetNavbar />
                <div className='max-h-screen h-3/4 mt-2 bg-base-100'>

                    <center className='grid bg-base-100 h-full '>
                        <div className='container justify-self-center bg-base-100 mt-8'>
                            <div className='mb-20 bg-purple-900 p-4 rounded-xl shadow-lg '>
                                <p className="text-2xl font-bold text-white">ໂປຟາຍຂອງຂ້ອຍ</p>
                            </div>
                        </div>
                        <div className='self-center h-full'>
                            {EmpData.map(emp => (
                                <div className='container -mt-14 grid grid-cols-3 justify-center center bg-base-100  gap-1' key={emp.UserID}>
                                    <div className='col-span-1 grid justify-center bg-purple-900 rounded-xl text-white ml-4 p-3'>
                                        <div className='w-36 h-36 mt-2 justify-self-center static rounded-full'>
                                            <button className="btn btn-ghost btn-circle absolute -mt-2 ml-5 bg-base-100  rounded-full bg-opacity-75">
                                                <label className="flex items-center text-black gap-2 ">
                                                    <input
                                                        type="file"
                                                        accept="image/jpeg, image/png"
                                                        className="file-input file-input-bordered file w-full max-w-xs hidden"
                                                        onChange={handleFileChange}
                                                    />

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                    </svg>
                                                </label>
                                            </button>
                                            {emp.Profile_IMG ? (
                                                <img className='w-full h-full rounded-full border-4 border-base-100' src={emp.Profile_IMG} alt="User Profile" />
                                            ) : (
                                                imageUrl ? (
                                                    <img className='w-full h-full rounded-full border-4 border-base-100' src={imageUrl} alt="PostJob" />
                                                ) : (
                                                    <img className='w-full h-full rounded-full border-4 border-base-100' src="/Icon/user.png" alt="PostJob" />
                                                )
                                            )}

                                        </div>
                                        <div className='flex justify-center'>
                                            <p className='pb-7 text-2xl'>{emp.CompanyName} </p>
                                            {emp.Verify == "verified" ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-2 mt-1 text-green-700">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                </svg>
                                                :
                                                null
                                            }
                                        </div>


                                        <div className='pb-5'>
                                            <div>
                                                <div className='pb-2 grid grid-cols-3'>
                                                    <svg className="w-6 h-6 col-span-1 justify-self-center ml-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                    </svg>
                                                    <p className='col-span-2 justify-self-start'>{emp.Email}</p>
                                                </div>
                                                <div className='grid grid-cols-3 pb-2'>
                                                    <svg className="w-6 h-6 col-span-1 justify-self-center ml-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                    </svg>
                                                    <div className='col-span-2 justify-self-start'>
                                                        {emp.Tel ? (
                                                            <p className=''>{emp.Tel}</p>
                                                        ) : (
                                                            <p className='text-left'>ຍັງບໍ່ມີຂໍ້ມູນ</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-3 justify-self-center pb-2'>
                                                    <svg className="w-6 h-6 col-span-1 justify-self-center ml-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                                    </svg>
                                                    <div className='col-span-2 justify-self-start'>
                                                        {emp.VillageName ? (
                                                            <p className='text-left'>ບ້ານ{emp.VillageName} / ເມືອງ{emp.DistrictName} / ແຂວງ{emp.ProvinceName}</p>
                                                        ) : (
                                                            <p className='text-left'>ທີ່ຢູ່ : ຍັງບໍ່ມີຂໍ້ມູນ</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-3 '>
                                                    <svg className="w-6 h-6 col-span-1 justify-self-center ml-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                                    </svg>
                                                    <div className='col-span-2 justify-self-start'>
                                                        {emp.ProfessionalTitle ? (
                                                            <div className='text-left'>{emp.ProfessionalTitle}</div>
                                                        ) : (
                                                            <p className='text-left'>ລາຍລະອຽດ : ຍັງບໍ່ມີຂໍ້ມູນ</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <button className='btn btn-square btn-wide btn-ghost text-white btn-outline md:mt-6 mt-2 ' onClick={handleToggleEditMode}>ແກ້ໄຂຂໍ້ມູນສ່ວນໂຕ</button>
                                                <button className='btn btn-square btn-wide btn-ghost text-white btn-outline  mt-2' onClick={() => navigate("/PostJob")}>ປະກາດວຽກໃໝ່</button >
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-span-2 h-fit text-right'>

                                        {isEditMode ? (
                                            <div className='pt-4'>
                                                <div className='grid grid-cols-5'>
                                                    <p className='ml-2 horizontal col-span-1 pr-5 self-center'>ອີເມວ :</p>
                                                    <input
                                                        disabled
                                                        type="text"
                                                        placeholder={emp.Email}
                                                        className="input input-bordered w-4/5 col-span-4"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>

                                                <div className='grid grid-cols-5'>
                                                    <p className='ml-2 horizontal col-span-1 pr-5 self-center'>ຊື່ບໍລິສັດ :</p>
                                                    <input
                                                        type="text"
                                                        placeholder={emp.CompanyName}
                                                        className="input input-bordered w-4/5 col-span-4"
                                                        value={companyName}
                                                        onChange={(e) => setCompanyName(e.target.value)}
                                                    />
                                                </div>
                                                <div className='grid grid-cols-5'>
                                                    <p className='ml-2 horizontal col-span-1 pr-5 self-center'>ເບີໂທ :</p>
                                                    <input
                                                        type="text"
                                                        placeholder={emp.Tel}
                                                        className="input input-bordered w-4/5 col-span-4"
                                                        value={tel}
                                                        onChange={(e) => setTel(e.target.value)}
                                                    />
                                                </div>

                                                <div className='grid grid-cols-5 my-5'>

                                                    <p className='ml-2 horizontal col-span-1 pr-5 self-center'>ແຂວງ :</p>
                                                    <select
                                                        className="select select-primary w-4/5 max-w-xs col-span-4"
                                                        value={selectedprovice || ''}
                                                        onChange={handleProvinceChange}
                                                    >
                                                        <option disabled value="">Province</option>
                                                        {province.map(province => (
                                                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                                                {province.ProvinceName}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <p className='ml-2 horizontal col-span-1 pr-5 self-center'>ເມືອງ :</p>
                                                    <select
                                                        className="select select-primary w-4/5 max-w-xs col-span-4"
                                                        value={district}
                                                        onChange={(e) => setDistrict(e.target.value)}
                                                    >
                                                        <option disabled value="">Distict</option>
                                                        {districts.map(district => (
                                                            <option key={district.DistrictID} value={district.DistrictID}>
                                                                {district.DistrictName}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <p className='ml-2 horizontal col-span-1 pr-5 self-center'>ບ້ານ :</p>
                                                    <input
                                                        type="text"
                                                        placeholder={emp.VillageName}
                                                        className="input input-bordered w-4/5 col-span-4"
                                                        value={village}
                                                        onChange={(e) => setVillage(e.target.value)}
                                                    />
                                                </div>
                                                <div className='grid grid-cols-5 my-5'>
                                                    <p className='ml-2 horizontal col-span-2 pr-5 self-center'>ລາຍລະອຽດເພີ່ມເຕີມ :</p>
                                                    <input
                                                        type="text"
                                                        placeholder={emp.ProfessionalTitle}
                                                        className="input input-bordered w-4/5 col-span-3"
                                                        value={proTitle}
                                                        onChange={(e) => setProTitle(e.target.value)}
                                                    /></div>

                                                <div className='grid grid-cols-8 my-5 gap-5'>
                                                    <button className='btn btn-square  btn-primary w-full md:mt-6 mt-2 justify-center col-start-3 col-end-5' onClick={handleSubmit}>ບັນທຶກ</button>
                                                    <button className='btn btn-square  btn-ghost btn-outline w-full md:mt-6 mt-2 justify-center col-start-5 col-end-7' onClick={handleCloseEditMode}>ຍົກເລີກ</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='m-4'>
                                                <div className='navbar bg-purple-900 rounded-t-2xl'>
                                                    <div className="flex-1">
                                                        <a className="btn btn-ghost text-xl text-white">ວຽກທີ່ກຳລັງປະກາດ</a>
                                                    </div>
                                                </div>
                                                <div className='w-full h-full max-h-96 bg-base-300 rounded-b-2xl p-3 space-y-4 snap-y overflow-y-auto shadow-md mb-2'>
                                                    {jobDetail.length > 0 ? (
                                                        jobDetail.map((job: any) => (
                                                            <div key={job.JobID} className="card card-side bg-base-100 shadow-xl flex w-full h-52 ">
                                                                <div className="card-actions text-xs top-0 right-0 absolute ">
                                                                    <div onClick={() => handleEditJob(job.JobID)} className='btn btn-ghost btn-circle'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                    </svg></div>
                                                                    {/* Delete */}
                                                                    <div className='btn btn-ghost btn-circle' onClick={() => handleDeleteJOB(job.JobID)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ stroke: 'red' }} className="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                    </svg></div>
                                                                </div>

                                                                <figure className="flex-none w-1/3 mr-0">
                                                                    <img src={job.Job_Post_IMG} alt="Job" className="w-full h-full object-cover rounded-l-xl" />
                                                                </figure>
                                                                <div className="card-body flex-grow">
                                                                    <h2 className="card-title">{job.Title}</h2>
                                                                    <article className="text-xs ml-0 text-wrap" style={{ textAlign: 'start', wordWrap: 'break-word' }}>
                                                                        <p className="self-start">ເງິນເດືອນ : {job.SalaryStart} - {job.SalaryMax} LAK</p>
                                                                        <p className="line-clamp-4">ລາຍລະອຽດວຽກ : {job.Description}</p>
                                                                        <p className="self-start text-clip">ວັນທີ່ປະກາດ : {job.PostDate ? formatDate(job.PostDate) : 'N/A'}</p>
                                                                    </article>
                                                                    <div className="card-actions text-xs bottom-0 absolute">
                                                                        <p className="self-start text-clip">ປະເພດວຽກ : {job.WorkType}</p>
                                                                        <p className="self-start">ໝວດໝູ່ສາຍວຽກ : {job.CategoryName} / {job.OccupationName}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))

                                                    ) : (
                                                        <div className='flex flex-col h-96 items-center justify-items-center'>

                                                            <svg className="w-20 h-20 mt-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                                                            </svg>
                                                            <p className='p-3'>ຍັງບໍ່ມີຂໍ້ມູນການປະກາດວຽກ.</p>
                                                            <button className='btn btn-square btn-wide btn-primary' onClick={() => navigate("/PostJob")}>ປະກາດວຽກໃໝ່</button >

                                                        </div>
                                                    )}

                                                </div>
                                            </div>


                                        )}

                                    </div>
                                </div>
                            ))}
                        </div>
                    </center>

                </div>
            </div>
            <br /><br /><br />
            <Footer />
        </html>
    )
}

export default EditProfileEmp