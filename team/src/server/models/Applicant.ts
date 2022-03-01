import mongoose, { Schema } from "mongoose";

const ApplicantSchema: Schema = new Schema(
  {
    // Bio state
    name: String,
    email: String,
    phone: String,
    gender: String,
    image: String,
    address: String,
    state_origin: String,
    state_residence: String,
    lga: String,
    breach_type: String,
    //DetentionInfo
    inPrison: Boolean,
    daysPlus: Boolean,
    monthsPlus: Boolean,
    arrested_on: String,
    arrested_at: String,

    offence_suspected: String,
    case_mates: Number,
    itinerary: String,
    station: String,
    station2: String,
    station_duration: Number,
    station2_duration: Number,
    state_arrest: String,
    beaten: String,
    injured: String,
    bail_amount: Number,
    detention_cost_explained: String,
    first_accused: String,

    // Court Info
    offence_charged: String,
    arraigned_at: String,
    arraigned_on: String,
    state_arraigned: String,
    adjournment_date: Date,
    dpp: String,
    charge_no: { type: String, default: "" },
    division: String,

    caseType: String,
    app_id: String,
    amount_paid: { type: Number, default: 0 },
    rep: { type: Schema.Types.ObjectId, ref: "User" },
    lawyer: { type: Schema.Types.ObjectId, ref: "User" },
    print_ready: { type: Boolean, default: false },
    draft: String,
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
    deleted_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// ApplicantSchema.index({
//   "$**": "text",
// });

ApplicantSchema.index({
  name: "text",
  caseType: "text",
});

const RelativeSchema: Schema = new Schema({
  name: String,
  phone: String,
  rel: String,
  applicant_id: { type: Schema.Types.ObjectId, ref: "Applicant" },
});

const AffidavitSchema: Schema = new Schema({
  name: String,
  address: String,
  title: String,
  religion: String,
  occupation: String,
  rel: String,
  gender: String,
  applicant_id: { type: Schema.Types.ObjectId, ref: "Applicant" },
});

const ExhibitSchema = new Schema({
  name: String,
  image: String,
  applicant_id: { type: Schema.Types.ObjectId, ref: "Applicant" },
});

export const Applicant =
  mongoose.models?.Applicant || mongoose.model("Applicant", ApplicantSchema);

export const Relative =
  mongoose.models?.Relative || mongoose.model("Relative", RelativeSchema);

export const Affidavit =
  mongoose.models?.Affidavit || mongoose.model("Affidavit", AffidavitSchema);

export const Exhibit =
  mongoose.models?.Exhibit || mongoose.model("Exhibit", ExhibitSchema);
