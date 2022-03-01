import PropTypes from "prop-types";
import React from "react";
import UpdateAffidavitComp from "./UpdateAffidavit";

const AffidaviComp = ({ applicant_id }) => {
  // const [view,setView] = useState("Update")
  return (
    <div>
      {/* <AddAffidavit applicant_id={applicant_id} /> */}
      <UpdateAffidavitComp applicant_id={applicant_id} />
    </div>
  );
};

AffidaviComp.propTypes = {
  applicant_id: PropTypes.any,
};

export default AffidaviComp;
