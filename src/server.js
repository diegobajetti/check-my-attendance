const fetchStudentInfo = async (studentId) => {
	let students = {};
	try {
		const response = await fetch(
			`${process.env.PUBLIC_URL}/studentInfo.json`
		);
		if (!response.ok) {
			throw new Error("Unable to fetch JSON data file");
		}
		students = await response.json();
	} catch (err) {
		console.log("Error reading or parsing the JSON data file:", err);
		return null;
	}

	const student = Object.keys(students).includes(studentId)
		? students[studentId]
		: null;

	return student;
};

export { fetchStudentInfo };
