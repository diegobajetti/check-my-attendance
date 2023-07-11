import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfLogOut } from "../../redux/actions/prof";
import "./ProfPage.css";

const ProfPage = ({
	firstName,
	lastName,
	courseCodes,
	dispatchSetProfLogOut,
}) => {
	const navigate = useNavigate();

	return (
		<div className="page-container">
			<div className="header-container">
				<h1>{`Welcome, ${firstName} ${lastName}`}</h1>
				<button
					className="btn btn-primary log-out-btn"
					onClick={() => {
						dispatchSetProfLogOut();
						navigate("/prof-sign-in");
					}}
				>
					Sign Out
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = ({ prof: { firstName, lastName, courseCodes } }) => {
	return {
		firstName,
		lastName,
		courseCodes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetProfLogOut: () => dispatch(setProfLogOut),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfPage);
