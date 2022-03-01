import { useMutation } from "@apollo/client";
import { ADD_AFFIDAVIT } from "apollo/queries/applicantQuery";
import { CustomError } from "components/users/RegisterComp";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Loader } from "rsuite";

const AddAffidavit = ({ applicant_id, onAdd }): JSX.Element => {
  const [showRel, setShowRel] = useState(true);
  const [showReligion, setShowReligion] = useState(true);
  const [showOccupation, setShowOccupation] = useState(true);
  const [addff, { loading }] = useMutation(ADD_AFFIDAVIT);
  const [info, setInfo] = useState({
    name: "",
    address: "",
    title: "",
    religion: "",
    occupation: "",
    rel: "",
    gender: "",
  });

  useEffect(() => {
    if (info.rel === "Others") setShowRel(false);
  }, [info.rel]);
  useEffect(() => {
    if (info.religion === "Others") setShowReligion(false);
  }, [info.religion]);
  useEffect(() => {
    if (info.occupation === "Others") setShowOccupation(false);
  }, [info.occupation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...info,
      applicant_id,
    };
    try {
      const { data } = await addff({ variables: { input: payload } });
      alert("SUCCESS");
      onAdd(data.addAffidavit);
    } catch (error) {
      CustomError(error);
    }
  };
  return (
    <div>
      <h4 className="heading text-center">Deponent's Information</h4>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name </label>
          <input
            type="text"
            className="form-control"
            value={info.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            className="form-control"
            onChange={handleChange}
            value={info.gender}
            name="gender"
          >
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Title</label>
          <select
            className="form-control"
            onChange={handleChange}
            value={info.title}
            name="title"
          >
            <option value=""></option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Pastor</option>
            <option>Imam</option>
            <option>Dr</option>
            <option>Engineer</option>
            <option>Chief</option>
            <option>Elder</option>
          </select>
        </div>
        {!showReligion ? (
          <div className="form-group">
            <label>Specify Religion</label>
            <input
              type="text"
              name="religion"
              onChange={handleChange}
              className="form-control"
              defaultValue={info.religion}
            />
          </div>
        ) : (
          <div className="form-group">
            <label>Religion</label>
            <select
              className="form-control"
              defaultValue={info.religion}
              name="religion"
              onChange={handleChange}
            >
              <option value=""></option>
              <option>Christian</option>
              <option>Islam</option>
              <option>Traditionalist</option>
              <option>Duddist</option>
              <option>Others</option>
            </select>
          </div>
        )}

        {!showOccupation ? (
          <div className="form-group">
            <label>Specify occupation</label>
            <input
              type="text"
              name="occupation"
              onChange={handleChange}
              className="form-control"
              defaultValue={info.occupation}
            />
          </div>
        ) : (
          <div className="form-group">
            <label>Occupation</label>
            <select
              className="form-control"
              defaultValue={info.occupation}
              name="occupation"
              onChange={handleChange}
            >
              <option value=""></option>
              <option>
                business {info.gender === "male" ? "man" : "woman"}{" "}
              </option>
              <option>trader</option>
              <option>farmer</option>
              <option>civil servant</option>
              <option>doctor</option>
              <option>clergy</option>
              <option>
                military {info.gender === "male" ? "man" : "woman"}{" "}
              </option>
              <option>Others</option>
            </select>
          </div>
        )}

        {!showRel ? (
          <div className="form-group">
            <label>Specify relationship</label>
            <input
              type="text"
              name="rel"
              defaultValue={info.rel}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ) : (
          <div className="form-group">
            <label>Relationship with the applicant</label>
            <select
              className="form-control"
              defaultValue={info.rel}
              name="rel"
              onChange={handleChange}
            >
              <option value=""></option>
              <option>sibiling</option>
              <option>uncle</option>
              <option>aunt</option>
              <option>mother</option>
              <option>father</option>
              <option>friend</option>
              <option>neighbour</option>
              <option>Others</option>
            </select>
          </div>
        )}
        <div className="form-group">
          <label>Address</label>
          <input
            type="address"
            name="address"
            onChange={handleChange}
            value={info.address}
            className="form-control"
          />
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-info" disabled={loading}>
            {loading ? <Loader content="processing..." /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

AddAffidavit.propTypes = {
  applicant_id: PropTypes.string,
  onAdd: PropTypes.func,
};

export default AddAffidavit;
