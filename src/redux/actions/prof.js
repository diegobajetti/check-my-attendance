import {
	SET_PROF_EMAIL,
	SET_PROF_PASSWORD,
	SET_LOGGED_IN_PROF,
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
