import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import '../css/HomePage.css'
import { useNavigate } from 'react-router-dom';
import '../css/style.css'
import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { SpinnerColors } from './spinner';


interface JobPosting {
  JobID: number;
  EmployerID: number;
  Post_IMG: {
    type: string;
    data: number[];
  };
  Title: string;
  Description: string;
  Category: string | null;
  Location: string;
  Salary: number;
  PostDate: string;
}

function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

  //call data from API
  useEffect(() => {
    // Simulating data fetching with setTimeout
    setTimeout(async () => {
      try {
        // Replace this with your actual data fetching logic
        const response = await axios.get('http://localhost:3007/getjobpostings');
        setJobPostings(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching job postings:', error);
        setIsLoading(false); // Ensure loading state is set to false even in case of error
      }
    }, 2000); // Simulating 2 seconds delay
  }, []);

  return (
    <div>
      <Navbar />
      <center>
        <main className='container mx-auto'>

          <div className='mx-auto mt-10 grid grid-cols-4 justify-items-center gap-1'>

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


        </main>
      </center>
      <Footer />
    </div>
  )
}

export default HomePage