import gql from "graphql-tag";

export const UserFragment = gql`
  fragment UserFragment on User {
    _id
    name
    email
    phone
    address
    state
    target
    role
    isActive
    image
    position
    probono
    account_number
    bank
    applicants {
      _id
      name
      app_id
      amount_paid
    }
  }
`;

export const AUTH = gql`
  {
    auth {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export const GET_LIMITED_AUTH = gql`
  {
    auth {
      _id
      name
      position
      image
    }
  }
`;
export const GET_USERS = gql`
  query($search: String, $skip: Int, $limit: Int) {
    getUsers(search: $search, skip: $skip, limit: $limit) {
      _id
      name
      image
      role
      position
      isActive
      state
      reportCount
      applicants {
        _id
        name
      }
      admin {
        _id
        name
      }
    }
  }
`;
export const GET_LAWYERS = gql`
  query($search: String) {
    getLawyers(search: $search) {
      _id
      name
      image
      role
      position
      isActive
      state
      reportCount
      applicants {
        _id
        name
      }
      admin {
        _id
        name
      }
    }
  }
`;
export const GET_MY_USERS = gql`
  query($search: String) {
    getMyUsers(search: $search) {
      _id
      name
      image
      role
      position
      isActive
      state
      reportCount
      applicants {
        _id
        name
      }
      admin {
        _id
        name
      }
    }
  }
`;
export const GET_USER = gql`
  query($_id: ID) {
    getUser(_id: $_id) {
      ...UserFragment
    }
  }
  ${UserFragment}
`;

export const SIGNUP = gql`
  mutation($input: SignupInput) {
    signup(input: $input) {
      _id
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        name
        _id
        image
        token
      }
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation($token: String) {
    verifyToken(token: $token) {
      _id
      name
      email
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation($email: String) {
    verifyEmail(email: $email) {
      email
      _id
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UserInput) {
    updateUser(input: $input) {
      _id
      name
      image
    }
  }
`;

export const ASSIGN_CONTACT = gql`
  mutation($app_id: String, $user_id: ID) {
    assignContact(app_id: $app_id, user_id: $user_id) {
      _id
      name
      app_id
    }
  }
`;

export const SET_TARGET = gql`
  mutation($target: Int, $_id: ID) {
    setTarget(target: $target, _id: $_id) {
      _id
      target
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation($password: String, $oldPassword: String) {
    changePassword(password: $password, oldPassword: $oldPassword) {
      name
    }
  }
`;

export const ASSIGN_USER = gql`
  mutation($admin_id: ID, $user_id: ID) {
    assignUser(admin_id: $admin_id, user_id: $user_id) {
      _id
      position
      name
    }
  }
`;

export const UPLOAD_USER_IMAGE = gql`
  mutation($image: String, $_id: ID) {
    uploadImage(_id: $_id, image: $image) {
      _id
      image
    }
  }
`;

export const GET_LIMITED_USERS = gql`
  query($limit: Int, $skip: Int) {
    getLimitedUsers(limit: $limit, skip: $skip) {
      name
    }
  }
`;

export const COUNT_USERS = gql`
  {
    countUsers
  }
`;

export const COUNT_LAWYERS = gql`
  {
    countLawyers
  }
`;

export const COUNT_PAID_CASES = gql`
  {
    countPaidCases
  }
`;

export const GET_USER_APPLICANTS = gql`
  query($_id: ID) {
    getUserApplicants(_id: $_id) {
      _id
      name
    }
  }
`;
