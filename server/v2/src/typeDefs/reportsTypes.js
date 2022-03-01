import { gql } from "apollo-server-express";

export const ReportTypes = gql`
  type Report {
    _id: ID
    title: String
    author: User
    createdAt: Date
    updatedAt: Date
    applicant_id: Applicant
    comments: [RepComment]
    content: String
    status: Boolean
  }

  type RepComment {
    _id: ID
    author: User
    title: String
    createdAt: Date
    updatedAt: Date
    report: Report
    content: String
  }

  type ReportPayload {
    report: ID
    time: Date
    user: User
    action: String
    author: ID
  }

  type ApplicantReport {
    applicant: Applicant
    report: Report
  }

  extend type Subscription {
    reportSubscription: [ReportPayload]
  }

  extend type Query {
    # Reports
    getReports: [Report]
    getReport(_id: ID): Report
    getRepComments: [RepComment]
    getRepCommentsByUser: [RepComment]
    getReportsByUser: [Report]
    getLawyersReport(user_id: ID): [Report]
    getUserReports(user_id: ID): [Report]
    getMyReports: [Report]
    getSuppervisorReport: [Report]
    getReportNoifcations: [ReportPayload]
    getApplicantsReport: [ApplicantReport]
  }

  extend type Mutation {
    # Reports Mutation
    addReport(input: ReportInput): Report
    deleteReport(_id: ID): Report
    resolveReport(_id: ID): Report
    addRepComment(report: ID!, content: String): RepComment
    deleteRepComment(_id: ID): RepComment
  }

  input ReportInput {
    _id: String
    title: String
    content: String
    status: Boolean
    applicant_id: ID
  }
`;
