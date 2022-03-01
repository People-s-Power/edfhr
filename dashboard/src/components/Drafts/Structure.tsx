/* eslint-disable no-irregular-whitespace */
import PropTypes from "prop-types";
import React from "react";
import { IApplicant } from "types/Applicant.types";

interface IPage {
  applicant: IApplicant;
}

export const Heading: React.FC<IPage> = ({ applicant }) => {
  const { name, state_arrest } = applicant;

  return (
    <div className="page-heading">
      <div className="page-heading-intro my-3 text-center text-uppercase">
        IN THE HIGH COURT OF {state_arrest} <br /> IN THE {state_arrest}
        <span className="ml-1">JUDICIAL DIVISION</span> <br />
        HOLDEN AT {state_arrest}
      </div>
      <div className="text-right text-uppercase my-3">SUIT NO:        /FHR/{new Date().getFullYear()}</div>
      <div className="text-center text-uppercase">
        IN THE MATTER OF AN APPLICATION FOR THE ENFORCEMENT OF THE APPLICANT’S FUNDAMENTAL RIGHTS TO RESPECT FOR THE DIGNITY OF HIS PERSON, PERSONAL LIBERTY, RIGHT TO FAIR TRIAL WITHIN A REASONABLE TIME AND FREEDOM OF MOVEMENT.
      </div>
      <div className="mt-2 font-weight-bold">BETWEEN</div>
      <div className="d-flex justify-content-between text-uppercase">
        <div>{name}</div>
        <div className="font-weight-bold">APPLICANT</div>
      </div>
      <div className="my-2">AND</div>
      <ol className="text-uppercase">
        <li>THE ATTORNEY GENERAL, {state_arrest}</li>
        <li>
          <div className="d-flex">
            <div className="flex-1 ">THE COMMISSIONER OF POLICE, {state_arrest}</div>
            <div className="text-uppercase font-weight-bold">RESPONDENT</div>
          </div>
                           
        </li>
      </ol>
    </div>
  );
};

Heading.propTypes = {
  applicant: PropTypes.any,
};

export const HeadingPrison: React.FC<IPage> = ({ applicant }) => {
  const { name, state_arraigned, division, state_arrest } = applicant;

  return (
    <div className="page-heading">
      <div className="page-heading-intro my-3 text-center text-uppercase">
        IN THE HIGH COURT OF {state_arraigned} <br /> IN THE {division}
        <span className="ml-1">JUDICIAL DIVISION</span> <br />
        HOLDEN AT {state_arraigned}
      </div>
      <div className="text-right text-uppercase my-3">SUIT NO:        /FHR/{new Date().getFullYear()}</div>
      <div className="text-center text-uppercase">
        IN THE MATTER OF AN APPLICATION FOR THE ENFORCEMENT OF THE APPLICANT’S FUNDAMENTAL RIGHTS TO RESPECT FOR THE DIGNITY OF HIS PERSON, PERSONAL LIBERTY, RIGHT TO FAIR TRIAL WITHIN A REASONABLE TIME AND FREEDOM OF MOVEMENT.
      </div>
      <div className="mt-2 font-weight-bold">BETWEEN</div>
      <div className="d-flex justify-content-between text-uppercase">
        <div>{name}</div>
        <div className="font-weight-bold">APPLICANT</div>
      </div>
      <div className="my-2">AND</div>
      <ol className="text-uppercase ">
        <li>THE ATTORNEY GENERAL, {state_arrest}</li>
        <li>
          <div className="d-flex">
            <div className="flex-1 ">THE COMMISSIONER OF POLICE, {state_arrest}</div>
            <div className="text-uppercase font-weight-bold">RESPONDENT</div>
          </div>
                           
        </li>
      </ol>
    </div>
  );
};

HeadingPrison.propTypes = {
  applicant: PropTypes.any,
};

export const Signature: React.FC<IPage> = ({ applicant }) => {
  const { state_arrest } = applicant;
  return (
    <div className="footer">
      <div style={{ marginTop: "4rem" }}>
        Dated this ____________ day of ______________________
        {new Date().getFullYear()}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "3rem",
        }}>
        <div>
          <div>G.B. EVANS, ESQ</div>
          <div>Evans Dule’s Foundation </div>
          <div>Solicitor to the Accused/Applicant</div>
          <div>No. 163A Okporo Road Port Harcourt,</div>
          <div>Rivers State.</div>
          <div>Email: evansb45@yahoo.com</div>
          <div> 08107639372</div>
        </div>
      </div>
      {/* Down */}
      <div>
        <div style={{ width: "50%" }}>
          <h6>FOR SERVICE ON:</h6>      
          <ol className="mx-0 px-0">
            <li>
              <div>Attorney General, {state_arrest},</div>
              <div>Ministry of Justice ,</div>
              <div>Secretariat</div>
            </li>
            <li>
              <div>Commissioner of Police, {state_arrest},</div>
              <div>{state_arrest} Police Command,</div>
            </li>
          </ol>
                
        </div>
      </div>
    </div>
  );
};

Signature.propTypes = {
  applicant: PropTypes.any,
};
