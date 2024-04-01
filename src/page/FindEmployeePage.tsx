import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface CVData {
  CvID: number;
  DistrictName: string;
  IMG_CV: {
    type: string;
    data: string;
  };
  JobseekerName: string;
  Jobseeker_Profile_IMG: {
    type: string;
    data: string; // Assume it's already Base64 encoded
  };
  OccupationName: string;
  ProvinceName: string;
  Title: string;
  UploadDate: string;
  VillageName: string;
  CategoryName: string;
}

// Type guard function to check if data is ArrayBuffer
const isArrayBuffer = (data: any): data is ArrayBuffer => {
  return data instanceof ArrayBuffer;
};

function FindEmployeePage() {

  const navigate = useNavigate();
  const [cvData, setCvData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/viewcv')
      .then(response => {
        const dataWithBase64Images = response.data.data.map((cv: CVData) => ({
          ...cv,
          // No need to convert Jobseeker_Profile_IMG.data to ArrayBuffer if it's already Base64 encoded
          Jobseeker_Profile_IMG: cv.Jobseeker_Profile_IMG ? {
            ...cv.Jobseeker_Profile_IMG,
            data: `data:image/jpeg;base64,${cv.Jobseeker_Profile_IMG.data}`
          } : null,
          IMG_CV: cv.IMG_CV ? {
            ...cv.IMG_CV,
            data: isArrayBuffer(cv.IMG_CV.data) ? `data:image/jpeg;base64,${arrayBufferToBase64(cv.IMG_CV.data)}` : cv.IMG_CV.data
          } : null
        }));
        setCvData(dataWithBase64Images);

        console.log("CV data:", dataWithBase64Images);
      })
      .catch(error => {
        console.error('Error fetching CV data:', error);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  //popup
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const handleCardClick = (cv: any) => {
    setSelectedCard(cv);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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
            {cv.IMG_CV && <img className='bg-cover' src={`data:image/jpeg;base64,${arrayBufferToBase64(cv.IMG_CV.data)}`} alt="IMG_CV" />}
          </figure>
          <div className="card-body w-full">
            <div>
              {cv.Jobseeker_Profile_IMG && <img className='w-14 -mt-16 border-2 rounded-full' src={` data:image/jpeg;base64,${arrayBufferToBase64(cv.Jobseeker_Profile_IMG.data)}`} alt="Profile_IMG" />}
            </div>
            <div className=''>
              <h2 className="card-title">{cv.JobseekerName}</h2>
              <p className='text-left'>{cv.Title}</p>
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
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            {/* Render detailed information about the selected card */}
            {selectedCard && (
              <div>
                <h2>{selectedCard.JobseekerName}</h2>
                {/* Add more details as needed */}
              </div>
            )}
          </div>
        </div>
      )}

          </div>
        </main>
      </center>
    </div>
  )
}

export default FindEmployeePage