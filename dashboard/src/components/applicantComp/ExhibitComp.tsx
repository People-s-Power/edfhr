import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Modal } from "rsuite";
import styled from "styled-components";
import { IExhibit, StaffRoleEnum } from "types/Applicant.types";

const ExhibitComp = ({
	applicant_id,
}: {
	applicant_id: string;
}): JSX.Element => {
	const [exhibits, setExhibits] = useState<IExhibit[] | any>();
	const [show, setShow] = useState(false);
	const user = useRecoilValue(UserAtom);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(`/exhibit/applicant/${applicant_id}`);
				setExhibits(data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, [applicant_id]);
	return (
		<Wrapper className="container">
			{user?.role !== StaffRoleEnum.Lawyer && (
				<div className="text-end">
					<button
						className="btn btn-warning rounded-0"
						onClick={() => setShow(true)}
					>
						{" "}
						<i className="fas fa-plus me-2"></i> Add
					</button>
				</div>
			)}
			<div className="row mt-3">
				<AddExhibit
					show={show}
					onHide={() => setShow(false)}
					applicant_id={applicant_id}
					onAdd={(data) => setExhibits([...exhibits, data])}
				/>
				{exhibits?.map((exhibit: IExhibit, i: number) => (
					<div className="col-lg-4" key={i}>
						<SingleExhibit
							exhibit={exhibit}
							onDelete={(data) =>
								setExhibits(exhibits?.filter((e: IExhibit) => e.id !== data.id))
							}
						/>
					</div>
				))}
			</div>
		</Wrapper>
	);
};

export default ExhibitComp;

const Wrapper = styled.div`
	img {
		width: 100%;
		height: 100%;
		min-height: 12.5rem;
		max-height: 15rem;

		object-fit: contain;
	}
`;

const SingleExhibit = ({
	exhibit,
	onDelete,
}: {
	exhibit: IExhibit;
	onDelete(data: IExhibit): void;
}) => {
	const deleteExhibit = async () => {
		try {
			const { data } = await axios.delete(`/exhibit/single/${exhibit.id}`);

			onDelete(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="border border-primary image-wapper">
			<img src={exhibit?.image} alt="" className="exhibit-image" />
			<div className="d-flex justify-content-between align-items-center p-2 ">
				<p className="m-0 text-break text-truncate">{exhibit.name}</p>
				<div className="d-flex">
					<button className="btn text-danger" onClick={deleteExhibit}>
						<i className="fas fa-trash"></i>
					</button>
				</div>
			</div>
		</div>
	);
};

const AddExhibit = ({
	applicant_id,
	onAdd,
	show,
	onHide,
}: {
	applicant_id: string;
	onAdd(data: IExhibit): void;
	show: boolean;
	onHide(): void;
}) => {
	const [name, setName] = useState("");
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		const reader = new FileReader();

		if (files && files.length > 0) {
			reader.readAsDataURL(files[0]);
			reader.onloadend = () => {
				if (reader.result) {
					setFile(reader.result as any);
				}
			};
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name) return alert("Select type of exhibit");
		try {
			setLoading(true);
			const { data } = await axios.post("/exhibit", {
				name,
				image: file,
				applicant_id,
			});

			onHide();
			onAdd(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Body>
				<form className="form" onSubmit={handleSubmit}>
					<h6 className="text-center fw-bold">Add Exhibit</h6>

					<select
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="form-control mb-2"
					>
						<option>Select type of exhibit</option>
						<option>Charge Sheets</option>
						<option>Remand Warrant</option>
						<option>Record of court proceedings</option>
						<option>Pictures</option>
						<option>Others</option>
					</select>
					<input
						type="file"
						name="file"
						onChange={handleImage}
						className="mb-2 form-control"
					/>

					<div className="mt-3 text-center">
						<button
							disabled={loading}
							className={`btn btn-primary ${loading && "loading"}`}
						>
							{loading ? "processing..." : "Upload"}
						</button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
};
