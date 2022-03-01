import { useMutation } from "@apollo/client";
import { ADD_EXHIBIT } from "apollo/queries/applicantQuery";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
// import { Input, Select } from "";

const AddExhibitComp = ({ onAdd, applicant_id }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [addExhibit, { loading }] = useMutation(ADD_EXHIBIT);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file) return;

    try {
      const { data } = await addExhibit({
        variables: {
          input: { name, image: file, applicant_id },
        },
      });

      // console.log(data.addExhibit);
      onAdd(data.addExhibit);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <h6>Add Exhibit</h6>

      <select
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control mb-2"
      >
        <option>Select type of exhibit</option>
        <option>Charge Sheets</option>
        <option>Remand Warrant</option>
        <option>Record of court proceedings</option>
        <option>Pictures</option>
        <option>Others</option>
      </select>
      <input
        type="file"
        name="file"
        onChange={handleImage}
        className="mb-2 form-control"
      />

      <button
        disabled={loading}
        className={`btn btn-error btn-block ${loading && "loading"}`}
      >
        Upload
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.form``;

AddExhibitComp.propTypes = {
  onAdd: PropTypes.func,
  applicant: PropTypes.object,
  onAbort: PropTypes.func,
};

export default AddExhibitComp;
