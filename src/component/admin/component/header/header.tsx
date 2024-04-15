import React, { useState } from 'react';
import SearchModal from './search';
import DropdownNotifications from './notification';
import Profile_admin from './profile';
import { ThemeToggle } from '../../../../theme/theme';
import Sidebar from '../sidebar/sidebar';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    changeDashBoard:  (dashboardName: string) => void;
}

function Header({ sidebarOpen, setSidebarOpen, changeDashBoard: changeDashBoardName }: HeaderProps) {
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    return (
        <header className="sticky top-0 bg-white dark:bg-base-200 border-b border-slate-200 dark:border-slate-700 z-30">
            <div className="px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <Sidebar onChangeDashboard={changeDashBoardName} />

                    {/* Header: Right side */}
                    <div className="flex items-center space-x-3">
                        <SearchModal />
                        <DropdownNotifications align={'right'} />
                        <ThemeToggle />
                        <Profile_admin />
                    </div>
                </div>
            </div>
        </header >
    );
}

export default Header;
