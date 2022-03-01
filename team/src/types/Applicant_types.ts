import { Document, ObjectId } from "mongoose";

export interface UserProps extends Document {
  _doc: any;
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  password2?: string;
  token: string;
  phone: string;
  address: string;
  state: string;
  target: number;
  position: string;
  role: string; //State rep, reqional reps, suppervisor
  isActive: boolean;
  image: string;
  probono: boolean;
  account_number: number;
  bank: string;
  admin: UserProps;
  applicants: Array<ApplicantProps>;
}

export interface ApplicantProps extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  breach_type: string;
  inPrison: boolean;
  daysPlus: boolean;
  monthsPlus: boolean;
  arrested_on: string;
  arrested_at: string;
  arraigned_at: string;
  arraigned_on: string;
  offence_charged: string;
  offence_suspected: string;
  case_mates: number;
  itinerary: string;
  station: string;
  station2: string;
  station_duration: number;
  station2_duration: number;
  state_origin: string;
  state_residence: string;
  state_arrest: string;
  state_arraigned: string;
  adjournment_date: Date;
  charge_no: string;
  lga: string;
  image: string;
  beaten: string;
  injured: string;
  bail_amount: number;
  dpp: string;
  detention_cost_explained: string;
  caseType: string;
  app_id: string;
  division: string;
  first_accused: string;
  amount_paid: number;
  rep: UserProps;
  lawyer: UserProps;
  print_ready: boolean;
  contact_form: string;
}

export interface RelativeProps extends Document {
  name: string;
  phone: string;
  rel: string;
  applicant_id: ApplicantProps;
}

export interface AffidavitProps extends Document {
  name: string;
  address: string;
  title: string;
  religion: string;
  occupation: string;
  rel: string;
  gender: string;
  applicant_id: ApplicantProps;
}

export interface ExhibitProps extends Document {
  name: string;
  image: string;
  applicant_id: ApplicantProps;
}
