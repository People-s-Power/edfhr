import { apolloStrapi } from "apollo";
import { GET_STRAPI_ABOUT } from "apollo/queries/strapiQuery";
import FrontLayout from "layout/FrontLayout";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
import { Strapi_About } from "types/Applicant.types";

interface IProps {
	about: Strapi_About;
}
const AboutPage: NextPage<IProps> = ({ about }: IProps): JSX.Element => {
	return (
		<Fragment>
			<Head>
				<title>About</title>
			</Head>
			<FrontLayout>
				<div className="about-wrap">
					<div className="who-we-are py-5">
						<div className="container _who-we-are mb-4">
							<h1 className="text-secondary  fs-1 fw-bold">Who we are</h1>

							<ReactMarkdown>{about?.who_we_are}</ReactMarkdown>
						</div>
					</div>
					{/* ---------------------------------------------- */}
					<div className="our-mission py-5 d-flex flex-column justify-content-center">
						<div className="container _our-mission">
							<div className="row mb-4 mission-wrap row-cols-1 row-cols-md-3 g-4">
								<div className="col mb-4 mission-card">
									<div className="card _mission-card ">
										<div className="card-img-top mission-img py-3">
											<img
												src="/images/campaign.svg"
												alt=""
												className="rounded-pill mx-auto d-block"
												width="190"
												height="190"
											/>
										</div>
										<div className="card-body  mission-title">
											<p className="card-title _mission-title text-center text-warning fs-4 fw-bold">
												We Inspire
											</p>
											<p className="card-text text-center ">
												We inspire people to cause a change in their local
												communities by influencing policy makers.
											</p>
										</div>
									</div>
								</div>
								<div className="col mb-4 mission-card">
									<div className="card _mission-card ">
										<div className="card-img-top mission-img py-3">
											<img
												src="/images/rehabilitate.svg"
												alt=""
												className="rounded-pill mx-auto d-block"
												width="190"
												height="190"
											/>
										</div>
										<div className="card-body  mission-title">
											<p className="card-title _mission-title text-center text-warning fs-4 fw-bold">
												We Campaign
											</p>
											<p className="card-text text-center ">
												We encourage one or group to launch a campaign for the
												change they want be it Social policy, Government
												policies, Environment, Empowerment, Health, Criminal
												justice and of course Human Right.
											</p>
										</div>
									</div>
								</div>
								<div className="col mb-4 mission-card">
									<div className="card _mission-card ">
										<div className="card-img-top mission-img py-3">
											<img
												src="/images/educate.svg"
												alt=""
												className="rounded-pill mx-auto d-block"
												width="190"
												height="190"
											/>
										</div>
										<div className="card-body  mission-title">
											<p className="card-title _mission-title text-center text-warning fs-4 fw-bold">
												We Advocate
											</p>
											<p className="card-text text-center ">
												With our Human Right gladiators we defend people whose
												fundamental rights have been infringed.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="our-vision py-5">
						<div className="_our-vision container">
							<div
								className="vision-goal mb-5 flex-column flex-sm-row align-items-sm-center text-white d-flex"
								style={{ gap: "1rem" }}
							>
								<div className="vision bg-secondary rounded-3 py-5  text-justify ">
									<div className="container">
										<h3 className=" text-center fw-bold  mb-3 ">Our Vision</h3>
										<p className=" text-center">{about?.vision}</p>
									</div>
								</div>
								<div className="goal bg-secondary rounded-3 py-5">
									<div className="container">
										<h3 className=" fw-bold text-center mb-3">Our Goal</h3>
										<p className=" text-center">{about?.goal}</p>
									</div>
								</div>
							</div>
							<div className="what-we-do d-flex flex-column flex-sm-row  mb-5 ">
								<div>
									<div className="what-we-do-txt bg-light h-100 d-flex align-items-center px-4 py-1">
										<div className="">
											<h3 className="mb-5 text-secondary fw-bold">
												WHY WE DO WHAT WE DO
											</h3>
											<ReactMarkdown className="lh-lg">
												{about?.what_we_do}
											</ReactMarkdown>
										</div>
									</div>
								</div>
								<img
									src={about?.what_we_do_image?.url}
									alt=""
									className="what-we-do-img"
								/>
							</div>
						</div>
					</div>
					{/* ------------------------------  */}
					<div className="last-layer py-5">
						<div className="container _last-layer">
							<img
								src="/images/begging-bridge-with-person-who-handed-bread_1150-22948.png"
								alt=""
								className="d-block w-100 mb-5"
								style={{ transform: "translateY(-20%)" }}
							/>
							<div className="bottom-card py-4 d-flex justify-content-center">
								<div className="_bottom-card">
									<div className="position-relative mb-3 img mx-auto rounded-circle">
										<img
											src="/images/Rectangle.png"
											alt=""
											className=" position-absolute"
										/>
									</div>
									<p className="text-center mb-3">
										“every criminal career began with a loss of self-respect.
										When man could no longer trust himself, only then did he
										become a real threat to the society”
									</p>
									<blockquote className="text-center fs-5 text-warning fw-bold">
										- L. Ron Hubbard
									</blockquote>
								</div>
							</div>
						</div>
					</div>
				</div>
			</FrontLayout>
		</Fragment>
	);
};

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data } = await apolloStrapi.query({
			query: GET_STRAPI_ABOUT,
		});
		const about = data?.about;

		return {
			props: {
				about,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				about: null,
			},
		};
	}
};
