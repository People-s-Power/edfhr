import { useQuery } from "@apollo/client";
import { SHOW_DRAFT } from "apollo/queries/applicantQuery";
import CaseAComp from "components/Drafts/CaseA";
import CaseB from "components/Drafts/CaseB";
import CaseCComp from "components/Drafts/CaseC";
import CaseDComp from "components/Drafts/CaseD";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IAffidavit, IApplicant } from "types/Applicant.types";

const DraftPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [applicant, setApplicant] = useState<IApplicant>();
  const [affidavit, setAffidavit] = useState<IAffidavit>();
  const { loading, error } = useQuery(SHOW_DRAFT, {
    variables: { id },
    onCompleted: (data) => {
      if (data?.showDraft) {
        const { affidavit, ...applicant } = data?.showDraft;
        setApplicant(applicant);
        setAffidavit(affidavit);
      }
    },
  });

  if (loading) return <p className="mt-3">loading...</p>;
  if (error) {
    console.log(error);
    return <p>Something went wrong</p>;
  }

  return (
    <div id="draft-page">
      {applicant?.caseType === "B" && <CaseB applicant={applicant} affidavit={affidavit} />}
      {applicant?.caseType === "C" && <CaseCComp applicant={applicant} affidavit={affidavit} />}
      {applicant?.caseType === "D" && <CaseDComp applicant={applicant} affidavit={affidavit} />}
      {applicant?.caseType === "A" && <CaseAComp applicant={applicant} />}
    </div>
  );
};

export default DraftPage;
