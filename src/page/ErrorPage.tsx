import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTheme } from './../theme/theme';
import SetNavbar from '../component/navbar/SetNavbar'
import Footer from '../component/footer/Footer';
// import '../css/ErrorPage.css'


function ErrorPage() {

  const { theme } = useTheme();
  const navigate = useNavigate();

  return (

    <html className='font-notoLao' data-theme={theme}>
      <SetNavbar />
      <div className='w-full h-full flex'>
        <section className="w-full h-full grid text-center py-32">
          <svg className="size-16 justify-self-center text-red-600 mb-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>

          <div className="text-4xl font-bold">ຂໍອະໄພ !</div>
          <div className="pt-3" aria-hidden="true">ໜ້ານີ່ບໍ່ສາມາດເຮັດວຽກໄດ້</div>
          <p className="error-message-error-page">ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃຫມ່ພາຍຫລັງ.</p>
          <button onClick={() => navigate('/Home')} className='mt-10 btn w-1/5 bg-purple-900 text-white hover:text-black duration-1000 justify-self-center'>ກັບຄືນຫນ້າຫຼັກ</button>
        </section>
      </div>
      <Footer/>
    </html>
  )
}

export default ErrorPage