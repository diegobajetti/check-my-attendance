import React from "react";
import {
	Route,
	HashRouter,
	Routes as Switch,
} from "react-router-dom/dist/index.js";
import "./App.css";
import Navbar from "./components/Navbar";
import {
	Home,
	SignIn,
	StudentSignIn,
	ProfSignIn,
	ProfPage,
} from "./components/pages/index.js";

function App() {
	return (
		<HashRouter basename={process.env.PUBLIC_URL}>
			<Navbar />
			<Switch>
				<Route path="/" exact element={<Home />}></Route>
				<Route path="/sign-in" exact element={<SignIn />}></Route>
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
				<Route path="/prof-page" exact element={<ProfPage />}></Route>
			</Switch>
		</HashRouter>
	);
}

export default App;
