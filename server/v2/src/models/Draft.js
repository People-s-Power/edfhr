import { Schema, model, models } from "mongoose";

const DraftSchema = new Schema({
  notice: { type: String, default: "" },
  statement: { type: String, default: "" },
  address: { type: String, default: "" },
  affidavit: { type: String, default: "" },
  applicant_id: { type: Schema.Types.ObjectId, ref: "Applicant" },
});

export default models.Draft || model("Draft", DraftSchema);
