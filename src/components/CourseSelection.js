import React, { useState } from "react";
import { connect } from "react-redux";
import { setStudentCourseCode } from "../redux/actions/student";
import "./CourseSelection.css";

const CourseSelection = ({
	id = "",
	studentList = [],
	dispatchSetCourseCode,
}) => {
	const filteredStudents = studentList.filter((student) => id === student.id);

	const courseCodes =
		filteredStudents.length > 0 ? filteredStudents[0].courseCodes : [];

	const [selectedCourse, setSelectedCourse] = useState(null);

	return (
		<div className="course-selection-container">
			<label>Which course are you marking your attendance for?</label>
			{courseCodes.map((courseCode) => {
				return (
					<div className="form-check">
						<input
							className="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id={courseCode}
							key={courseCode}
							value={courseCode}
							onChange={(event) =>
								setSelectedCourse(event.currentTarget.value)
							}
						></input>
						<label className="form-check-label" for={courseCode}>
							{courseCode}
						</label>
					</div>
				);
			})}
			<button
				className="btn btn-dark"
				onClick={() => dispatchSetCourseCode(selectedCourse)}
			>
				Select Course
			</button>
		</div>
	);
};

const mapStateToProps = ({
	student: {
		currStudent: { id },
		studentList,
	},
}) => {
	return {
		studentList,
		id,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetCourseCode: (courseCode) =>
			dispatch(setStudentCourseCode(courseCode)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelection);
