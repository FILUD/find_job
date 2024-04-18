import React from "react";
import Dashboard_manager from "./dashboard_display/dashboard_manager";
import Dashboard_people from "./dashboard_display/dashboard_people";
import Dashboard_district from "./dashboard_display/dashboard_district";
import Dashboard_province from "./dashboard_display/dashboard_province";

interface SetDashboardProps {
    dashboardName: string;
}

const SetDashboard: React.FC<SetDashboardProps> = ({ dashboardName }) => {
    return (
        <div>
            {dashboardName === "dashboard_manager" && <Dashboard_manager />}
            {dashboardName === "dashboard_people" && <Dashboard_people />}

            {/* Address */}
            {dashboardName === "dashboard_district" && <Dashboard_district />}
            {dashboardName === "dashboard_province" && <Dashboard_province />}

        </div>
    );
};

export default SetDashboard;
