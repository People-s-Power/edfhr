import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { IApplicant, StaffRoleEnum } from "types/Applicant.types";
import useQueryParam from "utils/useQueryParam";
import AffidavitComp from "./AffidavitComp";
import ApplicantReportComp from "./ApplicantReport";
import ContactFormComp from "./ContactFormComp";
import ExhibitComp from "./ExhibitComp";
import RelativesComp from "./RelativesComp";
import UpdateApplicantComp from "./UpdateApplicantComp";

const ApplicantComp = (): JSX.Element => {
  const [activetab, setActiveTab] = useState("Contact Details");
  const [applicant, setApplicant] = useState<IApplicant | any>();
  const { id } = useParams<{ id: string }>();
  const query = useQueryParam();
  const router = useHistory();
  const [loading, setLoading] = useState(false);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    setLoading(true);
    const getApplicant = async () => {
      try {
        const { data } = await axios.get(`/applicant/single/${id}`);
        setApplicant(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (id) getApplicant();
  }, [id]);

  useEffect(() => {
    const tab = query.get("activeTab");
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("Contact Details");
    }
  }, []);

  return !applicant ? (
    <h6 className="text-center">Select an application from the list</h6>
  ) : (
    <div className="container">
      <ul className="nav nav-tabs justify-content-center">
        {tabList(user?.role)
          .filter((nav) => nav.view === true)
          .map(({ tab }, i) => (
            <li className="nav-item" key={i}>
              <button
                disabled={!applicant.id}
                className={`nav-link btn c-hand text-decoration-none link-dark  ${activetab === tab ? "active" : ""}`}
                aria-current="page"
                onClick={() => {
                  router.push(`/applications/${id}?activeTab=${tab}`);
                  setActiveTab(tab);
                }}>
                {tab}
              </button>
            </li>
          ))}
      </ul>

      {loading ? (
        <Loader content="Getting Applicant data..." />
      ) : (
        <div className="mt-3">
          {activetab === "Contact Details" && (!applicant?.id ? <div>Please select an application</div> : <UpdateApplicantComp record={applicant} />)}
          {activetab === "Exhibits" && <ExhibitComp applicant_id={applicant?.id} />}
          {activetab === "Affidavit" && <AffidavitComp />}
          {activetab === "Relatives" && <RelativesComp />}
          {activetab === "Contact Form" && <ContactFormComp applicant={applicant} />}
          {activetab === "Reports" && <ApplicantReportComp />}
        </div>
      )}
    </div>
  );
};

export default ApplicantComp;

const tabList = (role: StaffRoleEnum | undefined) => {
  return [
    {
      tab: "Contact Details",
      view: true,
    },
    {
      tab: "Affidavit",
      view: true,
    },
    {
      tab: "Contact Form",
      view: role !== StaffRoleEnum.Lawyer,
    },
    {
      tab: "Exhibits",
      view: true,
    },
    {
      tab: "Relatives",
      view: role !== StaffRoleEnum.Lawyer,
    },
    {
      tab: "Reports",
      view: true,
    },
  ];
};
// const viewRelatives = (role: StaffRoleEnum | undefined): boolean => {
//   switch (role) {
//     case StaffRoleEnum.Admin:
//       return true;
//     case StaffRoleEnum.LegalWorld:
//       return true;
//     case StaffRoleEnum.Draft:
//       return true;
//     default:
//       return false;
//   }
// };
