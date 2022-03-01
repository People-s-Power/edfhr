import { ApplicantsAtom } from "atoms/ApplicantsAtom";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Steps } from "rsuite";
import { IApplicant, IRelative } from "types/Applicant.types";
import useQueryParam from "utils/useQueryParam";
import AddAffidavit from "./AddAffidavit";
import AddApplicant from "./AddApplicant";
import AddRelative from "./AddRelative";
import { SingleRelative } from "./RelativesComp";

const ApplicantSteps = ({ onCancel }: { onCancel(): void }): JSX.Element => {
  const [applicants, setApplicants] = useRecoilState<IApplicant[] | any>(ApplicantsAtom);
  // const [applicant_id, setApplicant_id] = useState("");

  const [relatives, setRelatives] = useState<IRelative[]>([]);

  const query = useQueryParam();
  const history = useHistory();
  const step = Number(query.get("step"));
  const applicant_id = query.get("applicant_id") as string;

  const handleAddApplicant = (data: IApplicant) => {
    setApplicants([...applicants, data]);
    history.push(`/applications?call=add&applicant_id=${data.id}&step=1`);
  };

  return (
    <Fragment>
      <div className="my-4">
        <div className="text-end mb-2">
          <button className="btn btn-outline-danger" disabled={Boolean(applicant_id)} onClick={() => onCancel()}>
            Cancel
          </button>
        </div>
        <Steps current={step} currentStatus="process">
          <Steps.Item />
          <Steps.Item />
          <Steps.Item />
        </Steps>
      </div>
      {step === 0 && <AddApplicant onAdd={handleAddApplicant} />}
      {step === 1 && <AddAffidavit applicant={applicant_id} onAdd={() => history.push(`/applications?call=add&applicant_id=${applicant_id}&step=2`)} />}
      {step === 2 && (
        <div>
          <div className="mb-5">
            <h6 className="heading text-right">Add Relative</h6>
            <AddRelative applicant_id={applicant_id} onAdd={(data: IRelative) => setRelatives([...relatives, data])} />
          </div>
          {relatives.map((relative: IRelative, i: number) => (
            <SingleRelative onDelete={() => setRelatives(relatives.filter((r) => r._id !== relative._id))} relative={relative} key={i} />
          ))}
          {relatives.length >= 1 && (
            <div className="text-center">
              <button className="btn btn-success" onClick={() => history.push(`/applications/${applicant_id}`)}>
                DONE
              </button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ApplicantSteps;

// export const AddAffidavit = ({
// 	applicant_id,
// 	onAdd,
// }: {
// 	applicant_id: string;
// 	onAdd(): void;
// }): JSX.Element => {
// 	const [loading, setLoading] = useState(false);

// 	const [info, setInfo] = useState({
// 		name: "",
// 		address: "",
// 		title: "",
// 		religion: "",
// 		occupation: "",
// 		rel: "",
// 		gender: "",
// 	});
// 	const handleChange = (
// 		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
// 	) => {
// 		const { name, value } = e.target;
// 		setInfo({
// 			...info,
// 			[name]: value,
// 		});
// 	};
// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		setLoading(true);
// 		if (!applicant_id) return alert("No applicant selected");
// 		const payload = {
// 			...info,
// 			applicant_id,
// 		};
// 		try {
// 			const { data } = await axios.post("/affidavit", payload);
// 			alert("SUCCESS");
// 			setLoading(false);
// 			console.log(data);
// 			onAdd();
// 		} catch (error) {
// 			console.log(error);
// 			setLoading(false);
// 		}
// 	};
// 	return (
// 		<div className="affidavit-form">
// 			<h4 className="heading">Update Deponent Information</h4>
// 			<form className="form" onSubmit={handleSubmit}>
// 				<div className="form-group">
// 					<label>Name </label>
// 					<input
// 						type="text"
// 						className="form-control"
// 						value={info.name}
// 						onChange={handleChange}
// 						name="name"
// 					/>
// 				</div>
// 				<div className="form-group">
// 					<label>Gender</label>
// 					<select
// 						className="form-control"
// 						onChange={handleChange}
// 						value={info.gender}
// 						name="gender"
// 					>
// 						<option value=""></option>
// 						<option value="male">Male</option>
// 						<option value="female">Female</option>
// 					</select>
// 				</div>
// 				<div className="form-group">
// 					<label>Title</label>
// 					<select
// 						className="form-control"
// 						onChange={handleChange}
// 						value={info.title}
// 						name="title"
// 					>
// 						<option value=""></option>
// 						<option>Mr</option>
// 						<option>Mrs</option>
// 						<option>Pastor</option>
// 						<option>Imam</option>
// 						<option>Dr</option>
// 						<option>Engineer</option>
// 						<option>Chief</option>
// 						<option>Elder</option>
// 					</select>
// 				</div>
// 				<div className="form-group">
// 					<label>Religion</label>
// 					<select
// 						className="form-control"
// 						value={info.religion}
// 						name="religion"
// 						onChange={handleChange}
// 					>
// 						<option value=""></option>
// 						<option>Christian</option>
// 						<option>Islam</option>
// 						<option>Traditionalist</option>
// 						<option>Duddist</option>
// 						<option>Others</option>
// 					</select>
// 				</div>

// 				<div className="form-group">
// 					<label>Occupation</label>
// 					<select
// 						className="form-control"
// 						value={info.occupation}
// 						name="occupation"
// 						onChange={handleChange}
// 					>
// 						<option value=""></option>
// 						<option>
// 							business {info.gender === "male" ? "man" : "woman"}{" "}
// 						</option>
// 						<option>trader</option>
// 						<option>farmer</option>
// 						<option>civil servant</option>
// 						<option>doctor</option>
// 						<option>clergy</option>
// 						<option>
// 							military {info.gender === "male" ? "man" : "woman"}{" "}
// 						</option>
// 						<option>Others</option>
// 					</select>
// 				</div>

// 				<div className="form-group">
// 					<label>Relationship with the applicant</label>
// 					<select
// 						className="form-control"
// 						value={info.rel}
// 						name="rel"
// 						onChange={handleChange}
// 					>
// 						<option value=""></option>
// 						<option>sibiling</option>
// 						<option>uncle</option>
// 						<option>aunt</option>
// 						<option>mother</option>
// 						<option>father</option>
// 						<option>friend</option>
// 						<option>neighbour</option>
// 						<option>Others</option>
// 					</select>
// 				</div>
// 				<div className="form-group">
// 					<label>Address</label>
// 					<input
// 						type="address"
// 						name="address"
// 						onChange={handleChange}
// 						value={info.address}
// 						className="form-control"
// 					/>
// 				</div>
// 				<div className="text-center mt-3">
// 					<button className="btn btn-info">
// 						{loading ? <Loader content="Processing record..." /> : "Add Record"}
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	);
// };
