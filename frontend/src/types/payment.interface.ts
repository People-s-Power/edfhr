export enum PaymentPurposeEnum {
	CAMPAIGN = "Promote Campagin",
	APPLICANT_REGISTRATION = "New Applicant Registration",
}

export interface PaystackPaymentResponse {
	message: string;
	redirecturl: string;
	reference: string;
	status: string;
	trans: string;
	transaction: string;
	trxref: string;
}
