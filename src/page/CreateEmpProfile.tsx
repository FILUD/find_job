import React from 'react'
import '../css/EmpProfile.css'

function CreateEmpProfile() {
    return (
        <center className='createEmpProfile-head'>
            <div className='createEmpProfile-container'>
                <div className='createEmpProfile-container-top'>
                    <div className='createEmpProfile-container-top-left'>
                        <img className='user-profile-profile-page' src="Icon/profile-101.png" alt="Profile" />
                    </div>
                    <div className='createEmpProfile-container-top-center-left'>
                        <input className='input-name-infomation-user' type="text" />
                        <input className='input-name-infomation-user input-name-infomation-user-center' type="text" />
                        <input className='input-name-infomation-user' type="text" /></div>
                    <div className='createEmpProfile-container-top-center-right'>
                        <button className='createEmpProfile-button-save'>Save Profile</button>
                    </div>
                    <div className='createEmpProfile-container-top-right'>
                        <img className='createEmpProfile-btn-close' src="Icon/close.png" alt="Close" />
                    </div>
                </div>
                <div className='createEmpProfile-container-bottom'>
                    <div className='createEmpProfile-container-bottom-left'>
                        <textarea className='fix-size-phone-and-email createEmpProfile-phone-number-user' name="Description" id="phone-number-user" cols={30} rows={4}></textarea>
                        <textarea className='fix-size-phone-and-email createEmpProfile-email-user' name="Description" id="email-user" cols={30} rows={4}></textarea>
                    </div>
                    <div className='createEmpProfile-container-bottom-center'>
                        <textarea name="Description" id="" cols={30} rows={10}></textarea>
                    </div>
                    
                    <div className='createEmpProfile-container-bottom-right'>
                    <img src="" alt="PDF" />
                    <button>Create My CV</button>
                    </div>

                </div>

            </div>
        </center>
    )
}

export default CreateEmpProfile