import { useMutation, useQuery } from "@apollo/client";
import { ADD_REPORT, GET_APPLICANTS_REPORT } from "apollo/queries/reportQuery";
import { CustomError } from "components/users/RegisterComp";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import ReactMde from "react-mde";
import { Loader, Modal } from "rsuite";
import { ApplicantProps } from "types/Applicant_types";

// interface IPage {
//   applicant: ApplicantProps;
//   i: number;
// }

const RepReport = (): JSX.Element => {
  // const [search, setSearch] = useState("");
  const [applicants, setApplicants] = useState([]);
  const { loading } = useQuery(GET_APPLICANTS_REPORT, {
    onCompleted: (data) => setApplicants(data.getApplicantsReport),
    onError: (err) => console.log(err),
  });

  return (
    <div>
      {loading ? (
        <Loader content="Loading reports ..." />
      ) : (
        applicants?.map(({ applicant, report }) => (
          <RepReportCard
            key={applicant._id}
            applicant={applicant}
            report={report}
          />
        ))
      )}
    </div>
  );
};

RepReport.propTypes = {};

export default RepReport;

interface IRepCard {
  applicant: ApplicantProps;
  report: any;
}

const RepReportCard = ({ applicant, report }: IRepCard) => {
  const { name } = applicant;

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const [addReport, { loading }] = useMutation(ADD_REPORT);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content,
      applicant_id: applicant._id,
      title,
    };
    try {
      await addReport({ variables: { input: payload } });

      setShow(false);
      alert("Success");
    } catch (error) {
      CustomError(error);
    }
    // console.log(payload);
  };
  return (
    <Fragment>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header className="font-weight-bold text-center">
          Add Report
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Enter full message</label>
              <ReactMde
                value={content}
                onChange={setContent}
                toolbarCommands={[]}
              />
            </div>

            <div className="text-center">
              <button className="btn btn-info" disabled={loading}>
                {loading ? <Loader content="Processing" /> : "Submit"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="theme-card d-flex justify-content-between">
        <div>
          <Link href={`/applicants/${applicant._id}`}>{name}</Link>
        </div>
        {report?._id ? (
          <Link href={`/reports/${report._id}`}>
            <a className="btn btn-success">View Report</a>
          </Link>
        ) : (
          <button className="btn btn-danger" onClick={() => setShow(true)}>
            Make Report
          </button>
        )}
      </div>
    </Fragment>
  );
};
