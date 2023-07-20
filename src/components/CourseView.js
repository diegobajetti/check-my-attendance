import React, { useRef } from "react";
import { connect } from "react-redux";
import AttendanceRecord from "./AttendanceRecord";
import InputGroup from "./InputGroup";
import { searchStudents, setSelectedStudent } from "../redux/actions/prof";
import "./CourseView.css";

const CourseView = ({
	searchTerm,
	searchResults,
	selectedStudent,
	dispatchSearchStudents,
	dispatchSetSelectedStudent,
}) => {
	const inputRef = useRef(null);

	return (
		<div>
			<form>
				<InputGroup
					labelText="Search for a student's attendance records"
					placeholder="Search by student id or name"
					btnLabel={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-search"
							viewBox="0 0 16 16"
						>
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
						</svg>
					}
					onChange={dispatchSearchStudents}
					onClick={() => dispatchSearchStudents(searchTerm)}
					inputRef={inputRef}
				></InputGroup>
			</form>
			{searchResults.length === 0 && searchTerm !== "" && (
				<div className="alert alert-warning">No search results</div>
			)}
			<ul className="search-results-container">
				{searchResults.map((student) => {
					const { firstName, lastName, id } = student;
					return (
						<li
							key={id}
							className="search-result bg-light"
							onClick={() => dispatchSetSelectedStudent(id)}
						>{`${firstName} ${lastName}`}</li>
					);
				})}
			</ul>
			{selectedStudent && <AttendanceRecord />}
		</div>
	);
};

const mapStateToProps = ({
	prof: { searchTerm, searchResults, selectedStudent },
}) => {
	return {
		searchTerm,
		searchResults,
		selectedStudent,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSearchStudents: (searchTerm) =>
			dispatch(searchStudents(searchTerm.toLowerCase())),
		dispatchSetSelectedStudent: (studentId) =>
			dispatch(setSelectedStudent(studentId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseView);
