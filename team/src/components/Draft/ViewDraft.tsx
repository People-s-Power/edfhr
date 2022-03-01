import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { ApplicantProps } from "types/Applicant_types";

const ViewDraftComp = ({
	applicant,
}: {
	applicant: ApplicantProps;
}): JSX.Element => {
	return (
		<Fragment>
			<img src={applicant?.contact_form} width="600" className="w-100" />
		</Fragment>
	);
};

export default ViewDraftComp;

ViewDraftComp.propTypes = {
	applicant: PropTypes.object,
};
