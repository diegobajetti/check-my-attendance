import React from "react";
import "@testing-library/jest-dom/extend-expect";
import SignIn from "../pages/SignIn";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

afterEach(() => {
  cleanup();
});

test("test student signin card", () => {
  const navigate = jest.fn();
  require("react-router-dom").useNavigate.mockReturnValue(navigate);

  render(
    <MemoryRouter initialEntries={["/"]}>
      <SignIn />
    </MemoryRouter>
  );

  const studentCard = screen.getByText("Student Sign In");
  fireEvent.click(studentCard);

  //check if navigate was called with the correct path
  expect(navigate).toHaveBeenCalledWith("/student");
});

test("test professor signin card", () => {
  const navigate = jest.fn();
  require("react-router-dom").useNavigate.mockReturnValue(navigate);

  render(
    <MemoryRouter initialEntries={["/"]}>
      <SignIn />
    </MemoryRouter>
  );

  const profCard = screen.getByText("Professor Sign In");
  fireEvent.click(profCard);

  //check if navigate was called with the correct path
  expect(navigate).toHaveBeenCalledWith("/prof-sign-in");
});
