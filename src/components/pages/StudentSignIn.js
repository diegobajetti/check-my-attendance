import React from "react";
import { connect } from "react-redux";
import "../../App.css";
import { Canvas, CourseSelection, NewStudentForm } from "../index.js";
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
				<h1 className="content-h1">Time to take attendance!</h1>
				<p>
					Enable your web cam and remove anything obstructing your
					face (dark glasses, hat, etc).
				</p>
				<p>
					If you are not registered in the attendance taker for a
					course, you will be prompted to register.
				</p>
				<p>
					Click "Start Video Capture" to take your attendance and
					click "End Video Capture" (it will be the same button as the
					start button) once you are recognized.
				</p>
				<p>
					(The video camera may take a few seconds to show and the
					facial recognition may need a few seconds to recognize you.)
				</p>
				<Canvas />
				{loggedIn && (
					<div>
						{courseCode ? (
							<div className="alert alert-primary">
								<p>{`Welcome ${firstName} ${lastName}, you are ${
									isNewStudent ? "registered and " : ""
								}in attendance for ${courseCode}`}</p>
							</div>
						) : (
							<>
								<div className="alert alert-primary">
									<p>{`Welcome ${firstName} ${lastName}`}</p>
								</div>
								<CourseSelection></CourseSelection>
							</>
						)}
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
