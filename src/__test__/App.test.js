import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../App";

test("Prueba de que la aplicación ejecuta", () => {
  afterAll(cleanup);
  var { getByTestId } = render(<App />);
  expect(getByTestId("aplicacion")).toBeInTheDocument();
});
