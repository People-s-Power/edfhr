/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import sgMail from "@sendgrid/mail";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { pubSub } from "..";
import { Applicant } from "../models/Applicant";
import { Report } from "../models/Report";
import User from "../models/User";
import { authentication } from "../utils/authentication";
import { cloudinaryUpload } from "../utils/cloudinary";
import config from "../utils/config";

// import { setToken } from "../utils/cookieUtils";
// import { pubSub } from "..";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const LOGGED_IN = "LOGGED_IN";
const BASE_URL = config.CLIENT_URL;

const templates = {
  email_confirmation: "d-e6354d2d510840cfa230f45b21dbb489",
};

export default {
  Query: {
    getUsers: async (_, { search, limit = 10, skip = 0 }, { host }) => {
      if (search) {
        try {
          let users = await User.find()
            .populate("admin", "_id name")
            .sort({ createdAt: -1 });

          users = users.filter((user) =>
            user._doc.name.toLowerCase().includes(search.toLowerCase())
          );

          users = users.map((user) => {
            const applicants = Applicant.find({
              $or: [{ rep: user._id }, { lawyer: user._id }],
            }).select("_id name");
            const reportCount = Report.countDocuments({ author: user._id });
            return {
              ...user._doc,
              applicants,
              reportCount,
            };
          });

          return users;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          let users = await User.find()
            .populate("admin", "_id name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

          users = users.map((user) => {
            const applicants = Applicant.find({
              $or: [{ rep: user._id }, { lawyer: user._id }],
            }).select("_id name");
            const reportCount = Report.countDocuments({ author: user._id });
            return {
              ...user._doc,
              applicants,
              reportCount,
            };
          });

          return users;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    getUser: async (_, { _id }, { token }) => {
      try {
        await authentication(token);
        const user = await User.findOne({ _id });
        const applicants = await Applicant.find({
          $or: [{ rep: user._id }, { lawyer: user._id }],
        });
        return {
          ...user._doc,
          applicants,
          target: user.target === 0 ? 10 : user.target,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    countUsers: async () => {
      try {
        const count = await User.countDocuments();
        return count;
      } catch (error) {
        throw new Error(error);
      }
    },
    countLawyers: async () => {
      try {
        const count = await User.countDocuments({ position: "Lawyer" });
        return count;
      } catch (error) {
        throw new Error(error);
      }
    },
    countPaidCases: async () => {
      try {
        const count = await Applicant.countDocuments({
          amount_paid: { $gte: 200 },
        });
        return count;
      } catch (error) {
        throw new Error(error);
      }
    },
    auth: async (_, args, { token }) => {
      if (!token) return null;
      const user = await authentication(token);
      try {
        if (!user) return null;
        const applicants = await Applicant.find({
          $or: [{ rep: user._id }, { lawyer: user._id }],
        });
        return {
          ...user._doc,
          applicants,
          target: user.target === 0 ? 10 : user.target,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    getLawyers: async (_, { search }) => {
      if (search) {
        try {
          let users = await User.find({ position: "Lawyer" })
            .populate("admin", "_id name")
            .sort({ createdAt: -1 });

          users = users.filter(
            (user) =>
              user._doc.name.toLowerCase().includes(search.toLowerCase()) ||
              user._doc.position.toLowerCase().includes(search.toLowerCase())
          );
          users = users.map((user) => {
            const applicants = Applicant.find({
              $or: [{ rep: user._id }, { lawyer: user._id }],
            }).select("_id name");
            const reportCount = Report.countDocuments({ author: user._id });
            return {
              ...user._doc,
              applicants,
              reportCount,
            };
          });

          return users;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          let users = await User.find({ position: "Lawyer" })
            .populate("admin", "_id name")
            .sort({ createdAt: -1 });

          users = users.map((user) => {
            const applicants = Applicant.find({
              $or: [{ rep: user._id }, { lawyer: user._id }],
            }).select("_id name");
            const reportCount = Report.countDocuments({ author: user._id });
            return {
              ...user._doc,
              applicants,
              reportCount,
            };
          });

          return users;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    getUserApplicants: async (_, { _id }) => {
      try {
        const applicants = await Applicant.find({
          $or: [{ rep: _id }, { lawyer: _id }],
        }).select("_id name amount_paid");
        return applicants;
      } catch (error) {
        throw new Error(error);
      }
    },
    getTopLawyers: async () => {
      try {
        let lawyers = await User.find({ position: "Lawyer" }).sort({
          applicantCount: -1,
        });
        lawyers = lawyers.map((lawyer) => {
          const applicant = Applicant.countDocuments({ lawyer: lawyer._id });
          return {
            ...lawyer._doc,
            applicantCount: applicant,
          };
        });

        return lawyers;
      } catch (error) {
        throw new Error(error);
      }
    },
    getMyUsers: async (_, { search }, { token }) => {
      const user = await authentication(token);
      if (search) {
        try {
          let users = await User.find({ admin: user._id })
            .populate("admin", "_id name")
            .sort({ createdAt: -1 })
            .limit(10);
          users = users.filter(
            (user) =>
              user._doc.name.toLowerCase().includes(search.toLowerCase()) ||
              user._doc.position.toLowerCase().includes(search.toLowerCase())
          );
          users = users.map((user) => {
            const applicants = Applicant.find({
              $or: [{ rep: user._id }, { lawyer: user._id }],
            }).select("_id name");
            const reportCount = Report.countDocuments({ author: user._id });
            return {
              ...user._doc,
              applicants,
              reportCount,
            };
          });

          return users;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          let users = await User.find({ admin: user._id })
            .populate("admin", "_id name")
            .sort({ createdAt: -1 })
            .limit(10);

          users = users.map((user) => {
            const applicants = Applicant.find({
              $or: [{ rep: user._id }, { lawyer: user._id }],
            }).select("_id name");
            const reportCount = Report.countDocuments({ author: user._id });
            return {
              ...user._doc,
              applicants,
              reportCount,
            };
          });

          return users;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const { name, email, password, username } = input;
      if (!email || !name || !password) throw new Error("Fill all input");
      let user = await User.findOne({ email });
      // user = await User.findOne({ username });
      if (user)
        throw new Error("User with same email or username already exist");
      try {
        const info = {
          ...input,
          username,
          email,
          name,
          password: await bcrypt.hash(password, 10),
          token: nanoid(4),
        };
        const mailOptions = {
          from: "support@edfhr.org",
          to: info.email,
          subject: "Please confirm your email",
          // html: `<h2 align="center">Thank you for registering with Joint Heirs Assembly</h2> <p>Please <a href="${BASE_URL}/verify/${info.token}">verify</a> your account to gain access to our platform</p> <p> or</> <p style="text-align:center;"> copy your verification code <b >${info.token}</b></p>`,
          templateId: templates.email_confirmation,
          dynamic_template_data: {
            verification_url: `${config.SERVER_URL}/api/v2/verify/${info.token}`,
            name: info.name,
          },
        };
        const data = await sgMail.send(mailOptions);
        if (data) {
          user = await User.create(info);
        }

        // user = await User.create(info);

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    login: async (_, { email, password }, { res }) => {
      if (!email || !password) throw new Error("Fill the email and password");
      const user = await User.findOne({ email });
      if (!user) throw new Error("No record found");
      const isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) throw Error("Incorrect password");
      const payload = {
        _id: user._id,
      };
      if (!user.isActive) {
        throw new Error("Your account is pending activation");
      }
      try {
        const token = jwt.sign(payload, config.SECRET, {
          expiresIn: "1d",
        });

        // res.cookie("token", token, {
        //   // expires: new Date(Date.now() + 8 * 360000),
        //   httpOnly: process.env.NODE_ENV === " production " ? true : false,
        //   secure: process.env.NODE_ENV === " production " ? true : false,
        //   sameSite: "Lax",
        // });

        pubSub.publish(LOGGED_IN, { loggedIn: user });
        return { user, token };
      } catch (error) {
        throw new Error(error);
      }
    },
    verifyToken: async (_, { token }) => {
      let user = await User.findOne({ token });
      if (!user) throw Error("Invalid token");
      try {
        user = await User.findByIdAndUpdate(
          user._id,
          {
            token: "",
            isActive: true,
          },
          { new: true }
        );
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    verifyEmail: async (_, { email }) => {
      let user = await User.findOne({ email });
      if (!user) throw Error("Email not in record");
      try {
        user = await User.findByIdAndUpdate(
          user._id,
          {
            token: nanoid(4),
          },
          { new: true }
        );
        const mailOptions = {
          from: "support@edfhr.org",
          to: email,
          subject: "Please confirm your email",
          // html: `<h2 align="center">Thank you for registering with Joint Heirs Assembly</h2> <p>Please <a href="${BASE_URL}/verify/${info.token}">verify</a> your account to gain access to our platform</p> <p> or</> <p style="text-align:center;"> copy your verification code <b >${info.token}</b></p>`,
          templateId: templates.email_confirmation,
          dynamic_template_data: {
            verification_url: `${config.SERVER_URL}/api/v2/forgot/${user.token}`,
            name: user.name,
            token: user.token,
          },
        };
        const data = await sgMail.send(mailOptions);
        if (data) return user;
      } catch (error) {
        throw Error(error);
      }
    },
    changePassword: async (_, { password, oldPassword }, context) => {
      const token = context.token;
      let user = await authentication(token);
      user = await User.findOne({ _id: user._id });
      const isMatch = await bcrypt.compareSync(oldPassword, user.password);
      if (!isMatch) throw Error("Incorrect password");
      try {
        user = await User.findOneAndUpdate(
          { _id: user._id },

          {
            password: bcrypt.hashSync(password, 10),
          }
        );
        user = await User.findOne({ _id: user._id });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        const user = await User.findOne({ _id });
        if (!user) throw new Error("No record found");

        user.remove();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser: async (_, { input }, { token }) => {
      let user = await authentication(token);
      if (!input) throw Error("NO data sent");

      try {
        user = await User.findOneAndUpdate({ _id: user._id }, input, {
          new: true,
        });

        // user = await User.findOne({ _id: input._id });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    activateUser: async (_, { _id }, { token }) => {
      await authentication(token);
      let user = await User.findOne({ _id });
      if (user.isActive) {
        try {
          user = await User.findOneAndUpdate(
            { _id },
            { isActive: false },
            { new: true }
          );
          return user.isActive;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          user = await User.findOneAndUpdate(
            { _id },
            { isActive: true },
            { new: true }
          );
          return user.isActive;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    changePosition: async (_, { _id, position }, context) => {
      const token = context.token;
      await authentication(token);
      try {
        let user = await User.updateOne(
          { _id },
          { $set: { position } },
          { new: true }
        );
        user = await User.findOne({ _id });
        return user;
      } catch (error) {
        throw Error(error);
      }
    },
    assignUser: async (_, { admin_id, user_id }) => {
      try {
        let user = await User.updateOne(
          { _id: user_id },
          { $set: { admin: admin_id } },
          { new: true }
        );
        user = await User.findOne({ _id: user_id }).populate("admin");
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
    uploadImage: async (_, { image }, { token }) => {
      const authUser = await authentication(token);
      const img = await cloudinaryUpload(image);
      try {
        const user = await User.findOneAndUpdate(
          { _id: authUser },
          { $set: { image: img } },
          { new: true }
        );
        // user = await User.findOne({ _id });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    loggedIn: {
      subscribe: (_, args, { pubSub }) => {
        return pubSub.asyncIterator(LOGGED_IN);
      },
    },
  },
};
