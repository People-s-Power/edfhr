import { gql, useQuery } from "@apollo/client";
import { COUNT_USERS } from "apollo/queries/userQuery";
import { ApplicantSubscription } from "components/ApplicantComp/ApplicantSubscription";
import AddReportComp from "components/Reports/AddReport";
import { AdminReportCard } from "components/Reports/ReportSubScription";
import React, { Fragment, useState } from "react";
import styled from "styled-components";

const COUNT_APPLICANTS = gql`
  query {
    countApplicants(paid: false)
  }
`;

const COUNT_PAID_APPLICANTS = gql`
  query {
    countApplicants(paid: true)
  }
`;

const AdminHomeComp = () => {
  // const [reports, setReports] = useState([]);
  const [totalApplicant_count, setTotalApplicant_count] = useState(0);
  const [paidApplicant_count, setPaidApplicant_count] = useState(0);

  const [user_count, setUser_count] = useState(0);

  const [showAddReport, setShowAddReport] = useState(false);

  useQuery(COUNT_APPLICANTS, {
    onCompleted: (data) => setTotalApplicant_count(data?.countApplicants),
    onError: (err) => console.log(err),
  });

  useQuery(COUNT_PAID_APPLICANTS, {
    onCompleted: (data) => setPaidApplicant_count(data?.countApplicants),
    onError: (err) => console.log(err),
  });

  useQuery(COUNT_USERS, {
    onCompleted: (data) => setUser_count(data.countUsers),
    onError: (err) => console.log(err),
  });

  return (
    <Fragment>
      <Wrapper>
        <div className="home">
          <h5 className="heading">Dashboard</h5>

          <div className="grid-3 stats">
            <div className="theme-card">
              <div className="text-center">
                <p className="fw-bold card-count fs-18">{user_count}</p>
                <p className="lead">total Users</p>
              </div>
            </div>
            <div className="theme-card">
              <div className="text-center">
                <p className="fw-bold card-count fs-18">
                  {totalApplicant_count}
                </p>
                <p className="lead">total Applicants</p>
              </div>
            </div>
            <div className="theme-card">
              <div className="text-center">
                <p className="fw-bold card-count fs-18">
                  {paidApplicant_count}
                </p>
                <p className="lead">paid Applicants</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="mt-3">
                <AdminReportCard />
                <ApplicantSubscription />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Fragment>
  );
};

export default AdminHomeComp;

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
  }
`;
