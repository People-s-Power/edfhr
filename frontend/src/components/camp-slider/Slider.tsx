import { UserCampaignAtom } from "atoms/UserAtom";
import React from "react";
import Slider from "react-slick";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";
import * as timeago from "timeago.js";
import Link from "next/link";

const SwipeToSlide = (): JSX.Element => {
	const campaigns = useRecoilValue<ICampaign[]>(UserCampaignAtom);
	const setting = slideSettings(campaigns.length);

	return (
		<SlideCtrl>
			<div className="row row-cols-1 p-0 s-main mx-auto px-3">
				<Slider {...setting.data} className="p-0 m-0">
					{campaigns?.map((camp, i) => (
						<div className="col text-white s-main-col" key={i}>
							<div className="card px-0 bg-transparent mx-2 border-0 s-main-card">
								<div className="img-overlay p-3">
									<div className="inner">
										<img src={camp?.image} alt="" />
										{!camp.promoted ? (
											<Link href={`/promote?slug=${camp.slug}`}>
												<a className="btn btn-warning btn-sm  rounded-pill px-3 fw-bold">
													Promote
												</a>
											</Link>
										) : (
											<span className="btn btn-success btn-sm  rounded-pill px-3 fw-bold">
												Promoted <i className="fas fa-check"></i>
											</span>
										)}
									</div>
								</div>
								<div className="text-dark">
									<strong className="d-block">{camp?.title}</strong>

									<small className="mt-0 pt-0">
										<em>{timeago.format(camp?.createdAt)}</em>
									</small>
								</div>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</SlideCtrl>
	);
};

export default SwipeToSlide;
const SlideCtrl = styled.div`
	width: 100%;
	.s-main {
		&-col {
			.s-main-card {
				.img-overlay {
					.inner {
						width: 100%;

						img {
							position: relative;
							width: 100%;
							height: 15rem;
							/* height: 8rem; */
							object-fit: scale-down;
						}
						.btn {
							position: absolute;
							bottom: 30%;
							right: 20%;
						}
					}
				}
			}
		}
		.slick-slider {
			.slick-arrow {
				&::before {
					font-size: 1.5rem;
					border-radius: 100% !important;
					padding: 0 !important;
					margin: 0 !important;
				}
			}
		}
	}
`;

const slideSettings = (num: number) => {
	const data = {
		infinite: true,
		slidesToShow: num > 4 ? 4 : num,
		swipeToSlide: true,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: num > 3 ? 3 : num,
					slidesToScroll: 1,
					infinite: true,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: num > 2 ? 2 : num,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: num > 1 ? 2 : num,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 580,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		afterChange: function (index: number) {
			console.log(`Slider Changed to: ${index + 1}`);
		},
	};
	return {
		data,
	};
};
