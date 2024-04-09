// SetDashboard.tsx

import React from "react";
import Dashboard_manager from "./dashboard_display/dashboard_manager";
import Dashboard_people from "./dashboard_display/dashboard_people";

interface SetDashboardProps {
    dashboardName: string;
}

const SetDashboard: React.FC<SetDashboardProps> = ({ dashboardName }) => {
    return (
        <div>
            {dashboardName === "dashboard_manager" && <Dashboard_manager />}
            {dashboardName === "dashboard_people" && <Dashboard_people />}
        </div>
    );
};

export default SetDashboard;
