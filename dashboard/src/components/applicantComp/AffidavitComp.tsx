import { useQuery } from "@apollo/client";
import { GET_AFFIDATIVE_BY_APPLICANT } from "apollo/queries/applicantQuery";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loader } from "rsuite";

const AffidavitComp = (): JSX.Element => {
	const { id } = useParams<{ id: string }>();
	const [showRel, setShowRel] = useState(true);
	const [showReligion, setShowReligion] = useState(true);
	const [showOccupation, setShowOccupation] = useState(true);
	const [updating, setUpdating] = useState(false);

	const [info, setInfo] = useState({
		name: "",
		address: "",
		title: "",
		religion: "",
		occupation: "",
		rel: "",
		gender: "",
		applicant: "",
	});

	const { data, loading, refetch } = useQuery(GET_AFFIDATIVE_BY_APPLICANT, {
		variables: { applicant_id: id },
		onCompleted: (data) => {
			if (data?.getAffidavitByApplicant) {
				setInfo(data?.getAffidavitByApplicant);
			} else {
				setInfo({
					name: "",
					address: "",
					title: "",
					religion: "",
					occupation: "",
					rel: "",
					gender: "",
					applicant: "",
				});
			}
		},
		onError: (err) => console.log(err),
	});

	useEffect(() => {
		if (info?.rel === "Others") setShowRel(false);
	}, [info?.rel]);
	useEffect(() => {
		if (info?.religion === "Others") setShowReligion(false);
	}, [info?.religion]);
	useEffect(() => {
		if (info?.occupation === "Others") setShowOccupation(false);
	}, [info?.occupation]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;
		setInfo({
			...info,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const payload = {
			...info,
			applicant_id: id,
			applicant: id,
		};
		const handleUpdate = async () => {
			// const { ...payload } = info;
			// console.log(__typename)
			setUpdating(true);
			try {
				await axios.post("/affidavit", payload);
				alert("SUCCESS");

				refetch();
				setUpdating(false);
			} catch (error) {
				console.log(error);
				setUpdating(false);
			}
		};
		const handleAdd = async () => {
			setUpdating(true);

			try {
				await axios.post("/affidavit", payload);
				alert("SUCCESS");

				setUpdating(false);
			} catch (error) {
				console.log(error);
				setUpdating(false);
			}
		};
		if (!data.getAffidavitByApplicant) return handleAdd();
		else return handleUpdate();
	};

	if (loading) return <Loader center content="Fetching data" />;
	return (
		<div className="affidavit-form">
			<h4 className="heading">Update Deponent Information</h4>
			<form className="form" onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Name </label>
					<input
						type="text"
						className="form-control"
						value={info.name}
						onChange={handleChange}
						name="name"
					/>
				</div>
				<div className="form-group">
					<label>Gender</label>
					<select
						className="form-control"
						onChange={handleChange}
						value={info.gender}
						name="gender"
					>
						<option value=""></option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>
				</div>
				<div className="form-group">
					<label>Title</label>
					<select
						className="form-control"
						onChange={handleChange}
						value={info.title}
						name="title"
					>
						<option value=""></option>
						<option>Mr</option>
						<option>Mrs</option>
						<option>Pastor</option>
						<option>Imam</option>
						<option>Dr</option>
						<option>Engineer</option>
						<option>Chief</option>
						<option>Elder</option>
					</select>
				</div>
				{!showReligion ? (
					<div className="form-group">
						<label>Specify Religion</label>
						<input
							type="text"
							name="religion"
							onChange={handleChange}
							className="form-control"
							value={info.religion}
						/>
					</div>
				) : (
					<div className="form-group">
						<label>Religion</label>
						<select
							className="form-control"
							value={info.religion}
							name="religion"
							onChange={handleChange}
						>
							<option value=""></option>
							<option>Christian</option>
							<option>Islam</option>
							<option>Traditionalist</option>
							<option>Duddist</option>
							<option>Others</option>
						</select>
					</div>
				)}

				{!showOccupation ? (
					<div className="form-group">
						<label>Specify occupation</label>
						<input
							type="text"
							name="occupation"
							onChange={handleChange}
							className="form-control"
							value={info.occupation}
						/>
					</div>
				) : (
					<div className="form-group">
						<label>Occupation</label>
						<select
							className="form-control"
							value={info.occupation}
							name="occupation"
							onChange={handleChange}
						>
							<option value=""></option>
							<option>
								business {info.gender === "male" ? "man" : "woman"}{" "}
							</option>
							<option>trader</option>
							<option>farmer</option>
							<option>civil servant</option>
							<option>doctor</option>
							<option>clergy</option>
							<option>
								military {info.gender === "male" ? "man" : "woman"}{" "}
							</option>
							<option>Others</option>
						</select>
					</div>
				)}

				{!showRel ? (
					<div className="form-group">
						<label>Specify relationship</label>
						<input
							type="text"
							name="rel"
							value={info.rel}
							onChange={handleChange}
							className="form-control"
						/>
					</div>
				) : (
					<div className="form-group">
						<label>Relationship with the applicant</label>
						<select
							className="form-control"
							value={info.rel}
							name="rel"
							onChange={handleChange}
						>
							<option value=""></option>
							<option>sibiling</option>
							<option>uncle</option>
							<option>aunt</option>
							<option>mother</option>
							<option>father</option>
							<option>friend</option>
							<option>neighbour</option>
							<option>Others</option>
						</select>
					</div>
				)}
				<div className="form-group">
					<label>Address</label>
					<input
						type="address"
						name="address"
						onChange={handleChange}
						value={info.address}
						className="form-control"
					/>
				</div>
				<div className="text-center mt-3">
					<button className="btn btn-info" disabled={updating}>
						{updating ? (
							<Loader content="Updating record..." />
						) : (
							"Update Record"
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AffidavitComp;
