import React from "react";
import {
  Route,
  BrowserRouter,
  Routes as Switch,
} from "react-router-dom/dist/index.js";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import SignIn from "./components/pages/SignIn";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Switch>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/about-us" exact element={<AboutUs />}></Route>
        <Route path="/sign-in" exact element={<SignIn />}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
