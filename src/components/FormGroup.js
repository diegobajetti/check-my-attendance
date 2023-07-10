import React, { useState } from "react";

const FormGroup = ({
	classNameDiv,
	classNameInput,
	type = "text",
	labelText,
	onChangeFunc,
}) => {
	return (
		<div className={`form-group${classNameDiv ? ` ${classNameDiv}` : ""}`}>
			<label>{labelText}</label>
			<input
				className={`form-control${
					classNameInput ? ` ${classNameInput}` : ""
				}`}
				type={type}
				onChange={(event) => onChangeFunc(event.target.value)}
			></input>
		</div>
	);
};

export default FormGroup;
