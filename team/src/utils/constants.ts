export const LEGAL_WORLD = "LegalWorld"; // responsisble for lawyers
export const ADMIN = "Admin"; // Supper Admin
export const SUPPERVISOR = "Suppervisor"; // Responsible for reps
export const REP = "Rep";
export const LAWYER = "Lawyer";
export const DRAFT = "Draft";

// let SERVER_URL = "http://localhost:8000";

const prodURL = "https://server.edfhr.org/api/v2/graphql";
const devURL = "http://localhost:8000/api/v2/graphql";
const dockerURL = "http://backend:8000";
// export const SERVER_URL = prodURL;
export const HTTP_URI =
	process.env.NODE_ENV === "development" ? devURL : prodURL;

export const WS_URI =
	process.env.NODE_ENV !== "development"
		? "wss://server.edfhr.org/api/v2/graphql" || "ws://api.edfhr.org/api/graphql"
		: "ws://localhost:8000";
