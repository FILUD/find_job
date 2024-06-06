import React from "react";
import Dashboard_people from "./dashboard_display/dashboard_people";
import Dashboard_district from "./dashboard_display/dashboard_district";
import Dashboard_province from "./dashboard_display/dashboard_province";
import Dashboard_workcategory from "./dashboard_display/dashboard_workcategory";
import Dashboard_occupation from "./dashboard_display/dashboard_occupation";
import Dashboard_welcome from "./dashboard_display/dashboard_welcome";
import Test_report from "./dashboard_display/test";
import Dashboard_report from "./dashboard_display/dashboard_report";

interface SetDashboardProps {
    dashboardName: string;
}

const SetDashboard: React.FC<SetDashboardProps> = ({ dashboardName }) => {
    return (
        <div>
            {dashboardName === "dashboard_manager" && <Dashboard_welcome />}
            {dashboardName === "dashboard_people" && <Dashboard_people />}

            {/* Address */}
            {dashboardName === "dashboard_district" && <Dashboard_district />}
            {dashboardName === "dashboard_province" && <Dashboard_province />}
            {/* career */}
            {dashboardName === "dashboard_workcategory" && <Dashboard_workcategory />}
            {dashboardName === "dashboard_occupation" && <Dashboard_occupation />}
            {/* report */}
            {dashboardName === "test" && <Test_report/>}
            {dashboardName === "dashboard_report" && <Dashboard_report/>}
        </div>
    );
};

export default SetDashboard;
