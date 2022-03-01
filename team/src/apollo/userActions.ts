import { initializeApollo } from "apollo";
import jscookie from "js-cookie";
import { NextPageContext } from "next";
import { UserProps } from "types/Applicant_types";
import { TOKEN_NAME } from "utils/cookieUtils";
import router from "next/router";
import { AUTH, GET_USER } from "./queries/userQuery";

export const getAuthUser = async (ctx: NextPageContext): Promise<UserProps> => {
  const apollo = initializeApollo({}, ctx);
  try {
    const { data } = await apollo.query({
      query: AUTH,
    });

    return data.auth;
  } catch (error) {
    if (error?.graphQLErrors) {
      error.graphQLErrors.map((err) => console.log(err.message));
    }
    if (process.browser) {
      jscookie.remove(TOKEN_NAME);
      router.push("/");
    }
  }
};

export const getUser = async (ctx: NextPageContext): Promise<UserProps> => {
  const apollo = initializeApollo(ctx);
  try {
    const { data } = await apollo.query({
      variables: { _id: ctx?.query._id },
      query: GET_USER,
    });
    return data.getUser;
  } catch (error) {
    console.log(error);
  }
};
