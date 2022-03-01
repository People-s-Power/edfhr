import { useQuery } from "@apollo/client";
import { GET_LAWYERS, GET_USERS } from "apollo/queries/userQuery";
import { UserAtom } from "atom/UserAtom";
import Layout from "components/Layout";
import SearchComp from "components/SearchComp";
import LawyerCardComp from "components/users/LawyerCardComp";
import UserCardComp from "components/users/UserCardComp";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { UserProps } from "types/Applicant_types";
import { LEGAL_WORLD } from "utils/constants";
import withAuth from "utils/withAuth";

const UsersPage = () => {
  const user = useRecoilValue<UserProps>(UserAtom);
  const [users, setUsers] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const { loading, fetchMore } = useQuery(GET_USERS, {
    variables: { search, skip },
    onCompleted: (data) => setUsers(data?.getUsers),
    onError: (err) => console.log(err),
  });
  if (user?.position === LEGAL_WORLD)
    return (
      <Layout title="Users">
        <LawyerView />
      </Layout>
    );
  return (
    <Layout title="Users">
      <div className="users">
        <h5 className="heading">Users</h5>
        <div className="my-3 d-flex justify-content-end ">
          <SearchComp loading={loading} onSearch={(txt) => setSearch(txt)} />
        </div>

        <div className="user-card_list">
          {loading ? (
            <Loader />
          ) : (
            users.map((user, i) => (
              <UserCardComp
                users={users}
                setUsers={setUsers}
                user={user}
                key={i}
              />
            ))
          )}

          {users.length > 5 && (
            <div className="buttons text-center">
              <button
                className="btn btn-outline-info"
                onClick={() => {
                  setSkip(skip + 10);
                  fetchMore({
                    variables: { skip },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;

                      setUsers([...users, fetchMoreResult.getUsers]);
                    },
                  });
                }}
              >
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(UsersPage);

const LawyerView = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<UserProps[]>([]);

  const { loading } = useQuery(GET_LAWYERS, {
    variables: { search },
    onCompleted: (data) => setUsers(data.getLawyers),
    onError: (err) => console.log(err),
  });

  return (
    <div className="users">
      <h5 className="heading">Users</h5>
      <div className="my-3 d-flex justify-content-end ">
        <SearchComp onSearch={(txt) => setSearch(txt)} />
      </div>

      <div className="user-card_list">
        {loading ? (
          <Loader content="Getting Users..." />
        ) : (
          users.map((user, i) => (
            <LawyerCardComp
              key={i}
              user={user}
              users={users}
              setUsers={setUsers}
            />
          ))
        )}
      </div>
    </div>
  );
};
