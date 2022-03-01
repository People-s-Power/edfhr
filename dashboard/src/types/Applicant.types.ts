import { Document } from "mongoose";
export enum StaffRoleEnum {
  Admin = "Admin",
  Rep = "Rep",
  LegalWorld = "LegalWorld",
  Lawyer = "Lawyer",
  Draft = "Draft",
  Suppervisor = "Supervisor",
  Campaigner = "Campaigner",
  User = "User",
}

export enum AccountTypeEnum {
  Campaigner = "Campaigner",
  Staff = "Staff",
  Applicant = "Applicant",
  Contact = "Contact",
}

export interface IUser extends Document {
  _doc: any;
  name: string;
  accountType: AccountTypeEnum;
  image: string;
  firstName: string;
  lastName: string;
  otherName: string;
  email: string;
  password: string;
  phone: string;
  emailToken: string;
  emailVerified: boolean;
  isActive: boolean;
  role: StaffRoleEnum;
  address: string;
  reps: IUser[];
  supervisor: IUser;
  applicants: IApplicant[];
  reportCount: number;
  applicantCount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  country: string;
  state: string;
  city: string;
  lastSeen: Date;
}

export interface IApplicant extends Document {
  _doc: any;
  id: string;
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
  rep: IUser | string;
  lawyer: IUser | string;
  print_ready: boolean;
  contact_form: string;
  affidavit: IAffidavit;
}

export interface IAffidavit extends Document {
  _doc: any;
  name: string;
  address: string;
  title: string;
  religion: string;
  occupation: string;
  rel: string;
  gender: string;
  applicant_id: IApplicant | string;
}

export interface IRelative extends Document {
  _doc: any;
  name: string;
  phone: string;
  rel: string;
  applicant_id: IApplicant | string;
}

export interface IExhibit extends Document {
  name: string;
  image: string;
  applicant_id: IApplicant | string;
}

export interface IReport extends Document {
  _doc: any;
  applicant_id: IApplicant | string;
  author: IUser | string;
  title: string;
  status: boolean;
  content: string;
  createdAt: Date;
  comments: IRepComment[];
}

export interface IRepComment extends Document {
  _doc: any;
  author: IUser | string;
  content: string;
  status: boolean;
  report: IReport | string;
  createdAt: Date;
}

enum CampaignStatusEnum {
  Active = "Active",
  Pending = "Pending",
  Finished = "Finished",
  Draft = "Draft",
}

export interface ICampaign extends Document {
  _doc: any;
  title: string;
  video: string;
  image: string;
  aim: string;
  target: string;
  body: string;
  slug: string;
  status: CampaignStatusEnum;
  author: IUser;
  createdAt: Date;
  updatedAt: Date;
  addedFrom: string;
}
