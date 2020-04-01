import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SharedWithMe from "../front-end/components/share/SharedWithMe";
import RutaService from "../__test__/__mocks__/RutaService";

let rutaService = new RutaService();

test("Se renderizan bien los componentes de SharePanel", () => {
    afterAll(cleanup);
    const { getByTestId } = render(<SharedWithMe getRutasCompartidasConmigo={rutaService.getRutasCompartidasConmigo()}
      subirFicheroAMiRuta={rutaService.subirFicheroAMiRuta}
      obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
      comentarMiRuta={rutaService.comentarMiRuta}
      obtenerComentariosRuta={rutaService.obtenerComentariosRuta}></SharedWithMe>);
    expect(getByTestId("title")).toHaveTextContent("Compartido conmigo");
});
