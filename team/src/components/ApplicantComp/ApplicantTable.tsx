import { useMutation } from "@apollo/client";
import { DELETE_APPLICANT } from "apollo/queries/applicantQuery";
import MoreIcon from "components/MoreIcon";
import { ObjectId } from "mongoose";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Loader } from "rsuite";
import styled from "styled-components";
import ApplicantPayment from "./ApplicantPayment";
import AssignContactComp from "./AssignContact";

export const ApplicantsTable = ({ applicants, setApplicants }): JSX.Element => {
  const [show, setShow] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [applicant_id, setApplicant_id] = useState<ObjectId>(null);
  const [deleteApplicant] = useMutation(DELETE_APPLICANT);

  const handleModalOpen = (id: ObjectId) => {
    setApplicant_id(id);
    setShow(true);
  };

  const handleAssignmentSuccess = (data) => {
    const myupdate = applicants.map((applicant) =>
      applicant._id === data._id
        ? { ...applicant, lawyer: data.lawyer, rep: data.rep }
        : applicant
    );
    setApplicants(myupdate);
    alert("SUCCESSFUL");
    setShow(false);
  };

  const handleDelete = async (_id) => {
    const res = window.confirm("Do you want to continue with delete");
    if (!res) return;
    try {
      const { data } = await deleteApplicant({ variables: { _id } });
      if (data) {
        alert("SUCCESS");
        setApplicants(applicants.filter((applicant) => applicant._id !== _id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!applicants) return <Loader center content="Getting contacts" />;
  return (
    <Wrapper>
      <AssignContactComp
        applicant_id={applicant_id}
        onClose={() => setShow(false)}
        show={show}
        onSuccess={handleAssignmentSuccess}
      />

      <ApplicantPayment
        show={showPay}
        onHide={() => setShowPay(false)}
        applicant={applicant_id}
      />

      <table className="table">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Amount Paid</th>
            <th>Rep</th>
            <th>Lawyer</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applicants?.map((applicant, i) => (
            <tr key={i}>
              <td>{applicant.name}</td>
              <td>{applicant.amount_paid}</td>
              <td>{applicant.rep?.name}</td>
              <td>{applicant.lawyer?.name}</td>
              <td>
                <MoreIcon>
                  <li
                    className="dropdown-item c-hand mb-2"
                    onClick={() => {
                      setApplicant_id(applicant._id);
                      setShowPay(true);
                    }}
                  >
                    <i className="fas fa-credit-card mr-1"></i> Initiate Payment
                  </li>
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
                </MoreIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  max-height: 400px;
  overflow: scroll;
`;

ApplicantsTable.propTypes = {
  applicants: PropTypes.array,
  setApplicants: PropTypes.func,
};
