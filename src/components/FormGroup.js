import React from "react";

const FormGroup = ({
	classNameDiv,
	classNameInput,
	type = "text",
	labelText,
	onChangeFunc,
	inputRef,
	htmlFor,
}) => {
	return (
		<div className={`form-group${classNameDiv ? ` ${classNameDiv}` : ""}`}>
			<label htmlFor={htmlFor}>{labelText}</label>
			<input
				ref={inputRef}
				className={`form-control${
					classNameInput ? ` ${classNameInput}` : ""
				}`}
				type={type}
				onChange={(event) => {
					onChangeFunc(event.target.value);
				}}
				id={htmlFor}
			></input>
		</div>
	);
};

export default FormGroup;
