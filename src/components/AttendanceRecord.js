import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchStudentAttendance } from "../server";
import "./AttendanceRecord.css";
import "./Canvas.css";

const AttendanceRecord = ({ firstName, lastName, id, selectedCourse }) => {
	const [record, setRecord] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAttendanceRecord = async () => {
			try {
				setLoading(true);
				const fetchedRecord = await fetchStudentAttendance(
					id,
					selectedCourse
				);
				setRecord(fetchedRecord);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching attendance record:", error);
				setLoading(false);
			}
		};

		fetchAttendanceRecord();
	}, [id, selectedCourse]);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
				<p>Loading record...</p>
			</div>
		);
	}

	const entries = Object.entries(record);
	return (
		<div>
			<h2 id="attendance-record-title">{`Viewing ${firstName} ${lastName} (${id})'s attendance record`}</h2>
			<div className="tcontainer tex-left">
				<div className="row">
					<div className="col">Date (dd/mm/yy)</div>
					<div className="col">Attendance</div>
				</div>
				{entries.map(([date, didAttend]) => {
					return (
						<div className="row" key={date}>
							<div className="col">{date}</div>
							<div className="col">
								{didAttend ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-check-lg"
										viewBox="0 0 16 16"
									>
										<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										className="bi bi-x-lg"
										viewBox="0 0 16 16"
									>
										<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
									</svg>
								)}
							</div>
						</div>
					);
				})}
			</div>
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
