import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import SidebarComp from "./Sidebar/Sidebar";
import TopbarComp from "./Sidebar/TopbarComp";

interface LayoutProps {
  children: ReactElement;
  title: string;
  title2?: string;
}

const Layout = ({ children, title, title2 }: LayoutProps): JSX.Element => {
  return (
    <div className="app">
      <SidebarComp />
      <div className="app-main">
        <div className="container">
          {" "}
          <TopbarComp step1={title} step2={title2} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  title2: PropTypes.string,
};
