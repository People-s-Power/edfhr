import { useQuery } from "@apollo/client";
import { GET_USER } from "apollo/queries/userQuery";
import { SelectedUserAtom } from "atoms/UserAtom";
import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Loader } from "rsuite";
import { IUser, StaffRoleEnum } from "types/Applicant.types";
import useQueryParam from "utils/useQueryParam";
import SuppervisorsRepTable from "./SuppervisorsRepTable";
import UserApplicantsComp from "./UserApplicants";
import UserInfoComp from "./UserInfoComp";

const UserComp = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useRecoilState(SelectedUserAtom);
  const query = useQueryParam().get("tab") || "Basic Info";
  const router = useHistory();

  const { loading } = useQuery(GET_USER, {
    variables: { id },
    onCompleted: (data) => {
      if (data?.getUser?.id) {
        setUser(data.getUser);
      } else {
        setUser(null as unknown as Partial<IUser>);
      }
    },
    onError: (err) => console.log(err.message),
  });

  if (loading) return <Loader content="Loading..." />;

  return (
    <div>
      <ul className="nav nav-tabs">
        {tabItems
          ?.filter((tab) => {
            if (user?.role === StaffRoleEnum.Suppervisor) {
              return tab;
            } else {
              return tab !== "Reps";
            }
          })
          .map((tab, i) => (
            <li className="nav-item" key={i}>
              <button disabled={Boolean(!user)} className={`nav-link c-hand text-decoration-none link-dark ${query === tab ? "active" : ""}`} aria-current="page" onClick={() => router.push(`/users/${id}?tab=${tab}`)}>
                {tab}
              </button>
            </li>
          ))}
      </ul>
      {!user ? (
        <div className="mt-3">
          <p className="text-center">Select a user</p>
        </div>
      ) : (
        <div className="mt-3 container">
          {query === "Basic Info" && <UserInfoComp />}
          {query === "Contacts" && <UserApplicantsComp />}
          {query === "Reps" && <SuppervisorsRepTable />}
        </div>
      )}
    </div>
  );
};

export default UserComp;

const tabItems = ["Basic Info", "Contacts", "Reps"];
