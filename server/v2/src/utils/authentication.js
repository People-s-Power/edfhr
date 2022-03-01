import jwt from "jsonwebtoken";
import User from "../models/User";
import config from "./config";

export const authentication = async (token) => {
  if (!token) throw new Error("No token provided");
  const data = jwt.verify(token.split(" ")[1], config.SECRET);
  if (data) {
    const user = await User.findOne({ _id: data._id }, { password: 0 });
    return user;
  }
};
