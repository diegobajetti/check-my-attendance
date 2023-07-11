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
			prof: { email, password, profList },
		} = getState();

		const profRecord = profList.filter(
			(prof) => prof.email === email && prof.password === password
		)[0];

		dispatch({
			type: SET_LOGGED_IN_PROF,
			data: profRecord,
		});
	};
};

export function setProfLogOut() {
	return {
		type: SET_PROF_LOG_OUT,
	};
}

export const setSelectedCourse = (courseCode = "") => {
	return (dispatch, getState) => {
		dispatch({ type: SET_SELECTED_COURSE, data: courseCode });

		if (courseCode === "") {
			dispatch(setSearchTerm(""));
			dispatch(setSearchResults([]));
			dispatch(setSelectedStudent(null));
		}
	};
};

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

export const setSelectedStudent = (studentId = "") => {
	return (dispatch, getState) => {
		const {
			prof: { searchResults },
		} = getState();

		let selectedStudent = searchResults.filter(
			(student) => student.id === studentId
		);
		selectedStudent =
			selectedStudent.length > 0 ? selectedStudent[0] : null;

		dispatch({
			type: SET_SELECTED_STUDENT,
			data: selectedStudent,
		});
	};
};

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

		dispatch(setSearchTerm(searchTerm));
		dispatch(setSearchResults(searchResults));
		if (searchResults.length == 0) {
			dispatch(setSelectedStudent(null));
		}
	};
};
