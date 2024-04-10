
import React, { useState } from "react";


interface SubMenuStates {
    managerSubMenuOpen: boolean;
    communicationSubMenuOpen: boolean;
    addressSubMenuOpen: boolean;
}

interface SidebarProps {
    onChangeDashboard: (dashboardName: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({ onChangeDashboard }) => {

    const [subMenuStates, setSubMenuStates] = useState<SubMenuStates>({
        managerSubMenuOpen: true,
        communicationSubMenuOpen: false,
        addressSubMenuOpen: false
    });

    function toggleSubMenu(subMenuKey: keyof SubMenuStates) {
        setSubMenuStates(prevState => ({
            ...prevState,
            [subMenuKey]: !prevState[subMenuKey]
        }));
    }

    const handleDashboardClick = (dashboardName: string) => {
        onChangeDashboard(dashboardName);
    };


    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open Sidebar</label>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-1 ">
                    <div className="p-2 mt-3 mb-4">
                        <a href="/admin_dashboard">
                            {/* <div className="w-full  ">
                                <img src="https://via.placeholder.com/200x80.png" alt="Placeholder" />
                            </div> */}
                            <p className="text-xl font-semibold"> Admin dashboard</p>
                        </a>    
                    </div>

                    <div className=" text-base-content">
                        {/* <li className="menu dropdown outline outline-1 rounded-2xl ">
                            <a href="#" className="drawer-overlay" onClick={() => toggleSubMenu('managerSubMenuOpen')}>
                                <kbd className="kbd w-4 h-4 self-end place-content-center">⌘</kbd>
                                Manager
                                <kbd className="w-4 h-4 self-end m-2">{subMenuStates.managerSubMenuOpen ? '▲' : '▼'}</kbd>
                            </a>
                            <ul className={`submenu ${subMenuStates.managerSubMenuOpen ? "" : "hidden"}`}>
                                <li onClick={() => handleDashboardClick("dashboard_manager")}>
                                    <a href="#">Manager1</a>
                                </li>
                                <li onClick={() => handleDashboardClick("dashboard_people")}>
                                    <a href="#">Manager2</a>
                                </li>
                            </ul>
                        </li>
                        <li className="menu dropdown outline outline-1  rounded-2xl">
                            <a href="#" className="drawer-overlay" onClick={() => toggleSubMenu('communicationSubMenuOpen')}>
                                <kbd className="kbd w-4 h-4 self-end place-content-center">C</kbd>
                                Communication
                                <kbd className="w-4 h-4 self-end m-2">{subMenuStates.communicationSubMenuOpen ? '▲' : '▼'}</kbd>
                            </a>
                            <ul className={`submenu ${subMenuStates.communicationSubMenuOpen ? "" : "hidden"}`}>
                                <li><a href="#">People</a></li>
                                <li><a href="#">People2</a></li>
                            </ul>
                        </li>
                        <li className="menu dropdown outline outline-1 rounded-2xl">
                            <a href="#" className="drawer-overlay" onClick={() => toggleSubMenu('addressSubMenuOpen')}>
                                <kbd className="kbd w-4 h-4 self-end place-content-center">A</kbd>
                                Address
                                <kbd className="w-4 h-4 self-end m-2">{subMenuStates.addressSubMenuOpen ? '▲' : '▼'}</kbd>
                            </a>
                            <ul className={`submenu ${subMenuStates.addressSubMenuOpen ? "" : "hidden"}`}>
                                <li onClick={() => handleDashboardClick("dashboard_district")}>
                                    <a href="#">District</a>
                                </li>
                                <li onClick={() => handleDashboardClick("dashboard_province")}>
                                    <a href="#">Province</a>
                                </li>
                            </ul>
                        </li> */}
                        <div className="collapse collapse-arrow bg-base-200 ">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-lg font-medium  ">
                                <kbd className="kbd w-2 h-2 text-md mx-2">⌘</kbd>
                                Mangement
                            </div>
                            <div className="collapse-content space-y-1">
                                <ul className="font-semibold">
                                    <li onClick={() => handleDashboardClick("dashboard_manager")}>
                                        <a href="#">Mangement1</a>
                                    </li>

                                    <li onClick={() => handleDashboardClick("dashboard_people")}>
                                        <a href="#">Mangement2</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="collapse collapse-arrow bg-base-200 ">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-lg font-medium ">
                                <kbd className="kbd w-2 h-2 mx-2 text-md">C</kbd>
                                Commnuication
                            </div>
                            <div className="collapse-content space-y-1">
                                <ul className="font-semibold">
                                    <li onClick={() => handleDashboardClick("dashboard_district")}>
                                        <a href="#">People</a>
                                    </li>

                                    <li onClick={() => handleDashboardClick("dashboard_province")}>
                                        <a href="#">Communication1</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="collapse collapse-arrow bg-base-200 ">
                            <input type="radio" name="my-accordion-2" />
                            <div className="collapse-title text-lg font-medium  ">
                                <kbd className="kbd w-2 h-2 text-md mx-2">A</kbd>
                                Address
                            </div>
                            <div className="collapse-content space-y-1">
                                <ul className="font-semibold">
                                    <li onClick={() => handleDashboardClick("dashboard_district")}>
                                        <a href="#">District</a>
                                    </li>

                                    <li onClick={() => handleDashboardClick("dashboard_province")}>
                                        <a href="#">Province</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </ul >
            </div >
        </div >
    );
}

export default Sidebar;
