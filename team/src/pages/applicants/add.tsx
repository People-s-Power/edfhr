import { ApplicantsAtom } from "atom/ApplicantAtom";
import AddApplicant from "components/ApplicantComp/AddApplicant";
import AddAffidavit from "components/ApplicantComp/Affidavit/AddAffidavit";
import AddRelativeComp from "components/ApplicantComp/Relatives/AddRelative";
import Layout from "components/Layout";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { Steps } from "rsuite";
import { ApplicantProps } from "types/Applicant_types";
import withAuth from "utils/withAuth";

const ApplicantAddPage = () => {
  const [applicants, setApplicants] = useRecoilState(ApplicantsAtom);
  const [applicant_id, setApplicant_id] = useState(null);
  const [step, setStep] = useState(0);
  const [relatives, setRelatives] = useState([]);

  const handleAddApplicant = (data: ApplicantProps) => {
    setApplicant_id(data._id);
    setApplicants([...applicants, data]);
    setStep(1);
  };

  return (
    <Layout title="Applicants" title2="Add Applicant">
      <Fragment>
        <div className="my-4">
          <Steps current={step} currentStatus="process">
            <Steps.Item />
            <Steps.Item />
            <Steps.Item />
          </Steps>
        </div>
        {step === 0 && <AddApplicant onAdd={handleAddApplicant} />}
        {step === 1 && (
          <AddAffidavit
            applicant_id={applicant_id}
            onAdd={() => setStep(step + 1)}
          />
        )}
        {step === 2 && (
          <div>
            <div className="mb-5">
              <h5 className="heading text-right">Add Relative</h5>
              <AddRelativeComp
                applicant_id={applicant_id}
                onAdd={(data) => setRelatives([...relatives, data])}
              />
            </div>
            {relatives.map((relative, i) => (
              <RelCard relative={relative} key={i} />
            ))}
            {relatives.length >= 1 && (
              <div className="text-center">
                <a href="/home" className="btn btn-success">
                  DONE
                </a>
              </div>
            )}
          </div>
        )}
      </Fragment>
    </Layout>
  );
};

export default withAuth(ApplicantAddPage);

const RelCard = ({ relative }) => {
  return (
    <div className="theme-card d-flex justify-content-around align-items-center">
      <p className="font-weight-bold">{relative.name}</p>
      <p className="font-weight-bold">{relative.phone}</p>
    </div>
  );
};

RelCard.propTypes = {
  relative: PropTypes.object,
};
