import {
	SET_STUDENT_NEW_STATUS,
	SET_STUDENT_FN,
	SET_STUDENT_LN,
	SET_STUDENT_ID,
	SET_STUDENT_COURSE_CODE,
	SET_STUDENT_LOGGED_IN,
	ADD_NEW_STUDENT,
} from "../constants.js";

function setStudentNewStatus(status = true) {
	return {
		type: SET_STUDENT_NEW_STATUS,
		data: status,
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

function setStudentCourseCode(courseCode = "") {
	return {
		type: SET_STUDENT_COURSE_CODE,
		data: courseCode,
	};
}

function setStudentLoginStatus(loggedIn = false) {
	return {
		type: SET_STUDENT_LOGGED_IN,
		data: loggedIn,
	};
}

const addNewStudent = () => {
	return (dispatch, getState) => {
		const {
			student: {
				currStudent: { firstName, lastName, id, courseCode },
			},
		} = getState();

		dispatch({
			type: ADD_NEW_STUDENT,
			data: { firstName, lastName, id, courseCode },
		});
	};
};

export {
	setStudentNewStatus,
	setStudentFirstName,
	setStudentLastName,
	setStudentId,
	setStudentCourseCode,
	setStudentLoginStatus,
	addNewStudent,
};
