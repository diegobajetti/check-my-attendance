import React from "react";

const FormGroup = ({
	classNameDiv,
	classNameInput,
	type = "text",
	labelText,
}) => {
	return (
		<div className={`form-group${classNameDiv ? ` ${classNameDiv}` : ""}`}>
			<label>{labelText}</label>
			<input
				className={`form-control${
					classNameInput ? ` ${classNameInput}` : ""
				}`}
				type={type}
			></input>
		</div>
	);
};

export default FormGroup;
