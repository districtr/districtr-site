
import React from "react";
import { render } from "@testing-library/react";

import MapHeader from "./MapHeader";
import { MapHeaderProps } from "./MapHeader.types";

describe("Test Component", () => {
  let props: MapHeaderProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<MapHeader {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "test foo text";
    const { getByTestId } = renderComponent();

    const component = getByTestId("MapHeader");

    expect(component).toHaveTextContent("test foo text");
  });
});
