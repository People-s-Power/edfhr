import FrontLayout from "layout/FrontLayout";
import React, { Fragment } from "react";
import styled from "styled-components";
import Head from "next/head";
import { Strapi_Lawyer } from "types/Applicant.types";
import { GetStaticProps } from "next";
import { apolloStrapi } from "apollo";
import { GET_STRAPI_LAWYERS } from "apollo/queries/strapiQuery";
import UserCardComp from "components/user/UserCard";

const LawyersPage = ({ users }: { users: Strapi_Lawyer[] }): JSX.Element => {
	return (
		<Fragment>
			<Head>
				<title>Our Lawyers</title>
			</Head>
			<FrontLayout>
				<Wrapper className="mt-4 reps">
					<div className="container">
						<h1 className="text-center fw-bold mb-3 ">
							Our Legal Representatives
						</h1>
						<div className="card-wrapper">
							{users?.map((user, i) => (
								<UserCardComp user={user} key={i} />
							))}
						</div>
					</div>
				</Wrapper>
			</FrontLayout>
		</Fragment>
	);
};

export default LawyersPage;

const Wrapper = styled.div``;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_STRAPI_LAWYERS,
		});
		const users = data?.lawyers;
		return {
			props: {
				users,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				users: [],
			},
		};
	}
};
