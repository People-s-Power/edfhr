import HeaderComp from "components/HeaderComp";
import SidebarComp from "components/SidebarComp";
import React from "react";

interface IPage {
  children: React.ReactNode;
  title?: string;
}
const DashboardLayout = ({ children }: IPage): JSX.Element => {
  return (
    <div className="dashboard">
      <HeaderComp />
      <div className="dashboard-wrapper">
        <SidebarComp />
        <div className="dashboard-main">
          <div className="dashboard-main_wrapper">
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
