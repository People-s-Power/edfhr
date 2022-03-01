import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { breaches, courtStates } from "utils/applicantUtils";
import { allStates } from "utils/states";
import dayjs from "dayjs";
import { ApplicantProps } from "types/Applicant_types";
import { Loader } from "rsuite";
import { useMutation } from "@apollo/client";
import { UPDATE_APPLICANT } from "apollo/queries/applicantQuery";
import { CustomError } from "components/users/RegisterComp";

interface UpdateApplicantProps {
  info: ApplicantProps;
  disabled: boolean;
}

const UpdateApplicantComp = ({ info, disabled }): JSX.Element => {
  const [applicant, setApplicant] = useState(null);
  const [updateApplicant, { loading }] = useMutation(UPDATE_APPLICANT);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { value, name } = e.target;
    // eslint-disable-next-line
    setApplicant({
      ...applicant,
      [name]: value,
    });
  };

  useEffect(() => {
    if (info) {
      const { __typename, lawyer, rep, ...all } = info;
      setApplicant(all);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateApplicant({
        variables: { input: applicant },
      });
      if (data.updateApplicant) alert("SUCCESS");
      // console.log(data);
    } catch (error) {
      CustomError(error);
    }
  };

  if (!applicant) return <Loader center />;
  return (
    <div className="applicant-details">
      {loading && (
        <Loader center backdrop={true} content="Updating record" vertical />
      )}
      <FormWrapper onSubmit={handleUpdate}>
        <h5 className="heading">Contact Information</h5>
        <div className="form-row">
          <label className="col-md-7 m-0">Name</label>
          <input
            type="text"
            defaultValue={applicant.name}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="name"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">Gender</label>
          <select
            defaultValue={applicant.gender}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="gender"
          >
            <option defaultValue={applicant.gender}></option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">State of Origin</label>
          <select
            defaultValue={applicant.state_origin}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="state_origin"
          >
            {allStates.map(({ state }, i) => (
              <option defaultValue={applicant.state_origin} key={i}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">Local Government</label>
          <select
            defaultValue={applicant.lga}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="lga"
          >
            {allStates
              .filter(({ state }) => state.name === applicant.state_origin)
              .map((state) =>
                state.state.locals.map((local) => (
                  <option key={local.id} defaultValue={applicant.lga}>
                    {local.name}
                  </option>
                ))
              )}
          </select>
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">State of Residence</label>
          <select
            defaultValue={applicant.state_residence}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="state_residence"
          >
            {allStates.map(({ state }, i) => (
              <option defaultValue={applicant.state_residence} key={i}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">Address</label>
          <input
            type="text"
            defaultValue={applicant.address}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="address"
          />
        </div>
        <hr />
        <h5 className="heading">Case Information</h5>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Did the breach amount to any of the following
          </label>
          <select
            defaultValue={applicant.breach_type}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="breach_type"
          >
            {breaches.map(({ name }, i) => (
              <option defaultValue={applicant.breach_type} key={i}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">When was applicant arrested ?</label>
          <input
            type="date"
            defaultValue={applicant.arrested_on}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="arrested_on"
          />
        </div>
        {applicant.inPrison ? (
          <div className="form-row">
            <label className="col-md-7 m-0">
              Has the applicant stayed longer than 3 months in prison ?
            </label>
            <input
              defaultValue={applicant.monthsPlus.toString().toUpperCase()}
              onChange={handleChange}
              className="form-control col-md-5"
              disabled
              name="monthsPlus"
            />
          </div>
        ) : (
          <div className="form-row">
            <label className="col-md-7 m-0">
              Did the applicant stay longer than 24 hours in police detention ?
            </label>
            <input
              defaultValue={applicant.daysPlus.toString().toUpperCase()}
              onChange={handleChange}
              className="form-control col-md-5"
              disabled
              name="daysPlus"
            />
          </div>
        )}
        <div className="form-row">
          <label className="col-md-7 m-0">Where was applicant arrested ?</label>
          <input
            defaultValue={applicant.arrested_at}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="arrested_at"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            What is the offence suspected of ?
          </label>
          <input
            defaultValue={applicant.offence_suspected}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="offence_suspected"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Does the applicant have a case mate ? if yes how many ?
          </label>
          <input
            defaultValue={applicant.case_mates}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="case_mates"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Where was the applicant going/coming from before the arrest?
          </label>
          <input
            defaultValue={applicant.itinerary}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="itinerary"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Name the police station taken to
          </label>
          <input
            defaultValue={applicant.station}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="station"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            How many days did the applicant stay in police station ?
          </label>
          <input
            type="number"
            defaultValue={applicant.station_duration}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="station_duration"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Name of the police station later transffered to if any
          </label>
          <input
            defaultValue={applicant.station2}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="station2"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">How long did you stay there ?</label>
          <input
            defaultValue={applicant.station2_duration}
            type="number"
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="station2_duration"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Was the applicant beaten/tortured? if Yes, briefly explain
          </label>
          <input
            type="text"
            defaultValue={applicant.beaten}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="beaten"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Did the applicant sustain any injuries ? if Yes, briefly explain
          </label>
          <input
            type="text"
            defaultValue={applicant.injured}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled
            name="injured"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Was the applicant asked to pay some money for release ? if Yes,
            state the amount
          </label>
          <input
            type="number"
            defaultValue={applicant.bail_amount}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="bail_amount"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Did the detention casue any job loss or vocational displacement ? if
            Yes, explain?
          </label>
          <input
            type="number"
            defaultValue={applicant?.detention_cost_explained}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="detention_cost_explained"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Is the applicant waiting for DPP’s advice?
          </label>
          <select
            name="dpp"
            defaultValue={applicant.dpp}
            onChange={handleChange}
            disabled={disabled}
          >
            <option defaultValue={applicant.dpp}>Select an option</option>
            <option>Yes</option>
            <option>No, But facing criminal trial </option>
            <option>No, already on bail</option>
          </select>
        </div>
        <hr />
        <h5 className="heading"> Court Information </h5>
        <div className="form-row">
          <label className="col-md-7 m-0">
            When was the applicant arraigned?
          </label>
          <input
            type="date"
            defaultValue={applicant.arraigned_on}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="arraigned_on"
          />
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            Where was the applicant arraigned?
          </label>

          <select
            name="state_arraigned"
            defaultValue={applicant.state_arraigned}
            onChange={handleChange}
            disabled={disabled}
          >
            {courtStates.map(({ state }, i) => (
              <option defaultValue={applicant.state_arraigned} key={i}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">Judicary Division</label>

          <select
            name="division"
            defaultValue={applicant.division}
            onChange={handleChange}
            disabled={disabled}
          >
            {courtStates
              .filter(({ state }) => state === applicant.state_arraigned)
              .map(({ divisions }) =>
                divisions.map(({ item }, i) => (
                  <option defaultValue={applicant.division} key={i}>
                    {item}
                  </option>
                ))
              )}
          </select>
        </div>
        <div className="form-row">
          <label className="col-md-7 m-0">
            When was the last adjournmant date ?
          </label>
          <input
            type="date"
            defaultValue={dayjs(applicant.adjournment_date).format(
              "YYYY-MM-DD"
            )}
            onChange={handleChange}
            className="form-control col-md-5"
            disabled={disabled}
            name="adjournment_date"
          />
        </div>

        <div className="text-center">
          <button className="btn btn-sm btn-info" disabled={disabled}>
            {loading ? <Loader content="Updating record..." /> : "Update Info"}
          </button>
        </div>
      </FormWrapper>
    </div>
  );
};

const FormWrapper = styled.form`
  .form-row {
    margin-bottom: 1rem;
    input,
    select {
      border: none;
      background-color: white;
      /* width: inherit; */
    }
  }
`;

UpdateApplicantComp.propTypes = {
  info: PropTypes.any,
  disabled: PropTypes.bool,
};

export default UpdateApplicantComp;
