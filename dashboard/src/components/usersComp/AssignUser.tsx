import { UserAtom, UsersAtom } from "atoms/UserAtom";
import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { useRecoilState, useRecoilValue } from "recoil";
import { Loader, Modal } from "rsuite";

interface IProps {
  show: boolean;
  onClose(): void;
  user_id: string;
}

const AssignUser: React.FC<IProps> = ({
  show,
  onClose,
  user_id,
}: IProps): JSX.Element => {
  const [allUsers] = useRecoilState(UsersAtom);
  const user = useRecoilValue(UserAtom);
  const [loading, setLoading] = useState(false);
  const [admin_id, setAdmin_id] = useState("");

  const users = allUsers.map((user) => {
    return {
      value: user._id,
      label: `${user.firstName} ${user?.lastName}`,
      role: user.role,
      firstName: user.firstName,
      lastName: user?.lastName,
    };
  });

  const handleChange = (data: any): void => {
    setAdmin_id(data.value);
  };
  const handleAssign = async () => {
    if (!user._id || !admin_id) return;
    setLoading(true);

    try {
      await axios.post("/user/assign", {
        admin_id,
        user_id,
      });

      onClose();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default AssignUser;
