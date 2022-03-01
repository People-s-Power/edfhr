import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, text: true },
    email: String,
    password: String,
    token: String,
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    state: { type: String, default: "" },
    target: { type: Number, default: 10 },
    position: { type: String, default: "Rep" },
    role: { type: String, default: "user" }, //State rep, reqional reps, suppervisor
    isActive: { type: Boolean, default: false },
    image: {
      type: String,
      default: "https://gravatar.com/avatar",
    },
    probono: { type: Boolean, default: false },
    account_number: { type: String, default: "" },
    bank: { type: String, default: "" },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
    applicants: [{ type: Schema.Types.ObjectId, ref: "Applicant" }],
    applicantCount: Number,
  },
  { timestamps: true, autoIndex: false }
);

UserSchema.index({ name: "text", position: "text" });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
