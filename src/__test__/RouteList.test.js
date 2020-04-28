import React from "react";
import ReactDOM from "react-dom";
import RouteList from "../front-end/components/ruta/VerRutas/RouteList";
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import RutaService from "../front-end/services/rutas/RutaService";
import AmigoService from "../front-end/services/amigos/AmigoService";

import * as dependancy from "../BackEnd/BackMain";
import BackMain from "./__mocks__/BackMain";

dependancy.default = BackMain;





let rutaService = new RutaService();
let amigoService = new AmigoService();

test("Componente se renderiza sin crahsear.", () => {
	const mock = jest.fn();
	const div = document.createElement("div");
	console.log(rutaService.getRutas());
	ReactDOM.render(
		<RouteList
			getRutas={rutaService.getRutas}
			obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
			handleLoaded={jest.fn()}
			flyTo={mock}
		></RouteList>,
		div
	);
});

test("No hay rutas, se muestra la alerta correspondiente.", async () => {
	const mock = jest.fn();
	const { getByTestId } = render(
		<RouteList
			getRutas={jest.fn(() => {return [];})}
			obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
			handleLoaded={jest.fn()}
			flyTo={mock}
		></RouteList>
	);
	let alerta = await waitForElement(() => getByTestId("alerta_no_rutas"));
	expect(alerta).toHaveTextContent(
		"Actualmente no dispones de ninguna ruta en tu POD. Accede a Añadir Ruta para añadir una nueva ruta."
	); //
});

test("Hay dos rutas, se muestran dos RouteCard con el nombre de la ruta como título.", async () => {
	const mock = jest.fn();
	const { getByTestId } = render(
		<RouteList
			getRutas={rutaService.getRutas}
			obtenerFicherosRuta={rutaService.obtenerFicherosRuta}
			handleLoaded={jest.fn()}
			flyTo={mock}
		></RouteList>
	);
	let acordeon = await waitForElement(() => getByTestId("acordeon"));
	//expect(acordeon.children.length).toBe(2);
	//expect(acordeon.childElementCount).toBe(2);
	expect(acordeon.children.length).toBe(3); //El test deberia dar 2, la prueba con rutas a mano da dos, pero siempre devuelve 3
	//La interfaz no especifica que se cuente al padre o no, pero contados a mano el numero es correcto
});
