import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ProfPage } from "../pages";
import CourseView from "../CourseView";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureMockStore([thunk.withExtraArgument({ dispatch: jest.fn() })]);

const mockCourses = ["CSI3104", "CSI3140", "CSI3131", "CEG3185"];

describe("ProfPage Component", () => {
  it("renders ProfPage component without errors", () => {
    const store = mockStore({
      prof: {
        firstName: "John",
        lastName: "Doe",
        courseCodes: mockCourses,
        selectedCourse: "",
      },
    });

    render(
      <Provider store={store}>
        <ProfPage />
      </Provider>
    );

    const welcomeMessage = screen.getByText(/Welcome, John Doe/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it("renders course cards correctly", () => {
    const store = mockStore({
      prof: {
        firstName: "John",
        lastName: "Doe",
        courseCodes: mockCourses,
        selectedCourse: "",
      },
    });

    render(
      <Provider store={store}>
        <ProfPage />
      </Provider>
    );

    mockCourses.forEach((courseCode) => {
      const courseCard = screen.getByText(courseCode);
      expect(courseCard).toBeInTheDocument();
    });
  });

  it("displays course view when a course card is clicked", () => {
    const store = mockStore({
      prof: {
        firstName: "John",
        lastName: "Doe",
        courseCodes: mockCourses,
        selectedCourse: "",
      },
    });

    render(
      <Provider store={store}>
        <ProfPage />
      </Provider>
    );

    const courseCard = screen.getByText(mockCourses[0]);
    fireEvent.click(courseCard);

    const courseView = screen.getByRole("heading", { name: mockCourses[0] });
    expect(courseView).toBeInTheDocument();
  });

  it("displays 'Back to Course Selection' button when a course is selected", () => {
    const store = mockStore({
      prof: {
        firstName: "John",
        lastName: "Doe",
        courseCodes: mockCourses,
        selectedCourse: "CSI3104",
      },
    });

    render(
      <Provider store={store}>
        <ProfPage />
      </Provider>
    );

    const backButton = screen.getByText("Back to Course Selection");
    expect(backButton).toBeInTheDocument();
  });
});
