import React from "react";

const FormGroup = ({
	classNameDiv,
	classNameInput,
	type = "text",
	labelText,
	onChangeFunc,
	inputRef,
}) => {
	return (
		<div className={`form-group${classNameDiv ? ` ${classNameDiv}` : ""}`}>
			<label>{labelText}</label>
			<input
				ref={inputRef}
				className={`form-control${
					classNameInput ? ` ${classNameInput}` : ""
				}`}
				type={type}
				onChange={(event) => {
					onChangeFunc(event.target.value);
				}}
			></input>
		</div>
	);
};

export default FormGroup;
