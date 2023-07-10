import React from "react";
import "../../App.css";
import { Button, Canvas, Form, FormGroup } from "../index.js";
import "./StudentSignIn.css";

export default function StudentSignIn() {
	return (
		<div className="container">
			<h1 className="about-us">STUDENT SIGN IN</h1>
			<Canvas />

			<Form>
				<FormGroup labelText="First name"></FormGroup>
				<FormGroup labelText="Last name"></FormGroup>
				<FormGroup labelText="Student number"></FormGroup>
			</Form>
		</div>
	);
}
