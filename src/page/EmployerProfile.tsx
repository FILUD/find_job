import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import SetNavbar from '../component/navbar/SetNavbar';
// import '../css/EmpProfile.css'

interface jobDetail {
  JobID: number,
  Job_Post_IMG: number,
  Employer_Profile_IMG: string,
  CompanyName: string,
  Title: string,
  Description: string,
  SalaryStart: number,
  SalaryMax: number,
  PostDate: string,
  OccupationName: string,
  CategoryName: string,
  WorkType: string,
}

interface profileData {
  EmployerID: number,
  UserID: number,
  CompanyName: string,
  ProfessionalTitle: string,
  Tel: string,
  Profile_IMG: string,
  VillageName: string,
  DistrictName: string,
  ProvinceName: string,
  Email: string,
}

function EmpProfile() {

  const { employerID } = useParams();
  const [profileData, setProfileData] = useState<profileData | null>(null);
  const [jobDetail, setJobDetail] = useState<jobDetail[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJOB, setselectedJOB] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/viewemployer_byid', { employerID });
        setProfileData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [employerID]);

  useEffect(() => {
    const fetchJOBDetail = async () => {
      try {
        const response = await axios.post('http://localhost:3001/viewjob_byid', { employerID });
        if (response.data && response.data.length > 0) {
          setJobDetail(response.data);
          console.log(setJobDetail);
        } else {
          console.error('No JOB details found for this jobseeker.');
        }
      } catch (error) {
        console.error('Error fetching JOB detail:', error);
      }
    };

    fetchJOBDetail();
  }, [employerID]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleCardClick = (cv: any) => {
    setselectedJOB(cv);
    setShowPopup(true);
  };

  const closePopup = () => {
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

  if (!profileData || jobDetail.length === 0) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <SetNavbar />
      <div className='container mt-5 mx-auto'>
        <div className='grid grid-cols-3 gap-2'>
          {/* Profile Information */}
          <div className='p-20 grid bg-zinc-900 rounded-3xl justify-items-center justify-center'>
            {/* Profile Image */}
            {profileData.Profile_IMG ? (
              <img className='bg-cover w-56 rounded-full border-2 border-slate-50' src={profileData.Profile_IMG} alt="Profile" />
            ) : (
              <img className='bg-cover w-56 rounded-full border-2 border-slate-50' src="/Icon/profile.png" alt="Default Profile" />
            )}
            <h1 className='pt-5 pb-5 text-center'>{profileData.CompanyName}</h1>
            {/* Profile Details */}
            <div className='px-10'>
              <p className='text-left'><b>Email:</b> {profileData.Email}</p>
              <p className='text-left'><b>Tel:</b>
                {profileData.Tel
                  ? `${profileData.Tel}`
                  : ' ບໍ່ລະບຸ'
                }</p>
              <p className='text-left'><b>Address:</b>
                {profileData.VillageName
                  ? `${profileData.VillageName}/${profileData.DistrictName}/${profileData.ProvinceName}`
                  : ' ບໍ່ລະບຸ'
                }
              </p>
            </div>


          </div>

          {/* Professional Title and Description */}
          <div className='grid bg-zinc-900 rounded-3xl justify-items-center justify-center'>
            <div className='bg-slate-50 card w-96 my-5'>
              <p className='w-full bg-slate-700 rounded-t-2xl text-center'><b>Professional Title:</b> </p>
              <p className='px-10 text-slate-950'>
                {profileData.ProfessionalTitle
                  ? `${profileData.ProfessionalTitle}`
                  : ' ບໍ່ລະບຸ'
                }</p>
            </div>
            {/* <div className='bg-slate-50 card w-96 my-5'>
              <p className='w-full bg-slate-700 rounded-t-2xl text-center'><b>Description:</b> </p>
              <p className='px-10 text-slate-950'>{profileData.Description}</p>
            </div> */}
          </div>

          <div className='grid bg-zinc-900 rounded-3xl justify-items-center justify-center' style={{ overflowY: 'auto' }}>

            {jobDetail && (
              <div>
                <div className='bg-slate-700 rounded-t-2xl py-1'>
                  <h2 className='text-center'>CV</h2>
                </div>



                {jobDetail.map((job: any) => (
                  <div key={job.JobID} onClick={() => handleCardClick(job)} className='grid grid-cols-3 bg-slate-700 rounded-2xl my-2 mx-1'>
                    <figure className='col-span-1 p-5 rounded-xl '>
                      {job.Job_Post_IMG && <img className='bg-cover rounded-xl' src={job.Job_Post_IMG} alt="Image job" />}
                    </figure>

                    <div className='col-span-2 py-5'>
                      <p>Title: {job.Title}</p>
                      <p>Occupation : {job.SalaryStart} - {job.SalaryMax} LAK</p>
                      <p className='text-left'>Posted: {job.PostDate ? formatDate(job.PostDate) : 'N/A'}</p>
                      <p>Occupation : {job.OccupationName}</p>
                      <p>Category : {job.CategoryName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}


            {selectedJOB && (
              <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box">
                  <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopup}>✕</button>
                  <div className='bg-stone-800 rounded-2xl py-10 justify-center justify-items-center grid'>
                    <figure className='w-40 '>
                      <div className="card w-75 bg-base-100 shadow-xl" key={selectedJOB.JobID} onClick={() => handleCardClick(selectedJOB)}>
                        <img id="fullScreenImage" className='bg-cover rounded-2xl' src={selectedJOB.Job_Post_IMG} alt="IMG_CV" onClick={() => openFullScreen(selectedJOB.Job_Post_IMG)} />
                      </div>
                    </figure>
                  </div>
                  <div className="card-body bg-stone-800  rounded-2xl">
                    <div className='w-full flex justify-self-end justify-items-end justify-end -mt-7 ml-7'>
                    </div>
                    <p className='text-left'><b>{selectedJOB.Title}</b></p>
                    <p className='text-left'><u>Salaty : </u>{selectedJOB.SalaryStart} - {selectedJOB.SalaryMax}</p>
                    <p className='text-left'><u>Description : </u>{selectedJOB.Description}</p>
                    <p className='text-left'><u>Occupation : </u>{selectedJOB.OccupationName}</p>
                    <p className='text-left'><u>Work category : </u> {selectedJOB.CategoryName}</p>
                    <p className='text-left'><u>Posted: </u>{selectedJOB.PostDate ? formatDate(selectedJOB.PostDate) : 'N/A'}</p>
                    <p className='text-left'><u>WorkType : </u> {selectedJOB.WorkType}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Apply</button>
                    </div>
                  </div>
                </div>
              </dialog>
            )}


          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EmpProfile