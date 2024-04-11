import React, { useEffect, useState } from 'react';
import Header from '../component/header/header';
import { ThemeToggle, useTheme } from '../../../theme/theme';
import SetDashboard from '../component/dashboards/set_dashboard';

const Admin_Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme } = useTheme();
    const [dashboardName, setDashboardName] = useState<string>("dashboard_manager");

    const changeDashboard = (newDashboardName: string) => {
        setDashboardName(newDashboardName);
    };


    return (
        <html data-theme={theme}>
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} changeDashBoard={changeDashboard} />
            <SetDashboard dashboardName={dashboardName} />
          
        </html>
    )
}

export default Admin_Dashboard