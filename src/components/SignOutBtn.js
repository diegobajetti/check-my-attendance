import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfLogOut } from "../redux/actions/prof";

const SignOutBtn = ({ className = "btn-primary", dispatchSetProfLogOut }) => {
	const navigate = useNavigate();

	return (
		<button
			className={`btn ${className}`}
			id="log-out-btn"
			onClick={() => {
				dispatchSetProfLogOut();
				navigate("/prof-sign-in");
			}}
		>
			Sign Out
		</button>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetProfLogOut: () => dispatch(setProfLogOut()),
	};
};

export default connect(null, mapDispatchToProps)(SignOutBtn);
