
import React from "react";
import { render } from "@testing-library/react";

import MapLoader from "./MapLoader";
import { MapLoaderProps } from "./MapLoader.types";

describe("Test Component", () => {
  let props: MapLoaderProps;

  beforeEach(() => {
    props = {
      foo: "bar"
    };
  });

  const renderComponent = () => render(<MapLoader {...props} />);

  it("should render foo text correctly", () => {
    props.foo = "test foo text";
    const { getByTestId } = renderComponent();

    const component = getByTestId("MapLoader");

    expect(component).toHaveTextContent("test foo text");
  });
});
