import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { connect } from "react-redux";
import {
	setStudentLoginStatus,
	setStudentNewStatus,
	setStudentFirstName,
	setStudentLastName,
	setStudentId,
	addNewStudent,
} from "../redux/actions/student.js";
import { fetchListOfStudentIds, fetchStudentInfo } from "../server.js";
import Panel from "./Panel.js";
import "./Canvas.css";

const MODELS_URI = `${process.env.PUBLIC_URL}/models`;
const LABELS_URI = `${process.env.PUBLIC_URL}/labels`;
const NUM_IMGS_PER_LABEL = 5;

const Canvas = ({
	dispatchSetLoginStatus,
	dispatchSetStudentNewStatus,
	dispatchSetStudentFirstName,
	dispatchSetStudentLastName,
	dispatchSetStudentId,
}) => {
	const [modelsAreLoaded, setModelsAreLoaded] = useState(false);
	const [captureVideo, setCaptureVideo] = useState(false);
	const [failureMsg, setFailureMsg] = useState(null);
	const [loadingMsg, setLoadingMsg] = useState(null);
	const [labels, setLabels] = useState([]);

	const canvasRef = useRef(null);
	const videoRef = useRef(null);

	useEffect(() => {
		setLoadingMsg("Loading models...");
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_URI),
			faceapi.nets.ssdMobilenetv1.loadFromUri(MODELS_URI),
			faceapi.nets.faceRecognitionNet.loadFromUri(MODELS_URI),
			faceapi.nets.faceLandmark68Net.loadFromUri(MODELS_URI),
		])
			.then(() => {
				setModelsAreLoaded(true);
				setFailureMsg(null);
				setLoadingMsg(null);
			})
			.catch((error) => {
				setModelsAreLoaded(false);
				setFailureMsg("Error loading models");
			});

		const fetchLabels = async () => {
			try {
				const labels = await fetchListOfStudentIds();
				console.log(labels);
				setLabels(labels);
			} catch (error) {
				console.error("Error fetching list of student ids:", error);
			}
		};

		fetchLabels();
	}, []);

	const startVideo = () => {
		setCaptureVideo(true);
		setLoadingMsg("Loading video...");
		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: { ideal: 640 },
					height: { ideal: 480 },
					frameRate: { ideal: 30 },
				},
				audio: false,
			})
			.then((stream) => {
				const video = videoRef.current;
				video.srcObject = stream;
				video.play();

				setFailureMsg(null);
				setLoadingMsg(null);
			})
			.catch((error) => {
				setFailureMsg("Error getting media devices:", error);
			});

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		context.globalAlpha = 0;
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	};

	const endVideo = () => {
		videoRef.current.pause();
		videoRef.current.srcObject.getTracks()[0].stop();
		console.log("endVideo");

		setCaptureVideo(false);
		setLoadingMsg(null);
	};

	const getLabeledFaceDescriptions = () => {
		setLoadingMsg("Loading labeled face descriptions...");

		return Promise.all(
			labels.map(async (label) => {
				const descriptions = [];

				for (let i = 1; i <= NUM_IMGS_PER_LABEL; i++) {
					const img = await faceapi.fetchImage(
						`${LABELS_URI}/${label}/${i}.jpg`
					);
					const detections = await faceapi
						.detectSingleFace(img)
						.withFaceLandmarks()
						.withFaceDescriptor();
					descriptions.push(detections.descriptor);
				}
				setLoadingMsg(null);
				return new faceapi.LabeledFaceDescriptors(label, descriptions);
			})
		);
	};

	const handleOnPlay = async () => {
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
					width: 480,
					height: 640,
				};
				faceapi.matchDimensions(canvas, displaySize);

				const labeledFaceDescriptors =
					await getLabeledFaceDescriptions();
				const faceMatcher = new faceapi.FaceMatcher(
					labeledFaceDescriptors
				);

				setLoadingMsg("Loading face detections...");
				const detections = await faceapi
					.detectAllFaces(video)
					.withFaceLandmarks()
					.withFaceDescriptors();
				setLoadingMsg(null);

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

				setLoadingMsg("Drawing detection boxes...");
				results.forEach(async (result, i) => {
					const box = resizedDetections[i].detection.box;
					const drawBox = new faceapi.draw.DrawBox(box, {
						label: result,
					});
					drawBox.draw(canvas);

					const label = result ? result._label : "";

					if (label.toLowerCase() === "unknown") {
						setFailureMsg(
							"No match. If you not registered in the attendance taker, please do so below."
						);
						dispatchSetStudentNewStatus(true);
					} else {
						const student = await fetchStudentInfo(label);
						console.log(student);
						if (student) {
							setFailureMsg(null);

							const { firstName, lastName } = student;
							dispatchSetStudentFirstName(firstName);
							dispatchSetStudentLastName(lastName);
							dispatchSetStudentId(label);
							dispatchSetLoginStatus(true);
							dispatchSetStudentNewStatus(false);
						}
					}
				});
				setLoadingMsg(null);
			}
		}, 1000);
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

			<div className="convas-content-container">
				{captureVideo && loadingMsg && (
					<div className="loading-container">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
						<p>{loadingMsg}</p>
					</div>
				)}

				{modelsAreLoaded && (
					<Panel className="canvas-panel">
						<canvas
							className="camera-canvas"
							id="camera-canvas"
							ref={canvasRef}
						/>
						<video
							className={
								captureVideo ? "camera-canvas" : "hide-video"
							}
							id="face-video"
							ref={videoRef}
							onPlay={handleOnPlay}
						/>
					</Panel>
				)}
				{failureMsg && (
					<div className="alert alert-danger">{failureMsg}</div>
				)}
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSetLoginStatus: (status) =>
			dispatch(setStudentLoginStatus(status)),
		dispatchSetStudentNewStatus: (status) =>
			dispatch(setStudentNewStatus(status)),
		dispatchSetStudentFirstName: (firstName) =>
			dispatch(setStudentFirstName(firstName)),
		dispatchSetStudentLastName: (lastName) =>
			dispatch(setStudentLastName(lastName)),
		dispatchSetStudentId: (id) => dispatch(setStudentId(id)),
		dispatchAddNewStudent: () => dispatch(addNewStudent()),
	};
};

export default connect(null, mapDispatchToProps)(Canvas);
