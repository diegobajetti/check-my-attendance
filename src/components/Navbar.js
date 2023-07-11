import {
	faBars,
	faShekelSign,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/dist/index.js";
import Button from "./Button";
import "./Navbar.css";
import SignOutBtn from "./SignOutBtn";

function Navbar({ profLoggedIn = false }) {
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);
	const showButton = () => {
		if (window.innerWidth <= 960) setButton(false);
		else setButton(true);
	};
	useEffect(() => {
		showButton();
	}, []);
	window.addEventListener("resize", showButton);

	return (
		<nav className="navbar-nav">
			<div className="navbar-container">
				<Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
					Check My Attendance
					<FontAwesomeIcon
						className="fa-shekel-sign"
						icon={faShekelSign}
					/>
				</Link>
				<div className="menu-icon" onClick={handleClick}>
					<FontAwesomeIcon
						icon={click ? faTimes : faBars}
						className={click ? "fas fa-times" : "fas fa-bars"}
					/>
				</div>
				<ul className={click ? "nav-nav-menu active" : "nav-nav-menu"}>
					<li className="nav-item">
						<Link
							to="/"
							className="nav-links"
							onClick={closeMobileMenu}
						>
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link
							to="/student"
							className="nav-links"
							onClick={closeMobileMenu}
						>
							Student Sign In
						</Link>
					</li>
					<li className="nav-item button">
						{profLoggedIn ? (
							<SignOutBtn className="btn--outline nav-links-mobile" />
						) : (
							<Link
								to="/prof-sign-in"
								className="nav-links-mobile"
								onClick={closeMobileMenu}
							>
								Professor Sign In
							</Link>
						)}
					</li>
				</ul>
				{button &&
					(profLoggedIn ? (
						<SignOutBtn className="btn--outline" />
					) : (
						<Button buttonStyle="btn--outline">
							Professor Sign In
						</Button>
					))}
			</div>
		</nav>
	);
}

const mapStateToProps = ({ prof: { loggedIn } }) => {
	return {
		profLoggedIn: loggedIn,
	};
};

export default connect(mapStateToProps)(Navbar);
