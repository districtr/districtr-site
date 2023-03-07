
import React from "react";
import { render } from "@testing-library/react";

import MapMenu from "./MapMenu";
import { MapMenuProps } from "./MapMenu.types";

describe("Test Component", () => {
  let props: MapMenuProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<MapMenu {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "test foo text";
    const { getByTestId } = renderComponent();

    const component = getByTestId("MapMenu");

    expect(component).toHaveTextContent("test foo text");
  });
});
