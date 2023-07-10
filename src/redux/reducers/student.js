import {
	SET_STUDENT_NEW,
	SET_STUDENT_EXIST,
	ADD_NEW_STUDENT,
	SET_STUDENT_FN,
	SET_STUDENT_LN,
	SET_STUDENT_ID,
} from "../constants";

const initialState = {
	currStudent: {
		isNew: true,
		firstName: "",
		lastName: "",
		id: "",
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
		case ADD_NEW_STUDENT:
			const { firstName = "", lastName = "", id = "" } = action.data;
			return {
				...state,
				currStudent: {
					firstName: "",
					lastName: "",
					id: "",
					isNew: true,
				},
				studentList: [
					...studentList,
					{ firstName, lastName, id, isNew: false },
				],
			};
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
		default:
			return state;
	}
};

export default studentReducer;
