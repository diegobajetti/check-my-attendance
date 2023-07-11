import {
	SET_PROF_EMAIL,
	SET_PROF_PASSWORD,
	SET_LOGGED_IN_PROF,
	SET_PROF_LOG_OUT,
	SET_SELECTED_COURSE,
	SET_SEARCH_TERM,
	SET_SEARCH_RESULTS,
} from "../constants";

export function setProfEmail(email = "") {
	return {
		type: SET_PROF_EMAIL,
		data: email,
	};
}

export function setProfPassword(password = "") {
	return {
		type: SET_PROF_PASSWORD,
		data: password,
	};
}

export const setLoggedInProf = () => {
	return (dispatch, getState) => {
		const {
			prof: { email, password },
		} = getState();

		dispatch({
			type: SET_LOGGED_IN_PROF,
			data: { email, password },
		});
	};
};

export function setProfLogOut() {
	return {
		type: SET_PROF_LOG_OUT,
	};
}

export function setSelectedCourse(courseCode = "") {
	return {
		type: SET_SELECTED_COURSE,
		data: courseCode,
	};
}

export function setSearchTerm(searchTerm = "") {
	return {
		type: SET_SEARCH_TERM,
		data: searchTerm,
	};
}

export function setSearchResults(searchResults = []) {
	return {
		type: SET_SEARCH_RESULTS,
		data: searchResults,
	};
}

export const searchStudents = (searchTerm = "") => {
	return (dispatch, getState) => {
		const {
			student: { studentList = [] },
			prof: { selectedCourse = "" },
		} = getState();

		const searchResults = studentList.filter((student) => {
			const {
				firstName = "",
				lastName = "",
				id = "",
				courseCodes = [],
			} = student;
			return (
				(firstName.indexOf(searchTerm) !== -1 ||
					lastName.indexOf(searchTerm) !== -1 ||
					id.indexOf(searchTerm) !== -1) &&
				courseCodes.includes(selectedCourse)
			);
		});

		dispatch(setSearchResults(searchResults));
	};
};
