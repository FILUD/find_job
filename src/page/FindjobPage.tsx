import React, { useEffect, useState } from 'react'
// import '../css/FindjobPage.css'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'
import Swal from 'sweetalert2';


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
  const { theme } = useTheme();

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

  return (
    <html data-theme={theme}>
      <div className='mx-10'>
        <SetNavbar />
        <center>
          <main className='container mx-auto shadow-lg'>
            <div className='w-full mb-4 bg-slate-200 mt-10 rounded-md  text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
              <p className='p-2  font-bold text-center'>Job</p>
            </div>
            <div className='mx-auto grid grid-cols-4 justify-items-center gap-1 mb-4'>

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
            <div className='grid grid-cols-4 justify-items-center gap-1 items-center mt-2 box-border center '>


              {jobData.map((job: any) => (
                <div className="card w-full max-w-full h-full max-h-min  bg-base-300 shadow-lg  hover:shadow-purple-400 duration-500 cursor-pointer" key={job.JobID} onClick={() => handleCardClick(job)}>
                  <figure className='h-52'>
                    {job.Post_IMG && <img className='bg-cover h-full max-h-min' src={job.Post_IMG} alt="IMG_JOB" />}
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

              {selectedJOB && (
                <dialog id="my_modal_3" className="modal" open>
                  <div className="modal-box bg-base-300">
                    <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopup}>✕</button>
                    <div className=' rounded-2xl bg-base-100'>
                      <figure className='w-full p-5'>
                        <div className="card w-75 bg-base-100 shadow-xl" key={selectedJOB.JobID} onClick={() => handleCardClick(selectedJOB)}>
                          <img id="fullScreenImage" className='bg-cover rounded-2xl hover:scale-110 transition duration-300' src={selectedJOB.Post_IMG} alt="IMG_CV" onClick={() => openFullScreen(selectedJOB.Post_IMG)} />
                        </div>
                      </figure>
                    </div>
                    <div className="card-body bg-base-100  rounded-2xl">
                      <div className='w-full flex justify-self-end justify-items-end justify-end -mt-7 ml-7'>
                      </div>
                      <div className='grid grid-cols-5 bg-base-100 drop-shadow-xl py-2 px-3 -mt-4 rounded-full'>
                        <div className='grid col-span-1 justify-start justify-items-start items-start '>
                          {selectedJOB.Employer_Profile_IMG
                            ? <img className='w-14 h-14 border-2 rounded-full' src={selectedJOB.Employer_Profile_IMG} alt="Profile_IMG" />
                            : <img className='w-14 h-14 border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
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

                        <button className="btn btn-primary" onClick={() => handleJobBookmark(selectedJOB.JobID)}>
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                          </svg>
                        </button>

                        <button className="btn btn-primary">
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                          </svg>
                        </button>

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
    </html>

  )
}

export default FindjobPage