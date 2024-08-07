import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate, useParams } from 'react-router-dom';
import cssProfile from './ProfileCSS';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import Swal from 'sweetalert2'

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

interface CVDetail {
    CvID: number;
    JobseekerID: number;
    IMG_CV: string;
    Title: string;
    UploadDate: string;
    OccupationName: string;
    CategoryName: string;
}


interface Employer {
    EmployerID: number;
    CompanyName: string;
    UserID: number;
    ProfessionalTitle: string;
    Profile_IMG: string;
    AddressID: number;
    Tel: string;
    Email: string;
    VillageName: string;
    DistrictName: string;
    ProvinceName: string;
    Verify: string;
}
interface Jobseeker {
    JobseekerID: number;
    JobseekerName: string;
    UserID: number;
    ProfessionalTitle: string;
    Profile_IMG: string;
    Description: string;
    AddressID: number;
    Tel: string;
    Email: string;
    VillageName: string;
    DistrictName: string;
    ProvinceName: string;
}

export default function Profile_feature() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);
    const [isOpenEmployer, setIsOpenEmployer] = useState(false);
    const [isOpenJobseeker, setIsOpenJobseeker] = useState(false);
    const [Employer, setEmployer] = useState<Employer[]>([]);
    const [Jobseeker, setJobseeker] = useState<Jobseeker[]>([]);
    const [Role, setRole] = useState('');
    const [UserID, setUserID] = useState('');
    const [Email, setEmail] = useState('');
    const [cvDetail, setCvDetail] = useState<CVDetail[]>([]);
    const [jobDetail, setJobDetail] = useState<jobDetail[]>([]);
    const getRole = localStorage.getItem('Role');





    const [showActionsEdit, setShowActionsEdit] = useState(false);

    const toggleActionsEdit = () => {
        setShowActionsEdit(!showActionsEdit);
    };


    // const api = 'https://ed7c2763-d449-4c49-931f-d798e5988888-00-1ydx3p5xo4umo.pike.replit.dev';

    // console.log('role:', Role);
    // console.log('email:', Email);
    // console.log('userID:', UserID);

    useEffect(() => {
        const getEmail = localStorage.getItem('Email');
        const getRole = localStorage.getItem('Role');
        const getUserID = localStorage.getItem('UserID');


        if (getEmail && getRole && getUserID) {
            const [resEmail, resRole, resUserID] = [getEmail, getRole, getUserID].map(value => JSON.parse(value) as string);
            setEmail(resEmail);
            setRole(resRole);
            setUserID(String(parseInt(resUserID)));

            if (resEmail && resRole && resUserID) {
                console.log('Fetching user information...');
                const fetchData = async () => {
                    try {
                        const response = await axios.get('http://localhost:3001/userInfo', {
                            params: {
                                role: resRole,
                                userID: resUserID
                            }
                        });
                        console.log('Response user data:', response.data);
                        if (resRole === "Employer") {
                            setEmployer(response.data.Employer);
                            console.log("data emplyer popup :", Employer)
                        } else if (resRole === "Jobseeker") {
                            setJobseeker(response.data.Jobseeker);
                        }
                        setLoading(false);
                    } catch (error) {
                        console.error('Error fetching user information:', error);
                    }
                };
                fetchData();
            }
        }
    }, []);


    const toggleProfile = () => {
        if (Role == "Jobseeker") {
            setIsOpenJobseeker(true);
        }
        if (Role == "Employer") {
            setIsOpenEmployer(true);
        }

    }
    const closeProfile = () => {
        if (Role == "Jobseeker") {
            setIsOpenJobseeker(false);
        }
        if (Role == "Employer") {
            setIsOpenEmployer(false);
        }
    }
    const logoutAuth = async () => {
        localStorage.removeItem('UserID');
        localStorage.removeItem('Role');
        localStorage.removeItem('Email');
        localStorage.removeItem('ID');
        navigate('/');
    }

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

    //get cv
    useEffect(() => {
        const jobseekerID = localStorage.getItem('ID');
        console.log(jobseekerID)
        const fetchCVDetail = async () => {
            try {
                const response = await axios.post('http://localhost:3001/viewcv_byid', { jobseekerID });
                if (response.data && response.data.length > 0) {
                    setCvDetail(response.data); // Update state with job details
                    console.log(response.data); // Log the fetched job detail
                } else {
                    console.error('No CV details found for this jobseeker or Role is not jobseeker.');
                }
            } catch (error) {
                console.error('Error fetching CV detail:', error);
            }
        };

        fetchCVDetail();
    }, []);


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDeleteCV = (cvId: number) => {
        // Show Swal confirmation dialog
        Swal.fire({
            title: "ຢືນຢັນ ?",
            text: "ທ່ານຕ້ອງການລົບບໍ່ !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ຢືນຢັນ !"
        }).then((result) => {
            if (result.isConfirmed) {
                // If confirmed, send DELETE request
                axios.delete('http://localhost:3001/deletecv', { data: { CvID: cvId } })
                    .then(response => {
                        console.log('CV deleted successfully');
                        // Update cvDetail state to remove the deleted CV
                        setCvDetail(prevCvDetail => prevCvDetail.filter(cv => cv.CvID !== cvId));
                        // Show success message
                        Swal.fire({
                            title: "ສຳເລັດ !",
                            text: "ລົບ CV ທີ່ທ່ານປະກາດສຳເລັດ.",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error deleting CV:', error);
                        // Show error message
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the CV.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const handleDeleteJOB = (jobID: number) => {
        Swal.fire({
            title: "ທ່ານແນ່ໃຈບໍ່ ?",
            text: "ວຽກກຂອງທ່ານຈະຖືກລົບ!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ຢືນຢັນການລົບ !"
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
                            title: "Error!",
                            text: "ບໍ່ສາມາດລົບວຽກຂອງທ່ານໄດ້ ລອງໃຫມ່ພາຍຫລັງ.",
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

    const handleEditCv = (cvID: number) => {
        if (typeof cvID === 'number') {
            navigate(`/editCv/${cvID}`);
        } else {
            console.error('Invalid jobID:', cvID);
        }
    };

    function handleEditEmpProfile() {
        const ID = localStorage.getItem('ID');
        if (ID) {
            navigate(`/edit_emp_profile/${ID}`);
        } else {
            console.error('UserID not found in localStorage');
        }
    }

    function handleEditJokProfile() {
        const ID = localStorage.getItem('ID');
        if (ID) {
            navigate(`/edit_jok_profile/${ID}`);
        } else {
            console.error('UserID not found in localStorage');
        }
    }

    return (
        <>
            <div className="dropdown dropdown-end ml-4 font-notoLao">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-24 rounded-full object-cover border-4 border-base-100">

                        {Role == "Employer" ? (
                            Employer.map((emp) => (
                                <div key={emp.EmployerID} className='w-full h-full'>
                                    {emp.Profile_IMG ? (
                                        <><img src={emp.Profile_IMG} alt="User Profile" />

                                        </>
                                    ) : (
                                        <img src="/Icon/user.png" alt="User Profile" />
                                    )}
                                </div>
                            ))
                        ) : (
                            Jobseeker.map((jok) => (
                                <div key={jok.JobseekerID}>
                                    {jok.Profile_IMG ? (
                                        <><img src={jok.Profile_IMG} alt="User Profile" />
                                            <p>jok pro : {jok.Profile_IMG}</p>
                                        </>
                                    ) : (
                                        <img src="/Icon/user.png" alt="User Profile" />
                                    )}
                                </div>
                            ))
                        )}

                    </div>

                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between" onClick={toggleProfile}>ໂປຣຟາຍ
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            {/* <span className="badge">New</span> */}
                        </a>
                    </li>
                    <li onClick={() => navigate('/acceptedBook')}><a className='justify-between'>ລາຍການທີ່ຢືນຢັນແລ້ວ
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg></a></li>

                    <li onClick={() => navigate('/myBookmark')}><a className='justify-between'>ລາຍການທີ່ບັນທຶກໄວ້
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg></a></li>


                    <li onClick={() => navigate('/PostJob')}><a className='justify-between'>ປະກາດ
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                        </svg></a></li>
                    <li onClick={() => navigate('/ReportJob')}>
                        <a className='justify-between'>ລາຍງານຕ່າງໆ
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>

                        </a>
                    </li>


                    <li>
                        <a className='justify-between text-red-700' onClick={() => logoutAuth()}>ອອກຈາກລະບົບ
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                            </svg></a>
                    </li>
                </ul>
            </div>



            {isOpenEmployer && (
                <Transition appear show={isOpenEmployer} as={Fragment} >
                    <Dialog as="div" className="relative z-10" onClose={(closeProfile)}>
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

                        <div className="fixed inset-0 overflow-y-auto font-notoLao">
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
                                    <Dialog.Panel className=' w-full max-w-6xl card w-200 bg-base-100 shadow-xl transition-all '>
                                        <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={closeProfile}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl">
                                            <h2 className='text-white'></h2>
                                        </Dialog.Title>
                                        <div className='grid md:grid-cols-3 sm:grid-cols-1 sm:justify-center'>
                                            {/* left side */}
                                            <div className='card-body sm:grid sm:grid-cols-2 md:flex '>
                                                {isLoading ?
                                                    <div className='avatar'>
                                                        <div className="skeleton w-36 rounded-full shrink-0">
                                                        </div>
                                                    </div>
                                                    : <div className="avatar md:mt-4 md:ml-2 sm:mt-4 sm:ml-20 justify-self-center">
                                                        <div className="w-36 h-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                            {Employer.map((emp) => (
                                                                <div key={emp.EmployerID} className='w-full h-full'> {/* Make sure each item has a unique key */}
                                                                    {emp.Profile_IMG ? (
                                                                        <img src={emp.Profile_IMG} alt="User Profile" className='' />
                                                                    ) : (
                                                                        <img src="/Icon/user.png" alt="PostJob" />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>}

                                                <div className='font-notoLao'>
                                                    <div className='text-start'>
                                                        <p className={cssProfile.titleName}>
                                                            {isLoading ? <div className="skeleton h-5 w-48 font-notoLao"></div> : Employer[0]?.CompanyName}
                                                            {Employer[0]?.Verify == "verified" ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ml-4 self-center text-green-700">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                                                </svg>
                                                                :
                                                                null
                                                            }
                                                        </p>
                                                        <p className={cssProfile.titleWork}>
                                                            {isLoading ? <div className="skeleton h-4 w-32 font-notoLao"></div> : Employer[0]?.ProfessionalTitle}
                                                        </p>
                                                        <div className='flex font-notoLao'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-6 self-center">
                                                                <path fill-rule="evenodd" d=" m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                                            </svg>
                                                            <p className={cssProfile.titleAddress}>
                                                                {isLoading ? <div className="skeleton h-4 w-32 font-notoLao"></div> : (
                                                                    (Employer[0]?.VillageName || Employer[0]?.DistrictName || Employer[0]?.ProvinceName) ?
                                                                        `${Employer[0]?.VillageName}, ${Employer[0]?.DistrictName}, ${Employer[0]?.ProvinceName}` :
                                                                        'ບໍ່ລະບຸ'
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div id='email' className='w-1/3 flex space-x-2 mt-2 text-sm'>
                                                            <div className=''>
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="1.5"
                                                                    stroke="currentColor"
                                                                    className="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                                </svg>
                                                            </div>
                                                            <div className=''>
                                                                {isLoading ? (
                                                                    <BarLoader color={"#5a5e5d"} loading={isLoading} width={140} height={5} className='mt-2' />
                                                                ) : (
                                                                    Employer.map((e) => (
                                                                        <p>{e.Email}</p>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='w-1/3 flex space-x-2 mt-2 text-sm self-center'>
                                                        <div className=''>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                            </svg></div>
                                                        <div className=''>
                                                            {isLoading ? (
                                                                <BarLoader color={"#5a5e5d"} loading={isLoading} width={140} height={5} className='mt-2' />
                                                            ) : (
                                                                Employer.length > 0 ? (
                                                                    Employer.map((e, index) => (
                                                                        <p key={index}>{e.Tel !== null ? e.Tel : 'ບໍ່ລະບຸ'}</p>
                                                                    ))
                                                                ) : (
                                                                    <p>ບໍ່ລະບຸ</p>
                                                                )
                                                            )}
                                                        </div>

                                                    </div>
                                                    <button className='btn btn-square btn-wide btn-ghost btn-outline md:mt-6 mt-8' onClick={() => handleEditEmpProfile()}>ແກ້ໄຂຂໍ້ມູນສ່ວນໂຕ</button>
                                                    <button className='btn btn-square btn-wide btn-ghost btn-outline  mt-2' onClick={() => navigate("/PostJob")}>ປະກາດວຽກໃຫມ່</button >
                                                </div>
                                            </div>

                                            {/* right side of Employer */}
                                            <div className='card-body md:col-span-2 md:mt-5 sm:mt-0'>
                                                <div className='card w-full h-fit'>
                                                    {/* navbar */}
                                                    <div className='navbar bg-neutral-900 text-neutral-content rounded-t-2xl'>
                                                        <div className="flex-1">
                                                            <a className="btn btn-ghost text-xl">ວຽກທີ່ກຳລັງປະກາດ</a>
                                                        </div>
                                                        <div className="flex-none space-x-2">

                                                            {/* <div className="form-control">
                                                                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                                                            </div> */}

                                                            <button className="btn btn-ghost btn-circle" onClick={toggleActionsEdit}>
                                                                <label className="flex items-center gap-2 ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                                    </svg>
                                                                </label>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* content or bottom part */}
                                                    {/* content or bottom part */}
                                                    <div className='w-full h-96 bg-gray-400 rounded-b-2xl p-3 space-y-2 snap-y overflow-y-auto'>


                                                        {jobDetail.map((job: any) => (

                                                            <>
                                                                {job.JobID ? <>
                                                                    <div key={job.JobID} className="card card-side bg-base-100 shadow-xl flex w-full h-48">

                                                                        {showActionsEdit && (
                                                                            //edit
                                                                            <div className="card-actions text-xs top-0 right-0 absolute ">
                                                                                <div onClick={() => handleEditJob(job.JobID)} className='btn btn-ghost btn-circle'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                                </svg></div>
                                                                                {/* Delete */}
                                                                                <div className='btn btn-ghost btn-circle' onClick={() => handleDeleteJOB(job.JobID)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ stroke: 'red' }} className="w-6 h-6">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                                </svg></div>
                                                                            </div>
                                                                        )}

                                                                        <figure className="flex-none w-1/3 mr-0">
                                                                            <img src={job.Job_Post_IMG} alt="Job" className="w-full h-48 object-cover rounded-md" />
                                                                        </figure>
                                                                        <div className="card-body flex-grow">
                                                                            <h2 className="card-title">{job.Title}</h2>
                                                                            <article className="text-xs font-notoLao ml-0 text-wrap" style={{ textAlign: 'start', wordWrap: 'break-word' }}>
                                                                                <p className="self-start">ເງິນເດືອນ : {job.SalaryStart} - {job.SalaryMax} ກີບ</p>
                                                                                <p className="line-clamp-4">ລາຍລະອຽດ : {job.Description}</p>
                                                                                <p className="self-start text-clip">ວັນທີ່ປະກາດ : {job.PostDate ? formatDate(job.PostDate) : 'N/A'}</p>
                                                                            </article>
                                                                            <div className="card-actions text-xs bottom-0 absolute">


                                                                                <p className="self-start text-clip">ປະເພດວຽກ : {job.WorkType}</p>
                                                                                <p className="self-start">ໝວດໝູ່ອາຊີບ : {job.CategoryName} / {job.OccupationName}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </> : <div className='text-black text-2xl text-center'>ທ່ານບໍ່ມີວຽກທີ່ກຳລັງປະກາດ</div>}
                                                            </>
                                                        ))}


                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition >
            )}



            {isOpenJobseeker && (
                <Transition appear show={isOpenJobseeker} as={Fragment} >
                    <Dialog as="div" className="relative z-10" onClose={(closeProfile)}>
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

                        <div className="fixed inset-0 overflow-y-auto font-notoLao">
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
                                    <Dialog.Panel className=' w-full max-w-6xl card w-200 bg-base-100 shadow-xl transition-all '>
                                        <button className="btn btn-square btn-sm absolute top-0 right-0 m-3" onClick={closeProfile}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <Dialog.Title as="h3" className="card-title self-center mt-5 text-2xl">
                                            <h2 className='text-white'></h2>
                                        </Dialog.Title>
                                        <div className='grid md:grid-cols-3 sm:grid-cols-1 sm:justify-center'>
                                            {/* left side */}
                                            <div className='card-body sm:grid sm:grid-cols-2 md:flex '>
                                                {isLoading ?
                                                    <div className='avatar'>
                                                        <div className="skeleton w-44 rounded-full shrink-0">
                                                        </div>
                                                    </div>
                                                    : <div className="avatar md:mt-2 md:ml-14 sm:mt-4 sm:ml-20">
                                                        <div className="w-44 rounded-full object-cover border-4 border-base-100">
                                                            {Jobseeker.map((jobseeker) => (
                                                                <div key={jobseeker.JobseekerID}>
                                                                    {jobseeker.Profile_IMG ? (
                                                                        <img src={jobseeker.Profile_IMG} alt="User Profile" className='' />
                                                                    ) : (
                                                                        <img src="/Icon/user.png" alt="User Profile" className='' />
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>}

                                                <div className='font-notoLao'>
                                                    <div className='text-start'>
                                                        <p className={cssProfile.titleName}>
                                                            {isLoading ? <div className="skeleton h-5 w-48"></div> : Jobseeker[0]?.JobseekerName}
                                                        </p>
                                                        <p className={cssProfile.titleWork}>
                                                            {isLoading ? <div className="skeleton h-4 w-32"></div> : Jobseeker[0]?.ProfessionalTitle}
                                                        </p>
                                                        <div className='flex w-full '>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-6 self-center">
                                                                <path fill-rule="evenodd" d=" m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                                            </svg>
                                                            <p className={cssProfile.titleAddress}>
                                                                {isLoading ? <div className="skeleton h-4 w-32"></div> : (
                                                                    (Employer[0]?.VillageName || Jobseeker[0]?.DistrictName || Jobseeker[0]?.ProvinceName) ?
                                                                        `${Jobseeker[0]?.VillageName}, ${Jobseeker[0]?.DistrictName}, ${Jobseeker[0]?.ProvinceName}` :
                                                                        'ບໍ່ລະບຸ'
                                                                )}
                                                            </p>
                                                        </div>
                                                        <div id='email' className='w-full flex space-x-2 mt-2 text-sm'>
                                                            <div className=''>
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="1.5"
                                                                    stroke="currentColor"
                                                                    className="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                                </svg>
                                                            </div>
                                                            <div className='font-notoLao'>
                                                                {isLoading ? <div className="skeleton h-4 w-32"></div> :
                                                                    Jobseeker.map((e) => (
                                                                        <p>{e.Email}</p>))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='w-full flex space-x-2 mt-2 text-sm '>
                                                        <div className=''>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24"
                                                                stroke-width="1.5"
                                                                stroke="currentColor"
                                                                className="w-5 h-5">
                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                            </svg></div>
                                                        <div className='font-notoLao '>
                                                            {/* {isLoading ? <div className="skeleton h-4 w-32"></div> :
                                                                Jobseeker.map((e) => (
                                                                    <p>{e.Tel !== null ? e.Tel : 'ບໍ່ລະບຸ'}</p>))
                                                            } */}
                                                            {isLoading ? (
                                                                <BarLoader color={"#5a5e5d"} loading={isLoading} width={140} height={5} className='mt-2' />
                                                            ) : (
                                                                Jobseeker.length > 0 ? (
                                                                    Jobseeker.map((e, index) => (
                                                                        <p className='' key={index}>{e.Tel !== null ? e.Tel : 'ບໍ່ລະບຸ'}</p>
                                                                    ))
                                                                ) : (
                                                                    <p>ບໍ່ລະບຸ</p>
                                                                )
                                                            )}
                                                        </div>

                                                    </div>
                                                    <button className='btn btn-square btn-wide btn-ghost btn-outline md:mt-6 mt-8' onClick={() => handleEditJokProfile()}> ແກ້ໄຂຂໍ້ມູນສ່ວນໂຕ</button>
                                                    <button className='btn btn-square btn-wide btn-ghost btn-outline mt-2' onClick={() => navigate("/PostCV")}> ປະກາດ CV</button>
                                                </div>

                                            </div>

                                            {/* right side of Jobseeker */}
                                            <div className='card-body md:col-span-2 md:mt-8 sm:mt-0'>
                                                <div className='card w-full h-full'>
                                                    {/* navbar */}
                                                    <div className='navbar bg-neutral-900 text-neutral-content rounded-t-2xl'>
                                                        <div className="flex-1">
                                                            <a className="btn btn-ghost text-xl">Cv ທີ່ກຳລັງປະກາດ</a>
                                                        </div>
                                                        <div className="flex-none space-x-4 pr-2 ">
                                                            {/* <div className="form-control">
                                                                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                                                            </div> */}
                                                            <button className="btn btn-ghost btn-circle" onClick={toggleActionsEdit}>
                                                                <label className="flex items-center gap-2 ">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                                    </svg>
                                                                </label>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* content or bottom part */}
                                                    <div className='w-full h-full max-h-96 bg-gray-400 rounded-b-2xl p-3 space-y-2 snap-y overflow-y-auto'>

                                                        {cvDetail.map((cv: any) => (
                                                            <div key={cv.CvID} className="card card-side bg-base-100 shadow-xl flex w-full h-48">

                                                                {showActionsEdit && (
                                                                    //edit
                                                                    <div className="card-actions text-xs top-0 right-0 absolute ">
                                                                        <div className='btn btn-ghost btn-circle' onClick={() => handleEditCv(cv.CvID)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                                        </svg></div>
                                                                        {/* Delete */}
                                                                        <div className='btn btn-ghost btn-circle' onClick={() => handleDeleteCV(cv.CvID)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ stroke: 'red' }} className="w-6 h-6">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                        </svg></div>
                                                                    </div>
                                                                )}

                                                                <figure className="flex-none w-1/3 mr-0">
                                                                    <img src={cv.IMG_CV} alt="CV" className="w-full h-48 rounded-md object-scale-down" />
                                                                </figure>
                                                                <div className="card-body flex-grow">
                                                                    <h2 className="card-title">{cv.Title}</h2>
                                                                    <article className="text-xs font-notoLao ml-0 text-wrap" style={{ textAlign: 'start', wordWrap: 'break-word' }}>

                                                                        <p className="line-clamp-4">ໝວດຫມູ່ອາຊີບ : {cv.CategoryName} / {cv.OccupationName}</p>
                                                                        <p className="self-start">ວັນທີ່ປະກາດ : {cv.UploadDate ? formatDate(cv.UploadDate) : 'N/A'}</p>
                                                                    </article>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition >
            )
            }
        </>
    );
}