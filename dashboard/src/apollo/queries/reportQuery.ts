import gql from "graphql-tag";

const ReportFragment = gql`
	fragment ReportFragment on Report {
		_id
		createdAt
		updatedAt
		comments {
			_id
			content
			title
			author {
				name
				_id
			}
		}
		applicant_id {
			name
			_id
			amount_paid
		}
	}
`;

export const GET_REPORTS = gql`
	{
		getReports {
			_id
			updatedAt
			author {
				_id
				name
			}
			applicant_id {
				_id
				name
			}
			title
		}
	}
`;

export const GET_MY_REPORTS = gql`
	{
		getMyReports {
			_id
			updatedAt
			author {
				_id
				name
			}
			applicant_id {
				_id
				name
			}
			title
		}
	}
`;

export const GET_REPORT = gql`
	query GetReport($_id: ID) {
		getReport(_id: $_id) {
			_id
			createdAt
			title
			content
			comments {
				_id
				createdAt
				content
				author {
					_id
					name
					image
				}
			}
			author {
				_id
				name
				image
			}
			applicant_id {
				_id
				name
			}
		}
	}
`;

export const GET_USER_REPORTS = gql`
	query ($user_id: ID) {
		getUserReports(user_id: $user_id) {
			title
			_id
			content
			createdAt
			applicant_id {
				_id
				name
			}
			author {
				_id
				name
			}
		}
	}
`;

export const ADD_REPCOMMENT = gql`
	mutation ($report: ID!, $content: String) {
		addRepComment(report: $report, content: $content) {
			_id
			content

			author {
				_id
				name
				image
			}
		}
	}
`;

export const RESOLVE_REPORT = gql`
	mutation ($_id: ID) {
		resolveReport(_id: $_id) {
			...ReportFragment
		}
	}
	${ReportFragment}
`;

export const ADD_REPORT = gql`
	mutation ($input: ReportInput) {
		addReport(input: $input) {
			_id
			title
			content
			applicant_id {
				_id
				name
			}
		}
	}
`;

export const GET_REPCOMMENTS = gql`
	{
		getRepComments {
			_id
			title
			content
			updatedAt
		}
	}
`;

export const GET_APPLICANTS_REPORT = gql`
	query ($applicant_id: ID) {
		getApplicantsReport(applicant_id: $applicant_id) {
			title
			id
			createdAt
			content
			author {
				firstName
				lastName
			}
			comments {
				content
				# id
				createdAt
				author {
					firstName
					lastName
				}
			}
		}
	}
`;

export const GET_REPCOMMENTS_BY_USER = gql`
	{
		getRepCommentsByUser {
			_id
			title
			content
			updatedAt
		}
	}
`;

export const GET_REPORTS_USER = gql`
	{
		getReportsByUser {
			_id
			applicant_id {
				_id
				name
			}
			comments {
				_id
				title
				content
				updatedAt
				createdAt
				author {
					_id
					name
				}
			}
		}
	}
`;

export const DELETE_REPORT = gql`
	mutation ($_id: ID) {
		deleteReport(_id: $_id) {
			_id
		}
	}
`;

export const DELETE_REP_COMMENT = gql`
	mutation ($_id: ID) {
		deleteRepComment(_id: $_id) {
			_id
		}
	}
`;

export const REPORT_SUBSCRIPTION = gql`
	subscription {
		reportSubscription {
			report
			action
			author
			user {
				image
				name
			}
			time
		}
	}
`;

export const GET_REPORT_NOTICATIONS = gql`
	{
		getReportNoifcations {
			report
			action
			author
			user {
				image
				name
			}
			time
		}
	}
`;
