import React from 'react'
import './Footer.css'
import { useNavigate } from 'react-router-dom';

function Footer() {

  const navigate = useNavigate();

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/', '_blank');
  };

  const handleTwitterClick = () => {
    window.open('https://twitter.com/', '_blank');
  };

  return (
    <div className="container-footer">

      <div className="footer-logo-left">
        <img src="/logo/job-logo-black.png" alt="Logo" />
      </div>

      <div className="footer-center-text">
        <center>
          <p><b>Contact Us</b></p>
          <p className='footer-contact-detail'>
            Georgebtv@icloud.com <br />
            ticmhk2002@gmail.com <br />
            +856 20 56595957 <br />
            +856 20 56591696 <br />
          </p>


          <div className="footer-navigate">
            <p className='text-footer-navigate'
              onClick={() => navigate('/About')}>Website terms</p> <p>│</p>
            <p className='text-footer-navigate'
              onClick={() => navigate('/About')}>Privacy Policy</p> <p>│</p>
            <p className='text-footer-navigate'
              onClick={() => navigate('/About')}>Developer team</p>
          </div>

          <div className="footer-icon-contact">
            <img className='img-footer-icon' src="/icon/facebook-footer.png" alt="fackbook" onClick={handleFacebookClick} />
            <img className='img-footer-icon' src="/icon/instagram-footer.png" alt="twitter" onClick={handleInstagramClick} />
            <img className='img-footer-icon' src="/icon/twitter-sign-footer.png" alt="twitter" onClick={handleTwitterClick} />
          </div>

        </center>
      </div>

      <div className="footer-right">

      </div>
    </div>
  )
}

export default Footer