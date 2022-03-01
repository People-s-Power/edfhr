import { UserAtom } from "atoms/UserAtom";
import AdminHome from "components/home/AdminHome";
import DraftHome from "components/home/DraftHome";
import LawyerHome from "components/home/LawyerHome";
import RepHome from "components/home/RepHome";
import SuppervisorHome from "components/home/SuppervisorHome";
import React from "react";
import { useRecoilValue } from "recoil";
import { StaffRoleEnum } from "types/Applicant.types";

const HomePage = (): JSX.Element => {
  const user = useRecoilValue(UserAtom);
  switch (user?.role) {
    case StaffRoleEnum.Admin:
      return <AdminHome />;
    case StaffRoleEnum.Lawyer:
      return <LawyerHome />;
    case StaffRoleEnum.Rep:
      return <RepHome />;
    case StaffRoleEnum.Draft:
      return <DraftHome />;
    case StaffRoleEnum.Suppervisor:
      return <SuppervisorHome />;
    default:
      return <p>contact support</p>;
  }
};

export default HomePage;
