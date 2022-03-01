import { apolloStrapi } from "apollo";
import {
	GET_STRAPI_LAWYERS,
	GET_STRAPI_REPS,
	GET_STRAPI_SINGLE_CAMPAIGN,
	GET_STRAPI_TESTIMONIES,
} from "apollo/queries/strapiQuery";
import {
	Strapi_Lawyer,
	Strapi_Rep,
	Strapi_Single_Campaign,
	Strapi_Testimony,
} from "types/Applicant.types";

export const getStrapiReps = async (): Promise<Strapi_Rep[] | null> => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_STRAPI_REPS,
		});
		const reps: [] = data?.reps;

		return reps;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getStrapiLawyers = async (): Promise<Strapi_Lawyer[] | null> => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_STRAPI_LAWYERS,
		});
		const lawyers: [] = data?.lawyers;
		return lawyers;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getStrapiSingleCampaign =
	async (): Promise<Strapi_Single_Campaign | null> => {
		try {
			const { data } = await apolloStrapi.query({
				query: GET_STRAPI_SINGLE_CAMPAIGN,
			});

			const single: Strapi_Single_Campaign = data?.singleCampaign;
			return single;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

export const getStrapiTestimonies = async (): Promise<
	Strapi_Testimony[] | null
> => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_STRAPI_TESTIMONIES,
		});
		const testimonies = data?.testimonies;
		return testimonies;
	} catch (error) {
		console.log(error);
		return null;
	}
};
