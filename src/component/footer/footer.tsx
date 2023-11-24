import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className="container-footer">

      <div className="footer-logo-left">
        <img src="/logo/job-logo-black.png" alt="Logo" />
      </div>

      <div className="footer-center-text">
        <center>
          <p>Contact Us</p>
          <p className='footer-contact-detail'>
            Georgebtv@icloud.com <br />
            ticmhk2002@gmail.com <br />
            +856 20 56595957 <br />
            +856 20 56591696 <br />
          </p>

          <div className="footer-navigate">
            <p>Website terms</p> <p>│</p>
            <p>Privacy Policy</p> <p>│</p>
            <p>Developer team</p>
          </div>

          <div className="footer-icon-contact">
            <img src="/icon/facebook-footer.png" alt="fackbook" />
            <img src="/icon/instagram-footer.png" alt="twitter" />
            <img src="/icon/twitter-sign-footer.png" alt="twitter" />
          </div>

        </center>
      </div>

      <div className="footer-right">
      
      </div>

    </div>
  )
}

export default Footer