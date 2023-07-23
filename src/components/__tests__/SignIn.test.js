import React from "react";
import "@testing-library/jest-dom/extend-expect";
import SignIn from "../pages/SignIn";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

afterEach(() => {
  cleanup();
});

test("renders both 'Student Sign In' and 'Professor Sign In' cards", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SignIn />
      </MemoryRouter>
    );
  
    const studentCard = screen.getByText("Student Sign In");
    const profCard = screen.getByText("Professor Sign In");
  
    expect(studentCard).toBeInTheDocument();
    expect(profCard).toBeInTheDocument();
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

test("displays the correct h3 text inside both cards", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SignIn />
      </MemoryRouter>
    );
  
    const studentCard = screen.getByText("Student Sign In");
    const profCard = screen.getByText("Professor Sign In");
  
    expect(studentCard.tagName).toBe("H3");
    expect(profCard.tagName).toBe("H3");
});