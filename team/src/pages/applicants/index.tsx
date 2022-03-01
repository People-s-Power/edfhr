import { useQuery } from "@apollo/client";
import { GET_APPLICANTS } from "apollo/queries/applicantQuery";
import { GET_APPLICANTS_REPORT } from "apollo/queries/reportQuery";
import { UserAtom } from "atom/UserAtom";
import ApplicantCardComp from "components/ApplicantComp/ApplicantCardComp";
import LawyersApplicantCardComp from "components/ApplicantComp/LawyerApplicantCard";
import {
  LawyerApplicantTable,
  RepApplicantTable,
} from "components/ApplicantComp/RepApplicantTable";
import Layout from "components/Layout";
import AddReportComp from "components/Reports/AddReport";
import SearchComp from "components/SearchComp";
import { ObjectId } from "mongoose";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { ApplicantProps, UserProps } from "types/Applicant_types";
import { DRAFT, LAWYER, LEGAL_WORLD, REP, SUPPERVISOR } from "utils/constants";
import withAuth from "utils/withAuth";

const ApplicantsPage = (): JSX.Element => {
  const user = useRecoilValue<UserProps>(UserAtom);
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  // const [count, setCount] = useState(10);
  const { loading, refetch } = useQuery(GET_APPLICANTS, {
    variables: { search },
    onCompleted: (data) => setApplicants(data?.getApplicants),
    onError: (error) => console.log(error),
  });

  const handleDelete = (_id: ObjectId) => {
    const deleted = applicants.filter((applicant) => applicant._id !== _id);
    setApplicants(deleted);
    refetch();
  };
  const handleAssign = (data: ApplicantProps): void => {
    const myupdate: ApplicantProps[] = applicants.map((applicant) =>
      applicant._id === data._id
        ? { ...applicant, lawyer: data.lawyer, rep: data.rep }
        : applicant
    );
    alert("SUCCESS !");
    setApplicants(myupdate);
    refetch();
  };
  if (user?.position === LEGAL_WORLD) return <LegalApplicants />;
  else if (user?.position === REP || user?.position === SUPPERVISOR)
    return <RepSupperviorList />;
  else if (user?.position === LAWYER) return <LawyerApplicants />;
  return (
    <Layout title="Applicants">
      <>
        <h5 className="heading">
          {user?.position === DRAFT ? "Draft List" : "Contact List"}
        </h5>
        <div className="middle-bar">
          <div className="btns mb-2 mb-md-0">
            {user?.position !== DRAFT && (
              <Link href="/applicants/add">
                <a className="btn btn-info btn-sm">
                  <i className="fas fa-plus"></i> Add New Contact
                </a>
              </Link>
            )}
          </div>
          <SearchComp loading={loading} onSearch={(txt) => setSearch(txt)} />
        </div>

        <div className="user-card_list">
          {loading ? (
            <Loader content="loading" center />
          ) : (
            <table className="table table-borderless">
              <tbody>
                {applicants.map((applicant, i) => (
                  <ApplicantCardComp
                    onDelete={handleDelete}
                    key={i + 1}
                    applicant={applicant}
                    onAssign={handleAssign}
                  />
                ))}
              </tbody>
            </table>
          )}

          {/* {applicants.length > count && (
            <div className=" d-flex justify-content-center mt-3">
              {count > 10 && (
                <button
                  className="btn btn-outline-danger mr-3"
                  onClick={() => setCount(count - 5)}
                >
                  View Less
                </button>
              )}
              <button
                className="btn btn-outline-info"
                onClick={() => setCount(count + 5)}
              >
                View More
              </button>
            </div>
          )} */}
        </div>
      </>
    </Layout>
  );
};

export default withAuth(ApplicantsPage);

const LegalApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  const { loading, refetch } = useQuery(GET_APPLICANTS, {
    variables: { search },
    onCompleted: (data) => {
      setApplicants(data?.getApplicants);
      const allApplicants: ApplicantProps[] = data?.getApplicants;
      const paidApplicants = allApplicants.filter(
        (applicant) => applicant.amount_paid >= 500
      );
      setApplicants(paidApplicants);
    },
    onError: (error) => console.log(error),
  });

  const handleAssign = (data: ApplicantProps): void => {
    const myupdate: ApplicantProps[] = applicants.map((applicant) =>
      applicant._id === data._id
        ? { ...applicant, lawyer: data.lawyer, rep: data.rep }
        : applicant
    );
    alert("SUCCESS !");
    setApplicants(myupdate);
    refetch();
  };
  return (
    <Layout title="Applicants">
      <Fragment>
        <div className="middle-bar">
          <h5 className="heading">Contacts</h5>
          {/* <div className="btns mb-2 mb-md-0">
            <Link href="/applicants/add">
              <a className="btn btn-info btn-sm">
                <i className="fas fa-plus"></i> Add New Contact
              </a>
            </Link>
          </div> */}
          <SearchComp loading={loading} onSearch={(txt) => setSearch(txt)} />
        </div>

        {loading ? (
          <Loader content="Loading" />
        ) : (
          applicants.map((applicant, i) => (
            <LawyersApplicantCardComp
              key={i + 1}
              applicant={applicant}
              onAssign={handleAssign}
            />
          ))
        )}
      </Fragment>
    </Layout>
  );
};

const RepSupperviorList = () => {
  const [showAddReport, setShowAddReport] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");
  // const [search, setSearch] = useState("");

  const { loading } = useQuery(GET_APPLICANTS_REPORT, {
    variables: { search },
    onCompleted: (data) => setApplicants(data.getApplicantsReport),
    onError: (err) => console.log(err),
  });
  return (
    <Fragment>
      <AddReportComp
        onHide={() => setShowAddReport(false)}
        show={showAddReport}
      />
      <Layout title="Applicants">
        <Fragment>
          <div className="middle-bar">
            <div className="btns mb-2 mb-md-0">
              <Link href="/applicants/add">
                <a className="btn btn-info btn-sm">
                  <i className="fas fa-plus"></i> Add New Contact
                </a>
              </Link>
            </div>
            <SearchComp loading={loading} onSearch={(txt) => setSearch(txt)} />
          </div>

          <div>
            {loading ? (
              <Loader content="Getting applicants" />
            ) : (
              <table className="table table-borderless">
                <tbody>
                  {applicants?.map(({ applicant, report }, i) => (
                    <RepApplicantTable
                      applicant={applicant}
                      report={report}
                      key={i}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Fragment>
      </Layout>
    </Fragment>
  );
};

const LawyerApplicants = () => {
  const [applicants, setApplicants] = useState([]);

  const { loading } = useQuery(GET_APPLICANTS_REPORT, {
    onCompleted: (data) => setApplicants(data.getApplicantsReport),
    onError: (err) => console.log(err),
  });

  return (
    <Fragment>
      <Layout title="Applicants">
        <div className="mt-3">
          {loading ? (
            <Loader content="Getting brief" />
          ) : (
            applicants?.map(({ applicant, report }, i) => (
              <LawyerApplicantTable
                key={i}
                applicant={applicant}
                report={report}
              />
            ))
          )}
          {/* <ApplicantsTable /> */}
        </div>
      </Layout>
    </Fragment>
  );
};
