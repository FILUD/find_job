import { Transition } from '@headlessui/react';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface UserData {
    ID: string;
    Role: string;
}

interface DropdownNotificationsProps {
    align: 'left' | 'right';
}

const DropDownNotification: React.FC<DropdownNotificationsProps> = ({ align }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement>(null);
    const dropdown = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState<UserData | null>(null);

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
    // const localID = localStorage.getItem('ID');
    // const localRole = localStorage.getItem('Role');

    useEffect(() => {
        if (dropdownOpen == true) {
            console.log(dropdownOpen)
            console.log(userData)
            if (userData) {
                const fetchData = async () => {
                    try {
                        const response = await axios.post('http://localhost:3001/listNoti', { ID: userData.ID, Role: userData.Role });
                        console.log("notification", response.data);
                    } catch (error) {
                        console.error('Error fetching notification data:', error);
                    }
                };
                fetchData();
            }
        }
        if (dropdownOpen == false) {
            console.log(dropdownOpen)
        }
    },);

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
                leaveTo="opacity-0"
                className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
            >
                <div
                    ref={dropdown}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={() => setDropdownOpen(false)}
                >
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-4">Notifications</div>
                    <ul>
                        <li className="border-b border-slate-200 dark:border-slate-700 last:border-0">
                            <Link
                                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
                                to="#0"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="block text-sm mb-2">📣 <span className="font-medium text-slate-800 dark:text-slate-100">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                                <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">Feb 12, 2021</span>
                            </Link>
                        </li>
                        <li className="border-b border-slate-200 dark:border-slate-700 last:border-0">
                            <Link
                                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
                                to="#0"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="block text-sm mb-2">📣 <span className="font-medium text-slate-800 dark:text-slate-100">Edit your information in a swipe</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                                <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">Feb 9, 2021</span>
                            </Link>
                        </li>
                        <li className="border-b border-slate-200 dark:border-slate-700 last:border-0">
                            <Link
                                className="block py-2 px-4 hover:bg-slate-50 dark:hover:bg-slate-700/20"
                                to="#0"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="block text-sm mb-2">🚀<span className="font-medium text-slate-800 dark:text-slate-100">Say goodbye to paper receipts!</span> Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                                <span className="block text-xs font-medium text-slate-400 dark:text-slate-500">Jan 24, 2020</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Transition>
        </div>
    );
}

export default DropDownNotification;
