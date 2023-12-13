import React, { useState } from 'react'
import './Popup_profile.css'
import './Authentication.css'

const ProfileOption = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopupProfileOption = () => {
        setIsOpen(!isOpen);
    };


    // toggle pop-up login 
    return (
        <div>

            <img className='popup-profile-option' src='Icon/user.png' onClick={togglePopupProfileOption}></img>
            {isOpen && (
                <div className="popup-profile-container">
                    <div className="popup-profile-content">

                        <p className='text-popup-profile-options'>Select options</p>


                        <div className='button-profile-option'>
                            <center>
                                <button className='button-profile-option-create-employee-acccount' >Create employee account</button>
                                <button className='button-profile-option-create-company-account' >Create company account</button>
                            </center>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileOption