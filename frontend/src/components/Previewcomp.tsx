import router from "next/router";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ICampaign } from "types/Applicant.types";

interface IProps {
  camp: ICampaign;
  loading: boolean;
  filePreview: {
    type: string;
    file: string;
  };
  setNext(): void;
}
const previewcamp = ({
  camp,
  filePreview,
  setNext,

  loading,
}: IProps): JSX.Element => {
  return (
    <main>
      <div className="preview-camp py-5">
        <div className="container">
          <div className=" font-weight-bolder display-4 mb-3">{camp.title}</div>
          <p className="font-weight-bold mb-4 camp-title">{camp.target}</p>
          {filePreview?.type === "image" && (
            <img
              src={filePreview.file}
              alt=""
              className="mb-4"
              style={{
                width: "100%",
                maxWidth: "30rem",
                objectFit: "contain",
                margin: "auto",
              }}
            />
          )}
          {filePreview?.type === "video" && (
            <div className="embed-responsive mb-4 embed-responsive-16by9">
              <video
                src={filePreview.file}
                controls={true}
                className="embed-responsive-item d-block"
                style={{
                  width: "100%",
                  maxWidth: "30rem",
                  objectFit: "contain",
                  margin: "auto",
                }}
              ></video>
            </div>
          )}

          <ReactMarkdown>{camp.body}</ReactMarkdown>
          <div className="launch-camp my-5 d-flex justify-content-center">
            <button
              className="btn px-3 py-2 font-weight-bolder"
              onClick={() => setNext()}
            >
              {loading ? "Processing your campaign..." : "Launch Campaign"}
            </button>
          </div>
          <h4 className="d-flex justify-content-end">
            <button
              className="btn rounded-pill text-success text-decoration-underline "
              type="button"
              onClick={() => {
                router.back();
              }}
            >
              Back to edit
            </button>
          </h4>
        </div>
      </div>
    </main>
  );
};

export default previewcamp;

// "https://www.youtube.com/embed/-ZHrj2Fhnt4"
// https://youtu.be/XGk1mpB-AlU
