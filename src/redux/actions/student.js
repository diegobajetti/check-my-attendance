import {
	SET_STUDENT_NEW,
	SET_STUDENT_EXIST,
	SET_STUDENT_FN,
	SET_STUDENT_LN,
	SET_STUDENT_ID,
	SET_STUDENT_COURSE_CODE,
	SET_STUDENT_LOGGED_IN,
	ADD_NEW_STUDENT,
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
	setStudentNew,
	setStudentExist,
	setStudentFirstName,
	setStudentLastName,
	setStudentId,
	setStudentCourseCode,
	setStudentLoginStatus,
	addNewStudent,
};
