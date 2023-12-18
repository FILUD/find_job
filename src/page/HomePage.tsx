import React from 'react'
import '../css/HomePage.css'
import { useNavigate } from 'react-router-dom';

import Navbar from '../component/navbar/Navbar';
import Footer from '../component/footer/Footer';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const [t, i18n] = useTranslation("global");
  
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <center>
        <div className="contianer-home-page">
          <div className="box-haeder-home-page">
            <p className='text-in-box-haeder-home-page'>{t("homepage.welcome")}</p>
          </div>
          <div className="box-for-text-recommend-job">
          {t("homepage.recommend")}
          </div>

          <div className="box-item-for-recommend-job">
            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-work-item-home-page' src="Image/developer-work-01.png" alt="" />
                <img className='image-logo-item-home-page' src="Logo/job-logo-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>Front-End developer</p>
                <p className='text-work-recommend-job-detail'><b>Salary</b> : 3.000.000 - 5.000.000 LAK<br />
                  <b>Work category</b> : it/web developer/front-end<br />
                  <b>Work Type</b> : Full time<br /></p>
                <p className='text-work-recommend-job-date-posted'><b>Posted : 13/10/2023</b></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-work-item-home-page' src="Image/developer-work-01.png" alt="" />
                <img className='image-logo-item-home-page' src="Logo/job-logo-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>Front-End developer</p>
                <p className='text-work-recommend-job-detail'><b>Salary</b> : 3.000.000 - 5.000.000 LAK<br />
                  <b>Work category</b> : it/web developer/front-end<br />
                  <b>Work Type</b> : Full time<br /></p>
                <p className='text-work-recommend-job-date-posted'><b>Posted : 13/10/2023</b></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-work-item-home-page' src="Image/developer-work-01.png" alt="" />
                <img className='image-logo-item-home-page' src="Logo/job-logo-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>Front-End developer</p>
                <p className='text-work-recommend-job-detail'><b>Salary</b> : 3.000.000 - 5.000.000 LAK<br />
                  <b>Work category</b> : it/web developer/front-end<br />
                  <b>Work Type</b> : Full time<br /></p>
                <p className='text-work-recommend-job-date-posted'><b>Posted : 13/10/2023</b></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-work-item-home-page' src="Image/developer-work-01.png" alt="" />
                <img className='image-logo-item-home-page' src="Logo/job-logo-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>Front-End developer</p>
                <p className='text-work-recommend-job-detail'><b>Salary</b> : 3.000.000 - 5.000.000 LAK<br />
                  <b>Work category</b> : it/web developer/front-end<br />
                  <b>Work Type</b> : Full time<br /></p>
                <p className='text-work-recommend-job-date-posted'><b>Posted : 13/10/2023</b></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

          </div>
          <hr className='hr-bottom-recommend-job' />
          <p className='see-all-item-home-page' onClick={() => navigate('/Findjob')}>See ALL <img className='icon-see-all-to-next-page-home-page' 
          src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>

          {/* find employee */}

          <div className="box-for-text-recommend-job">
          {t("homepage.findemployee")}
          </div>
          <div className="box-item-for-recommend-job">
            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-employee-item-home-page' src="Image/cv-example.jpg" alt="" />
                <img className='image-logo-item-home-page' src="Icon/profile-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>MR George</p>
                <p className='text-work-recommend-job-detail'><b>Position :</b> Project Manager <br />
                  <b>Education</b> : Hogwarts / Magic<br /></p>
                <p className='text-of-location-home-page'><img className='icon-location-home-page' src="Icon/location.png" alt="" /> Ban Donnoun, Vientiane, Laos<br /></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-employee-item-home-page' src="Image/cv-example.jpg" alt="" />
                <img className='image-logo-item-home-page' src="Icon/profile-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>MR George</p>
                <p className='text-work-recommend-job-detail'><b>Position :</b> Project Manager <br />
                  <b>Education</b> : Hogwarts / Magic<br /></p>
                <p className='text-of-location-home-page'><img className='icon-location-home-page' src="Icon/location.png" alt="" /> Ban Donnoun, Vientiane, Laos<br /></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-employee-item-home-page' src="Image/cv-example.jpg" alt="" />
                <img className='image-logo-item-home-page' src="Icon/profile-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>MR George</p>
                <p className='text-work-recommend-job-detail'><b>Position :</b> Project Manager <br />
                  <b>Education</b> : Hogwarts / Magic<br /></p>
                <p className='text-of-location-home-page'><img className='icon-location-home-page' src="Icon/location.png" alt="" /> Ban Donnoun, Vientiane, Laos<br /></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

            <div className="item-for-recommend-job">
              <div className='image-box-work-recommend-home-page'>
                <img className='image-employee-item-home-page' src="Image/cv-example.jpg" alt="" />
                <img className='image-logo-item-home-page' src="Icon/profile-101.png" alt="" />
              </div>
              <div className='item-box-text-home-page'>
                <p className='text-work-recommend-job-haeder'>MR George</p>
                <p className='text-work-recommend-job-detail'><b>Position :</b> Project Manager <br />
                  <b>Education</b> : Hogwarts / Magic<br /></p>
                <p className='text-of-location-home-page'><img className='icon-location-home-page' src="Icon/location.png" alt="" /> Ban Donnoun, Vientiane, Laos<br /></p>
                <hr className='hr-in-recommend-job-detail' />
                <p className='btn-see-more-for-work-detail'>See more 
                <img className='icon-item-see-to-next-page-home-page' src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p>
              </div>
            </div>

          </div>
          <hr className='hr-bottom-recommend-job' />
          <p className='see-all-item-home-page' onClick={() => navigate('/Findemployee')}>See ALL <img className='icon-see-all-to-next-page-home-page' 
          src="Icon/chevron-pointing-to-the-right.png" alt="Next" /></p><br />

        </div>
      </center>
      <Footer />
    </div>
  )
}

export default HomePage