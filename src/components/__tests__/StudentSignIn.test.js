import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { StudentSignIn } from "../pages";
import { Canvas, CourseSelection, NewStudentForm } from "../index.js";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureMockStore([]);

jest.mock("../index.js", () => ({
  Canvas: jest.fn(() => <div data-testid="canvas-component">Mocked Canvas</div>),
  CourseSelection: jest.fn(() => (
    <div data-testid="course-selection-component">Mocked CourseSelection</div>
  )),
  NewStudentForm: jest.fn(() => (
    <div data-testid="new-student-form">Mocked NewStudentForm</div>
  )),
}));

describe("StudentSignIn Component", () => {
  it("renders StudentSignIn component without errors", () => {
    const store = mockStore({
      student: {
        currStudent: {
          isNew: true,
          loggedIn: false,
          firstName: "",
          lastName: "",
          id: "",
          courseCode: "",
        },
      },
    });

    render(
      <Provider store={store}>
        <StudentSignIn />
      </Provider>
    );

    const signInHeading = screen.queryByText(/STUDENT SIGN IN/i);
    expect(signInHeading).toBeInTheDocument();
  });

  it("displays Canvas component", () => {
    const store = mockStore({
      student: {
        currStudent: {
          isNew: true,
          loggedIn: false,
          firstName: "",
          lastName: "",
          id: "",
          courseCode: "",
        },
      },
    });

    render(
      <Provider store={store}>
        <StudentSignIn />
      </Provider>
    );

    const canvasComponent = screen.getByTestId("canvas-component");
    expect(canvasComponent).toBeInTheDocument();
  });

  it("displays CourseSelection component when logged in but not registered in a course", () => {
    const store = mockStore({
      student: {
        currStudent: {
          isNew: false,
          loggedIn: true,
          firstName: "John",
          lastName: "Doe",
          id: "12345",
          courseCode: "",
        },
      },
    });

    render(
      <Provider store={store}>
        <StudentSignIn />
      </Provider>
    );

    const courseSelectionComponent = screen.getByTestId(
      "course-selection-component"
    );
    expect(courseSelectionComponent).toBeInTheDocument();
  });

  it("displays welcome message and course details when logged in and registered in a course", () => {
    const store = mockStore({
      student: {
        currStudent: {
          isNew: false,
          loggedIn: true,
          firstName: "John",
          lastName: "Doe",
          id: "12345",
          courseCode: "CSI3104",
        },
      },
    });

    render(
      <Provider store={store}>
        <StudentSignIn />
      </Provider>
    );

    const welcomeMsg = screen.getByText(/Welcome, John Doe \(12345\)/i);
    const courseDetails = screen.getByText(/you are in attendance for CSI3104/i);
    expect(welcomeMsg).toBeInTheDocument();
    expect(courseDetails).toBeInTheDocument();
  });

  it("displays NewStudentForm when isNewStudent is true and not logged in", () => {
    const store = mockStore({
      student: {
        currStudent: {
          isNew: true,
          loggedIn: false,
          firstName: "",
          lastName: "",
          id: "",
          courseCode: "",
        },
      },
    });

    render(
      <Provider store={store}>
        <StudentSignIn />
      </Provider>
    );

    const newStudentForm = screen.getByTestId("new-student-form");
    expect(newStudentForm).toBeInTheDocument();
  });
});
