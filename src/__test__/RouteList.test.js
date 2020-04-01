import React from "react";
import ReactDOM from "react-dom";
import RouteList from "../front-end/components/ruta/VerRutas/RouteList";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import RutaService from "../__test__/__mocks__/RutaService"
import AmigoService from "../__test__/__mocks__/AmigoService"
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../__test__/__mocks__/RutaService.js")
jest.mock("../__test__/__mocks__/AmigoService.js");

const rutaService = new RutaService();
const amigoService = new AmigoService();

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

  rutas.push(ruta1);
  rutas.push(ruta2);
}

test("Componente se renderiza sin crahsear.", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RouteList getRutas={rutaService.getRutas()}
    deleteRuta={rutaService.deleteRuta()}
    shareRuta={rutaService.shareRuta()}
    obtenerFicherosRuta={rutaService.obtenerFicherosRuta()}
    subirFicheroAMiRuta={rutaService.subirFicheroAMiRuta()}
    getAmigos={amigoService.getAmigos()}
    comentarMiRuta={rutaService.comentarMiRuta()}
    obtenerComentariosRuta={rutaService.obtenerComentariosRuta()}></RouteList>, div);
});

/*test("No hay rutas, se muestra la alerta correspondiente.", async () => {
  const { getByTestId } = render(<RouteList rutas={[]}></RouteList>);
  let alerta = await waitForElement(() => getByTestId("alerta"));
  expect(alerta).toHaveTextContent(
    "Actualmente no dispones de ninguna ruta en tu POD. Accede a Añadir Ruta para añadir una nueva ruta."
  );
});

test("Hay dos rutas, se muestran dos RouteCard con el nombre de la ruta como título.", async () => {
  // Rellenamos la lista de prueba
  setUp();
  const { getByTestId } = render(<RouteList rutas={rutas}></RouteList>);
  let acordeon = await waitForElement(() => getByTestId("acordeon"));
  expect(acordeon.children.length).toBe(2);
});*/
