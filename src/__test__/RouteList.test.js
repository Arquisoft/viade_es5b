import React from "react";
import ReactDOM from "react-dom";
import RouteList from "../front-end/components/ruta/VerRutas/RouteList";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// Rutas de prueba
let rutas = [];
function setUp() {
  let ruta1 = new Ruta(
    "Ruta Avilés",
    [4.5, 5.4],
    "Muy buena ruta, entretenida."
  );
  let hito11 = new Hito("Niemeyer", 4, 3.2);
  let hito21 = new Hito("Parque Ferrera", 5, 5.7);
  ruta1.addHito(hito11);
  ruta1.addHito(hito21);

  let ruta2 = new Ruta("Ruta Candás", [5.6, 5.2], "Me encanta Candás.");
  let hito12 = new Hito("Río de Candás", 4.1, 3.3);
  let hito22 = new Hito("Parque Ferrera", 5, 3.22);
  ruta2.addHito(hito12);
  ruta2.addHito(hito22);
}

test("Componente se renderiza sin crahsear", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RouteList rutas={[]}></RouteList>, div);
});
