import MoreIcon from "components/MoreIcon";
import { ObjectId } from "mongoose";
import Link from "next/link";
import applicants from "pages/applicants";
import React, { Fragment, useState } from "react";
import { Loader } from "rsuite";
import { ApplicantProps } from "types/Applicant_types";
import ApplicantPayment from "./ApplicantPayment";
import { LawyersAssignContactComp } from "./AssignContact";

interface IPage {
  applicant: ApplicantProps;
  // setApplicants(_id: ObjectId): void;
  // onDelete(_id: ObjectId): void;
  onAssign(data: ApplicantProps): void;
}

const LawyersApplicantCardComp = ({
  applicant,

  onAssign,
}: IPage): JSX.Element => {
  const { name, lawyer } = applicant;

  const [show, setShow] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [applicant_id, setApplicant_id] = useState(null);

  const handleModalOpen = (_id: ObjectId) => {
    setApplicant_id(_id);
    setShow(true);
  };

  if (!applicants) return <Loader center content="Getting contacts" />;

  return (
    <Fragment>
      <LawyersAssignContactComp
        applicant_id={applicant_id}
        onClose={() => setShow(false)}
        show={show}
        onSuccess={(data) => {
          onAssign(data);
          setShow(false);
        }}
      />

      <ApplicantPayment
        show={showPay}
        onHide={() => setShowPay(false)}
        applicant={applicant_id}
      />
      <div className="theme-card hover d-flex  justify-content-between">
        <div className="left d-flex">
          <div className="ml-2">
            <Link href={`/applicants/${applicant._id}`}>
              <a className="text-inherit">
                <h6 className="mb-0">{name}</h6>
              </a>
            </Link>

            <small>
              <i className="fas fa-gavel"></i> {lawyer?.name}
            </small>
          </div>
        </div>

        <MoreIcon>
          <li>
            <Link href={`/cases/${applicant._id}`}>
              <Fragment>
                <i className="fas fa-file"></i> View Draft
              </Fragment>
            </Link>
          </li>

          <li
            className="dropdown-item c-hand mb-2"
            onClick={() => handleModalOpen(applicant._id)}
          >
            <i className="fas fa-share mr-1"></i> Assign to
          </li>
          <li
            className="dropdown-item c-hand mb-2"
            onClick={() => setShowPay(true)}
          >
            Initiate Payment
          </li>
        </MoreIcon>
      </div>
    </Fragment>
  );
};

// LawyersApplicantCardComp.propTypes = {
//   applicant: PropTypes.any,
//   onAssign: PropTypes.func,
// };

export default LawyersApplicantCardComp;
