import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { studentReducer, profReducer } from "./redux/reducers/index.js";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

const reducers = combineReducers({
	student: studentReducer,
	prof: profReducer,
});
const store = configureStore({
	reducer: reducers,
	middleware: [thunk],
	devTools: true,
});
const Container = connect()(App);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<Container />
	</Provider>
);
