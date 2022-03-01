import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { Loader } from "rsuite";
import GoogleAuthComp from "../GoogleAuth";

const RegisterComp = (): JSX.Element => {
	return (
		<div className="signup-main">
			<div className="d-flex flex-column justify-content-end">
				<h2 className="text-secondary fw-bold">Sign Up</h2>
				<p className="m-0 mb-3 fs-5">
					Already have an account
					<Link href="/auth">
						<a className="text-warning fw-bold c-hand ms-2">Log In </a>
					</Link>
				</p>
			</div>
			<p className="fs-5 mb-3">
				Sign up with your social media accounts for easy syncing and more secure
				privacy.
			</p>
			<SignupCom onSucess={(d) => console.log(d)} />
			<Link href="/auth?mode=forgot password">
				<a className="text-decoration-none text-center d-block">
					Login instead
				</a>
			</Link>
		</div>
	);
};

export default RegisterComp;

export const SignupCom = ({
	onSucess,
}: {
	onSucess(data?: any): void;
}): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState({
		email: "",
		password: "",
		password2: "",
		name: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInfo({
			...info,
			[name]: value,
		});
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!info.email || !info.password) return;
		if (info.password !== info.password2) return alert("Passwords must match");
		setLoading(true);
		try {
			const { data } = await axios.post("/auth/register", info);
			window.location.href = "/auth?mode=verify token";
			onSucess(data);
			setLoading(false);
		} catch (error) {
			const e = error as any;
			alert(error && e?.response?.data?.message);
			setLoading(false);
			console.log({ error });
		}
	};
	return (
		<div className="form">
			<div className="d-grid">
				<GoogleAuthComp onSuccess={() => (window.location.href = "/mycomp")} />
			</div>
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label className="form-label">Full Name</label>
					<input
						type="text"
						name="name"
						className="form-control py-2"
						value={info.name}
						onChange={handleChange}
						required
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="email"
						name="email"
						className="form-control py-2"
						value={info.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control py-2"
						name="password"
						value={info.password}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className="form-control py-2"
						name="password2"
						value={info.password2}
						onChange={handleChange}
						required
					/>
				</div>

				<button
					disabled={loading}
					className="btn btn-warning d-block w-100 text-white fw-bold py-2"
				>
					{loading ? <Loader content="Loading...." /> : "Sign up"}
				</button>
			</form>
		</div>
	);
};
