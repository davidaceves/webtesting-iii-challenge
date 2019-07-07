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

  it("displays 'Closed' if the `closed` prop is `true`", () => {
    const { getByTestId } = render(<Display closed={true} />);

    const gate = getByTestId("closed_open");

    expect(gate).toHaveTextContent(/Closed/i);
  });

  it("displays 'Open' if the `closed` prop is `false`", () => {
    const { getByTestId } = render(<Display closed={false} />);

    const gate = getByTestId("closed_open");

    expect(gate).toHaveTextContent(/Open/i);
  });
});
