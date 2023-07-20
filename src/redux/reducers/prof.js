import {
	SET_PROF_EMAIL,
	SET_PROF_PASSWORD,
	SET_LOGGED_IN_PROF,
	SET_PROF_LOG_OUT,
	SET_SELECTED_COURSE,
	SET_SEARCH_TERM,
	SET_SEARCH_RESULTS,
	SET_SELECTED_STUDENT,
} from "../constants";

const initialState = {
	email: "",
	password: "",
	courseCodes: [],
	firstName: "",
	lastName: "",
	loggedIn: false,
	selectedCourse: "",
	searchTerm: "",
	searchResults: [],
	selectedStudent: null,
	profList: [
		{
			email: "prof1@uottawa.ca",
			password: "password1",
			courseCodes: ["CSI3140", "CSI3104"],
			firstName: "Walter",
			lastName: "White",
		},
		{
			email: "prof2@uottawa.ca",
			password: "password2",
			courseCodes: ["CSI3140", "CSI3131"],
			firstName: "Cam",
			lastName: "Tucker",
		},
		{
			email: "prof3@uottawa.ca",
			password: "password3",
			courseCodes: ["CSI3104", "CEG3185"],
			firstName: "Taylor",
			lastName: "Swift",
		},
	],
};

export default function (
	state = initialState,
	action = { type: "", data: "" }
) {
	const { type, data } = action;

	switch (type) {
		case SET_PROF_EMAIL:
			return {
				...state,
				email: data,
			};
		case SET_PROF_PASSWORD:
			return {
				...state,
				password: data,
			};
		case SET_LOGGED_IN_PROF:
			return { ...state, ...data, loggedIn: true };
		case SET_PROF_LOG_OUT:
			return {
				...initialState,
			};
		case SET_SELECTED_COURSE:
			return {
				...state,
				selectedCourse: data,
			};
		case SET_SEARCH_TERM:
			return {
				...state,
				searchTerm: data,
			};
		case SET_SEARCH_RESULTS:
			return {
				...state,
				searchResults: data,
			};
		case SET_SELECTED_STUDENT:
			return {
				...state,
				selectedStudent: data,
			};
		default:
			return state;
	}
}
