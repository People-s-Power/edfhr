import { UsersAtom } from "atoms/UserAtom";
import { AssignUserSuppervisor } from "components/applicantComp/AssignApplicantComp";
import AllUserTable from "components/usersComp/table/AllUserTable";
import UserComp from "components/usersComp/UserComp";
import React, { Fragment, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IUser, StaffRoleEnum } from "types/Applicant.types";
import useQueryParam from "utils/useQueryParam";

const UserPage = (): JSX.Element => {
  const users = useRecoilValue<IUser[]>(UsersAtom);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const router = useHistory();
  const query = useQueryParam().get("tab");
  const { id } = useParams<{ id: string }>();
  // console.log(query);

  return (
    <div className="split">
      <nav className="navbar nav-dark bg-info">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/users" className="nav-link text-decoration-none border-bottom border-1 border-primary link-dark">
              Users
            </Link>
          </li>
        </ul>
      </nav>
      <div className="split-main">
        <div className="inner">
          <div className="left">
            <div className="left-wrapper mb-3 container">
              <div className="smartlist mt-3">
                <p className="text-muted">Smart List</p>
                <select className="form-select border-info " onChange={(e) => setRole(e.target.value)}>
                  <option value="">All Users</option>
                  <option>{StaffRoleEnum.Rep}</option>
                  <option>{StaffRoleEnum.Lawyer}</option>
                  <option>{StaffRoleEnum.LegalWorld}</option>
                  <option>{StaffRoleEnum.Draft}</option>
                  <option>{StaffRoleEnum.Suppervisor}</option>
                  <option>{StaffRoleEnum.Admin}</option>
                </select>
                <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} className="form-control border-info my-2" placeholder="Search by name" />
              </div>

              <div className="split-view mt-4">
                <table className="table table-striped table-hover ">
                  <tbody>
                    {users
                      .filter((user) => user.firstName?.toLowerCase().includes(search.toLowerCase()) || user.lastName?.toLowerCase().includes(search.toLowerCase()))
                      .filter((user) => (role ? user.role === role : user))
                      .map((user, i) => (
                        <SingleRow user={user} key={i} />
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-primary text-light">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <button className="btn text-light" onClick={() => router.push(`/users/${id}?tab=All`)}>
                      <i className="fas fa-table"></i> View User table
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="right-inner">
              <div className="right-wrapper">{query != "All" ? <UserComp /> : <AllUserTable />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

const SingleRow = ({ user }: { user: IUser }) => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setUser(user);
  // });

  return (
    <Fragment>
      <AssignUserSuppervisor user_id={user?.id} show={show} onHide={() => setShow(false)} />
      <tr className={id && id === user.id ? "active" : ""}>
        <td>
          <Link to={`/users/${user.id}`} className="text-decoration-none text-capitalize">
            {user?.firstName} {user?.lastName}
          </Link>
        </td>
        <td className="dropdown" align="right">
          <i className="fas fa-ellipsis-v" data-bs-toggle="dropdown"></i>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <a className="dropdown-item text-decoration-none" onClick={() => setShow(true)}>
                Assign a suppervisor
              </a>
            </li>
          </ul>
        </td>
      </tr>
    </Fragment>
  );
};
