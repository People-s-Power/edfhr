import { initializeApollo } from "apollo";
import { AUTH } from "apollo/queries/userQuery";
import AuthLayout from "components/AuthLayout";
import EmailConfirmationComp from "components/users/EmailConfirmation";
import ForgotPasswordComp from "components/users/ForgotPassword";
import LoginComp from "components/users/LoginComp";
import RegisterComp from "components/users/RegisterComp";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import { UserProps } from "types/Applicant_types";

const HomePage = ({ user }: { user: UserProps }): JSX.Element => {
  const [view, setView] = useState("Login");

  useEffect(() => {
    if (user) {
      window.location.href = "/home";
    }
  }, [user]);
  return (
    <AuthLayout>
      <div>
        {view === "Login" && <LoginComp onSwitch={(txt) => setView(txt)} />}
        {view === "Register" && (
          <RegisterComp onSwitch={() => setView("Login")} />
        )}
        {view === "Verify" && (
          <EmailConfirmationComp onSwitch={() => setView("Login")} />
        )}
        {view === "ForgotPassword" && (
          <ForgotPasswordComp onSwitch={() => setView("Login")} />
        )}
      </div>
    </AuthLayout>
  );
};

export default HomePage;

export const getServerSideProps = async (
  ctx: NextPageContext
): Promise<{ props: { user: UserProps } }> => {
  const apollo = initializeApollo(null, ctx);
  try {
    const { data } = await apollo.query({
      query: AUTH,
    });

    // const user = data.auth;
    return {
      props: {
        user: data.auth,
      },
    };
  } catch (error) {
    // console.log(error);
    if (error?.graphQLErrors[0]) {
      console.log(error?.message);
    }
    return {
      props: {
        user: null,
      },
    };
  }
};
