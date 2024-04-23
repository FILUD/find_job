import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useNavigate, useParams } from 'react-router-dom';
import cssProfile from './ProfileCSS';
import { BarLoader } from 'react-spinners';
import axios from 'axios';

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




    interface Employer {
        EmployerID: number;
        CompanyName: string;
        UserID: number;
        ProfessionalTitle: string;
        Profile_IMG: {
            type: string;
            data: number[];
        };
        AddressID: number;
        Tel: string;
        Email: string;
        VillageName: string;
        DistrictName: string;
        ProvinceName: string;
    }
    interface Jobseeker {
        JobseekerID: number;
        JobseekerName: string;
        UserID: number;
        ProfessionalTitle: string;
        Profile_IMG: {
            type: string;
            data: number[];
        };
        Description: string;
        AddressID: number;
        Tel: string;
        Email: string;
        VillageName: string;
        DistrictName: string;
        ProvinceName: string;
    }

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

    //get Cv
    useEffect(() => {
        const jobseekerID = localStorage.getItem('ID');
        const fetchCVDetail = async () => {
            try {
                const response = await axios.post('http://localhost:3001/viewcv_byid', { jobseekerID });
                if (response.data && response.data.length > 0) {
                    setCvDetail(response.data);
                    console.log(setCvDetail);
                } else {
                    console.error('No CV details found for this jobseeker or Role is not Jobseeker.');
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

    return (
        <>
            <div className="dropdown dropdown-end ml-4">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className=" w-24 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between" onClick={toggleProfile}>
                            Profile
                            <span className="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li>
                        <a onClick={() => logoutAuth()}>Logout</a>
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

                        <div className="fixed inset-0 overflow-y-auto">
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
                                                    : <div className="avatar md:mt-4 md:ml-2 sm:mt-4 sm:ml-20">
                                                        <div className="w-36 h-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                        </div>
                                                    </div>}

                                                <div className=''>
                                                    <div className='text-start'>
                                                        <p className={cssProfile.titleName}>
                                                            {isLoading ? <div className="skeleton h-5 w-48"></div> : Employer[0]?.CompanyName}
                                                        </p>
                                                        <p className={cssProfile.titleWork}>
                                                            {isLoading ? <div className="skeleton h-4 w-32"></div> : Employer[0]?.ProfessionalTitle}
                                                        </p>
                                                        <div className='flex '>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-6 self-center">
                                                                <path fill-rule="evenodd" d=" m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                                                            </svg>
                                                            <p className={cssProfile.titleAddress}>
                                                                {isLoading ? <div className="skeleton h-4 w-32"></div> : (
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
                                                            <div className='font-sans'>
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
                                                        <div className='font-sans'>
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
                                                    <button className='btn btn-square btn-wide btn-ghost btn-outline md:mt-12 mt-8' onClick={() => navigate("/PostJob")}> Post Job</button >
                                                </div>
                                            </div>

                                            {/* right side of Employer */}
                                            <div className='card-body md:col-span-2 md:mt-5 sm:mt-0'>
                                                <div className='card w-full h-fit'>
                                                    {/* navbar */}
                                                    <div className='navbar bg-neutral-900 text-neutral-content rounded-t-2xl'>
                                                        <div className="flex-1">
                                                            <a className="btn btn-ghost text-xl">Job Posting</a>
                                                        </div>
                                                        <div className="flex-none space-x-2">
                                                            <div className="form-control">
                                                                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                                                            </div>
                                                            <div className="dropdown dropdown-end">
                                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-square avatar">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                                                </div>
                                                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                                                    <li>
                                                                        <a className="justify-between">
                                                                            Add post
                                                                            <span className="badge">New</span>
                                                                        </a>
                                                                    </li>
                                                                    <li><a>Edit</a></li>
                                                                    <li><a>Delete</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* content or bottom part */}
                                                    {/* content or bottom part */}
                                                    <div className='w-full h-72 bg-gray-400 rounded-b-2xl p-3 space-y-2 snap-y overflow-y-auto'>


                                                        {jobDetail.map((job: any) => (
                                                            <div key={job.JobID} className="card card-side bg-base-100 shadow-xl flex w-full h-48">
                                                                <figure className="flex-none w-1/3 mr-0">
                                                                    <img src={job.Job_Post_IMG} alt="Job" className="w-full h-48 object-cover rounded-md" />
                                                                </figure>
                                                                <div className="card-body flex-grow">
                                                                    <h2 className="card-title">{job.Title}</h2>
                                                                    <article className="text-xs font-sans ml-0 text-wrap" style={{ textAlign: 'start', wordWrap: 'break-word' }}>
                                                                        <p className="self-start">Salary : {job.SalaryStart} - {job.SalaryMax} LAK</p>
                                                                        <p className="line-clamp-4">Description : {job.Description}</p>
                                                                        <p className="self-start text-clip">Posted : {job.PostDate ? formatDate(job.PostDate) : 'N/A'}</p>
                                                                    </article>
                                                                    <div className="card-actions text-xs bottom-0 absolute">


                                                                        <p className="self-start text-clip">Work Type : {job.WorkType}</p>
                                                                        <p className="self-start">Work Category : {job.CategoryName} / {job.OccupationName}</p>
                                                                    </div>
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

                        <div className="fixed inset-0 overflow-y-auto">
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
                                                    : <div className="avatar md:mt-4 md:ml-2 sm:mt-4 sm:ml-20">
                                                        <div className="w-36 h-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                                        </div>
                                                    </div>}

                                                <div className=''>
                                                    <div className='text-start'>
                                                        <p className={cssProfile.titleName}>
                                                            {isLoading ? <div className="skeleton h-5 w-48"></div> : Jobseeker[0]?.JobseekerName}
                                                        </p>
                                                        <p className={cssProfile.titleWork}>
                                                            {isLoading ? <div className="skeleton h-4 w-32"></div> : Jobseeker[0]?.ProfessionalTitle}
                                                        </p>
                                                        <div className='flex '>
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
                                                            <div className='font-sans'>
                                                                {isLoading ? <div className="skeleton h-4 w-32"></div> :
                                                                    Jobseeker.map((e) => (
                                                                        <p>{e.Email}</p>))
                                                                }
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
                                                            <div className='font-sans'>
                                                            {isLoading ? (
                                                                <BarLoader color={"#5a5e5d"} loading={isLoading} width={140} height={5} className='mt-2' />
                                                            ) : (
                                                                Jobseeker.length > 0 ? (
                                                                    Jobseeker.map((e, index) => (
                                                                        <p key={index}>{e.Tel !== null ? e.Tel : 'ບໍ່ລະບຸ'}</p>
                                                                    ))
                                                                ) : (
                                                                    <p>ບໍ່ລະບຸ</p>
                                                                )
                                                            )}
                                                        </div>

                                                    </div>
                                                    <button className='btn btn-square btn-wide btn-ghost btn-outline md:mt-6 mt-8' onClick={() => navigate("/PostCV")}> Edit Profile</button>
                                                    <button className='btn btn-square btn-wide btn-ghost btn-outline mt-2' onClick={() => navigate("/PostCV")}> Post CV</button>
                                                </div>

                                            </div>

                                            {/* right side of Jobseeker */}
                                            <div className='card-body md:col-span-2 md:mt-2 sm:mt-0'>
                                                <div className='card w-full h-full'>
                                                    {/* navbar */}
                                                    <div className='navbar bg-neutral-900 text-neutral-content rounded-t-2xl'>
                                                        <div className="flex-1">
                                                            <a className="btn btn-ghost text-xl">Cv Posting</a>
                                                        </div>
                                                        <div className="flex-none space-x-2">
                                                            <div className="form-control">
                                                                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                                                            </div>
                                                            <div className="dropdown dropdown-end">
                                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-square avatar">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                                                                </div>
                                                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                                                    <li>
                                                                        <a className="justify-between">
                                                                            Add post
                                                                            <span className="badge">New</span>
                                                                        </a>
                                                                    </li>
                                                                    <li><a>Edit</a></li>
                                                                    <li><a>Delete</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* content or bottom part */}
                                                    <div className='w-full h-96 bg-gray-400 rounded-b-2xl p-3 space-y-2 snap-y overflow-y-auto'>

                                                        {cvDetail.map((cv: any) => (
                                                            <div key={cv.CvID} className="card card-side bg-base-100 shadow-xl flex w-full h-48">
                                                                <figure className="flex-none w-1/3 mr-0">
                                                                    <img src={cv.IMG_CV} alt="CV" className="w-full h-48 object-cover rounded-md" />
                                                                </figure>
                                                                <div className="card-body flex-grow">
                                                                    <h2 className="card-title">{cv.Title}</h2>
                                                                    <article className="text-xs font-sans ml-0 text-wrap" style={{ textAlign: 'start', wordWrap: 'break-word' }}>
                                                                        
                                                                        <p className="line-clamp-4">Work Category : {cv.CategoryName} / {cv.OccupationName}</p>
                                                                        <p className="self-start">Upload Date : {cv.PostDate ? formatDate(cv.PostDate) : 'N/A'}</p>
                                                                    </article>
                                                                    <div className="card-actions text-xs bottom-0 absolute">
                                                                        
                                                                    </div>
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