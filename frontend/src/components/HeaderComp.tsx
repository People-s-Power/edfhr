import { UserAtom } from "atoms/UserAtom";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import UserMenu from "./user-profile/UserMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const Header = (): JSX.Element => {
	const [menu, setMenu] = useState(false);
	const user = useRecoilValue(UserAtom);
	const { pathname } = useRouter();
	const text = `PEOPLE'S POWER`

	return (
		<header>
			<nav className="navbar">
				<div className="container header m-c">
					<div className="navbar-brand d-flex justify-content-between align-items-center justify-content-md-start min">
						<Link href="/">
							<a className="navbar-brand">
								<img src="/images/logo.svg" alt="" loading="lazy" />
							<h6>{ text }</h6>
							</a>
						</Link>
						<menu
							className="menu btn d-flex d-md-none flex-column"
							onClick={() => setMenu(!menu)}
							id="button"
							role="button"
						>
							<div className="bars"></div>
							<div className="bars"></div>
							<div className="bars"></div>
						</menu>
					</div>
					<ul className=" nav d-none d-md-flex  ">
						{navItems(Boolean(user)).map((nav, i) => (
							<li className="nav-item" key={i}>
								<Link href={`/${nav.link}`}>
									<a
										className={
											pathname == `/${nav.link}`
												? `text-warning fw-bold nav-link`
												: ` nav-link`
										}
									>
										{nav.title}
									</a>
								</Link>
							</li>
						))}

						<li className="nav-item">
							{!user ? (
								<Link href="/auth">
									<button className="btn px-5 join rounded-pill bg-warning text-white font-weight-bold">
										Join
									</button>
								</Link>
							) : (
								<div className='flex'>
									{
									// Work to be done !!
									// When users click they should see updates
								}
									<div className='notify-bell bg-white shadow-lg'>
										<FontAwesomeIcon icon={faBell} />
									</div>
									<div className='p-1'></div>
									<UserMenu />
								</div>
							)}
						</li>
					</ul>
				</div>
			</nav>
			{menu && (
				<menu className="animate__animated animate__fadeInDown d-flex flex-column align-items-start d-md-none">
					{navItems(Boolean(user)).map((nav, i) => (
						<div className="text-center py-2" key={i}>
							<Link href={`/${nav.link}`}>
								<a
									className={
										pathname == `/${nav.link}`
											? `text-warning fw-bold nav-link`
											: ` nav-link fw-bold`
									}
								>
									{nav.title}
								</a>
							</Link>
						</div>
					))}

					{!user ? (
						<Link href="/auth">
							<button className="btn px-5 join rounded-pill bg-warning text-white font-weight-bold">
								Join
							</button>
						</Link>
					) : (
						<UserMenu />
					)}
				</menu>
			)}
		</header>
	);
};

export default Header;

const navItems = (loggedIn: boolean) => [
	{ title: "Start Campaign", link: "startcamp" },
	{ title: "My Campaign", link: loggedIn ? "mycamp" : "auth" },
	{ title: "Explore", link: "campaigns" },
];
