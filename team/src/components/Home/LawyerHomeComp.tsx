import { useQuery } from "@apollo/client";
import { COUNT_LAWYERS, COUNT_PAID_CASES } from "apollo/queries/userQuery";
import { UserAtom } from "atom/UserAtom";
import AddReportComp from "components/Reports/AddReport";
import { AdminReportCard } from "components/Reports/ReportSubScription";
import React, { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { UserProps } from "types/Applicant_types";

const LawyerHomeComp = (): JSX.Element => {
  const [totalApplicant_count, setTotalApplicant_count] = useState(0);
  const [showAddReport, setShowAddReport] = useState(false);
  const user = useRecoilValue<UserProps>(UserAtom);

  // const [applicants, setApplicants] = useState([]);
  // const [search, setSearch] = useState("");

  const [user_count, setUser_count] = useState(0);

  useQuery(COUNT_LAWYERS, {
    onCompleted: (data) => setUser_count(data.countLawyers),
    onError: (err) => console.log(err),
  });

  useQuery(COUNT_PAID_CASES, {
    onCompleted: (data) => setTotalApplicant_count(data?.countPaidCases),
    onError: (err) => console.log(err),
  });

  return (
    <Fragment>
      <AddReportComp
        onHide={() => setShowAddReport(false)}
        show={showAddReport}
      />
      <Wrapper>
        <div className="home">
          <h5 className="heading">Dashboard</h5>

          <div className="grid-2 stats">
            <div className="theme-card">
              {/* <Icon icon="group" className="card-icon" /> */}

              <div className="text-center">
                <p className="fw-bold card-count fs-18">{user_count}</p>
                <p className="lead">Lawyers</p>
              </div>
            </div>

            <div className="theme-card">
              {/* <Icon icon="shopping-cart" className="card-icon" /> */}

              <div className="text-center">
                <p className="fw-bold card-count fs-18">
                  {user?.applicants?.length}
                </p>
                <p className="lead">
                  My Brief{user?.applicants.length > 1 ? "s" : ""}
                </p>
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

export default LawyerHomeComp;

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
