import { getApplicant } from "apollo/applicantsAction";
import { UserAtom } from "atom/UserAtom";
import UpdateAffidavitComp from "components/ApplicantComp/Affidavit/UpdateAffidavit";
import ExhibitsComp from "components/ApplicantComp/Exhibits";
import RelativesComp from "components/ApplicantComp/Relatives";
import UpdateApplicantComp from "components/ApplicantComp/UpdateApplicantComp";
import ViewDraftComp from "components/Draft/ViewDraft";
import Layout from "components/Layout";
import { NextPageContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { ApplicantProps } from "types/Applicant_types";
import { LAWYER } from "utils/constants";
import withAuth from "utils/withAuth";

const navList = [
	{ item: "Contact Details", disabled: false },
	{ item: "Exhibits", disabled: false },
	{ item: "Affidavit", disabled: false },
	{ item: "Contact Form", disabled: true },
	{ item: "Relatives Info", disabled: true },
];

const SingleApplicantPage = ({ props }): JSX.Element => {
	// const {applicant } = props;
	const [disabled, setDisabled] = useState(false);
	const [applicant, setApplicant] = useState<ApplicantProps>(null);
	const user = useRecoilValue(UserAtom);
	const { query } = useRouter();

	useEffect(() => {
		if (props?.applicant) {
			setApplicant(props.applicant);
		}
	}, []);

	useEffect(() => {
		if (process.browser) {
			if (user?.position === LAWYER) setDisabled(true);
		}
	}, []);

	if (!applicant) return <Loader center />;
	return (
		<Layout title="Applicant" title2="Single Applicant">
			<div className="single-applicant">
				<h4 className="heading">{applicant.name}</h4>
				<div className="my-2">
					<ul className="nav nav-tabs justify-content-center">
						{navList
							.filter((item) => (disabled ? !item.disabled : item))
							.map(({ item }, i) => (
								<li
									className="nav-item"
									key={i}
									// onClick={() => setView(item)}
									// active={view === item}
								>
									<Link href={`/applicants/${applicant?._id}?view=${item}`}>
										<a className="nav-link text-inherit">{item}</a>
									</Link>
								</li>
							))}
					</ul>
				</div>

				<div className="main-view">
					{query?.view === "Contact Details" && (
						<div className="card">
							<UpdateApplicantComp info={applicant} disabled={disabled} />
						</div>
					)}
					{!query?.view && (
						<div className="card">
							<UpdateApplicantComp info={applicant} disabled={disabled} />
						</div>
					)}
					{query?.view === "Exhibits" && (
						<ExhibitsComp applicant_id={applicant._id} />
					)}
					{query?.view === "Affidavit" && (
						<UpdateAffidavitComp applicant_id={applicant._id} />
					)}
					{query?.view === "Relatives Info" && (
						<RelativesComp applicant_id={applicant._id} />
					)}
					{query?.view === "Contact Form" && (
						<ViewDraftComp applicant={applicant} />
					)}
				</div>
			</div>
		</Layout>
	);
};

SingleApplicantPage.propTypes = {
	props: PropTypes.object,
	applicant: PropTypes.any,
};

export default withAuth(SingleApplicantPage);

SingleApplicantPage.getInitialProps = async (ctx: NextPageContext) => {
	try {
		const applicant = await getApplicant(ctx);
		return {
			props: {
				applicant,
			},
		};
	} catch (error) {
		console.log("From Error 3", error);
		return {
			props: {},
		};
	}
};
