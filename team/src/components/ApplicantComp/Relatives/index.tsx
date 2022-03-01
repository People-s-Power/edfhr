import { useQuery } from "@apollo/client";
import { GET_RELATIVES_BY_APPLICANT } from "apollo/queries/applicantQuery";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Loader, Modal } from "rsuite";
import AddRelativeComp from "./AddRelative";
import SingleRelComp from "./SingleRel";

const RelativesComp = ({ applicant_id }) => {
  const [show, setShow] = useState(false);

  const [relatives, setRelatives] = useState([]);

  const { loading } = useQuery(GET_RELATIVES_BY_APPLICANT, {
    variables: { applicant_id },
    onCompleted: (data) => setRelatives(data.getRelativesByApplicant),
    onError: (err) => console.log(err),
  });

  const handleDelete = (_id) => {
    const filtered = relatives.filter((rel) => rel._id !== _id);
    setRelatives(filtered);
  };
  const handleAdd = (data) => {
    setRelatives([...relatives, data]);
  };

  const handleUpdate = (data) => {
    setRelatives(relatives.map((r) => (r._id === data._id ? (r = data) : r)));
  };
  if (loading) return <Loader content="Getting info..." />;
  return (
    <div className="relatives">
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header className="text-center font-weight-bold">
          Add Relative
        </Modal.Header>
        <Modal.Body>
          <AddRelativeComp onAdd={handleAdd} applicant_id={applicant_id} />
        </Modal.Body>
      </Modal>
      <div className="view-relative">
        <div className="top d-flex justify-content-between align-items-center ">
          <h6 className="heading">Relatives</h6>
          <button className="btn btn-info" onClick={() => setShow(true)}>
            <i className="fas fa-plus"></i>{" "}
          </button>
        </div>

        <div className="table-wrapper">
          {relatives.map((rel, i) => (
            <SingleRelComp
              key={i}
              relative={rel}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

RelativesComp.propTypes = {
  relative: PropTypes.array,
  applicant: PropTypes.object,
};

export default RelativesComp;
