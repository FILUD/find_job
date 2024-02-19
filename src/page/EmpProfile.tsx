import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../css/EmpProfile.css'

import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

function EmpProfile() {
  const pdfUrl = '/TestPDF/Clover.pdf';

  const navigate = useNavigate();

  return (
    <center className='createEmpProfile-head'>
      <div className='createEmpProfile-container'>
        <div className='createEmpProfile-container-top'>
          <div className='createEmpProfile-container-top-left'>
            <img className='user-profile-profile-page' src="Icon/profile-101.png" alt="Profile" />
          </div>
          <div className='createEmpProfile-container-top-center-left'>
            <p className='EmpProfile-full-name'>George Bounthavong</p>
            <p className='EmpProfile-position-job'>Developer and computer engineering</p>
            <p className='EmpProfile-address'>
              <img src="Icon/icon-location.png"
                className='EmpProfile-icon-location'
                alt="Location" />Ban Donnoun, Vientiane, Laos</p>
          </div>
          <div className='createEmpProfile-container-top-center-right'>
            <button onClick={() => navigate('/CreateEmpProfile')} className='createEmpProfile-button-save'>Edit My Profile</button>
          </div>
          <div className='createEmpProfile-container-top-right'>
            <img className='createEmpProfile-btn-close' onClick={() => navigate('/Home')} src="Icon/close.png" alt="Close" />
          </div>
        </div>
        <div className='createEmpProfile-container-bottom'>

          <div className='createEmpProfile-container-bottom-left'>
            <div className='EmpProfile-grid-small-contact'>
              <div className='EmpProfile-box-icon-font-contact'>
                <img className='EmpProfile-icon-font-contact' src="Icon/icon-call.png" alt="Phone" />
              </div>
              <div className='EmpProfile-box-phone-number'>
                <p className='EmpProfile-phone-number'>020 99999999</p>
                <p className='EmpProfile-phone-number'>020 99999999</p>
                <p className='EmpProfile-phone-number'>020 99999999</p>
              </div>
            </div>
            <div className='EmpProfile-grid-small-contact'>
              <div className='EmpProfile-box-icon-font-contact'>
                <img className='EmpProfile-icon-font-contact' src="Icon/icon-mail.png" alt="Email" />
              </div>
              <div className='EmpProfile-box-gmail'>
                <p className='EmpProfile-gmail'>george@gg.com</p>
                <p className='EmpProfile-gmail'>george@ggg.com</p>
                <p className='EmpProfile-gmail'>george@gggg.com</p>
              </div>
            </div>
          </div>
          <div className='createEmpProfile-container-bottom-center'>
            <div className='createEmpProfile-head-box'>
              <p className='createEmpProfile-container-bottom-center-text-header'>Description</p></div>
            <div className='createEmpProfile-box'>
              <div className='EmpProfile-box-description'>
                <p className='EmpProfile-description'>ttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestesttesttest</p>
              </div>
            </div>
          </div>
          <div className='createEmpProfile-container-bottom-right'>
            <div className='createEmpProfile-container-bottom-center'>
              <div className='createEmpProfile-head-box'>
                <p className='createEmpProfile-container-bottom-center-text-header'>My CV</p></div>
              <div className='createEmpProfile-box createEmpProfile-box-cv'>
                <div className='createEmpProfile-input-container createEmpProfile-cv-content'>

                  <center>
                    <div className='emp-profile-pdf'>
                      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${'^3.11.174/build/pdf.worker.min.js'}`}>
                        <Viewer fileUrl={pdfUrl} />
                      </Worker>
                    </div>
                  </center>

                  {/* <img className='createEmpProfile-cv-post-pdf' src="Icon/btn-add-pdf.png" alt="ADD PDF" />
                  <div className='vertical-line'></div>
                  <button className='createEmpProfile-btn-create-cv'>Create My CV</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </center>
  )
}

export default EmpProfile