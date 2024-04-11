import { useState } from "react";


interface SubMenuStates {
    managerSubMenuOpen: boolean;
    communicationSubMenuOpen: boolean;
    addressSubMenuOpen: boolean;
}

function Sidebar() {
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


    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open Sidebar</label>
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content space-y-1 ">
                    <div className="p-2 ">
                        <a href="/admin_dashboard">
                            <div className="w-full  ">
                                <img src="https://via.placeholder.com/200x80.png" alt="Placeholder" /> {/* Corrected the image source */}
                            </div>
                            <p className="text-2xl font-semibold"> Admin dashboard</p>
                        </a>
                    </div>

                    <div className=" text-base-content space-y-2">
                        <li className="menu dropdown outline outline-1 rounded-2xl ">
                            <a href="#" className="drawer-overlay" onClick={() => toggleSubMenu('managerSubMenuOpen')}>
                                <kbd className="kbd w-4 h-4 self-end place-content-center">⌘</kbd>
                                Manager
                                <kbd className="w-4 h-4 self-end m-2">{subMenuStates.managerSubMenuOpen ? '▲' : '▼'}</kbd>
                            </a>
                            <ul className={`submenu ${subMenuStates.managerSubMenuOpen ? "" : "hidden"}`}>
                                <li><a href="#">Manager1</a></li>
                                <li><a href="#">Manager2</a></li>
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
                                <li><a href="#">Address1</a></li>
                                <li><a href="#">Address2</a></li>
                            </ul>
                        </li>

                    </div>
                </ul >
            </div >
        </div >
    );
}

export default Sidebar;
