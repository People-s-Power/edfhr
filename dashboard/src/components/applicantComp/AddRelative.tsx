import axios from "axios";
import React, { useState } from "react";
import { IRelative } from "types/Applicant.types";

const AddRelative = ({ onAdd, applicant_id }: { onAdd(data: IRelative): void; applicant_id: string }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
  });

  const addRelative = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.name || !info.phone) return;
    if (info.phone.length < 11) return alert("Invalid Phone number");
    setLoading(true);
    try {
      const { data } = await axios.post("/relative", { ...info, applicant_id });

      setInfo({
        name: "",
        phone: "",
      });
      if (data.id) {
        onAdd(data);
        setLoading(false);
      }
    } catch (error) {
      const err: any = error;

      if (err?.response?.data) {
        alert(err?.response?.data?.message);
      }
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="border border-1 border-primary">
      <h6 className="bg-sky p-3"> Relative`s Information</h6>

      <form className="container" onSubmit={addRelative}>
        <div className="row align-items-center mb-2">
          <div className="col-md-6">
            <label>Name</label>
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control border-primary " required value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} />
          </div>
        </div>

        <div className="row align-items-center mb-2">
          <div className="col-md-6">
            <label>Phone</label>
          </div>
          <div className="col-md-6">
            <input type="text" className="form-control border-primary " required value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
          </div>
        </div>
        <div className="text-end my-2">
          <button className="btn btn-outline-warning">{loading ? "Processing..." : "Add Record"}</button>
        </div>
      </form>
    </div>
  );
};

export default AddRelative;
