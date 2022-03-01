import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import React, { useState } from "react";

export const CustomError = (
  error: { networkError: any; graphQLErrors: any[] } | any
): void => {
  if (error?.networkError) {
    alert("NETWORK ERROR");
  }
  if (error?.graphQLErrors) {
    // Your account is pending activation
    error.graphQLErrors.map((err: { message: any }) => alert(err.message));
  }
};

interface LoginInterface {
  onSwitch(): void;
}

const SIGNUP = gql`
  mutation($input: SignupInput) {
    signup(input: $input) {
      _id
      email
      name
    }
  }
`;

const RegisterComp: React.FC<LoginInterface> = ({ onSwitch }) => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
    password2: "",
  });

  const [signup, { loading }] = useMutation(SIGNUP);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { password2, ...rest } = info;
    if (info.password !== password2) return alert("Passwords don't match");
    try {
      const { data } = await signup({ variables: { input: rest } });
      alert("Registeration Successful");
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error?.networkError) {
        alert("NETWORK ERROR");
      }
      if (error?.graphQLErrors) {
        error.graphQLErrors.map((err: { message: any }) => alert(err.message));
      }
    }
  };
  return (
    <div className="form-wrapper">
      {/* <div className="login-logo"></div> */}
      <h4 className="login-heading mb-3">Register</h4>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control login__input"
            onChange={handleChange}
            placeholder="Enter Full Names"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control login__input"
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control login__input"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password2"
            className="form-control login__input"
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="form-group">
          <select
            name="position"
            className="form-control login__input"
            onChange={handleChange}
            required
          >
            <option value="">Select Position</option>
            <option>Rep</option>
            <option>Lawyer</option>
            <option>Others</option>
          </select>
        </div>
        <div className="mt-3 text-center">
          <button
            disabled={loading}
            className="btn btn-outline-info btn-sm mr-2"
          >
            {loading ? "Processing..." : "Register"}
          </button>
        </div>
        <div className="c-hand mt-2" onClick={onSwitch}>
          Already registered? Login
        </div>
      </form>
    </div>
  );
};

export default RegisterComp;

RegisterComp.propTypes = {
  onSwitch: PropTypes.func,
};
