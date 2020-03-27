import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddRuta from "../front-end/components/ruta/AddRuta";



//Componente AddRuta
test("Comprobar que se renderiza sin fallos el componente AddRuta", () => {
    const div = document.createElement("div");
    const { getByTestId } = render(<AddRuta ></AddRuta>, div);
    
});

//PRUEBAS PARA EL FORMULARIO DE AÑADIR RUTA
test("Comprobar que se visualizan los encabezados del formulario para añadir una ruta", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);
    expect(getByTestId("titleAñadirRuta")).toHaveTextContent("Añadir rutas:");
    expect(getByTestId("titlelugarInicio")).toHaveTextContent("Lugar de inicio:");
});

test("Comprobar que se visualizan las etiquetas del formulario para añadir una ruta", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);

    expect(getByTestId("e-nombreRuta")).toHaveTextContent("Nombre de la ruta:");
    expect(getByTestId("e-latitudRuta")).toHaveTextContent("Latitud de la ruta:");
    expect(getByTestId("e-longitudRuta")).toHaveTextContent("Longitud de la ruta:");
    expect(getByTestId("e-descripcionRuta")).toHaveTextContent("Descripción de la ruta:");
});

test("Comprobar que se visualiza el botón para añadir/guardar una ruta", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);
    expect(getByTestId("addRouteButton")).toHaveTextContent("Añadir ruta");
    expect(getByTestId("saveRouteButton")).toHaveTextContent("Guardar ruta");
});




//PRUEBAS PARA EL FORMULARIO DE AÑADIR HITO
test("Comprobar que se visualizan los encabezados del formulario para añadir un hito", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);
    expect(getByTestId("titleAñadirHito")).toHaveTextContent("Añadir hitos para la ruta:");

});

test("Comprobar que se visualizan las etiquetas del formulario para añadir un hito", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);

    expect(getByTestId("e-nombreHito")).toHaveTextContent("Nombre del hito:");
    expect(getByTestId("e-latitudHito")).toHaveTextContent("Latitud del hito:");
    expect(getByTestId("e-longitudHito")).toHaveTextContent("Longitud del hito:");
});

test("Comprobar que se visualiza el botón para añadir un hito", () => {
    const { getByTestId } = render(<AddRuta ></AddRuta>);
    expect(getByTestId("addHitoButton")).toHaveTextContent("Añadir hito");
});

