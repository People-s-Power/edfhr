import MoreIcon from "components/MoreIcon";
import AddReportComp from "components/Reports/AddReport";
import ReadReportItem from "components/Reports/ReadReport";
import { ObjectId } from "mongoose";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Modal } from "rsuite";
import { ReportProps } from "server/models/Report";
import { ApplicantProps } from "types/Applicant_types";
import ApplicantPayment from "./ApplicantPayment";

interface IPage {
  applicant: ApplicantProps;
  report: ReportProps;
}

export const RepApplicantTable = ({
  applicant,
  report,
}: IPage): JSX.Element => {
  const [showPay, setShowPay] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  return (
    <Fragment>
      <Modal show={openReport} onHide={() => setOpenReport(false)}>
        <Modal.Body>
          <ReadReportItem _id={report?._id} />
        </Modal.Body>
      </Modal>
      <ApplicantPayment
        show={showPay}
        onHide={() => setShowPay(false)}
        applicant={applicant._id}
      />
      <AddReportComp
        show={showReport}
        onHide={() => setShowReport(false)}
        app_id={applicant._id}
      />
      <tr className="theme-card hover">
        <td>
          <Link href={`/applicants/${applicant?._id}`}>
            <a className="text-inherit">{applicant?.name}</a>
          </Link>
        </td>
        <td className="">&#x20A6;{applicant?.amount_paid}</td>
        <td className="text-right">
          <MoreIcon>
            <li>
              {report?._id ? (
                // <Link href={`/reports/${report._id}`}>
                //   <a className="text-inherit">View Report</a>
                // </Link>
                <span onClick={() => setOpenReport(true)}>View Report</span>
              ) : (
                <a
                  onClick={() => {
                    setShowReport(true);
                  }}
                >
                  Make Report
                </a>
              )}
            </li>
            <li
              className=""
              onClick={() => {
                setShowPay(true);
              }}
            >
              Pay
            </li>
          </MoreIcon>
        </td>
      </tr>
    </Fragment>
  );
};

RepApplicantTable.propTypes = {
  applicant: PropTypes.object,
};

export const LawyerApplicantTable = ({
  applicant,
  report,
}: IPage): JSX.Element => {
  const [showReport, setShowReport] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  return (
    <Fragment>
      <AddReportComp
        show={showReport}
        onHide={() => setShowReport(false)}
        app_id={applicant._id}
      />
      <Modal show={openReport} onHide={() => setOpenReport(false)}>
        <Modal.Body>
          <ReadReportItem _id={report?._id} />
        </Modal.Body>
      </Modal>

      <div className="theme-card d-flex align-items-center justify-content-between">
        <Link href={`/applicants/${applicant?._id}`}>
          <h6 className="m-0 c-hand">{applicant?.name}</h6>
        </Link>
        {/* <p className="m-0">&#x20A6;{applicant?.amount_paid}</p> */}
        <div className="d-flex">
          <Link href={`/cases/${applicant._id}`}>
            <a className="btn">
              <i className="fas fa-file"></i> Brief
            </a>
          </Link>
          {report?._id ? (
            <a className="btn" onClick={() => setOpenReport(true)}>
              <i className="fas fa-envelope-open text-info"></i>
            </a>
          ) : (
            <button
              className="btn"
              onClick={() => {
                setShowReport(true);
              }}
            >
              <i className="fas fa-envelope text-danger"></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
};
