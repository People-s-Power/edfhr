import PropTypes from "prop-types";
import React, { ReactNode } from "react";

interface AuthLayoutI {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutI> = ({ children }) => {
  return (
    <div className="login">
      <div className="container-fluid">
        <div className="left">
          {/* <a href="/" className="mb-3">
            <LogoComp />
          </a> */}
          <img src="/images/login-bg.svg" alt="" />
          <div className="lead-text text-white lead  ">
            A few more clicks to
            <br />
            sign up to your account.
          </div>
          <div className="text-white mt-3 fs-2">
            Administrative platform of EDFHR
          </div>
        </div>
        <div className="children right ">
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

AuthLayout.propTypes = {
  children: PropTypes.node,
};

// const Wrapper = styled.div`
//   height: 100vmin;
//   .image {
//     background: url("/images/bg-login-page.svg");
//     height: inherit;
//   }
// `;
