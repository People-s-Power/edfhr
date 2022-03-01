import gql from "graphql-tag";

export const ApplicantFragment = gql`
	fragment ApplicantFragment on Applicant {
		_id
		name
		email
		phone
		gender
		address
		breach_type
		inPrison
		daysPlus
		monthsPlus
		arrested_on
		arrested_at
		arraigned_at
		arraigned_on
		# affidavit {
		#   _id
		#   name
		#   address
		#   title
		#   religion
		#   occupation
		#   rel
		#   gender
		# }
		offence_charged
		offence_suspected
		case_mates
		itinerary
		station
		station2
		station_duration
		station2_duration
		state_origin
		state_residence
		state_arrest
		state_arraigned
		adjournment_date
		charge_no
		lga
		image
		beaten
		injured
		bail_amount
		dpp
		detention_cost_explained
		caseType
		app_id
		division
		first_accused
		amount_paid
		contact_form
		draft
		# relative {
		#   name
		#   _id
		#   phone
		# }

		rep {
			name
		}
		lawyer {
			name
		}
		# exhibit {
		#   _id
		#   name
		#   image
		# }
	}
`;

export const GET_APPLICANTS = gql`
	query ($search: String) {
		getApplicants(search: $search) {
			_id
			caseType
			name
			app_id
			amount_paid
			rep {
				name
				_id
			}
			lawyer {
				name
				_id
			}
		}
	}
`;

export const APPLICANT_SUBSCRIPTION = gql`
	subscription {
		applicantSubscription {
			action
			_id
			name
			user {
				name
				_id
				image
			}
			time
		}
	}
`;

export const GET_APPLICANT_SUBSCRIPTION = gql`
	{
		getApplicantSub {
			action
			_id
			name
			user {
				name
				_id
				image
			}
			time
		}
	}
`;

export const ADD_APPLICANT = gql`
	mutation AddApplicant($input: ApplicantInput) {
		addApplicant(input: $input) {
			name
			_id
		}
	}
`;

export const GET_APPLICANT = gql`
	query GetApplicant($_id: String) {
		getApplicant(_id: $_id) {
			...ApplicantFragment
		}
	}
	${ApplicantFragment}
`;
export const COUNT_APPLICANTS = gql`
	query {
		countApplicants(paid: false)
	}
`;

export const GET_MY_APPLICANTS = gql`
	query ($search: String) {
		getMyApplicants(search: $search) {
			_id
			caseType
			name
			app_id
			amount_paid
			rep {
				name
				_id
			}
			lawyer {
				name
				_id
			}
		}
	}
`;

export const UPDATE_APPLICANT = gql`
	mutation UpdateApplicant($input: ApplicantInput) {
		updateApplicant(input: $input) {
			...ApplicantFragment
		}
	}
	${ApplicantFragment}
`;

export const DELETE_APPLICANT = gql`
	mutation ($_id: ID) {
		deleteApplicant(_id: $_id) {
			name
			_id
		}
	}
`;

export const ADD_RELATIVE = gql`
	mutation AddRelative($input: RelativeInput) {
		addRelative(input: $input) {
			_id
			name
			phone
			applicant_id {
				_id
			}
		}
	}
`;

export const SHOW_DRAFT = gql`
	query ($_id: ID) {
		showDraft(_id: $_id) {
			...ApplicantFragment

			affidavit {
				name
				rel
				religion
				occupation
				address
				title
				gender
			}
		}
	}
	${ApplicantFragment}
`;

export const UPDATE_RELATIVE = gql`
	mutation UpdateRelative($input: RelativeInput) {
		updateRelative(input: $input) {
			_id
			name
			phone
			applicant_id {
				_id
			}
		}
	}
`;

export const DELETE_RELATIVE = gql`
	mutation DeleteRelative($_id: ID) {
		deleteRelative(_id: $_id) {
			name
			_id
		}
	}
`;

export const ADD_AFFIDAVIT = gql`
	mutation AddAffidavit($input: AffidavitInput) {
		addAffidavit(input: $input) {
			_id
			name
			address
			title
			religion
			occupation
			rel
			gender
		}
	}
`;

export const UPDATE_AFFIDAVIT = gql`
	mutation UpdateAffidavit($input: AffidavitInput) {
		updateAffidavit(input: $input) {
			_id
			name
			address
			title
			religion
			occupation
			rel
			gender
		}
	}
`;

export const ADD_EXHIBIT = gql`
	mutation AddExhibit($input: ExhibitInput) {
		addExhibit(input: $input) {
			_id
			name
			image
		}
	}
`;

export const DELETE_EXHIBIT = gql`
	mutation DeleteExhibit($_id: ID) {
		deleteExhibit(_id: $_id) {
			_id
			name
		}
	}
`;

export const GET_EXHIBITS = gql`
	{
		getExhibits {
			_id
			image
			name
			applicant_id {
				_id
			}
		}
	}
`;

export const GET_EXHIBITS_BY_APPLICANT = gql`
	query ($applicant_id: ID) {
		getExhibitsByApplicant(applicant_id: $applicant_id) {
			_id
			image
			name
			applicant_id {
				_id
			}
		}
	}
`;

export const GET_RELATIVES_BY_APPLICANT = gql`
	query ($applicant_id: ID) {
		getRelativesByApplicant(applicant_id: $applicant_id) {
			_id
			name
			phone
			applicant_id {
				_id
			}
		}
	}
`;

export const GET_AFFIDATIVE_BY_APPLICANT = gql`
	query ($applicant_id: ID) {
		getAffidavitByApplicant(applicant_id: $applicant_id) {
			_id
			name
			address
			title
			religion
			occupation
			rel
			gender
		}
	}
`;

export const MAKE_PAYMENT = gql`
	mutation ($applicant_id: ID, $amount: Int) {
		makePayment(applicant_id: $applicant_id, amount: $amount) {
			_id
		}
	}
`;

export const GET_APPLICANT_2 = gql`
	query GetApplicant($app_id: String) {
		getApplicant(app_id: $app_id) {
			...ApplicantFragment
			affidavit {
				_id
				name
				address
				title
				religion
				occupation
				rel
				gender
			}
		}
	}
	${ApplicantFragment}
`;

export const UPDATE_APPLICANT_PAYMENT = gql`
	mutation ($applicant: ID, $amount_paid: Int) {
		updateApplicantPayment(applicant: $applicant, amount_paid: $amount_paid) {
			amount_paid
			_id
		}
	}
`;

export const GENERATE_PDF = gql`
	mutation ($_id: ID) {
		generatePdf(_id: $_id) {
			draft
		}
	}
`;
