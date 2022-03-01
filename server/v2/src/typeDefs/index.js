import { makeExecutableSchema, gql } from "apollo-server-express";
import resolvers from "../resolvers";
import { ApplicantTypes } from "./applicantTypes";
import { ReportTypes } from "./reportsTypes";
import { UserTypes } from "./userType";

const typeDefs = gql`
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: [typeDefs, UserTypes, ReportTypes, ApplicantTypes],
  resolvers,
});
