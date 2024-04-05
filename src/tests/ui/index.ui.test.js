//index.ui.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "../../../pages";

describe("Index Page", () => {
  it("renders the welcome message", () => {
    render(<Index />);
    expect(screen.getByText("Welcome to the Home Page")).toBeInTheDocument();
  });

  it("has a link to the sign-up page", () => {
    render(<Index />);
    expect(screen.getByText("Go to the sign-up page")).toHaveAttribute(
      "href",
      "/ui/sign-up"
    );
  });

  it("has a link to the sign-in page", () => {
    render(<Index />);
    expect(screen.getByText("Go to the sign-in page")).toHaveAttribute(
      "href",
      "/ui/sign-in"
    );
  });

  it("has a link to the about page", () => {
    render(<Index />);
    expect(screen.getByText("Go to the about page")).toHaveAttribute(
      "href",
      "/ui/about"
    );
  });

  it("has a link to the landing page", () => {
    render(<Index />);
    expect(screen.getByText("Go to the landing page")).toHaveAttribute(
      "href",
      "/ui/landing"
    );
  });
});
