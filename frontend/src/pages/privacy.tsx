import FrontLayout from "layout/FrontLayout";
import React, { Fragment } from "react";
import Head from "next/head";
import styled from "styled-components";
import { GetStaticProps, NextPage } from "next";
import { apolloStrapi } from "apollo";
import { gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

interface IProps {
	privacy: {
		body: string;
		id: string;
	};
}

const PrivacyPage: NextPage<IProps> = ({ privacy }: IProps): JSX.Element => {
	return (
		<Fragment>
			<Head>
				<title>Privacy</title>
			</Head>
			<FrontLayout>
				<Wrapper className="privacy-policy py-5">
					<div className="container">
						<ReactMarkdown>{privacy?.body}</ReactMarkdown>
					</div>
				</Wrapper>
			</FrontLayout>
		</Fragment>
	);
};

export default PrivacyPage;

const Wrapper = styled.div``;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_PRIVACY,
		});
		const privacy = data?.privacy;
		return {
			props: {
				privacy,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				privacy: null,
			},
		};
	}
};

const GET_PRIVACY = gql`
	{
		privacy {
			body
		}
	}
`;
