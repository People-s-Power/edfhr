import { initializeApollo } from "apollo";
import { AUTH } from "apollo/queries/userQuery";
import { UserAtom } from "atom/UserAtom";
import { NextPageContext } from "next";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserProps } from "types/Applicant_types";

const withAuth = (WrappedComponent: any): React.ReactNode => {
  const MyComp = ({ children, ...props }) => {
    const { user } = props;
    const [profile, setUser] = useRecoilState(UserAtom);

    // useEffect(() => {
    //   if (data?.getUsers) {
    //     if (!users) {
    //       setUsers(data.getUsers);
    //     }
    //   }
    // }, []);
    useEffect(() => {
      if (user && !profile) {
        setUser(user);
      }
    }, [profile]);

    return <WrappedComponent {...props}>{children}</WrappedComponent>;
  };

  MyComp.propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
    token: PropTypes.string,
  };

  MyComp.getInitialProps = async (ctx: NextPageContext) => {
    let user: UserProps = null;
    const apollo = initializeApollo(null, ctx);
    const props =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    try {
      const { data } = await apollo.query({
        query: AUTH,
      });
      user = data.auth;
      return {
        ...props,
        user,
      };
    } catch (error) {
      console.log(error);
      if (error?.graphQLErrors[0]) {
        console.log(error?.message);
      }
      ctx?.res.writeHead(302, { location: "/" });
      ctx?.res.end();
    }
    return {
      ...props,
      user,
    };
  };

  return MyComp;
};

export default withAuth;
