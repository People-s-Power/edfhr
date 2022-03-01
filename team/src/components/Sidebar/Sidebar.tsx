/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserAtom } from "atom/UserAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import { IconProps, Loader } from "rsuite";
import { ADMIN, DRAFT, LAWYER, LEGAL_WORLD, REP } from "utils/constants";
import SidebarComp from "./SidebarComp";

interface SidebarHomeComp {}

const SidebarHomeComp: React.FC<SidebarHomeComp> = () => {
  const user = useRecoilValue(UserAtom);
  if (!user) return <Loader />;
  switch (user?.position) {
    case REP:
      return <SidebarComp navItems={RepNavList} />;
    case LAWYER:
      return <SidebarComp navItems={lawyerNavList} />;
    case LEGAL_WORLD:
      return <SidebarComp navItems={legalWorldNavList} />;
    case ADMIN:
      return <SidebarComp navItems={adminNavList} />;
    case DRAFT:
      return <SidebarComp navItems={DraftNavList} />;
    default:
      return <SidebarComp navItems={suppervisorNavList} />;
  }
};

export default SidebarHomeComp;

interface NavListProps {
  icon: IconProps | any;
  link: string;
  name: string;
}
const adminNavList: Array<NavListProps> = [
  { name: "Dashboard", icon: "home", link: "/home" },
  { name: "Reports", icon: "envelope-open-o", link: "/reports" },
  { name: "Users", icon: "group", link: "/users" },
  { name: "Legal World", icon: "gavel", link: "/legalworld" },
  { name: "Applicants", icon: "blind", link: "/applicants" },
  { name: "Settings", icon: "cogs", link: "/settings" },
];

const suppervisorNavList: Array<NavListProps> = [
  { name: "Dashboard", icon: "home", link: "/home" },
  { name: "Reports", icon: "envelope-open-o", link: "/reports" },
  // { name: "Users", icon: "group", link: "/users" },
  // { name: "Legal World", icon: "gavel", link: "/legalworld" },
  { name: "Applicants", icon: "blind", link: "/applicants" },
  { name: "Settings", icon: "cogs", link: "/settings" },
];

const legalWorldNavList = [
  { name: "Dashboard", icon: "home", link: "/home" },
  { name: "Reports", icon: "envelope-open-o", link: "/reports" },
  { name: "Applicants", icon: "blind", link: "/applicants" },
  { name: "Users", icon: "group", link: "/users" },
  { name: "Legal World", icon: "gavel", link: "/legalworld" },
  { name: "Settings", icon: "cogs", link: "/settings" },
];

const lawyerNavList = [
  { name: "Dashboard", icon: "home", link: "/home" },
  // { name: "Reports", icon: "envelope-open-o", link: "/reports" },
  // { name: "Users", icon: "group", link: "/users" },
  { name: "Legal World", icon: "gavel", link: "/legalworld" },
  { name: "My Brief", icon: "blind", link: "/applicants" },
  { name: "Settings", icon: "cogs", link: "/settings" },
];

const RepNavList = [
  { name: "Dashboard", icon: "home", link: "/home" },
  // { name: "Reports", icon: "envelope-open-o", link: "/reports" },
  // { name: "Users", icon: "group", link: "/users" },
  // { name: "Legal World", icon: "gavel", link: "/legalworld" },
  { name: "Applicants", icon: "blind", link: "/applicants" },
  { name: "Settings", icon: "cogs", link: "/settings" },
];

const DraftNavList = [
  { name: "Dashboard", icon: "home", link: "/home" },
  // { name: "Reports", icon: "envelope-open-o", link: "/reports" },
  // { name: "Users", icon: "group", link: "/users" },
  // { name: "Legal World", icon: "gavel", link: "/legalworld" },
  { name: "Applicants", icon: "blind", link: "/applicants" },
  { name: "Settings", icon: "cogs", link: "/settings" },
];
