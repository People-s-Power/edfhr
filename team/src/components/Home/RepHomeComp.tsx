import { useQuery } from "@apollo/client";
import { GET_APPLICANTS_REPORT } from "apollo/queries/reportQuery";
import AddReportComp from "components/Reports/AddReport";
import { AdminReportCard } from "components/Reports/ReportSubScription";
import dayjs from "dayjs";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { ReportProps } from "server/models/Report";
import styled from "styled-components";

const RepHomeComp = (): JSX.Element => {
  const [showAddReport, setShowAddReport] = useState(false);
  const [applicants, setApplicants] = useState([]);
  // const [search, setSearch] = useState("");

  useQuery(GET_APPLICANTS_REPORT, {
    onCompleted: (data) => setApplicants(data.getApplicantsReport),
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
        </div>
        <AdminReportCard />
      </Wrapper>
    </Fragment>
  );
};

export default RepHomeComp;

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

export const RepReportCard = ({
  report,
}: {
  report: ReportProps;
}): JSX.Element => {
  return (
    <Link href={`/reports/${report._id}`}>
      <div className="theme-card d-flex justify-content-between hover c-hand">
        <div>
          <h6 className="m-0">{report?.title}</h6>
          <small>{report?.applicant_id?.name}</small>
        </div>
        <small>{dayjs(report?.updatedAt).fromNow()}</small>
      </div>
    </Link>
  );
};

RepReportCard.propTypes = {
  report: PropTypes.object,
};
