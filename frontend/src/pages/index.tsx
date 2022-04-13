import { apollo } from "apollo";
import {
	getStrapiLawyers,
	getStrapiReps,
	getStrapiSingleCampaign,
	getStrapiTestimonies,
} from "apollo/actions/strapiAction";
import { GET_ACTIVE_CAMPAIGNS } from "apollo/queries/campaignQuery";
import CampaignBanner from "components/campaign-comp/CampaignBanner";
import CampCard from "components/home/CampCard";
// import LegalReprensentatives from "components/home/Representatives";
import Indexsvg from "components/icon/Indexsvg";
import Slider from "components/Slider";
import gql from "graphql-tag";
import FrontLayout from "layout/FrontLayout";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import { Zoom } from "react-reveal";
import styled from "styled-components";
import {
	ICampaign,
	Strapi_Lawyer,
	Strapi_Rep,
	Strapi_Single_Campaign,
	Strapi_Testimony,
} from "types/Applicant.types";
// import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();
// console.log(publicRuntimeConfig);

export const GET_CAMPAIGNS = gql`
	query ($limit: Int) {
		getCampaigns(limit: $limit) {
			title
			id
			slug
			image
			createdAt
			excerpt
			likes
		}
	}
`;

interface HomeProps {
	campaigns: ICampaign[];
	reps: Strapi_Rep[] | null;
	lawyers: Strapi_Lawyer[] | null;
	campaignBanner: Strapi_Single_Campaign | null;
	testimonies: Strapi_Testimony[] | null;
}

const HomePage: NextPage<HomeProps> = ({
	campaigns,
	campaignBanner,
	testimonies,
}: HomeProps): JSX.Element => {
	return (
		<FrontLayout>
			<Wrapper>
				<section className="index">
					<div className="container m-c _index d-flex py-3 flex-column-reverse flex-md-row align-items-md-center">
						<div className="_index-txt">
							<h1 className="  mb-3">
								The <span className=" fw-700 fs-48">World’s Technology</span>{" "}
								For <span className="fw-700 fs-48">People</span> facing{" "}
								<span className="fw-700 fs-48">Criminal</span> &{" "}
								<span className="fw-700 fs-48">Social Injustice</span>
							</h1>
							<p className="mb-5 fs-16">
								There is so much to campaign about: Social policy, Government
								decisions, Environment, Empowerment, Crime, Human Right etc.
							</p>
							<div
								className="btn-holder d-flex flex-wrap"
								style={{ gap: "1rem" }}
							>
								<Link href="/startcamp">
									<a className="btn btn-warning btn-lg rounded-pill px-4 py-2 text-light font-weight-bolder fs-20 ">
										Start Campaign
									</a>
								</Link>
								<Link href="/about">
									<button className="btn btn-lg border-warning font-weight-bold text-warning py-2 px-4 rounded-pill fs-20">
										Learn More
									</button>
								</Link>
							</div>
						</div>
						<Zoom>
							<div className="_index-img">
								<Indexsvg />
							</div>
						</Zoom>
					</div>
					<div className="second-row  d-flex align-items justify-content-around">
						{secondRowContent?.map((e, i) => (
							<SecondRowComp {...e} key={i} />
						))}
					</div>
				</section>
				<section className="camp-cards py-5">
					<div className="_camp-cards container">
						<p className="text-center fw-bold mb-5 fs-2"> Campaigns</p>
						<main>
							<div className="campaign-list">
								{campaigns?.length &&
									campaigns
										?.slice(0, 6)
										.map((camp, i) => <CampCard camp={camp} key={i} />)}
							</div>
							{campaigns && campaigns?.length > 6 && (
								<div className="d-flex justify-content-center mt-3">
									<Link href="/campaigns">
										<a className="btn border-warning text-warning font-weight-bolder px-4 py-2 rounded-pill">
											View More
										</a>
									</Link>
								</div>
							)}
						</main>
					</div>
				</section>
				{campaigns.some((c) => c.promoted) && (
					<section className="running-camp my-5 ">
						<p
							className="container fw-500 fs-18 mb-3 fs-2 "
							style={{ color: "#00401C" }}
						>
							Promoted Campaigns
						</p>
						<div className="py-2">
							<Marquee
								pauseOnHover={true}
								speed={50}
								delay={3}
								style={{ display: "flex" }}
							>
								{campaigns
									?.filter((c) => c.promoted)
									?.map((camp, i) => (
										<img
											src={camp?.image}
											alt=""
											key={i}
											width="200"
											height="160"
											className="mx-1 shadow"
										/>
									))}
							</Marquee>
						</div>
					</section>
				)}

				<h4 className="text-center event-title fs-3 fw-bold mb-5">
					Up-coming Events
				</h4>
				<CampaignBanner
					campaignBanner={campaignBanner as Strapi_Single_Campaign}
				/>

	
				<section className="py-5 community-saying">
					<div className="_community-saying container">
						<p className="text-center mb-5 fs-1 fw-bold">
							What the community says
						</p>
						<div className="container">
							<Slider testimonies={testimonies as Strapi_Testimony[]} />
						</div>
					</div>
				</section>
			</Wrapper>
		</FrontLayout>
	);
};

