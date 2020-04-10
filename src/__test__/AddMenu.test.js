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

test("Se muestran tres items de menú", () => {});
