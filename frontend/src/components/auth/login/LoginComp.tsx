import axios from "axios";
import cookie from "js-cookie";
import router from "next/router";
import React, { useState } from "react";
import { Loader } from "rsuite";
import { TOKEN_NAME } from "utils/constants";
import GoogleAuthComp from "../GoogleAuth";

const LoginComp = ({
	onSuccess,
}: {
	onSuccess(e?: { id: string; token: string }): void;
}): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const [info, setInfo] = useState({
		email: "",
		password: "",
	});

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!info.email || !info.password) return;
		setLoading(true);
		try {
			const { data } = await axios.post("/auth/login", info);
			cookie.set("user_id", data?.id);
			if (!data.isActive) {
				router.push("/auth?mode=verify token");
			} else {
				cookie.set(TOKEN_NAME, data?.token);
				// cookie.set("user_id", data?.id);
				onSuccess(data);
			}
		} catch (error) {
			const e = error as any;
			alert(error && e?.response?.data?.message);

			console.log({ error });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="d-grid">
				<GoogleAuthComp onSuccess={() => onSuccess()} />
			</div>
			<form onSubmit={handleLogin}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control py-2"
						value={info.email}
						onChange={(e) => setInfo({ ...info, email: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control py-2"
						value={info.password}
						onChange={(e) => setInfo({ ...info, password: e.target.value })}
					/>
				</div>

				<button
					disabled={loading}
					className="btn btn-warning d-block w-100 text-white fw-bold py-2"
				>
					{loading ? <Loader content="Loading...." /> : "Log In"}
				</button>
			</form>
		</div>
	);
};

export default LoginComp;
