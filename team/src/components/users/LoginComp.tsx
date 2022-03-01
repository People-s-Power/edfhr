import { gql, useMutation } from "@apollo/client";
import { UserAtom } from "atom/UserAtom";
import jscookie from "js-cookie";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { Loader } from "rsuite";
import { TOKEN_NAME } from "utils/cookieUtils";
import { CustomError } from "./RegisterComp";

interface LoginInterface {
  onSwitch(e?: string): void;
}

const LOGIN = gql`
  mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

const LoginComp: React.FC<LoginInterface> = ({ onSwitch }) => {
  const [login, { loading }] = useMutation(LOGIN);
  // const { data, loading } = useSubscription(LOGGED_IN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(UserAtom);

  // console.log(data, loading);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: { email, password },
      });
      // console.log(data);

      jscookie.set(TOKEN_NAME, data.login.token, {
        secure: process.env.NODE_ENV === "production",
        // expires: dayjs().add(3, "hour").toDate(),
        sameSite: "lax",
        path: "/",
      });
      setUser(data.login.user);
      alert("Welcome");
      window.location.href = "/home";
      // router.reload();
    } catch (error) {
      CustomError(error);
      if (error?.graphQLErrors) {
        // Your account is pending activation
        if (
          error?.graphQLErrors[0]?.message ===
          "Your account is pending activation"
        ) {
          onSwitch("Verify");
        }
      }
    }
  };
  return (
    <div className="form-wrapper">
      <div className="login-logo"></div>
      <h4 className="login-heading mb-3">Login</h4>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control login__input"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control login__input"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="mt-3 text-center">
          <button className="btn btn-info btn-sm mr-2" disabled={loading}>
            {loading ? <Loader content="Processing" /> : "Login"}
          </button>

          <a
            className="c-hand mt-2 d-block"
            onClick={() => onSwitch("ForgotPassword")}
          >
            Forgot Password ?
          </a>
          <a
            className="c-hand mt-2 d-block"
            onClick={() => onSwitch("Register")}
          >
            Don't have an account yet? Register here
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginComp;

LoginComp.propTypes = {
  onSwitch: PropTypes.func,
};
