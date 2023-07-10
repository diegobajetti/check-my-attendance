import React from "react";
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
	return (
		<form className={`form${className ? ` ${className}` : ""}`}>
			<FormGroup
				labelText="First name"
				onChangeFunc={dispatchSetStudentFirstName}
			></FormGroup>
			<FormGroup
				labelText="Last name"
				onChangeFunc={dispatchSetStudentLastName}
			></FormGroup>
			<FormGroup
				labelText="Student number"
				onChangeFunc={dispatchSetStudentId}
			></FormGroup>
			<button
				type="submit"
				class="btn btn-primary"
				onClick={dispatchAddNewStudent}
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
