import LoginComp from "components/LoginComp";
import React from "react";

const LoginPage = (): JSX.Element => {
  return (
    <div className="d-flex flex-column justify-content-center container" style={{ minHeight: "70vh" }}>
      <LoginComp />
    </div>
  );
};

export default LoginPage;
