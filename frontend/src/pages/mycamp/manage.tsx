import { gql, useQuery } from "@apollo/client";
import axios from "axios";
import FrontLayout from "layout/FrontLayout";
import Link from "next/link";
import React, { useState } from "react";
import { Loader } from "rsuite";
import styled from "styled-components";
import { ICampaign } from "types/Applicant.types";

const GET_CAMPAIGNS = gql`
	{
		getCampaigns {
			title
			id
			slug
			target
			aim
			status
			createdAt
			endorsements {
				id
			}
			author {
				firstName
				lastName
				id
			}
		}
	}
`;

const ManageCampaignPage = (): JSX.Element => {
	const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

	const { loading } = useQuery(GET_CAMPAIGNS, {
		onCompleted: (data) => {
			setCampaigns(data.getCampaigns);
		},
		onError: (error) => console.log(error),
	});

	const deleteCampaign = async (id: string) => {
		console.log(id);
		const confirmed = confirm("Do you want to delete campaign ?");
		if (!confirmed) return;

		try {
			await axios.delete(`/campaign/single/${id}`);
			setCampaigns(campaigns.filter((camp) => camp.id !== id));
			alert("Deleted");
		} catch (error) {
			console.log(error);
		}
	};

	const approveCampaign = async (id: string) => {
		try {
			const { data } = await axios.post("/campaign/approve", {
				campaign_id: id,
			});

			setCampaigns(
				campaigns.map((camp) =>
					camp.id === id ? { ...(camp as any), status: data?.status } : camp,
				),
			);

			alert("Updated");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FrontLayout>
			<Wrapper className="container ">
				<div className="campaign-page">
					<h1 className="text-center fs-3 mb-5 mt-3">Mange campaign</h1>
					{loading ? (
						<div className="text-center">
							<Loader className="text-center" content="fetching campaigns..." />
						</div>
					) : (
						<div className="campaign-table">
							<table className="table">
								<thead>
									<th>Title</th>
									<th>Author</th>
									<th>Target</th>
									<th>Aim</th>
									<th>Actions</th>
								</thead>
								<tbody>
									{campaigns?.map((campaign, i) => (
										<tr key={i}>
											<td>
												<i
													className={`fas fa-dot-circle me-2 ${
														campaign?.status === "Pending"
															? "text-warning"
															: "text-success"
													}`}
												></i>
												<Link href={`/campaigns/${campaign?.slug}`}>
													<a className="text-decoration-none">
														{campaign?.title}
													</a>
												</Link>
											</td>
											<td>
												{campaign?.author?.firstName}{" "}
												{campaign?.author?.lastName}
											</td>
											<td>{campaign?.target}</td>
											<td>{campaign?.aim}</td>
											<td>
												<div className="dropdown">
													<button
														className="btn btn-sm p-0"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														<i className="fas fa-ellipsis-v"></i>
													</button>
													<ul className="dropdown-menu">
														<li onClick={() => approveCampaign(campaign?.id)}>
															<a className="dropdown-item c-hand">
																{campaign?.status === "Pending"
																	? "Approve"
																	: "Pend"}
															</a>
														</li>

														<li onClick={() => deleteCampaign(campaign?.id)}>
															<a className="dropdown-item c-hand text-danger">
																Delete
															</a>
														</li>
													</ul>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</Wrapper>
		</FrontLayout>
	);
};

export default ManageCampaignPage;

const Wrapper = styled.div``;
