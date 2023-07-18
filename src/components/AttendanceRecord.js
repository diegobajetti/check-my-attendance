import React from "react";
import { connect } from "react-redux";
import "./AttendanceRecord.css";

const AttendanceRecord = ({ firstName, lastName, id, selectedCourse }) => {
	return (
		<div>
			<h2 id="attendance-record-title">{`Viewing ${firstName} ${lastName}'s attendance record`}</h2>
		</div>
	);
};

const mapStateToProps = ({
	prof: {
		selectedStudent: { firstName, lastName, id },
		selectedCourse,
	},
}) => {
	return {
		firstName,
		lastName,
		id,
		selectedCourse,
	};
};

export default connect(mapStateToProps)(AttendanceRecord);
