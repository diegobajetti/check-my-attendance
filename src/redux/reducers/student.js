import {
	SET_STUDENT_NEW,
	SET_STUDENT_EXIST,
	SET_STUDENT_FN,
	SET_STUDENT_LN,
	SET_STUDENT_ID,
	SET_STUDENT_COURSE_CODE,
	SET_STUDENT_LOGGED_IN,
	ADD_NEW_STUDENT,
} from "../constants";

const initialState = {
	currStudent: {
		isNew: true,
		firstName: "",
		lastName: "",
		id: "",
		courseCode: "",
		loggedIn: false,
	},
	studentList: [],
};

const studentReducer = (
	state = initialState,
	action = { type: "", data: {} }
) => {
	const { currStudent, studentList } = state;
	const { data } = action;

	switch (action.type) {
		case SET_STUDENT_NEW:
			return { ...state, currStudent: { ...currStudent, isNew: true } };
		case SET_STUDENT_EXIST:
			return { ...state, currStudent: { ...currStudent, isNew: false } };
		case SET_STUDENT_FN:
			return {
				...state,
				currStudent: { ...currStudent, firstName: data },
			};
		case SET_STUDENT_LN:
			return {
				...state,
				currStudent: { ...currStudent, lastName: data },
			};
		case SET_STUDENT_ID:
			return {
				...state,
				currStudent: { ...currStudent, id: data },
			};
		case SET_STUDENT_COURSE_CODE:
			return {
				...state,
				currStudent: { ...currStudent, courseCode: data },
			};
		case SET_STUDENT_LOGGED_IN:
			return {
				...state,
				currStudent: { ...currStudent, loggedIn: data },
			};
		case ADD_NEW_STUDENT:
			const {
				firstName = "",
				lastName = "",
				id = "",
				courseCode = "",
			} = action.data;
			return {
				...state,
				studentList: [
					...studentList,
					{ firstName, lastName, id, courseCode, loggedIn: false },
				],
			};
		default:
			return state;
	}
};

export default studentReducer;
