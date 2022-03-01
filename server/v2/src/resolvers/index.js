import applicantResolver from "./applicantResolver";
import reportResolvers from "./reportResolvers";
import userResolvers from "./userResolvers";

export default {
  Query: {
    ...userResolvers.Query,
    ...applicantResolver.Query,
    ...reportResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...applicantResolver.Mutation,
    ...reportResolvers.Mutation,
  },
  Subscription: {
    ...userResolvers.Subscription,
    ...applicantResolver.Subscription,
    ...reportResolvers.Subscription,
  },
};
