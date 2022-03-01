import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import PropTypes from "prop-types";
import * as React from "react";
dayjs.extend(relativeTime);

interface AuthorI {
  _id: string;
  name: string;
}

interface ReportCardI {
  _id: string;
  updatedAt: Date;
  author: AuthorI;
  title: string;
  applicant_id: AuthorI;
}

const ReportCardComp = ({ report }: { report: ReportCardI }): JSX.Element => {
  return (
    <Link href={`/reports/${report?._id}`}>
      <div className="theme-card hover report-card c-hand">
        <div className="d-flex justify-content-between">
          <h6 className="mb-0">{report?.author?.name}</h6>
          <div className="font-smaller font-italic">
            <i className="fas fa-user mr-1"></i>
            {report?.applicant_id?.name}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="report-card_content">{report?.title}</div>
          <small className="text-muted d-block">
            {dayjs(report?.updatedAt).fromNow()}
          </small>
        </div>
      </div>
    </Link>
  );
};

ReportCardComp.propTypes = {
  report: PropTypes.object,
};

export default ReportCardComp;
