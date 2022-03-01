/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useQuery } from "@apollo/client";
import { GET_EXHIBITS_BY_APPLICANT } from "apollo/queries/applicantQuery";
import ModalComp from "components/ModalComp";
import React, { useState } from "react";
import { Loader } from "rsuite";
import AddExhibitComp from "./AddExhibit";
import ExhibitComp from "./ViewExhibit";

// eslint-disable-next-line react/prop-types
const ExhibitsComp = ({ applicant_id }): JSX.Element => {
  const [exhibits, setExhibits] = useState([]);
  const [show, setShow] = useState(false);
  const { loading, refetch } = useQuery(GET_EXHIBITS_BY_APPLICANT, {
    variables: { applicant_id },
    onCompleted: (data) => setExhibits(data.getExhibitsByApplicant),
    onError: (err) => console.log(err),
  });

  const handleDelete = (_id) => {
    setExhibits(exhibits.filter((ex) => ex._id !== _id));
  };

  const handleAdd = (data) => {
    setExhibits([...exhibits, data]);
    refetch();
    setShow(false);
  };

  if (loading) return <Loader content="Processing..." />;
  return (
    <div>
      <ModalComp show={show} onClose={() => setShow(false)}>
        <AddExhibitComp applicant_id={applicant_id} onAdd={handleAdd} />
      </ModalComp>
      <div className="d-md-flex justify-content-between">
        <h5 className="heading">Exhibits</h5>
        <button className="btn text-info" onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i>{" "}
        </button>
      </div>
      <div className="grid-3">
        {exhibits.map((exhibit, i) => (
          <ExhibitComp onDelete={handleDelete} exhibit={exhibit} key={i} />
        ))}
      </div>
    </div>
  );
};

export default ExhibitsComp;
