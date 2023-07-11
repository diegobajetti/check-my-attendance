import React from "react";
import "./Panel.css";

const Panel = ({ className, children, onClick = () => {} }) => {
	return (
		<div
			className={`cards__item__link${className ? ` ${className}` : ""}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Panel;
