/* eslint-disable @typescript-eslint/no-empty-interface */
import LogoComp from "components/LogoComp";
import jscookie from "js-cookie";
import Link from "next/link";
import router from "next/router";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Icon, IconProps } from "rsuite";
import { TOKEN_NAME } from "utils/cookieUtils";

interface SidebarComp {
  navItems: Array<NavListProps>;
}

const SidebarComp: React.FC<SidebarComp> = ({ navItems }) => {
  const [path, setPath] = useState("/home");
  //   const user = useRecoilValue(UserAtom);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (process.browser) {
      setPath(router.pathname);
    }
  }, []);

  const handleToggle = () => {
    navRef.current.classList.toggle("open");
  };
  const handleLogout = () => {
    jscookie.remove(TOKEN_NAME);
    window.location.href = "/";
    return false;
    // router.reload();
  };

  return (
    <Fragment>
      <nav className="side-nav">
        <div className="d-flex justify-content-between align-items-center">
          <LogoComp width="3rem" height="3rem" />
          <Icon
            onClick={handleToggle}
            icon="bars"
            size="lg"
            className="text-light d-md-none"
          />
        </div>
        <hr />

        <ul className="nav my-4" ref={navRef}>
          {navItems.map((nav, i) => (
            <li
              className={`nav-item side-menu ${
                path === nav.link ? "active" : ""
              }`}
              key={i}
            >
              <Link href={nav.link}>
                <a className="nav-link ">
                  <Icon icon={nav.icon} className=" mr-2" /> {nav.name}
                </a>
              </Link>
            </li>
          ))}
          <li className="nav-item side-menu c-hand" onClick={handleLogout}>
            <a className="nav-link">
              {" "}
              <Icon icon="sign-out" /> Sign Out{" "}
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default SidebarComp;

interface NavListProps {
  icon: IconProps | any;
  link: string;
  name: string;
}

SidebarComp.propTypes = {
  navItems: PropTypes.array,
};
