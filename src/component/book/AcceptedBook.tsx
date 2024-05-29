import React, { useEffect, useState } from 'react';
import { useTheme } from '../../theme/theme';
import SetNavbar from '../navbar/SetNavbar';
import axios from 'axios';
import Book_tab from './tab/Book_tab';
import HashLoader from 'react-spinners/HashLoader';

interface BookProps {
    userID: number; // JobseekerID or EmployerID
    role: string;
}
interface CardProps {
    CardID: number;
    JobseekerID: number;
    EmployerID: number;
    JobID: number;
    ID: number;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
    IMG_Card: string;
    Title: string;
    OccupationID: number;
    Description: string;
    SalaryStart: number;
    SalaryMax: number;
    WorkType: string;
    OccupationName: string;
    CategoryName: string;
    UserInfo: UserInfo;
    JobType: string;
}

interface UserInfo {
    ID: number,
    UserID: number,
    Name: string,
    // Title: string,
    // AddressID: number,
    Tel: string,
    Profile_IMG: string,
    // VillageName: string,
    // DistrictName: string,
    // ProvinceName: string,
    Email: string,
    // Role: string
}

function AcceptedBook() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('Pending');
    const [cardList, setCardList] = useState<CardProps[]>([]);
    const [userData, setUserData] = useState<BookProps | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState('')
    const [message, setMessage] = useState<string | null>(null);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const datalocalID = localStorage.getItem('ID');
        const datalocalRole = localStorage.getItem('Role');
        if (datalocalID && datalocalRole) {
            const parsedData = {
                userID: JSON.parse(datalocalID),
                role: JSON.parse(datalocalRole)
            };
            setUserData(parsedData);
        }
    }, []);

    useEffect(() => {
        if (userData) {
            const fetchData = async (Id: number, role: string, status: string) => {
                setIsLoading(true);
                try {
                    const response = await axios.post('http://localhost:3001/showJobBook', { userID: Id, role: role, status: status });
                    if (response.data) {
                        setCardList(response.data.data || []);
                        console.log(response.data);
                        setRole(role);
                    } else {
                        setMessage('No job details found for this user.');
                    }
                } catch (error) {
                    console.error('Error fetching job details:', error);
                    setMessage('Error fetching job details.');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData(userData.userID, userData.role, activeTab);
        }
    }, [activeTab, userData]);

    const pendingJobs = cardList.filter(e => e.Status === 'Pending');
    const acceptedJobs = cardList.filter(e => e.Status === 'Accepted');

    return (
        <html data-theme={theme}>
            <div>
                <SetNavbar />
                <div className='px-10'>
                    <div role="tablist" className="tabs tabs-lifted mt-10 bg-black bg-opacity-25 rounded-2xl pt-2 pb-1 px-1">
                        {/* Tab 1 */}
                        <input
                            type="radio"
                            name="tab_list"
                            role="tab"
                            className="tab"
                            aria-label="Pending Job"
                            checked={activeTab === 'Pending'}
                            onChange={() => handleTabChange('Pending')}
                        />
                        {activeTab === 'Pending' && (
                            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-b-box p-6">
                                <div className='w-full bg-purple-800 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
                                    <p className='p-2 font-bold text-center'>Pending Job</p>
                                </div>


                                {isLoading ? (
                                    <div className="flex justify-center items-center mt-8 mb-8">
                                        <HashLoader color="#36d7b7" loading={isLoading} size={50} />
                                    </div>
                                ) : (
                                    <div>
                                        {pendingJobs.length === 0 ? (
                                            <div>There is no pending</div>
                                        ) : (
                                            <Book_tab data={pendingJobs} role={role} />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab 2 */}
                        <input
                            type="radio"
                            name="tab_list"
                            role="tab"
                            className="tab"
                            aria-label="Accepted Job"
                            checked={activeTab === 'Accepted'}
                            onChange={() => handleTabChange('Accepted')}
                        />
                        {activeTab === 'Accepted' && (
                            <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-b-box p-6">
                                <div className='w-full bg-purple-800 mt-10 rounded-md mb-1 text-4xl bg-gradient-to-r from-purple-500 to-pink-500'>
                                    <p className='p-2 font-bold text-center'>Accepted Job</p>
                                </div>
                                {isLoading ? (
                                    <div className="flex justify-center items-center mt-8 mb-8">
                                        <HashLoader color="#36d7b7" loading={isLoading} size={50} />
                                    </div>
                                ) : (
                                    <div>
                                        {acceptedJobs.length === 0 ? (
                                            <div>There is no accepted job here</div>
                                        ) : (
                                            <Book_tab data={acceptedJobs} role={role} />
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </html>
    );
}

export default AcceptedBook;