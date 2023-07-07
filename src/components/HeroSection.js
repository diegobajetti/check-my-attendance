import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
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
      <p>with open('check-my-attendance.txt', 'r') as file:</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize={isMobile ? "btn--medium" : "btn--large"}
        >
          if clicked_button == 'GET STARTED':
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize={isMobile ? "btn--medium" : "btn--large"}
        >
          learn_more = file.readlines()
          <FontAwesomeIcon
            icon={faPlayCircle}
            className="fa-play-circle"
          ></FontAwesomeIcon>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
