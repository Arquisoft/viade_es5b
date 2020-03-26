import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

// Ruta de prueba
let ruta = new Ruta("Ruta Avilés", [4.5, 5.4], "Muy buena ruta, entretenida.");
let hito1 = new Hito("Niemeyer", 4, 3.2);
let hito2 = new Hito("Parque Ferrera", 5, 5.7);
ruta.addHito(hito1);
ruta.addHito(hito2);

/**
 * Tests de prueba unitarios
 */

test("Se renderiza sin fallos", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RouteCard ruta={ruta}></RouteCard>, div);
});

test("RouteCard contiene la información básica de la ruta.", () => {
  const { getByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
  expect(getByTestId("r-title")).toHaveTextContent(ruta.getNombre());
  expect(getByTestId("r-description")).toHaveTextContent(ruta.getDescripcion());
  // Botones de ver en el mapa y eliminar
  expect(getByTestId("rb-ver")).toHaveTextContent("Ver en el mapa");
  expect(getByTestId("rb-eliminar")).toHaveTextContent("Eliminar");
});

test("RouteCard contiene la información del inicio y los hitos de la ruta.", () => {
  const { getByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
  const body = getByTestId("r-hitos");
  const rows = body.children;

  expect(rows.length).toBe(3);
  expect(rows[0].children[0].textContent).toBe("Inicio");
  for (let i = 0; i < rows.length; i++) {
    if (i == 0) {
      expect(rows[i].children[0].textContent).toBe("Inicio");
      expect(parseFloat(rows[i].children[1].textContent)).toBe(
        ruta.getInicio()[0]
      );
      expect(parseFloat(rows[i].children[2].textContent)).toBe(
        ruta.getInicio()[1]
      );
    } else {
      expect(rows[i].children[0].textContent).toBe(
        ruta.getHitos()[i - 1].getNombre()
      );
      expect(parseFloat(rows[i].children[1].textContent)).toBe(
        ruta.getHitos()[i - 1].getLat()
      );
      expect(parseFloat(rows[i].children[2].textContent)).toBe(
        ruta.getHitos()[i - 1].getLong()
      );
    }
  }
});

test("Al hacer click en Ver en el map se muestra el componente MapRuta", async () => {});
