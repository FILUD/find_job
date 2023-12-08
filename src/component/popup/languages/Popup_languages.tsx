import React, { useState } from 'react'
import './Popup_languages.css'
import { colors } from '@mui/joy';
// import './Authentication.css'


const LanguagesOption = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopupLanguagesOption = () => {
        setIsOpen(!isOpen);
    };


    // toggle pop-up login 
    return (
        <div>

            <img className='popup-languages-option' src='Logo/language.png' onClick={togglePopupLanguagesOption}></img>
            {isOpen && (
                <div className="popup-languages-container">
                    <div className="popup-languages-content">
                        {/* <center>
                        <p className='text-popup-languages-options'>Choose Languages</p>
                        </center> */}

                        <div className='button-languages-option'>
                            <ul className='dropdown-menu-languages'>
                                    <li className='languages-shadhow'>   <button className='button-languages-option-english'><img className='flag-icon' src='Logo/english_flag.jpg'/> English</button> </li>
                                    <li className='languages-shadhow'>   <button className='button-languages-option-thai' ><img className='flag-icon' src='Logo/thai_flag.jpg'/>ไทย</button></li>
                                    <li className='languages-shadhow'>   <button className='button-languages-option-english'><img className='flag-icon' src='Logo/english_flag.jpg'/> English</button> </li>
                                    <li className='languages-shadhow'>   <button className='button-languages-option-thai' ><img className='flag-icon' src='Logo/thai_flag.jpg'/>ไทย</button></li>
                                    <li className='languages-shadhow'>   <button className='button-languages-option-lao' ><img className='flag-icon' src='Logo/laos_flag.jpg'/>ລາວ</button></li>
                                
                           
                            </ul>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguagesOption