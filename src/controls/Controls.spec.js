import React from "react";
import * as rtl from "react-testing-library";
import "jest-dom/extend-expect";

import Controls from "./Controls.js";
import Dashboard from "../dashboard/Dashboard.js";

afterEach(rtl.cleanup);

// provide buttons to toggle the closed and locked states.
// buttons' text changes to reflect the state the door will be in if clicked
// the closed toggle button is disabled if the gate is locked
// the locked toggle button is disabled if the gate is open

describe("<Controls />", () => {
  it("provides buttons to toggle the closed state", () => {
    const { getByText } = rtl.render(<Controls />);

    getByText(/Close Gate/i);
  });

  it("provides buttons to toggle the locked state", () => {
    const { getByText } = rtl.render(<Controls />);

    getByText(/Lock Gate/i);
  });

  it("displays if gate is open/closed", () => {
    const { getByTestId } = rtl.render(<Dashboard />);

    const gate = getByTestId("closed_open");

    const buttonToggle = getByTestId(/toggleClosed/i);

    rtl.fireEvent.click(buttonToggle);

    expect(gate).toHaveTextContent(/Closed/i);

    rtl.fireEvent.click(buttonToggle);

    expect(gate).toHaveTextContent(/Open/i);
  });

  it("displays if gate is locked/unlocked", () => {
    const { getByTestId } = rtl.render(<Dashboard />);

    const open_gate_display = getByTestId("closed_open");
    const lock_gate_display = getByTestId("locked_unlocked");

    const openToggle = getByTestId(/toggleClosed/i);
    const lockToggle = getByTestId(/toggleLock/i);

    rtl.fireEvent.click(openToggle); // Closes gate

    expect(open_gate_display).toHaveTextContent("Closed"); // Displays "Closed"

    rtl.fireEvent.click(lockToggle); // Locks gate

    expect(lock_gate_display).toHaveTextContent("Locked"); // Displays "Locked"

    rtl.fireEvent.click(lockToggle); // Unlocks gate

    expect(lock_gate_display).toHaveTextContent("Unlocked"); // Displays "Unlocked"
  });

  it("cannot be opened if the gate is locked", () => {
    const condition = rtl.render(<Controls locked={true} closed={true} />);
    const button = condition.getByTestId("toggleClosed");

    expect(button.disabled).toBe(true);
  });

  it("cannot be locked if the gate is open", () => {
    const condition = rtl.render(<Controls locked={false} closed={false} />);
    const button = condition.getByTestId("toggleLock");

    expect(button.disabled).toBe(true);
  });
});
