import User from "../models/User";
import { Applicant } from "../models/Applicant";
import * as express from "express";
import { authentication } from "../utils/authentication";
import jwt from "jsonwebtoken";
import config from "../utils/config";

const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json("No token provided");
  }
  try {
    const data = jwt.verify(token.split(" ")[1], config.SECRET);
    if (data) {
      const user = await User.findOne({ _id: data._id }, { password: 0 });
      const applicants = await Applicant.find({
        $or: [{ rep: user._id }, { lawyer: user._id }],
      });
      res.json({
        ...user._doc,
        applicants,
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

export default router;
