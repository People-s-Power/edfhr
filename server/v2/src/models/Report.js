import mongoose, { Schema } from "mongoose";
// const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    applicant_id: { type: Schema.Types.ObjectId, ref: "Applicant" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "" },
    status: { type: Boolean, default: false },
    content: { type: String, default: "" },
  },
  { timestamps: true }
);

const RepCommentSchema = new Schema(
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
