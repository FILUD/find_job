import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import '../css/animation_HomePage.css'
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
// import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import SetNavbar from '../component/navbar/SetNavbar';
import { useTheme } from '../theme/theme'
import Swal from 'sweetalert2';
import JobRequest from '../component/chat/card/JobRequest';
import { select } from '@material-tailwind/react';
import JobInvitation from '../component/chat/card/JobInvitation';

interface jobData {
  JobID: number;
  JobseekerID: number;
  UserID: number;
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

interface CVData {
  CvID: number;
  JobseekerID: number;
  IMG_CV: string;
  UserID: number;
  JobseekerName: string;
  Jobseeker_Profile_IMG: string;
  CategoryName: string;
  OccupationName: string;
  Title: string;
  UploadDate: string;
  VillageName: string;
  DistrictName: string;
  ProvinceName: string;
}

//send job request
interface SendRequestState {
  senderId: number | undefined
  receiverImg: string;
  receiverId: number | undefined;
  jobId: number | undefined;
  receiverName: string;
  jobTitle: string;
  category: string,
  type: string,
}
const initialState: SendRequestState = {
  senderId: undefined,
  receiverImg: '',
  receiverId: undefined,
  jobId: undefined,
  receiverName: '',
  jobTitle: '',
  category: '',
  type: '',
};


//send job invitation 
interface SendInvitation {
  senderId: number | undefined
  // jobData: jobData | [],
  cvData: CVData[] | [],
}
const initialInvite: SendInvitation = {
  senderId: undefined,
  // jobData: [],
  cvData: [],
};

function HomePage() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<jobData[]>([]);
  const [cvData, setCvData] = useState<CVData[]>([]);
  const [selectedJOB, setselectedJOB] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { theme } = useTheme();
  const myID = localStorage.getItem('ID')
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  // toggle send job request and job invitation
  const [isOpenJobReq, setIsOpenJobReq] = useState(false);
  const [isOpenJobInvite, setIsOpenJobInvite] = useState(false);
  const [dataList, setDataList] = useState<SendRequestState>(initialState);
  const [invitationList, setInvitationList] = useState<SendInvitation>(initialInvite);
  const [senderID, setSenderID] = useState<number>();
  const [showPopupCV, setShowPopupCV] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CVData | null>();
  const [JobseekerID, setJobseekerID] = useState<any>(null);
  const [EmployerID, setEmployerID] = useState<any>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPopup(false);
        setselectedJOB(null);
        setSelectedCV(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const UserID = localStorage.getItem('ID');
    if (UserID) {
      setSenderID(parseInt(UserID));
    }
  }, [])

  // job request
  const handleSetData = async (emp_img: string, emp_id: number, job_id: number, emp_name: string, job_title: string, category: string,
    type: string,) => {
    setDataList({
      senderId: senderID,
      receiverImg: emp_img,
      receiverId: emp_id,
      jobId: job_id,
      receiverName: emp_name,
      jobTitle: job_title,
      category: category,
      type: type,
    });
  }

  const handleIsOpenJobRequest = () => {
    setIsOpenJobReq(true)
    closePopupJOB();
    closePopupCV();
  }
  const closeToggleJobRequest = () => {
    setIsOpenJobReq(false)
  }

  //job invitation
  const handleSetDataInvitation = async (cvData: CVData[]) => {
    setInvitationList({
      senderId: senderID,
      cvData: cvData
    })
    console.log("show me cv list", cvData)
  }

  const handleIsOpenJobInvite = () => {
    setIsOpenJobInvite(true)
    closePopupJOB();
    closePopupCV();
  }
  const closeToggleJobInvite = () => {
    setIsOpenJobInvite(false)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/viewjobhome');
        setJobData(response.data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CVData[]>('http://localhost:3001/viewcvhome');
        setCvData(response.data);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditCv = (cvID: number) => {
    if (typeof cvID === 'number') {
      navigate(`/editCv/${cvID}`);
    } else {
      console.error('Invalid jobID:', cvID);
    }
  };

  const handleEditJob = (jobID: number) => {
    if (typeof jobID === 'number') {
      navigate(`/editJob/${jobID}`);
    } else {
      console.error('Invalid jobID:', jobID);
    }
  };



  const handleCardClickCV = (cv: CVData) => {
    setJobseekerID(cv.JobseekerID);
    console.log("show select cv", cv);
    setSelectedCV(cv);
    setShowPopup(true);
  };


  const closePopupCV = () => {
    setShowPopup(false);
    setSelectedCV(null);
  };

  const handleCardClickJOB = (job: any) => {
    console.log("show select job", job)
    setEmployerID(job.EmployerID);
    setselectedJOB(job);
    setShowPopup(true);
  };

  const closePopupJOB = () => {
    setShowPopup(false);
    setselectedJOB(null);
  };


  const openFullScreen = (imageUrl: string) => {
    const fullScreenImage = document.getElementById('fullScreenImage');
    if (fullScreenImage) {
      fullScreenImage.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          fullScreenImage.requestFullscreen().catch((err) => {
            console.error('Error attempting to enable full screen:', err);
          });
        } else {
          document.exitFullscreen().catch((err) => {
            console.error('Error attempting to exit full screen:', err);
          });
        }
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const openProfileCV = async (jobseekerID: number) => {
    try {
      const response = await axios.post('http://localhost:3001/viewjobseeker_byid', { jobseekerID });
      const jobseekerData = response.data.data[0];
      navigate(`/profile/${jobseekerData.JobseekerID}`);
    } catch (error) {
      console.error('Error fetching jobseeker data:', error);
    }
  };

  const openProfileJOB = async (EmployerID: number) => {
    try {
      const response = await axios.post('http://localhost:3001/viewemployer_byid', { employerID: EmployerID }); // Change EmployerID to employerID
      const employerData = response.data.data[0];
      navigate(`/EmpProfile/${employerData.EmployerID}`); // Change employerData.employerID to employerData.EmployerID
      console.log('employerID: ', employerData.EmployerID); // Change EmployerID to employerData.EmployerID
    } catch (error) {
      console.error('Error fetching employer data:', error);
    }
  };


  const handleJobBookmark = async (JobID: number) => {
    const UserID = localStorage.getItem('UserID');

    // Check if UserID is available
    if (!UserID) {
      console.error('UserID is not available.');
      return;
    }

    try {
      // Check if the job is already bookmarked
      const checkResponse = await fetch(`http://localhost:3001/checkbookmarkjob?UserID=${UserID}&JobID=${JobID}`);
      const checkData = await checkResponse.json();

      if (checkData.error) {
        console.error('Failed to check bookmark.');
        return;
      }

      // If the job is already bookmarked, remove the bookmark
      if (checkData.bookmarked) {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to remove this bookmark?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Send request to remove bookmark
            const deleteResponse = await fetch(`http://localhost:3001/removebookmarkjob?UserID=${UserID}&JobID=${JobID}`, {
              method: 'DELETE'
            });
            const deleteData = await deleteResponse.json();

            if (deleteData.error) {
              console.error('Failed to remove bookmark.');
              return;
            }

            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Your bookmark has been removed.",
              icon: "success"
            });
          }
        });
      } else {
        // If the job is not bookmarked, add the bookmark
        const addResponse = await fetch(`http://localhost:3001/addbookmarkjob`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ UserID, JobID })
        });
        const addData = await addResponse.json();

        if (addData.error) {
          console.error('Failed to add bookmark.');
          return;
        }

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Save this job to your Bookmark",
          showConfirmButton: false,
          timer: 1500
        });

        console.log('Bookmark added successfully.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }


  const handleCvBookmark = async (CvID: number) => {
    const UserID = localStorage.getItem('UserID');

    // Check if UserID is available
    if (!UserID) {
      console.error('UserID is not available.');
      return;
    }

    try {
      // Check if the CV is already bookmarked
      const checkResponse = await fetch(`http://localhost:3001/checkbookmarkcv?UserID=${UserID}&CvID=${CvID}`);
      const checkData = await checkResponse.json();

      if (checkData.error) {
        console.error('Failed to check bookmark.');
        return;
      }

      // If the CV is already bookmarked, show confirmation dialog to remove bookmark
      if (checkData.bookmarked) {
        Swal.fire({
          title: "Are you sure?",
          text: "You want to remove this bookmark?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Send request to remove bookmark
            const deleteResponse = await fetch(`http://localhost:3001/removebookmarkcv?UserID=${UserID}&CvID=${CvID}`, {
              method: 'DELETE'
            });
            const deleteData = await deleteResponse.json();

            if (deleteData.error) {
              console.error('Failed to remove bookmark.');
              return;
            }

            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Your bookmark has been removed.",
              icon: "success"
            });
          }
        });
      } else {
        // If the CV is not bookmarked, add the bookmark
        const addResponse = await fetch(`http://localhost:3001/bookmarkcv`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ UserID, CvID })
        });
        const addData = await addResponse.json();

        if (addData.error) {
          console.error('Failed to add bookmark.');
          return;
        }

        Swal.fire({
          position: "top",
          icon: "success",
          title: "Save this job to your Bookmark",
          showConfirmButton: false,
          timer: 1500
        });

        console.log('Bookmark added successfully.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }





  return (
    <html data-theme={theme}>
      <div className='mx-10 font-notoLao'>
        <SetNavbar />
        <center>
          <main className='container mx-auto'>
            <div className='w-full bg-slate-200 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
              <p className='p-2 font-bold'>ວຽກແນະນຳ</p>
            </div>
            <div className='mx-auto  grid grid-cols-4 justify-items-center gap-1'>
            </div>
            <div className='grid grid-cols-4 justify-items-center gap-2 items-center mt-2 mb-6 box-border center'>

              {jobData.map((job: any) => (
                <div className='bg-black bg-opacity-10 rounded-2xl p-0.5 shadow-xl  w-full max-w-full h-full max-h-min  '>
                  <div className="card w-full max-w-full h-full max-h-min bg-base-300 card-bordered shadow-lg  hover:shadow-purple-400 duration-700 cursor-pointer" key={job.JobID} onClick={() => handleCardClickJOB(job)}>
                    <figure className='h-52'>
                      {job.Post_IMG && <img className='object-cover w-full h-full max-h-min' src={job.Post_IMG} alt="IMG_JOB" />}
                    </figure>
                    <div className="card-body w-full">
                      <div>
                        {job.Employer_Profile_IMG
                          ? <img className='w-14 h-14 -mt-16 border-2 rounded-full' src={job.Employer_Profile_IMG} alt="Profile_IMG" />
                          : <img className='w-14 h-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                        }
                      </div>
                      <div className=''>
                        <h2 className="card-title"><b>{job.CompanyName}</b></h2>
                        <p className='text-left'><b>{job.Title}</b></p>
                        <p className='text-left'>
                          <b>ເງິນເດືອນ :</b> {job.SalaryStart.toLocaleString()} - {job.SalaryMax.toLocaleString()} LAK
                        </p>
                        <p className='text-left'><b>ປະເພດອາຊີບ :</b> {job.CategoryName}/{job.OccupationName}</p>
                        <p className='text-left'>
                          <b>ທີ່ຢູ່ :</b>
                          {job.VillageName
                            ? `${job.VillageName}/${job.DistrictName}/${job.ProvinceName}`
                            : ' ບໍ່ລະບຸ'
                          }
                        </p>
                        <div className='grid grid-cols-2 pt-1'>
                          <p className='text-left text-xs col-span-1'><b>ວັນທີ່ອັບໂຫລດ :</b> {job.PostDate ? formatDate(job.PostDate) : 'N/A'}</p>
                          <p className='text-left text-xs col-span-1'><b>ປະເພດຫນ້າວຽກ :</b> {job.WorkType}</p></div>
                      </div>
                      <div className="w-full card-actions max-h-full h-full flex items-end">
                        <button className="w-full btn btn-primary bg-purple-600" onClick={() => handleSetData(job.Employer_Profile_IMG, job.EmployerID, job.JobID, job.CompanyName, job.OccupationName, job.CategoryName, job.WorkType)}>ເບິ່ງລາຍລະອຽດ</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


            </div>
            <button onClick={() => navigate('/Findjob')} className="btn btn-block mt-1 bg-base-300 shadow-xl hover:bg-purple-700 hover:text-white">ລະແດງວຽກທັງຫມົດ<img className='w-5' src="Icon/arrowhead.png" alt="" /></button>


            <div className='w-full  bg-purple-800 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
              <p className='p-2  font-bold'>ພະນັກງານແນະນຳ</p>
            </div>

            <div className='grid grid-cols-4 justify-items-center gap-2 items-center mt-2 mb-6 box-border center space-2'>
              {cvData.map((cv: CVData) => (
                <div className='bg-black bg-opacity-10 rounded-2xl p-0.5 shadow-xl w-full max-w-full h-full max-h-min'>
                  <div className="card w-full max-w-full h-full max-h-min bg-base-300 card-bordered shadow-lg  hover:shadow-purple-400 duration-700 cursor-pointer" key={cv.CvID} onClick={() => handleCardClickCV(cv)}>
                    <figure className='h-52'>
                      {cv.IMG_CV && <img className=' object-cover w-full h-full max-h-min' src={cv.IMG_CV} alt="IMG_CV" />}
                    </figure>
                    <div className="card-body w-full basic-full">
                      <div>
                        {cv.Jobseeker_Profile_IMG != ''
                          ? <img className='w-14 h-14 -mt-16 border-2 rounded-full bg-white' src={cv.Jobseeker_Profile_IMG} alt="Profile_IMG" />
                          : <img className='w-14 h-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                        }
                      </div>
                      <div className=''>
                        <h2 className="card-title"><b>{cv.JobseekerName}</b></h2>
                        <p className='text-left'><b>{cv.Title}</b></p>
                        <p className='text-left'><b>ປະເພດອາຊີບ :</b> {cv.CategoryName}/{cv.OccupationName}</p>
                        <p className='text-left'><b>ທີ່ຢູ່ :</b> {cv.VillageName}/{cv.DistrictName}/{cv.ProvinceName}</p>
                        <p className='text-left'><b>ວັນທີ່ອັບໂຫຼດ :</b> {cv.UploadDate ? formatDate(cv.UploadDate) : 'N/A'}</p>
                      </div>
                      <div className="w-full max-h-full h-full flex card-actions items-end">
                        <button className="w-full btn btn-primary bg-purple-600" onClick={() => handleSetDataInvitation(cvData)}>ເບິ່ງລາຍລະອຽດ</button>
                      </div>
                    </div>
                  </div>
                  {/* <button className="w-full btn btn-primary bg-purple-600" onClick={() => handleIsOpenJobRequest(cv.Jobseeker_Profile_IMG,cv.Cv)}>Apply</button> */}

                </div>
              ))}

            </div>

            <button onClick={() => navigate('/FindEmployee')} className="btn btn-block mt-1 bg-base-300 shadow-xl hover:bg-purple-700 hover:text-white">ສະແດງພະນັກງານທັງໝົດ<img className='w-5' src="Icon/arrowhead.png" alt="" /></button>
          </main>

          {/* Is Open job Request or not */}
          {isOpenJobReq && (
            <div className='absolute'>
              <JobRequest isOpen={isOpenJobReq} isClose={closeToggleJobRequest} senderId={dataList.senderId} receiverImg={dataList.receiverImg} receiverId={dataList.receiverId} jobId={dataList.jobId} receiverName={dataList.receiverName} jobTitle={dataList.jobTitle} category={dataList.category} type={dataList.type} />
            </div>
          )}

          {/* Is Open Job Invitation or not  */}
          {isOpenJobInvite && (
            <div className='absolute'>
              <JobInvitation isOpen={isOpenJobInvite} isClose={closeToggleJobInvite} employerID={invitationList.senderId} dataList={invitationList.cvData} />
            </div>
          )}

          {selectedJOB && (
            <dialog id="my_modal_4" className="modal" open>
              <div className="modal-box w-11/12 max-w-7xl bg-base-100 border-2 border-white/10">
                <button className="btn btn-xl btn-circle btn-ghost absolute right-1 top-1" onClick={closePopupJOB}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-red-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>

                </button>

                <div className='grid grid-cols-2 -m-5'>
                  <div className='col-span-2 w-full text-3xl py-2 rounded-t-2xl bg-base-300'>ລາຍລະອຽດວຽກ</div>
                  <div className=' rounded-2xl '>
                    <figure className='w-full'>
                      <div className="card w-75 bg-base-100 shadow-xl" key={selectedJOB.JobID} onClick={() => handleCardClickJOB(selectedJOB)}>
                        <img id="fullScreenImage" className='object-cover w-full max-h-96 transition duration-300 hover:scale-105 cursor-zoom-in justify-self-center self-center flex' src={selectedJOB.Post_IMG} alt="IMG_CV" onClick={() => openFullScreen(selectedJOB.Post_IMG)} />
                      </div>
                    </figure>
                  </div>

                  <div className="card-body bg-base-200 ">
                    <div className='w-full flex justify-self-end justify-items-end justify-end bg-white -mt-7 ml-7'>
                    </div>
                    <div className='flex drop-shadow-xl py-2 rounded-full'>
                      <div className='grid col-span-1 justify-start justify-items-start items-start '>
                        {selectedJOB.Employer_Profile_IMG
                          ? <img className='w-14 h-14 border-2 rounded-full' src={selectedJOB.Employer_Profile_IMG} alt="Profile_IMG" />
                          : <img className='w-14 h-14 border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                        }
                      </div>
                      <h2 className="card-title text-justify col-span-4 pl-3"><b>{selectedJOB.CompanyName}</b></h2>
                    </div>
                    <p className='text-left'><b>ຫົວຂໍ້ວຽກ : {selectedJOB.Title}</b></p>
                    <p className='text-left'><b><u>ລາຍລະອຽດ</u></b> : {selectedJOB.Description}</p>
                    <p className='text-left'>
                      <u><b>ເງິນເດືອນ</b></u> : {selectedJOB.SalaryStart.toLocaleString()} - {selectedJOB.SalaryMax.toLocaleString()} ກີບ
                    </p>
                    <p className='text-left'><u><b>ປະເພດວຽກ</b></u>  : {selectedJOB.CategoryName}/{selectedJOB.OccupationName}</p>
                    <p className='text-left'>
                      <u><b>ທີ່ຢູ່</b></u> : {selectedJOB.VillageName
                        ? `${selectedJOB.VillageName}/${selectedJOB.DistrictName}/${selectedJOB.ProvinceName}`
                        : ' ບໍ່ລະບຸ'
                      }
                    </p>
                    <p className='text-left'><u><b>ປະເພດວຽກ</b></u> : {selectedJOB.WorkType}</p>
                    <p className='text-left'><u><b>ວັນທີ່ປະກາດ</b></u> : {selectedJOB.PostDate ? formatDate(selectedJOB.PostDate) : 'N/A'}</p>
                    <div className="card-actions justify-end">

                      {myID == EmployerID && (
                        <button className='btn btn-primary' onClick={() => handleEditJob(selectedJOB.JobID)}>ແກ້ໄຂວຽກ</button>
                      )}

                      {myID != EmployerID && (
                        <>
                          <button className="btn btn-primary" onClick={() => handleJobBookmark(selectedJOB.JobID)}>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                          </button>

                          <button className="btn btn-primary" onClick={() => navigate(`/NewChat_Page/${selectedJOB.UserID}`)}>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                              <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                          </button>

                          <button className="btn btn-primary">ສະໝັກວຽກ</button>
                          <button className="btn btn-primary" onClick={() => openProfileJOB(selectedJOB.EmployerID)}>ເບິ່ງໂປຣຟາຍ</button>
                        </>
                      )}

                    </div>
                  </div>
                  <div className='col-span-2 w-full text-white text-3xl py-6 rounded-b-2xl bg-base-300'></div>
                </div>


              </div>
            </dialog>
          )}


{selectedCV && (
                <dialog id="my_modal_3" className="modal" open>
                  <div className="modal-box w-11/12 max-w-7xl bg-base-100 border-2 border-white/10">
                    <button className="btn btn-xl btn-circle btn-ghost absolute right-1 top-1" onClick={closePopupCV}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-red-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </button>

                    <div className='grid grid-cols-2 -m-5'>
                      <div className='col-span-2 w-full text-3xl py-2 rounded-t-2xl bg-base-300'>ລາຍລະອຽດວຽກ</div>
                      <figure className='w-full'>
                        <div className="card w-75 bg-base-100 shadow-xl" key={selectedCV.CvID} onClick={() => handleCardClickCV(selectedCV)}>
                          <img id="fullScreenImage" className='object-cover w-full max-h-96 transition duration-300 hover:scale-105 cursor-zoom-in justify-self-center self-center flex' src={selectedCV.IMG_CV} alt="IMG_CV" onClick={() => openFullScreen(selectedCV.IMG_CV)} />
                        </div>
                      </figure>

                      <div className="card-body bg-base-200 flex">
                        <div className='w-full flex justify-items-end'>
                          <div className='grid col-span-1 justify-start justify-items-start items-start '>
                            {selectedCV.Jobseeker_Profile_IMG
                              ? <img className='w-14  border-2 rounded-full' src={selectedCV.Jobseeker_Profile_IMG} alt="Profile_IMG" />
                              : <img className='w-14  border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                            }
                          </div>
                          <h2 className="card-title ml-5 text-justify col-span-4"><b>{selectedCV.JobseekerName}</b></h2>
                        </div>

                        <div className='flex flex-col mt-5'>
                          <p className='text-left'><b><u>ຫົວຂໍ້</u></b> : {selectedCV.Title}</p>
                          <p className='text-left'><u><b>ປະເພດອາຊີບ</b></u> : {selectedCV.CategoryName}/{selectedCV.OccupationName}</p>
                          <p className='text-left'><u><b>ທີ່ຢູ່</b></u> : {selectedCV.VillageName
                            ? `${selectedCV.VillageName}/${selectedCV.DistrictName}/${selectedCV.ProvinceName}`
                            : ' ບໍ່ລະບຸ'
                          }</p>
                          <p className='text-left'><u><b>ວັນທີ່ປະກາດ</b></u> : {selectedCV.UploadDate ? formatDate(selectedCV.UploadDate) : 'N/A'}</p>
                        </div>

                        <div className="card-actions flex justify-end h-full items-end">
                          {myID == JobseekerID && (
                            <button className='btn btn-primary' onClick={() => handleEditCv(selectedCV.CvID)}>Edit Cv</button>
                          )}

                          {myID != JobseekerID && (
                            <>
                              <button className="btn btn-primary" onClick={() => handleCvBookmark(selectedCV.CvID)}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                              </button>
                              <button className="btn btn-primary" onClick={() => navigate(`/NewChat_Page/${selectedCV.UserID}`)}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                              </button>
                              <button className="btn btn-primary">Apply</button>
                              <button className="btn btn-primary" onClick={() => openProfileCV(selectedCV.JobseekerID)}>View Profile</button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='col-span-2 w-full text-white text-3xl py-6 rounded-b-2xl bg-base-300'></div>
                    </div>
                  </div>
                </dialog>
              )}




        </center>
        <Footer />
      </div>
    </html>

  )
}

export default HomePage