import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../component/footer/Footer';
import SetNavbar from '../component/navbar/SetNavbar';
import { ThemeToggle, useTheme } from '../theme/theme'
import Swal from 'sweetalert2';
import JobInvitation from '../component/chat/card/JobInvitation';
const myRole = localStorage.getItem("Role")

interface CVData {
  CvID: number;
  JobseekerID: number;
  IMG_CV: string;
  UserID: number;
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
  const myID = localStorage.getItem('ID');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CVData | null>(null);
  const [isOpenJobInvite, setIsOpenJobInvite] = useState(false);
  const [cvData, setCvData] = useState<CVData[]>([]);
  const [categories, setCategories] = useState<{ CategoryID: number; CategoryName: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [occupations, setOccupations] = useState<{ OccupationID: number; OccupationName: string }[]>([]);
  const [selectedOccupation, setSelectedOccupation] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('none');
  const [sortedJobs, setSortedJobs] = useState<CVData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(cvData.length / itemsPerPage);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const currentCvs = sortedJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CVData[]>('http://localhost:3001/viewcv');
        setCvData(response.data);
        console.log("+++++ CV data +++++++", response.data)
      } catch (error) {
        console.error('Error fetching CV data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPopup(false);
        setSelectedCV(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/getallcategory');
        if (!response.data.error) {
          setCategories(response.data.data);
        } else {
          console.error('Failed to fetch categories:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
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

  const handleCardClick = (cv: CVData) => {
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
    if (!UserID) {
      console.error('UserID is not available.');
      return;
    }

    try {
      const checkResponse = await axios.get(`http://localhost:3001/checkbookmarkcv?UserID=${UserID}&CvID=${CvID}`);
      const checkData = checkResponse.data;

      if (checkData.error) {
        console.error('Failed to check bookmark.');
        return;
      }

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
            const deleteResponse = await axios.delete(`http://localhost:3001/removebookmarkcv?UserID=${UserID}&CvID=${CvID}`);
            const deleteData = deleteResponse.data;

            if (deleteData.error) {
              console.error('Failed to remove bookmark.');
              return;
            }

            Swal.fire({
              title: "Deleted!",
              text: "Your bookmark has been removed.",
              icon: "success"
            });
          }
        });
      } else {
        const addResponse = await axios.post('http://localhost:3001/bookmarkcv', { UserID, CvID });
        const addData = addResponse.data;

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
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = parseInt(event.target.value, 10);

    if (isNaN(selectedCategoryId) || selectedCategoryId === 0) {
      setSelectedCategory(null);
      setSelectedOccupation(null);
      return;
    }

    setSelectedCategory(selectedCategoryId);

    try {
      const response = await axios.post('http://localhost:3001/getoccupationbycategory', { CategoryID: selectedCategoryId });
      const data = response.data;
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

    if (selectedCategory !== null) {
      filteredJobs = filteredJobs.filter(job => job.CategoryID === selectedCategory);
    }

    if (selectedOccupation !== null) {
      filteredJobs = filteredJobs.filter(job => job.OccupationID === selectedOccupation);
    }

    if (searchQuery !== '') {
      filteredJobs = filteredJobs.filter(job =>
        (job.Title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.JobseekerName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.OccupationName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.CategoryName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.VillageName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.DistrictName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.ProvinceName?.toLowerCase() || '').includes(searchQuery.toLowerCase())
      );
    }

    setSortedJobs(filteredJobs);
  }, [selectedCategory, selectedOccupation, cvData, searchQuery]);

  useEffect(() => {
    let sortedArray = [...sortedJobs];

    if (sortOrder === 'new') {
      sortedArray.sort((a, b) => new Date(b.UploadDate).getTime() - new Date(a.UploadDate).getTime());
    } else if (sortOrder === 'latest') {
      sortedArray.sort((a, b) => new Date(a.UploadDate).getTime() - new Date(b.UploadDate).getTime());
    }

    setSortedJobs(sortedArray);
  }, [sortOrder]);

  const openProfileCV = async (jobseekerID: number) => {
    try {
      const response = await axios.post('http://localhost:3001/viewjobseeker_byid', { jobseekerID });
      const jobseekerData = response.data.data[0];
      navigate(`/profile/${jobseekerData.JobseekerID}`);
    } catch (error) {
      console.error('Error fetching jobseeker data:', error);
    }
  };

  const handleEditCv = (cvID: number) => {
    if (typeof cvID === 'number') {
      navigate(`/editCv/${cvID}`);
    } else {
      console.error('Invalid jobID:', cvID);
    }
  };

  const handleIsOpenJobInvite = () => {
    setIsOpenJobInvite(true)
    closePopup()
  }
  const closeToggleJobInvite = () => {
    setIsOpenJobInvite(false)
  }


  const [invitationList, setInvitationList] = useState<any>();
  //job invitation
  const handleSetDataInvitation = async (cvData: CVData) => {
    console.log("show me cv list", cvData)
    setInvitationList({
      senderId: myID,
      cvData: cvData
    })

    console.log(myID)
    console.log("cvData", cvData)
  }


  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const handleFullScreen = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const originalUrl = event.currentTarget.getAttribute('data-original-url');
    const img = document.createElement('img');
    img.src = originalUrl || '';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.id = 'fullscreenImageContainer'; // Set an ID for easy reference
    fullscreenDiv.style.position = 'fixed';
    fullscreenDiv.style.top = '0';
    fullscreenDiv.style.left = '0';
    fullscreenDiv.style.width = '100%';
    fullscreenDiv.style.height = '100%';
    fullscreenDiv.style.backgroundColor = 'black';
    fullscreenDiv.style.display = 'flex';
    fullscreenDiv.style.alignItems = 'center';
    fullscreenDiv.style.justifyContent = 'center';
    fullscreenDiv.style.zIndex = '9999';
    fullscreenDiv.appendChild(img);
    document.body.appendChild(fullscreenDiv);
    setFullscreenOpen(true);

    const closeFullscreen = () => {
      document.body.removeChild(fullscreenDiv);
      document.removeEventListener('keydown', handleKeyDown);
      setFullscreenOpen(false);
    };

    fullscreenDiv.addEventListener('click', closeFullscreen);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  };


  return (
    <html data-theme={theme}>
      <div className='mx-10 font-notoLao'>
        <SetNavbar />
        <center>
          <main className='container mx-auto'>

            <div className='w-full mb-4 mt-10 rounded-md text-4xl text-white bg-purple-900'>
              <p className='p-2 font-bold text-center'>ຫນ້າຫາພະນັກງານ</p>
            </div>

            <label className="border-2 border-purple-900/30 input flex items-center gap-2 my-2 bg-base-300">
              <input
                type="text"
                className="grow text-center"
                placeholder="ຄົ້ນຫາວຽກ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg className="w-6 h-6 mr-2 text-warning shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </label>

            <div className='mx-auto  grid grid-cols-4 justify-items-center gap-1 mb-4'>
              <button
                className="btn border-2 border-base-300 w-full bg-base-200 font-notoLao"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedOccupation(null);
                  setSortOrder('none');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>

                ລ້າງຕົວກອງຂໍ້ມູນ
              </button>

              <select
                className="select select-bordered border-2 border-base-300 w-full bg-base-200"
                onChange={handleSortChange}
                value={sortOrder}
              >
                <option disabled value="none" className='bg-slate-400 text-slate-950'>
                  ຈັດລຽງຕາມ :
                </option>
                <option value="none" className='bg-base-300'>ບໍ່ມີ</option>
                <option value="new">ໃຫມ່ສຸດກ່ອນ</option>
                <option value="latest">ເກົ່າສຸດ</option>
              </select>


              <select
                className="select select-bordered border-2 border-base-300 w-full bg-base-200"
                value={selectedCategory != null ? selectedCategory : ''}
                onChange={handleCategoryChange}
              >
                <option value="">ປະເພດອາຊີບທັງຫມົດ</option>
                <option disabled value="">ເລືອກປະເພດອາຊີບ</option>
                {categories.map(category => (
                  <option key={category.CategoryID} value={category.CategoryID}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>


              <select
                className="select select-bordered border-2 border-base-300 w-full bg-base-200"
                value={selectedOccupation != null ? selectedOccupation : ''}
                onChange={handleOccupationChange}
              >
                <option value="">ອາຊີບທັງຫມົດ</option>
                <option disabled value="">ເລືອກປະເພດອາຊີບກ່ອນ</option>

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
                  <div className="card w-full max-w-full h-full max-h-min  bg-base-300 shadow-lg  hover:shadow-purple-400 duration-500 cursor-pointer" key={cv.CvID}
                    onClick={() => {
                      handleCardClick(cv);
                      handleSetDataInvitation(cv)
                    }}>
                    <figure className='h-52'>
                      {cv.IMG_CV && <img className='object-cover w-full h-full max-h-min' src={cv.IMG_CV} alt="IMG_CV" />}
                    </figure>
                    <div className="card-body w-full">
                      <div>
                        {cv.Jobseeker_Profile_IMG ?
                          < img className='w-14 -mt-16 border-2 rounded-full' src={cv.Jobseeker_Profile_IMG} alt="Profile_IMG" />
                          :
                          <img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile_IMG" />}
                      </div>
                      <div className=''>
                        <p className="card-title"><b>{cv.JobseekerName}</b></p>
                        <p className='text-left'><b>{cv.Title}</b></p>
                        <p className='text-left'><b>ປະເພດວຽກ :</b> {cv.CategoryName}/{cv.OccupationName}</p>
                        <p className='text-left'><b>ທີ່ຢູ່ :</b> {cv.VillageName
                          ? `${cv.VillageName}/${cv.DistrictName}/${cv.ProvinceName}`
                          : ' ບໍ່ລະບຸ'
                        }</p>
                        <p className='text-left'><b>ວັນທີ່ອັບໂຫຼດ :</b> {cv.UploadDate ? formatDate(cv.UploadDate) : 'N/A'}</p>
                      </div>
                      <div className="w-full card-actions max-h-full h-full flex items-end">
                        <button className="w-full btn btn-primary bg-purple-600" onClick={() => handleSetDataInvitation(cv)}>ສົ່ງສະໝັກ</button>
                      </div>
                    </div>
                  </div>
                </div>

              ))}

              <div className="flex justify-center my-5 col-span-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="btn btn-secondary mr-2">Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-secondary">Next</button>
              </div>

              {isOpenJobInvite && (
                <div className='absolute'>
                  <JobInvitation isOpen={isOpenJobInvite} isClose={closeToggleJobInvite} employerID={invitationList.senderId} dataList={invitationList.cvData} />
                </div>
              )}

              {selectedCV && (
                <dialog id="my_modal_3" className="modal" open>
                  <div className="modal-box w-11/12 max-w-7xl bg-base-100 border-2 border-white/10">

                    <button className="btn btn-xl btn-circle btn-ghost absolute right-1 top-1" onClick={closePopup}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </button>
                    <div className='grid grid-cols-2 -m-5'>
                      <div className='col-span-2 w-full text-3xl py-2 rounded-t-2xl text-white bg-purple-900'>ລາຍລະອຽດ cv</div>
                      <figure className={`w-full`}>
                        <div className="card w-75 bg-base-100 shadow-xl" key={selectedCV.CvID} onClick={() => handleCardClick(selectedCV)}>
                          <a
                            data-original-url={selectedCV.IMG_CV}
                            onClick={handleFullScreen}
                          >
                            <img id="fullScreenImage"
                              className='object-cover w-full max-h-96 transition duration-300 hover:scale-105 cursor-zoom-in justify-self-center self-center flex'
                              src={selectedCV.IMG_CV}
                              alt="IMG_CV"
                            // onClick={() => openFullScreen(selectedCV.IMG_CV)}
                            />
                          </a>
                        </div>
                      </figure>

                      <div className="card-body bg-base-200 flex">
                        <div className='w-full flex justify-items-end'>
                          <div className='grid col-span-1 justify-start justify-items-start items-start '>
                            {selectedCV.Jobseeker_Profile_IMG
                              ? <img className='w-14  border-2 rounded-full' src={selectedCV.Jobseeker_Profile_IMG} alt="Profile_IMG" />
                              : <img className='w-14  border-2 rounded-full' src="/Icon/user.png" alt="Profile" />
                            }
                          </div>
                          <h2 className="card-title ml-5 text-justify col-span-4"><b>{selectedCV.JobseekerName}</b></h2>
                        </div>

                        <div className='flex flex-col mt-5'>
                          <p className='text-left'><b><u>ຫົວຂໍ້</u></b> : {selectedCV.Title}</p>
                          <p className='text-left'><u><b>ປະເພດອາຊີບ</b></u> : {selectedCV.CategoryName}/{selectedCV.OccupationName}</p>
                          <p className='text-left'><u><b>ທີ່ຢູ່</b></u> : {selectedCV.VillageName
                            ? `${selectedCV.VillageName}/${selectedCV.DistrictName}/${selectedCV.ProvinceName}`
                            : ' ບໍ່ລະບຸ'
                          }</p>
                          <p className='text-left'><u><b>ວັນທີ່ປະກາດ</b></u> : {selectedCV.UploadDate ? formatDate(selectedCV.UploadDate) : 'N/A'}</p>
                        </div>

                        <div className="card-actions flex justify-end h-full items-end">
                          {myID == JobseekerID && myRole == `"Jobseeker"` ? (
                            <button className="btn btn-primary" onClick={() => handleEditCv(selectedCV.CvID)}>ແກ້ໄຂ</button>
                          ) : (<>
                            {myID != JobseekerID && myRole == `"Jobseeker"` && (
                              <button className="btn btn-primary" onClick={() => navigate(`/NewChat_Page/${selectedCV.UserID}`)}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                              </button>
                            )}
                          </>)
                          }
                          {myID == JobseekerID && myRole != `"Jobseeker"` && (
                            <>
                              <button className="btn btn-primary" onClick={() => handleCvBookmark(selectedCV.CvID)}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                              </button>
                              <button className="btn btn-primary" onClick={() => navigate(`/NewChat_Page/${selectedCV.UserID}`)}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                              </button>
                              {/* <button className="btn btn-primary" onClick={() => handleIsOpenJobInvite()}>ສະໝັກ</button> */}
                              <button className="btn btn-primary" onClick={() => handleIsOpenJobInvite()}>ຮັບສະໝັກພະນັກງານ</button>
                              <button className="btn btn-primary" onClick={() => openProfileCV(selectedCV.JobseekerID)}>ເບິ່ງໂປຣຟາຍ</button>
                            </>
                          )}

                          {myID != JobseekerID && myRole != `"Jobseeker"` && (
                            <>
                              <button className="btn btn-primary" onClick={() => handleCvBookmark(selectedCV.CvID)}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                              </button>
                              <button className="btn btn-primary" onClick={() => navigate(`/NewChat_Page/${selectedCV.UserID}`)}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                </svg>
                              </button>
                              <button className="btn btn-primary" onClick={() => handleIsOpenJobInvite()}>ຮັບສະໝັກພະນັກງານ</button>
                              <button className="btn btn-primary" onClick={() => openProfileCV(selectedCV.JobseekerID)}>ເບິ່ງໂປຣຟາຍ</button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='col-span-2 w-full text-white text-3xl py-6 rounded-b-2xl bg-purple-900'></div>
                    </div>
                  </div>
                </dialog>


              )}

            </div>
          </main>
        </center>
        <Footer />
      </div>
    </html >
  );
}

export default FindEmployeePage;
