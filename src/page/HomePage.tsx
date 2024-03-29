import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import '../css/animation_HomePage.css'
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { SpinnerColors } from './spinner';


// Define the JobPosting interface
interface JobPosting {
  JobID: number;
  EmployerID: number;
  CompanyName: string;
  Post_IMG: {
    type: string;
    data: number[];
  };
  Title: string;
  Description: string;
  Location: string;
  SalaryStart: number;
  SalaryMax: number;
  Category: string;
  PostDate: string;
  WorkType: string | null; // Assuming WorkType can be null
}



function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);


  useEffect(() => {
    // Fetch job postings data from the API
    fetch('http://localhost:3007/viewjobpostings')
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setJobPostings(data.data);
        } else {
          console.error('Failed to fetch job postings:', data.message);
        }
      })
      .catch(error => console.error('Error fetching job postings:', error));
  }, []);

  // Function to convert byte array to base64 string
  const arrayBufferToBase64 = (buffer: number[]) => {
    const binary = buffer.reduce((data, byte) => data + String.fromCharCode(byte), '');
    return window.btoa(binary);
  };

  return (
    <div>
      <Navbar />
      <center>
        <main className='container mx-auto'>
          <div className='w-full bg-slate-200 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
            <p className='p-2 text-slate-700 font-bold'>Work</p>
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

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary bg-purple-600">Apply</button>
                </div>
              </div>
            </div>

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary">Apply</button>
                </div>
              </div>
            </div>

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary">Apply</button>
                </div>
              </div>
            </div>

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary">Apply</button>
                </div>
              </div>
            </div>

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary">Apply</button>
                </div>
              </div>
            </div>

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary">Apply</button>
                </div>
              </div>
            </div>

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary">Apply</button>
                </div>
              </div>
            </div>

            <div className="card w-75 bg-base-100 shadow-xl">
              <figure><img src="Image/developer-work-01.png" alt="Shoes" /></figure>
              <div className="card-body">
                <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
                <div className=''>
                  <h2 className="card-title">Font-end Developer</h2>
                  <p className='text-left'>Salary : 2.000.0000 - 5.000.000</p>
                  <p className='text-left'>Work category : it/developer</p>
                  <p className='text-left'>Work Type : Full time</p>
                  <p className='text-left'>Posted : 10/02/2013</p>
                </div>
                <div className="w-full card-actions justify-end">
                  <button className="w-full btn btn-primary">Apply</button>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/Findjob')} className="btn btn-block mt-1 ">View All Job <img className='w-5' src="Icon/arrowhead.png" alt="" /></button>


          <div className='w-full bg-slate-200 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
            <p className='p-2 text-slate-700 font-bold'>Empolyee</p>
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
          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>

          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>


          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>


          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>

          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>

          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>

          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>

          <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'>
              <img className='bg-cover' src="Image/cv-example.jpg" alt="CV" />
              </figure>
            <div className="card-body w-full">
              <div><img className='w-14 -mt-16 border-2 rounded-full' src="/Icon/user.png" alt="Profile" /></div>
              <div className=''>
                <h2 className="card-title">MR Somsee</h2>
                <p className='text-left'>Looking for any job</p>
                <p className='text-left'>Work category : it/developer</p>
                <p className='text-left'>Posted : 10/02/2013</p>
              </div>
              <div className="w-full card-actions justify-end">
                <button className="w-full btn btn-primary bg-purple-600">Apply</button>
              </div>
            </div>
          </div>

          </div>
          <button onClick={() => navigate('/FindEmployee')} className="btn btn-block mt-1 ">View All Employee <img className='w-5' src="Icon/arrowhead.png" alt="" /></button>
        </main>
      </center>
      <Footer />
    </div>
  )
}

export default HomePage