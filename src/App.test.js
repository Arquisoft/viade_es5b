import React from "react";
import { render } from "@testing-library/react";
import App from "./front-end/components/App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Viade - Arquitectura del Software/i);
  expect(linkElement).toBeInTheDocument();
});
