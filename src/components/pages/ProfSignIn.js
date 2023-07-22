import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	setProfEmail,
	setProfPassword,
	setLoggedInProf,
} from "../../redux/actions/prof.js";
import { Panel, FormGroup } from "../index";
import "../../App.css";
import "./ProfSignIn.css";

export function ProfSignIn({
	email,
	password,
	profList,
	dispatchSetProfEmail,
	dispatchSetProfPassword,
	dispatchSetLoggedInProf,
}) {
	const navigate = useNavigate();

	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const [logInFail, setLogInFail] = useState(false);

	return (
		<>
			<h1 className="sign-in">SIGN IN</h1>
			<div className="content-container">
				{logInFail && (
					<div className="alert alert-danger">
						Incorrect email or password
					</div>
				)}
				<Panel>
					<form className="sign-in-form">
						<FormGroup
							labelText="Email"
							inputRef={emailRef}
							onChangeFunc={dispatchSetProfEmail}
							classNameInput="prof-email-input"
						></FormGroup>
						<FormGroup
							labelText="Password"
							inputRef={passwordRef}
							type="password"
							onChangeFunc={dispatchSetProfPassword}
							classNameInput="prof-password-input"
						></FormGroup>
						<button
							type="submit"
							className="btn btn-dark"
							onClick={(event) => {
								event.preventDefault();
								if (
									profList.filter(
										(prof) =>
											email === prof.email &&
											password === prof.password
									).length > 0
								) {
									dispatchSetLoggedInProf();
									setLogInFail(false);
									navigate("/prof-page");
								} else {
									setLogInFail(true);
									emailRef.current.value = "";
									passwordRef.current.value = "";
								}
							}}
						>
							Sign In
						</button>
					</form>
				</Panel>
			</div>
		</>
	);
}

const mapStateToProps = ({ prof: { email, password, profList } }) => {
	return {
		email,
		password,
		profList,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetProfEmail: (email) => dispatch(setProfEmail(email)),
		dispatchSetProfPassword: (password) =>
			dispatch(setProfPassword(password)),
		dispatchSetLoggedInProf: () => dispatch(setLoggedInProf()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfSignIn);
