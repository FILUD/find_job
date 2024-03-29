import React from 'react'
import Navbar from '../component/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

function FindEmployeePage() {
  const navigate = useNavigate();

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
        
        <div className="card w-75 bg-base-100 shadow-xl">
            <figure className='h-52'><img className='bg-cover' src="Image/cv-example.jpg" alt="CV" /></figure>
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
            <figure className='h-52'><img className='bg-cover' src="Image/cv-example.jpg" alt="CV" /></figure>
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
            <figure className='h-52'><img className='bg-cover' src="Image/cv-example.jpg" alt="CV" /></figure>
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
            <figure className='h-52'><img className='bg-cover' src="Image/cv-example.jpg" alt="CV" /></figure>
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
            <figure className='h-52'><img className='bg-cover' src="Image/cv-example.jpg" alt="CV" /></figure>
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
            <figure className='h-52'><img className='bg-cover' src="Image/cv-example.jpg" alt="CV" /></figure>
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
            <figure className='h-52'><img className='bg-cover' src="Image/cv-example.jpg" alt="CV" /></figure>
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
      </main>
      </center>
    </div>
  )
}

export default FindEmployeePage