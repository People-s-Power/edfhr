import { useMutation } from "@apollo/client";
import { GENERATE_PDF } from "apollo/queries/applicantQuery";
import axios from "axios";
import React, { useState } from "react";
import { Loader } from "rsuite";
import { HTTP_URI } from "utils/constants";

const test = () => {
  // const [loading, setLoading] = useState(false);
  const applicant_id = "5fd1d33f5a1c45001ccc0e41";
  const [generatePDF, { loading }] = useMutation(GENERATE_PDF);
  const [draftLink, setDraftLink] = useState("");

  const handleSubmit = async () => {
    try {
      // const { data } = await axios.post("/api/hello", {
      //   _id: applicant_id,
      // });
      const { data } = await generatePDF({
        variables: { _id: applicant_id },
      });
      setDraftLink(data.generatePdf.draft);
      // const { data } = await axios.post("/api/hello", { _id: applicant._id });
      console.log(data);
      alert("SUCCESS");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) return <Loader content="Loading...." />;
  return (
    <div className="container mt-3">
      <button className="btn btn-info" onClick={handleSubmit}>
        Get Draft
      </button>

      {draftLink && <a href={`${HTTP_URI}/${draftLink}`}>View</a>}
    </div>
  );
};

export default test;
