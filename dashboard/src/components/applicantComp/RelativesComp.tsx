import { useQuery } from "@apollo/client";
import { GET_RELATIVES_BY_APPLICANT } from "apollo/queries/applicantQuery";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { useParams } from "react-router";
import { IRelative } from "types/Applicant.types";
import AddRelative from "./AddRelative";

const RelativesComp = (): JSX.Element => {
	const [relatives, setRelatives] = useState<IRelative[]>([]);
	const { id } = useParams<{ id: string }>();
	const { refetch } = useQuery(GET_RELATIVES_BY_APPLICANT, {
		variables: { applicant_id: id },
		onCompleted: (data) => {
			setRelatives(data.getRelativesByApplicant);
		},
		onError: (err) => console.log(err),
	});

	return (
		<Fragment>
			{[...relatives]?.map((relative, i) => (
				<SingleRelative
					key={i}
					relative={relative}
					onDelete={(data) => {
						setRelatives(relatives.filter((r) => r.id !== data.id)), refetch();
					}}
				/>
			))}

			<AddRelative
				onAdd={(data) => setRelatives((relatives) => [...relatives, data])}
				applicant_id={id}
			/>
			<div className="container">
				<div className="mt-3 text-center">
					<button className="btn btn-primary text-light">
						<i className="fas fa-plus"></i> Add Relation{" "}
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default RelativesComp;

export const SingleRelative = ({
	relative,
	onDelete,
}: {
	relative: IRelative;
	onDelete(data: IRelative): void;
}): JSX.Element => {
	const [disabled, setDisabled] = useState(true);
	const [info, setInfo] = useState<IRelative | any>(relative);
	const [loading, setLoading] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setInfo({
			...info,
			[name]: value,
		});
	};

	const handleUpdate = async () => {
		setLoading(true);
		try {
			const { data } = await axios.put("/relative", info);
			setInfo(data);
			setLoading(false);
			alert("Success !!!");
			setDisabled(true);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		const confirmed = confirm("Do you really want to delete this?");
		if (!confirmed) return;
		try {
			const { data } = await axios.delete(`/relative/single/${relative.id}`);
			onDelete(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="border border-1 border-primary mb-2">
			<h6 className="bg-sky p-3 fw-bold text-center">Relative`s Information</h6>
			<form className="container">
				<div className="row align-items-center mb-2">
					<div className="col-md-6">
						<label>Name</label>
					</div>
					<div className="col-md-6">
						<input
							type="text"
							name="name"
							value={info?.name}
							onChange={handleChange}
							disabled={disabled}
							className="form-control border-primary "
						/>
					</div>
				</div>

				<div className="row align-items-center mb-2">
					<div className="col-md-6">
						<label>Phone</label>
					</div>
					<div className="col-md-6">
						<input
							type="text"
							name="phone"
							value={info?.phone}
							onChange={handleChange}
							disabled={disabled}
							className="form-control border-primary "
						/>
					</div>
				</div>

				<div className="text-end my-2">
					{disabled ? (
						<Fragment>
							<button
								className="btn btn-danger mx-3"
								type="button"
								onClick={handleDelete}
							>
								Delete Record
							</button>
							<button
								className="btn btn-outline-warning"
								type="button"
								onClick={() => setDisabled(false)}
							>
								Edit Record
							</button>
						</Fragment>
					) : (
						<Fragment>
							<button
								className="btn btn-danger mx-3"
								type="reset"
								onClick={() => {
									setDisabled(true);
									setInfo(relative);
								}}
							>
								Cancel
							</button>
							<button
								className="btn btn-outline-warning"
								type="button"
								onClick={handleUpdate}
							>
								{loading ? "processing..." : "Save Record"}
							</button>
						</Fragment>
					)}
				</div>
			</form>
		</div>
	);
};
