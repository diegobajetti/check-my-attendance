import {
	SET_PROF_EMAIL,
	SET_PROF_PASSWORD,
	SET_LOGGED_IN_PROF,
	SET_PROF_LOG_OUT,
	SET_SELECTED_COURSE,
	SET_SEARCH_TERM,
	SET_SEARCH_RESULTS,
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
	profList: [
		{
			email: "prof1@uottawa.ca",
			password: "password1",
			courseCodes: ["CSI3140"],
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
	const { profList } = state;
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
			const { email, password } = data;
			const profRecord = profList.filter(
				(prof) => prof.email === email && prof.password === password
			)[0];

			return { ...state, ...profRecord, loggedIn: true };
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
		default:
			return state;
	}
}
