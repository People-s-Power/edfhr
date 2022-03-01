import { SelectedUserAtom } from "atoms/UserAtom";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AccountTypeEnum, IUser, StaffRoleEnum } from "types/Applicant.types";

const UserInfoComp = (): JSX.Element => {
  const [user, setUser] = useRecoilState<Partial<IUser>>(SelectedUserAtom);
  const [editAccountType, setEditAccountType] = useState(false);
  const [editRole, setEditRole] = useState(false);

  const changeAccount = async () => {
    try {
      await axios.put("/user/changeaccount", {
        user_id: user?.id,
        accountType: user?.accountType,
      });
      setEditAccountType(false);
    } catch (err) {
      console.log(err);
    }
  };

  const changeRole = async () => {
    try {
      await axios.put("/user/changerole", {
        user_id: user?.id,
        role: user?.role,
      });

      setEditRole(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleActivate = async () => {
    try {
      const { data } = await axios.post("/user/activate", { id: user?.id });
      setUser({ ...user, isActive: data.isActive });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async () => {
    const confirmed = confirm("do you want to delete this user?");
    if (confirmed) {
      try {
        const { data } = await axios.delete(`/user/single/${user?.id}`);
        console.log(data);
      } catch (error) {
        const err: any = error;
        console.log({ error });
        alert(err?.response?.data?.message);
      }
    }
  };
  return (
    <Wrapper>
      <div className="mb-3 info">
        <div className="border border-primary ">
          <div className="user-basic-info">
            <h6 className="text-center bg-sky fw-bold py-3">Basic Info</h6>
            <div className="container">
              <div className="row">
                <p className="col">First Name</p>
                <p className="col">{user?.firstName}</p>
              </div>
              <div className="row">
                <p className="col">Last Name</p>
                <p className="col">{user?.lastName}</p>
              </div>
              <div className="row">
                <p className="col">Email</p>
                <p className="col">{user?.email}</p>
              </div>
            </div>
            <h6 className="text-center bg-sky fw-bold py-3">Account Information</h6>
            <div className="container">
              <div className="row">
                <p className="col">Account Type</p>
                <div className="col">
                  {editAccountType ? (
                    <div className="d-flex justify-content-between">
                      <select className="form-control" value={user?.accountType} onChange={(e) => setUser({ ...user, accountType: e.target.value as AccountTypeEnum })}>
                        <option>{AccountTypeEnum.Campaigner}</option>
                        <option>{AccountTypeEnum.Contact}</option>
                        <option>{AccountTypeEnum.Staff}</option>
                      </select>
                      <button className="btn btn-sm py-0" onClick={changeAccount}>
                        <i className="fas fa-save"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <span> {user.accountType}</span>{" "}
                      <button className="btn btn-sm py-0" onClick={() => setEditAccountType(true)}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="row">
                <p className="col">Role</p>
                <div className="col">
                  {editRole ? (
                    <div className="d-flex justify-content-between">
                      <select className="form-control" value={user?.role} onChange={(e) => setUser({ ...user, role: e.target.value as StaffRoleEnum })}>
                        <option>{StaffRoleEnum.User}</option>
                        <option>{StaffRoleEnum.Draft}</option>
                        <option>{StaffRoleEnum.Rep}</option>
                        <option>{StaffRoleEnum.Lawyer}</option>
                        <option>{StaffRoleEnum.LegalWorld}</option>
                        <option>{StaffRoleEnum.Suppervisor}</option>
                        <option>{StaffRoleEnum.Admin}</option>
                      </select>
                      <button className="btn btn-sm py-0" onClick={changeRole}>
                        <i className="fas fa-save"></i>
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <span> {user.role}</span>{" "}
                      <button className="btn btn-sm py-0" onClick={() => setEditRole(true)}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile ">
        <div className="border border-primary bg-sky inner">
          <div className="image">
            <img src={user?.image} alt="" className="image-fit" />
          </div>
          <div className="container" style={{ fontSize: "0.8rem" }}>
            <small className="text-muted">Last Login</small>
            <small className="d-block fst-italic">
              {/* May 4 2021 12:25PM */}
              {moment(user?.lastSeen).format("MMMM Do YYYY, h:mm:ss a")}
            </small>
            <small>{user?.state}</small>
            <div className="my-2 d-flex justify-content-between ">
              <button className="btn btn-sm btn-warning" onClick={handleActivate}>
                {user?.isActive ? "Block" : "Activate"} {user?.firstName}{" "}
              </button>
              <button className="btn btn-sm btn-danger" onClick={deleteUser}>
                Delete {user?.firstName}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserInfoComp;

const Wrapper = styled.div`
  .image-fit {
    width: 100%;
    height: 15rem;
    object-fit: contain;
    /* max-height: 15rem; */
  }
  .profile {
    .inner {
      display: flex;
      flex-direction: column;
      .image {
        img {
          width: 100%;
          object-fit: cover;
          object-position: top;
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    display: grid;
    grid-template-columns: auto 20rem;
    column-gap: 1rem;
    .profile {
      .inner {
        display: flex;
        flex-direction: column;
        .image {
          img {
            width: 100%;
            object-fit: cover;
            object-position: top;
          }
        }
      }
    }
  }
`;
