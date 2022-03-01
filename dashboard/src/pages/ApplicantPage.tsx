import { ApplicantsAtom, ApplicantsSelector } from "atoms/ApplicantsAtom";
import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import ApplicantComp from "components/applicantComp/ApplicantComp";
import ApplicantSteps from "components/applicantComp/ApplicantStep";
import AssignApplicantComp from "components/applicantComp/AssignApplicantComp";
import ApplicantPayment from "components/ApplicantPayment";
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IApplicant, StaffRoleEnum } from "types/Applicant.types";
import useQueryParam from "utils/useQueryParam";

const ApplicantPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const router = useHistory();
  const applicants = useRecoilValue<IApplicant[]>(ApplicantsSelector);
  const setApplicants = useSetRecoilState(ApplicantsAtom);
  const [applicant, setApplicant] = useState<IApplicant>();
  const [caseType, setCaseType] = useState("");
  const [search, setSearch] = useState("");
  const [showPay, setShowPay] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const user = useRecoilValue(UserAtom);

  const query = useQueryParam();

  const handleDeleteApplicant = async (id: string) => {
    const confirmed = confirm(
      `Do you want to delete this ${applicant?.name} ?`
    );
    if (confirmed) {
      try {
        const { data } = await axios.delete(`/applicant/single/${id}`, {
          withCredentials: true,
        });

        setApplicants((applicants) =>
          applicants.filter((ap: IApplicant) => ap.id !== data.id)
        );
        router.push("/applications");
        alert("Success");
      } catch (error) {
        // alert(error?.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="split applications">
      <nav className="navbar nav-dark bg-info">
        <ul className="nav">
          <li className="nav-item">
            <Link
              to="/applications"
              className="nav-link text-decoration-none border-bottom border-1 border-primary link-dark"
            >
              Application
            </Link>
          </li>
        </ul>
        <p className="mb-0">{applicant?.name}</p>
        <div></div>
      </nav>
      <div className="split-main">
        <div className="inner">
          <div
            className={`left ${
              user?.role === StaffRoleEnum.Lawyer ? "d-none" : ""
            }`}
          >
            <div className="left-wrapper mb-3">
              <div className="smartlist">
                <p className="text-muted">Smart List</p>
                {(user?.role === StaffRoleEnum.Admin ||
                  user?.role === StaffRoleEnum.LegalWorld) && (
                  <select
                    value={caseType}
                    className="form-select border-info text-muted "
                    onChange={(e) => setCaseType(e.target.value)}
                  >
                    <option value="">All Applications</option>
                    <option value="A"> Case A </option>
                    <option value="B"> Case B </option>
                    <option value="C"> Case C </option>
                    <option value="D"> Case D </option>
                  </select>
                )}
                <input
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="form-control border-info my-2"
                  placeholder="Search by name"
                />
              </div>

              <div className="split-view mt-4">
                <table className="table table-striped table-hover ">
                  <tbody>
                    {applicants
                      ?.filter((app) =>
                        app.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .filter((app) =>
                        caseType ? app?.caseType === caseType : app
                      )

                      ?.map((applicant, i) => (
                        <tr
                          key={i}
                          className={id === applicant?.id ? "active" : ""}
                          onClick={() => setApplicant(applicant)}
                        >
                          <ApplicantPayment
                            show={showPay}
                            applicant={applicant?.id}
                            onHide={() => setShowPay(false)}
                          />
                          <AssignApplicantComp
                            applicant_id={applicant?.id}
                            show={showAssign}
                            onHide={() => setShowAssign(false)}
                          />
                          <td>
                            <Link
                              to={`/applications/${applicant?.id}`}
                              className="text-decoration-none"
                            >
                              {applicant.name}
                            </Link>
                          </td>
                          <td>₦ {applicant?.amount_paid}</td>
                          <td className="dropdown" align="right">
                            <i
                              className="fas fa-ellipsis-v"
                              data-bs-toggle="dropdown"
                            ></i>
                            <ul className="dropdown-menu dropdown-menu-dark c-menu">
                              <li>
                                <Link
                                  to={`/applications/${applicant?.id}/draft`}
                                  className="dropdown-item text-decoration-none"
                                >
                                  View Draft
                                </Link>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-decoration-none"
                                  onClick={() => setShowPay(true)}
                                >
                                  {" "}
                                  Initate Payment{" "}
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-decoration-none"
                                  onClick={() => setShowAssign(true)}
                                >
                                  Assign to{" "}
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item text-decoration-none"
                                  onClick={() =>
                                    handleDeleteApplicant(applicant?.id)
                                  }
                                >
                                  Delete Applicant
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-primary text-light">
                {user?.role !== StaffRoleEnum.Lawyer && (
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <Link
                        to="/applications?call=add"
                        className="btn text-light"
                      >
                        <i className="fas fa-plus"></i> Add
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-inner">
              <div className="right-wrapper">
                {query.get("call") !== "add" ? (
                  <ApplicantComp />
                ) : (
                  <div className="container">
                    <ApplicantSteps
                      onCancel={() => router.push("applications")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantPage;
