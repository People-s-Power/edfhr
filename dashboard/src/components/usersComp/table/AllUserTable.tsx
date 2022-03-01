import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import CsvDownload from "react-json-to-csv";
import { Loader } from "rsuite";
import { IUser } from "types/Applicant.types";

const SearchTerm = (search: string, word1: string, word2?: string, word3?: string) => {
  const res = word1.toLowerCase().includes(search.toLowerCase()) || word2?.toLowerCase().includes(search.toLowerCase()) || word3?.toLowerCase().includes(search.toLowerCase());
  return res;
};

const GET_USERS = gql`
  {
    getUsers {
      id
      firstName
      lastName
      email
      country
      phone
    }
  }
`;

interface IData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const AllUserTable = (): JSX.Element => {
  // const [checkAll, setCheckAll] = useState(false);

  const [data, setData] = useState<IData[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [list, setList] = useState<string[]>([]);

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => setUsers(data.getUsers),
    onError: (err) => console.log(err),
  });

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (list.includes(id)) {
      setList(list.filter((li) => li !== id));
      setData(data.filter((da) => da.id !== id));
    } else {
      const user = users?.find((user) => user?.id === id);
      if (user) {
        const { firstName, lastName, email, phone, id } = user as IUser;
        setData([...data, { firstName, lastName, phone, email, id }]);
      }
      setList([...list, id]);
    }
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (checked) {
      const ids = users?.map((user) => user?.id);
      setList(ids);
    } else {
      setList([]);
    }
    // console.log(list);
  };

  if (loading) return <Loader content="Getting users" />;
  return (
    <div className="container">
      <div className="mb-2 py-1">
        <form className="mb-3 align-items-center row">
          <div className="col input-group search-sec">
            <span className="input-group-text rounded-0 bg-sky border-end-0">
              <i className="fas fa-search"></i>
            </span>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control shadow-none form-control-lg border-start-0 bg-sky" placeholder="Search Users" />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary bg-green fs-5 d-flex gap-3 align-items-center py-2 rounded">
              <i className="fas fa-filter"></i> <span>Filter</span>
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex mb-3 justify-content-between align-items-center">
        <div>
          <p className="fs-4 m-0 text-green">
            All Users
            <span className="fw-lighter text-primary"> (User List)</span>
          </p>
        </div>
        <div className="d-flex gap-3 align-items-center">
          <CsvDownload
            className="btn btn-warning px-4 py-2 rounded text-white"
            data={data?.map((user) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { id, ...rest } = user;
              return rest;
            })}
            filename="users.csv">
            Export CSV
          </CsvDownload>
        </div>
      </div>
      <div>
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" onChange={handleCheckAll} className="form-check-input" />{" "}
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Country</th>
            </tr>
          </thead>
          <tbody>
            {users
              ?.filter((user) => SearchTerm(search, user?.firstName, user?.lastName, user?.email))
              ?.map((user, i) => (
                <UserTr handleChecked={handleChecked} key={i} user={user} checked={list?.includes(user?.id)} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUserTable;

interface TrPorps {
  user: IUser;
  checked: boolean;
  handleChecked(e: React.ChangeEvent<HTMLInputElement>): void;
}

const UserTr: React.FC<TrPorps> = ({ user, checked, handleChecked, ...props }: TrPorps): JSX.Element => {
  return (
    <tr {...props}>
      <td>
        <CheckBox checked={checked} onChange={handleChecked} id={user?.id} name={user?.firstName + user?.lastName} />
        {/* <input type="checkbox" className="form-check-input" onChange={handleChange} checked={defaultCheck} /> */}
      </td>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user?.email}</td>
      <td>{user?.phone}</td>
      <td>{user?.country}</td>
    </tr>
  );
};

interface CheckBoxProps {
  id?: string;
  onChange(e: any): void;
  name?: string;
  checked?: boolean;
}
const CheckBox = ({ id, name, onChange, checked }: CheckBoxProps) => {
  return <input type="checkbox" className="form-check-input" name={name} id={`${id}`} onChange={onChange} checked={checked} />;
};
