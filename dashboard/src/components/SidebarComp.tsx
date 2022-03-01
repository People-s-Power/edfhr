import { UserAtom } from "atoms/UserAtom";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IUser, StaffRoleEnum } from "types/Applicant.types";

const SidebarComp = (): JSX.Element => {
  const { pathname } = useLocation();
  const user = useRecoilValue<Partial<IUser>>(UserAtom);

  return (
    <aside className="d-flex flex-column flex-shrink-0 bg-light aside sidebar">
      <ul className="nav nav-flush nav-pills flex-column mb-auto">
        {user?.role &&
          navlist(user?.role).map((nav, i) => (
            <li className="nav-item" key={i}>
              <Link to={`/${nav.to}`} className={`nav-link link-dark text-decoration-none ${pathname?.split("/")[1] === nav.to ? "active" : ""}`} aria-current="page">
                <i className={nav.icon}></i>
                <span className="ms-2">{nav.title}</span>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default SidebarComp;

interface NavListProps {
  icon: string;
  to: string;

  title: string;
}

const adminList: NavListProps[] = [
  { title: "Dashboard", icon: "fas fa-tachometer-alt", to: "home" },
  { title: "Applications", icon: "fas fa-blind", to: "applications" },
  { title: "Legal World", icon: "fas fa-gavel", to: "legalworld" },
  { title: "Users", icon: "fas fa-users", to: "users" },
  { title: "Campaigns", icon: "fas fa-file", to: "campaigns" },
  { title: "Profile", icon: "fas fa-user-cog", to: "profile" },
  { title: "Training", icon: "fas fa-book", to: "training" },
];

const lawyerList: NavListProps[] = [
  { title: "Dashboard", icon: "fas fa-tachometer-alt", to: "home" },
  { title: "Legal World", icon: "fas fa-gavel", to: "legalworld" },
  { title: "Profile", icon: "fas fa-user-cog", to: "profile" },
  { title: "Training", icon: "fas fa-book", to: "training" },
];

const repList: NavListProps[] = [
  { title: "Dashboard", icon: "fas fa-tachometer-alt", to: "home" },
  { title: "Applications", icon: "fas fa-blind", to: "applications" },
  { title: "Profile", icon: "fas fa-user-cog", to: "profile" },
  { title: "Training", icon: "fas fa-book", to: "training" },
];

const suppervisorList: NavListProps[] = [
  { title: "Dashboard", icon: "fas fa-tachometer-alt", to: "home" },
  { title: "Applications", icon: "fas fa-blind", to: "applications" },
  { title: "My Reps", icon: "fas fa-users", to: "users" },
  { title: "Profile", icon: "fas fa-user-cog", to: "profile" },
  { title: "Training", icon: "fas fa-book", to: "training" },
];

const draftList: NavListProps[] = [
  { title: "Dashboard", icon: "fas fa-tachometer-alt", to: "home" },
  { title: "Applications", icon: "fas fa-blind", to: "applications" },
  { title: "Profile", icon: "fas fa-user-cog", to: "profile" },
  { title: "Training", icon: "fas fa-book", to: "training" },
];

const navlist = (role: StaffRoleEnum): NavListProps[] => {
  switch (role) {
    case StaffRoleEnum.Admin:
      return adminList;
    case StaffRoleEnum.Lawyer:
      return lawyerList;
    case StaffRoleEnum.Suppervisor:
      return suppervisorList;
    case StaffRoleEnum.Draft:
      return draftList;
    default:
      return repList;
  }
};
