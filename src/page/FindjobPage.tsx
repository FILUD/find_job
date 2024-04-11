import React, { useEffect, useState } from 'react'
// import '../css/FindjobPage.css'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface jobData {
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


function FindjobPage() {

  const navigate = useNavigate();


  const [jobData, setJobData] = useState<jobData[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedJOB, setselectedJOB] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<jobData[]>('http://localhost:3001/viewjobpostings');
        setJobData(response.data);
        console.log(jobData);
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };

    fetchData();
  }, []);



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

  const openProfile = async (EmployerID: number) => {
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
    <div>
      <Navbar />
      <center>
        <main className='container mx-auto'>
          <div className='w-full bg-slate-200 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
            <p className='p-2 text-slate-700 font-bold text-center'>Job</p>
          </div>
          <div className='mx-auto grid grid-cols-4 justify-items-center gap-1'>

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


            {jobData.map((job: any) => ( 
              <div className="card w-75 bg-base-100 shadow-xl hover:shadow-amber-400 duration-1000 cursor-pointer" key={job.JobID} onClick={() => handleCardClick(job)}>
                <figure className='h-52'>
                  {job.Post_IMG && <img className='bg-cover' src={job.Post_IMG} alt="IMG_JOB" />}
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
                  <div className="w-full card-actions justify-end">
                    <button className="w-full btn btn-primary bg-purple-600">View</button>
                  </div>
                </div>
              </div>
            ))}

            {selectedJOB && (
              <dialog id="my_modal_3" className="modal" open>
                <div className="modal-box">
                  <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopup}>✕</button>
                  <div className='bg-stone-800 rounded-2xl py-10'>
                    <figure className='w-40'>
                      <div className="card w-75 bg-base-100 shadow-xl" key={selectedJOB.JobID} onClick={() => handleCardClick(selectedJOB)}>
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
                      <button className="btn btn-primary" onClick={() => openProfile(selectedJOB.EmployerID)}>View Profile</button>
                    </div>
                  </div>
                </div>
              </dialog>
            )}


          </div>
        </main>
      </center>
      <Footer />
    </div>
  )
}

export default FindjobPage