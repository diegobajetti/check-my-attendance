import React from "react";
import Panel from "./Panel";
import "./CourseCard.css";

const CourseCard = ({ courseCode, onClick }) => {
	return (
		<Panel className="course-card" onClick={onClick}>
			<h3>{courseCode}</h3>
		</Panel>
	);
};

export default CourseCard;
