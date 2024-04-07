import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';

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
  const [cvDetail, setCvDetail] = useState<CVDetail[]>([]); // Initialize as empty array
  const [showPopup, setShowPopup] = useState(false); // Moved to top level
  const [selectedCV, setSelectedCV] = useState<any>(null); // Moved to top level

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
          console.log(setCvDetail);
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
    <div>
      <Navbar />
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
            <h1 className='pt-5 pb-5 text-center'>{profileData.JobseekerName}</h1>
            {/* Profile Details */}
            <div className='px-10'>
              <p className='text-left'><b>Email:</b> {profileData.Email}</p>
              <p className='text-left'><b>Tel:</b> {profileData.Tel}</p>
              <p className='text-left'><b>Address:</b> {profileData.VillageName}, {profileData.DistrictName}, {profileData.ProvinceName}</p>
            </div>
          </div>

          {/* Professional Title and Description */}
          <div className='grid bg-zinc-900 rounded-3xl justify-items-center justify-center'>
            <div className='bg-slate-50 card w-96 my-5'>
              <p className='w-full bg-slate-700 rounded-t-2xl text-center'><b>Professional Title:</b> </p>
              <p className='px-10 text-slate-950'>{profileData.ProfessionalTitle}</p>
            </div>
            <div className='bg-slate-50 card w-96 my-5'>
              <p className='w-full bg-slate-700 rounded-t-2xl text-center'><b>Description:</b> </p>
              <p className='px-10 text-slate-950'>{profileData.Description}</p>
            </div>
          </div>

          <div className='grid bg-zinc-900 rounded-3xl justify-items-center justify-center' style={{ overflowY: 'auto' }}>

            {cvDetail && (
              <div>
                <div className='bg-slate-700 rounded-t-2xl py-1'>
                  <h2 className='text-center'>CV</h2>
                </div>
                {cvDetail.map((cv: any) => (
                  <div key={cv.CvID} onClick={() => handleCardClick(cv)} className='grid grid-cols-3 bg-slate-700 rounded-2xl my-2 mx-1'>
                    <figure className='col-span-1 p-5 rounded-xl '>
                      {cv.IMG_CV && <img className='bg-cover rounded-xl' src={cv.IMG_CV} alt="IMG_CV" />}
                    </figure>

                    <div className='col-span-2 py-5'>
                      <p>Title: {cv.Title}</p>
                      <p className='text-left'>Posted: {cv.UploadDate ? formatDate(cv.UploadDate) : 'N/A'}</p>
                      <p>Occupation : {cv.OccupationName}</p>
                      <p>Category : {cv.CategoryName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedCV && (
              <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box">
                  <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopup}>✕</button>
                  <div className='bg-stone-800 rounded-2xl py-10 justify-center justify-items-center grid'>
                    <figure className='w-40 '>
                      <div className="card w-75 bg-base-100 shadow-xl" key={selectedCV.CvID} onClick={() => handleCardClick(selectedCV)}>
                        <img id="fullScreenImage" className='bg-cover rounded-2xl' src={selectedCV.IMG_CV} alt="IMG_CV" onClick={() => openFullScreen(selectedCV.IMG_CV)} />
                      </div>
                    </figure>
                  </div>
                  <div className="card-body bg-stone-800  rounded-2xl">
                    <div className='w-full flex justify-self-end justify-items-end justify-end -mt-7 ml-7'>
                    </div>
                    <p className='text-left'><b>{selectedCV.Title}</b></p>
                    <p className='text-left'><u>Occupation :</u>{selectedCV.OccupationName}</p>
                    <p className='text-left'><u>Work category :</u> {selectedCV.CategoryName}</p>                    
                    <p className='text-left'><u>Posted:</u> {selectedCV.UploadDate ? formatDate(selectedCV.UploadDate) : 'N/A'}</p>
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
  );
}

export default ViewProfilePage;
