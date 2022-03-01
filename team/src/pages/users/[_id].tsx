import { getUser } from "apollo/userActions";
import Layout from "components/Layout";
import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import PropTypes from "prop-types";
// import { ApplicantsTable } from "pages/home";
import React, { useEffect, useState } from "react";
import { Avatar, Loader } from "rsuite";
import { ApplicantProps, UserProps } from "types/Applicant_types";
import withAuth from "utils/withAuth";

interface SingleUserI extends UserProps {
  applicants: Array<ApplicantProps>;
}

const SingleUserPage = ({ props }) => {
  const { profile } = props;
  const [user, setUser] = useState<SingleUserI>(null);
  // const applicants = useRecoilValue(UserApplicant(profile?._id));

  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, []);

  // console.log(profile.applicants);
  if (!user) return <Loader center content="Getting user" />;
  return (
    <Layout title="Users" title2="Single User">
      <div className="single-user">
        <div className="heading">User Profile</div>
        <div className="theme-card d-md-flex justify-content-between">
          <div className="user-picture d-flex align-items-center">
            <Avatar circle size="lg" src={user?.image} />
            <div className="text-center ml-2">
              <h6 className="mb-0">{user?.name}</h6>
              <span className="text-muted">{user?.position}</span>
            </div>
          </div>
          <div className="divider" />
          <div className="user-contact mt-2 mt-md-0">
            <h6>Contact Details</h6>
            <ul className="text-muted">
              <li>
                <i className="fas fa-envelope mr-2"></i> {user?.email}
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i> {user?.state}
              </li>
              <li>
                <i className="fas fa-phone mr-2"></i> {user?.phone}
              </li>
            </ul>
          </div>
        </div>

        <div className="user-applicants">
          <div className="heading">Contact List</div>
          <div className="card">
            <table className="table table-sm table-hover table-borderless">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                {user?.applicants?.map((applicant, i) => (
                  <tr key={i}>
                    <td>
                      <Link href={`/applicants/${applicant._id}`}>
                        <a className="text-inherit"> {applicant.name}</a>
                      </Link>
                    </td>
                    <td>₦{applicant.amount_paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

SingleUserPage.propTypes = {
  props: PropTypes.any,
  _id: PropTypes.string,
  profile: PropTypes.object,
};

export default withAuth(SingleUserPage);

SingleUserPage.getInitialProps = async (ctx: NextPageContext) => {
  // const apollo = await initializeApollo(ctx);
  try {
    const profile: UserProps = await getUser(ctx);
    // const { data } = await apollo.query({
    //   query: GET_USER,
    //   variables: { _id: ctx?.query?._id },
    // });

    return {
      props: {
        profile,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        _id: ctx?.query,
      },
    };
  }
};
