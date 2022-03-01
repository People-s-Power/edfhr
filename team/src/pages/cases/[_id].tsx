import { initializeApollo } from "apollo";
import { SHOW_DRAFT } from "apollo/queries/applicantQuery";
import CaseAComp from "components/Draft/caseTypeComp/CaseAComp";
import CaseB from "components/Draft/caseTypeComp/caseB";
import CaseCComp from "components/Draft/caseTypeComp/CaseC";
import CaseDComp from "components/Draft/caseTypeComp/CaseDComp";
import { NextPageContext } from "next";
import PropTypes from "prop-types";
import React from "react";
import { Loader } from "rsuite";
import { AffidavitProps, ApplicantProps } from "types/Applicant_types";
import router from "next/router";

const CaseTypePage = ({
  applicant,
  affidavit,
}: {
  applicant: ApplicantProps;
  affidavit: AffidavitProps;
}): JSX.Element => {
  if (!applicant) {
    alert("Please update the Affidavit Record");
    router.push("/home");
  }
  if (!applicant) return <Loader content="processing..." />;
  const { caseType } = applicant;

  return (
    <div id="draft-page">
      {caseType === "B" && (
        <CaseB applicant={applicant} affidavit={affidavit} />
      )}
      {caseType === "C" && (
        <CaseCComp applicant={applicant} affidavit={affidavit} />
      )}
      {caseType === "D" && (
        <CaseDComp applicant={applicant} affidavit={affidavit} />
      )}
      {caseType === "A" && <CaseAComp applicant={applicant} />}
    </div>
  );
};

export default CaseTypePage;

CaseTypePage.propTypes = {
  applicant: PropTypes.object,
  affidavit: PropTypes.object,
};

CaseTypePage.getInitialProps = async (ctx: NextPageContext) => {
  const apollo = initializeApollo(ctx, null);

  try {
    const { data } = await apollo.query({
      query: SHOW_DRAFT,
      variables: { _id: ctx?.query._id },
    });
    const { affidavit, ...applicant } = data.showDraft;

    return {
      applicant,
      affidavit,
    };
  } catch (error) {
    console.log(error);

    return {
      applicant: null,
    };
  }
};
