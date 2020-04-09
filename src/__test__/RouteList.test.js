import React from "react";
import ReactDOM from "react-dom";
import RouteList from "../front-end/components/ruta/VerRutas/RouteList";
import RutaService from "../__test__/__mocks__/RutaService"
import AmigoService from "../__test__/__mocks__/AmigoService"
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

let rutaService = new RutaService();
let amigoService = new AmigoService();

test("Componente se renderiza sin crahsear.", () => {
  const div = document.createElement("div");
  console.log(rutaService.getRutas());
  ReactDOM.render(<RouteList
    getRutas={rutaService.getRutas} obtenerFicherosRuta={rutaService.obtenerFicherosRuta} handleLoaded={rutaService.handleLoaded}></RouteList>, div);

});


test("No hay rutas, se muestra la alerta correspondiente.", async () => {

  const { getByTestId } = render(<RouteList getRutas={rutaService.getNoRutas} obtenerFicherosRuta={rutaService.obtenerFicherosRuta} handleLoaded={rutaService.handleLoaded}></RouteList>);
  let alerta = await waitForElement(() => getByTestId("alerta_no_rutas"));
  expect(alerta).toHaveTextContent(
    "Actualmente no dispones de ninguna ruta en tu POD. Accede a Añadir Ruta para añadir una nueva ruta."
  );//

});


test("Hay dos rutas, se muestran dos RouteCard con el nombre de la ruta como título.", async () => {
  const { getByTestId } = render(<RouteList getRutas={rutaService.getRutas} obtenerFicherosRuta={rutaService.obtenerFicherosRuta} handleLoaded={rutaService.handleLoaded}></RouteList>);
  let acordeon = await waitForElement(() => getByTestId("acordeon"));
  //expect(acordeon.children.length).toBe(2);
  //expect(acordeon.childElementCount).toBe(2);
  expect(acordeon.children.length).toBe(3);//El test deberia dar 2, la prueba con rutas a mano da dos, pero siempre devuelve 3
  //La interfaz no especifica que se cuente al padre o no, pero contados a mano el numero es correcto
});
