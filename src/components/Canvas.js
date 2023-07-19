import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { connect } from "react-redux";
import { setStudentLoginStatus } from "../redux/actions/student.js";
import Panel from "./Panel.js";
import "./Canvas.css";
// const fs = require("fs");

const MODELS_URI = `${process.env.PUBLIC_URL}/models`;
const LABELS_URI = `${process.env.PUBLIC_URL}/labels`;

const Canvas = ({ dispatchSetLoginStatus }) => {
	const [modelsAreLoaded, setModelsAreLoaded] = useState(false);
	const [captureVideo, setCaptureVideo] = useState(false);
	const [failureMsg, setFailureMsg] = useState(null);

	const canvasRef = useRef(null);
	const videoRef = useRef(null);

	useEffect(() => {
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URI),
			faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URI),
			faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URI),
			faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URI),
		])
			.then(() => {
				setModelsAreLoaded(true);
				setFailureMsg(null);
			})
			.catch((error) => {
				setModelsAreLoaded(false);
				setFailureMsg("Error loading models");
			});
	});

	function startVideo() {
		setCaptureVideo(true);
		navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: false,
			})
			.then((stream) => {
				const video = videoRef.current;
				video.srcObject = stream;
				video.play();

				setFailureMsg(null);
			})
			.catch((error) => {
				setFailureMsg("Error getting media devices");
			});

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.globalAlpha = 0;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
		// canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	}

	function endVideo() {
		videoRef.current.pause();
		videoRef.current.srcObject.getTracks()[0].stop();
		console.log("endVideo");
		setCaptureVideo(false);

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		// TODO: set canvas to black screen
		// context.globalAlpha = 1;
		// context.fillStyle = "#000000";
		// context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	}

	function getLabeledFaceDescriptions() {
		const labels = ["300168292"];
		console.log("getLabeledFaceDescriptions");
		return Promise.all(
			labels.map(async (label) => {
				const descriptions = [];

				// TODO: get number of files in directory
				// const numImgs = fs.readdir(LABELS_URI, (error, files) => {
				// 	return files.length;
				// });
				const numImgs = 7;
				for (let i = 1; i <= numImgs; i++) {
					const img = await faceapi.fetchImage(
						`${LABELS_URI}/${label}/${i}.jpg`
					);
					const detections = await faceapi
						.detectSingleFace(img)
						.withFaceLandmarks()
						.withFaceDescriptor();
					descriptions.push(detections.descriptor);
				}
				return new faceapi.LabeledFaceDescriptors(label, descriptions);
			})
		);
	}

	const handleOnPlay = async () => {
		console.log("handleOnPlay");
		console.log({ captureVideo });
		if (!navigator.mediaDevices) {
			console.error("mediaDevices not supported");
			setFailureMsg("Media devices are not supported");
			return;
		}

		const video = videoRef.current;

		setInterval(async () => {
			if (captureVideo && canvasRef && canvasRef.current) {
				canvasRef.current.innerHTML = faceapi.createCanvas(video);

				const canvas = canvasRef.current;

				const displaySize = {
					width: video.width,
					height: video.height,
				};
				faceapi.matchDimensions(canvas, displaySize);

				const labeledFaceDescriptors =
					await getLabeledFaceDescriptions();
				const faceMatcher = new faceapi.FaceMatcher(
					labeledFaceDescriptors
				);

				const detections = await faceapi
					.detectAllFaces(video)
					.withFaceLandmarks()
					.withFaceDescriptors();

				const resizedDetections = faceapi.resizeResults(
					detections,
					displaySize
				);

				canvas
					.getContext("2d")
					.clearRect(0, 0, canvas.width, canvas.height);

				const results = resizedDetections.map((d) => {
					return faceMatcher.findBestMatch(d.descriptor);
				});
				results.forEach((result, i) => {
					const box = resizedDetections[i].detection.box;
					const drawBox = new faceapi.draw.DrawBox(box, {
						label: result,
					});
					drawBox.draw(canvas);
				});
			}
		}, 100);
	};

	return (
		<>
			<div className="btn-container">
				{captureVideo ? (
					<button className="btn btn-secondary" onClick={endVideo}>
						End Video Capture
					</button>
				) : (
					<button className="btn btn-dark" onClick={startVideo}>
						Start Video Capture
					</button>
				)}
			</div>
			{modelsAreLoaded && (
				<Panel className="canvas-panel">
					<canvas
						className="camera-canvas"
						id="camera-canvas"
						ref={canvasRef}
					/>
					<video
						className="camera-canvas"
						id="face-video"
						autoPlay
						ref={videoRef}
						onPlay={handleOnPlay}
					/>
				</Panel>
			)}
			{failureMsg && (
				<div className="alert alert-danger">{failureMsg}</div>
			)}
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetLoginStatus: (status) =>
			dispatch(setStudentLoginStatus(status)),
	};
};

export default connect(null, mapDispatchToProps)(Canvas);
