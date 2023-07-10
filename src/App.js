import React from "react";
import {
	Route,
	BrowserRouter,
	Routes as Switch,
} from "react-router-dom/dist/index.js";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import StudentSignIn from "./components/pages/StudentSignIn";
import ProfSignIn from "./components/pages/ProfSignIn";

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Navbar />
			<Switch>
				<Route path="/" exact element={<Home />}></Route>
				<Route
					path="/student"
					exact
					element={<StudentSignIn />}
				></Route>
				<Route
					path="/prof-sign-in"
					exact
					element={<ProfSignIn />}
				></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
