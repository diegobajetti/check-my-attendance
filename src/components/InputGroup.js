import React from "react";
import "./InputGroup.css";

const InputGroup = ({
	inputRef,
	labelText,
	onClick,
	btnLabel,
	inputType = "text",
	placeholder,
	btnClass = "btn-outline-secondary",
	btnType = "button",
	onChange,
}) => {
	return (
		<div className="input-group-container">
			<label id="input-group-label">{labelText}</label>
			<div className="input-group mb-3">
				<input
					ref={inputRef}
					type={inputType}
					className="form-control"
					placeholder={placeholder}
					onChange={(event) => onChange(event.target.value)}
				></input>
				<div class="input-group-append">
					<button
						className={`btn ${btnClass}`}
						id="input-group-addon-btn"
						type={btnType}
						onClick={() => onClick()}
					>
						{btnLabel}
					</button>
				</div>
			</div>
		</div>
	);
};

export default InputGroup;
