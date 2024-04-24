import React from "react";
import Navbar from "./Navbar";
import NavbarWelcome from "./Navbar_welcome";

const SetNavbar: React.FC = () => {
    const getRole = localStorage.getItem('Role');
    const getUserID = localStorage.getItem('UserID');

    if (getRole !== null && getUserID !== null) {
        return <Navbar />;
    } else {
        return <NavbarWelcome />;
    }
}

export default SetNavbar;
