import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../component/footer/Footer';
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'
import Swal from 'sweetalert2';

interface CVData {
  CvID: number;
  JobseekerID: number;
  IMG_CV: string;
  JobseekerName: string;
  Jobseeker_Profile_IMG: string;
  CategoryName: string;
  CategoryID: number;
  OccupationName: string;
  OccupationID: number;
  Title: string;
  UploadDate: string;
  VillageName: string;
  DistrictName: string;
  ProvinceName: string;
}


function FindEmployeePage() {

  const navigate = useNavigate();
  const { theme } = useTheme();
  const [JobseekerID, setJobseekerID] = useState<any>(null);
  const myID = localStorage.getItem('ID')
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCV, setSelectedCV] = useState<any>(null);

  const [cvData, setCvData] = useState<CVData[]>([]);
  const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
  const [occupation, setOccupation] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('none');
  const [sortedJobs, setSortedJobs] = useState<CVData[]>([]);
  const [isLoading, setLoading] = useState(true);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CVData[]>('http://localhost:3001/viewcv');
        setCvData(response.data);
        console.log("+++++++++++++++++++++++++++++++++++++++++++++",cvData);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesResponse = await fetch('http://localhost:3001/getallcategory');
        const categoriesData = await categoriesResponse.json();
        if (categoriesData.error === false) {
          setCategories(categoriesData.data);
        } else {
          console.error('Failed to fetch categories:', categoriesData.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchCategories();
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

  const openProfileCV = async (jobseekerID: number) => {
    try {
      const response = await axios.post('http://localhost:3001/viewjobseeker_byid', { jobseekerID });
      const jobseekerData = response.data.data[0];
      navigate(`/profile/${jobseekerData.JobseekerID}`);
    } catch (error) {
      console.error('Error fetching jobseeker data:', error);
    }
  };



  const handleCardClick = (cv: any) => {
    setJobseekerID(cv.JobseekerID);
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(cvData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentCvs = cvData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);



  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(event.target.value, 10);

    if (isNaN(selectedCategoryId) || selectedCategoryId === 0) {
      setSelectedCategory(null);
      setSelectedOccupation(null); // Reset selected occupation when category is set to "All Categories"
      return;
    }

    setSelectedCategory(selectedCategoryId);

    try {
      const response = await fetch('http://localhost:3001/getoccupationbycategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ CategoryID: selectedCategoryId })
      });

      const data = await response.json();
      if (!data.error) {
        setOccupations(data.data);
      } else {
        console.error('Failed to fetch occupations:', data.message);
      }
    } catch (error) {
      console.error('Error fetching occupations:', error);
    }
  };

  const handleOccupationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOccupationId = event.target.value;
    if (selectedOccupationId === "") {
      // If "All Occupations" is selected, set selectedOccupation to null
      setSelectedOccupation(null);
    } else {
      setSelectedOccupation(parseInt(selectedOccupationId, 10));
    }
  };


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  useEffect(() => {
    let filteredJobs = [...cvData];
  
    // Filter by selected category
    if (selectedCategory !== null) {
      filteredJobs = filteredJobs.filter(job => job.CategoryID === selectedCategory);
    }
  
    // Filter by selected occupation
    if (selectedOccupation !== null) {
      filteredJobs = filteredJobs.filter(job => job.OccupationID === selectedOccupation);
    }
  
    // Update sorted jobs
    setSortedJobs(filteredJobs);
  }, [selectedCategory, selectedOccupation, cvData]);

  useEffect(() => {
    let sortedArray = [...sortedJobs]; // Use sortedJobs instead of cvData for sorting
  
    if (sortOrder === 'new') {
      sortedArray.sort((a, b) => new Date(b.UploadDate).getTime() - new Date(a.UploadDate).getTime());
    } else if (sortOrder === 'latest') {
      sortedArray.sort((a, b) => new Date(a.UploadDate).getTime() - new Date(b.UploadDate).getTime());
    }
  
    setSortedJobs(sortedArray);
  }, [sortOrder, sortedJobs]); // Use sortedJobs instead of cvData for dependency
  
  
  

  return (
    <html data-theme={theme}>
      <div className='mx-10'>
        <SetNavbar />
        <center>
          <main className='container mx-auto'>

            <div className='w-full mb-4 bg-slate-200 mt-10 rounded-md text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
              <p className='p-2 text-slate-700 font-bold text-center'>Empolyee</p>
            </div>
            <div className='mx-auto  grid grid-cols-4 justify-items-center gap-1 mb-4'>
            <select
                className="select select-bordered border-2 border-base-300 w-full max-w-xs bg-base-200"
                onChange={handleSortChange}
                value={sortOrder}
              >
                <option disabled value="none" className='bg-slate-400 text-slate-950'>
                  Order by :
                </option>
                <option value="none" className='bg-base-300'>none</option>
                <option value="new">New</option>
                <option value="latest">Latest</option>
              </select>

              <select
                className="select select-bordered border-2 border-base-300 w-full max-w-xs bg-base-200"
                value={selectedCategory != null ? selectedCategory : ''}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                <option disabled value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.CategoryID} value={category.CategoryID}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>


              <select
                className="select select-bordered border-2 border-base-300 w-full max-w-xs bg-base-200"
                value={selectedOccupation != null ? selectedOccupation : ''}
                onChange={handleOccupationChange}
              >
                <option disabled value="">All Occupations</option>
                <option value="">All Occupations</option>
                {occupations.map(occupation => (
                  <option key={occupation.OccupationID} value={occupation.OccupationID}>
                    {occupation.OccupationName}
                  </option>
                ))}
              </select>

              {/* <select className="select select-bordered border-2 border-slate-300 w-full max-w-xs bg-slate-200 text-slate-950">
                <option disabled selected className='bg-slate-400 text-slate-950'>Work Type</option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select> */}

            </div>

            <div className='grid grid-cols-4 justify-items-center gap-2 items-center mt-2 box-border center'>
              {currentCvs.map((cv: any) => (
                <div className='bg-black bg-opacity-10 rounded-2xl p-0.5 shadow-xl w-full max-w-full h-full max-h-min '>
                  <div className="card w-full max-w-full h-full max-h-min  bg-base-300 shadow-lg  hover:shadow-purple-400 duration-500 cursor-pointer" key={cv.CvID} onClick={() => handleCardClick(cv)}>
                    <figure className='h-52'>
                      {cv.IMG_CV && <img className='object-cover w-full h-full max-h-min' src={cv.IMG_CV} alt="IMG_CV" />}
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
                      <div className="w-full card-actions max-h-full h-full flex items-end">
                        <button className="w-full btn btn-primary bg-purple-600">Apply</button>
                      </div>
                    </div>
                  </div>
                </div>

              ))}

              <div className="flex justify-center my-5 col-span-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-secondary mr-2">Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-secondary">Next</button>
              </div>

              {selectedCV && (
                <dialog id="my_modal_3" className="modal" open>
                  <div className="modal-box bg-base-300 overflow-auto">
                    <button className="btn btn-sm btn-square btn-ghost absolute right-2 top-2" onClick={closePopup}>✕</button>
                    <div className=' rounded-2xl'>
                      <figure className='w-4/5 shadow-xl'>
                        <div className="card w-75 bg-base-100 shadow-xl" key={selectedCV.CvID} onClick={() => handleCardClick(selectedCV)}>
                          <img id="fullScreenImage" className='bg-cover rounded-2xl hover:scale-110 transition duration-300' src={selectedCV.IMG_CV} alt="IMG_CV" onClick={() => openFullScreen(selectedCV.IMG_CV)} />
                        </div>
                      </figure>
                    </div>
                    <div className="card-body rounded-2xl bg-base-100">
                      <div className='grid grid-cols-5 bg-base-100 shadow-xl py-2 px-3 -mt-4 rounded-full'>
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
                            <button className="btn btn-primary">
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

export default FindEmployeePage