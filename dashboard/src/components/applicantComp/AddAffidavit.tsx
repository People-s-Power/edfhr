import { IAffidavit } from "types/Applicant.types";
import axios from "axios";
import React, { useState } from "react";
import { Loader } from "rsuite";

const AddAffidavit = ({ onAdd, applicant }: { onAdd(): void; applicant: string }): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const [info, setInfo] = useState<IAffidavit>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInfo({
      ...(info as any),
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (!applicant) {
      alert("No applicant selected");
      setLoading(false);
      return;
    }
    const payload = {
      ...info,
      applicant,
    };

    try {
      await axios.post("/affidavit", payload);
      alert("SUCCESS");
      setLoading(false);

      onAdd();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="affidavit-form">
      <h4 className="heading">Update Deponent Information</h4>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name </label>
          <input type="text" className="form-control" onChange={handleChange} name="name" />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select className="form-control" onChange={handleChange} name="gender">
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Title</label>
          <select className="form-control" onChange={handleChange} name="title">
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
        <div className="form-group">
          <label>Religion</label>
          <select className="form-control" name="religion" onChange={handleChange}>
            <option value=""></option>
            <option>Christian</option>
            <option>Islam</option>
            <option>Traditionalist</option>
            <option>Duddist</option>
            <option>Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Occupation</label>
          <select className="form-control" name="occupation" onChange={handleChange}>
            <option value=""></option>
            <option>business {info?.gender === "male" ? "man" : "woman"} </option>
            <option>trader</option>
            <option>farmer</option>
            <option>civil servant</option>
            <option>doctor</option>
            <option>clergy</option>
            <option>military {info?.gender === "male" ? "man" : "woman"} </option>
            <option>Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Relationship with the applicant</label>
          <select className="form-control" name="rel" onChange={handleChange}>
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
        <div className="form-group">
          <label>Address</label>
          <input type="address" name="address" onChange={handleChange} className="form-control" />
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-info">{loading ? <Loader content="Processing record..." /> : "Add Record"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddAffidavit;
