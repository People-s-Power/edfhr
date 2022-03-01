import { initializeApollo } from "apollo";
import { NextPageContext } from "next";
import { ApplicantProps } from "types/Applicant_types";
import { GET_APPLICANT } from "./queries/applicantQuery";

export const getApplicant = async (
  ctx: NextPageContext
): Promise<ApplicantProps> => {
  const apollo = initializeApollo(ctx);
  try {
    const { data } = await apollo.query({
      query: GET_APPLICANT,
      variables: { _id: ctx?.query?._id },
    });

    return data.getApplicant;
  } catch (error) {
    console.log(error);
  }
};
