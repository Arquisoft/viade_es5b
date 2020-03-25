import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";

// Ruta de prueba
let ruta = new Ruta("Ruta Avilés", [4.5, 5.4], "Muy buena ruta, entretenida.");

test("se renderiza sin fallos", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RouteCard ruta={ruta}></RouteCard>, div);
});

test("RouteCard contiene la información básica de la ruta.", () => {
  const { getByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
  expect(getByTestId("r-title")).toHaveTextContent(ruta.getNombre());
  expect(getByTestId("r-description")).toHaveTextContent(ruta.getDescripcion());
});

test("RouteCard contiene la información del inicio y los hitos de la ruta.", () => {});
