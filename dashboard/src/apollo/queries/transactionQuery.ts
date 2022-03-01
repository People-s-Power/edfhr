import gql from "graphql-tag";

export const VERIFY_PAYMENT = gql`
  mutation($reference: String, $user: ID, $applicant: ID) {
    verifyPayment(reference: $reference, user: $user, applicant: $applicant) {
      _id
      amount
      applicant {
        _id
        name
        amount_paid
      }
    }
  }
`;
