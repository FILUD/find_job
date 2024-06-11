import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'
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
  const { theme } = useTheme();

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
    <html data-theme={theme}>
      <div className='font-notoLao'>
        <SetNavbar />
        <div className='container mt-5 mx-auto px-10 '>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-3 bg-purple-900 p-3 text-center rounded-lg'>
              <p className='text-white text-xl'>ໂປຣຟາຍ ຜູ້ຮັບສະໝັກ</p></div>

            <div className='p-3 pt-10 flex flex-col col-span-1 justify-start bg-base-300 rounded-3xl justify-items-center'>
              <div className='flex justify-center'>
                {profileData.Profile_IMG ? (
                  <img className='bg-cover w-36 h-36 rounded-full border-2 border-slate-50' src={profileData.Profile_IMG} alt="Profile" />
                ) : (
                  <img className='bg-cover w-36 h-36 rounded-full border-2 border-slate-50' src="/Icon/profile.png" alt="Default Profile" />
                )}
              </div>

              <h1 className='pt-5 pb-5 text-center'><b>{profileData.CompanyName}</b></h1>
              <div className='px-10'>
                <p className='text-left'><b>ອີເມວ :</b> {profileData.Email}</p>
                <p className='text-left'><b>ເບີໂທ :</b>
                  {profileData.Tel
                    ? `${profileData.Tel}`
                    : ' ບໍ່ລະບຸ'
                  }</p>
                <p className='text-left'><b>ທີ່ຢູ່ :</b>
                  {profileData.VillageName
                    ? `${profileData.VillageName}/${profileData.DistrictName}/${profileData.ProvinceName}`
                    : ' ບໍ່ລະບຸ'
                  }
                </p>
                <p className='text-left'>
                  {profileData.ProfessionalTitle
                    ? <p><b>ຫົວຂໍ້ວຽກຫຼັກ</b> : {profileData.ProfessionalTitle}</p>
                    : <p><b>ຫົວຂໍ້ວຽກຫຼັກ</b> : ບໍ່ລະບຸ'</p>
                  }</p>
              </div>
            </div>

            <div className='grid w-full col-span-2 bg-base-300 rounded-3xl '>

              {jobDetail && (
                <div>
                  <div className='bg-purple-900 text-white w-full rounded-t-2xl py-1'>
                    <h2 className='text-center'>ວຽກທີ່ປະກາດ</h2>
                  </div>

                  <div className='overflow-y-auto w-full px-10 h-96'>
                    {jobDetail.map((job: any) => (
                      <div key={job.JobID} onClick={() => handleCardClick(job)} className='flex flex-row w-full bg-base-100 rounded-2xl my-2 mx-1'>
                        <figure className='w-96 p-5 rounded-xl '>
                          {job.Job_Post_IMG &&
                            <div className=''>
                              <img className='w-full h-40 rounded-xl bg-cover' src={job.Job_Post_IMG} alt="Image job" />
                            </div>
                          }
                        </figure>

                        <div className='self-center py-5'>
                          <p>ຊື່ຫົວຂໍ້ວຽກ : {job.Title}</p>
                          <p>ເງິນເດືອນ : {job.SalaryStart} - {job.SalaryMax} LAK</p>
                          <p className='text-left'>ວັນທີ່ປະກາດ : {job.PostDate ? formatDate(job.PostDate) : 'N/A'}</p>
                          <p>ຊື່ອາຊີບ : {job.OccupationName}</p>
                          <p>ປະເພດອາຊີບ : {job.CategoryName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedJOB && (
              <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box w-11/12 max-w-7xl bg-base-100 border-2 border-white/10 ">

                  <button className="btn btn-xl btn-circle btn-ghost absolute right-1 top-1" onClick={closePopup}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-red-600">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </button>



                  <div className='grid grid-cols-2 -m-5'>
                    <div className='col-span-2 w-full text-center text-3xl py-2 rounded-t-2xl text-white bg-purple-900'>ລາຍລະອຽດ cv</div>
                    <figure className='w-full'>
                      <div className="card w-75 bg-base-100 shadow-xl" key={selectedJOB.JobID} onClick={() => handleCardClick(selectedJOB)}>
                        <img id="fullScreenImage" className='object-cover w-full max-h-96 transition duration-300 hover:scale-105 cursor-zoom-in justify-self-center self-center flex' src={selectedJOB.Job_Post_IMG} alt="IMG_CV" onClick={() => openFullScreen(selectedJOB.Job_Post_IMG)} />
                      </div>
                    </figure>


                    <div className="card-body bg-base-200 flex">
                      <div className='w-full flex justify-self-end justify-items-end justify-end -mt-7 ml-7'>
                      </div>
                      <p className='text-left'><b>ຫົວຂໍ້ວຽກ :</b>{selectedJOB.Title}</p>
                      <p className='text-left'><u><b>ເງິນເດືອນ</b></u> : {selectedJOB.SalaryStart} - {selectedJOB.SalaryMax}</p>
                      <p className='text-left'><u><b>ລາຍລະອຽດ</b></u> : {selectedJOB.Description}</p>
                      <p className='text-left'><u><b>ຊື່ອາຊີບ</b></u> : {selectedJOB.OccupationName}</p>
                      <p className='text-left'><u><b>ປະເພດອາຊີບ</b></u> : {selectedJOB.CategoryName}</p>
                      <p className='text-left'><u><b>ວັນທີ່ປະກາດ</b></u> : {selectedJOB.PostDate ? formatDate(selectedJOB.PostDate) : 'N/A'}</p>
                      <p className='text-left'><u><b>ປະເພດວຽກ</b></u> : {selectedJOB.WorkType}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Apply</button>
                      </div>
                    </div>
                    <div className='col-span-2 w-full text-white text-3xl py-6 rounded-b-2xl bg-purple-900'></div>
                  </div>

                </div>

              </dialog>
            )}



          </div>
        </div>
        <Footer />
      </div>
    </html>
  )
}

export default EmpProfile