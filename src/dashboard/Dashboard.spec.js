import React from "react";
import * as rtl from "react-testing-library";
import renderer from "react-test-renderer";

import Dashboard from "./Dashboard.js";
import Display from "../display/Display.js";
import Controls from "../controls/Controls.js";

afterEach(rtl.cleanup);

describe("<Dashboard />", () => {
  it("matches snapshot", () => {
    const tree = renderer.create(<Dashboard />);

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe("defaults", () => {
  it("defaults to unlocked and open", () => {
    rtl.render(<Dashboard />).getByText(/unlocked/i);
    rtl.render(<Dashboard />).getByText(/open/i);
  });

  it("cannot be closed or opened if it is locked", () => {
    const condition = rtl.render(<Controls locked={true} closed={true} />);
    const button = condition.getByTestId("toggleClosed");

    expect(button.disabled).toBe(true);
  });

  it("renders controls and display", () => {
    const renderedControls = renderer.create(<Controls />);
    const renderedDisplay = renderer.create(<Display />);

    expect(renderedControls.toJSON()).toMatchSnapshot();
    expect(renderedDisplay.toJSON()).toMatchSnapshot();
  });
});
