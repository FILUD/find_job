import React from 'react'
import { useNavigate } from 'react-router-dom';
// import '../css/ErrorPage.css'

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div>
    <section className="wrapper-error-page">
      <div className="top-error-page">Oops!</div>
      <div className="bottom-error-page" aria-hidden="true">Oops!</div>
      <p className="error-message-error-page">Somthing went wrong.</p>
      <button onClick={() => navigate('/Home')} className='button-back-to-home-error-page'>Back to HomePage</button>
    </section>
    </div>
  )
}

export default ErrorPage