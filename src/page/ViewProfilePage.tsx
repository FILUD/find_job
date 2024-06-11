import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'

interface ProfileData {
  JobseekerName: string;
  ProfessionalTitle: string;
  Profile_IMG: string;
  VillageName: string;
  DistrictName: string;
  ProvinceName: string;
  Email: string;
  Tel: string;
  Description: string;
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

function ViewProfilePage() {
  const { jobseekerID } = useParams();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [cvDetail, setCvDetail] = useState<CVDetail[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCV, setSelectedCV] = useState<any>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/viewjobseeker_byid', { jobseekerID });
        setProfileData(response.data.data[0]);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [jobseekerID]);

  useEffect(() => {
    const fetchCVDetail = async () => {
      try {
        const response = await axios.post('http://localhost:3001/viewcv_byid', { jobseekerID });
        if (response.data && response.data.length > 0) {
          setCvDetail(response.data);
          // console.log("cv detail in profile view page", response.data);
        } else {
          console.error('No CV details found for this jobseeker.');
        }
      } catch (error) {
        console.error('Error fetching CV detail:', error);
      }
    };

    fetchCVDetail();
  }, [jobseekerID]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!profileData || cvDetail.length === 0) {
    return <div>Loading...</div>;
  }


  const handleCardClick = (cv: any) => {
    setSelectedCV(cv);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCV(null);
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

  return (
    <html data-theme={theme}>
      <div className='font-notoLao'>
        <SetNavbar />
        <div className='container px-10 mt-5  mx-auto'>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-3 bg-purple-900 p-3 text-center rounded-lg'>
              <p className='text-white text-xl'>ໂປຣຟາຍ ຜູ້ຊອກຫາວຽກ</p></div>
            <div className='p-3 pt-10 flex flex-col justify-start bg-base-300 rounded-3xl justify-items-center'>
              <div className='flex justify-center'>
                {profileData.Profile_IMG ? (
                  <img className='bg-cover w-36 h-36 rounded-full border-2 border-slate-50' src={profileData.Profile_IMG} alt="Profile" />
                ) : (
                  <img className='bg-cover w-36 h-36 rounded-full border-2 border-slate-50' src="/Icon/profile.png" alt="Default Profile" />
                )}
              </div>

              <h1 className='pt-5 pb-5 text-center'><b>{profileData.JobseekerName}</b></h1>

              <div className='px-10 w-full'>
                <p className='text-left'><b>ອີເມວ :</b> {profileData.Email}</p>
                <p className='text-left'><b>ເບີໂທ :</b> {profileData.Tel}</p>
                <p className='text-left'><b>ທີ່ຢູ່ :</b> {profileData.VillageName}, {profileData.DistrictName}, {profileData.ProvinceName}</p>
                <p className='text-left'><b>ຫົວຂໍ້ວຽກທີ່ຖະໜັດ :</b> {profileData.ProfessionalTitle} </p>
                <p className='text-left'><b>ລາຍລະອຽດເພີ່ມເຕີມ :</b> {profileData.Description} </p>

              </div>
            </div>


            <div className='grid w-full col-span-2 bg-base-300 rounded-3xl'>

              {cvDetail && (
                <div className=''>
                  <div className='bg-purple-900 text-white w-full rounded-t-2xl py-1'>
                    <h2 className='text-center'>CV</h2>
                  </div>

                  <div className='overflow-y-auto w-full px-10 h-96'>
                    {cvDetail.map((cv: any) => (
                      <div className='grid grid-cols-6 w-full bg-base-100 rounded-2xl my-2 mx-1' key={cv.CvID} onClick={() => handleCardClick(cv)} >

                        <figure className='col-span-1 p-5 rounded-xl '>
                          <div className='w-full'>
                            {cv.IMG_CV && <img className=' h-20 rounded-xl' src={cv.IMG_CV} alt="IMG_CV" />}
                          </div>
                        </figure>

                        <div className='col-span-3 py-5'>
                          <p>ຫົວຂໍ້ : {cv.Title}</p>
                          <p className='text-left'>ວັນທີ່ປະກາດ : {cv.UploadDate ? formatDate(cv.UploadDate) : 'N/A'}</p>
                          <p>ອາຊີບ : {cv.OccupationName}</p>
                          <p>ປະເພດອາຊີບ : {cv.CategoryName}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>

              {selectedCV && (
                <dialog id="my_modal_3" className="modal" open>
                  <div className="modal-box w-11/12 max-w-7xl bg-base-100 border-2 border-white/10">

                    <button className="btn btn-xl btn-circle btn-ghost absolute right-1 top-1" onClick={closePopup}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </button>

                    <div className='grid grid-cols-2 -m-5'>
                      <div className='col-span-2 w-full text-center text-3xl py-2 rounded-t-2xl text-white bg-purple-900'>ລາຍລະອຽດ cv</div>
                      <figure className='w-full'>
                        <div className="card w-75 bg-base-100 shadow-xl" key={selectedCV.CvID} onClick={() => handleCardClick(selectedCV)}>
                          <img id="fullScreenImage" className='object-cover w-full max-h-96 transition duration-300 hover:scale-105 cursor-zoom-in justify-self-center self-center flex' src={selectedCV.IMG_CV} alt="IMG_CV" onClick={() => openFullScreen(selectedCV.IMG_CV)} />
                        </div>
                      </figure>

                      <div className="card-body bg-base-200 flex">
                        {/* <div className='w-full flex justify-items-end'>
                          <div className='grid col-span-1 justify-start justify-items-start items-start '>
                            {selectedCV.Jobseeker_Profile_IMG
                              ? <img className='w-14  border-2 rounded-full' src={selectedCV.Jobseeker_Profile_IMG} alt="Profile_IMG" />
                              : <img className='w-14  border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                            }
                          </div>
                          <h2 className="card-title ml-5 text-justify col-span-4"><b>{selectedCV.JobseekerName}</b></h2>
                        </div> */}

                        <div className='flex flex-col mt-5'>
                          <p className='text-left'><b><u>ຫົວຂໍ້</u></b> : {selectedCV.Title}</p>
                          <p className='text-left'><u><b>ປະເພດອາຊີບ</b></u> : {selectedCV.CategoryName}/{selectedCV.OccupationName}</p>
                          <p className='text-left'><u><b>ວັນທີ່ປະກາດ</b></u> : {selectedCV.UploadDate ? formatDate(selectedCV.UploadDate) : 'N/A'}</p>
                        </div>

                        <div className="card-actions flex justify-end h-full items-end">

                          <>
                            {/* onClick={() => handleCvBookmark(selectedCV.CvID)} */}
                            <button className="btn btn-primary" >
                              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                              </svg>
                            </button>
                            <button className="btn btn-primary" onClick={() => navigate(`/NewChat_Page/${selectedCV.UserID}`)}>
                              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                              </svg>
                            </button>
                            <button className="btn btn-primary">ຮັບສະໝັກພະນັກງານ</button>
                          </>

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
  );
}

export default ViewProfilePage;
