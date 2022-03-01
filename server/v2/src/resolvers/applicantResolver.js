/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { pubSub } from "..";
import { Affidavit, Applicant, Exhibit, Relative } from "../models/Applicant";
import { authentication } from "../utils/authentication";
import { cloudinaryUpload } from "../utils/cloudinary";
import { handlePDF } from "../utils/createPdf";

const NEW_APPLICANT = "NEW_APPLICANT";
const UPDATED = "updated";
const DELETED = "deleted";
const ADDED = "added";
const PAYMENT = "made payment for";

const notifications = [];

export default {
  Query: {
    getApplicantSub: () => notifications,
    getApplicants: async (_, { search, limit, skip }) => {
      if (search) {
        try {
          let applicants = await Applicant.find()
            .sort({
              amount_paid: -1,
            })

            .populate("rep", "name _id")
            .populate("lawyer", "name _id");

          applicants = applicants.filter(
            (user) =>
              user._doc.name.toLowerCase().includes(search.toLowerCase()) ||
              user._doc.caseType.toLowerCase().includes(search.toLowerCase())
          );
          applicants = applicants.splice(skip || 0, limit || 15);
          return applicants;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          let applicants = await Applicant.find()
            .sort({
              amount_paid: -1,
            })

            .populate("rep", "name _id")
            .populate("lawyer", "name _id");
          applicants = applicants.splice(skip || 0, limit || 15);

          return applicants;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    getApplicant: async (_, { _id }) => {
      try {
        const applicant = await Applicant.findOne({ _id }).populate(
          "rep lawyer",
          "_id name"
        );
        const affidavit = await Affidavit.findOne({
          applicant_id: applicant._id,
        });

        return { ...applicant._doc, affidavit };
      } catch (error) {
        throw new Error(error);
      }
    },
    getExhibitsByApplicant: async (_, { applicant_id }) => {
      try {
        const exhibits = await Exhibit.find({ applicant_id });
        return exhibits;
      } catch (error) {
        throw Error(error);
      }
    },
    getRelativesByApplicant: async (_, { applicant_id }) => {
      try {
        const relative = await Relative.find({ applicant_id });
        return relative;
      } catch (error) {
        throw Error(error);
      }
    },
    getAffidavitByApplicant: async (_, { applicant_id }) => {
      try {
        const affidavit = await Affidavit.findOne({
          applicant_id,
        });
        return affidavit;
      } catch (error) {
        throw Error(error);
      }
    },
    countApplicants: async (_, { paid }) => {
      if (paid) {
        try {
          const applicants = await Applicant.countDocuments({
            amount_paid: { $gt: 10 },
          });
          return applicants;
        } catch (error) {
          throw Error(error);
        }
      } else {
        try {
          const applicants = await Applicant.countDocuments();
          return applicants;
        } catch (error) {
          throw Error(error);
        }
      }
    },
    getMyApplicants: async (_, { search }, { token }) => {
      const user = await authentication(token);

      if (search) {
        try {
          let applicants = await Applicant.find({
            $or: [{ rep: user._id }, { lawyer: user._id }],
          })
            .sort({
              amount_paid: -1,
            })
            .limit(10)
            .populate("rep", "name _id")
            .populate("lawyer", "name _id");

          applicants = applicants.filter((applicant) =>
            applicant._doc.name.includes(search)
          );
          return applicants;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          const applicants = await Applicant.find({
            $or: [{ rep: user._id }, { lawyer: user._id }],
          })
            .sort({
              amount_paid: -1,
            })

            .populate("rep", "name _id")
            .populate("lawyer", "name _id");

          return applicants;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    showDraft: async (_, { _id }) => {
      const affidavit = await Affidavit.findOne({
        applicant_id: _id,
      });
      const applicant = await Applicant.findById(_id);
      const { caseType } = applicant;
      if (caseType !== "A" && !affidavit)
        throw new Error("Please add affidavit");
      try {
        return {
          ...applicant._doc,
          affidavit,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addApplicant: async (_, { input }, context) => {
      const token = context.token;
      const user = await authentication(token);
      const contact_form = await cloudinaryUpload(input.contact_form).catch((err)=>{throw err});
      try {
        const applicant = await Applicant.create({
          ...input,
          rep: user._id,
          contact_form,
        });
        notifications.push({
          action: ADDED,
          _id: applicant._id,
          name: applicant.name,
          time: new Date(),
          user,
        });
        pubSub.publish(NEW_APPLICANT, {
          applicantSubscription: notifications,
        });
        return applicant;
      } catch (error) {
        throw new Error(error);
      }
    },
    assignToRep: async (_, { user_id, applicant_id }) => {
      try {
        let applicant = await Applicant.updateOne(
          {
            _id: applicant_id,
          },
          {
            rep: user_id,
          },
          { new: true }
        );

        applicant = await Applicant.findOne({ _id: applicant_id }).populate(
          "rep lawyer"
        );

        return applicant;
      } catch (error) {
        throw new Error(error);
      }
    },
    assignToLawyer: async (_, { user_id, applicant_id }) => {
      try {
        let applicant = await Applicant.updateOne(
          {
            _id: applicant_id,
          },
          {
            lawyer: user_id,
          },
          { new: true }
        );
        applicant = await Applicant.findOne({ _id: applicant_id }).populate(
          "rep lawyer"
        );
        return applicant;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteApplicant: async (_, { _id }, { token }) => {
      const user = await authentication(token);
      try {
        const applicant = await Applicant.findOneAndDelete({ _id });
        notifications.push({
          action: DELETED,

          name: applicant.name,
          time: new Date(),
          user,
        });
        pubSub.publish(NEW_APPLICANT, {
          applicantSubscription: notifications,
        });

        return applicant;
      } catch (error) {
        throw Error(error);
      }
    },
    addRelative: async (_, { input }) => {
      try {
        const rel = await Relative.create(input);
        return rel;
      } catch (error) {
        throw Error(error);
      }
    },
    updateRelative: async (_, { input }) => {
      try {
        let rel = await Relative.updateOne({ _id: input._id }, input, {
          new: true,
        });
        rel = await Relative.findOne({ _id: input._id });
        return rel;
      } catch (error) {
        throw Error(error);
      }
    },
    deleteRelative: async (_, { _id }) => {
      try {
        const rel = await Relative.findByIdAndDelete(_id);
        return rel;
      } catch (error) {
        throw Error(error);
      }
    },

    addAffidavit: async (_, { input }) => {
      const { applicant_id } = input;
      if (!applicant_id) throw Error("Please applicant_id");

      try {
        const affi = await Affidavit.create(input);

        return affi;
      } catch (err) {
        throw Error(err);
      }
    },

    updateAffidavit: async (_, { input }) => {
      try {
        let aff = await Affidavit.updateOne(
          { _id: input._id },
          { ...input },
          {
            new: true,
          }
        );
        aff = await Affidavit.findOne({ _id: input._id });

        return aff;
      } catch (error) {
        throw Error(error);
      }
    },
    addExhibit: async (_, { input }) => {
      if (!input.applicant_id) throw Error("Please add an applicant_id");
      const image = await cloudinaryUpload(input.image);
      try {
        const exhibit = await Exhibit.create({
          ...input,
          image,
        });
        return exhibit;
      } catch (error) {
        throw Error(error);
      }
    },
    uploadContactForm: async (_, { _id, file }) => {
      const contact_form = await cloudinaryUpload(file).catch((err)=>{throw err});
      try {
        const applicant = await Applicant.findOneAndUpdate(
          { _id },
          { contact_form },
          { new: true }
        );
        return applicant;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteExhibit: async (_, { _id }) => {
      try {
        const exhibit = await Exhibit.findByIdAndDelete({ _id });
        return exhibit;
      } catch (error) {
        throw Error(error);
      }
    },
    updateApplicantPayment: async (
      _,
      { applicant, amount_paid },
      { token }
    ) => {
      const user = await authentication(token);
      let app = await Applicant.findOne({ _id: applicant });
      if (!applicant) throw new Error("Applicant record not found");
      try {
        app = await Applicant.updateOne(
          { _id: app._id },
          { $set: { amount_paid: app.amount_paid + amount_paid / 100 } },
          { new: true }
        );
        app = await Applicant.findOne({ _id: applicant });
        notifications.push({
          action: PAYMENT,
          _id: applicant._id,
          name: applicant.name,
          time: new Date(),
          user,
        });
        pubSub.publish(NEW_APPLICANT, {
          applicantSubscription: notifications,
        });
        return app;
      } catch (error) {
        throw Error(error);
      }
    },
    updateApplicant: async (_, { input }, context) => {
      const token = context.token;
      const user = await authentication(token);
      try {
        let applicant = await Applicant.updateOne(
          { _id: input._id },
          { ...input, updated_by: user._id },
          { new: true }
        );
        applicant = await Applicant.findOne({ _id: input._id });
        notifications.push({
          action: UPDATED,
          _id: applicant._id,
          name: applicant.name,
          time: new Date(),
          user,
        });
        pubSub.publish(NEW_APPLICANT, {
          applicantSubscription: notifications,
        });
        return applicant;
      } catch (error) {
        throw Error(error);
      }
    },
    generatePdf: async (_, { _id }) => {
      let applicant = await Applicant.findById(_id);
      if (!applicant) throw new Error("Invalid aplicant _id");
      const affidavit = await Affidavit.findOne({
        applicant_id: _id,
      });
      if (!affidavit) throw new Error("Please update the affidavit");
      const draft = await handlePDF(applicant._doc, affidavit._doc);
      if (!draft) throw Error("Error");

      try {
        applicant = await Applicant.findOneAndUpdate(
          { _id },
          { draft },
          { new: true }
        );
        return applicant;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Subscription: {
    applicantSubscription: {
      subscribe: () => pubSub.asyncIterator([NEW_APPLICANT]),
    },
  },
};
