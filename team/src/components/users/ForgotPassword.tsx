import React from "react";
import PropTypes from "prop-types";

interface EmailI {
  onSwitch(): void;
}
const ForgotPasswordComp: React.FC<EmailI> = ({ onSwitch }): JSX.Element => {
  return (
    <div>
      <form>
        <label className="form-label font-weight-bold">Enter Your Email</label>
        <div className="d-flex">
          <input type="text" className="form-control rounded-0" />
          <button className="btn btn-info  rounded-0">Verify</button>
        </div>

        <a onClick={onSwitch} className="d-block c-hand text-center">
          Home
        </a>
      </form>
    </div>
  );
};

export default ForgotPasswordComp;

ForgotPasswordComp.propTypes = {
  onSwitch: PropTypes.func,
};
