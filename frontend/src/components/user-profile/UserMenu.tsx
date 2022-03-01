import { UserAtom } from "atoms/UserAtom";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { Fragment } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AccountTypeEnum } from "types/Applicant.types";
import { TOKEN_NAME } from "utils/constants";

const UserMenu = (): JSX.Element => {
	const user = useRecoilValue(UserAtom);
	const logout = async () => {
		try {
			await axios.get("/auth/logout");
			Cookies.remove(TOKEN_NAME);
			Cookies.remove("user_id");
			window.location.href = "/";
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Wrapper>
			<div className="dropdown dropstart">
				<a className="c-hand" data-bs-toggle="dropdown">
					<img
						src={user?.image}
						alt=""
						className="image rounded-circle border border-3 border-warning"
					/>
				</a>
				<ul className="dropdown-menu dropdown-menu-dark bg-primary dropdown-menu-start">
					<li className="dropdown-item">
						<Link href="/mycamp/profile">
							<a className="text-decoration-none text-light c-hand">Profile</a>
						</Link>
					</li>
					{user?.accountType === AccountTypeEnum.Staff && (
						<Fragment>
							<li className="dropdown-item">
								<a
									href="https://portal.edfhr.org"
									className="text-decoration-none text-light c-hand"
								>
									Edfhr Portal
								</a>
							</li>
							<li className="dropdown-item">
								<Link href="/mycamp/manage">
									<a className="text-decoration-none text-light c-hand">
										Manage Campaigns
									</a>
								</Link>
							</li>
						</Fragment>
					)}
					<li className="dropdown-item">
						<a
							className="text-decoration-none text-light c-hand"
							onClick={logout}
						>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</Wrapper>
	);
};

export default UserMenu;

const Wrapper = styled.div`
	.dropdown {
		.image {
			/* width: 100%; */
			width: 3rem;
			height: 3rem;
		}
	}
`;
