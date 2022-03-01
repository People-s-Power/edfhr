import React, { Fragment } from "react";
import FrontLayout from "layout/FrontLayout";
import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { apolloStrapi } from "apollo";
import gql from "graphql-tag";
import ReactMarkdown from "react-markdown";

interface IProps {
	terms: {
		body: string;
	};
}
const TermsAndConditionPage: NextPage<IProps> = ({
	terms,
}: IProps): JSX.Element => {
	return (
		<Fragment>
			<Head>
				<title>Terms And Conditions</title>
			</Head>
			<FrontLayout>
				<div className="terms container wrapper py-4">
					<ReactMarkdown>{terms?.body}</ReactMarkdown>
				</div>
			</FrontLayout>
		</Fragment>
	);
};

export default TermsAndConditionPage;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_TERMS,
		});

		const terms = data?.term;
		return {
			props: {
				terms,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				terms: null,
			},
		};
	}
};

const GET_TERMS = gql`
	{
		term {
			body
		}
	}
`;
