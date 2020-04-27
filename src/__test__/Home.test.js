import React from "react";
import ReactDOM from "react-dom";
import Home from "../front-end/components/Home";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

const p1 = `Viade-Rutas es un proyecto desarrollado por un grupo de alumnos de la Escuela de Ingeniería Informática del Software, en Oviedo, para la asignatura de Arquitectura del Software.`;

const p2 = `Se trata de una aplicación descentralizada, es decir, los datos con los que trabaja no se almacenan en una base de datos central, sino que cada usuario dispone de su propio espacio de almacenamiento, que recibe el nombre de POD. Es aquí donde se almacenan los datos del usuario junto con sus rutas, fotos, comentarios y además dispone de la responsabilidad total sobre esos datos.`;

test("El Home muestra el texto de bienvenida.", () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("welcome")).toHaveTextContent("¡Bienvenido a Viade!");
});

test("El Home muestra los párrafos de bienvenida.", () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("header-title")).toHaveTextContent("¿Qué es Viade-Rutas?");
  expect(getByTestId("p1")).toHaveTextContent(p1);
  expect(getByTestId("p2")).toHaveTextContent(p2);
});
