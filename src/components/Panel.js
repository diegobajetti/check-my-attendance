import React from "react";
import "./Panel.css";

const Panel = ({ className, children }) => {
	return (
		<div className={`cards__item__link${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
};

export default Panel;
