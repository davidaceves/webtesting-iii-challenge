import React from "react";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";

import Display from "./Display.js";
import Controls from "../controls/Controls.js";
import Dashboard from "../dashboard/Dashboard.js";

describe("<Display />", () => {
  it("displays if gate is open/closed", () => {
    const { getByTestId } = render(<Dashboard />);

    const gate = getByTestId("closed_open");

    const buttonToggle = getByTestId(/toggleClosed/i);

    fireEvent.click(buttonToggle);

    expect(gate).toHaveTextContent(/Closed/i);

    fireEvent.click(buttonToggle);

    expect(gate).toHaveTextContent(/Open/i);
  });
});
