import React from 'react'
import '../css/AboutPage.css'
import Navbar from '../component/navbar/navbar_welcome'

function About_Page() {
  return (
    <div>
      <Navbar />
      <div>
        <center>
          <p className='text-title-about'>
            Welcome to Bridging Talent, your one-stop destination for finding employment opportunities
            and connecting with talented students eager to contribute their skills and knowledge to your
            company. Our platform was founded by a group of enthusiastic final-year students from various
            disciplines, who recognized the need for a more efficient and student-friendly way to connect
            with potential employers.
          </p>
          <br />
          <hr className='hr-about' />

          <p className='text-header-developer'>Developer</p></center>
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
            <p className='text-detail-title-about'>For Job Seekers:</p>
            <p className='text-detail-in-box-about'>Are you on the hunt for your dream job or simply exploring new career
              opportunities? Our platform offers a user-friendly interface and powerful
              tools to help you find the job that aligns with your skills, experience,
              and aspirations. You can create a comprehensive profile, upload your resume,
              and browse a wide range of job listings from various industries. We also provide resources and guides to enhance your job search, including tips on resume building, interview preparation, and career advice.</p>
          </div>


          <div className='box-text-detail-about'>
            <p className='text-detail-title-about'>For Job Seekers:</p>
            <p className='text-detail-in-box-about'>Finding the right employee for your company is crucial to its success. We understand
              the challenges of recruitment and offer an easy-to-use platform for posting job
              openings, reviewing applications, and conducting interviews. Our advanced search
              and filtering options allow you to quickly identify candidates who meet your specific
              criteria. We're committed to helping you build a talented and diverse workforce that
              aligns with your company's goals and values.</p>
              </div>
  

          <div className='box-text-detail-about'>
          <p className='text-detail-title-about'>For Job Seekers:</p>
          <p className='text-detail-in-box-about'>At our core, we are dedicated to creating connections that lead to success.
            We are passionate about helping individuals achieve their career goals and supporting
            companies in building strong, dynamic teams. Our commitment to facilitating these connections
            is driven by a desire to contribute to individual growth, company prosperity, and overall economic
            development.</p>
            </div>


            </div>
      </div>
    </div>
  )
}

export default About_Page