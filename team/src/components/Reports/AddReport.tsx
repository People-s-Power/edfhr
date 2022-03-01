import { gql, useMutation, useQuery } from "@apollo/client";
import { ADD_REPORT } from "apollo/queries/reportQuery";
import { CustomError } from "components/users/RegisterComp";
import { ObjectId } from "mongoose";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactMde from "react-mde";
import Select from "react-select";
import { Loader, Modal } from "rsuite";

const GET_APP = gql`
  query($limit: Int) {
    getApplicants(limit: $limit) {
      _id
      name
    }
  }
`;

interface IPage {
  show: boolean;
  onHide(): void;
  app_id?: ObjectId;
}
const AddReportComp = ({ show, onHide, app_id }: IPage): JSX.Element => {
  const [applicants, setApplicants] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [applicant_id, setApplicant_id] = useState("");
  const [addReport, { loading }] = useMutation(ADD_REPORT);
  useQuery(GET_APP, {
    variables: { limit: 1000 },
    onCompleted: (data) => setApplicants(data.getApplicants),
    onError: (err) => console.log(err),
  });
  const options = applicants.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      content,
      applicant_id: app_id ? app_id : applicant_id,
      title,
    };
    try {
      await addReport({ variables: { input: payload } });

      onHide();
      alert("Success");
    } catch (error) {
      CustomError(error);
    }
    // console.log(payload);
  };
  return (
    <Modal show={show} onHide={onHide}>
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
          {!app_id && (
            <div className="form-group">
              <label>Choose contact</label>
              <Select
                options={options}
                onChange={({ value }) => setApplicant_id(value)}
              />
            </div>
          )}
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
  );
};

export default AddReportComp;

AddReportComp.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  app_id: PropTypes.any,
};
