import { GraphQLError } from "graphql";

export interface ErrorType {
  networkError: any;
  graphQLErrors: GraphQLError[] | any[];
}
