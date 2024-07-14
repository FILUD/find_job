import React from 'react'
import Navbar from '../component/navbar/Navbar_welcome'
import SetNavbar from '../component/navbar/SetNavbar'
import { useTheme } from './../theme/theme';
import Footer from '../component/footer/Footer';

function Contact_page() {

  const { theme } = useTheme();

  return (
    <html className='font-notoLao' data-theme={theme}>
      <div className='grid'>
        <SetNavbar />
        <div className='container justify-self-center my-7'>
          <h1 className='bg-purple-900 text-white text-2xl rounded-full text-center p-3'>ຂໍ້ມູນການຕິດຕໍ່</h1>
          <div className='text-center'>
            <p className='font-bold text-xl my-7'>ສາມາດຕິດຕໍ່ ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ ກ່ຽວກັບພວກເຮົາໄດ້ທີ່ :</p>


            <div className='grid grid-cols-5 py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-10 justify-self-end col-span-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <p className='text-start col-span-3'>+856 20 56 591 696</p>
            </div>

            <div className='grid grid-cols-5'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-10 justify-self-end col-span-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <p className='text-start col-span-3'>Georgebounthavong@icloud.com</p>
            </div>

          </div>

        </div>
      </div>
      <Footer/>
    </html>
  )
}

export default Contact_page