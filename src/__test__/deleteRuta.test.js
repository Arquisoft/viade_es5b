import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";



// Rutas de prueba
let ruta = new Ruta("Ruta Avilés", [4.5, 5.4], "Muy buena ruta, entretenida.");
let hito1 = new Hito("Niemeyer", 4, 3.2);
let hito2 = new Hito("Parque Ferrera", 4.5, 5.7);
ruta.addHito(hito1);
ruta.addHito(hito2);

console.log("-------------------" + ruta.getHitos().length);


test("RouteCard contiene el botón de eliminar.", () => {
    const { getByTestId } = render(<RouteCard ruta={ruta}></RouteCard>);
    expect(getByTestId("rb-eliminar")).toHaveTextContent("Eliminar");
});

  
