/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { pubSub } from "..";
import { Applicant } from "../models/Applicant";
import { RepComment, Report } from "../models/Report";
import { authentication } from "../utils/authentication";

const NEW_REPORT = "NEW_REPORT";
const ADDED = "added new report";
const COMMENTED = "commented on a report";
const UPDATED = "updated a report";
const DELETED = "deleted a report";

const notifications = [];

export default {
  Query: {
    getReportNoifcations: () => notifications,
    getReports: async (_, args, { token }) => {
      // const user = await authentication(token);

      try {
        const reports = await Report.find()
          .limit(5)
          .populate("author applicant_id", "name _id")
          .sort({ updatedAt: -1 });

        return reports;
      } catch (error) {
        throw Error(error);
      }
    },
    getApplicantsReport: async (_, arg, { token }) => {
      const user = await authentication(token);
      try {
        const applicants = await Applicant.find({
          $or: [{ rep: user._id }, { lawyer: user._id }],
        });
        const result = applicants.map((applicant) => {
          const report = Report.findOne({ applicant_id: applicant._id });
          const res = {
            applicant,
            report,
          };
          // console.log(report);
          return res;
        });
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    getReport: async (_, { _id }) => {
      try {
        const report = await Report.findOne({ _id }).populate(
          "author applicant_id",
          "_id name image"
        );

        const comments = await RepComment.find({ report: report._id }).populate(
          "author applicant_id"
        );
        // .populate("author", "_id name image");
        return {
          ...report._doc,
          comments,
        };
      } catch (error) {
        throw Error(error);
      }
    },
    getUserReports: async (_, { user_id }) => {
      try {
        const reports = await Report.find({ author: user_id }).populate(
          "author applicant_id",
          "_id name image"
        );

        return reports;
      } catch (error) {
        throw Error(error);
      }
    },
    getMyReports: async (_, args, { token }) => {
      const author = await authentication(token);
      try {
        const reports = await Report.find({ author }).populate(
          "author applicant_id"
        );
        return reports;
      } catch (error) {
        throw Error(error);
      }
    },
    getRepComments: async () => {
      try {
        const comments = await RepComment.find();
        return comments;
      } catch (error) {
        throw Error(error);
      }
    },
    // No longer in use
    getRepCommentsByUser: async (_, arg, context) => {
      const token = context.token;
      const user = await authentication(token);
      try {
        const comments = await RepComment.find({ author: user._id });
        return comments;
      } catch (error) {
        throw Error(error);
      }
    },
    getReportsByUser: async (_, arg, context) => {
      const token = context.token;
      const user = await authentication(token);
      let applicants;
      if (user.position === "Lawyer") {
        applicants = await Applicant.find({ lawyer: user._id });
      } else if (user.position === "Rep") {
        applicants = await Applicant.find({ rep: user._id });
      } else if (user.position === "LegalWorld") {
        applicants = await Applicant.find({ amount_paid: { $gt: 100 } });
      } else {
        applicants = await Applicant.find();
      }
      try {
        let reports = await Report.find({
          applicant_id: { $in: applicants },
        }).populate("applicant_id");
        reports = reports.map((report) => {
          let comments = RepComment.find({ report })
            .populate("author")
            .sort({ createdAt: -1 });
          if (user.position === "Lawyer") {
            comments = RepComment.find({ report, author: user._id });
          }
          return {
            ...report._doc,
            comments,
          };
        });
        return reports;
      } catch (er) {
        throw new Error(er);
      }
    },

    // getLawyersReport: async (_,{user_id},{token}) => {
    //   const user = await authentication(token)

    //   try {
    //     const reports = await
    //   } catch (error) {

    //   }
    // }
  },
  Mutation: {
    addReport: async (_, { input }, context) => {
      const token = context.token;
      const user = await authentication(token);
      if (!user) throw Error("Unauthorized");
      try {
        let report = await Report.create({
          ...input,
          author: user._id,
        });
        report = await Report.findOne({ _id: report._id }).populate(
          "author applicant_id"
        );

        notifications.push({
          time: new Date(),
          action: ADDED,
          report: report._id,
          author: report.author._id,
          user,
        });
        pubSub.publish(NEW_REPORT, {
          reportSubscription: notifications,
        });

        return report;
      } catch (err) {
        throw Error(err);
      }
    },
    deleteReport: async (_, { _id }, { token }) => {
      const user = await authentication(token);
      try {
        const report = await Report.findOneAndDelete({ _id }).populate(
          "author"
        );
        await RepComment.deleteMany({ report: report._id });
        notifications.push({
          time: new Date(),
          action: DELETED,
          report: report._id,
          author: report.author._id,
          user,
        });
        pubSub.publish(NEW_REPORT, {
          reportSubscription: notifications,
        });
        return report;
      } catch (error) {
        throw Error(error);
      }
    },
    addRepComment: async (_, { content, report }, context) => {
      const token = context.token;
      const user = await authentication(token);
      const fullReport = await Report.findById(report).populate("author");
      try {
        let comment = await RepComment.create({
          content,
          report,
          author: user._id,
        });
        comment = await RepComment.findOne({ _id: comment._id }).populate(
          "author"
        );

        notifications.push({
          time: new Date(),
          action: COMMENTED,
          report: fullReport._id,
          author: fullReport.author._id,
          user,
        });
        pubSub.publish(NEW_REPORT, {
          reportSubscription: notifications,
        });

        return comment;
      } catch (error) {
        throw Error(error);
      }
    },
    deleteRepComment: async (_, { _id }) => {
      const comment = await RepComment.findOne({ _id });
      if (!comment) throw Error("Invalid ID");
      try {
        if (comment) comment.remove();
        return comment;
      } catch (error) {
        throw Error(error);
      }
    },
    resolveReport: async (_, { _id }) => {
      let report = await Report.findOne({ _id }).populate(
        "author applicant_id"
      );
      const author = report.author;
      const applicant_id = report.applicant_id;
      const comments = RepComment.find({ report });

      try {
        report = await Report.findOneAndUpdate(
          { _id },
          { status: !report.status },
          { new: true }
        );
        return { ...report._doc, author, comments, applicant_id };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    reportSubscription: {
      subscribe: () => pubSub.asyncIterator([NEW_REPORT]),
    },
  },
};
