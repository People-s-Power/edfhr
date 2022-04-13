import { gql } from "@apollo/client";

export const GET_CAMPAIGN = gql`
	query ($slug: String) {
		getCampaign(slug: $slug) {
			title
			id
			target
			status
			body
			image
			createdAt
			likes
			slug
			author {
				id
				firstName
				lastName
				phone
				email
				country
			}
		}
	}
`;

export const GET_CAMPAIGNS = gql`
	{
		getCampaigns {
			title
			id
			excerpt
			slug
			image
			createdAt
			promoted
			endorsements {
				id
			}
		}
	}
`;
export const GET_ACTIVE_CAMPAIGNS = gql`
	{
		getActiveCampaigns {
			title
			id
			excerpt
			slug
			image
			createdAt
			promoted
			endorsements {
				id
			}
		}
	}
`;
export const GET_ENDORSEMENTS_BY_CAMPAIGN = gql`
	query ($campaign_id: ID) {
		getEndorsementsByCampaign(campaign_id: $campaign_id) {
			id
			createdAt
			body
			likes
			author {
				id
				image
				firstName
				lastName
			}
		}
	}
`;

export const MY_CAMPAIGN = gql`
	{
		myCampaign {
			id
			title
			createdAt
			image
			status
			slug
			promoted
			views
			endorsements {
				__typename
			}
		}
	}
`;

export const GET_CAMPIGN_NOTICE = gql`
	{
		getCampaignNotice {
			action
			createdAt
			author {
				id
				image
				firstName
			}
			data {
				title
				slug
			}
		}
	}
`;
