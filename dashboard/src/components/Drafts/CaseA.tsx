import React from "react";
import PropTypes from "prop-types";
import { IApplicant } from "types/Applicant.types";
import Moment from "moment";

interface IPage {
  applicant: IApplicant;
}

const CaseAComp = ({ applicant }: IPage): JSX.Element => {
  const { name, gender, offence_suspected, arrested_on } = applicant;
  const title = gender === "Male" ? "Mr" : "Mrs";
  return (
    <div className="page">
      <div>
        <p>{applicant.station}</p>
        <p>Dear Sir,</p>

        <h5 className="text-center mt-4 mb-2 text-uppercase mb-3 fw-bold">
          APPLICATION FOR THE BAIL OF {title}. {name} NOW IN POLICE CUSTODY
        </h5>
        <div className="text-justify body">
          <p>
            We are Lawyers/Human Right Activists from the above named address. We humbly wish to apply for the bail of {title}.{name} who shall be referred herein under and for the purpose of this application as OUR CLIENT. We have been
            brief by Our Client who has been suspected and arrested for an alleged offence of {offence_suspected}.
          </p>
          <p>
            Having now been briefed on what led to the arrest of Our Client, at this stage, the question is not whether the suspect committed the above offence or not? But the question is whether the suspect who was arrested and detained
            since the {Moment(arrested_on).format("Do MMMM YYYY")}, by men of the Nigeria police force till date without any formal charge preferred against him should be allowed to remain indefinitely in police custody without being
            admitted to bail? This indeed is the pedestal upon which this application is anchored.
          </p>
          <p>
            We humbly wish to draw the mind of the police to the following issues which may undermine Our Client’s Fundamental Right as provided in the Constitution of the Federal Republic of Nigeria, 1999 (as amended). The issues contain
            therein are provided inter alia:
          </p>
          <ol>
            <li>
              That the detention of a suspect for more than 24hrs on an allegation of an offence without trial is a fragrant violation of the Suspect’s Constitutional Rights. See Section 35(4) and (5) of the 1999 Constitution of the Federal
              Republic of Nigeria as amended.
            </li>
            <li>
              That I know as a fact that from the {Moment(arrested_on).format("Do MMMM YYYY")}, when That I know as a fact that from the {Moment(arrested_on).format("Do MMMM YYYY")}, when the suspect was arrested till date, the Nigeria
              Police Force should have concluded investigation, if any fact exist of any crime at all.
            </li>
            <li>That where investigation is not being able to be concluded within 24hours, the suspect should be released on bail or be charged to court within the constitutional period.</li>
            <li>
              In considering this application, we urge the Nigerian Police, with respect, to look at both the provisions of the constitution of the federal Republic of Nigeria, 1999, as amended, and as provided to arrive at just decision.
            </li>
            <li>
              case of Chinemelu V.C.O.P (1995)4NWLR,(pt390)367, where the court held on page 483 paragraphs E to F, thus: “Where the police or the executive arbitrarily detain a citizen in circumstances outside the purview of section 243 of
              CPL, or any other written law, then that is derogatory to the due process of law and antithetical to democracy.”
            </li>
          </ol>
          <p>
            Base on the foregoing, it will be in the interest of justice to release the suspect on bail where investigation is not being concluded within the constitutional stipulated period. If investigation has been concluded and no facts
            exist of any crime, the suspect should also be release on bail or be charged to court where such facts exist.
          </p>
          <p>
            <span className="font-bold">TAKE FURTHER NOTICE</span> that should your institution fails to comply with the Constitutional provisions stipulated above, the fundamental Rights of Our Client will be violated in which case we will
            not hesitate to file a fundamental Right Application.
          </p>
        </div>
      </div>
    </div>
  );
};

CaseAComp.propTypes = {
  applicant: PropTypes.any,
};

export default CaseAComp;
