import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER_REPORTS } from "apollo/queries/reportQuery";
import { GET_MY_USERS } from "apollo/queries/userQuery";
import SearchComp from "components/SearchComp";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ObjectId } from "mongoose";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Loader } from "rsuite";
import { UserProps } from "types/Applicant_types";
import ReadReportItem from "./ReadReport";
// import PropTypes from 'prop-types'

dayjs.extend(relativeTime);

const SuppervisorReports = (): JSX.Element => {
  const [selectedUser, setSelectedUser] = useState<UserProps | any>({});
  const [reports, setReports] = useState([]);
  const [report_id, setReport_id] = useState<ObjectId>(null);
  const [searchUser, setSearchUser] = useState("");
  const [searchApplicant, setSearchApplicant] = useState("");

  const [users, setUsers] = useState([]);
  const [getReports, { loading }] = useLazyQuery(GET_USER_REPORTS, {
    onCompleted: (data) => setReports(data.getUserReports),
    onError: (err) => console.log(err),
  });

  const { loading: loadingUsers } = useQuery(GET_MY_USERS, {
    variables: { search: searchUser },
    onCompleted: (data) => setUsers(data?.getMyUsers),
    onError: (err) => console.log(err),
  });

  const handleUserSelect = (user) => {
    getReports({ variables: { user_id: user._id } });
    setSelectedUser(user);
  };

  return (
    <div id="reports">
      <div className="inner">
        <div className="first">
          <div className="theme-card">
            <div className="heading">Users</div>
            <SearchComp onSearch={(txt) => setSearchUser(txt)} />
            <hr />
            {loadingUsers ? (
              <Loader />
            ) : (
              [...users]
                .splice(0, 12)
                .map((user, i) => (
                  <UserList user={user} onSelect={handleUserSelect} key={i} />
                ))
            )}
          </div>
        </div>
        <div className="second">
          <div className="theme-card">
            <div className="heading">{selectedUser?.name}</div>
            <SearchComp onSearch={(txt) => setSearchApplicant(txt)} />
            <hr />
            {loading && <Loader content="getting reports" />}
            {!reports.length ? (
              <p className="text-center">No reports by this user</p>
            ) : (
              [...reports]
                .filter((rep) =>
                  rep.applicant_id?.name
                    .toLowerCase()
                    .includes(searchApplicant.toLocaleLowerCase())
                )
                .splice(0, 12)
                .map((report, i) => (
                  <ReportListItem
                    report={report}
                    key={i}
                    onClick={() => setReport_id(report._id)}
                  />
                ))
            )}
          </div>
        </div>
        <div className="third">
          <div className="theme-card">
            <div>
              <div className="heading">Report</div>
              <hr />
              <ReadReportItem _id={report_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppervisorReports;
SuppervisorReports.propTypes = {
  user: PropTypes.object,
};

const UserList = ({ user, onSelect }) => {
  return (
    <div className="user-list c-hand" onClick={() => onSelect(user)}>
      <p className="name ">{user.name}</p>
      <div className="user-list_small">
        <p className="role">{user.position}</p>
        <p className="count ">{user.reportCount}</p>
      </div>
    </div>
  );
};

UserList.propTypes = {
  user: PropTypes.object,
  onSelect: PropTypes.func,
};

const ReportListItem = ({ report, ...props }) => {
  return (
    <div className="report-list-item user-list c-hand" {...props}>
      <p className="name">{report.applicant_id?.name}</p>
      <div className="user-list_small">
        <p className="role">
          <i className="fas fa-clock mr-2"></i>{" "}
          {dayjs(report.createdAt).fromNow()}
        </p>
        {/* <p className="count ">14</p> */}
      </div>
    </div>
  );
};
ReportListItem.propTypes = {
  report: PropTypes.object,
};
