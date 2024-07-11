import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Transition } from '@headlessui/react';
import { format } from 'date-fns'
import Swal from 'sweetalert2';

interface UserData {
    ID: string;
    Role: string;
}

interface DropdownNotificationsProps {
    align: 'left' | 'right';
}

interface NotiDataProps {
    type: string;
    typeID: number;
    EmployerID: number;
    JobseekerID: number;
    Status: string;
    image: string;
    UpdatedAt: string;
    who: number;
    Name: string;
    Profile_IMG: string;
    Email: string;
}

const DropDownNotification: React.FC<DropdownNotificationsProps> = ({ align }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [notiData, setNotiData] = useState<NotiDataProps[]>([]);

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target as Node) || (trigger.current && trigger.current.contains(target as Node))) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [dropdownOpen]);

    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [dropdownOpen]);

    useEffect(() => {
        const datalocalID = localStorage.getItem('ID');
        const datalocalRole = localStorage.getItem('Role');
        if (datalocalID && datalocalRole) {
            const parsedData = {
                ID: JSON.parse(datalocalID),
                Role: JSON.parse(datalocalRole)
            };
            setUserData(parsedData);
        }
    }, []);

    useEffect(() => {
        if (dropdownOpen && userData) {
            const fetchData = async () => {
                try {
                    console.log(userData.Role)
                    const response = await axios.post<{ data: NotiDataProps[] }>('http://localhost:3001/listNoti', { ID: userData.ID, Role: userData.Role });
                    const result = response.data.data;
                    const flattenedData = result.flat();
                    setNotiData(flattenedData);
                } catch (error) {
                    console.error('Error fetching notification data:', error);
                }
            };
            fetchData();
        }
    }, [dropdownOpen, userData]);

    const handleAccept = async (ID: number) => {
        if (userData && dropdownOpen) {
            try {
                let typeID = "";
                let tableName = "";
                let type = "";

                switch (userData.Role) {
                    case "Jobseeker": {
                        typeID = "invitationID";
                        tableName = "acceptInvitation";
                        type = "Invitation";
                        break;
                    }
                    case "Employer": {
                        typeID = "requestID";
                        tableName = "acceptJobRequest";
                        type = "Request";
                        break;
                    }
                    default:
                        break;
                }
                if (userData.Role !== "") {
                    //TODO:  complete the ID 
                    await axios.post(`http://localhost:3001/${tableName}`, { [typeID]: ID });
                    Swal.fire({
                        icon: 'success',
                        title: `Job ${type}`,
                        text: `Accepted Job ${type}`,
                    });
                }
            } catch (error) {
                console.error('Error accepting job invitation:', error);
            }
        }
    };

    // const handleCancle = async () => {
    //     try {
    //         // await axios.post('http://localhost:3001/acceptInvitation', { invitationID: data.CardID });
    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Job Request',
    //             text: 'Rejected the request!',
    //         });
    //     } catch (error) {
    //         console.error('Error Rejected request:', error);
    //     }
    // };

    return (
        <div className="relative inline-flex">
            <button
                className="btn btn-ghost btn-circle"
                ref={trigger}
                aria-haspopup="true"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
            >
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
            </button>

            <Transition
                show={dropdownOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-100"
                className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-base-200 dark:bg-base-300 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-y-auto h-58 overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">Notifications</div>
                    <ul>
                        {notiData.map((e, index) => (
                            <li className="border-b border-slate-200 dark:border-slate-700 last:border-0" key={index}>
                                <div
                                    className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
                                    // to="#0"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="block text-sm mb-2 mt-2">📣
                                        <span className=" font-semibold">
                                            {e.Name || 'ບໍ່ລະບຸ'}
                                        </span>
                                        {e.Status == "Accepted" ? " ໄດ້ຍອມຮັບຄຳຮ້ອງຂໍສະໝັກຂອງທ່ານແລ້ວ" : " ທ່ານຕ້ອງການຍອມຮັບຄຳຮ້ອງຂໍ ຫຼຶ ບໍ່"}
                                        {e.type}
                                        <div className='flex justify-center space-x-3'>
                                            {e.Status == "Accepted" ? null : (
                                                <>
                                                    <button className="btn btn-primary focus-in-contract-bck btn-sm mt-2" onClick={() => handleAccept(e.typeID)}> Accept</button>
                                                    <button className="btn btn-outline focus-in-contract-bck btn-sm mt-2" > Cancle</button>
                                                </>
                                            )}
                                        </div>

                                    </span>
                                    <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">
                                        {/* Date formatting */}
                                        {/* {format(new Date(e.UpdatedAt), 'MMMM dd, yyyy')} */}
                                        {format(new Date(e.UpdatedAt), 'MMMM dd, yyyy HH:mm')}
                                        {/* {format(new Date(e.UpdatedAt), 'MMMM dd, yyyy HH:mm:ss')} */}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Transition>
        </div>
    );
}

export default DropDownNotification;
