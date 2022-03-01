import { UsersAtom } from "atoms/UserAtom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRecoilValue } from "recoil";
import { Modal } from "rsuite";
import { AccountTypeEnum, IUser, StaffRoleEnum } from "types/Applicant.types";

interface IProps {
  show: boolean;
  onHide(): void;
  applicant_id: string;
  onSuccess?: (data?: string) => void;
}

interface IData {
  label: string;
  value: string;
  role: string;
  accountType: string;
}
const AssignApplicantComp = ({ show, onHide, applicant_id, onSuccess }: IProps): JSX.Element => {
  const [users, setUsers] = useState<IData[]>();
  const allUsers = useRecoilValue<IUser[]>(UsersAtom);

  // const [allUsers, setAllUsers] = useState<IData[]>();
  const [role, setRole] = useState<StaffRoleEnum>(StaffRoleEnum.Rep);
  const [user_id, setUser_id] = useState<string>("");

  const handleChangeRole = (role: StaffRoleEnum) => {
    const users = allUsers?.filter((user) => user.role === role);
    setRole(role);
    setUsers(users as unknown as IData[]);
  };

  useEffect(() => {
    const newUsers: IData[] = allUsers?.map((user: IUser) => {
      const { id, firstName, lastName, role, accountType } = user;
      return {
        value: id,
        label: `${firstName} ${lastName}`,
        role: role,
        accountType: accountType,
      };
    });
    const all = newUsers.filter((user) => user?.accountType === AccountTypeEnum.Staff);

    const reps = all?.filter((user) => user?.role === StaffRoleEnum.Rep);

    setUsers(reps as unknown as IData[]);
  }, [allUsers]);

  const handleChange = (e: any) => {
    setUser_id(e.value);
  };

  const assignToUser = async () => {
    try {
      const { data } = await axios.post("/applicant/assign", { user_id, applicant_id });
      alert("Success !!!");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onSuccess!(data?.id);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onHide={onHide} overflow={true}>
      <Modal.Title>Assigning to {role}</Modal.Title>
      <Select options={users} onChange={handleChange} />
      <button className="btn btn-sm fs-small" onClick={() => handleChangeRole(role === StaffRoleEnum.Rep ? StaffRoleEnum.Lawyer : StaffRoleEnum.Rep)}>
        Assign to {role === StaffRoleEnum.Rep ? StaffRoleEnum.Lawyer : StaffRoleEnum.Rep} instead
      </button>

      <div className="text-end mt-2">
        <button className="btn text-primary" onClick={assignToUser}>
          Assign
        </button>
      </div>
    </Modal>
  );
};

export default AssignApplicantComp;

interface IAssignProps {
  show: boolean;
  user_id: string;
  onHide(): void;
}

export const AssignUserSuppervisor: React.FC<IAssignProps> = ({ show, onHide, user_id }: IAssignProps) => {
  const users = useRecoilValue<IUser[]>(UsersAtom);
  const [admin_id, setAdmin_id] = useState("");

  const newUsers = users
    ?.filter((user) => user?.role === StaffRoleEnum.Suppervisor)
    ?.map((user: IUser) => {
      const { id, firstName, lastName, role, accountType } = user;
      return {
        value: id,
        label: `${firstName} ${lastName}`,
        role: role,
        accountType: accountType,
      };
    });

  const handleSubmit = async () => {
    const payload = { user_id, admin_id };

    try {
      await axios.post("/user/assign", payload);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} overflow={true}>
      <Select options={newUsers} onChange={(e) => setAdmin_id(e?.value)} />
      <div className="mt-2 text-end">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Assign
        </button>
      </div>
    </Modal>
  );
};
