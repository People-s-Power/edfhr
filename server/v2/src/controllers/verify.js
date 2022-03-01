import express from "express";
import User from "../models/User";
import config from "../utils/config";
const router = express.Router();

router.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  if (!token) throw new Error("Invalid token");

  try {
    let user = await User.findOne({ token });
    const { _id } = user;
    await User.findByIdAndUpdate(
      _id,
      { token: "", isActive: true },
      { new: true }
    );

    res.redirect(config.CLIENT_URL);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;
