import { useQuery, useSubscription } from "@apollo/client";
import {
  GET_REPORT_NOTICATIONS,
  REPORT_SUBSCRIPTION,
} from "apollo/queries/reportQuery";
import { UserAtom } from "atom/UserAtom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Modal } from "rsuite";
import { ADMIN } from "utils/constants";
import ReadReportItem from "./ReadReport";

export const AdminReportCard = () => {
  const authUser = useRecoilValue(UserAtom);
  const [reports, setReports] = useState([]);
  useSubscription(REPORT_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: { data } }) =>
      setReports(data.reportSubscription),
  });

  useQuery(GET_REPORT_NOTICATIONS, {
    onCompleted: (data) => setReports(data.getReportNoifcations),
    onError: (err) => console.log(err),
  });

  return (
    <Fragment>
      {reports.length > 0 ? (
        <h5 className="heading">Recent Updates</h5>
      ) : (
        <h5 className="heading">No Recent Updates</h5>
      )}
      {reports
        .filter((data) => {
          if (authUser.position !== ADMIN) {
            return data.author === authUser._id;
          } else if (authUser._id !== data.author) {
            return data;
          } else {
            return data;
          }
        })
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        // .splice(0, 5)
        .map((report, i) => {
          return <Item key={i} report={report} />;
        })}
    </Fragment>
  );
};

const Item = ({ report }) => {
  const authUser = useRecoilValue(UserAtom);
  const { time, user, action } = report;
  const [show, setShow] = useState(false);
  const name = user.name === authUser.name ? "You" : user.name;

  return (
    <Fragment>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <ReadReportItem _id={report.report} />
        </Modal.Body>
      </Modal>
      <div
        className="theme-card d-flex align-items-center hover c-hand"
        onClick={() => setShow(true)}
      >
        <Avatar circle src={user.image} />
        <p className="mb-0 ml-2">
          <strong>{name}</strong> {action}
          <span className="font-italic ml-2">{dayjs(time).fromNow()}</span>
        </p>
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  report: PropTypes.object,
};
