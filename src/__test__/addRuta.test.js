import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddRuta from "../front-end/components/ruta/AddRuta";


//PRUEBAS PARA EL FORMULARIO DE AÑADIR RUTA
test("Comprobar que se visualizan los encabezados del formulario para añadir una ruta", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);
    expect(getByTestId("titleAñadir")).toHaveTextContent("Añadir rutas:");
    expect(getByTestId("lugarInicio")).toHaveTextContent("Lugar de inicio:");
});

test("Comprobar que se visualizan las etiquetas del formulario para añadir una ruta", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);

    expect(getByTestId("e-nombreRuta")).toHaveTextContent("Nombre de la ruta:");
    expect(getByTestId("e-latitudRuta")).toHaveTextContent("Latitud de la ruta:");
    expect(getByTestId("e-longitudRuta")).toHaveTextContent("Longitud de la ruta:");
    expect(getByTestId("e-descripcionRuta")).toHaveTextContent("Descripción de la ruta:");
});

test("Comprobar que se visualiza el botón para añadir una ruta", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);
    expect(getByTestId("addButton")).toHaveTextContent("Añadir ruta");
});


//PRUEBAS PARA EL FORMULARIO DE AÑADIR HITO