import React from "react";
import Panel from "./Panel";
import "./ClickableCard.css";

const ClickableCard = ({ className, children, onClick }) => {
	return (
		<Panel
			className={`clickable-card${className ? ` ${className}` : ""}`}
			onClick={onClick}
		>
			{children}
		</Panel>
	);
};

export default ClickableCard;
