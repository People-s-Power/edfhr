import { UserAtom } from "atom/UserAtom";
import Layout from "components/Layout";
import AddReportComp from "components/Reports/AddReport";
import LegalWorldReports from "components/Reports/LegalWorldReports";
import RepReport from "components/Reports/RepReport";
import SingleReports from "components/Reports/SingleReports";
import SuppervisorReports from "components/Reports/SuppervisorReports";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import { ADMIN, LEGAL_WORLD, REP, SUPPERVISOR } from "utils/constants";
import withAuth from "utils/withAuth";

const ReportsPage = () => {
  const [show, setShow] = useState(false);
  const user = useRecoilValue(UserAtom);

  // if (!user?.position) return <Loader center vertical />;
  // else
  return (
    <Layout title="Reports">
      <Fragment>
        <AddReportComp show={show} onHide={() => setShow(false)} />
        {/* <h2 className="heading">Reports</h2> */}
        <div className="middle-bar">
          <div className="btns mb-2 mb-md-0">
            {user.position !== LEGAL_WORLD && (
              <button
                className="btn btn-info btn-sm"
                onClick={() => setShow(true)}
                disabled={user.position === SUPPERVISOR}
              >
                <i className="fas fa-plus mr-1"></i> Make Report
              </button>
            )}
          </div>
        </div>
        {user?.position === ADMIN && <SingleReports />}
        {user?.position === LEGAL_WORLD && <LegalWorldReports />}
        {user?.position === SUPPERVISOR && <SuppervisorReports />}
        {user?.position === REP && <RepReport />}
      </Fragment>
    </Layout>
  );
};

export default withAuth(ReportsPage);

ReportsPage.propTypes = {
  user: PropTypes.object,
};
