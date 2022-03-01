import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Heading, Signature } from "../Structure";
import Moment from "moment";
import { AffidavitProps, ApplicantProps } from "types/Applicant_types";

interface IPage {
  applicant: ApplicantProps;
  affidavit: AffidavitProps;
}

const CaseBComp: React.FC<IPage> = ({ applicant, affidavit }) => {
  const { station, state_arrest, arrested_at } = applicant;
  const arrested_on = Moment(applicant.arrested_on).format("do MMMM YYYY");
  return (
    <Fragment>
      <div className="page">
        <div>
          <Heading applicant={applicant} />
          <div className="body">
            <div className="my-3 text-center font-weight-bold">
              MOTION ON NOTICE
            </div>
            <p>
              Brought Pursuant to Order 2 Rule 1 of the Fundamental Rights
              (Enforcement Procedure) Rules, 2009, Sections 32 (1), (2) and 169
              of the Administration of Criminal Justice Law, No. 7 of 2015 of
              Rivers State, Sections 34, 35, 36 and 41 of the Constitution of
              the Federal Republic of Nigeria, 1999, AS AMENDED; Article 6,9 and
              12 of the African Charter on Human and People’s Right
              (Ratification and Enforcement )Act, Cap A9 Laws of the Federation
              of Nigeria, 2004, and under the inherent Jurisdiction of this
              Honourable Court as preserved by Section 6(6) (a) of the
              Constitution of the Federal Republic of Nigeria, 1999, as amended.
            </p>
            <p>
              <span className="font-bold">TAKE NOTICE</span>: that this
              Honourable Court will be moved on ___________________day of
              ___________________
              {new Date().getFullYear()} at the Hour of 9 O’clock in the
              forenoon or so soon thereafter as the Applicant or Counsel on
              behalf of the Applicant may be heard praying this honourable court
              for the following reliefs:
            </p>
            <ol>
              <li>
                <span className="font-bold">A DECLARATION</span> that the
                continuing detention of the Applicant since the{" "}
                {Moment(applicant.arrested_on).format("Do MMMM YYYY")}, till
                date without preferring of appropriate charges/information
                against the Applicant in the appropriate court of law for his
                trial, is wrongful, unlawful, and unconstitutional as it
                violates the applicants fundamental rights to respect for the
                dignity of his person, personal liberty and Right to fair trial
                as guaranteed under{" "}
                <span className="font-bold">
                  Sections 34, 35 and 36 of the Constitution of the Federal
                  Republic of Nigeria
                </span>
                , 1999, as amended; Article 5,6,9 and 12 of the African Charter
                on Human and People’s Right (Ratification and Enforcement )Act,
                Cap A9 Laws of the Federation of Nigeria, 2004.
              </li>
              <li>
                5,000,000.00 from the respondents jointly and severally and in
                the alternative for the violation of the Applicant’s Fundamental
                Rights.
              </li>
              <li>
                AN ORDER restraining the Respondents, their agents, servants and
                whosoever, from further arresting and detaining the Applicant in
                connection with the subject matter of this application.
              </li>
              <li>
                AND for such further or other Order(s) as this Honourable Court
                may deem fit to make in the circumstance.
              </li>
              <li>
                AND TAKE FURTHER NOTICE that the detention of the Applicant for
                more than 24hrs on an allegation of an offence without trial is
                a fragrant violation of the Applicant’s Constitutional Rights.
                See Section 35(4) and (5) of the 1999 Constitution of the
                Federal Republic of Nigeria as amended.
              </li>
            </ol>

            <div className="my-3">
              <p>
                Dated this ___________________________ day of
                _____________________________ {new Date().getFullYear()}
              </p>
            </div>

            <Signature applicant={applicant} />
          </div>
        </div>
      </div>

      <div className="page">
        <Heading applicant={applicant} />
        <div className="body">
          <ol>
            <li>
              <h6>NAME AND DESCRIPTION OF THE APPLICANT</h6>
              <div>{applicant.name}</div> is an indigene of {applicant.lga}
              Local Government Area of
              {applicant?.state_origin}
            </li>
            <li>
              <h6>RELIEFS SOUGHT BY THE APPLICANT</h6>
              <ol>
                <li>
                  <div>
                    A DECLARATION that the continuing detention of the Applicant
                    since the
                    {applicant?.state_arrest} till date without preferring of
                    appropriate charges/information against the Applicant in the
                    appropriate court of law for his trial, is wrongful,
                    unlawful, and unconstitutional as it violates the applicants
                    fundamental rights to respect for the dignity of his person,
                    personal liberty and Right to fair trial as guaranteed under
                    Sections 34, 35 and 36 of the Constitution of the Federal
                    Republic of Nigeria, 1999, as amended; Article 5,6,9 and 12
                    of the African Charter on Human and People’s Right
                    (Ratification and Enforcement )Act, Cap A9 Laws of the
                    Federation of Nigeria, 2004.
                  </div>
                </li>
                <ol>
                  <li>
                    5,000,000.00 from the respondents jointly and severally and
                    in the alternative for the violation of the Applicant’s
                    Fundamental Rights.
                  </li>
                  <li>
                    AN ORDER restraining the Respondents , their agents,
                    servants and whosoever, from further arresting and detaining
                    the Applicant in connection with the subject matter of this
                    application.
                  </li>
                  <li>
                    AND for such further or other Order(s) as this Honourable
                    Court may deem fit to make in the circumstance.
                  </li>
                </ol>
              </ol>
            </li>
            <li>
              <h6>GROUNDS UPON WHICH THE RELIEFS ARE SOUGHT</h6>
              <ol>
                <li>
                  I. By virtue of section 34(1)(a), 35(1) and (4), 36(1) and (5)
                  of the Constitution of the Federal Republic of Nigeria, 1999,
                  as amended and Article 3,4,5,6 and 7(b) and (d) of the African
                  Charter on Human and People’s Right (Ratification and
                  Enforcement) Act, Cap A9, Laws of the Federation of Nigeria,
                  2004, every person is entitled to respect for the dignity of
                  his person, personal liberty, freedom of movement , be
                  presumed innocent until proved guilty and tried within a
                  reasonable time by an impartial court or tribunal over
                  allegation of crime.
                </li>
                <li>
                  The continuing incarceration of the Applicant by the
                  Respondents since the
                  {applicant?.state_arrest} till date without filing or
                  preferring of a formal charge/information against the
                  Applicant in the appropriate court of law for his trial or
                  admitting the Applicant to bail is wrongful, unlawful,
                  unconstitutional and is a violation of the Applicant’s
                  Fundamental Rights to respect for the dignity of his person,
                  personal liberty and right to fair trial as guaranteed under
                  sections 34, 35 and 36 of the Constitution of the Federal
                  Republic of Nigeria, 1999 as amended; Article 5,6,9 and 12 of
                  the African Charter on Human and People’s Right (Rectification
                  and Enforcement) Act, Cap A9, Laws of the Federation of
                  Nigeria, 2004.
                </li>
                <li>
                  No formal charge/Information with proof of evidence has been
                  filed before the appropriate court to determine the guilt or
                  otherwise of the Applicant.
                </li>
                <li>
                  An accused like the Applicant should face early trials, and
                  where early trial cannot be guaranteed, then he should be
                  discharged for want of diligent prosecution or released on
                  bail.
                </li>
                <li>
                  The seriousness of an alleged offence was provided to be the
                  reason for prompt arraignment, which in the instant case, the
                  Respondents have failed to do so. See the case of Bolakale V.
                  State (2006) ALL NWLR (PF 962) 507, 519, where
                  Muntaka-Commaissie, J.C.A held thus: “…it is the seriousness
                  that should spur the Prosecution to do or perform his function
                  timorously and properly because the Liberty of a Nigeria is at
                  stake…”
                </li>
              </ol>
            </li>
          </ol>
        </div>
        <Signature applicant={applicant} />
      </div>

      <div className="page">
        <Heading applicant={applicant} />
        <div className="body">
          <h6 className="text-center">
            WRITTEN ADDRESS IN SUPPORT OF THE INSTANT APPLICATION
          </h6>
          <h6>INTRODUCTION</h6>
          <div>
            This is a Motion on Notice dated the ­­­­­__________________day of
            ______________{new Date().getFullYear()} brought pursuant to Order 2
            Rule 1 of the Fundamental Right (Enforcement Procedure ) Rules 2009
            and under the inherent Jurisdiction of this court pursuant to
            section 6(6)(a) of the 1999 Constitution of the Federal Republic of
            Nigeria(as amended). The Motion prays for:
            <ol>
              <li>
                A DECLARATION that the continuing detention of the Applicant
                since the {arrested_on}, till date without preferring of
                appropriate charges/information against the Applicant in the
                appropriate court of law for his trial, is wrongful, unlawful,
                and unconstitutional as it violates the applicants fundamental
                rights to respect for the dignity of his person, personal
                liberty and Right to fair trial as guaranteed under Sections 34,
                35 and 36 of the Constitution of the Federal Republic of
                Nigeria, 1999, as amended; Article 5,6,9 and 12 of the African
                Charter on Human and People’s Right (Ratification and
                Enforcement )Act, Cap A9 Laws of the Federation of Nigeria,
                2004.
              </li>
              <li>
                5,000,000.00 from the respondents jointly and severally and in
                the alternative for the violation of the Applicant’s Fundamental
                Rights.
              </li>
              <li>
                3. AN ORDER restraining the Respondents, their agents, servants
                and whosoever, from further arresting and detaining the
                Applicant in connection with the subject matter of this
                application.
              </li>
              <li>
                AND for such further or other Order(s) as this Honourable Court
                may deem fit to make in the circumstance.
              </li>
            </ol>
            <div>
              The Application is supported by a statement pursuant to Order 2
              Rule 3 of the Fundamental Right (Enforcement Procedure) Rules 2009
              as well as 12 paragraphs of Affidavit deposed to by one
              {affidavit.title} {affidavit.name} on behalf of the Applicant.
              Attached to the said Affidavit is an EXHIBIT. We place reliance on
              all the paragraphs of the Statement as well as the Affidavit in
              support of the Motion together with the Exhibit attached hereto.
            </div>
            <h6>ARGUMENT</h6>
            <p>
              We now advance our argument in furtherance of the hearing of this
              application or motion on notice. My lord, the motion on notice is
              dated the ________________________ day of
              _____________­­­­­_________ 2019 and filed pursuant to the Rules
              (supra). My Lord, the Applicant while filing the Application for
              the redress of the infringement of his Fundamental Rights filed
              alongside the motion, a statement pursuant to Order 2 Rule 3 of
              the Rule (Supra). The said statement contains in paragraph 1, the
              name and the description of the Applicant. Paragraph 2 of the same
              statement contains the reliefs sought by the Applicant while
              paragraph 3 sets out in sub paragraphs (1) and (2) provides for
              the grounds upon which the reliefs are sought, which include a
              statement of facts relating to the transaction that warranted this
              suit. The Applicant also filed a 12 paragraphs Affidavit which is
              properly deposed to.
            </p>
            <p>
              My Lord, we propose to argue the motion by raising certain
              fundamental issues upon which we shall anchor our submissions. The
              issues are now raised as follows:
            </p>
            <ol>
              <li>
                Whether this Application is brought within time or whether the
                Applicant’s claim of a likelihood of an infringement of his
                Fundamental Rights falls within those rights set out in Chapter
                IV of the 1999 Constitution, as amended, as to warrant bringing
                this Application under the Fundamental Rights Rules(supra)
              </li>
              <li>
                Whether the Court can grant ancillary reliefs connected to the
                facts of the alleged violation of the Applicant’s Fundamental
                Rights.
              </li>
              <li>
                Whether it is proper in law for the Respondents to interfere
                with the Applicant’s Fundamental rights.
              </li>
              <li>
                Whether the actions of the Respondents as stated by the
                Applicant in the statement of facts constitute an infringement
                of the Applicant’s fundamental rights for which the Applicant is
                entitled to seek for redress under the Rules(supra)
              </li>
              <li>
                Whether this Court has the Jurisdiction to entertain this suit
                where some of the Respondents are Police officers or supposed
                agents of the Federal Government.
              </li>
              <li>
                Whether the Court can grant Monetary Relief in an application
                for redress of the infringement of Fundamental Rights.
              </li>
            </ol>
            <h6>ISSUE NO. 1</h6>
            <p>
              On the issue as to whether the application was brought within time
              and whether the Applicant’s claim of the infringement falls within
              the rights set out in Chapter IV of the 1999 Constitution of
              Nigeria as amended. We submit that the Applicant stated that the
              infringement by the Respondents started as was stated in paragraph
              1 to V of the grounds upon which the reliefs are sought that the
              respondents who arrested and continuously detaining the Applicant
              did so for no justifiable reason. We also submitted that the
              Applicant stated that on the
              {arrested_on}, the Respondents arrested him and detained him for
              than three months for no just cause and without preferring any
              charge against him. My Lord the first arm of issue No1 as raised
              by the Applicant is whether this application was brought in time.
              In answer, we submit that the application was brought within time
              as stipulated under the Rules (Supra). The Law is that an
              Application may be brought at any time during or after the
              discontinuation of the infringement. This Application was filed
              within time. We refer My Lord to see the case of Uzoukwu vs.
              Ezeonu II (1991) 8 NWLR (pt 200) at page 700.
            </p>
            <p>
              On the second arm of this Issue as raised by the Applicant, we
              submit that the claim of infringement by the Applicant conforms
              with those rights under Chapter IV of the 1999 Constitution as
              amended for which an Application of this nature can be made under
              the Rules (supra).
            </p>
            <p>
              My Lord, the Applicant is complaining of infringement of his
              fundamental rights of right to dignity of human person, right to
              his liberty against detention, torture and inhuman and degrading
              treatment, right to privacy of home and as provided for by section
              34(1) (a), 35(1)(3), (4), 37 of the Constitution (supra). We
              submit that the claim against the Respondents for the infringement
              or likelihood of an infringement of the Applicant’s fundamental
              rights forms the principal reason or claim in this Application. We
              refer My Lord to see reliefs (1), (2),, and (3) of the motion on
              notice. We submit that these fall within the specifications of
              those rights provided for under Chapter IV of the Constitution
              (supra). We submit also that base on the assertion in the
              principal claim; the Court can make inquiry and order on other
              ancillary reliefs sought. We shall come to the issue of
              jurisdiction later.
            </p>
            <p>
              We submit that this application is competent as the reliefs sought
              are similar to and are directly connected to those rights
              protected under Chapter IV of the Constitution (supra). We also
              submit that the Application has clearly established malice and
              intention to cause the Applicant pain and humiliation as well as
              pushing him.
            </p>
            <p>
              We also state that where a breach of likely breach of the
              provision of Chapter IV of the Constitution (supra) forms part of
              the principal claims then the provisions of the Rules (supra) can
              be invoked against the ancillary claims. We urge My Lord to see
              Din vs. A.G Federation (1988) 4 NWLR (pt 87) 147 cited in Dongtoe
              vs. Civil Service Commission (2001) 1 SCM page 59 at 69.
            </p>
            <h6>ISSUE NO. 2 </h6>
            <p>
              On the issue as to whether the Court can grant ancillary reliefs
              connected to the facts of the alleged violation or likelihood of a
              violation of the Applicant’s fundamental rights, we submit that by
              the combine effects of Sections 35(6) and 46 of the 1999
              Constitution as amended and under the enabling laws of this
              courts, the court can grant ancillary reliefs in a fundamental
              rights application provided the principal claim is within those
              rights specified under Chapter IV of the Constitution (supra).
            </p>
            <p>
              We submit that the arrest and threat to re-arrest the Applicant,
              even when it is manifestly clear that the Applicant is innocent
              and committed no crime over an obvious and vindictive conduct of
              the complainant so as to subject him to humiliation and
              dehumanization and to deprive him of right to run his business, is
              wrong and that the constitution of the country (supra) as amended
              empowers the Applicant to seek remedy vide this action. we submit
              that apart from the arrest of the Applicant by the Respondents at
              the behest of the complainant, the conduct of the Respondents has
              instilled fear into the Applicant, as he has became weary of his
              freedom and suffered pain and pecuniary loss and is living under
              imminent fear and his detention without trial has complicated his
              business as free citizen and which in turn endangers his means of
              livelihood.
            </p>
            <h6>ISSUE NO. 3</h6>
            <p>
              On the issue as to whether it is proper in law for the Respondents
              to interfere with the fundamental rights of the Applicant, we
              submit that our argument tn issue No. 1 above has covered our
              submission here. However, we add that the intervention of the
              Legislature in enacting the Fundamental Rights (Enforcement
              Procedure) Rules (supra) is to provide for a mechanism to redress
              any infringement of those rights provided for under Chapter IV of
              the Constitution (supra). We further submit that if My Lord looks
              at the entire grounds upon which this application is brought, my
              Lord will see that it is the complainant that sets the machinery
              of the Respondents rolling against the Applicant. We submit that
              the words of Sections 34, 35, 37 and 46 of the Constitution
              (supra) are very clear and unambiguous as the same in clear terms
              set out to protect the Applicant against the infringement of this
              rights against the conduct of the Respondents in this matter. We
              urge My Lord to give effect to the ordinary meaning of the words
              in the above relevant sub-sections of the sections 34, 35, 37 and
              46 of the 1999 Constitution (supra) and to hold that the
              Respondents have no rights or any legal basis to interfere with
              the fundamental rights aforesaid of the Applicant.
            </p>
            <h6>ISSUE NO. 4</h6>
            <p>
              On issue No. 4 raised by the Applicant, we submit also that our
              submission in issue 1 and No. 3 above have adequately covered our
              arguments here and we adopt the same. However, we further submit
              that the action of the respondents which is the arrest, abduction,
              detention and dehumanization of the Applicant is contrary to the
              general provisions of sections 34, 35 and 47 of the Constitution
              (supra) and under the Rules (supra). We urge My Lord to hold so.
            </p>
            <h6>ISSUE NO. 5</h6>
            <p>
              On issue as to whether the Court has Jurisdiction to entertain
              this application considering the status of all the Respondents, we
              submit that the enforcement of fundamental rights is a special
              proceeding which derives its validity from Constitutional
              provisions and under the Rules (supra) made or the Constitution
              (supra). We refer My Lord to see all Respondents are not Federal
              agents within the meaning of the provisions of Section 251(1)(g)
              and (r) of the Constitution (supra).
            </p>
            <h6>ISSUE NO. 6</h6>
            <p>
              On the issue whether this Court can assess and award damages to
              the Applicant in this application, we submit that by the
              provisions of section 46(2) of the 1999 Constitution (supra) as
              amended, and under the enabling laws of this court, the court can
              assess and make awards of monetary compensations by way of damages
              to the Applicant. We submit that the measure of damages and other
              considerations thereto under this proceeding is not specie but one
              and the same as the court will consider in other cases.
            </p>
            <p>
              We urge my Lord to consider the circumstances of the Applicant,
              who is a business man and the violation of his fundamental rights
              and has been forced to live in fear and apprehension, and loss of
              income from long detention. We submit that the trauma of living in
              fear in detention of a police cell, torture and dehumanizing
              condition fall within the scope of what is contemplate under
              section 46(2) of the Constitution (supra) and we urge My Lord to
              so hold.
            </p>
            <p>
              We urge My Lord to see generally the Affidavit in support of the
              Motion which shows the Applicant did not Commit any offence
              especially as alleged by the respondents, who despite efforts to
              free the Applicant are in a rather primitive and mundane manner
              still detaining him with the aim to infringe on the Applicant’s
              fundamental rights.
            </p>
            <p>
              We submit that the Applicant has not just suffered trauma and
              humiliation but also has been subjected to heavy pecuniary loss as
              he has lost his freedom. We submit that the Applicant is entitled
              under the Law for monetary compensation by way of damages and we
              urge My Lord to grant the relief on the motion paper in favour of
              the Applicant.
            </p>
            <p>
              In conclusion, we submit generally that the Applicant through the
              processes filed in this proceeding particularly the statement,
              verifying Affidavits and exhibits filed has established his case
              against the Respondents. We also submit that the Respondents will
              not be able to offer any defence or controvert any of the
              depositions in the statement of facts and various affidavits of
              the Applicant.
            </p>
            <p>
              We urge My Lord to consider generally the following cases: Egbuonu
              vs. Borno Radio Television Corporation (1993) 4 NWLR (pt 285) 13,
              nagoruwa vs. IGP (1993) 5 NWLR (pt 193) 593, Obisi vs. Nigeria
              Navy 1 FHCLR 609, Jack vs. Unlargric Makurdi (2004) 14 WRN 91 and
              Oladele vs. N.A (2004) 36 WRN 68.
            </p>
            <p>
              We urge My Lord to enter Judgement in favour of the Applicant in
              the terms of the claims in the motion paper. We move in terms of
              our motion paper. May it please the honourable court.
            </p>
            <h6>LIST OF CASES CITED:</h6>
            <ol>
              <li>Din vs. A.G Federation (1988) 4 NWLR (pt 87) 147 </li>
              <li>
                Dongtoe vs. Civil Service Commission (2001) 1 SCM page 59 at 69.
              </li>
              <li>Uzoukwu vs. Ezeonu II (1991) 8 NWLR (pt 200) at page 700.</li>
              <li>
                Egbuonu vs. Borno Radio Television Corporation (1993) 4 NWLR (pt
                285) 13,
              </li>
              <li>nagoruwa vs. IGP (1993) 5 NWLR (pt 193) 593, </li>
              <li>Obisi vs. Nigeria Navy 1 FHCLR 609, </li>
              <li>Jack vs. Unlargric Makurdi (2004) 14 WRN 91</li>
              <li>Oladele vs. N.A (2004) 36 WRN 68.</li>
            </ol>
          </div>
        </div>
        <Signature applicant={applicant} />
      </div>

      <div className="page">
        <Heading applicant={applicant} />
        <div className="body">
          <h6 className="text-center">
            AFFIDAVIT IN SUPPORT OF THIS APPLICATION
          </h6>
          <div>
            I, {affidavit.title} {affidavit.name}, {affidavit.gender}, adult,{" "}
            {affidavit.religion}, a{affidavit.occupation}, now residing at{" "}
            {affidavit.address}, citizen of the Federal Republic of Nigeria, do
            make Oauth and state as follows:
            <ol>
              <li>
                That I am the {affidavit.rel} of the Accused/Applicant in this
                application by virtue of which I am conversant with the facts
                leading to the detention of the applicant at the
                {station}, {state_arrest} State, Nigeria.
              </li>
              <li>
                That I have the authority and consent of the Accused/Applicant
                to depose to this oath.
              </li>
              <li>
                That the Applicant told me in the {arrested_on} at the ­­­
                {station}, {state_arrest} State, Nigeria and I verily believed
                him.
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
                That since the {arrested_on}, when the Applicant was arrested by
                the Nigerian Police Force till the date of the filing of this
                Application, it is more than One Month and the Applicant has not
                either been charged or released by the Nigerian Police Force.
              </li>
              <li>
                That I know as a fact that from the {arrested_on}, when the
                Applicant was arrested till date, the Nigeria Police Force
                should have concluded investigation, if any fact exist of any
                crime at all.
              </li>
              <li>
                That the grant of this application will not prejudice the
                respondent as the applicant is in no way involved in the crime
                for which he is alleged to have committed.
              </li>
              <li>
                That the Applicant is a responsible citizen of the Federal
                Republic of Nigeria.
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
          <div className="text-right my-4">
            <div className="text-center">
              <div>____________________________</div>
              <h6>DEPONENT</h6>
            </div>
          </div>
          <div>SWORN TO at the High Court Registry, {state_arrest}</div>
          <div className="text-center my-3">   BEFORE ME:</div>
          <div className="text-center mt-5">
            <div>_________________________________________________________</div>
            <h6>COMMISSIONER FOR OATHS</h6>
          </div>
        </div>
        <Signature applicant={applicant} />
      </div>
    </Fragment>
  );
};

CaseBComp.propTypes = {
  applicant: PropTypes.any,
  affidavit: PropTypes.any,
};

export default CaseBComp;
