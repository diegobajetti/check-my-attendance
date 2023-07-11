import React, { useRef, useEffect } from "react";
import Panel from "./Panel.js";
import "./Canvas.css";

const Canvas = () => {
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");

		context.fillStyle = "#000000";
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	}, []);

	return (
		<Panel className="canvas-panel">
			<canvas
				className="camera-canvas"
				id="camera-canvas"
				ref={canvasRef}
			/>
		</Panel>
	);
};

export default Canvas;
