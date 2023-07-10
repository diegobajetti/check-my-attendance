import React, { useRef } from "react";
import { connect } from "react-redux";
import {
	setStudentFirstName,
	setStudentLastName,
	setStudentId,
	addNewStudent,
} from "../redux/actions/student";
import { FormGroup } from "./index";
import "./NewStudentForm.css";

export const NewStudentForm = ({
	className,
	dispatchAddNewStudent,
	dispatchSetStudentFirstName,
	dispatchSetStudentLastName,
	dispatchSetStudentId,
}) => {
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const idRef = useRef(null);

	return (
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
			<button
				type="submit"
				className="btn btn-primary"
				onClick={(event) => {
					event.preventDefault();
					dispatchAddNewStudent();
					firstNameRef.current.value = "";
					lastNameRef.current.value = "";
					idRef.current.value = "";
				}}
			>
				Submit
			</button>
		</form>
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
	};
};

const ConnectedForm = connect(null, mapDispatchToProps)(NewStudentForm);
export default ConnectedForm;
