import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import '../css/animation_HomePage.css'
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
// import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { SpinnerColors } from './spinner';
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'

interface jobData {
  JobID: number;
  JobseekerID: number;
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




function HomePage() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<jobData[]>([]);
  const [cvData, setCvData] = useState<CVData[]>([]);
  const [selectedJOB, setselectedJOB] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<jobData[]>('http://localhost:3001/viewjobhome');
        setJobData(response.data);
        console.log(jobData);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CVData[]>('http://localhost:3001/viewcvhome');
        setCvData(response.data);
        console.log(cvData);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchData();
  }, []);


  const [showPopupCV, setShowPopupCV] = useState(false);
  const [selectedCV, setSelectedCV] = useState<any>(null);

  const handleCardClickCV = (cv: any) => {
    setSelectedCV(cv);
    setShowPopup(true);
  };

  const closePopupCV = () => {
    setShowPopup(false);
    setSelectedCV(null);
  };

  const handleCardClickJOB = (cv: any) => {
    setselectedJOB(cv);
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



  return (
    <html data-theme={theme}>
      <div className='mx-10'>
        <SetNavbar />
        <center>
          <main className='container mx-auto'>
            <div className='w-full bg-slate-200 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
              <p className='p-2 font-bold'>Work Reccommend</p>
            </div>
            <div className='mx-auto  grid grid-cols-4 justify-items-center gap-1'>


            </div>
            <div className='grid grid-cols-4 justify-items-center gap-1 items-center mt-2 mb-6 box-border center'>

              {jobData.map((job: any) => (
                <div className="card w-full max-w-full h-full max-h-min  bg-base-300 shadow-lg  hover:shadow-purple-400 duration-700 cursor-pointer" key={job.JobID} onClick={() => handleCardClickJOB(job)}>
                  <figure className='h-52'>
                    {job.Post_IMG && <img className=' bg-corver h-full max-h-min' src={job.Post_IMG} alt="IMG_JOB" />}
                  </figure>
                  <div className="card-body w-full">
                    <div>
                      {job.Employer_Profile_IMG
                        ? <img className='w-14 -mt-16 border-2 rounded-full' src={job.Employer_Profile_IMG} alt="Profile_IMG" />
                        : <img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                      }
                    </div>
                    <div className=''>
                      <h2 className="card-title"><b>{job.CompanyName}</b></h2>
                      <p className='text-left'><b>{job.Title}</b></p>
                      <p className='text-left'>
                        <b>Salary :</b> {job.SalaryStart.toLocaleString()} - {job.SalaryMax.toLocaleString()} LAK
                      </p>
                      <p className='text-left'><b>Work category :</b> {job.CategoryName}/{job.OccupationName}</p>
                      <p className='text-left'>
                        <b>Location :</b>
                        {job.VillageName
                          ? `${job.VillageName}/${job.DistrictName}/${job.ProvinceName}`
                          : ' ບໍ່ລະບຸ'
                        }
                      </p>
                      <div className='grid grid-cols-2 pt-1'>
                        <p className='text-left text-xs col-span-1'><b>Posted:</b> {job.PostDate ? formatDate(job.PostDate) : 'N/A'}</p>
                        <p className='text-left text-xs col-span-1'><b>Work type:</b> {job.WorkType}</p></div>
                    </div>
                    <div className="w-full card-actions max-h-full h-full flex items-end">
                      <button className="w-full btn btn-primary bg-purple-600">View</button>
                    </div>
                  </div>
                </div>
              ))}


            </div>
            <button onClick={() => navigate('/Findjob')} className="btn btn-block mt-1 bg-base-300 shadow-xl hover:bg-purple-700 hover:text-white">View All Job <img className='w-5' src="Icon/arrowhead.png" alt="" /></button>


            <div className='w-full bg-slate-200 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
              <p className='p-2  font-bold'>Empolyee Reccommend</p>
            </div>



            <div className='grid grid-cols-4 justify-items-center gap-1 items-center mt-2 mb-6 box-border center'>
              {cvData.map((cv: any) => (
                <div className="card w-full max-w-full h-full max-h-min  bg-base-300 shadow-lg  hover:shadow-purple-400 duration-500 cursor-pointer" key={cv.CvID} onClick={() => handleCardClickCV(cv)}>
                  <figure className='h-52'>
                    {cv.IMG_CV && <img className='bg-cover h-full max-h-min' src={cv.IMG_CV} alt="IMG_CV" />}
                  </figure>
                  <div className="card-body w-full basic-full">
                    <div>
                      {cv.Jobseeker_Profile_IMG && <img className='w-14 -mt-16 border-2 rounded-full' src={cv.Jobseeker_Profile_IMG} alt="Profile_IMG" />}
                    </div>
                    <div className=''>
                      <h2 className="card-title"><b>{cv.JobseekerName}</b></h2>
                      <p className='text-left'><b>{cv.Title}</b></p>
                      <p className='text-left'>Work category: {cv.CategoryName}/{cv.OccupationName}</p>
                      <p className='text-left'>Location: {cv.VillageName}/{cv.DistrictName}/{cv.ProvinceName}</p>
                      <p className='text-left'>Posted: {cv.UploadDate ? formatDate(cv.UploadDate) : 'N/A'}</p>
                    </div>
                    <div className="w-full max-h-full h-full flex card-actions items-end">
                      <button className="w-full btn btn-primary bg-purple-600">Apply</button>
                    </div>
                  </div>
                </div>
              ))}

            </div>
            <button onClick={() => navigate('/FindEmployee')} className="btn btn-block mt-1 bg-base-300 shadow-xl hover:bg-purple-700 hover:text-white">View All Employee <img className='w-5' src="Icon/arrowhead.png" alt="" /></button>
          </main>


          {selectedJOB && (
            <dialog id="my_modal_3" className="modal" open>
              <div className="modal-box ">
                <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopupJOB}>✕</button>
                <div className='bg-stone-800 rounded-2xl py-10'>
                  <figure className='w-40'>
                    <div className="card w-75 bg-base-100 shadow-xl" key={selectedJOB.JobID} onClick={() => handleCardClickJOB(selectedJOB)}>
                      <img id="fullScreenImage" className='bg-cover rounded-2xl hover:scale-110 transition duration-300' src={selectedJOB.Post_IMG} alt="IMG_CV" onClick={() => openFullScreen(selectedJOB.Post_IMG)} />
                    </div>
                  </figure>
                </div>
                <div className="card-body bg-stone-800  rounded-2xl">
                  <div className='w-full flex justify-self-end justify-items-end justify-end -mt-7 ml-7'>
                  </div>
                  <div className='grid grid-cols-5 bg-emerald-900 py-2 px-3 -mt-4 rounded-full'>
                    <div className='grid col-span-1 justify-start justify-items-start items-start '>
                      {selectedJOB.Employer_Profile_IMG
                        ? <img className='w-14  border-2 rounded-full' src={selectedJOB.Employer_Profile_IMG} alt="Profile_IMG" />
                        : <img className='w-14  border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                      }
                    </div>
                    <h2 className="card-title text-justify col-span-4"><b>{selectedJOB.CompanyName}</b></h2>
                  </div>
                  <p className='text-left'><b>{selectedJOB.Title}</b></p>
                  <p className='text-left'>{selectedJOB.Description}</p>
                  <p className='text-left'>
                    <u>Salary</u> : {selectedJOB.SalaryStart.toLocaleString()} - {selectedJOB.SalaryMax.toLocaleString()} LAK
                  </p>
                  <p className='text-left'><u>Work category</u>  : {selectedJOB.CategoryName}/{selectedJOB.OccupationName}</p>
                  <p className='text-left'>
                    <u>Location</u> :
                    {selectedJOB.VillageName
                      ? `${selectedJOB.VillageName}/${selectedJOB.DistrictName}/${selectedJOB.ProvinceName}`
                      : ' ບໍ່ລະບຸ'
                    }
                  </p>
                  <p className='text-left'><u>Work type:</u> {selectedJOB.WorkType}</p>
                  <p className='text-left'><u>Posted</u> : {selectedJOB.PostDate ? formatDate(selectedJOB.PostDate) : 'N/A'}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Apply</button>
                    <button className="btn btn-primary" onClick={() => openProfileJOB(selectedJOB.EmployerID)}>View Profile</button>
                  </div>
                </div>
              </div>
            </dialog>
          )}


          {selectedCV && (
            <dialog id="my_modal_3" className="modal" open>
              <div className="modal-box">
                <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopupCV}>✕</button>
                <div className='bg-stone-800 rounded-2xl py-10'>
                  <figure className='w-40'>
                    <div className="card w-75 bg-base-100 shadow-xl" key={selectedCV.CvID} onClick={() => handleCardClickCV(selectedCV)}>
                      <img id="fullScreenImage" className='bg-cover rounded-2xl hover:scale-110 transition duration-300' src={selectedCV.IMG_CV} alt="IMG_CV" onClick={() => openFullScreen(selectedCV.IMG_CV)} />
                    </div>
                  </figure>
                </div>
                <div className="card-body bg-stone-800  rounded-2xl">
                  <div className='grid grid-cols-5 bg-emerald-900 py-2 px-3 -mt-4 rounded-full'>
                    <div className='grid col-span-1 justify-start justify-items-start items-start '>
                      {selectedCV.Jobseeker_Profile_IMG
                        ? <img className='w-14  border-2 rounded-full' src={selectedCV.Jobseeker_Profile_IMG} alt="Profile_IMG" />
                        : <img className='w-14  border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                      }
                    </div>
                    <h2 className="card-title text-justify col-span-4"><b>{selectedCV.JobseekerName}</b></h2>
                  </div>
                  <p className='text-left'><b>{selectedCV.Title}</b></p>
                  <p className='text-left'><u>Work category:</u> {selectedCV.CategoryName}/{selectedCV.OccupationName}</p>
                  <p className='text-left'><u>Location:</u> {selectedCV.VillageName}/{selectedCV.DistrictName}/{selectedCV.ProvinceName}</p>
                  <p className='text-left'><u>Posted:</u> {selectedCV.UploadDate ? formatDate(selectedCV.UploadDate) : 'N/A'}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Apply</button>
                    <button className="btn btn-primary" onClick={() => openProfileCV(selectedCV.JobseekerID)}>View Profile</button>
                  </div>
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