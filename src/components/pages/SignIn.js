import React from "react";
import { ClickableCard } from "../index";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
	const navigate = useNavigate();

	return (
		<div className="sign-in-container">
			<ClickableCard onClick={() => navigate("/student")}>
				<h3>Student Sign In</h3>
			</ClickableCard>
			<ClickableCard onClick={() => navigate("/prof-sign-in")}>
				<h3>Professor Sign In</h3>
			</ClickableCard>
		</div>
	);
};

export default SignIn;
