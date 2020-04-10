import React from "react";
import ReactDOM from "react-dom";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RutaService from "./__mocks__/RutaService";
import AddMenu from "../front-end/components/ruta/AñadirRuta/AddMenu";

test("Se renderiza sin fallos", () => {
  let div = document.createElement("div");
  ReactDOM.render(<AddMenu />, div);
});

test("Se muestran tres items de menú", () => {
  const { getAllByRole } = render(<AddMenu />);
  expect(getAllByRole("menu-item")).toHaveLength(3);
});

test("Se muestran los títulos de los menu items correctamente", () => {
  const { getByTestId } = render(<AddMenu />);
  expect(getByTestId("manual")).toHaveTextContent("Crear manualmente");
  expect(getByTestId("conmapa")).toHaveTextContent("Crear con un mapa");
  expect(getByTestId("confichero")).toHaveTextContent(
    "Crear a partir de fichero"
  );
});

test("Los enlaces a los componentes son correctos.", () => {
  const { getByTestId } = render(<AddMenu />);
  expect(getByTestId("a-manual")).toHaveAttribute("href", "#/add-ruta");
  expect(getByTestId("a-mapa")).toHaveAttribute("href", "#/add-ruta-map");
});
