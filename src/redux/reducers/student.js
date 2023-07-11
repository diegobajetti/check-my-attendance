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
	studentList: [
		{
			firstName: "Christina",
			lastName: "Song",
			id: "300168292",
			courseCodes: ["CSI3140", "CSI3131"],
		},
		{
			firstName: "Khaled",
			lastName: "Elbasiouni",
			id: "300123456",
			courseCodes: ["CSI3131", "CSI3104", "CEG3185"],
		},
		{
			firstName: "Diego",
			lastName: "Bajetti",
			id: "300999000",
			courseCodes: ["CSI3140", "CEG3185"],
		},
		{
			firstName: "Yassine",
			lastName: "Sami",
			id: "300333444",
			courseCodes: ["CSI3131", "CSI3104", "CSI3140"],
		},
		{
			firstName: "Toad",
			lastName: "Mushroom",
			id: "300111222",
			courseCodes: ["CSI3131", "CSI3104", "CSI3140", "CEG3185"],
		},
	],
};

const studentReducer = (
	state = initialState,
	action = { type: "", data: {} }
) => {
	const { currStudent, studentList } = state;
	const { type, data } = action;

	switch (type) {
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

			let studentRecord = studentList.filter(
				(student) => student.id === id
			);

			// if student is already registered, add the course code to their course code array
			studentRecord =
				studentRecord.length > 0
					? {
							...studentRecord[0],
							courseCodes: [
								...studentRecord[0].courseCodes,
								courseCode,
							],
					  }
					: {
							firstName,
							lastName,
							id,
							courseCodes: [courseCode],
							loggedIn: false,
					  };
			const numCourseCodes = studentRecord.courseCodes.length;
			return {
				...state,
				studentList: [...studentList, studentRecord].filter(
					(student) =>
						student.id !== id ||
						(student.id === id &&
							student.courseCodes.length === numCourseCodes)
				),
			};
		default:
			return state;
	}
};

export default studentReducer;
