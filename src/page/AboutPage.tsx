import React from 'react'
import '../css/AboutPage.css'
import Navbar from '../component/navbar/Navbar_welcome'
import { useTranslation } from 'react-i18next';

function About_Page() {
  const [t, i18n] = useTranslation("global");

  return (
    <div>
      <Navbar />
      <div>
        <center>
          <p className='text-title-about'>{t("aboutpage.para1")}</p>
          <br />
          <hr className='hr-about' />

          <p className='text-header-developer'>{t("aboutpage.developer")}</p></center>
        <div className='box-profile-about'>

          <div>
            <img className='icon-profile-about' src="Icon/profile.png" alt="Profile" />
            <p className='name-developer-about'>Mr: Grorge</p>
            <p className='detial-developer-about'>Front-end</p>
            <p className='detial-developer-about'>Back-end</p>
          </div>
          <div>
            <img className='icon-profile-about' src="Icon/profile.png" alt="Profile" />
            <p className='name-developer-about'>Mr: Kong</p>
            <p className='detial-developer-about'>Front-end</p>
            <p className='detial-developer-about'>UX-UI Design</p>
          </div>
          <div>
            <img className='icon-profile-about' src="Icon/profile.png" alt="Profile" />
            <p className='name-developer-about'>Mr: Tick</p>
            <p className='detial-developer-about'>Front-end</p>
            <p className='detial-developer-about'>Back-end</p>
          </div>
        </div>
        <hr className='hr-about' />

        <div className='box-text-about'>

          <div className='box-text-detail-about'>
            <p className='text-detail-title-about'>{t("aboutpage.forseeker")}</p>
            <p className='text-detail-in-box-about'>{t("aboutpage.seeker1")}</p>
          </div>


          <div className='box-text-detail-about'>
            <p className='text-detail-title-about'>{t("aboutpage.forseeker")}</p>
            <p className='text-detail-in-box-about'>{t("aboutpage.seeker2")}</p>
          </div>


          <div className='box-text-detail-about'>
            <p className='text-detail-title-about'>{t("aboutpage.forseeker")}</p>
            <p className='text-detail-in-box-about'>{t("aboutpage.seeker3")}</p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default About_Page