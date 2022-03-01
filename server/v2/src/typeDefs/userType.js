import { gql } from "apollo-server-express";

export const UserTypes = gql`
  type User {
    _id: ID
    name: String
    email: String
    position: String
    phone: String
    address: String
    state: String
    target: Int
    role: String
    isActive: Boolean
    image: String
    probono: Boolean
    account_number: String
    bank: String
    token: String
    applicants: [Applicant]
    admin: User
    reportCount: Int
    applicantCount: Int
  }

  type Token {
    token: String
    user: User
  }

  extend type Subscription {
    loggedIn: User!
  }

  extend type Query {
    # Users Query
    getUsers(search: String, limit: Int, skip: Int): [User]
    me(token: String): User
    auth: User
    getUser(_id: ID): User
    getLimitedUsers(limit: Int, skip: Int): [User]
    countUsers: Int
    countLawyers: Int
    countPaidCases: Int
    searchUsers(text: String): [User]
    getUserApplicants(_id: ID): [Applicant]
    getLawyers(search: String): [User]
    getTopLawyers: [User]
    getTopReps: [User]
    getMyUsers(search: String): [User]
  }

  extend type Mutation {
    # User Mutations
    signup(input: SignupInput): User
    login(email: String, password: String): Token
    updateUser(input: UserInput): User
    deleteUser(_id: ID): User
    verifyToken(token: String): User
    verifyEmail(email: String): User
    forgotPassword(token: String, password: String): User
    changePassword(oldPassword: String, password: String): User
    checkEmail(email: String): User
    changePosition(_id: ID!, position: String!): User
    assignContact(app_id: String, user_id: ID): Applicant
    assignUser(admin_id: ID, user_id: ID): User
    setTarget(target: Int, _id: ID): User
    uploadImage(image: String, _id: ID): User
    activateUser(_id: ID): Boolean
  }

  input UserInput {
    _id: ID
    name: String
    email: String
    password: String

    phone: String
    address: String
    state: String
    target: Int
    role: String
    position: String
    isActive: Boolean
    image: String
    probono: Boolean
    account_number: String
    bank: String
    token: String
  }

  input SignupInput {
    name: String
    email: String
    password: String
    position: String
  }
`;
