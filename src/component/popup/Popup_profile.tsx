import React, { useState, useRef, useEffect } from 'react';
import './Popup_profile.css';
import './Authentication.css';
import { useNavigate } from 'react-router-dom';

const ProfileOption = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);

    const togglePopupProfileOption = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation(); // Prevent the click from reaching the document click handler
        togglePopupProfileOption();
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div>
            <img
                className='popup-profile-option'
                src='Icon/user.png'
                onClick={(e) => handleClick(e)}
            ></img>
            {isOpen && (
                <div ref={popupRef} className="popup-profile-container">
                    <div className="popup-profile-content">
                        <p className='text-popup-profile-options'>Select options</p>
                        <div className='button-profile-option'>
                            <center>
                                <button onClick={() => navigate('/CreateEmpProfile')}className='button-profile-option create-employee-acccount'>Create employee account</button>
                                <button className='button-profile-option create-company-account'>Create company account</button>
                            </center>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileOption;
