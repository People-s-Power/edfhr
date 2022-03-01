import { initializeApollo } from "apollo";
import { GET_REPORT } from "apollo/queries/reportQuery";
import Layout from "components/Layout";
import { ReplyReport, ReportComment } from "components/Reports/ReadReport";
import dayjs from "dayjs";
import { NextPageContext } from "next";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Avatar, Loader } from "rsuite";
import withAuth from "utils/withAuth";

const SingleReportPage = ({ report }) => {
  const [reply, setReply] = useState(false);
  const [comments, setComments] = useState(report?.comments);
  // const [deleteReport] = useMutation(DELETE_REPORT);
  const handleAddComment = (data) => {
    // console.log(data);
    setComments([...comments, data]);
    setReply(false);
  };

  const handleDeleteRepComment = (_id) => {
    setComments(comments.filter((comment) => comment._id !== _id));
    alert("Deleted");
  };
  if (!report) return <Loader center vertical content="awaiting report" />;
  return (
    <Layout title="Reports" title2={report?.title}>
      <div className="read-report theme-card mt-3">
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
              {/* <button
              className="btn btn-sm text-danger"
              onClick={handleDeleteReport}
            >
              <i className="fas fa-trash"></i> Delete{" "}
            </button> */}
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
            <ReplyReport report={report._id} onAdd={handleAddComment} />
          </div>
        )}
        <div className="my-3">
          {[...comments]
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((comment, i) => (
              <ReportComment
                onDelete={handleDeleteRepComment}
                comment={comment}
                key={i}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

SingleReportPage.propTypes = {
  report: PropTypes.object,
};

export default withAuth(SingleReportPage);

SingleReportPage.getInitialProps = async (ctx: NextPageContext) => {
  const apollo = initializeApollo(null, ctx);
  try {
    const { data } = await apollo.query({
      query: GET_REPORT,
      variables: { _id: ctx.query._id },
    });
    const report = data?.getReport;
    return {
      report,
    };
  } catch (error) {
    console.log(error);
    return {
      report: null,
    };
  }
};
