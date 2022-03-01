import React from "react";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <div id="auth">{children}</div>;
};

export default AuthLayout;
