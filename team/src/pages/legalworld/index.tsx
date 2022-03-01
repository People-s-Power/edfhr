import { useQuery } from "@apollo/client";
import { GET_LAWYERS } from "apollo/queries/userQuery";
import Layout from "components/Layout";
import SearchComp from "components/SearchComp";
import Link from "next/link";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Loader } from "rsuite";
import withAuth from "utils/withAuth";

const LegalWorldPage: React.FC = () => {
  const [lawyers, setLawyers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [count, setCount] = useState(12);
  const { loading } = useQuery(GET_LAWYERS, {
    variables: { search: searchInput },
    onCompleted: (data) => setLawyers(data.getLawyers),
    onError: (err) => console.log(err),
  });

  return (
    <Layout title="Legal World">
      <div className="legal-world">
        <div className="heading">Legal World</div>
        <div className=" middle-bar">
          <SearchComp onSearch={(txt) => setSearchInput(txt)} />
        </div>
        <div className="legal-world_card-list mt-3">
          <div className="grid-4">
            {lawyers &&
              [...lawyers]
                .filter((lawyer) =>
                  lawyer?.name.toLowerCase().includes(searchInput.toLowerCase())
                )
                .splice(0, count)
                .map((user, i) => <LawyersCard user={user} key={i} />)}
          </div>
        </div>

        {loading ? (
          <Loader center vertical />
        ) : (
          lawyers?.length > count && (
            <div className="d-flex justify-content-center mt-3">
              {count > 12 && (
                <button
                  className="btn btn-outline-danger mr-3"
                  onClick={() => setCount(count - 8)}
                >
                  View Less
                </button>
              )}
              <button
                className="btn btn-outline-info"
                onClick={() => setCount(count + 8)}
              >
                View More
              </button>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default withAuth(LegalWorldPage);

const LawyersCard = ({ user }) => {
  return (
    <div className="card">
      <img
        src={user?.image}
        height="200"
        alt=""
        className="lawyers-card-image"
      />
      <div className="text-content">
        <Link href={`/users/${user._id}`}>
          <a className="heading mb-0">{user?.name}</a>
        </Link>
        <div className="d-flex justify-content-between">
          <small>{user?.state}</small>
          <small>
            <i className="fas fa-users"></i> {user?.applicants?.length}
          </small>
        </div>
      </div>
    </div>
  );
};

LawyersCard.propTypes = {
  user: PropTypes.object,
};
