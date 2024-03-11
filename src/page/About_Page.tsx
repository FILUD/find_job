import React from 'react'
import Navbar from '../component/navbar/Navbar_welcome'
import { useTranslation } from 'react-i18next'
import '../css/styles.css'

function About() {
    const [t, i18n] = useTranslation("global");

    return (
    <div> 
        <div className="bg-white rounded-lg px-2 py-8 ring-2 ring-slate-900/5 shadow-xl ">
        <Navbar/>
        </div>
        
        <div className="">

        </div>
    </div>

    )


}


export default About
