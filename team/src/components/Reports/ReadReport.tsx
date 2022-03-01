import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ADD_REPCOMMENT,
  DELETE_REPORT,
  DELETE_REP_COMMENT,
  GET_REPORT,
} from "apollo/queries/reportQuery";
import { UserAtom } from "atom/UserAtom";
import { CustomError } from "components/users/RegisterComp";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ObjectId } from "mongoose";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
import { useRecoilValue } from "recoil";
import { Avatar, Loader } from "rsuite";
import { ReportCommentProps } from "server/models/Report";
import styled from "styled-components";
import { UserProps } from "types/Applicant_types";
import { ADMIN, REP } from "utils/constants";

dayjs.extend(relativeTime);

const ReadReportItem = ({ _id }: { _id: ObjectId }): JSX.Element => {
  const user = useRecoilValue(UserAtom);
  const [report, setReport] = useState(null);
  const [reply, setReply] = useState(false);
  const [comments, setComments] = useState<ReportCommentProps[]>([]);
  const [deleteReport] = useMutation(DELETE_REPORT);

  const [getReport, { data, loading }] = useLazyQuery(GET_REPORT, {
    onCompleted: () => {
      const result = data.getReport;
      const { comments, ...rest } = result;
      setComments(comments);
      setReport(rest);
    },
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    getReport({ variables: { _id } });
  }, [_id]);

  const handleAddComment = (data) => {
    // console.log(data);
    setComments([...comments, data]);
    setReply(false);
  };

  const handleDeleteReport = async () => {
    try {
      await deleteReport({
        variables: { _id: report._id },
      });
      alert("Deleted");
      setReport(null);
    } catch (error) {
      CustomError(error);
    }
  };
  const handleDeleteRepComment = (_id) => {
    setComments(comments.filter((comment) => comment._id !== _id));
    alert("Deleted");
  };

  if (loading) return <Loader content="Getting report" />;
  if (!report)
    return (
      <div className="text-center">
        <p>No report from the selected user</p>
      </div>
    );
  return (
    <div className="read-report">
      <div className="header-bar">
        <div className="d-md-flex justify-content-between">
          <div className="d-flex">
            <Avatar circle size="lg" src={report?.author?.image} />
            <div className="ml-2">
              <h6 className="mb-0">{report?.author?.name}</h6>
              <small className="d-block">{report?.applicant_id?.name}</small>
              <small className="d-block">
                <i className="fas fa-clock mr-1"></i>
                {dayjs(report?.createdAt).fromNow()}
              </small>
            </div>
          </div>
          <div className="mt-2 mt-md-0">
            {user?.position === ADMIN && (
              <button
                className="btn btn-sm text-danger"
                onClick={handleDeleteReport}
              >
                <i className="fas fa-trash"></i> Delete{" "}
              </button>
            )}
            <button
              className="btn btn-sm text-info "
              onClick={() => setReply(true)}
            >
              <i className="fas fa-reply mr-1"></i> Reply
            </button>
          </div>
        </div>
      </div>

      <div className="content mt-3 mb-5">
        <h6>{report?.title}</h6>
        <ReactMarkdown source={report?.content} />
      </div>
      {reply && (
        <div className="mt-3">
          <ReplyReport report={_id} onAdd={handleAddComment} />
        </div>
      )}
      <div className="my-3">
        {[...comments]
          .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1;
            else if (a.createdAt > b.createdAt) return -1;
            return 0;
          })
          .map((comment, i) => (
            <ReportComment
              onDelete={handleDeleteRepComment}
              comment={comment}
              key={i}
            />
          ))}
      </div>
    </div>
  );
};

ReadReportItem.propTypes = {
  _id: PropTypes.string,
};

export default ReadReportItem;

export const ReplyReport = ({
  report,
  onAdd,
}: {
  report: ObjectId;
  onAdd(data): void;
}): JSX.Element => {
  const [content, setContent] = useState("");
  const [addComment, { loading }] = useMutation(ADD_REPCOMMENT);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addComment({ variables: { report, content } });
      setContent(" ");
      onAdd(data?.addRepComment);
    } catch (error) {
      CustomError(error);
    }
  };
  return (
    <Wrapper className="reply-report">
      <form onSubmit={onSubmit}>
        <ReactMde value={content} onChange={setContent} toolbarCommands={[]} />
        <div className="text-right">
          <button className=" btn text-info" disabled={loading}>
            {loading ? <Loader /> : "Reply"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .mde-textarea-wrapper {
    .mde-text {
      height: 100%;
      /* max-height: 4rem; */
    }
  }
`;

export const ReportComment = ({ comment, onDelete }): JSX.Element => {
  const [deleteRepComment] = useMutation(DELETE_REP_COMMENT);
  const authUser = useRecoilValue<UserProps>(UserAtom);
  const handleDeleteRepComment = async () => {
    try {
      const { data } = await deleteRepComment({
        variables: { _id: comment._id },
      });

      onDelete(data.deleteRepComment._id);
    } catch (error) {
      CustomError(error);
    }
  };
  return (
    <CommentWrapper className="d-md-flex my-3">
      <div className="mr-2">
        <Avatar circle src={comment.author.image} />
      </div>
      <div className="report-comment bg-light rounded p-2">
        <div className="d-md-flex justify-content-between">
          <p className="m-0">{comment.author?.name}</p>
          {authUser?.position !== REP && (
            <button
              className="btn btn-sm text-danger"
              onClick={handleDeleteRepComment}
            >
              Delete
            </button>
          )}
        </div>
        <small>{dayjs(comment.createdAt).fromNow()}</small>

        <div className="mt-2 comment-box">
          <ReactMarkdown source={comment.content} />
        </div>
      </div>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  width: 100%;
  .comment-box {
    max-width: 100%;
  }
  .report-comment {
    width: inherit;
    max-width: 100%;
    p {
      word-break: break-all;
    }
  }
`;

ReportComment.propTypes = {
  comment: PropTypes.object,
  onDelete: PropTypes.func,
};
