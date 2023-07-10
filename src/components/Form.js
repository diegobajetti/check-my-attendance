import React from "react";
import "./Form.css";

const Form = ({ className, children, submitFunc }) => {
	return (
		<form className={`form${className ? ` ${className}` : ""}`}>
			{children}
			<button type="submit" class="btn btn-primary" onClick={submitFunc}>
				Submit
			</button>
		</form>
	);
};

export default Form;
