import { gql, useMutation, useQuery } from "@apollo/client";
import { UserAtom } from "atom/UserAtom";
import { CustomError } from "components/users/RegisterComp";
import { ObjectId } from "mongoose";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { Button, Loader, Modal } from "rsuite";
import { ApplicantProps } from "types/Applicant_types";
import { LAWYER, LEGAL_WORLD, REP } from "utils/constants";

const ASSIGN_TO_REP = gql`
  mutation AssignToRep($user_id: ID, $applicant_id: ID) {
    assignToRep(user_id: $user_id, applicant_id: $applicant_id) {
      _id
      name
      amount_paid
      rep {
        name
        _id
      }
      lawyer {
        name
        _id
      }
    }
  }
`;
const ASSIGN_TO_LAWYER = gql`
  mutation AssignToLawyer($user_id: ID, $applicant_id: ID) {
    assignToLawyer(user_id: $user_id, applicant_id: $applicant_id) {
      _id
      name
      amount_paid
      rep {
        name
        _id
      }
      lawyer {
        name
        _id
      }
    }
  }
`;
const GET_USERS = gql`
  query($limit: Int) {
    getUsers(limit: $limit) {
      _id
      name
      position
    }
  }
`;

const GET_LAWYERS = gql`
  {
    getLawyers {
      _id
      name
      position
    }
  }
`;

interface IPage {
  applicant_id: ObjectId;
  show: boolean;
  onClose(): void;
  onSuccess(x: ApplicantProps): void;
}

const AssignContactComp = ({
  applicant_id,
  show,
  onClose,
  onSuccess,
}: IPage): JSX.Element => {
  const authUser = useRecoilValue(UserAtom);
  const [user_id, setUser_id] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [role, setRole] = useState("Rep");
  const [assignToRep, { loading: loadingRep }] = useMutation(ASSIGN_TO_REP);
  const [assignToLawyer, { loading: loadingLawyer }] = useMutation(
    ASSIGN_TO_LAWYER
  );
  useQuery(GET_USERS, {
    variables: { limit: 200 },
    onCompleted: (data) => setAllUsers(data.getUsers),
    onError: (err) => console.log(err),
  });

  // useQuery(GET_LAWYERS, {
  //     variables: { limit: 200 },
  //     onCompleted: (data) => setAllUsers(data.getLawyers),
  //     onError: (err) => console.log(err),
  //   });

  const users = allUsers.map((user) => {
    return {
      value: user._id,
      label: user.name,
      position: user.position,
    };
  });

  const handleRadioChange = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    const { value } = e;
    setUser_id(value);
  };

  const handleAssign = () => {
    if (!role || !user_id || !applicant_id) return;
    const handleLawyer = async () => {
      if (role !== LAWYER) return;
      try {
        const { data } = await assignToLawyer({
          variables: { user_id, applicant_id },
        });
        onSuccess(data.assignToLawyer);
      } catch (error) {
        CustomError(error);
      }
    };
    const handleRep = async () => {
      if (role !== REP) return;
      try {
        const { data } = await assignToRep({
          variables: { user_id, applicant_id },
        });
        onSuccess(data.assignToRep);
      } catch (error) {
        CustomError(error);
      }
    };
    if (role === REP) return handleRep();
    else handleLawyer();
  };

  return (
    <Modal onHide={onClose} show={show} overflow={false} size="sm">
      <Modal.Header>
        <Modal.Title className="text-uppercase text-center text-info">
          Assign contact to
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <Select options={users} onChange={handleChange} />
        </div>
        <div className="form-group d-flex justify-content-between">
          {authUser !== LEGAL_WORLD && (
            <div>
              <input
                type="radio"
                name="Rep"
                value={REP}
                onChange={handleRadioChange}
                className="mr-2"
                defaultChecked={authUser !== LEGAL_WORLD}
              />
              <label htmlFor="Rep">Set as Rep</label>
            </div>
          )}
          <div>
            <input
              type="radio"
              name="Rep"
              value={LAWYER}
              onChange={handleRadioChange}
              className="mr-2"
              defaultChecked={authUser === LEGAL_WORLD}
            />{" "}
            <label htmlFor="Rep">Set as Lawyer</label>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={handleAssign}
          disabled={loadingLawyer || loadingRep}
          className="btn btn-primary"
        >
          {loadingLawyer || loadingRep ? (
            <Loader content="Processing..." />
          ) : (
            "Assign"
          )}
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AssignContactComp.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  applicant_id: PropTypes.string,
};
export default AssignContactComp;

export const LawyersAssignContactComp = ({
  applicant_id,
  show,
  onClose,
  onSuccess,
}: IPage): JSX.Element => {
  const [user_id, setUser_id] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [assignToLawyer, { loading: loadingLawyer }] = useMutation(
    ASSIGN_TO_LAWYER
  );

  useQuery(GET_LAWYERS, {
    onCompleted: (data) => setAllUsers(data.getLawyers),
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
    setUser_id(value);

    // console.log(e);
  };

  const handleAssign = async () => {
    if (!user_id || !applicant_id) return;
    try {
      const { data } = await assignToLawyer({
        variables: { user_id, applicant_id },
      });
      onSuccess(data.assignToLawyer);
    } catch (error) {
      CustomError(error);
    }
  };

  return (
    <Modal onHide={onClose} show={show} overflow={false} size="sm">
      <Modal.Header>
        <Modal.Title className="text-uppercase text-center text-info">
          Assign contact to
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <Select options={users} onChange={handleChange} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={handleAssign}
          disabled={loadingLawyer}
          className="btn btn-primary"
        >
          {loadingLawyer ? <Loader content="Processing..." /> : "Assign"}
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
