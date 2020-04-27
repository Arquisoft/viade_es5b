import React from "react";
import ReactDOM from "react-dom";
import RouteCard from "../front-end/components/ruta/VerRutas/RouteCard";
import Ruta from "../front-end/model/Ruta";
import Hito from "../front-end/model/Hito";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RutaService from "../__test__/__mocks__/RutaService";

// Ruta de prueba
const ruta = new Ruta(
  "Ruta Avilés",
  [4.5, 5.4],
  "Muy buena ruta, entretenida."
);
const hito1 = new Hito("Niemeyer", 4, 3.2);
const hito2 = new Hito("Parque Ferrera", 5, 5.7);
ruta.addHito(hito1);
ruta.addHito(hito2);

let rutaService = new RutaService();
/**
 * Tests de prueba unitarios
 */
const mockCallBack1 = jest.fn((uuid, webid) => {
  return ["url1", "url2"];
});

test("Se renderiza sin fallos", () => {
  const mock = jest.fn();
  const div = document.createElement("div");
  ReactDOM.render(
    <RouteCard
      ruta={ruta}
      obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
      flyTo={mock}
    ></RouteCard>,
    div
  );
});

test("RouteCard contiene la información básica de la ruta.", () => {
  const mock = jest.fn();
  const { getByTestId } = render(
    <RouteCard
      ruta={ruta}
      obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
      handleShare={() => {}}
      handleDelete={() => {}}
      flyTo={mock}
    ></RouteCard>
  );
  expect(getByTestId("r-title")).toHaveTextContent(ruta.getNombre());
  expect(getByTestId("r-description")).toHaveTextContent(ruta.getDescripcion());
});

test("RouteCard contiene los botones de compartir y eliminar", () => {
  const mock = jest.fn();
  const { getByTestId } = render(
    <RouteCard
      ruta={ruta}
      obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
      handleShare={() => {}}
      handleDelete={() => {}}
      flyTo={mock}
    ></RouteCard>
  );
  expect(getByTestId("r-title")).toHaveTextContent(ruta.getNombre());
  expect(getByTestId("r-description")).toHaveTextContent(ruta.getDescripcion());
  getByTestId("rb-compartir").click();
  getByTestId("rb-eliminar").click();
});

test("RouteCard contiene la información del inicio y los hitos de la ruta.", () => {
  const mock = jest.fn();
  const { getByTestId, getAllByTestId } = render(
    <RouteCard
      ruta={ruta}
      obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
      flyTo={mock}
    ></RouteCard>
  );
  const body = getAllByTestId("r-hitos");
  for (let i = 0; i < body.length; i++) {
    const rows = body[i].children;
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
  }
  // Comprobación del tooltip.
  const tooltip = getAllByTestId("tooltip");
  expect(tooltip[0]).toHaveTextContent(
    "Puedes hacer click sobre un hito para centrarlo en el mapa."
  );
});

/*test("Al hacer click en Ver en el map se muestra el componente MapRuta", async () => {

  const { getByTestId, getAllByTestId } = render(<RouteCard ruta={ruta} obtenerFicherosRuta={rutaService.obtenerFicherosRuta} showMap={true}></RouteCard>);
  /*const elem = getAllByTestId("rb-ver");
  for(let i = 0; i < elem.length; i++){
    elem[i].click();
  }*/
/*
  let mapa = await waitForElement(() => getByTestId("mapa"));
  expect(mapa).toBeInTheDocument();
}); */
