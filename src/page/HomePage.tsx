import React from 'react'
import '../css/HomePage.css'

import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const [t, i18n] = useTranslation("global");
  
  return (
    <div>
      <Navbar />

      <center>
        <div className="contianer-home-page">
          <div className="box-haeder-home-page">
            <p className='text-in-box-haeder-home-page'>{t("homepage.welcome")}</p>
          </div>
          <div className="box-for-text-recommend-job">
            recommend Job
          </div>

          <div className="box-item-for-recommend-job">
            <div className="item-for-recommend-job"></div>
            <div className="item-for-recommend-job"></div>
            <div className="item-for-recommend-job"></div>
            <div className="item-for-recommend-job"></div>
          </div>
          <hr className='hr-bottom-recommend-job' />
          <p>See ALL ▶</p>


          <div className="box-for-text-recommend-job">
            For Find Employee
          </div>
          <div className="box-item-for-recommend-job">
            <div className="item-for-recommend-job"></div>
            <div className="item-for-recommend-job"></div>
            <div className="item-for-recommend-job"></div>
            <div className="item-for-recommend-job"></div>
          </div>
          <hr className='hr-bottom-recommend-job' />
          <p>See ALL ▶</p><br/>

        </div>
      </center>
      <Footer/>
    </div>
  )
}

export default HomePage