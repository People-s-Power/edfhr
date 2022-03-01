import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import cookie from "js-cookie";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUser } from "types/Applicant.types";
import { TOKEN_NAME } from "utils/constants";

const HeaderComp = (): JSX.Element => {
  const user = useRecoilValue<Partial<IUser>>(UserAtom);

  const logout = async () => {
    try {
      await axios.get("/auth/logout", { withCredentials: true });
      cookie.remove(TOKEN_NAME);
      window.location.href = "/";
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Header>
      <nav className="navbar navbar-dark bg-primary ">
        <div className="container-fluid justify-content-end">
          <ul className="nav ">
            <li className="nav-item  dropdown  ">
              <a className="dropdown-toggle c-hand text-decoration-none d-flex align-items-baseline text-light " data-bs-toggle="dropdown">
                <div className="image">
                  <img src={user?.image} alt="" />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div className="mx-2 ">{user?.firstName}</div>
                  <small className="fs-small mt-0 fw-bold">{user?.role}</small>
                </div>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item c-hand" onClick={logout}>
                    Sign Out
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </Header>
  );
};

export default HeaderComp;

const Header = styled.header`
  li {
    margin: 0 0.5rem;
  }
  .image {
    width: 1.7rem;

    img {
      border: 2px solid #fff;
      width: 100%;
      height: 1.7rem;
      border-radius: 100%;
    }
  }
`;
