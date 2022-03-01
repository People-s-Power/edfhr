import { gql } from "apollo-server-express";

export const ApplicantTypes = gql`
  type Applicant {
    _id: ID
    name: String
    email: String
    phone: String
    gender: String
    address: String
    breach_type: String
    inPrison: Boolean
    daysPlus: Boolean
    monthsPlus: Boolean
    arrested_on: String
    arrested_at: String
    arraigned_at: String
    arraigned_on: String
    offence_charged: String
    offence_suspected: String
    case_mates: Int
    itinerary: String
    station: String
    station2: String
    station_duration: Int
    station2_duration: Int
    state_origin: String
    state_residence: String
    state_arrest: String
    state_arraigned: String
    adjournment_date: Date
    charge_no: String
    lga: String
    image: String
    beaten: String
    injured: String
    bail_amount: Int
    dpp: String
    detention_cost_explained: String
    caseType: String
    app_id: String
    division: String
    rep: User
    lawyer: User
    affidavit: Affidavit
    relative: [Relative]
    exhibit: [Exhibit]
    first_accused: String
    amount_paid: Int
    print_ready: Boolean
    contact_form: String
    draft: String
    updated_by: User
    created_by: User
    deleted_by: User
    user: User
    time: Date
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }

  type Relative {
    _id: ID
    name: String
    phone: String
    rel: String
    applicant_id: Applicant
  }

  type Affidavit {
    _id: ID
    name: String
    address: String
    title: String
    religion: String
    occupation: String
    rel: String
    gender: String
    applicant_id: Applicant
  }

  type Exhibit {
    _id: ID
    name: String
    image: String
    applicant_id: Applicant
  }

  type Draft {
    statement: String
    notice: String
    address: String
    affidavit: String
    filePath: String
    applicant_id: ID
  }

  # type ApplicantPayload {
  #   name: String
  #   user: String
  #   time: Date
  # }

  type ApplicantSubscriptionPayload {
    action: String
    time: Date
    name: String
    user: User
    _id: ID
  }

  extend type Subscription {
    applicantSubscription: [ApplicantSubscriptionPayload]
  }

  extend type Query {
    # Applicant Query
    getApplicants(search: String, limit: Int, skip: Int): [Applicant]
    getApplicant(_id: String): Applicant
    getMyApplicants(search: String): [Applicant]
    countApplicants(paid: Boolean): Int
    getApplicantSub: [ApplicantSubscriptionPayload]
    showDraft(_id: ID): Applicant

    # Relative
    getRelatives: [Relative]
    getRelativesByApplicant(applicant_id: ID): [Relative]

    # Affidavit
    getAffidavits: [Affidavit]
    getAffidavitByApplicant(applicant_id: ID): Affidavit

    # Exhibit
    getExhibits: [Exhibit]
    getExhibitsByApplicant(applicant_id: ID): [Exhibit]
  }

  extend type Mutation {
    # Applicant Mutation
    addApplicant(input: ApplicantInput): Applicant
    updateApplicant(input: ApplicantInput): Applicant
    deleteApplicant(_id: ID): Applicant
    assignToLawyer(user_id: ID, applicant_id: ID): Applicant
    assignToRep(user_id: ID, applicant_id: ID): Applicant
    generatePdf(_id: ID): Draft
    uploadContactForm(_id: ID, file: String): Applicant

    # Affidavit Mutaion
    addAffidavit(input: AffidavitInput): Affidavit
    updateAffidavit(input: AffidavitInput): Affidavit

    # Exhibit Mutation
    addExhibit(input: ExhibitInput): Exhibit
    deleteExhibit(_id: ID): Exhibit

    # Relative Mutation
    addRelative(input: RelativeInput): Relative
    deleteRelative(_id: ID): Relative
    updateRelative(input: RelativeInput): Relative

    # Payment Update
    updateApplicantPayment(amount_paid: Int, applicant: ID): Applicant
  }
  input ExhibitInput {
    name: String
    image: String
    applicant_id: ID
  }

  input RelativeInput {
    _id: ID
    name: String
    phone: String
    rel: String
    applicant_id: ID
  }

  input AffidavitInput {
    _id: ID
    name: String
    address: String
    title: String
    religion: String
    occupation: String
    rel: String
    gender: String
    applicant_id: ID
  }

  input ApplicantInput {
    _id: ID
    name: String
    email: String
    phone: String
    gender: String
    address: String
    breach_type: String
    inPrison: Boolean
    daysPlus: Boolean
    monthsPlus: Boolean
    arrested_on: String
    arrested_at: String
    arraigned_at: String
    arraigned_on: String
    offence_charged: String
    offence_suspected: String
    case_mates: Int
    itinerary: String
    station: String
    station2: String
    station_duration: Int
    station2_duration: Int
    state_origin: String
    state_residence: String
    state_arrest: String
    state_arraigned: String
    adjournment_date: Date
    charge_no: String
    lga: String
    image: String
    beaten: String
    injured: String
    bail_amount: Int
    dpp: String
    detention_cost_explained: String
    caseType: String
    app_id: String
    division: String
    first_accused: String
    amount_paid: Int
    rep: ID
    lawyer: ID
    draft: String
    contact_form: String
  }

  input PaymentInput {
    applicant_id: ID
    user_id: ID
    email: String
    amount: Int
  }
`;
