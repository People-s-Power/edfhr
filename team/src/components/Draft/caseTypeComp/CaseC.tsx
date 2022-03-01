import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "moment";
import { AffidavitProps, ApplicantProps } from "types/Applicant_types";
import { Signature, HeadingPrison } from "../Structure";

interface IPage {
  applicant: ApplicantProps;
  affidavit: AffidavitProps;
}

const CaseCComp = ({ applicant, affidavit }: IPage): JSX.Element => {
  const {
    name,
    state_arrest,
    arrested_at,
    station_duration,
    state_arraigned,
    division,
  } = applicant;
  const arrested_on = Moment(applicant.arrested_on).format("do MMM YYYY");
  const arraigned_on = Moment(applicant.arraigned_on).format("do MMM YYYY");
  const duration = Moment.duration(Moment().diff(arrested_on));
  let months = duration.asMonths().toFixed(1);

  months = Moment(months).format("Do MMM YYYY");
  return (
    <Fragment>
      <div className="page">
        <HeadingPrison applicant={applicant} />
        <div className="body">
          <h6 className="text-center">MOTION ON NOTICE</h6>
          <h6 className="text-uppercase">
            APPLICATION TO ADMIT TO BAIL THE ACCUSED/APPLICANT {name}
            BROUGHT PURSUANT TO SECTIONS 35(4) AND 36 OF THE CONSTITUTION OF THE
            FEDERAL REPUBLIC OF NIGERIA, 1999 (AS AMENDED AND UNDER THE INHERENT
            JURISDICTION OF THE COURT.
          </h6>
          <div>
            <p>
              TAKE NOTICE: that this Honourable Court will be moved on
              _________________________day of ______________________________
              {new Date().getFullYear()} at the Hour of 9 O.clock in the
              forenoon or so soon thereafter as the Applicant or Counsel on
              behalf of the Applicant may be heard praying this honourable court
              for the following reliefs:
            </p>
            <ol>
              <li>
                AN ORDER of the Honourable Court admitting to bail the
                Accused/Applicant who is now in prison custody pending trial.
              </li>
              <li>
                AND for such further or other Order(s) as this Honourable Court
                may deem fit to make in the circumstance.
              </li>
            </ol>
          </div>
        </div>
        <Signature applicant={applicant} />
      </div>

      <div className="page">
        <HeadingPrison applicant={applicant} />
        <div className="body">
          <h6 className="text-center fw-bold my-4">
            AFFIDAVIT IN SUPPORT OF THE MOTION ON NOTICE
          </h6>
          <p>
            I, {affidavit.title} {affidavit.name}, {affidavit.gender}, adult,
            {affidavit.religion}, a {affidavit.occupation}, now residing at{" "}
            {affidavit.address}, citizen of the Federal Republic of Nigeria, do
            make Oath and state as follows:
          </p>
          <ol>
            <li>
              That I am the {affidavit.rel} of the Accused/Applicant in this
              application by virtue of which I am conversant with the facts
              leading to the detention of the applicant.
            </li>
            <li>
              That I have the authority and consent of the Accused/Applicant to
              depose to this oath.
            </li>
            <li>
              That the Applicant told me in the {arrested_on} at the
              Correctional Center of {state_arraigned}, Nigeria and I verily
              believed him.
            </li>
            <li>
              The Applicant was arrested on the {arrested_on}, by the Nigeria
              Police Force {arrested_at}, in
              {state_arrest} on same date.
            </li>
            <li>
              All efforts made by me and members of our family to secure the
              bail of the Applicant at the station have proved abortive.
            </li>
            <li>
              That the Accused/Applicant spent {station_duration} days in
              detention at the {applicant.station}, and was later charged to
              court at the {division} Magistrate Court.
            </li>
            <li>
              That I know as a fact that from the {arrested_on}, when the
              Applicant was arrested till date, the Nigeria Police Force should
              have concluded investigation, if any fact exist of any crime at
              all.
            </li>
            <li>
              That the accused/applicant was charged of{" "}
              {applicant.offence_charged} in {applicant.division}
              magistrate court where the sitting magistrate denied jurisdiction
              of the said matter. The charge sheet is hereby attached and marked
              as Exhibit A.
            </li>
            <li>
              That the accused was arrested since the {arrested_on}, and was in
              police detention until the {arraigned_on}, when he was arraigned
              before the lower court that declined jurisdiction and ordered his
              remand at the {applicant.state_arraigned}
              Correctional Center pending Director of Public Prosecution’s
              advice.
            </li>
            <li>
              That the Director of Public Prosecution works directly under the
              1st Respondent.
            </li>
            <li>
              That plea of the Applicant was not taken at the Magistrate Court
              on the <span> </span>
              {arraigned_on}, when he was arraigned.
            </li>
            <li>
              That from the date of the arrest of the accused person on{" "}
              {arrested_on}, till the date of this application, is {months}{" "}
              months and an information/proof of evidence is yet to be filed
              against the applicant.
            </li>
            <li>
              That since then there has been no proof/evidence filed at the high
              court and the applicant has been in prison without trial.
            </li>
            <li>
              That the applicant if granted bail will be available to face his
              trial whenever called upon to do so.
            </li>
            <li>
              That the Applicant informed me in the {arrested_on} during my
              visit to the prison that he has reasonable and responsible
              sureties within the jurisdiction of this honourable court who are
              ready to take him on bail to guarantee his continuous attendance
              to court to face his trial, if information is eventually filed
              against him.
            </li>
            <li>
              That he will not interfere with police investigation of the case,
              if any, when admitted to bail.
            </li>
            <li>
              That there is no witness whose life will be endangered if the
              Applicant is admitted to bail.
            </li>
            <li>
              That i know as a fact that, unless this court admits the Applicant
              to bail, the respondent will continue to detain the Applicant in
              their unlawful, wrongful, and unconstitutional detention, even
              when there are reasonable persons to take the Applicant on bail.
            </li>
            <li>
              That the grant of this application will not prejudice the
              respondent as the applicant is in no way involved in the crime for
              which he is alleged to have committed.
            </li>

            <li>
              That I know as a fact that, unless this court enforces the
              Applicant’s Fundamental Right, the respondent will continue to
              detain the Applicant in their unlawful, wrongful, and
              unconstitutional detention.
            </li>
            <li>
              That the grant of this application will be in the interest of
              justice.
            </li>
            <li>
              That i swear to this Oath solemnly and conscientiously believing
              its contents to be true and correct in accordance with the Oath
              Act.
            </li>
          </ol>
        </div>

        <Signature applicant={applicant} />
      </div>

      <div className="page">
        <HeadingPrison applicant={applicant} />
        <div className="body">
          <h6 className="text-center font-weight-bold">
            WRITTEN ADDRESS IN SUPPORT OF THE INSTANT APPLICATION
          </h6>
          <p>
            This is a written address of Counsel for the Accused/Applicant. The
            said written address accompanies a Motion on Notice brought pursuant
            to Sections 35(4) and 36 of the Constitution of the Federal Republic
            of Nigeria 1999 (as amended) and under the inherent jurisdiction of
            the Honourable Court. The motion prays the Honourable Court for the
            following:
          </p>
          <h6>
            AN ORDER ADMITTING THE ACCUSED/APPLICANT, {name} TO BAIL PLENDING
            TRIAL.
          </h6>
          <p>
            And for such order or further orders as the Honourable Court may
            deem fit to make in the circumstance.
          </p>
          <p>
            In support of the motion is a 22 paragraphs affidavit sworn to by
            the Accused/Applicant. Attached to the said affidavit are two
            Exhibits A & B. We place reliance on all the paragraphs of the
            affidavit. In determination of this application, My Lord the issue
            for determination is:
          </p>
          <h6>
            Whether the Accused/Applicant is entitled to be admitted to bail
            pending trial by a Court of Competent Jurisdiction.
          </h6>
          <h6>ARGUMENT</h6>
          <p>
            My Lord, it is trite law that bail is a right before conviction
            unless there are special reasons to refuse it. A person who has not
            been found guilty of an offence is prima facie entitled to his
            liberty. Once he has been convicted by a Competent Court and
            sentenced to a term of imprisonment he is prima facie deprived of
            that entitlement and the opposite becomes the case. Before
            conviction, there is presumption of innocence. May I refer Your
            Lordship to the case of Adamu Muri v. Inspector General of Police
            (1957) N.R.N.L.R 5 at page 6.
          </p>
          <p>
            My Lord, the Accused/Applicant is a Nigerian citizen and was
            arrested in {arrested_on} by the police and was in police detention
            until
            {arrested_on}, when he was arraigned at the Magistrate Court{" "}
            {division} before his Worship and jurisdiction was declined by the
            lower court for want of jurisdiction and until the filing of this
            motion, the respondent has filed no information/proof of evidence
            let alone to commence the prosecution of this case. This I humbly
            submit amount to special and exceptional circumstance likely to keep
            the applicant incarcerated ad-in-finitum entitling the applicant to
            bail. For this, I refer My Lord to the following cases:
          </p>
          <ul>
            <li>
              <h6>
                Musa v. C.O.P (2004) 9 NWLR (pt. 879) p. 483 at 486 (ratio 4)
              </h6>
            </li>
            <li>
              <h6>Anakwe vs. C.O.P (1996) 3 NWLR (pt. 436) p. 320 at 331,</h6>
              <p>
                where the Court held that: “where the prosecutor parades to the
                court the word ‘robbery’… as in the instant case without trying
                the accused with the offence, the court of law is bound to grant
                bail and that the only way to initiate criminal proceeding is to
                proffer an information/proof of evidence substantial enough to
                show that there is a prima facie evidence of commission of the
                offence against the accused”. This the respondent has not done.
              </p>
            </li>
          </ul>
          <p>
            To this end, Ogbuagu J.C.A (as he then was) in the case of Musa Vs.
            C.O.P (2014) 9 NWLR (pt. 879) p. 483 ratio 2, held:
          </p>
          <p className="pl-3 font-italic">
            “The failure of the respondent to produce or exhibit the said proof
            of evidence in my view is , or amounts to a special and exceptional
            circumstance for me to exercise my discretion in favour of the
            applicant”.
          </p>
          <p>
            My Lord, Section 35(4) of the Constitution of the Federal Republic
            of Nigeria 1999 (as amended) states as follows:
          </p>
          <p>
            “Any person who is arrested or detained in accordance with
            subsection 1(c) of the section shall be brought before a court of
            law within a reasonable time, and if he is not tried within a period
            of:
          </p>
          <div className="pl-3">
            <p>
              A.
              <span>
                Two months from the date of his arrest or detention, in the case
                of a person who is in custody or is not entitled to bail; or
              </span>
            </p>
            <p>
              B.
              <span>
                Three months from the date of his arrest of detention, in the
                case of a person who has been released on bail, he shall
                (without prejudice to further proceedings that may be brought
                against him) be released unconditionally or upon such conditions
                as are reasonably necessary to ensures he appears for trial at a
                later date”.
              </span>
            </p>
          </div>
          <p>
            My Lord, the Accused/Applicant was arrested since
            {arrested_on} and was in police detention until
            {arraigned_on} when he was arraigned before the lower court that
            declined jurisdiction and ordered his remand at the Correctional
            Center pending Director of Public Prosecution’s advice. From the
            date of the arrest of the accused person in {arrested_on} till the
            filing of this application, it is {months} months and an
            information/proof of evidence is yet to be filed against the
            applicant. On this note, the Applicant is entitled to bail My Lord.
            This is the position of the Court of Appeal in the case of Fajana
            Eddi vs. C.O.P (2007) All FWLR (pt. 367) 960.
          </p>
          <p>
            My Lord, the grant or refusal of the application for bail is at the
            discretion of this Honourable Court. The decision to grant or refuse
            application for bail depends entirely on the exercise of the
            discretion of the Learned Trial Judge having regards to the material
            placed before him in the affidavit in support of the application.
            May I refer Your Lordship to the case of Likitta vs. C.O.P (2002)
            All FWLR (pt. 106) 1075.
          </p>
          <p>
            Again, we urge My Lord to take critical look at the arraignment of
            the Applicant at the Lower Court as shown in the Affidavit in
            support of the motion paper. The accused/ Applicant did not take
            plea before the lower Court because the Court lacks jurisdiction to
            try the case. The Magistrate ordered that the applicant be remanded
            in prison custody. Flow from the above, we urge Your Lordship to
            exercise this discretion judicially and judiciously in favour of the
            applicant. The law is that bail should not be refused as a
            punishment and that justice delayed is justice denied. See Dogo vs.
            C.O.P (1988) 1. NCR 14. Courts are enjoined to approach the question
            of bail liberally, see Musa vs. COP (200) 8 NWLR (pt. 879) 583;
            Danbaba vs. State (2000) 14 NWLR (pt. 687) 396.
          </p>
          <p>
            Over the years the Appellate Courts have set out considerations that
            will weigh in the mind of the Court in the consideration of bail.
            Some of the conditions are stated in Bamiyi vs. The State (2001) 8
            NWLR (pt. 715) at p. 276. In the instant case, the Accused/Applicant
            shall abide by them all. The Applicant will come to trial whenever
            called upon to do so. See paragraph 14 of the affidavit in support
            of this motion.
          </p>
          <p>
            It is my humble submission that by Section 36(5) of the Constitution
            of the Federal Republic of Nigeria 1999 (as amended), an accused
            person standing trial is presumed innocent. See the case of J.A Orji
            & 5 Ors vs. F.R.N (2007) 13 NWLR (pt. 1050) 55 at 88 para. D-F and
            94-95, Para. E-G.
          </p>
          <p>
            On the whole therefore, I humbly urge Your Lordship to grant bail to
            the Accused/Applicant in the most lenient terms.
          </p>
          <p>May it please this Honourable Court.</p>
        </div>
        <Signature applicant={applicant} />
      </div>
    </Fragment>
  );
};

CaseCComp.propTypes = {
  applicant: PropTypes.object,
  affidavit: PropTypes.object,
};

export default CaseCComp;
