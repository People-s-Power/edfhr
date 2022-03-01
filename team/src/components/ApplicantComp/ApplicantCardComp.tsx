import { useMutation } from "@apollo/client";
import { DELETE_APPLICANT } from "apollo/queries/applicantQuery";
import { UserAtom } from "atom/UserAtom";
import MoreIcon from "components/MoreIcon";
import { ObjectId } from "mongoose";
import Link from "next/link";
import router from "next/router";
import applicants from "pages/applicants";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { ApplicantProps, UserProps } from "types/Applicant_types";
import { DRAFT } from "utils/constants";
import ApplicantPayment from "./ApplicantPayment";
import AssignContactComp from "./AssignContact";

interface IPage {
  applicant: ApplicantProps;
  // setApplicants(_id: ObjectId): void;
  onDelete(_id: ObjectId): void;
  onAssign(data: ApplicantProps): void;
}

const ApplicantCardComp: React.FC<IPage> = ({
  applicant,
  onDelete,
  onAssign,
}): JSX.Element => {
  const { name, lawyer, rep, amount_paid, caseType } = applicant;

  const [show, setShow] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [applicant_id, setApplicant_id] = useState(null);
  const [deleteApplicant] = useMutation(DELETE_APPLICANT);
  const authUser = useRecoilValue<UserProps>(UserAtom);
  const handleModalOpen = (_id: ObjectId) => {
    setApplicant_id(_id);
    setShow(true);
  };

  const handleDelete = async (_id: ObjectId) => {
    const res = window.confirm("Do you want to continue with delete");
    if (!res) return;
    try {
      await deleteApplicant({ variables: { _id } });
      onDelete(_id);
    } catch (error) {
      console.log(error);
    }
  };

  if (!applicants) return <Loader center content="Getting contacts" />;

  return (
    <Fragment>
      <AssignContactComp
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
      <tr className="theme-card hover">
        <td className="left d-flex">
          {/* <Avatar circle size="md" /> */}
          <div className="ml-2">
            <Link href={`/applicants/${applicant._id}`}>
              <a className="text-inherit">
                <h6 className="mb-0">{name}</h6>
              </a>
            </Link>
            <small>
              <i className="fab fa-odnoklassniki">{caseType} </i>
            </small>
            <small className="mx-2">
              <i className="fas fa-child"></i> {rep?.name}
            </small>
            <small>
              <i className="fas fa-gavel"></i> {lawyer?.name}
            </small>
          </div>
        </td>
        <td className="right mt-2 mt-md-0">
          <div className="d-flex justify-content-between d-md-block">
            <div>₦ {amount_paid}</div>
          </div>
        </td>
        <td>
          <MoreIcon>
            <li onClick={() => router.push(`/cases/${applicant._id}`)}>
              <a>
                <i className="fas fa-file"></i> View Draft
              </a>
            </li>
            <li
              className="dropdown-item c-hand mb-2"
              onClick={() => {
                setApplicant_id(applicant._id);
                setShowPay(true);
              }}
            >
              <i className="fas fa-credit-card mr-1"></i> Initiate Payment
            </li>
            {authUser?.position !== DRAFT && (
              <Fragment>
                <li
                  className="dropdown-item c-hand mb-2"
                  onClick={() => handleModalOpen(applicant._id)}
                >
                  <i className="fas fa-share mr-1"></i> Assign to
                </li>
                <li
                  className="dropdown-item c-hand mb-2 text-danger"
                  onClick={() => handleDelete(applicant._id)}
                >
                  <i className="fas fa-trash mr-1"></i> Delete
                </li>
              </Fragment>
            )}
          </MoreIcon>
        </td>
      </tr>
    </Fragment>
  );
};

ApplicantCardComp.propTypes = {
  applicant: PropTypes.any,
  onDelete: PropTypes.func,
  onAssign: PropTypes.func,
};

export default ApplicantCardComp;
