import { useQuery } from "@apollo/client";
import { GET_RELATIVES_BY_APPLICANT } from "apollo/queries/applicantQuery";
import { GET_APPLICANTS_REPORT } from "apollo/queries/reportQuery";
import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as timeago from "timeago.js";
import { IRelative, IRepComment, IReport, IUser, StaffRoleEnum } from "types/Applicant.types";

interface CReport extends Omit<IReport, "author"> {
  author: IUser;
}
interface CRepComment extends Omit<IRepComment, "author"> {
  author: IUser;
}

const ApplicantReportComp = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [reports, setReports] = useState<CReport[]>([]);
  const [showAddNew, setShowAddNew] = useState(false);
  const user = useRecoilValue(UserAtom);
  const [relatives, setRelatives] = useState<IRelative[]>([]);
  useQuery(GET_APPLICANTS_REPORT, {
    variables: { applicant_id: id },
    onCompleted: (data) => {
      setReports(data.getApplicantsReport);
    },
    onError: (err) => console.log(err),
  });
  useQuery(GET_RELATIVES_BY_APPLICANT, {
    variables: { applicant_id: id },
    onCompleted: (data) => setRelatives(data.getRelativesByApplicant),
    onError: (err) => console.log(err),
  });

  return (
    <div>
      {user?.role !== StaffRoleEnum.Lawyer && (
        <div className="text-center mb-2 ">
          {relatives?.map((rel, i) => (
            <small key={i}>
              <span className="text-capitalize fs-small fw-bold">{rel?.name}</span>: {rel?.phone},
            </small>
          ))}
        </div>
      )}
      {reports?.length > 0 ? (
        reports?.map((report, i) => <SingleReport report={report} key={i} />)
      ) : (
        <div className="mt-3">
          {showAddNew ? (
            <AddReportComp applicant_id={id} onAdd={(data) => setReports((old) => [...old, data])} />
          ) : (
            <div>
              <p>No Report has been made no this applicant</p>
              <button className="btn btn-warning text-light mb-3" onClick={() => setShowAddNew(true)}>
                Make Report
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicantReportComp;

const SingleReport = ({ report }: { report: CReport }) => {
  const [comments, setComments] = useState<CRepComment[] | any[]>([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (report?.comments) {
      setComments(report?.comments);
    }
  }, [report]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { content, report: report?.id };
    // return console.log(payload);
    try {
      const { data } = await axios.post("/rep-comment", payload);
      setComments((old) => [...old, data]);
      setContent(" ");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray mb-4 rounded-2 p-3">
      <div className="mb-3">
        <small className="fst-italic">
          <span className="fs-inherit fst-normal">
            <i className="fas fa-user text-primary"></i> {report?.author?.firstName} {report?.author?.lastName}
          </span>{" "}
          <span className="fs-inherit ms-3">
            <i className="fas fa-calendar text-warning me-1"></i> {timeago.format(report?.createdAt)}
          </span>
        </small>
      </div>
      {/* <p>{report?.title}</p> */}
      <div className="mb-2">{report?.content}</div>

      {comments?.map((comment: CRepComment, i: number) => (
        <CommentsComp key={i} comment={comment} />
      ))}

      <div className="comment-box mt-2">
        <ReactMde toolbarCommands={[]} maxEditorHeight={50} onChange={(d) => setContent(d)} value={content} />
        <div className="text-end">
          <button className="btn text-light btn-warning mt-2" onClick={handleSubmit}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentsComp = ({ comment }: { comment: CRepComment }) => {
  return (
    <CommentWrapper>
      <div className="comments text-break">
        <ReactMarkdown>{comment?.content}</ReactMarkdown>
        <small>
          {comment?.author?.firstName} {comment?.author?.lastName}{" "}
        </small>
        <small className="ms-2 fst-italic">{timeago.format(comment?.createdAt)}</small>
      </div>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  .comments {
    background-color: #e6f2bd;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const AddReportComp = ({ applicant_id, onAdd }: { applicant_id: string; onAdd(data: CReport): void }) => {
  const [content, setContent] = useState("");
  //   const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicant_id) return alert("Please provide the applicant_id");
    const payload = { content, applicant_id };

    try {
      const { data } = await axios.post("/report", payload);
      //   setTitle("");
      setContent("");
      onAdd(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactMde onChange={(d) => setContent(d)} value={content} toolbarCommands={[]} />
        <div className="mt-2 text-end">
          <button className="btn btn-warning text-light px-5">Make Report</button>
        </div>
      </form>
    </div>
  );
};
