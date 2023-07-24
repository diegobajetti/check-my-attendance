import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import { Home } from "../pages";

test("renders Home component without errors", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});

test("renders HeroSection component inside Home", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const heroSection = screen.queryByText("Check My Attendance");
  expect(heroSection).toBeInTheDocument();
});

test("renders correct content inside HeroSection component", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const heading = screen.getByText("Check My Attendance");
  const paragraph = screen.getByText("Using facial recognition to simplify attendance taking");

  expect(heading).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});
