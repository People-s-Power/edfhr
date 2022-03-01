import { gql } from "apollo-server-express";

export const TransactionTypes = gql`
  type Transaction {
    _id: ID
    user: User
    applicant: Applicant
    amount: Int
    currency: String
    transaction_date: Date
    status: String
    reference: String
    domain: String
    channel: String
    ip_address: String
    created_at: Date
    paid_at: Date
  }

  extend type Query {
    getTransactions: [Transaction]
    getTransaction(_id: ID): Transaction
  }

  extend type Mutation {
    verifyPayment(reference: String, user: ID, applicant: ID): Transaction
  }
`;
