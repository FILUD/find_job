import React from 'react'
// import '../css/FindjobPage.css'
import Navbar from '../component/navbar/Navbar'
import Footer from '../component/footer/Footer'

function FindjobPage() {
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

export default FindjobPage