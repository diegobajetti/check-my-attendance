import React from "react";
import { connect } from "react-redux";
import { setProfLogOut, setSelectedCourse } from "../../redux/actions/prof";
import { ClickableCard, CourseView } from "../index";
import "./ProfPage.css";

const ProfPage = ({
	firstName,
	lastName,
	courseCodes,
	selectedCourse,
	dispatchSetSelectedCourse,
}) => {
	return (
		<div className="page-container">
			<div className="header-container">
				<div className="header-start-container">
					{/* default first name and last name for testing purposes */}
					<h1>
						{`${
							selectedCourse
								? selectedCourse
								: `Welcome, ${firstName || "FirstName"} ${
										lastName || "LastName"
								  }`
						}`}
					</h1>
					{selectedCourse && (
						<button
							className="btn btn-dark"
							id="back-to-selection"
							onClick={() => {
								dispatchSetSelectedCourse("");
							}}
						>
							Back to Course Selection
						</button>
					)}
				</div>
			</div>

			{selectedCourse ? (
				<CourseView />
			) : (
				<>
					<h4>Select a course to view:</h4>
					<div className="course-card-container">
						{/* default courses for testing purposes */}
						{(courseCodes.length > 0
							? courseCodes
							: ["CSI3104", "CSI3140", "CSI3131", "CEG3185"]
						).map((courseCode) => {
							return (
								<ClickableCard
									className="course-card"
									onClick={() =>
										dispatchSetSelectedCourse(courseCode)
									}
									key={courseCode}
								>
									<h3>{courseCode}</h3>
								</ClickableCard>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

const mapStateToProps = ({
	prof: { firstName, lastName, courseCodes, selectedCourse },
}) => {
	return {
		firstName,
		lastName,
		courseCodes,
		selectedCourse,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetProfLogOut: () => dispatch(setProfLogOut),
		dispatchSetSelectedCourse: (courseCode) =>
			dispatch(setSelectedCourse(courseCode.toUpperCase())),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfPage);
