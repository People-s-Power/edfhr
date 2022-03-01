import { useQuery } from "@apollo/client";
import { GET_APPLICANTS_REPORT } from "apollo/queries/reportQuery";
import { RepApplicantTable } from "components/ApplicantComp/RepApplicantTable";
import { AdminReportCard } from "components/Reports/ReportSubScription";
import SearchComp from "components/SearchComp";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { Loader } from "rsuite";
import styled from "styled-components";

const SuppervisorHomeComp = (): JSX.Element => {
  // const [reports, setReports] = useState([]);

  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState("");

  const { loading } = useQuery(GET_APPLICANTS_REPORT, {
    onCompleted: (data) => setApplicants(data.getApplicantsReport),
    onError: (err) => console.log(err),
  });

  return (
    <Fragment>
      <Wrapper>
        <div className="home">
          <h5 className="heading">Dashboard</h5>

          <div className="grid-2 stats">
            <div className="theme-card">
              {/* <Icon icon="shopping-cart" className="card-icon" /> */}

              <div className="text-center">
                <p className="fw-bold card-count fs-18">{applicants?.length}</p>
                <p className="lead">total Applicants</p>
              </div>
            </div>
            <div className="theme-card">
              {/* <Icon icon="shopping-cart" className="card-icon" /> */}

              <div className="text-center">
                <p className="fw-bold card-count fs-18">
                  {
                    applicants?.filter(
                      ({ applicant }) => applicant.amount_paid > 100
                    ).length
                  }
                </p>
                <p className="lead">paid Applicants</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="home-body-main_reports">
                <AdminReportCard />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default SuppervisorHomeComp;

const Wrapper = styled.div`
  font-size: 13px;
  .stats {
    .card {
      padding: 1em;
      &-icon {
        font-size: 2em;
      }
      &-count {
        font-size: 2em;
        /* margin: 1.5rem 0 0 0; */
      }
      .lead {
        margin-top: 0;
      }
    }
  }
  .wrapper {
    background-color: red;
    display: grid;
    grid-template-columns: 700px, 30px;
    gap: 1em;
    @media (min-width: 768px) {
    }
    &-main {
      /* background-color: yellow; */
    }
    &-right {
      /* background-color: green; */
    }
  }
`;
