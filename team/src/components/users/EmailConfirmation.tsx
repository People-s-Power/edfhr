import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL, VERIFY_TOKEN } from "apollo/queries/userQuery";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Loader } from "rsuite";
import { CustomError } from "./RegisterComp";

interface EmailI {
  onSwitch(): void;
}

const EmailConfirmationComp: React.FC<EmailI> = ({ onSwitch }): JSX.Element => {
  const [token, setToken] = useState("");
  const [verify, { loading }] = useMutation(VERIFY_TOKEN);
  const [view, setView] = useState("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const { data } = await verify({ variables: { token } });
      console.log(data);
      alert("Email Verified, You can now Login");
      onSwitch();
    } catch (error) {
      console.log(error);
      CustomError(error);
    }
  };

  return (
    <div className="form-wrapper">
      <a onClick={onSwitch} className="d-block c-hand mb-3">
        <i className="fas fa-arrow-left mr-2"> </i>
        Home
      </a>
      {view !== "token" ? (
        <EmailVerify onSwitch={() => setView("token")} />
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="form-label font-weight-bold">
            Enter the Verification Token sent to your email
          </label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Token"
              onChange={(e) => setToken(e.target.value)}
            />
            <button disabled={loading} className="btn btn-info  rounded-0">
              {loading ? <Loader content="processing..." /> : "Verify"}
            </button>
          </div>
          <a
            className="d-block mt-3 text-center c-hand"
            onClick={() => setView("email")}
          >
            Click to resend token
          </a>
        </form>
      )}
    </div>
  );
};

export default EmailConfirmationComp;

EmailConfirmationComp.propTypes = {
  onSwitch: PropTypes.func,
};

const EmailVerify = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [verifyEmail, { loading }] = useMutation(VERIFY_EMAIL);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verifyEmail({ variables: { email } });
      alert("New Token, sent to your email");
      onSwitch();
    } catch (error) {
      CustomError(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label font-weight-bold">
        Enter your registered email
      </label>
      <div className="d-flex">
        <input
          type="email"
          className="form-control rounded-0"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button disabled={loading} className="btn btn-primary  rounded-0">
          {loading ? <Loader content="processing..." /> : "Resend"}
        </button>
      </div>
    </form>
  );
};

EmailVerify.propTypes = {
  onSwitch: PropTypes.func,
};
