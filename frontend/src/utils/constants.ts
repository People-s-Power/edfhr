export const TOKEN_NAME = "__ed_KEY";

export const SERVER_URL = 'http://localhost:8000'
	// process.env.NODE_ENV === "production"
	// 	? "https://edfhr.org"
	// 	: "http://localhost:8000";
export const HTTP_URI = `${SERVER_URL}/api/v3`;
export const BASEURL = process.env.BASE_URL || "http://localhost:3000";
export const STRAPI_URI = "https://cms.edfhr.org"
	// process.env.NODE_ENV !== "development"
		// ? "https://cms.edfhr.org"
		// : "http://localhost:8001";

export const WS_URI = SERVER_URL;
export enum CampaignMessage {
	Endorsed = "endorsed",
	Deleted = "deleted",
	Created = "created",
	Updated = "updated",
	liked = "liked",
	shared = "shared",
	unliked = "unliked",
	All = "all-campaign-notice",
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";

export enum IEnvironments {
	GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID",
	FX_ACCESS_KEY = "FX_ACCESS_KEY",
	PAYSTACK_PK = "PAYSTACK_PK",
}
