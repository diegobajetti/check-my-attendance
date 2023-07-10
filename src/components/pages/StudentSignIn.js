import React from "react";
import { connect } from "react-redux";
import "../../App.css";
import { Canvas, NewStudentForm } from "../index.js";
import "./StudentSignIn.css";

export function StudentSignIn({ isNewStudent }) {
	return (
		<div className="container">
			<h1 className="about-us">STUDENT SIGN IN</h1>
			<Canvas />
			{isNewStudent && <NewStudentForm></NewStudentForm>}
		</div>
	);
}

const mapStateToProps = ({
	student: {
		currStudent: { isNew },
	},
}) => {
	return {
		isNewStudent: isNew,
	};
};

const ConnectedStudentSignIn = connect(mapStateToProps)(StudentSignIn);
export default ConnectedStudentSignIn;
