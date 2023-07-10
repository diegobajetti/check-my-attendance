import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import { studentReducer } from "./redux/reducers/index.js";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";

const reducers = combineReducers({
	student: studentReducer,
});
const store = configureStore({ reducer: reducers }, applyMiddleware(thunk));
const Container = connect()(App);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<Container />
	</Provider>
);
