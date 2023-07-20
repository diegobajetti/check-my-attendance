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

const fetchStudentAttendance = async (studentId, courseCode) => {
	let records = {};
	try {
		const response = await fetch(
			`${process.env.PUBLIC_URL}/attendanceRecords.json`
		);
		if (!response.ok) {
			throw new Error("Unable to fetch JSON data file");
		}
		records = await response.json();
	} catch (err) {
		console.log("Error reading or parsing the JSON data file:", err);
		return null;
	}

	const student = Object.keys(records).includes(studentId)
		? records[studentId]
		: {};

	const record = Object.keys(student).includes(courseCode)
		? student[courseCode]
		: null;

	return record;
};

export { fetchStudentInfo, fetchStudentAttendance };
