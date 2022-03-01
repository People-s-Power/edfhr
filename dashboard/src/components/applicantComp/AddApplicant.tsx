import { IApplicant } from "types/Applicant.types";
import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Loader } from "rsuite";
// import { IApplicant } from "types/Applicant.types";
import { breaches, courtStates } from "utils/applicantUtils";
import { allStates } from "utils/states";

const AddApplicantComp = ({ onAdd }: { onAdd(data: IApplicant): void }): JSX.Element => {
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState<IApplicant>();
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name, type } = e.target;

    setInfo({
      ...(info as any),
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    // const { inPrison, monthsPlus, daysPlus } = info;
    const inPrison = info?.inPrison || false,
      monthsPlus = info?.monthsPlus || false,
      daysPlus = info?.daysPlus || false;

    const caseType = inPrison && monthsPlus ? "D" : inPrison && !monthsPlus ? "C" : !inPrison && daysPlus ? "B" : !inPrison && !daysPlus ? "A" : "";
    const payload = {
      ...info,
      monthsPlus,
      daysPlus,
      inPrison,
      caseType,
    };
    if (!info?.contact_form) return alert("Please upload your contact form");

    try {
      setLoading(true);
      const { data } = await axios.post("/applicant", payload);

      onAdd(data);
      alert("SUCCESS !");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <h5 className="heading">Add New Applicant</h5>

      <div className="mt-4">
        <div>
          {step === 0 && <BioData info={info as IApplicant} handleChange={handleChange} onNext={() => setStep(step + 1)} />}
          {step === 1 && (
            <CaseInfo
              info={info as IApplicant}
              handleChange={handleChange}
              setInfo={setInfo}
              onNext={handleSubmit}
              onPrev={() => setStep(step - 1)}
              loading={loading}
              setFile={(data: IApplicant) => setInfo({ ...(info as any), contact_form: data })}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

AddApplicantComp.propTypes = {
  onAdd: PropTypes.func,
};

export default AddApplicantComp;

const BioData = ({ info, handleChange, onNext }: { info: IApplicant; handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void; onNext(): void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="text-center d-block heading">Applicant Bio Data</label>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" name="name" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" onChange={handleChange} required className="form-control">
          <option value="">Select a gende</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="form-group">
        <label>State of Origin</label>
        <select name="state_origin" onChange={handleChange} className="form-control" required>
          {allStates.map(({ state }, i) => (
            <option key={i}>{state.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Local Government</label>
        <select onChange={handleChange} className="form-control" name="lga" required>
          {allStates.filter(({ state }) => state.name === info?.state_origin).map((state) => state.state.locals.map((local) => <option key={local.id}>{local.name}</option>))}
        </select>
      </div>
      <div className="form-group">
        <label>State of Residence</label>
        <select name="state_residence" onChange={handleChange} className="form-control" required>
          {allStates.map(({ state }, i) => (
            <option key={i}>{state.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Address</label>
        <input type="address" className="form-control" name="address" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Did the breach amount to any of the following</label>
        <select name="breach_type" onChange={handleChange} className="form-control" required>
          {breaches.map((item, i) => (
            <option key={i}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="text-center">
        <button className="btn btn-primary text-light mt-3 px-5">
          Next <i className="fas fa-arrow-right ml-1"></i>
        </button>
      </div>
    </form>
  );
};

BioData.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  info: PropTypes.object,
};

const CaseInfo = ({
  info,
  setFile,
  handleChange,
  onNext,
  onPrev,
  setInfo,
  loading,
}: {
  info: IApplicant;
  setFile(data: IApplicant): void;
  handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void;
  onNext(): void;
  onPrev(): void;
  setInfo(data: any): void;
  loading: boolean;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const reader = new FileReader();

    if (files && files?.length > 0) {
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setFile(reader.result as any);
      };
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="d-block text-center heading text-uppercase">Case Info</label>
      <div className="form-group">
        <label>Where is the Applicant</label>
        <select
          name="inPrison"
          className="form-control"
          onChange={(e) => {
            const value = e.target.value === "1";
            setInfo({
              ...info,
              inPrison: value,
            });
          }}>
          <option value=""></option>
          <option value={0}>In Police Detention</option>
          <option value={1}>In Prison custudy</option>
        </select>
      </div>
      <div className="form-group">
        <label>When Was the applicant arrested</label>
        <input type="date" name="arrested_on" onChange={handleChange} className="form-control" />
      </div>

      {!info.inPrison ? (
        <div className="form-group">
          <label>How long has the applicant been in police detention?</label>
          <select
            className="form-control"
            onChange={(e) => {
              const value = e.target.value === "1";
              setInfo({
                ...info,
                daysPlus: value,
              });
            }}>
            <option value=""></option>
            <option value={0}>Less than 24 Hours</option>
            <option value={1}>More than 24 Hours</option>
          </select>
        </div>
      ) : (
        <div className="form-group">
          <label>How long has the applicant been in Prison Custody?</label>
          <select
            className="form-control"
            onChange={(e) => {
              const value = e.target.value === "1";
              setInfo({
                ...info,
                monthsPlus: value,
              });
            }}>
            <option value=""></option>
            <option value={0}>Less than 3 Months</option>
            <option value={1}>More than 3 Months</option>
          </select>
        </div>
      )}
      <div className="form-group">
        <label>In which state was applicant arrested</label>
        <select name="state_arrest" onChange={handleChange} className="form-control" required>
          {allStates.map(({ state }, i) => (
            <option key={i}>{state.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Where was applicant arrested</label>
        <input type="text" name="arrested_at" onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>What is the offence suspected of ?</label>
        <input className="form-control" type="text" name="offence_suspected" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Does the applicant have a case mate ? if yes how many ?</label>
        <input className="form-control" type="number" name="case_mates" onChange={(e) => setInfo({ ...info, case_mates: Number(e.target.value) })} />
      </div>
      <div className="form-group">
        <label>Where was the applicant going/coming from before the arrest?</label>
        <input className="form-control" type="text" name="itinerary" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Name the police station taken to</label>
        <input className="form-control" type="text" name="station" onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>How many days did the applicant stay in police station ?</label>
        <input className="form-control" type="number" name="station_duration" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Was the applicant beaten/tortured? if Yes, briefly explain</label>
        <input className="form-control" type="text" name="beaten" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Did the applicant sustain any injuries ? if Yes, briefly explain</label>
        <input className="form-control" type="text" name="injured" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Was the applicant asked to pay some money for release ? if Yes, state the amount</label>
        <input className="form-control" type="number" name="bail_amount" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Did the detention casue any job loss or vocational displacement ? if Yes, explain</label>
        <input className="form-control" type="text" name="detention_cost_explained" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Name of the police station later transffered to if any</label>
        <input className="form-control" type="text" name="station2" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>How long did you stay there ?</label>
        <input className="form-control" type="number" name="station2_duration" onChange={handleChange} />
      </div>

      {info.inPrison && <CourtInfo info={info} handleChange={handleChange} />}
      <div className="form-group">
        <label>Upload Contact Form</label>
        <input type="file" className="form-control" onChange={handleFileChange} />
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-danger" disabled={loading} onClick={onPrev}>
          <i className="fas fa-arrow-left mr-1"></i> Prev
        </button>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? (
            <Loader content="processing..." />
          ) : (
            <span>
              Next <i className="fas fa-arrow-right ml-1"></i>{" "}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

CaseInfo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  setInfo: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setFile: PropTypes.func,
};

const CourtInfo = ({ info, handleChange }: { info: IApplicant; handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void }) => {
  return (
    <Fragment>
      <hr className="my-4" />
      <div>
        <label className="heading d-block text-center">Court Information</label>
        <div className="form-group">
          <label>Is the applicant waiting for DPP’s advice?</label>
          <select name="dpp" onChange={handleChange} className="form-control">
            <option value="">Select an option</option>
            <option>Yes</option>
            <option>No, But facing criminal trial </option>
            <option>No, already on bail</option>
          </select>
        </div>
        <div className="form-group">
          <label>When was the applicant arraigned?</label>
          <input className="form-control" type="date" name="arraigned_on" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>In which state was the applicant arraigned ?</label>
          <select name="state_arraigned" className="form-control" onChange={handleChange}>
            {courtStates.map(({ state }, i) => (
              <option key={i}>{state}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Select a judicial division</label>
          <select name="division" className="form-control" onChange={handleChange}>
            {courtStates.filter(({ state }) => state === info.state_arraigned).map(({ divisions }) => divisions?.map((item, i) => <option key={i}>{item.item}</option>))}
          </select>
        </div>
        <div className="form-group">
          <label>When was the last adjournment date?</label>
          <input className="form-control" type="date" name="adjournment_date" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>What is/are the offence(s) charged</label>
          <input className="form-control" name="offence_charged" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Name the first accused person</label>
          <input className="form-control" name="first_accused" onChange={handleChange} />
        </div>
      </div>
    </Fragment>
  );
};

CourtInfo.propTypes = {
  info: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
