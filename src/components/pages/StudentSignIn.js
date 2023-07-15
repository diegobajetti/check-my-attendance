import React from "react";
import { connect } from "react-redux";
import "../../App.css";
import { Canvas, NewStudentForm } from "../index.js";
import "./StudentSignIn.css";

export function StudentSignIn({
	isNewStudent,
	loggedIn,
	firstName,
	lastName,
	courseCode,
}) {
	return (
		<div className="container">
			<h1 className="about-us">STUDENT SIGN IN</h1>
			<div className="content-container">
				<h1 className="content-h1">
					Enable your web cam and sit still
				</h1>
				<p>lorem ipsum instruction text</p>
				<p>
					If you are a new student, you will be prompted to register
				</p>
				<p>more lorem ipsum instruction text</p>
				<Canvas />
				{loggedIn && (
					<div className="alert alert-primary">
						<p>{`Welcome ${firstName} ${lastName}, you are in attendance for ${courseCode}`}</p>
					</div>
				)}
				{!loggedIn && !isNewStudent && (
					<div className="alert alert-danger">
						Something went wrong, please hold still and try again.
						Try removing anything that is obstructing your face
						(dark glasses, hat, mask)
					</div>
				)}
				{isNewStudent && !loggedIn && (
					<div className="new-student-container">
						<div className="alert alert-primary">
							<h3>Welcome, new student!</h3>
							Please fill out your details below to register in
							the attendance system for your course.
						</div>
						<NewStudentForm></NewStudentForm>
					</div>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({
	student: {
		currStudent: { isNew, loggedIn, firstName, lastName, courseCode },
	},
}) => {
	return {
		isNewStudent: isNew,
		loggedIn,
		firstName,
		lastName,
		courseCode,
	};
};

export default connect(mapStateToProps)(StudentSignIn);
