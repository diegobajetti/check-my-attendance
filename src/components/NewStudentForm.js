import React, { useRef } from "react";
import { connect } from "react-redux";
import {
	setStudentFirstName,
	setStudentLastName,
	setStudentId,
	setStudentCourseCode,
	addNewStudent,
	setStudentLoginStatus,
} from "../redux/actions/student";
import FormGroup from "./FormGroup";
import Panel from "./Panel";
import "./NewStudentForm.css";

export const NewStudentForm = ({
	className,
	dispatchAddNewStudent,
	dispatchSetStudentFirstName,
	dispatchSetStudentLastName,
	dispatchSetStudentId,
	dispatchSetStudentCourseCode,
	dispatchSetStudentLoginStatus,
}) => {
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const idRef = useRef(null);
	const courseCodeRef = useRef(null);

	return (
		<Panel className="new-student-form-panel">
			<form className={`form${className ? ` ${className}` : ""}`}>
				<FormGroup
					labelText="First name"
					onChangeFunc={dispatchSetStudentFirstName}
					inputRef={firstNameRef}
				></FormGroup>
				<FormGroup
					labelText="Last name"
					onChangeFunc={dispatchSetStudentLastName}
					inputRef={lastNameRef}
				></FormGroup>
				<FormGroup
					labelText="Student number"
					onChangeFunc={dispatchSetStudentId}
					inputRef={idRef}
				></FormGroup>
				<FormGroup
					labelText="Course code (no space, eg: CSI3140)"
					onChangeFunc={dispatchSetStudentCourseCode}
					inputRef={courseCodeRef}
				></FormGroup>
				<button
					type="submit"
					className="btn btn-dark"
					onClick={(event) => {
						event.preventDefault();
						dispatchAddNewStudent();
						dispatchSetStudentLoginStatus(true);
						firstNameRef.current.value = "";
						lastNameRef.current.value = "";
						idRef.current.value = "";
						courseCodeRef.current.value = "";
					}}
				>
					Submit
				</button>
			</form>
		</Panel>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchAddNewStudent: () => dispatch(addNewStudent()),
		dispatchSetStudentFirstName: (firstName = "") =>
			dispatch(setStudentFirstName(firstName)),
		dispatchSetStudentLastName: (lastName = "") =>
			dispatch(setStudentLastName(lastName)),
		dispatchSetStudentId: (id = "") => dispatch(setStudentId(id)),
		dispatchSetStudentCourseCode: (courseCode = "") =>
			dispatch(setStudentCourseCode(courseCode)),
		dispatchSetStudentLoginStatus: (status) =>
			dispatch(setStudentLoginStatus(status)),
	};
};

const ConnectedForm = connect(null, mapDispatchToProps)(NewStudentForm);
export default ConnectedForm;
