import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";

const ChangePassword = (): JSX.Element => {
	const [info, setInfo] = useState({ password: "", password2: "" });
	const { query } = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!query?.id) return;
		if (info?.password !== info?.password2)
			return alert("Passsword do not match");
		try {
			setLoading(true);
			await axios.post("/auth/change-password", {
				password: info.password,
				id: query?.id,
			});
			alert("Password changed !");
			setLoading(true);
			window.location.href = "/auth?mode=login";
		} catch (error) {
			const e = error as any;
			console.log({ error });
			alert(e?.response?.data?.message);
			setLoading(false);
		}
	};
	return (
		<div className="container">
			<label htmlFor="exampleInputEmail1" className="form-label">
				Enter the verification code sent to your email address
			</label>
			<form onSubmit={handleSubmit}>
				<div className="mb-2 form-group">
					<input
						type="password"
						className="form-control py-2"
						required
						value={info.password}
						onChange={(e) => setInfo({ ...info, password: e.target.value })}
					/>
				</div>
				<div className="mb-2 form-group">
					<input
						type="password"
						className="form-control py-2"
						required
						value={info.password2}
						onChange={(e) => setInfo({ ...info, password2: e.target.value })}
					/>
				</div>

				<button className="btn btn-warning d-block w-100 text-white fw-bold py-2">
					{loading ? "loading..." : "Change Password"}
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;
