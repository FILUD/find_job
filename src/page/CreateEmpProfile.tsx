import React, { useEffect, useRef, useState } from 'react'
import '../component/global_css/global.css'
import '../css/CreateEmpProfile.css'
import { Link, useNavigate } from 'react-router-dom';

function CreateEmpProfile() {

    const navigate = useNavigate();

    //hide placeholder 
    const [phoneContent, setPhoneContent] = useState<string>('');
    const [emailContent, setEmailContent] = useState<string>('');
    const [DescriptionInput, setDescriptionInput] = useState<string>('');

    const handlePhoneInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPhoneContent(event.target.value);
    };

    const handleEmailInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmailContent(event.target.value);
    };

    const handleDescriptionInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionInput(event.target.value);
    };
    //end

    return (
        <center className='createEmpProfile-head'>
            <div className='createEmpProfile-container'>
                <div className='createEmpProfile-container-top'>
                    <div className='createEmpProfile-container-top-left'>
                        <img className='user-profile-profile-page' src="Icon/profile-101.png" alt="Profile" />
                        <img className='user-profile-profile-page-edit-icon' src="Icon/icon-pen-edit.png" alt="Edit" />
                    </div>
                    <div className='createEmpProfile-container-top-center-left'>
                        <input className='input-name-infomation-user' type="text" placeholder='Full Name' />
                        <input className='input-name-infomation-user input-name-infomation-user-center' type="text" placeholder='Position job' />
                        <input className='input-name-infomation-user' type="text" placeholder='Address' /></div>
                    <div className='createEmpProfile-container-top-center-right'>
                        <button onClick={() => navigate('/EmpProfile')} className='createEmpProfile-button-save'>Save My Profile</button>
                    </div>
                    <div className='createEmpProfile-container-top-right'>
                        <img className='createEmpProfile-btn-close' src="Icon/close.png" alt="Close" />
                    </div>
                </div>
                <div className='createEmpProfile-container-bottom'>

                    <div className='createEmpProfile-container-bottom-left'>
                        <textarea
                            className='fix-size-phone-and-email createEmpProfile-phone-number-user'
                            name="Description"
                            id="phone-number-user"
                            cols={30}
                            rows={4}
                            value={phoneContent}
                            onChange={handlePhoneInput}
                        ></textarea>
                        <div className='createEmpProfile-box-input-contact'>
                            <img className={`createEmpProfile-img-placeholder ${phoneContent.length > 0 ? 'hidden' : ''}`} src="Icon/tel-icon.png" alt="Tel" />
                            <p className={`createEmpProfile-text-placeholder ${phoneContent.length > 0 ? 'hidden' : ''}`}>Enter Telephone...</p>
                        </div>

                        <textarea
                            className='fix-size-phone-and-email createEmpProfile-email-user'
                            name="Description"
                            id="email-user"
                            cols={30}
                            rows={4}
                            value={emailContent}
                            onChange={handleEmailInput}
                        ></textarea>
                        <div className='createEmpProfile-box-input-contact'>
                            <img className={`createEmpProfile-img-placeholder ${emailContent.length > 0 ? 'hidden' : ''}`} src="Icon/mail-icon.png" alt="Email" />
                            <p className={`createEmpProfile-text-placeholder ${emailContent.length > 0 ? 'hidden' : ''}`}>Enter Email...</p>
                        </div>

                    </div>
                    <div className='createEmpProfile-container-bottom-center'>
                        <div className='createEmpProfile-head-box'>
                            <p className='createEmpProfile-container-bottom-center-text-header'>Description</p></div>
                        <div className='createEmpProfile-box'>
                            <div className='createEmpProfile-input-container'>
                                <textarea
                                    className='createEmpProfile-input-text-description'
                                    name="Description"
                                    id=""
                                    cols={30}
                                    rows={11}
                                    value={DescriptionInput}
                                    onChange={handleDescriptionInput}
                                />
                                <p className={`createEmpProfile-input-placeholder placeholder-description ${DescriptionInput.length > 0 ? 'hidden' : ''}`}>Enter Description...</p>
                            </div>
                        </div>
                    </div>
                    <div className='createEmpProfile-container-bottom-right'>
                        <div className='createEmpProfile-container-bottom-center'>
                            <div className='createEmpProfile-head-box'>
                                <p className='createEmpProfile-container-bottom-center-text-header'>My CV</p></div>
                            <div className='createEmpProfile-box createEmpProfile-box-cv'>
                                <div className='createEmpProfile-input-container createEmpProfile-cv-content'>
                                    <img className='createEmpProfile-cv-post-pdf' src="Icon/btn-add-pdf.png" alt="ADD PDF" />
                                    <div className='vertical-line'></div>
                                    <button className='createEmpProfile-btn-create-cv'>Create My CV</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </center>
    )
}

export default CreateEmpProfile