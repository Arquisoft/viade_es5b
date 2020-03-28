import React from "react";
import ReactDOM from "react-dom";
import VerRutas from "../front-end/components/ruta/VerRutas/VerRutas";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, getByText } from "@testing-library/react";
import "@testing-library/jest-dom";

// Ruta de prueba
let ruta = new Ruta("Ruta Avilés", [4.5, 5.4], "Muy buena ruta, entretenida.");
let hito1 = new Hito("Niemeyer", 4, 3.2);
let hito2 = new Hito("Parque Ferrera", 4.5, 5.7);
ruta.addHito(hito1);
ruta.addHito(hito2);
console.log("-------------------" + ruta.getHitos().length);

test("se renderiza sin fallos", () => {
  const div = document.createElement("div");
  ReactDOM.render(<VerRutas></VerRutas>, div);
});

/*test("RouteCard contiene la información básica de la ruta.", () => {
  const { getByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
  expect(getByTestId("r-title")).toHaveTextContent(ruta.getNombre());
  expect(getByTestId("r-description")).toHaveTextContent(ruta.getDescripcion());
});

test("RouteCard contiene la información del inicio y los hitos de la ruta.", () => {
  const { getByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
  const body = getByTestId("r-hitos");
  const rows = body.children;
  expect(rows[0].children[0].textContent).toBe("Inicio");

  //expect(body.children.length).toBe(3);// TODO: esperar a que arregle lucia AñadirRuta
});

test("Comprobando que genera el elemento map", () =>{
  const div = document.createElement("div");
  ReactDOM.render(<RouteCard ruta={ruta}></RouteCard>, div);
  div.querySelector("map");
});*/
