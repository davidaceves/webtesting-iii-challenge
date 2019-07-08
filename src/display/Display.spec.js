import React from "react";
import renderer from "react-test-renderer";
import "jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";

import Display from "./Display.js";
import Controls from "../controls/Controls.js";
import Dashboard from "../dashboard/Dashboard.js";

// displays if gate is open/closed and if it is locked/unlocked DONE
// displays 'Closed' if the closed prop is true and 'Open' if otherwise DONE
// displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise DONE
// when locked or closed use the red-led class
// when unlocked or open use the green-led class

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

  it("displays 'Locked' if the locked prop is `true`", () => {
    const { getByTestId } = render(<Display locked={true} />);

    const gate = getByTestId("locked_unlocked");

    expect(gate).toHaveTextContent(/Locked/i);
  });

  it("displays 'Unlocked' if the locked prop is `false`", () => {
    const { getByTestId } = render(<Display locked={false} />);

    const gate = getByTestId("locked_unlocked");

    expect(gate).toHaveTextContent(/Unlocked/i);
  });

  it("displays a red-led when locked or closed", () => {
    const { getByTestId } = render(<Display locked={true} closed={true} />);

    const locked_gate = getByTestId("locked_unlocked");
    const closed_gate = getByTestId("closed_open");

    expect(locked_gate).toHaveClass(`red-led`);
    expect(closed_gate).toHaveClass(`red-led`);
  });

  it("displays a green-led when unlocked or opened", () => {
    const { getByTestId } = render(<Display locked={false} closed={false} />);

    const unlocked_gate = getByTestId("locked_unlocked");
    const open_gate = getByTestId("closed_open");

    expect(unlocked_gate).toHaveClass(`green-led`);
    expect(open_gate).toHaveClass(`green-led`);
  });
});
