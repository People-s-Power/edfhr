import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Loader } from "rsuite";
import { IUser } from "types/Applicant.types";

const UpdateProfileComp = (): JSX.Element => {
	const user = useRecoilValue(UserAtom);
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState<Partial<IUser>>(user);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setInfo({
			...info,
			[name]: value,
		});
	};
	useEffect(() => {
		if (!info) setInfo(user);
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const { data } = await axios.put("/user/update", info);
			console.log(data);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			<div className="row mb-3 g-md-4 g-2 row-cols-1 row-cols-md-2">
				<div className="col">
					<label className="form-label">First Name</label>
					<input
						type="text"
						name="firstName"
						className="form-control"
						value={info?.firstName}
						onChange={handleChange}
					/>
				</div>
				<div className="col">
					<label className="form-label">Last Name</label>
					<input
						type="text"
						name="lastName"
						className="form-control"
						value={info?.lastName}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="row mb-3 g-md-4 g-2 row-cols-1 row-cols-md-2">
				<div className="col">
					<label className="form-label">Email</label>
					<input
						type="text"
						className="form-control"
						placeholder={user?.email}
						disabled
					/>
				</div>

				<div className="col">
					<label className="form-label">Phone no</label>
					<input
						type="text"
						name="phone"
						className="form-control"
						value={info?.phone}
						onChange={handleChange}
					/>
				</div>
			</div>
			{/* <div className="row mb-3 row-cols-1">
				<div className="col">
					<label className="form-label fw-bold" htmlFor="bio">
						Bio/ About
					</label>
					<textarea
						name="bio"
						className="form-control"
						// value={info?.bio}
						onChange={handleChange}
						disabled
						cols={30}
						rows={10}
					></textarea>
				</div>
			</div> */}
			{/* <div className="row g-md-4 mb-3 row-cols-1 g-2 row-cols-md-2">
				<div className="col">
					<label className="form-label fw-bold" htmlFor="language">
						Language
					</label>
					<input
						type="text"
						className="form-control"
						placeholder="English (United Kingdom)"
						id="language"
					/>
				</div>
				<div className="col">
					<label className="form-label fw-bold" htmlFor="handle">
						Twitter handle
					</label>
					<input
						type="text"
						className="form-control"
						placeholder="@ Username"
						id="handle"
					/>
				</div>
			</div> */}
			<div className="row g-md-4 mb-3 row-cols-1 g-2 row-cols-md-2">
				<div className="col">
					<label className="form-label fw-bold" htmlFor="country">
						Country
					</label>
					<input
						type="text"
						className="form-control"
						placeholder={user?.country}
						disabled
					/>
				</div>

				<div className="col">
					<label className="form-label fw-bold" htmlFor="city">
						City
					</label>
					<input
						type="text"
						name="city"
						className="form-control"
						value={info?.city}
						onChange={handleChange}
						// id="city"
					/>
				</div>
			</div>

			<div className="">
				<button
					type="reset"
					className="btn px-5 py-2 rounded-pill bg-light text-warning"
					onClick={() => setInfo(user)}
				>
					Cancel
				</button>
				<button
					disabled={loading}
					className="btn px-5 py-2 rounded-pill border-3 fw-bold btn-outline-warning"
				>
					{loading ? <Loader content="processing..." /> : "Update"}
				</button>
			</div>
		</form>
	);
};

export default UpdateProfileComp;