export default HomePage;

HomePage.getInitialProps = async (): Promise<HomeProps> => {
	const reps = await getStrapiReps();
	const lawyers = await getStrapiLawyers();
	const singleCamp = await getStrapiSingleCampaign();
	const testimonies = await getStrapiTestimonies();
	const getCampaigns = async () => {
		try {
			const { data } = await apollo.query({
				query: GET_ACTIVE_CAMPAIGNS,
				variables: { limit: 6 },
			});
			const campaigns = data?.getActiveCampaigns;
			// console.log(reps);
			return campaigns;
		} catch (error) {
			console.log(error);
			return null;
		}
	};
	return {
		reps,
		lawyers,
		campaigns: await getCampaigns(),
		campaignBanner: singleCamp,
		testimonies,
	};
};

const SecondRowComp = ({
	img,
	text1,
	text2,
	link,
}: {
	img: string;
	text1: string;
	text2: string;
	link?: string;
}): JSX.Element => {
	return (
		<div className="arrow second-row-cards">
			<div className="container _second-row-cards  d-flex flex-column flex-md-row align-items-center">
				<div>
					<img src={`/images/${img}`} alt="" />
				</div>
				<Link href={link || "/"} passHref>
					<div className="c-pointer d-flex flex-column align-items-md-start align-items-center">
						<span className="">{text1}</span>
						<b className="fs-5">{text2}</b>
					</div>
				</Link>
			</div>
		</div>
	);
};

const secondRowContent = [
	{
		img: "hands.svg",
		text1: "Download",
		text2: "Our Mobile App",
		link: "https://play.google.com/store/apps/details?id=com.gappsy.dashboard.www.android606daa4127835&hl=en",
	},
	{
		img: "donor.svg",
		text1: "Report",
		text2: "Human Right Abuse",
		link: "https://app.flowtrack.co/form/vaf5v8",
	},
	{
		img: "Bulls eye.svg",
		text1: "Become",
		text2: "A Staff",
		link: "https://team.edfhr.org/",
	},
];

const Wrapper = styled.div`
	.c-pointer {
		cursor: pointer;
	}
	.campaign-list {
		display: grid;
		gap: 1.5rem;

		@media screen and (min-width: 920px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and(min-width:768px) {
			grid-template-columns: repeat(2, 1fr);
		}

		.card {
			.card-image {
				width: 100%;
				height: 13rem;
				object-fit: cover;
			}
			transition: all 0.5s ease-in-out;
			&:hover {
				transform: scale(1.1, 1.1);
				box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
			}
		}
	}
	.orange {
		width: 100%;
		.btn {
			border: 3px solid orange;
		}
	}
`;
