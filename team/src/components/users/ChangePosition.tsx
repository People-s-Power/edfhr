import { gql, useMutation, useQuery } from "@apollo/client";
import { ASSIGN_USER } from "apollo/queries/userQuery";
import { UserAtom } from "atom/UserAtom";
import { ObjectId } from "mongoose";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { Loader, Modal } from "rsuite";
import { UserProps } from "types/Applicant_types";
// import { Select } from "theme-ui";
import {
  ADMIN,
  DRAFT,
  LAWYER,
  LEGAL_WORLD,
  REP,
  SUPPERVISOR,
} from "utils/constants";
import { CustomError } from "./RegisterComp";

const CHANGE_POSITION = gql`
  mutation($_id: ID!, $position: String!) {
    changePosition(_id: $_id, position: $position) {
      _id
      position
    }
  }
`;

const GET_USERS = gql`
  query {
    getUsers(limit: 500) {
      _id
      name
    }
  }
`;

interface ChangePossitionI {
  show: boolean;
  onHide(): void;
  user: UserProps;
  users: Array<UserProps>;
  setUsers(x: any): void;
}

const ChangePositionModal: React.FC<ChangePossitionI> = ({
  show,
  onHide,
  user,
  users,
  setUsers,
}) => {
  const [position, setPosition] = useState("");
  const [updateUser, { loading }] = useMutation(CHANGE_POSITION);
  // const [users, setUsers] = useRecoilState(UsersAtom);

  const handleChange = ({ value }) => {
    setPosition(value);
  };

  const newPositions = [
    { value: LAWYER, label: "Lawyer" },
    { value: REP, label: "Rep" },
    { value: LEGAL_WORLD, label: "Legal World" },
    { value: ADMIN, label: "Admin" },
    { value: SUPPERVISOR, label: "Suppervisor" },
    { value: DRAFT, label: "Draft" },
  ];

  const changePosition = async () => {
    try {
      const { data } = await updateUser({
        variables: {
          position,
          _id: user._id,
        },
      });
      alert("SUCCESS");
      setUsers(
        users.map((user) =>
          user._id === data.changePosition._id
            ? { ...user, position: data.changePosition.position }
            : user
        )
      );

      onHide();
    } catch (error) {
      CustomError(error);
    }
  };
  return (
    <Modal show={show} onHide={onHide} overflow={false}>
      <Modal.Title className="text-center">Change Position</Modal.Title>
      <Modal.Body>
        <Select
          options={newPositions}
          defaultValue={user.position}
          onChange={handleChange}
        />
        {/* <Select onChange={(e) => setPosition(e.target.value)}>
          <option value="">Choose Position</option>
          {positions.map((position, i) => (
            <option key={i}>{position}</option>
          ))}
        </Select> */}
      </Modal.Body>
      <Modal.Footer>
        {loading ? (
          <button className="btn">processing...</button>
        ) : (
          <Fragment>
            <button className="btn text-danger" onClick={onHide}>
              Cancel
            </button>
            <button className="btn text-success" onClick={changePosition}>
              Change
            </button>
          </Fragment>
        )}
      </Modal.Footer>
    </Modal>
  );
};

ChangePositionModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  user: PropTypes.any,
  users: PropTypes.array,
  setUsers: PropTypes.func,
  // onSuccess: PropTypes.func,
};

export default ChangePositionModal;

interface AssignUserI {
  show: boolean;
  onClose(): void;
  user_id: ObjectId;
}

export const AssignUserComp: React.FC<AssignUserI> = ({
  show,
  onClose,
  user_id,
}) => {
  const [admin_id, setAdmin_id] = useState("");
  const user = useRecoilValue(UserAtom);
  const [allUsers, setAllUsers] = useState([]);
  const [assignUser, { loading }] = useMutation(ASSIGN_USER);

  useQuery(GET_USERS, {
    variables: { limit: 100 },
    onCompleted: (data) => setAllUsers(data?.getUsers),
    onError: (err) => console.log(err),
  });

  const users = allUsers.map((user) => {
    return {
      value: user._id,
      label: user.name,
      position: user.position,
    };
  });

  const handleChange = (e) => {
    const { value } = e;
    setAdmin_id(value);
    // console.log(e);
  };

  const handleAssign = async () => {
    if (!user._id || !admin_id) return;

    try {
      await assignUser({
        variables: {
          user_id,
          admin_id,
        },
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} overflow={false}>
      <Modal.Title className="text-center">Assign to</Modal.Title>
      <Modal.Body>
        {loading ? (
          <Loader center content="loading" />
        ) : (
          <Select options={users} onChange={handleChange} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn text-danger" onClick={() => onClose()}>
          Close
        </button>
        <button className="btn text-success" onClick={handleAssign}>
          Assign
        </button>
      </Modal.Footer>
    </Modal>
  );
};

AssignUserComp.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  user_id: PropTypes.any,
};
