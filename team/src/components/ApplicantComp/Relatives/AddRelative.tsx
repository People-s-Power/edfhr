// import { Input } from "theme-ui";
import { useMutation } from "@apollo/client";
import { ADD_RELATIVE } from "apollo/queries/applicantQuery";
import PropTypes from "prop-types";
import React, { useState } from "react";

const AddRelativeComp = ({ applicant_id, onAdd }) => {
  const [addRel, { loading }] = useMutation(ADD_RELATIVE);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !applicant_id) return;

    try {
      const { data } = await addRel({
        variables: { input: { name, phone, applicant_id } },
      });
      if (data) {
        onAdd(data.addRelative);
        alert(`Successfully add ${data.addRelative.name}`);
        setName("");
        setPhone("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name of relation"
        className="form-control my-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Phone number of relation"
        className="form-control my-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="text-center">
        <button className="btn btn-primary mt-2" disabled={loading}>
          {loading ? "Proccessing...." : "Add"}
        </button>
      </div>
    </form>
  );
};

AddRelativeComp.propTypes = {
  abort: PropTypes.func,
  applicant: PropTypes.object,
  onAdd: PropTypes.func,
};

export default AddRelativeComp;
