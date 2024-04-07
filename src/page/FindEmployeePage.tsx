import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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


function FindEmployeePage() {

  const navigate = useNavigate();


  const [cvData, setCvData] = useState<CVData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CVData[]>('http://localhost:3001/viewcv');
        setCvData(response.data);
        console.log(cvData);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchData();
  }, []);

  const openProfile = async (jobseekerID: number) => {
    try {
      const response = await axios.post('http://localhost:3001/viewjobseeker_byid', { jobseekerID });
      const jobseekerData = response.data.data[0];
      navigate(`/profile/${jobseekerData.JobseekerID}`);
    } catch (error) {
      console.error('Error fetching jobseeker data:', error);
    }
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const [showPopup, setShowPopup] = useState(false);
  const [selectedCV, setSelectedCV] = useState<any>(null);

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
      <center>
        <main className='container mx-auto'>

          <div className='w-full bg-slate-200 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
            <p className='p-2 text-slate-700 font-bold text-center'>Empolyee</p>
          </div>
          <div className='mx-auto  grid grid-cols-4 justify-items-center gap-1'>
            <select className="select select-bordered border-2 border-slate-300 w-full max-w-xs bg-slate-200 text-slate-950">
              <option disabled selected className='bg-slate-400 text-slate-950'>Sort by :</option>
              <option>New</option>
              <option>Popula</option>
              <option>Lastest</option>
            </select>

            <select className="select select-bordered border-2 border-slate-300 w-full max-w-xs bg-slate-200 text-slate-950">
              <option disabled selected className='bg-slate-400 text-slate-950'>Position</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>

            <select className="select select-bordered border-2 border-slate-300 w-full max-w-xs bg-slate-200 text-slate-950">
              <option disabled selected className='bg-slate-400 text-slate-950'>Work Category</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>

            <select className="select select-bordered border-2 border-slate-300 w-full max-w-xs bg-slate-200 text-slate-950">
              <option disabled selected className='bg-slate-400 text-slate-950'>Work Type</option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>

          <div className='grid grid-cols-4 justify-items-center gap-1 items-center mt-2 box-border center'>
            {cvData.map((cv: any) => (
              <div className="card w-75 bg-base-100 shadow-xl" key={cv.CvID} onClick={() => handleCardClick(cv)}>
                <figure className='h-52'>
                  {cv.IMG_CV && <img className='bg-cover' src={cv.IMG_CV} alt="IMG_CV" />}
                </figure>
                <div className="card-body w-full">
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
                  <div className="w-full card-actions justify-end">
                    <button className="w-full btn btn-primary bg-purple-600">Apply</button>
                  </div>
                </div>
              </div>
            ))}

            {selectedCV && (
              <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box">
                  <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopup}>✕</button>
                  <div className='bg-stone-800 rounded-2xl py-10'>
                    <figure className='w-40'>
                      <div className="card w-75 bg-base-100 shadow-xl" key={selectedCV.CvID} onClick={() => handleCardClick(selectedCV)}>
                        <img id="fullScreenImage" className='bg-cover rounded-2xl' src={selectedCV.IMG_CV} alt="IMG_CV" onClick={() => openFullScreen(selectedCV.IMG_CV)} />
                      </div>
                    </figure>
                  </div>
                  <div className="card-body bg-stone-800  rounded-2xl">
                    <div className='w-full flex justify-self-end justify-items-end justify-end -mt-7 ml-7'>
                    </div>
                    <div>
                      {selectedCV.Jobseeker_Profile_IMG && <img className='w-14 border-2 rounded-full' src={selectedCV.Jobseeker_Profile_IMG} alt="Profile_IMG" />}
                    </div>
                    <h2 className="card-title text-justify"><b>{selectedCV.JobseekerName}</b></h2>
                    <p className='text-left'><b>{selectedCV.Title}</b></p>
                    <p className='text-left'><u>Work category:</u> {selectedCV.CategoryName}/{selectedCV.OccupationName}</p>
                    <p className='text-left'><u>Location:</u> {selectedCV.VillageName}/{selectedCV.DistrictName}/{selectedCV.ProvinceName}</p>
                    <p className='text-left'><u>Posted:</u> {selectedCV.UploadDate ? formatDate(selectedCV.UploadDate) : 'N/A'}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Apply</button>
                      <button className="btn btn-primary" onClick={() => openProfile(selectedCV.JobseekerID)}>View Profile</button>
                    </div>
                  </div>
                </div>
              </dialog>
            )}

          </div>
        </main>
      </center>
    </div>
  )
}

export default FindEmployeePage