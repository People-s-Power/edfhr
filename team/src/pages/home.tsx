import { UserAtom } from "atom/UserAtom";
import AdminHome from "components/Home/AdminHome.jsx";
import DraftHomeComp from "components/Home/DraftHome";
import LawyerHomeComp from "components/Home/LawyerHomeComp";
import LegaWorldHomeComp from "components/Home/LegalWorldHome";
import RepHomeComp from "components/Home/RepHomeComp";
import SuppervisorHomeComp from "components/Home/SuppervisorHomeComp";
import Layout from "components/Layout";
import React from "react";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import {
  ADMIN,
  DRAFT,
  LAWYER,
  LEGAL_WORLD,
  REP,
  SUPPERVISOR,
} from "utils/constants";
import withAuth from "utils/withAuth";

const HomePage = (props: any): JSX.Element => {
  const user = useRecoilValue(UserAtom);
  if (!user) return <Loader center vertical />;
  switch (user?.position) {
    case ADMIN:
      return (
        <Layout title="Dashboard">
          <AdminHome />
        </Layout>
      );

    case LEGAL_WORLD:
      return (
        <Layout title="Dashboard">
          <LegaWorldHomeComp />
        </Layout>
      );
    case LAWYER:
      return (
        <Layout title="Dashboard">
          <LawyerHomeComp />
        </Layout>
      );
    case REP:
      return (
        <Layout title="Dashboard">
          <RepHomeComp />
        </Layout>
      );
    case SUPPERVISOR:
      return (
        <Layout title="Dashboard">
          <SuppervisorHomeComp />
        </Layout>
      );
    case DRAFT:
      return (
        <Layout title="Dashboard">
          <DraftHomeComp />
        </Layout>
      );
    default:
      return (
        <Layout title="Dashboard">
          <p>No position</p>
        </Layout>
      );
  }
  // return (
  //   <Layout title="Dashboard">
  //     <Fragment>
  //       {user?.position === ADMIN && <AdminHome />}
  //       {user?.position === LEGAL_WORLD && <LegaWorldHomeComp />}
  //     </Fragment>
  //   </Layout>
  // );
};

HomePage.propTypes = {};

export default withAuth(HomePage);
