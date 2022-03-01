import { useQuery } from "@apollo/client";
import { GET_USER_APPLICANTS } from "apollo/queries/userQuery";
import AssignApplicantComp from "components/applicantComp/AssignApplicantComp";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Loader } from "rsuite";
import { IApplicant } from "types/Applicant.types";

const UserApplicantsComp = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [applicants, setApplicants] = useState<IApplicant[]>();
  const [showAssign, setShowAssign] = useState(false);

  const { loading } = useQuery(GET_USER_APPLICANTS, {
    variables: { id: id },
    onCompleted: (data) => setApplicants(data.getUserApplicants),
    onError: (err) => console.log(err),
  });

  if (loading) return <Loader content="Loading..." />;
  return (
    <div className="container">
      <h6 className="text-center my-3 text-uppercase fw-bold">Contacts</h6>
      <table className="table table-hover table-borderless table-striped ">
        <tbody>
          {applicants?.map((applicant, i) => (
            <tr key={i}>
              <AssignApplicantComp onSuccess={(id) => setApplicants(applicants.filter((app) => app.id !== id))} applicant_id={applicant?.id} show={showAssign} onHide={() => setShowAssign(false)} />
              <td className="ps-3">
                <Link to={`/applications/${applicant.id}`} className="text-decoration-none">
                  {applicant.name}
                </Link>
              </td>
              <td align="right" className="pe-3">
                <button className="btn py-0" onClick={() => setShowAssign(true)}>
                  Re-assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserApplicantsComp;
