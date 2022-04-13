/* eslint-disable no-var */
import { useQuery } from "@apollo/client";
import { apollo } from "apollo";
import {
	GET_CAMPAIGN,
	GET_CAMPAIGNS,
	GET_ENDORSEMENTS_BY_CAMPAIGN,
} from "apollo/queries/campaignQuery";
import axios from "axios";
import { UserAtom } from "atoms/UserAtom";
import LoginModal from "components/auth/login/modal/LoginModal";
import { CampaignShareMenuList } from "components/campaign-comp/CampaignTable";
import EndorseCampaignComp from "components/campaign-comp/EndorseCampaignComp";
import Endorsements from "components/campaign-comp/Endorsements";
import FrontLayout from "layout/FrontLayout";
import {
	GetStaticPaths,
	GetStaticPathsResult,
	GetStaticProps,
	NextPage,
} from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import React, { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICampaign, IEndorsement } from "types/Applicant.types";
// const io = socket(SERVER_URL, {
// 	extraHeaders: {
// 		authorization: Cookies.get("token") || "",
// 	},
// });
const SingleCampaignPage: NextPage<{ camp: ICampaign }> = ({
	camp,
}: {
	camp: ICampaign;
}): JSX.Element => {
	const [endorsements, setEndorsements] = useState<IEndorsement[]>();
	const [isLiked, setIsLiked] = useState(false);
	const [showEndorsement, setShowEndorsement] = useState(false);
	const [showLogin, setShowLogin] = useState(false);

	const user = useRecoilValue(UserAtom);

	useQuery(GET_ENDORSEMENTS_BY_CAMPAIGN, {
		variables: { campaign_id: camp?.id },
		onCompleted: (data) => {
			setEndorsements(data.getEndorsementsByCampaign);
		},
		onError: (err) => console.log(err),
	});

	const handleLike = async () => {
		// io.emit("likeCampaign", { id: camp?.id });
		console.log("handlike");
	};

	const viewCamp = async () => {
		if(!user) return
		const data = {
			userId: user?.id
		}
		const res = await axios.put(`/campaign/viewCamp/${camp?.id}`, data)
		console.log(res)
	}

	useEffect(() => {
		if (camp?.likes?.includes(user?.id)) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
		viewCamp()
	}, [camp, user]);

	// useEffect(() => {
	// 	const test = async () => {
	// 		const { data } = await axios.get(`/campaign/session/${camp?.id}`);
	// 		console.log(data);
	// 	};
	// 	test();
	// 	// io.on("likeCampaign", (data) => setIsLiked(data));
	// }, []);

	return (
		<Fragment>
			<Head>
				<title>{camp?.title}</title>
				<meta name="description" content={camp?.body} />
			</Head>
			<FrontLayout>
				<Wrapper className="single-camp py-4 ">
					<LoginModal show={showLogin} onHide={() => setShowLogin(false)} />
					<div className="container inner py-2">
						<div className="">
							<main className="single-camp-wrap px-2 d-flex flex-column flex-md-row align-items-sm-start justify-content-sm-between">
								<div className="sec-1 pl-5 mb-5 left">
									<div className="top">
										<h1 className="m-0 p-0 text-warning fw-bold mb-3 fs-4">
											Explore Campaign
										</h1>
										<img
											src={camp?.image}
											alt={camp?.title}
											loading="lazy"
											className="camp-image mb-0"
										/>
										<div className="d-flex  share-like align-items-center">
											<a
												className={`btn rounded-circle me-5 like-btn 
                    ${isLiked ? "bg-sky text-primary" : "text-muted"}`}
												onClick={() => {
													user?.id !== camp?.author?.id && handleLike();
												}}
											>
												<i className="fas fa-thumbs-up small"></i>
											</a>

											<CampaignShareMenuList camp={camp}>
												<button className="btn p-0 px-0">
													<i className="fas fa-share small text-muted"></i>
												</button>
											</CampaignShareMenuList>
										</div>
									</div>
									<h3 className="mb-0 p-0 fw-bold m-0">{camp?.title}</h3>
									<p className="m-0 mt-2 fw-bold">
										{`Created by ${camp?.author?.firstName} ${camp?.author?.lastName}`}
									</p>
									<p className="mt-0">
										{Number(endorsements?.length) + 1} Endorsed
									</p>

									<ReactMarkdown className="fs-5">{camp?.body}</ReactMarkdown>

									{user && user?.id !== camp?.author?.id && (
										<button
											onClick={() => setShowEndorsement(true)}
											className="btn m-0 my-4 btn-warning text-white fw-bold px-4 py-2 rounded-pill"
										>
											Endorse Campaign
										</button>
									)}
									{!user && (
										<button
											className="btn m-0 my-4 btn-warning text-white fw-bold px-4 py-2 rounded-pill"
											onClick={() => setShowLogin(true)}
										>
											Endorse campaign
										</button>
									)}
									{showEndorsement && <EndorseCampaignComp camp={camp} />}
								</div>

								<aside className="sec-2 align-items-center flex-column d-flex right">
									{endorsements?.length ? (
										<p className="mb-4 bg-sky ps-1 py-2 fs-5 text-center rounded text-muted w-100 fw-bold">
											Endorsements
										</p>
									) : (
										<div className="px-3">
											<p className=" px-2 py-2 fs-5 text-center rounded text-muted w-100 px-2">
												Be the first to endorse this campaign
											</p>
										</div>
									)}
									<div className="mb-3 w-100">
										{endorsements?.map((endorsement, i) => (
											<Endorsements endorsement={endorsement} key={i} />
										))}
									</div>

									{endorsements && endorsements?.length > 5 && (
										<button className="btn btn-warning text-white fw-bold w-100 py-2">
											More reasons for endorsing
										</button>
									)}
								</aside>
							</main>
						</div>
					</div>
				</Wrapper>
			</FrontLayout>
		</Fragment>
	);
};

export default SingleCampaignPage;

const Wrapper = styled.div`
	.camp-image {
		width: 100%;
		max-height: 30rem;
		object-fit: cover;
	}
	.mde-textarea-wrapper {
		.mde-text {
			background-color: inherit;

			border: 0;
			outline: 0;
			-webkit-box-shadow: 0;
			-moz-box-shadow: 0;
			box-shadow: 0;
			resize: none;
		}
	}
`;

export const getStaticProps: GetStaticProps = async (ctx) => {
	try {
		const slug = ctx?.params?.slug;
		const { data } = await apollo.query({
			query: GET_CAMPAIGN,
			variables: { slug },
		});
		const camp = data?.getCampaign;

		return {
			props: {
				camp,
			},
			revalidate: 60,
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				camp: null,
			},
		};
	}
};

export const getStaticPaths: GetStaticPaths = async (): Promise<
	GetStaticPathsResult<ParsedUrlQuery>
> => {
	const { data } = await apollo.query({
		query: GET_CAMPAIGNS,
	});
	const campaigns: ICampaign[] = data?.getCampaigns;
	const paths = campaigns?.map((campaign) => ({
		params: { slug: campaign?.slug },
	}));
	return { paths, fallback: "blocking" };
};
