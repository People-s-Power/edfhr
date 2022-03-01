import Moment from "moment";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { AffidavitProps, ApplicantProps } from "types/Applicant_types";
import { HeadingPrison, Signature } from "../Structure";

interface IPage {
  applicant: ApplicantProps;
  affidavit: AffidavitProps;
}

const CaseDComp = ({ applicant, affidavit }: IPage): JSX.Element => {
  const {
    name,
    state_arrest,
    arrested_at,
    station_duration,
    state_arraigned,
    division,
    lga,
    state_origin,
    charge_no,
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
          <h6 className="text-center font-weight-bold">MOTION ON NOTICE</h6>
          <p>
            Brought Pursuant to Order 2 Rule 1 of the Fundamental Rights
            (Enforcement Procedure) Rules, 2009, Sections 32 (1), (2), Sections
            34, 35, 36 and 41 of the Constitution of the Federal Republic of
            Nigeria, 1999, AS AMENDED; Article 6,9 and 12 of the African Charter
            on Human and People’s Right (Ratification and Enforcement ) Act, Cap
            A9 Laws of the Federation of Nigeria, 2004, and under the inherent
            Jurisdiction of this Honourable Court as preserved by Section 6(6)
            (a) of the Constitution of the Federal Republic of Nigeria, 1999, as
            amended.
          </p>
          <p>
            TAKE NOTICE: that this Honourable Court will be moved on ………….day of
            ………….....…{new Date().getFullYear()} at the Hour of 9 O.clock in the
            forenoon or so soon thereafter as the Applicant or Counsel on behalf
            of the Applicant may be heard praying this honourable court for the
            following reliefs:
          </p>
          <ol>
            <li>
              A DECLARATION that the continuing detention of the Applicant since
              the {arrested_on}, till date without preferring of appropriate
              charges/information against the Applicant in the appropriate court
              of law for his trial, is wrongful, unlawful, and unconstitutional
              as it violates the applicants fundamental rights to respect for
              the dignity of his person, personal liberty and Right to fair
              trial as guaranteed under Sections 34, 35 and 36 of the
              Constitution of the Federal Republic of Nigeria, 1999, as amended;
              Article 6,9 and 12 of the African Charter on Human and People’s
              Right (Ratification and Enforcement )Act, Cap A9 Laws of the
              Federation of Nigeria, 2004.
            </li>
            <li>
              An Order admitting the Applicant to bail pending the preferring of
              a formal charge/information for the trial of the Applicant.
            </li>
            <li>
              AND for such further or other Order(s) as this Honourable Court
              may deem fit to make in the circumstance.
            </li>
            <li>
              AND TAKE FURTHER NOTICE that the detention of the Applicant for
              more than 24hrs on an allegation of an offence without trial is a
              fragrant violation of the Applicant’s Constitutional Rights. See
              Section 35(4) of the 1999 Constitution of the Federal Republic of
              Nigeria as amended.
            </li>
          </ol>
        </div>

        <Signature applicant={applicant} />
      </div>

      <div className="page">
        <HeadingPrison applicant={applicant} />
        <div className="body">
          <ol>
            <li>
              <h6>NAME AND DESCRIPTION OF THE APPLICANT</h6>
              <p>
                {name} is an indigine of {lga} of {state_origin}
              </p>
            </li>
            <li>
              <h6>RELIEFS SOUGHT BY THE APPLICANT</h6>

              <ol>
                <li>
                  A DECLARATION that the continuing detention of the Applicant
                  since the {arrested_on}, till date without preferring of
                  appropriate charges/information against the Applicant in the
                  appropriate court of law for his trial, is wrongful, unlawful,
                  and unconstitutional as it violates the applicants fundamental
                  rights to respect for the dignity of his person, personal
                  liberty and Right to fair trial as guaranteed under Sections
                  34, 35 and 36 of the Constitution of the Federal Republic of
                  Nigeria, 1999, as amended; Article 6,9 and 12 of the African
                  Charter on Human and People’s Right (Ratification and
                  Enforcement )Act, Cap A9 Laws of the Federation of Nigeria,
                  2004.
                </li>
                <li>
                  <p>
                    A DECLARATION that the arrest and detention of the Applicant
                    since the {arrested_on} and who was further taken Magistrate
                    court, for the sole purpose of being remanded in prison
                    custody on the
                    {arraigned_on} without taken any further step to prefer any
                    formal charge/information against the Applicant for his
                    trial in any competent court till date amounts to a breach
                    of Section 202 of Administration of Criminal Justice Act and
                    is not known to our Criminal Law and Jurisprudence.
                  </p>
                </li>
                <li>
                  AN ORDER of the Honourable Court to quash all the charges
                  against the Applicant and the Remand Order made by the Senior
                  Magistrate Court in Charge No: {applicant?.charge_no} on the
                  {arraigned_on}, and discharge the Applicant on the said
                  charge, pending the filing of appropriate charge or
                  information before a competent court for his trial or;
                </li>
                <li>
                  AN ORDER admitting the Applicant to bail pending the
                  preferring of a formal charge/information for the trial of the
                  Applicant.
                </li>
                <li>
                  AND for such further or other Order(s) as this Honourable
                  Court may deem fit to make in the circumstance.
                </li>
              </ol>
            </li>
            <li>
              <h6>GROUNDS UPON WHICH THE RELIEFS ARE SOUGHT:</h6>
              <ol>
                <li>
                  <p>
                    By virtue of section 34(1)(a), 35(1) and (4), 36(1) and (5)
                    of the Constitution of the Federal Republic of Nigeria,
                    1999, as amended and Article 3,4,5,6 and 7(b) and (d) of the
                    African Charter on Human and People’s Right (Ratification
                    and Enforcement) Act, Cap A9, Laws of the Federation of
                    Nigeria, 2004, every person is entitled to respect for the
                    dignity of his person, personal liberty, freedom of movement
                    , be presumed innocent until proved guilty and tried within
                    a reasonable time by an impartial court or tribunal over
                    allegation of crime.
                  </p>
                </li>
                <li>
                  <p>
                    The continuing incarceration of the Applicant by the
                    Respondents since the
                    {arrested_on}, and on the
                    {arraigned_on}, when he was taken before Magistrate court,
                    till date without filing or preferring of a formal
                    charge/information against the Applicant is a violation of
                    the Applicant’s Fundamental Right as enshrined in the
                    Constitution and it is therefore unlawful and ultra vires
                    the power of the respondent and therefore unconstitutional.
                  </p>
                </li>
                <li>
                  <p>
                    No formal charge/Information with proof of evidence has been
                    filed before the appropriate court to determine the guilt or
                    otherwise of the Applicant.
                  </p>
                </li>
                <li>
                  <p>
                    An accused like the Applicant should face early trials, and
                    where early trial cannot be guaranteed, then he should be
                    discharged for want of diligent prosecution or released on
                    bail.
                  </p>
                </li>
                <li>
                  <p>
                    The Applicant’s continuing detention since the
                    {arraigned_on}, by an order of the magistrate till date
                    without the filling or preferring of appropriate
                    charge/information  before a competent court of law, has no
                    legal justification.
                  </p>
                </li>
                <li>
                  <p>
                    The seriousness of an alleged offence was provided to be the
                    reason for prompt arraignment, which in the instant case,
                    the Respondents have failed to do so. See the case of
                    Bolakale V. State (2006) ALL NWLR (PF 962) 507, 519, where
                    Muntaka-Commaissie, J.C.A held thus: “…it is the seriousness
                    that should spur the Prosecution to do or perform his
                    function timorously and properly because the Liberty of a
                    Nigeria is at stake…”
                  </p>
                </li>
              </ol>
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
          <div>
            <h6>A. BACKGROUND FACT</h6>
            <p>
              The Applicant, who is a Nigerian, is an adult of full age. On the
              {arrested_on}, the Applicant was arrested at {arrested_at}, by men
              of the Nigerian police force. The Applicant was detained by the
              Nigerian Police Force from the {arrested_on}, till the
              {arraigned_on}, when he was charged to Magistrate court, on the
              charges provided on the charge sheet exhibited herein. The
              Honourable Court upon seeing the charge sheet No: {charge_no}
              declined jurisdiction and ordered that the Applicant be remanded
              in prison custody and the case file sent to the Director Public
              Prosecution, {state_arraigned} for advice/or to prefer a formal
              charge/or information against the Applicant in the appropriate
              court for trial. Since the {arraigned_on}, till now, when his
              worship made the above orders, only part of it had been compiled
              with, that is, the order relating to the detention of the
              Applicant at the prison custody and that of remitting the case
              file to the Respondent, while the order preferring a formal charge
              against the Applicant has been disobeyed by the Respondent, hence
              this application to enforce the Applicants’ Fundamental Rights as
              enshrine in our constitution and the African Charter on Human and
              Peoples Right (Ratification and Enforcement) Act, 2014, pending
              the filing of appropriate information and trial of the Applicant
              has supported the Application with his name and description, the
              reliefs // eslint-disable-next-line no-irregular-whitespace that
              he is seeking from the Court , and grounds  upon which the reliefs
              are sought and an affidavit of 12 paragraphs deposed to by the
              {affidavit.rel} of the Applicant. We are respectfully relying on
              all the paragraphs of the supporting affidavit and the only
              exhibit thereof.
            </p>
            <h6>B. ISSUE FOR DETERMINATION</h6>
            <p>
              Whether the Applicant should remain indefinitely in detention
              without being admitted to bail pending the filing of appropriate
              information against him before a court of competent jurisdiction?
            </p>
            <h6>C. ARGUMENT </h6>
            <p>
              The only issue formulated for determination in this application
              is, whether the Applicant should remain indefinitely in detention
              without being admitted to bail pending the filing of the
              appropriate information against him before a court of competent
              jurisdiction? My Lord, at this stage, the question is not whether
              the Applicant committed the above offence contained in the charge
              No: {charge_no}
              or not? But the question before my Lord for determination is
              whether the Applicant who was arrested and detained since the
              {arrested_on}, by men of the Nigeria police force and later taken
              to Magistrate court on the
              {arraigned_on}, and finally remanded in prison custody till date
              without any formal information preferred against him should be
              allowed to remain indefinitely without being admitted to bail?
              This indeed is the pedestal upon which this application is
              anchored. In considering this application, this court is urged,
              with respect to look at both the provisions of statute, the
              constitution of the federal Republic of Nigeria, 1999, as amended,
              and case laws that had in the past dealt with similar situations
              to arrive at just decision.
            </p>
            <h6>LET US BEGIN WITH OUR CONSTITUTION</h6>
            <p>
              The plenitude of the judicial powers of court under our 1999
              constitution, as amended more especially section 6 (6) (a) (b), 35
              (1) (4) and 36 (5) including the provision of section 32 (1) and
              (2) of the administration of Criminal Justice Act, 2015, and
              Articles 6,9 and 12 of the African Charter on Human and People
              Right (Ratification and Enforcement) Act 2004, provides the
              necessary checks and balances for undue or imagined excesses of
              the executive arm of the Government, so that where the
              circumstances warrant, such as the instant case, when the
              Applicant  has been detained since the
              {arrested_on}, and on the
              {arraigned_on}, when the court made a valid and subsisting order
              that the prosecution should prefer a formal charge/or information
              against the Applicant in the appropriate court of law, any citizen
              who is arbitrarily incarcerated (like the Applicant) will by the
              force of law regain his liberty. We refer you to the case of
              Chinemelu V.C.O.P (1995)4NWLR,(pt390)367, where the court held on
              page 483 paragraphs E to F, thus: “Where the police or the
              executive arbitrarily detain a citizen in circumstances outside
              the purview of section 243 of CPL, or any other written law, then
              that is derogatory to the due process of law and antithetical to
              democracy. That will signal on head-on-romance with anarchy and a
              police state”
            </p>
            <p>
              By virtue of Section 36 (5) of the 1999 constitution of the
              Federal Republic of Nigeria, as amended, “Every person who is
              charged with a criminal offence shall be presumed to be innocent
              until he is proven guilty”. This position is irrespective of the
              nature or gravity of the offence charged. The court of Appeal, per
              MUNTAKA-COOMASSIE, J.C.A (Delivering the leading judgment) gave
              credence to the constitutional provision cited above in BOLAKALE
              V. STATE (2006) INWLR (pt 269) page 507, particularly at page 519
              paragraphs G this:
            </p>
            <p>
              “The constitutional position is clear, whether the offence is of a
              serious nature or not, the accused is still presumed innocent.
              Ours is not inquisitorial but accusatorialsystem”.
            </p>
            <p>
              My Lord, we humbly submit with respect, that this humble
              application should not be refused by this court simply  looking at
              the alleged offenses on the face of the charge sheet filed in the
              magistrate court, a court without jurisdiction, more so, which
              amount to a holding charge, hence, such refusal by this Honourable
              Court when the prosecution has failed to do the proper thing, will
              definitely serves as a punishment or to make the Applicant suffer
              indignity which this court as a court of justice is not to
              encourage. As rightly observed by the Lord Russel of Kilowen in R
              V. Rose (1895-9) ALL ER 350; “It cannot be too strongly impressed
              on the magistracy of the country that bail is not to be withheld
              as a punishment but that the requirements as to bail are merely to
              secure the attendance of the prisoner at trial”.
            </p>
            <p>
              This pronouncement by Lord Russel, is a classical statement of the
              law, this position of law may have well prompted NGUTA, J.C.A. in
              the case of IKHAZUAGBE V. THE COMMISSIONER OF POLICE (2005) ALL
              FWLR (pt 266) 1323, 1340 paragraghs A-B to held thus: “In our
              criminal law and procedure, the accused is presumed innocent until
              the contrary is proven irrespective of the nature or gravity of
              the offence with which he is charged… Denial of bail cannot be
              used to punish him for the crime with which he is charged and for
              which he is yet to be tried”.
            </p>
            <p>
              From the provisions of our constitution, and relevant statutes, it
              is clear that our laws are against unnecessary detention of
              citizens without trial, which is the case of the Applicant in this
              application.
            </p>
            <h6>WE CAN NOW LOOK AT CASE LAW FOR OUR GUIDE.</h6>
            <p>
              We are minded to start here with taking critical look at the
              factors to be considered by the court when considering an
              application for bail. In the case of James Donbaba V. The state
              (2001)14 NWLR (Pt 687) 396, GALADIMA, S.C.A, (as he then was)
              stated the conditions on page 407 paragraghs G to H thus:
            </p>
            <ol>
              <li>
                Whether the proper investigation of the offence would be
                prejudiced if the accused person is granted bail and there is a
                serious risk of the accused person’s escape from Justice by
                jumping bail.
              </li>
              <li>
                The nature of the offence or charge which the accused person is
                facing before the court and the risk of his interference in the
                prosecution of the case; and
              </li>
              <li>The strength of the violence against the accused person”.</li>
            </ol>
            <p>
              It is to be noted that all the above factors may not be relevant
              on all applications for bail pending trial and the factors above
              are not exhaustive. It may be well that any one or more of the
              above factors will be relevant in any given situation, see the
              case of Anajemba V. the Federal Government of Nigeria (2004) 13
              NWLR (Pt 890) 267, 283, Paragragh H.
            </p>
            <p>
              In the instant case no information has been preferred against the
              Applicant and no proof of evidence to determine the nature of the
              offence and/or the strength of the evidence against the Applicant.
              The Applicant has in support of this application filed an
              affidavit of 22 paragraphswherein he has clearly stated thus:
            </p>
            <ol>
              <li> that no information has been preferred against him.</li>
              <li>that no valid evidence against him.</li>
              <li>
                that if admitted to bail, the investigation of this case will
                not be prejudiced.
              </li>
              <li>
                that he will not interfere with police investigation, if any.
              </li>
            </ol>
            <p>
              Considering the weighty deposition in the affidavit evidence
              before this court in this case, it is clear that the Applicant has
              shown strong reasons why this application should not be refused by
              the court.
            </p>
            <h6>
              Let us now look at cases were no formal information were preferred
              against accused person, yet they were detained and the attitude of
              court towards same.
            </h6>
            <p>
              We will begin with the case of Nwinyima V. Cop (2005) II NWLR (Pt.
              936) 255. In this case, the Applicant was arrested on the 17th
              December, 1999 for an allege offence of armed robbery involving a
              motorcycle, (like that of the accused person case in the instant
              application) He was taken before the chief magistrate court,
              Onitsha on the 25th January 2000. The chief magistrate,   remanded
              the accused person in custody and ordered the police to accelerate
              the investigation of the matter for the advice of the Director of
              public prosecution. After waiting for information to be taken out
              against the accused person without any positive result, the
              accused person filed an application for bail which was refused by
              the lower court.
            </p>
            <p>
              In condemning the act by the lower court and in admitting the
              Accused/Applicants to bail, the court of appeal, Ogebe J.C.A (as
              he then was) while delivery his leading judgment held thus in page
              261 paragraph C-D:- ‘’It showed that the Respondent simply dumped
              in prison Custody on a  so-called allegation of armed robbery
              without doing anything for several years to file information and
              proof of evidence in respect of the alleged offence. This is
              totally unjust and is an unwanted invasion of the Applicant’s
              right to personal Liberty. No reasonable court of law can ignore
              such a breach…’’
            </p>
            <p>
              Accordingly, the Applicant was admitted to bail. Secondly, in
              ANAEKEWE V.C.O.P (1996) 3 NWLR (Pt 436) 320, the Appellant and
              nine others were charged for conspiracy and murder before the
              chief magistrate court, Onitsha on the 2nd December 1994. The
              learned chief magistrate ordered that the accused persons be
              remanded in prison custody. An Application for bail was filed. The
              earned trial judge refused the application mainly on ground that
              the offence allegedly committed is murder. Tobi J.C.A (as he then
              was) while delivering the leading judgment in page 332, paragraph
              H made the following illuminating pronouncement: “learned counsel
              for the respondent, in his brief referred to the charge preferred
              against the appellant in the magistrate court. Can he really do
              that in law? How can he refer to a charge before a court without
              jurisdiction in a court with jurisdiction,  but is ask to take a
              bail Applicant without a formal charge by way of information? The
              so-called charge (No MO/844C/194 before the Chief Magistrate
              Onitsha) is moribund and the law treats it so’’
            </p>
            <p>
              Accordingly, the court admitted the Appellant to bail,
              furthermore, in Enmer V. COP (1993) 6 NWLR (pt. 299) 333, 341, onu
              J.S.C. (as he then was) when faced with similar situation said:
            </p>
            <p className="font-italic">
              “In the case of Dogo V. COP (1980) INLR 14 at Page 17, it was
              emphasized that it is the duty of the court to consider whether to
              grant bail once an accused has pleaded not guilty  to a charge.
              Such a situation clearly arises where no information or charge is
              laid before the trial court. No so in the case in hand where no
              information or charge is laid by the prosecution. Hence, in the
              absence of fact which the prosecution was duly bound to supply
              justifying the Appellant’s detention in police cell, the trial
              Judge was bound to let Appellant go from the police cell”
            </p>
            <p>
              The Court also admitted the Appellant to bail. The same situation
              arises in the instant case and my Lord is urged with respect to
              follow the wise reasoning of the court above and admits the
              Applicant to bail.
            </p>
            <p>
              Recently, in the case of Shagari V.C.O.P (2007) 5 WWLR (Pt. 1027)
              275, the court of Appeal, Jos Division following the
              well-established reasoning stated above relating to instances
              where no information has been filed against a detained citizen
              admonished the prosecution on page 283, summarized at ratio thus:
              “The state should always endeavor with minimum of delay, to file
              charge and proof of evidence especially to allegation of
              commission of capital offence or any other serious crime. It is
              through such proof of evidence that a court before which an
              application for bail in such offence(s) is filed, will be
              influenced or persuaded in granting or refusing bail since it is
              only by examination or consideration of the proof of evidence that
              a court will ascertain whether there is prima facie evidence to
              warrant the continued detention of an accused person”.
            </p>
            <p>
              Sanusi J.C.A concluded on page 296 paragragh F thus:- “In a
              situation where there is no formal charge and proof of evidence
              the court will obviously be influenced to grant bail on such
              offence (s) as the absence of such proof of evidence could qualify
              as special circumstance to warrant the grant of bail”
            </p>
            <p>
              My Lord, it is further submitted that, in the event of the
              prosecution coming up to oppose this application, it will
              certainly not be enough to make bare assertions that the
              Accused/Applicant should not be granted bail on the ground that
              the Accused/Applicant would abscond or interfere with or obstruct
              the course of justice if released on bail, the prosecution must
              state clearly the antecedents of the Applicant not coming up to
              face trial or his where about being difficult to trace in the past
              or how he would interfere with or obstruct the course of justice.
              See the case of Chedi V.A.G Federation (2006)13NWLR (pt 997)
              308,328. In view of the conclusion reached by the superior courts
              of Nigeria, we respectfully urge my Lord to follow the wise
              reasoning and admit the Applicant to bail pending when the
              respondent will prefer a charge or information against him in an
              appropriate court of law.
            </p>
            <h6>D. CONCLUSION</h6>
            <p>
              We submit, with respect that the facts as shown in the supporting
              affidavit to this application and the grounds in support,
              constitute yet another special and exceptional circumstances that
              would warrant this Honourable Court to admit the Applicant to
              bail. We finally, Submit, that the Application has unequivocally
              placed before this court relevant material upon which the
              discretion of the Court may be exercise in his favour. Speaking on
              the need for a court to adopt a liberal approach to bail, Oguntude
              J.C.A (as he then was) while making his contribution stated in the
              case of Danbaba V. State (supra) on page 412 paragraghs B thus:
              “Against the background of the above provision of the 1999
              constitution, a court must always bear in mind the necessity to
              approach the question of bail liberally and generously…”.
              Accordingly, we submit and urge this court to admit the Applicant
              to bail on liberal terms pending when information will be taken
              out against him. May it please my Lord.
            </p>
          </div>
        </div>
        <Signature applicant={applicant} />
      </div>

      <div className="page">
        <HeadingPrison applicant={applicant} />
        <div className="body">
          <h6 className="text-center my-3">
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
              detention at the
              {applicant.station}, and was later charged to court at the{" "}
              {division} Magistrate Court.
            </li>
            <li>
              That I know as a fact that from the {arrested_on}, when the
              Applicant was arrested till date, the Nigeria Police Force should
              have concluded investigation, if any fact exist of any crime at
              all.
            </li>
            <li>
              That the accused/applicant was charged of{" "}
              {applicant.offence_charged} in {division}
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
              on the
              {arrested_on}, when he was arraigned.
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
    </Fragment>
  );
};

CaseDComp.propTypes = {
  applicant: PropTypes.object,
  affidavit: PropTypes.object,
};

export default CaseDComp;
