import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_LAWYERS } from "apollo/queries/userQuery";
import { UserAtom } from "atom/UserAtom";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import { Avatar } from "rsuite";
import { UserProps } from "types/Applicant_types";
import ChangePositionModal, { AssignUserComp } from "./ChangePosition";
import { CustomError } from "./RegisterComp";

// const LawyerLawyerCardComp = ({ search }: { search: string }): JSX.Element => {
//   const [users, setUsers] = useState([]);

//   useQuery(GET_LAWYERS, {
//     variables: { search },
//     onCompleted: (data) => setUsers(data.getLawyers),
//     onError: (err) => console.log(err),
//   });
//   return (
//     <Fragment>
//       {users.map((user) => (
//         <LawyerCardComp
//           user={user}
//           key={user._id}
//           users={users}
//           setUsers={setUsers}
//         />
//       ))}
//     </Fragment>
//   );
// };

const ACTIVATE_USER = gql`
  mutation($_id: ID) {
    activateUser(_id: $_id)
  }
`;

interface IPage {
  user: UserProps;
  users: UserProps[];
  setUsers(e): void;
}

const LawyerCardComp = ({ user, users, setUsers }: IPage): JSX.Element => {
  const { name, position, applicants, image, isActive, admin } = user;
  const [show, setShow] = useState(false);
  const [showAssignUser, setShowAssignUser] = useState(false);
  const [activateUser] = useMutation(ACTIVATE_USER);

  const handleActivate = async () => {
    try {
      const { data } = await activateUser({ variables: { _id: user._id } });
      const status = data?.activateUser;
      setUsers(
        users.map((u) => (u._id === user._id ? { ...u, isActive: status } : u))
      );
    } catch (error) {
      CustomError(error);
    }
  };

  return (
    <>
      <ChangePositionModal
        show={show}
        onHide={() => setShow(false)}
        user={user}
        users={users}
        setUsers={setUsers}
      />
      <AssignUserComp
        onClose={() => setShowAssignUser(false)}
        show={showAssignUser}
        user_id={user._id}
      />
      <div className="theme-card hover d-flex justify-content-between">
        <div className="left d-flex">
          <Avatar src={image} circle size="md" />
          <div className="ml-2">
            <Link href={`/users/${user._id}`}>
              <a className="text-inherit">
                <h6 className="mb-0">{name} </h6>
              </a>
            </Link>
            <small className="text-muted">
              <i
                className={`fas fa-power-off c-hand ${
                  isActive ? "text-success" : "text-danger"
                } mr-1`}
                onClick={handleActivate}
              ></i>
              {position}
              <i className="fas fa-user ml-3 mr-1"></i>
              {admin?.name} <i className="fas fa-users ml-3 mr-1"></i>
              {applicants?.length}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

LawyerCardComp.propTypes = {
  user: PropTypes.any,
  onActivate: PropTypes.func,
  users: PropTypes.array,
  setUsers: PropTypes.func,
};

export default LawyerCardComp;
