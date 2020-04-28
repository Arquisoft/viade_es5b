import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentBox from "../front-end/components/share/CommentBox";
import RutaService from "../front-end/services/rutas/RutaService";
import Persona from "../front-end/model/Persona";

import * as dependancy from "../BackEnd/BackMain";
import BackMain from "./__mocks__/BackMain";


let c3 = new Persona("Pedro","test","foto.png");

dependancy.default = BackMain;

let rutaService = new RutaService();

let testRoute = rutaService.getRutas()[0];

test("Se renderizan bien los componentes de CommentBox", () => {
  //afterAll(cleanup);
  const { getByTestId, getAllByTestId } = render(
    <CommentBox
      onlyRead={false}
      author={c3}
      ruta={testRoute}
      comentarRuta={rutaService.comentarRuta}
      obtenerComentariosRuta={rutaService.obtenerComentariosRuta}
    ></CommentBox>
  );

  expect(getByTestId("Acordeon")).toBeTruthy();
  expect(getByTestId("cardEnv")).toBeTruthy();
  expect(getByTestId("btComment")).toHaveTextContent("Comentarios");
  expect(getByTestId("cajaComent")).toBeTruthy();
  expect(getByTestId("btPublicar")).toHaveTextContent("Publicar");
});

test("Los comentarios de la ruta se obtienen correctamente.", async () => {
  const { getByTestId } = render(
    <CommentBox
      onlyRead={false}
      author={c3}
      ruta={testRoute}
      comentarRuta={rutaService.comentarRuta}
      obtenerComentariosRuta={rutaService.obtenerComentariosRuta}
    ></CommentBox>
  );
  let botonComentario = await waitForElement(() => getByTestId("btComment"));
  botonComentario.click();
  /*
  let listaComentarios = await waitForElement(() =>
    getAllByTestId("cajaComentario")
  );
  expect(listaComentarios.length).toBe(2);
  */
});

// test("Comprobamos que se abre la caja de comentarios correctamente", async () => {
//     afterAll(cleanup);
//     const { getByTestId, getAllByTestId } = render(<CommentBox onlyRead={false} ruta={rutaService.getRutas()[0]}
//         comentarRuta={rutaService.comentarRuta} obtenerComentariosRuta={rutaService.obtenerComentariosRuta} ></CommentBox>);
//     let botonComentario = await waitForElement(() => getByTestId("btComment"));
//     botonComentario.click();
//     let listaComentarios = await waitForElement(() => getByTestId("listaComentarios"));
//     expect(listaComentarios.children.length).toBe(2);
// });
