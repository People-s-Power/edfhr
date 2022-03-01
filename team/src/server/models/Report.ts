import mongoose, { ObjectId, Schema } from "mongoose";
import { ApplicantProps, UserProps } from "types/Applicant_types";
// import { ApplicantProps, UserProps } from "../types/applicant.types";
// const Schema = mongoose.Schema;

export interface ReportProps extends Document {
  _id: ObjectId;
  author: UserProps;
  applicant_id: ApplicantProps;
  title: string;
  status: boolean;
  content: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface ReportCommentProps extends Document {
  _id: ObjectId;
  author: UserProps;
  content: string;
  status: boolean;
  report: ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

const ReportSchema: Schema = new Schema(
  {
    applicant_id: { type: Schema.Types.ObjectId, ref: "Applicant" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "" },
    status: { type: Boolean, default: false },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

const RepCommentSchema: Schema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
    status: { type: Boolean, default: false },
    report: { type: Schema.Types.ObjectId, ref: "Report" },
  },
  { timestamps: true }
);

export const Report =
  mongoose.models.Report || mongoose.model("Report", ReportSchema);
export const RepComment =
  mongoose.models.RepComment || mongoose.model("RepComment", RepCommentSchema);
