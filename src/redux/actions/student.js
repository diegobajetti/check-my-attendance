import {
	SET_STUDENT_NEW,
	SET_STUDENT_EXIST,
	ADD_NEW_STUDENT,
	SET_STUDENT_FN,
	SET_STUDENT_LN,
	SET_STUDENT_ID,
} from "../constants.js";

function setStudentNew() {
	return {
		type: SET_STUDENT_NEW,
	};
}

function setStudentExist() {
	return {
		type: SET_STUDENT_EXIST,
	};
}

function setStudentFirstName(firstName = "") {
	return {
		type: SET_STUDENT_FN,
		data: firstName,
	};
}

function setStudentLastName(lastName = "") {
	return {
		type: SET_STUDENT_LN,
		data: lastName,
	};
}

function setStudentId(id = "") {
	return {
		type: SET_STUDENT_ID,
		data: id,
	};
}

const addNewStudent = () => {
	return (dispatch, getState) => {
		const {
			student: {
				currStudent: { firstName, lastName, id },
			},
		} = getState();

		dispatch({
			type: ADD_NEW_STUDENT,
			data: { firstName, lastName, id },
		});
	};
};

export {
	setStudentNew,
	setStudentExist,
	setStudentFirstName,
	setStudentLastName,
	setStudentId,
	addNewStudent,
};
