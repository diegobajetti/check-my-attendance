import React, { useEffect, useState } from "react";
import Button from "./Button";
import "./HeroSection.css";

function HeroSection() {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 960);
	useEffect(() => {
		window.addEventListener(
			"resize",
			() => {
				const ismobile = window.innerWidth <= 960;
				if (ismobile !== isMobile) setIsMobile(ismobile);
			},
			false
		);
	}, [isMobile]);

	return (
		<div className="hero-container">
			<video
				src={process.env.PUBLIC_URL + "/videos/video-1.mp4"}
				autoPlay="autoPlay"
				loop="loop"
				muted="muted"
				playsInline="playsInline"
			/>
			<h1>Check My Attendance</h1>
			<p>Using facial recognition to simplify attendance taking</p>
			<div className="hero-btns">
				<Button
					linkTo="/student"
					className="btns-in-hero"
					buttonStyle="btn--outline"
					buttonSize={isMobile ? "btn--medium" : "btn--large"}
				>
					TAKE MY ATTENDANCE
				</Button>
			</div>
		</div>
	);
}

export default HeroSection;
