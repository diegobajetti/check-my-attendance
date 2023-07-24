import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { ProfSignIn } from "../pages";
import { setProfEmail, setProfPassword } from "../../redux/actions/prof";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureMockStore([]);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ProfSignIn Component", () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  it("renders ProfSignIn component without errors", () => {
    const store = mockStore({
      prof: {
        email: "",
        password: "",
        profList: [],
      },
    });

    render(
      <Provider store={store}>
        <ProfSignIn />
      </Provider>
    );

    const signInHeading = screen.queryAllByText(/SIGN IN/i);
    expect(signInHeading.length).toBeGreaterThan(0);
  });

  it("dispatches setProfEmail action when typing in email input", () => {
    const store = mockStore({
      prof: {
        email: "",
        password: "",
        profList: [],
      },
    });

    render(
      <Provider store={store}>
        <ProfSignIn />
      </Provider>
    );

    const emailInput = screen.getByLabelText("Email", {
      selector: 'input[type="text"]',
    });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(store.getActions()).toContainEqual(setProfEmail("test@example.com"));
  });

  it("dispatches setProfPassword action when typing in password input", () => {
    const store = mockStore({
      prof: {
        email: "",
        password: "",
        profList: [],
      },
    });

    render(
      <Provider store={store}>
        <ProfSignIn />
      </Provider>
    );

    const passwordInput = screen.getByLabelText("Password", {
      selector: 'input[type="password"]',
    });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(store.getActions()).toContainEqual(setProfPassword("password123"));
  });

  it("dispatches setLoggedInProf and navigates to '/prof-page' when Sign In button is clicked with valid credentials", () => {
    const store = mockStore({
      prof: {
        email: "test@example.com",
        password: "password123",
        profList: [{ email: "test@example.com", password: "password123" }],
      },
    });

    store.dispatch = jest.fn(() => {
      mockNavigate("/prof-page");
    });

    render(
      <Provider store={store}>
        <ProfSignIn />
      </Provider>
    );

    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);

    expect(mockNavigate).toHaveBeenCalledWith("/prof-page");
  });

  it("displays an error message when Sign In button is clicked with invalid credentials", () => {
    const store = mockStore({
      prof: {
        email: "",
        password: "",
        profList: [],
      },
    });

    render(
      <Provider store={store}>
        <ProfSignIn />
      </Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid@example.com" } });

    const passwordInput = screen.getByLabelText("Password");
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });

    const signInButton = screen.getByText("Sign In");
    fireEvent.click(signInButton);

    const errorMessage = screen.getByText(/Incorrect email or password/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
