import { gql, useMutation } from "@apollo/client";
import { UserAtom } from "atoms/UserAtom";
import React, { useState } from "react";
import ReactMde from "react-mde";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { ICampaign } from "types/Applicant.types";

const CREATE_ENDORSEMENT = gql`
	mutation CreateEndorsement($input: EndorsementInput) {
		createEndorsement(input: $input) {
			id
			body
		}
	}
`;

const EndorseCampaignComp = ({ camp }: { camp: ICampaign }): JSX.Element => {
	const [body, setBody] = useState("");

	const user = useRecoilValue(UserAtom);

	const [addEndorsement, { loading, error: endorseError }] =
		useMutation(CREATE_ENDORSEMENT);

	const handleSubmit = async () => {
		if (!body) return;
		try {
			const { data } = await addEndorsement({
				variables: { input: { body, campaign: camp.id } },
			});
			console.log(data.createEndorsement);
			window.location.href = `/promote?slug=${camp.slug}`;
		} catch (error) {
			console.log(error);
			if (endorseError) {
				endorseError?.graphQLErrors?.map((err) => alert(err));
			}
		}
	};

	return (
		<section className="comment">
			<div className="card border-1 rounded-3">
				<div className="card-body">
					<div className="comment-profile d-flex flex-column align-items-sm-center flex-sm-row">
						<div className="comment-profile-img position-relative">
							<img src={user?.image} alt="" className="position-absolute" />
						</div>
						<div className="comment-profile-txt fw-bold text-muted">
							{user?.firstName} {user?.lastName}
						</div>
					</div>
					<hr />

					<ReactMde
						toolbarCommands={[]}
						value={body}
						onChange={(txt) => setBody(txt)}
					/>
					<div className="d-flex align-items-center justify-content-between">
						<small>Why do you endorse ?</small>
						<button
							className="fw-bold btn mb-3 text-primary pb-0 "
							onClick={handleSubmit}
							disabled={loading}
						>
							{loading ? <Loader content="Processing" /> : "Add a comment"}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EndorseCampaignComp;
