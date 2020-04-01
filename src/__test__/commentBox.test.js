import React from "react";
import { render, cleanup, waitForElement, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommentBox from "../front-end/components/share/CommentBox";
import RutaService from "../__test__/__mocks__/RutaService"

let rutaService=new RutaService();

test("Se renderizan bien los componentes de CommentBox", () => {
    afterAll(cleanup);
    const { getByTestId, getAllByTestId } = render(<CommentBox onlyRead={false} author={null} ruta={rutaService.getRutas()[0]} 
    comentarMiRuta={rutaService.comentarMiRuta} obtenerComentariosRuta={rutaService.obtenerComentariosRuta} ></CommentBox>);
    //let dialogo = await waitForElement(() => getByTestId("componenteModal"));
    expect(getByTestId("Acordeon")).toBeTruthy();
    expect(getByTestId("cardEnv")).toBeTruthy();
    expect(getByTestId("btComment")).toHaveTextContent("Comentarios");
    expect(getByTestId("cajaComent")).toBeTruthy();
    expect(getByTestId("btPublicar")).toHaveTextContent("Publicar");
});

/*test("Comprobamos que se abre la caja de comentarios correctamente", async () => {
    afterAll(cleanup);
    const { getByTestId, getAllByTestId } = render(<CommentBox onlyRead={false} author={null} ruta={rutaService.getRutas()[0]} 
    comentarMiRuta={rutaService.comentarMiRuta} obtenerComentariosRuta={rutaService.obtenerComentariosRuta} ></CommentBox>);
    let botonComentario = await waitForElement(() => getByTestId("btComment"));
    botonComentario.click();
    let listaComentarios = await waitForElement(() => getByTestId("listaComentarios"));
    expect(listaComentarios.children.length).toBe(2);
});*/